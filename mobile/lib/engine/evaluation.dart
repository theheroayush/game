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
  String? whiteKingSquare;
  String? blackKingSquare;

  // Scan 64 squares - First pass: Material & structure setup
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
      } else if (pType == 'k') {
        if (isW) {
          whiteKingSquare = sq;
        } else {
          blackKingSquare = sq;
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
          if (isEndgame) {
            positionalBonus += 25; // Passed pawn is devastating in endgame
          }
        }
      }

      // 2. Rooks on Open / Semi-Open Files & 7th Rank
      if (pType == 'r') {
        final ownPawns = isW ? whitePawnFiles[file] : blackPawnFiles[file];
        final enemyPawns = isW ? blackPawnFiles[file] : whitePawnFiles[file];
        if (ownPawns == 0 && enemyPawns == 0) {
          positionalBonus += 30; // Open file
        } else if (ownPawns == 0) {
          positionalBonus += 15; // Semi-open file
        }

        // Rook on 7th Rank Bonus (+35cp)
        if ((isW && rank == 7) || (!isW && rank == 2)) {
          positionalBonus += 35;
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

  // King Safety & Pawn Shelter (Midgame)
  if (!isEndgame) {
    // White King Safety
    if (whiteKingSquare != null) {
      final wkFile = whiteKingSquare.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final wkRank = int.parse(whiteKingSquare[1]);
      if (wkRank == 1 && wkFile >= 5) {
        // Castled kingside: f2, g2, h2 shield
        if (whitePawnFiles[5] == 0) whiteScore -= 25;
        if (whitePawnFiles[6] == 0) whiteScore -= 40;
        if (whitePawnFiles[7] == 0) whiteScore -= 20;
        whiteScore += 25; // Castled shelter bonus
      } else if (wkRank == 1 && wkFile <= 2) {
        // Castled queenside
        if (whitePawnFiles[0] == 0) whiteScore -= 20;
        if (whitePawnFiles[1] == 0) whiteScore -= 35;
        if (whitePawnFiles[2] == 0) whiteScore -= 25;
        whiteScore += 25;
      } else if (wkRank <= 2 && (wkFile == 3 || wkFile == 4)) {
        // King stuck in the center
        if (whitePawnFiles[3] == 0 || blackPawnFiles[3] == 0 || whitePawnFiles[4] == 0 || blackPawnFiles[4] == 0) {
          whiteScore -= 35; // Exposed central file
        }
      }
    }

    // Black King Safety
    if (blackKingSquare != null) {
      final bkFile = blackKingSquare.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final bkRank = int.parse(blackKingSquare[1]);
      if (bkRank == 8 && bkFile >= 5) {
        // Castled kingside: f7, g7, h7 shield
        if (blackPawnFiles[5] == 0) blackScore -= 25;
        if (blackPawnFiles[6] == 0) blackScore -= 40;
        if (blackPawnFiles[7] == 0) blackScore -= 20;
        blackScore += 25;
      } else if (bkRank == 8 && bkFile <= 2) {
        // Castled queenside
        if (blackPawnFiles[0] == 0) blackScore -= 20;
        if (blackPawnFiles[1] == 0) blackScore -= 35;
        if (blackPawnFiles[2] == 0) blackScore -= 25;
        blackScore += 25;
      } else if (bkRank >= 7 && (bkFile == 3 || bkFile == 4)) {
        // King stuck in the center
        if (blackPawnFiles[3] == 0 || whitePawnFiles[3] == 0 || blackPawnFiles[4] == 0 || whitePawnFiles[4] == 0) {
          blackScore -= 35;
        }
      }
    }
  }

  // Bishop Pair Bonus (+45cp)
  if (whiteBishops >= 2) whiteScore += 45;
  if (blackBishops >= 2) blackScore += 45;

  // Personality adjustments
  int personalityMod = 0;
  if (personality == AIPersonalityId.aggressive) {
    personalityMod += (whiteMaterial > blackMaterial ? 40 : -40);
    if (game.in_check) {
      personalityMod += game.turn == chess.Color.BLACK ? 65 : -65;
    }
  } else if (personality == AIPersonalityId.tactical) {
    if (game.in_check) {
      personalityMod += game.turn == chess.Color.BLACK ? 50 : -50;
    }
  } else if (personality == AIPersonalityId.positional) {
    if (whiteBishops >= 2) personalityMod += 25;
    if (blackBishops >= 2) personalityMod -= 25;
  }

  return whiteScore - blackScore + personalityMod;
}

// Quiescence Search with Check Evasion and Exchange Resolution
int quiescence(
  chess.Chess game,
  int alpha,
  int beta,
  bool isMaximizing, [
  int depth = 4,
  AIPersonalityId personality = AIPersonalityId.balanced,
]) {
  if (game.game_over) {
    return evaluatePosition(game, personality);
  }

  final standPat = evaluatePosition(game, personality);
  if (depth <= 0) {
    return standPat;
  }

  final inCheck = game.in_check;
  const int bigDelta = 925; // Queen value + safety buffer

  if (isMaximizing) {
    if (!inCheck) {
      if (standPat >= beta) return beta;
      if (standPat > alpha) alpha = standPat;
      if (standPat < alpha - bigDelta) return alpha;
    }

    final rawMoves = game.moves({'verbose': true});
    final captureMoves = <Map<String, dynamic>>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (inCheck || map['captured'] != null || map['flags'].toString().contains('p')) {
        captureMoves.add(map);
      }
    }

    if (captureMoves.isEmpty) return inCheck ? -99999 : standPat;

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
    if (!inCheck) {
      if (standPat <= alpha) return alpha;
      if (standPat < beta) beta = standPat;
      if (standPat > beta + bigDelta) return beta;
    }

    final rawMoves = game.moves({'verbose': true});
    final captureMoves = <Map<String, dynamic>>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (inCheck || map['captured'] != null || map['flags'].toString().contains('p')) {
        captureMoves.add(map);
      }
    }

    if (captureMoves.isEmpty) return inCheck ? 99999 : standPat;

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

// History Heuristic Table: 64x64 quiet move cutoffs
final List<List<int>> _historyTable = List.generate(64, (_) => List.filled(64, 0));

enum TTFlag { exact, lowerBound, upperBound }

class TTEntry {
  final int depth;
  final int score;
  final TTFlag flag;
  final String? bestFrom;
  final String? bestTo;
  final String? bestPromo;

  const TTEntry({
    required this.depth,
    required this.score,
    required this.flag,
    this.bestFrom,
    this.bestTo,
    this.bestPromo,
  });
}

// Transposition Table Cache
final Map<String, TTEntry> _ttCache = {};

void resetEngineSearchState() {
  for (int i = 0; i < 64; i++) {
    _killerMoves[i][0] = null;
    _killerMoves[i][1] = null;
  }
  for (int i = 0; i < 64; i++) {
    for (int j = 0; j < 64; j++) {
      _historyTable[i][j] = 0;
    }
  }
  if (_ttCache.length > 80000) {
    _ttCache.clear();
  }
}

int _squareToIdx(String sq) {
  if (sq.length < 2) return 0;
  final f = sq.codeUnitAt(0) - 97;
  final r = int.tryParse(sq[1]) ?? 1;
  return ((r - 1) * 8 + f).clamp(0, 63);
}

class ScoredMove {
  final Map<String, dynamic> move;
  final int score;

  const ScoredMove({required this.move, required this.score});
}

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

class SearchResult {
  final int score;
  final Map<String, dynamic>? bestMove;
  final int depthReached;
  final List<ScoredMove> rootMoves;

  const SearchResult({
    required this.score,
    this.bestMove,
    required this.depthReached,
    required this.rootMoves,
  });
}

// Minimax with Alpha-Beta, Transposition Table, Killer Moves, History Heuristic & Quiescence
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
      return MinimaxResult(score: quiescence(game, alpha, beta, isMaximizing, 4, personality));
    }
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  if (game.game_over) {
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  final fen = game.fen;
  final cached = _ttCache[fen];
  if (cached != null && cached.depth >= depth) {
    if (cached.flag == TTFlag.exact) {
      return MinimaxResult(score: cached.score);
    } else if (cached.flag == TTFlag.lowerBound && cached.score >= beta) {
      return MinimaxResult(score: cached.score);
    } else if (cached.flag == TTFlag.upperBound && cached.score <= alpha) {
      return MinimaxResult(score: cached.score);
    }
  }

  final rawMoves = game.moves({'verbose': true});
  if (rawMoves.isEmpty) {
    return MinimaxResult(score: evaluatePosition(game, personality));
  }

  final moves = rawMoves.map((m) => m as Map<String, dynamic>).toList();

  // Move Ordering:
  // 1. Hash Move (from TT) (+30000)
  // 2. MVV-LVA Captures (+10000)
  // 3. Killer Moves (+8000, +7000)
  // 4. History Heuristic (+1 to +5000)
  // 5. Tactical Checks (+500)
  final hashFrom = cached?.bestFrom;
  final hashTo = cached?.bestTo;
  final currentKillers = ply < 64 ? _killerMoves[ply] : [null, null];

  moves.sort((a, b) {
    int aScore = 0;
    int bScore = 0;

    // 1. Hash Move from Transposition Table
    if (hashFrom != null && a['from'] == hashFrom && a['to'] == hashTo) aScore += 30000;
    if (hashFrom != null && b['from'] == hashFrom && b['to'] == hashTo) bScore += 30000;

    // 2. Captures MVV-LVA
    final aCaptured = a['captured']?.toString() ?? '';
    final bCaptured = b['captured']?.toString() ?? '';
    if (aCaptured.isNotEmpty) aScore += (PIECE_VALUES[aCaptured] ?? 0) * 10 - (PIECE_VALUES[a['piece']?.toString() ?? ''] ?? 0) + 10000;
    if (bCaptured.isNotEmpty) bScore += (PIECE_VALUES[bCaptured] ?? 0) * 10 - (PIECE_VALUES[b['piece']?.toString() ?? ''] ?? 0) + 10000;

    if (a['flags'].toString().contains('p')) aScore += 9000;
    if (b['flags'].toString().contains('p')) bScore += 9000;

    // 3. Killer moves
    if (currentKillers[0] != null && a['from'] == currentKillers[0]!['from'] && a['to'] == currentKillers[0]!['to']) aScore += 8000;
    if (currentKillers[0] != null && b['from'] == currentKillers[0]!['from'] && b['to'] == currentKillers[0]!['to']) bScore += 8000;

    if (currentKillers[1] != null && a['from'] == currentKillers[1]!['from'] && a['to'] == currentKillers[1]!['to']) aScore += 7000;
    if (currentKillers[1] != null && b['from'] == currentKillers[1]!['from'] && b['to'] == currentKillers[1]!['to']) bScore += 7000;

    // 4. History Heuristic for quiet moves
    if (aCaptured.isEmpty) {
      final aFrom = _squareToIdx(a['from'].toString());
      final aTo = _squareToIdx(a['to'].toString());
      aScore += min(_historyTable[aFrom][aTo], 5000);
    }
    if (bCaptured.isEmpty) {
      final bFrom = _squareToIdx(b['from'].toString());
      final bTo = _squareToIdx(b['to'].toString());
      bScore += min(_historyTable[bFrom][bTo], 5000);
    }

    // 5. Tactical Checks
    final aSan = a['san']?.toString() ?? '';
    final bSan = b['san']?.toString() ?? '';
    if (aSan.contains('+') || aSan.contains('#')) aScore += 500;
    if (bSan.contains('+') || bSan.contains('#')) bScore += 500;

    return bScore.compareTo(aScore);
  });

  Map<String, dynamic>? bestMove = moves.first;
  final int initialAlpha = alpha;
  final int initialBeta = beta;

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

      if (evalResult.interrupted) {
        return MinimaxResult(score: maxEval, bestMove: bestMove, interrupted: true);
      }

      if (evalResult.score > maxEval) {
        maxEval = evalResult.score;
        bestMove = move;
      }
      alpha = max(alpha, evalResult.score);
      if (beta <= alpha) {
        // Record Killer Move and update History Heuristic on quiet beta cutoff
        if (move['captured'] == null) {
          if (ply < 64) {
            _killerMoves[ply][1] = _killerMoves[ply][0];
            _killerMoves[ply][0] = move;
          }
          final fIdx = _squareToIdx(move['from'].toString());
          final tIdx = _squareToIdx(move['to'].toString());
          _historyTable[fIdx][tIdx] += depth * depth;
        }
        break; // Beta Cutoff
      }
    }

    // Store entry in Transposition Table
    TTFlag flag = TTFlag.exact;
    if (maxEval <= initialAlpha) {
      flag = TTFlag.upperBound;
    } else if (maxEval >= beta) {
      flag = TTFlag.lowerBound;
    }

    if (_ttCache.length < 100000) {
      _ttCache[fen] = TTEntry(
        depth: depth,
        score: maxEval,
        flag: flag,
        bestFrom: bestMove?['from'] as String?,
        bestTo: bestMove?['to'] as String?,
        bestPromo: bestMove?['promotion']?.toString(),
      );
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

      if (evalResult.interrupted) {
        return MinimaxResult(score: minEval, bestMove: bestMove, interrupted: true);
      }

      if (evalResult.score < minEval) {
        minEval = evalResult.score;
        bestMove = move;
      }
      beta = min(beta, evalResult.score);
      if (beta <= alpha) {
        if (move['captured'] == null) {
          if (ply < 64) {
            _killerMoves[ply][1] = _killerMoves[ply][0];
            _killerMoves[ply][0] = move;
          }
          final fIdx = _squareToIdx(move['from'].toString());
          final tIdx = _squareToIdx(move['to'].toString());
          _historyTable[fIdx][tIdx] += depth * depth;
        }
        break; // Alpha Cutoff
      }
    }

    TTFlag flag = TTFlag.exact;
    if (minEval >= initialBeta) {
      flag = TTFlag.lowerBound;
    } else if (minEval <= alpha) {
      flag = TTFlag.upperBound;
    }

    if (_ttCache.length < 100000) {
      _ttCache[fen] = TTEntry(
        depth: depth,
        score: minEval,
        flag: flag,
        bestFrom: bestMove?['from'] as String?,
        bestTo: bestMove?['to'] as String?,
        bestPromo: bestMove?['promotion']?.toString(),
      );
    }

    return MinimaxResult(score: minEval, bestMove: bestMove);
  }
}

