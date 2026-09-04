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

// Top-level worker function executed in background Dart Isolate
AIMoveResponse computeAIMove(AIMoveRequest request) {
  final game = chess.Chess.fromFEN(request.fen);
  final diff = DIFFICULTY_LEVELS.firstWhere(
    (d) => d.level == request.level,
    orElse: () => DIFFICULTY_LEVELS[2],
  );
  final bool isWhite = game.turn == chess.Color.WHITE;

  // 1. Opening book check (first 12 plies)
  if (request.moveSans.length < 12) {
    final opening = findOpeningByMoves(request.moveSans);
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
            promotion: m.move.promotion?.name.toLowerCase(),
            san: nextSan,
            score: evaluatePosition(temp, request.personality),
          );
        }
      } catch (_) {
        // Fall back to minimax search
      }
    }
  }

  // 2. Iterative Deepening Minimax Search
  final searchResult = searchBestMoveIterative(
    game,
    diff.depth,
    diff.moveTimeMs,
    isWhite,
    personality: request.personality,
  );

  Map<String, dynamic>? chosen = searchResult.bestMove;

  // 3. Humanized blunder injection for lower Elo levels (1 to 4)
  if (diff.blunderProbability > 0 && Random().nextDouble() < diff.blunderProbability) {
    final rawMoves = game.moves({'verbose': true});
    if (rawMoves.length > 1) {
      final candidates = rawMoves.map((m) => m as Map<String, dynamic>).toList();
      chosen = candidates[Random().nextInt(min(candidates.length, 3))];
    }
  }

  if (chosen == null) {
    final rawMoves = game.moves({'verbose': true});
    if (rawMoves.isNotEmpty) {
      chosen = rawMoves.first as Map<String, dynamic>;
    }
  }

  if (chosen == null) {
    throw Exception('No legal moves available in position');
  }

  return AIMoveResponse(
    from: chosen['from'] as String,
    to: chosen['to'] as String,
    promotion: chosen['promotion']?.toString(),
    san: chosen['san'] as String,
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
