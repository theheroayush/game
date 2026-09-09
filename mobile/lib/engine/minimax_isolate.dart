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


/// Check if a candidate move hangs significant material.
/// Returns the net material loss in centipawns if the opponent can immediately
/// capture a piece worth more than what was captured.
/// Returns 0 if the move is safe, or a positive value indicating how much material is lost.
int _materialLoss(chess.Chess baseGame, Map<String, dynamic> move) {
  try {
    final temp = chess.Chess.fromFEN(baseGame.fen);
    final moved = temp.move(move);
    if (!moved) return 0;

    // What did we capture on this move?
    final captured = move['captured']?.toString() ?? '';
    final capturedValue = _pieceVal(captured);


    // Now check: can the opponent immediately recapture on the 'to' square
    // with a piece worth less than what we moved there?
    int worstLoss = 0;
    final oppMoves = temp.moves({'verbose': true});
    for (final om in oppMoves) {
      final oMap = om as Map<String, dynamic>;
      final oCaptured = oMap['captured']?.toString() ?? '';
      if (oCaptured.isEmpty) continue;

      // Opponent captures our piece on 'to' square (or anywhere else)
      final oCapturedValue = _pieceVal(oCaptured);
      if (oCapturedValue > capturedValue) {
        // Net loss: we gained capturedValue but lost oCapturedValue
        final netLoss = oCapturedValue - capturedValue;
        if (netLoss > worstLoss) worstLoss = netLoss;
      }
    }
    return worstLoss;
  } catch (_) {}
  return 0;
}

int _pieceVal(String p) {
  switch (p) {
    case 'p': case 'pawn': return 100;
    case 'n': case 'knight': return 325;
    case 'b': case 'bishop': return 335;
    case 'r': case 'rook': return 500;
    case 'q': case 'queen': return 900;
    case 'k': case 'king': return 20000;
    default: return 0;
  }
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

  // 3. ALWAYS play the minimax-verified best move.
  //    Difficulty scaling is achieved through search depth alone:
  //    - Level 1 (depth 2) naturally misses deep tactics
  //    - Level 10 (depth 8) plays near-perfect chess
  //    No noise, temperature, or blunder injection — those caused the AI
  //    to trade Queens for pawns by overriding the engine's correct evaluation.
  Map<String, dynamic> chosen = searchResult.bestMove ?? rootMoves.first.move;

  // 4. Final material safety verification:
  //    Even the minimax best move could hang material if search depth was
  //    insufficient (e.g. depth 2 missing a 3-move tactic). Check if the
  //    chosen move allows the opponent to immediately win material.
  final loss = _materialLoss(game, chosen);
  if (loss >= 200) {
    // The "best" move hangs significant material (opponent can immediately
    // capture a piece worth 200+ cp more than what we captured).
    // Search rootMoves for a safer alternative.
    Map<String, dynamic>? safestMove;
    int lowestLoss = loss;
    for (final sm in rootMoves) {
      final mLoss = _materialLoss(game, sm.move);
      if (mLoss < lowestLoss) {
        lowestLoss = mLoss;
        safestMove = sm.move;
      }
    }
    if (safestMove != null && lowestLoss < loss) {
      chosen = safestMove;
    }
  }

  final Map<String, dynamic> chosenMove = chosen;
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