// Iterative Deepening Search with Time Budgeting and Committed Depth Buffer
SearchResult searchBestMoveIterative(
  chess.Chess game,
  int maxDepth,
  int maxTimeMs,
  bool isMaximizing, {
  AIPersonalityId personality = AIPersonalityId.balanced,
  bool useQuiescence = true,
}) {
  final startTime = DateTime.now().millisecondsSinceEpoch;
  final deadline = startTime + maxTimeMs;

  final rawMoves = game.moves({'verbose': true});
  if (rawMoves.isEmpty) {
    return SearchResult(
      score: evaluatePosition(game, personality),
      depthReached: 0,
      rootMoves: const [],
    );
  }

  final rootCandidates = rawMoves.map((m) => m as Map<String, dynamic>).toList();
  Map<String, dynamic> completedBestMove = rootCandidates.first;
  int completedScore = isMaximizing ? -999999 : 999999;
  int completedDepth = 1;
  List<ScoredMove> completedRootMoves = [];

  // Reset killer moves & history for fresh search
  resetEngineSearchState();

  final currentOrderedMoves = List<Map<String, dynamic>>.from(rootCandidates);

  for (int d = 1; d <= maxDepth; d++) {
    final elapsed = DateTime.now().millisecondsSinceEpoch - startTime;
    // Predictive time cutoff: if more than 75% of budget has elapsed and d > 2, do not start deeper iteration
    if (d > 2 && elapsed >= maxTimeMs * 0.75) {
      break;
    }

    int alpha = -999999;
    int beta = 999999;
    bool iterationInterrupted = false;
    final iterationScoredMoves = <ScoredMove>[];

    // Put previously found best move first to maximize alpha-beta cutoffs
    currentOrderedMoves.sort((a, b) {
      if (a['from'] == completedBestMove['from'] && a['to'] == completedBestMove['to']) return -1;
      if (b['from'] == completedBestMove['from'] && b['to'] == completedBestMove['to']) return 1;
      return 0;
    });

    Map<String, dynamic>? currentDepthBestMove;
    int currentDepthBestScore = isMaximizing ? -999999 : 999999;

    for (final move in currentOrderedMoves) {
      if (DateTime.now().millisecondsSinceEpoch >= deadline && d > 1) {
        iterationInterrupted = true;
        break;
      }

      game.move(move);
      final res = minimax(
        game,
        d - 1,
        alpha,
        beta,
        !isMaximizing,
        personality: personality,
        useQuiescence: useQuiescence,
        deadline: deadline,
        ply: 1,
      );
      game.undo();

      if (res.interrupted) {
        iterationInterrupted = true;
        break;
      }

      iterationScoredMoves.add(ScoredMove(move: move, score: res.score));

      if (isMaximizing) {
        if (res.score > currentDepthBestScore) {
          currentDepthBestScore = res.score;
          currentDepthBestMove = move;
        }
        alpha = max(alpha, res.score);
      } else {
        if (res.score < currentDepthBestScore) {
          currentDepthBestScore = res.score;
          currentDepthBestMove = move;
        }
        beta = min(beta, res.score);
      }
    }

    // Only commit if iteration fully evaluated all root moves!
    if (!iterationInterrupted && currentDepthBestMove != null && iterationScoredMoves.length == rootCandidates.length) {
      iterationScoredMoves.sort((a, b) {
        return isMaximizing ? b.score.compareTo(a.score) : a.score.compareTo(b.score);
      });

      completedBestMove = currentDepthBestMove;
      completedScore = currentDepthBestScore;
      completedDepth = d;
      completedRootMoves = List.from(iterationScoredMoves);

      // Re-order currentOrderedMoves for next depth
      currentOrderedMoves.clear();
      for (final sm in iterationScoredMoves) {
        currentOrderedMoves.add(sm.move);
      }
    } else if (d == 1 && iterationScoredMoves.isNotEmpty) {
      // Ensure at least depth 1 has data
      iterationScoredMoves.sort((a, b) {
        return isMaximizing ? b.score.compareTo(a.score) : a.score.compareTo(b.score);
      });
      completedBestMove = iterationScoredMoves.first.move;
      completedScore = iterationScoredMoves.first.score;
      completedRootMoves = List.from(iterationScoredMoves);
    }

    if (DateTime.now().millisecondsSinceEpoch >= deadline) {
      break;
    }
  }

  // Fallback if completedRootMoves is empty
  if (completedRootMoves.isEmpty) {
    completedRootMoves = rootCandidates.map((m) => ScoredMove(move: m, score: completedScore)).toList();
  }

  return SearchResult(
    score: completedScore,
    bestMove: completedBestMove,
    depthReached: completedDepth,
    rootMoves: completedRootMoves,
  );
}
