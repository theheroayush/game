import 'dart:math';
import 'package:chess/chess.dart' as chess;
import '../models/chess_models.dart';

const Map<String, int> PIECE_VALUES = {
  'p': 100,
  'n': 325,
  'b': 335,
  'r': 500,
  'q': 900,
  'k': 20000,
};

const List<int> PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const List<int> KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const List<int> BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const List<int> ROOK_PST = [
   0,  0,  0,  0,  0,  0,  0,  0,
   5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
   0,  0,  0,  5,  5,  0,  0,  0,
];

const List<int> QUEEN_PST = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20,
];

const List<int> KING_MIDGAME_PST = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20,
];

const List<int> KING_ENDGAME_PST = [
  -50,-40,-30,-20,-20,-30,-40,-50,
  -30,-20,-10,  0,  0,-10,-20,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-30,  0,  0,  0,  0,-30,-30,
  -50,-30,-30,-30,-30,-30,-30,-50,
];

int getSquareIndex(String square, chess.Color color) {
  final file = square.codeUnitAt(0) - 'a'.codeUnitAt(0);
  final rank = int.parse(square[1]) - 1;
  if (color == chess.Color.WHITE) {
    return (7 - rank) * 8 + file;
  } else {
    return rank * 8 + file;
  }
}

int evaluatePosition(chess.Chess game, [AIPersonalityId personality = AIPersonalityId.balanced]) {
  if (game.in_checkmate) {
    return game.turn == chess.Color.WHITE ? -99999 : 99999;
  }
  if (game.in_draw || game.in_stalemate || game.in_threefold_repetition || game.insufficient_material) {
    return 0;
  }

  int whiteScore = 0;
  int blackScore = 0;
  int whiteMaterial = 0;
  int blackMaterial = 0;
  int whiteBishops = 0;
  int blackBishops = 0;

  final whitePawnFiles = List<int>.filled(8, 0);
  final blackPawnFiles = List<int>.filled(8, 0);

  // Scan 64 squares
  for (int rank = 1; rank <= 8; rank++) {
    for (int file = 0; file < 8; file++) {
      final sq = String.fromCharCode('a'.codeUnitAt(0) + file) + rank.toString();
      final piece = game.get(sq);
      if (piece == null) continue;

      final isW = piece.color == chess.Color.WHITE;
      final pType = piece.type.name.toLowerCase();
      final val = PIECE_VALUES[pType] ?? 0;

      if (pType == 'p') {
        if (isW) {
          whitePawnFiles[file]++;
        } else {
          blackPawnFiles[file]++;
        }
      } else if (pType == 'b') {
        if (isW) {
          whiteBishops++;
        } else {
          blackBishops++;
        }
      }

      if (pType != 'k') {
        if (isW) {
          whiteMaterial += val;
        } else {
          blackMaterial += val;
        }
      }
    }
  }

  final bool isEndgame = whiteMaterial < 1500 && blackMaterial < 1500;

  // Second pass: Positional evaluation
  for (int rank = 1; rank <= 8; rank++) {
    for (int file = 0; file < 8; file++) {
      final sq = String.fromCharCode('a'.codeUnitAt(0) + file) + rank.toString();
      final piece = game.get(sq);
      if (piece == null) continue;

      final isW = piece.color == chess.Color.WHITE;
      final pType = piece.type.name.toLowerCase();
      final val = PIECE_VALUES[pType] ?? 0;
      final sqIdx = getSquareIndex(sq, piece.color);

      int pstVal = 0;
      switch (pType) {
        case 'p': pstVal = PAWN_PST[sqIdx]; break;
        case 'n': pstVal = KNIGHT_PST[sqIdx]; break;
        case 'b': pstVal = BISHOP_PST[sqIdx]; break;
        case 'r': pstVal = ROOK_PST[sqIdx]; break;
        case 'q': pstVal = QUEEN_PST[sqIdx]; break;
        case 'k': pstVal = isEndgame ? KING_ENDGAME_PST[sqIdx] : KING_MIDGAME_PST[sqIdx]; break;
      }

      int positionalBonus = 0;

      // 1. Pawn Structure (Passed, Doubled, Isolated)
      if (pType == 'p') {
        final fileCount = isW ? whitePawnFiles[file] : blackPawnFiles[file];
        if (fileCount > 1) positionalBonus -= 15; // Doubled pawn

        final leftCount = file > 0 ? (isW ? whitePawnFiles[file - 1] : blackPawnFiles[file - 1]) : 0;
        final rightCount = file < 7 ? (isW ? whitePawnFiles[file + 1] : blackPawnFiles[file + 1]) : 0;
        if (leftCount == 0 && rightCount == 0) positionalBonus -= 18; // Isolated pawn

        // Passed Pawn bonus
        bool isPassed = true;
        final oppFiles = isW ? blackPawnFiles : whitePawnFiles;
        for (int df = max(0, file - 1); df <= min(7, file + 1); df++) {
          if (oppFiles[df] > 0) {
            isPassed = false;
            break;
          }
        }
        if (isPassed) {
          final advancement = isW ? rank : 9 - rank;
          positionalBonus += advancement * 15;
        }
      }

      // 2. Rooks on Open / Semi-Open Files
      if (pType == 'r') {
        final ownPawns = isW ? whitePawnFiles[file] : blackPawnFiles[file];
        final enemyPawns = isW ? blackPawnFiles[file] : whitePawnFiles[file];
        if (ownPawns == 0 && enemyPawns == 0) {
          positionalBonus += 30; // Open file
        } else if (ownPawns == 0) {
          positionalBonus += 15; // Semi-open file
        }
      }

      // 3. Knight Outposts on 4th/5th ranks
      if (pType == 'n') {
        if ((isW && (rank == 4 || rank == 5)) || (!isW && (rank == 5 || rank == 4))) {
          if (file >= 2 && file <= 5) positionalBonus += 20; // Central Outpost
        }
      }

      if (isW) {
        whiteScore += val + pstVal + positionalBonus;
      } else {
        blackScore += val + pstVal + positionalBonus;
      }
    }
  }

  // Bishop Pair Bonus (+45cp)
  if (whiteBishops >= 2) whiteScore += 45;
  if (blackBishops >= 2) blackScore += 45;

  // Personality adjustments
  int personalityMod = 0;
  if (personality == AIPersonalityId.aggressive) {
    personalityMod += (whiteMaterial > blackMaterial ? 35 : -35);
  } else if (personality == AIPersonalityId.tactical) {
    if (game.in_check) {
      personalityMod += game.turn == chess.Color.BLACK ? 45 : -45;
    }
  }

  return whiteScore - blackScore + personalityMod;
}

