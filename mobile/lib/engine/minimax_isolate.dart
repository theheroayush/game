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


// Top-level worker function executed in background Dart Isolate
AIMoveResponse computeAIMove(AIMoveRequest request) {
  final game = chess.Chess.fromFEN(request.fen);
  final diff = DIFFICULTY_LEVELS.firstWhere(
    (d) => d.level == request.level,
    orElse: () => DIFFICULTY_LEVELS[2],
  );
  final bool isWhite = game.turn == chess.Color.WHITE;

  // 1. Opening theory retrieval (biases root search ordering)
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

  // 3. Play the verified best move found by Minimax search
  final Map<String, dynamic> chosenMove = searchResult.bestMove ?? rootMoves.first.move;

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
