import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:chess/chess.dart' as chess;
import '../models/chess_models.dart';
import '../models/engine_config.dart';
import '../data/openings_data.dart';
import 'evaluation.dart';

class AIMoveRequest {
  final String fen;
  final int level;
  final AIPersonalityId personality;
  final List<String> moveSans;

  const AIMoveRequest({
    required this.fen,
    required this.level,
    required this.personality,
    this.moveSans = const [],
  });
}

class AIMoveResponse {
  final String from;
  final String to;
  final String? promotion;
  final String san;
  final int score;

  const AIMoveResponse({
    required this.from,
    required this.to,
    this.promotion,
    required this.san,
    required this.score,
  });
}

String? _formatPromotion(dynamic promo) {
  if (promo == null) return null;
  final str = promo.toString().toLowerCase();
  if (str.isEmpty) return null;
  if (str.contains('q')) return 'q';
  if (str.contains('r')) return 'r';
  if (str.contains('b')) return 'b';
  if (str.contains('n')) return 'n';
  return str[0];
}

bool _allowsImmediateMate(chess.Chess baseGame, Map<String, dynamic> move) {
  try {
    final temp = chess.Chess.fromFEN(baseGame.fen);
    final moved = temp.move(move);
    if (!moved) return false;
    final oppMoves = temp.moves({'verbose': true});
    for (final om in oppMoves) {
      final map = om as Map<String, dynamic>;
      if (map['san'].toString().contains('#')) {
        return true;
      }
    }
  } catch (_) {}
  return false;
}

