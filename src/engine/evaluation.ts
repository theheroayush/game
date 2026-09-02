import { Chess, Square, PieceSymbol, Color, Move } from 'chess.js';
import { AIPersonalityId } from '../types/chess';

// Standard piece values in centipawns
export const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 100,
  n: 325,
  b: 335,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece Square Tables (from White's perspective, rank 8 to 1, a to h)
const PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const ROOK_PST = [
   0,  0,  0,  0,  0,  0,  0,  0,
   5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
   0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_PST = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_MIDGAME_PST = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20
];

const KING_ENDGAME_PST = [
  -50,-40,-30,-20,-20,-30,-40,-50,
  -30,-20,-10,  0,  0,-10,-20,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-30,  0,  0,  0,  0,-30,-30,
  -50,-30,-30,-30,-30,-30,-30,-50
];

function getSquareIndex(square: Square, color: Color): number {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(square[1], 10) - 1;
  if (color === 'w') {
    return (7 - rank) * 8 + file;
  } else {
    return rank * 8 + file;
  }
}

// Advanced Positional Evaluation
export function evaluatePosition(chess: Chess, personality: AIPersonalityId = 'balanced'): number {
  if (chess.isCheckmate()) {
    return chess.turn() === 'w' ? -99999 : 99999;
  }
  if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition() || chess.isInsufficientMaterial()) {
    return 0;
  }

  let whiteScore = 0;
  let blackScore = 0;
  let whiteMaterial = 0;
  let blackMaterial = 0;
  let whiteBishops = 0;
  let blackBishops = 0;

  const board = chess.board();
  const whitePawnFiles = new Array(8).fill(0);
  const blackPawnFiles = new Array(8).fill(0);

  // First pass: Material, PST, and Pawn distribution
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const isW = piece.color === 'w';
      const pType = piece.type;
      const val = PIECE_VALUES[pType];

      if (pType === 'p') {
        if (isW) whitePawnFiles[c]++;
        else blackPawnFiles[c]++;
      } else if (pType === 'b') {
        if (isW) whiteBishops++;
        else blackBishops++;
      }

      if (pType !== 'k') {
        if (isW) whiteMaterial += val;
        else blackMaterial += val;
      }
    }
  }

  const isEndgame = whiteMaterial < 1500 && blackMaterial < 1500;

  // Second pass: Positional evaluation
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const square = piece.square;
      const isW = piece.color === 'w';
      const pType = piece.type;
      const val = PIECE_VALUES[pType];
      const sqIdx = getSquareIndex(square, piece.color);

      let pstVal = 0;
      switch (pType) {
        case 'p': pstVal = PAWN_PST[sqIdx]; break;
        case 'n': pstVal = KNIGHT_PST[sqIdx]; break;
        case 'b': pstVal = BISHOP_PST[sqIdx]; break;
        case 'r': pstVal = ROOK_PST[sqIdx]; break;
        case 'q': pstVal = QUEEN_PST[sqIdx]; break;
        case 'k': pstVal = isEndgame ? KING_ENDGAME_PST[sqIdx] : KING_MIDGAME_PST[sqIdx]; break;
      }

      let positionalBonus = 0;

      // 1. Pawn Structure (Passed, Doubled, Isolated)
      if (pType === 'p') {
        const fileCount = isW ? whitePawnFiles[c] : blackPawnFiles[c];
        if (fileCount > 1) positionalBonus -= 15; // Doubled pawn penalty

        const leftCount = c > 0 ? (isW ? whitePawnFiles[c - 1] : blackPawnFiles[c - 1]) : 0;
        const rightCount = c < 7 ? (isW ? whitePawnFiles[c + 1] : blackPawnFiles[c + 1]) : 0;
        if (leftCount === 0 && rightCount === 0) positionalBonus -= 18; // Isolated pawn penalty

        // Passed Pawn bonus (no opposing pawns ahead)
        const rank = parseInt(square[1], 10);
        let isPassed = true;
        const oppFiles = isW ? blackPawnFiles : whitePawnFiles;
        for (let df = Math.max(0, c - 1); df <= Math.min(7, c + 1); df++) {
          if (oppFiles[df] > 0) {
            // Simplified passed pawn check
            isPassed = false;
            break;
          }
        }
        if (isPassed) {
          const advancement = isW ? rank : 9 - rank;
          positionalBonus += advancement * 15;
        }
      }

      // 2. Rooks on Open / Semi-Open Files
      if (pType === 'r') {
        const ownPawns = isW ? whitePawnFiles[c] : blackPawnFiles[c];
        const enemyPawns = isW ? blackPawnFiles[c] : whitePawnFiles[c];
        if (ownPawns === 0 && enemyPawns === 0) positionalBonus += 30; // Fully Open File
        else if (ownPawns === 0) positionalBonus += 15; // Semi-Open File
      }

      // 3. Knight Outposts on 4th/5th ranks
      if (pType === 'n') {
        const rank = parseInt(square[1], 10);
        if ((isW && (rank === 4 || rank === 5)) || (!isW && (rank === 5 || rank === 4))) {
          if (c >= 2 && c <= 5) positionalBonus += 20; // Central Outpost
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
  let personalityMod = 0;
  if (personality === 'aggressive') {
    personalityMod += (whiteMaterial > blackMaterial ? 35 : -35);
  } else if (personality === 'tactical') {
    if (chess.inCheck()) {
      personalityMod += chess.turn() === 'b' ? 45 : -45;
    }
  }

  return whiteScore - blackScore + personalityMod;
}

// Quiescence Search with Delta Pruning to prevent horizon effect
export function quiescence(
  chess: Chess,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  depth: number = 3,
  personality: AIPersonalityId = 'balanced'
): number {
  const standPat = evaluatePosition(chess, personality);
  if (depth <= 0 || chess.isGameOver()) {
    return standPat;
  }

  const BIG_DELTA = 925; // Queen value + safety buffer for delta pruning

  if (isMaximizing) {
    if (standPat >= beta) return beta;
    if (standPat > alpha) alpha = standPat;

    // Delta Pruning
    if (standPat < alpha - BIG_DELTA) {
      return alpha;
    }

    const captureMoves = chess.moves({ verbose: true }).filter(m => m.captured || m.promotion);
    if (captureMoves.length === 0) return standPat;

    // MVV-LVA move ordering for captures
    captureMoves.sort((a, b) => {
      const aVal = (a.captured ? PIECE_VALUES[a.captured] * 10 : 0) - PIECE_VALUES[a.piece];
      const bVal = (b.captured ? PIECE_VALUES[b.captured] * 10 : 0) - PIECE_VALUES[b.piece];
      return bVal - aVal;
    });

    for (const move of captureMoves) {
      chess.move(move);
      const score = quiescence(chess, alpha, beta, false, depth - 1, personality);
      chess.undo();

      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    }
    return alpha;
  } else {
    if (standPat <= alpha) return alpha;
    if (standPat < beta) beta = standPat;

    if (standPat > beta + BIG_DELTA) {
      return beta;
    }

    const captureMoves = chess.moves({ verbose: true }).filter(m => m.captured || m.promotion);
    if (captureMoves.length === 0) return standPat;

    captureMoves.sort((a, b) => {
      const aVal = (a.captured ? PIECE_VALUES[a.captured] * 10 : 0) - PIECE_VALUES[a.piece];
      const bVal = (b.captured ? PIECE_VALUES[b.captured] * 10 : 0) - PIECE_VALUES[b.piece];
      return bVal - aVal;
    });

    for (const move of captureMoves) {
      chess.move(move);
      const score = quiescence(chess, alpha, beta, true, depth - 1, personality);
      chess.undo();

      if (score <= alpha) return alpha;
      if (score < beta) beta = score;
    }
    return beta;
  }
}

// Killer Moves table: 2 killer moves per ply
const killerMoves: (Move | undefined)[][] = Array.from({ length: 64 }, () => [undefined, undefined]);

// Transposition Table Cache
const ttCache = new Map<string, { score: number; depth: number }>();

// Minimax with Alpha-Beta Pruning, Killer Moves & Quiescence
export function minimax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  personality: AIPersonalityId = 'balanced',
  useQuiescence: boolean = true,
  deadline?: number,
  ply: number = 0
): { score: number; bestMove?: Move; interrupted?: boolean } {
  if (deadline && Date.now() >= deadline) {
    return { score: evaluatePosition(chess, personality), interrupted: true };
  }

  if (depth <= 0) {
    if (useQuiescence) {
      return { score: quiescence(chess, alpha, beta, isMaximizing, 3, personality) };
    }
    return { score: evaluatePosition(chess, personality) };
  }

  if (chess.isGameOver()) {
    return { score: evaluatePosition(chess, personality) };
  }

  const fen = chess.fen();
  const cached = ttCache.get(fen);
  if (cached && cached.depth >= depth && !deadline) {
    return { score: cached.score };
  }

  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) {
    return { score: evaluatePosition(chess, personality) };
  }

  // Enhanced Move Ordering: (Captures -> Killer Moves -> Checks -> Quiet)
  const currentKillers = killerMoves[ply] || [];
  moves.sort((a, b) => {
    let aScore = 0;
    let bScore = 0;

    if (a.captured) aScore += PIECE_VALUES[a.captured] * 10 - PIECE_VALUES[a.piece] + 10000;
    if (b.captured) bScore += PIECE_VALUES[b.captured] * 10 - PIECE_VALUES[b.piece] + 10000;

    if (a.promotion) aScore += 9000;
    if (b.promotion) bScore += 9000;

    if (currentKillers[0] && a.from === currentKillers[0].from && a.to === currentKillers[0].to) aScore += 8000;
    if (currentKillers[0] && b.from === currentKillers[0].from && b.to === currentKillers[0].to) bScore += 8000;

    if (currentKillers[1] && a.from === currentKillers[1].from && a.to === currentKillers[1].to) aScore += 7000;
    if (currentKillers[1] && b.from === currentKillers[1].from && b.to === currentKillers[1].to) bScore += 7000;

    if (a.san.includes('+') || a.san.includes('#')) aScore += 500;
    if (b.san.includes('+') || b.san.includes('#')) bScore += 500;

    return bScore - aScore;
  });

  let bestMove: Move | undefined = moves[0];

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      if (deadline && Date.now() >= deadline) {
        return { score: maxEval === -Infinity ? evaluatePosition(chess, personality) : maxEval, bestMove, interrupted: true };
      }

      chess.move(move);
      const evalResult = minimax(chess, depth - 1, alpha, beta, false, personality, useQuiescence, deadline, ply + 1);
      chess.undo();

      if (evalResult.interrupted && evalResult.score === undefined) {
        return { score: maxEval, bestMove, interrupted: true };
      }

      if (evalResult.score > maxEval) {
        maxEval = evalResult.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, evalResult.score);
      if (beta <= alpha) {
        // Record Killer Move on quiet beta cutoff
        if (!move.captured && ply < 64) {
          killerMoves[ply][1] = killerMoves[ply][0];
          killerMoves[ply][0] = move;
        }
        break; // Beta Cutoff
      }
    }
    if (ttCache.size < 60000 && !deadline) {
      ttCache.set(fen, { score: maxEval, depth });
    }
    return { score: maxEval, bestMove };
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      if (deadline && Date.now() >= deadline) {
        return { score: minEval === Infinity ? evaluatePosition(chess, personality) : minEval, bestMove, interrupted: true };
      }

      chess.move(move);
      const evalResult = minimax(chess, depth - 1, alpha, beta, true, personality, useQuiescence, deadline, ply + 1);
      chess.undo();

      if (evalResult.interrupted && evalResult.score === undefined) {
        return { score: minEval, bestMove, interrupted: true };
      }

      if (evalResult.score < minEval) {
        minEval = evalResult.score;
        bestMove = move;
      }
      beta = Math.min(beta, evalResult.score);
      if (beta <= alpha) {
        // Record Killer Move on quiet beta cutoff
        if (!move.captured && ply < 64) {
          killerMoves[ply][1] = killerMoves[ply][0];
          killerMoves[ply][0] = move;
        }
        break; // Alpha Cutoff
      }
    }
    if (ttCache.size < 60000 && !deadline) {
      ttCache.set(fen, { score: minEval, depth });
    }
    return { score: minEval, bestMove };
  }
}

// Iterative Deepening Search with Time-Budgeting
export function searchBestMoveIterative(
  chess: Chess,
  maxDepth: number,
  maxTimeMs: number,
  isMaximizing: boolean,
  personality: AIPersonalityId = 'balanced'
): { score: number; bestMove?: Move; depthReached: number } {
  const startTime = Date.now();
  const deadline = startTime + maxTimeMs;

  const legalMoves = chess.moves({ verbose: true });
  if (legalMoves.length === 0) {
    return { score: evaluatePosition(chess, personality), depthReached: 0 };
  }

  let bestMove: Move | undefined = legalMoves[0];
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let depthReached = 1;

  for (let d = 1; d <= maxDepth; d++) {
    if (Date.now() >= deadline && d > 1) {
      break;
    }

    const result = minimax(chess, d, -Infinity, Infinity, isMaximizing, personality, true, deadline, 0);
    
    if (!result.interrupted && result.bestMove) {
      bestMove = result.bestMove;
      bestScore = result.score;
      depthReached = d;
    } else if (result.bestMove && d === 1) {
      bestMove = result.bestMove;
      bestScore = result.score;
    }

    if (Date.now() >= deadline) {
      break;
    }
  }

  return { score: bestScore, bestMove, depthReached };
}