// Quiescence Search with Delta Pruning
int quiescence(
  chess.Chess game,
  int alpha,
  int beta,
  bool isMaximizing, [
  int depth = 3,
  AIPersonalityId personality = AIPersonalityId.balanced,
]) {
  final standPat = evaluatePosition(game, personality);
  if (depth <= 0 || game.game_over) {
    return standPat;
  }

  const int bigDelta = 925; // Queen value + safety buffer

  if (isMaximizing) {
    if (standPat >= beta) return beta;
    if (standPat > alpha) alpha = standPat;

    // Delta pruning
    if (standPat < alpha - bigDelta) {
      return alpha;
    }

    final rawMoves = game.moves({'verbose': true});
    final captureMoves = <Map<String, dynamic>>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (map['captured'] != null || map['flags'].toString().contains('p')) {
        captureMoves.add(map);
      }
    }

    if (captureMoves.isEmpty) return standPat;

    // MVV-LVA move ordering
    captureMoves.sort((a, b) {
      final aCaptured = a['captured']?.toString() ?? '';
      final bCaptured = b['captured']?.toString() ?? '';
      final aVal = (PIECE_VALUES[aCaptured] ?? 0) * 10 - (PIECE_VALUES[a['piece']?.toString() ?? ''] ?? 0);
      final bVal = (PIECE_VALUES[bCaptured] ?? 0) * 10 - (PIECE_VALUES[b['piece']?.toString() ?? ''] ?? 0);
      return bVal.compareTo(aVal);
    });

    for (final move in captureMoves) {
      game.move(move);
      final score = quiescence(game, alpha, beta, false, depth - 1, personality);
      game.undo();

      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    }
    return alpha;
  } else {
    if (standPat <= alpha) return alpha;
    if (standPat < beta) beta = standPat;

    if (standPat > beta + bigDelta) {
      return beta;
    }

    final rawMoves = game.moves({'verbose': true});
    final captureMoves = <Map<String, dynamic>>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (map['captured'] != null || map['flags'].toString().contains('p')) {
        captureMoves.add(map);
      }
    }

    if (captureMoves.isEmpty) return standPat;

    captureMoves.sort((a, b) {
      final aCaptured = a['captured']?.toString() ?? '';
      final bCaptured = b['captured']?.toString() ?? '';
      final aVal = (PIECE_VALUES[aCaptured] ?? 0) * 10 - (PIECE_VALUES[a['piece']?.toString() ?? ''] ?? 0);
      final bVal = (PIECE_VALUES[bCaptured] ?? 0) * 10 - (PIECE_VALUES[b['piece']?.toString() ?? ''] ?? 0);
      return bVal.compareTo(aVal);
    });

    for (final move in captureMoves) {
      game.move(move);
      final score = quiescence(game, alpha, beta, true, depth - 1, personality);
      game.undo();

      if (score <= alpha) return alpha;
      if (score < beta) beta = score;
    }
    return beta;
  }
}