// Top-level worker function executed in background Dart Isolate
AIMoveResponse computeAIMove(AIMoveRequest request) {
  final game = chess.Chess.fromFEN(request.fen);
  final diff = DIFFICULTY_LEVELS.firstWhere(
    (d) => d.level == request.level,
    orElse: () => DIFFICULTY_LEVELS[2],
  );
  final bool isWhite = game.turn == chess.Color.WHITE;

  // 1. Opening book check (calibrated by bot level bookMaxPlies)
  if (request.moveSans.length < diff.bookMaxPlies) {
    // For novice bots (Level 1 Jimmy), 50% chance to leave book early for natural beginner play
    final useBook = diff.level > 1 || Random().nextDouble() < 0.45;
    if (useBook) {
      final opening = findBookOpeningForMoves(request.moveSans);
      if (opening != null && request.moveSans.length < opening.moves.length) {
        final nextSan = opening.moves[request.moveSans.length];
        try {
          final temp = chess.Chess.fromFEN(request.fen);
          final bookMove = temp.move(nextSan);
          if (bookMove) {
            final m = temp.history.last;
            return AIMoveResponse(
              from: m.move.fromAlgebraic,
              to: m.move.toAlgebraic,
              promotion: _formatPromotion(m.move.promotion),
              san: nextSan,
              score: evaluatePosition(temp, request.personality),
            );
          }
        } catch (_) {
          // Fall back to calibrated search
        }
      }
    }
  }

  // 2. Iterative Deepening Minimax Search with committed depth buffer
  final searchResult = searchBestMoveIterative(
    game,
    diff.depth,
    diff.moveTimeMs,
    isWhite,
    personality: request.personality,
    useQuiescence: diff.useQuiescence,
  );

  final rootMoves = searchResult.rootMoves;
  if (rootMoves.isEmpty) {
    final rawMoves = game.moves({'verbose': true});
    if (rawMoves.isEmpty) {
      throw StateError('No legal moves available: position is checkmate or stalemate');
    }
    final fallback = rawMoves.first as Map<String, dynamic>;
    return AIMoveResponse(
      from: fallback['from'] as String,
      to: fallback['to'] as String,
      promotion: _formatPromotion(fallback['promotion']),
      san: fallback['san'] as String,
      score: searchResult.score,
    );
  }

  // 3. Boltzmann (Softmax) Move Selection & Evaluation Noise Injection
  final scoredCandidates = rootMoves.map((sm) {
    double noisyScore = sm.score.toDouble();
    if (diff.evalNoise > 0) {
      // 3-uniform sum approximation of Gaussian noise N(0, evalNoise^2)
      final r1 = Random().nextDouble();
      final r2 = Random().nextDouble();
      final r3 = Random().nextDouble();
      final z = (r1 + r2 + r3 - 1.5) * 1.63299;
      noisyScore += z * diff.evalNoise;
    }
    return MapEntry(sm.move, noisyScore);
  }).toList();

  // Sort candidates by noisy score: highest first for White, lowest first for Black
  scoredCandidates.sort((a, b) {
    return isWhite ? b.value.compareTo(a.value) : a.value.compareTo(b.value);
  });

  Map<String, dynamic>? chosen;

  // 4. Humanized Blunder / Tactical Oversight for Novices
  if (diff.blunderProbability > 0 && Random().nextDouble() < diff.blunderProbability && scoredCandidates.length > 1) {
    // Pick an inferior move (small positional inaccuracy or oversight)
    final candidateSlice = scoredCandidates.skip(1).take(min(3, scoredCandidates.length - 1)).toList();
    if (candidateSlice.isNotEmpty) {
      // Evasion: filter out moves that hang immediate mate-in-1 if alternatives exist
      final nonMating = candidateSlice.where((e) => !_allowsImmediateMate(game, e.key)).toList();
      if (nonMating.isNotEmpty) {
        chosen = nonMating[Random().nextInt(nonMating.length)].key;
      }
    }
  }

  // If no blunder triggered or blunder was filtered, sample using Boltzmann temperature distribution
  if (chosen == null) {
    if (diff.temperature <= 2.0 || scoredCandidates.length == 1) {
      // High Elo (2200-2500): always pick top verified move
      chosen = scoredCandidates.first.key;
    } else {
      final bestVal = scoredCandidates.first.value;
      final temp = max(1.0, diff.temperature);

      // Compute unnormalized Boltzmann weights: exp(-delta / T)
      final weights = <double>[];
      double sumWeights = 0.0;
      for (final entry in scoredCandidates) {
        final delta = (entry.value - bestVal).abs();
        final weight = exp(-delta / temp);
        weights.add(weight);
        sumWeights += weight;
      }

      if (sumWeights > 0) {
        double roll = Random().nextDouble() * sumWeights;
        for (int i = 0; i < scoredCandidates.length; i++) {
          roll -= weights[i];
          if (roll <= 0) {
            chosen = scoredCandidates[i].key;
            break;
          }
        }
      }
      chosen ??= scoredCandidates.first.key;
    }
  }

  final chosenMove = chosen;
  String? promo = _formatPromotion(chosenMove['promotion']);
  final piece = game.get(chosenMove['from'].toString());
  final toSq = chosenMove['to'].toString();
  if (promo == null && piece?.type == chess.PieceType.PAWN) {
    if ((piece?.color == chess.Color.WHITE && toSq.endsWith('8')) ||
        (piece?.color == chess.Color.BLACK && toSq.endsWith('1'))) {
      promo = 'q';
    }
  }

  return AIMoveResponse(
    from: chosenMove['from'] as String,
    to: chosenMove['to'] as String,
    promotion: promo,
    san: chosenMove['san'] as String,
    score: searchResult.score,
  );
}

class EngineService {
  static Future<AIMoveResponse> getBestMove(AIMoveRequest request) async {
    final diff = DIFFICULTY_LEVELS.firstWhere(
      (d) => d.level == request.level,
      orElse: () => DIFFICULTY_LEVELS[2],
    );

    // Natural human cadence delay
    final cadenceDelay = min(diff.moveTimeMs ~/ 2, 250);
    if (cadenceDelay > 0) {
      await Future.delayed(Duration(milliseconds: cadenceDelay));
    }

    // Run calculation in background Isolate
    return await compute(computeAIMove, request);
  }
}
