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

/// Material safety threshold per level.
/// A move is "safe" if its score is within this threshold of the best move.
/// This prevents the engine from ever dropping a piece for free.
int _safetyThreshold(int level) {
  // Lower levels allow slightly wider positional variance but NEVER piece-drops.
  // A pawn = 100cp, a minor piece = 325cp. We want to allow small positional
  // inaccuracies but never dropping a full piece.
  if (level <= 2) return 80;  // Allow up to ~0.8 pawn positional slip
  if (level <= 4) return 50;  // Allow up to ~0.5 pawn slip
  if (level <= 6) return 25;  // Very tight
  return 10;                   // Nearly deterministic
}

// Top-level worker function executed in background Dart Isolate
AIMoveResponse computeAIMove(AIMoveRequest request) {
  final game = chess.Chess.fromFEN(request.fen);
  final diff = DIFFICULTY_LEVELS.firstWhere(
    (d) => d.level == request.level,
    orElse: () => DIFFICULTY_LEVELS[2],
  );
  final bool isWhite = game.turn == chess.Color.WHITE;

  // 1. Opening theory retrieval (biases root search ordering, NEVER short-circuits Minimax)
  String? bookMoveSan;
  if (request.moveSans.length < diff.bookMaxPlies) {
    final useBook = diff.level > 1 || Random().nextDouble() < 0.45;
    if (useBook) {
      final opening = findBookOpeningForMoves(request.moveSans);
      if (opening != null && request.moveSans.length < opening.moves.length) {
        bookMoveSan = opening.moves[request.moveSans.length];
      }
    }
  }

  // 2. Iterative Deepening Minimax Search (runs for 100% of moves)
  final searchResult = searchBestMoveIterative(
    game,
    diff.depth,
    diff.moveTimeMs,
    isWhite,
    personality: request.personality,
    useQuiescence: diff.useQuiescence,
    bookMoveSan: bookMoveSan,
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

  Map<String, dynamic>? chosen;

  // For deterministic high-tier bots (Level >= 8 or T=0), strictly play best move
  if (diff.level >= 8 || diff.temperature == 0.0) {
    chosen = searchResult.bestMove;
  } else {
    // 3. Material Safety Gate: filter root moves to only "safe" candidates
    //    whose score is within threshold of the best move.
    //    This PREVENTS the engine from ever dropping a piece for free.
    final bestScore = isWhite
        ? rootMoves.map((m) => m.score).reduce(max)
        : rootMoves.map((m) => m.score).reduce(min);
    final threshold = _safetyThreshold(diff.level);

    final safeMoves = rootMoves.where((sm) {
      final delta = isWhite
          ? (bestScore - sm.score)
          : (sm.score - bestScore);
      return delta <= threshold;
    }).toList();

    // Fallback: if somehow no safe moves (shouldn't happen), use all
    final candidates = safeMoves.isNotEmpty ? safeMoves : rootMoves.toList();

    // 4. Apply noise ONLY within the safe candidate pool
    final scoredCandidates = candidates.map((sm) {
      double noisyScore = sm.score.toDouble();
      if (diff.evalNoise > 0) {
        final r1 = Random().nextDouble();
        final r2 = Random().nextDouble();
        final r3 = Random().nextDouble();
        final z = (r1 + r2 + r3 - 1.5) * 1.63299;
        noisyScore += z * diff.evalNoise;
      }
      return MapEntry(sm.move, noisyScore);
    }).toList();

    scoredCandidates.sort((a, b) {
      return isWhite ? b.value.compareTo(a.value) : a.value.compareTo(b.value);
    });

    // 5. Safe Blunder: occasionally pick 2nd-best from the SAFE pool
    //    (guaranteed to not hang material since all candidates are within threshold)
    if (diff.blunderProbability > 0 && Random().nextDouble() < diff.blunderProbability && scoredCandidates.length > 1) {
      // Pick a random move from positions 2-4 in the safe pool
      final blunderPool = scoredCandidates.skip(1).take(min(3, scoredCandidates.length - 1)).toList();
      // Extra safety: filter out moves allowing immediate mate
      final nonMating = blunderPool.where((e) => !_allowsImmediateMate(game, e.key)).toList();
      if (nonMating.isNotEmpty) {
        chosen = nonMating[Random().nextInt(nonMating.length)].key;
      }
    }

    // 6. Boltzmann temperature selection within safe pool
    if (chosen == null) {
      if (diff.temperature <= 2.0 || scoredCandidates.length == 1) {
        chosen = scoredCandidates.first.key;
      } else {
        final bestVal = scoredCandidates.first.value;
        final temp = max(1.0, diff.temperature);

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
  }

  final Map<String, dynamic> chosenMove = chosen ?? searchResult.bestMove ?? rootMoves.first.move;
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