// Killer Moves Table: 2 killer moves per ply (up to 64 plies)
final List<List<Map<String, dynamic>?>> _killerMoves = List.generate(64, (_) => [null, null]);

// Transposition Table Cache
final Map<String, Map<String, dynamic>> _ttCache = {};

class MinimaxResult {
  final int score;
  final Map<String, dynamic>? bestMove;
  final bool interrupted;

  const MinimaxResult({
    required this.score,
    this.bestMove,
    this.interrupted = false,
  });
}

// Minimax with Alpha-Beta, Killer Moves & Quiescence
MinimaxResult minimax(
  chess.Chess game,
  int depth,
  int alpha,
  int beta,
  bool isMaximizing, {
  AIPersonalityId personality = AIPersonalityId.balanced,
  bool useQuiescence = true,
  int? deadline,
  int ply = 0,
}) {
  if (deadline != null && DateTime.now().millisecondsSinceEpoch >= deadline) {
    return MinimaxResult(score: evaluatePosition(game, personality), interrupted: true);
  }

  if (depth <= 0) {
    if (useQuiescence) {
      return MinimaxResult(score: quiescence(game, alpha, beta, isMaximizing, 3, personality));
    }
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  if (game.game_over) {
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  final fen = game.fen;
  final cached = _ttCache[fen];
  if (cached != null && (cached['depth'] as int) >= depth && deadline == null) {
    return MinimaxResult(score: cached['score'] as int);
  }

  final rawMoves = game.moves({'verbose': true});
  if (rawMoves.isEmpty) {
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  final moves = rawMoves.map((m) => m as Map<String, dynamic>).toList();

  // Move Ordering: Captures -> Killer 1 -> Killer 2 -> Checks -> Quiet
  final currentKillers = ply < 64 ? _killerMoves[ply] : [null, null];
  moves.sort((a, b) {
    int aScore = 0;
    int bScore = 0;

    final aCaptured = a['captured']?.toString() ?? '';
    final bCaptured = b['captured']?.toString() ?? '';
    if (aCaptured.isNotEmpty) aScore += (PIECE_VALUES[aCaptured] ?? 0) * 10 - (PIECE_VALUES[a['piece']?.toString() ?? ''] ?? 0) + 10000;
    if (bCaptured.isNotEmpty) bScore += (PIECE_VALUES[bCaptured] ?? 0) * 10 - (PIECE_VALUES[b['piece']?.toString() ?? ''] ?? 0) + 10000;

    if (a['flags'].toString().contains('p')) aScore += 9000;
    if (b['flags'].toString().contains('p')) bScore += 9000;

    if (currentKillers[0] != null && a['from'] == currentKillers[0]!['from'] && a['to'] == currentKillers[0]!['to']) aScore += 8000;
    if (currentKillers[0] != null && b['from'] == currentKillers[0]!['from'] && b['to'] == currentKillers[0]!['to']) bScore += 8000;

    if (currentKillers[1] != null && a['from'] == currentKillers[1]!['from'] && a['to'] == currentKillers[1]!['to']) aScore += 7000;
    if (currentKillers[1] != null && b['from'] == currentKillers[1]!['from'] && b['to'] == currentKillers[1]!['to']) bScore += 7000;

    final aSan = a['san']?.toString() ?? '';
    final bSan = b['san']?.toString() ?? '';
    if (aSan.contains('+') || aSan.contains('#')) aScore += 500;
    if (bSan.contains('+') || bSan.contains('#')) bScore += 500;

    return bScore.compareTo(aScore);
  });

  Map<String, dynamic>? bestMove = moves.first;

  if (isMaximizing) {
    int maxEval = -999999;
    for (final move in moves) {
      if (deadline != null && DateTime.now().millisecondsSinceEpoch >= deadline) {
        return MinimaxResult(
          score: maxEval == -999999 ? evaluatePosition(game, personality) : maxEval,
          bestMove: bestMove,
          interrupted: true,
        );
      }

      game.move(move);
      final evalResult = minimax(
        game,
        depth - 1,
        alpha,
        beta,
        false,
        personality: personality,
        useQuiescence: useQuiescence,
        deadline: deadline,
        ply: ply + 1,
      );
      game.undo();

      if (evalResult.interrupted && evalResult.bestMove == null) {
        return MinimaxResult(score: maxEval, bestMove: bestMove, interrupted: true);
      }

      if (evalResult.score > maxEval) {
        maxEval = evalResult.score;
        bestMove = move;
      }
      alpha = max(alpha, evalResult.score);
      if (beta <= alpha) {
        // Record Killer Move on quiet beta cutoff
        if (move['captured'] == null && ply < 64) {
          _killerMoves[ply][1] = _killerMoves[ply][0];
          _killerMoves[ply][0] = move;
        }
        break; // Beta Cutoff
      }
    }

    if (_ttCache.length < 60000 && deadline == null) {
      _ttCache[fen] = {'score': maxEval, 'depth': depth};
    }
    return MinimaxResult(score: maxEval, bestMove: bestMove);
  } else {
    int minEval = 999999;
    for (final move in moves) {
      if (deadline != null && DateTime.now().millisecondsSinceEpoch >= deadline) {
        return MinimaxResult(
          score: minEval == 999999 ? evaluatePosition(game, personality) : minEval,
          bestMove: bestMove,
          interrupted: true,
        );
      }

      game.move(move);
      final evalResult = minimax(
        game,
        depth - 1,
        alpha,
        beta,
        true,
        personality: personality,
        useQuiescence: useQuiescence,
        deadline: deadline,
        ply: ply + 1,
      );
      game.undo();

      if (evalResult.interrupted && evalResult.bestMove == null) {
        return MinimaxResult(score: minEval, bestMove: bestMove, interrupted: true);
      }

      if (evalResult.score < minEval) {
        minEval = evalResult.score;
        bestMove = move;
      }
      beta = min(beta, evalResult.score);
      if (beta <= alpha) {
        if (move['captured'] == null && ply < 64) {
          _killerMoves[ply][1] = _killerMoves[ply][0];
          _killerMoves[ply][0] = move;
        }
        break; // Alpha Cutoff
      }
    }

    if (_ttCache.length < 60000 && deadline == null) {
      _ttCache[fen] = {'score': minEval, 'depth': depth};
    }
    return MinimaxResult(score: minEval, bestMove: bestMove);
  }
}

class SearchResult {
  final int score;
  final Map<String, dynamic>? bestMove;
  final int depthReached;

  const SearchResult({
    required this.score,
    this.bestMove,
    required this.depthReached,
  });
}

// Iterative Deepening Search with Time Budgeting
SearchResult searchBestMoveIterative(
  chess.Chess game,
  int maxDepth,
  int maxTimeMs,
  bool isMaximizing, {
  AIPersonalityId personality = AIPersonalityId.balanced,
}) {
  final startTime = DateTime.now().millisecondsSinceEpoch;
  final deadline = startTime + maxTimeMs;

  final rawMoves = game.moves({'verbose': true});
  if (rawMoves.isEmpty) {
    return SearchResult(score: evaluatePosition(game, personality), depthReached: 0);
  }

  Map<String, dynamic>? bestMove = rawMoves.first as Map<String, dynamic>;
  int bestScore = isMaximizing ? -999999 : 999999;
  int depthReached = 1;

  for (int d = 1; d <= maxDepth; d++) {
    if (DateTime.now().millisecondsSinceEpoch >= deadline && d > 1) {
      break;
    }

    final result = minimax(
      game,
      d,
      -999999,
      999999,
      isMaximizing,
      personality: personality,
      useQuiescence: true,
      deadline: deadline,
      ply: 0,
    );

    if (!result.interrupted && result.bestMove != null) {
      bestMove = result.bestMove;
      bestScore = result.score;
      depthReached = d;
    } else if (result.bestMove != null && d == 1) {
      bestMove = result.bestMove;
      bestScore = result.score;
    }

    if (DateTime.now().millisecondsSinceEpoch >= deadline) {
      break;
    }
  }

  return SearchResult(score: bestScore, bestMove: bestMove, depthReached: depthReached);
}
