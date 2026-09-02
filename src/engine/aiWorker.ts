import { Chess, Move } from 'chess.js';
import { DIFFICULTY_LEVELS } from './engineConfig';
import { evaluatePosition, searchBestMoveIterative } from './evaluation';
import { findOpeningByMoves } from '../data/openings';
import { AIPersonalityId } from '../types/chess';

export interface WorkerRequest {
  id: string;
  type: 'SEARCH_MOVE' | 'EVAL_POSITION';
  fen: string;
  level: number;
  personality: AIPersonalityId;
  moveSans?: string[];
}

export interface WorkerResponse {
  id: string;
  type: 'BEST_MOVE' | 'EVAL_RESULT' | 'ERROR';
  move?: { from: string; to: string; promotion?: string; san: string };
  score?: number;
  depth?: number;
  error?: string;
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const req = e.data;
  try {
    const chess = new Chess(req.fen);

    if (req.type === 'EVAL_POSITION') {
      const score = evaluatePosition(chess, req.personality);
      const res: WorkerResponse = { id: req.id, type: 'EVAL_RESULT', score };
      self.postMessage(res);
      return;
    }

    if (req.type === 'SEARCH_MOVE') {
      const diff = DIFFICULTY_LEVELS.find(d => d.level === req.level) || DIFFICULTY_LEVELS[2];
      const isWhite = chess.turn() === 'w';

      // 1. Check opening book if in the first 12 plies
      if (req.moveSans && req.moveSans.length < 12) {
        const opening = findOpeningByMoves(req.moveSans);
        if (opening && req.moveSans.length < opening.moves.length) {
          const nextSan = opening.moves[req.moveSans.length];
          try {
            const tempChess = new Chess(req.fen);
            const bookMove = tempChess.move(nextSan);
            if (bookMove) {
              const res: WorkerResponse = {
                id: req.id,
                type: 'BEST_MOVE',
                move: {
                  from: bookMove.from,
                  to: bookMove.to,
                  promotion: bookMove.promotion,
                  san: bookMove.san,
                },
                score: evaluatePosition(tempChess, req.personality),
                depth: 1,
              };
              self.postMessage(res);
              return;
            }
          } catch {
            // Fall through to engine search
          }
        }
      }

      // 2. High-Performance Iterative Deepening Search with Time Budget & Quiescence
      const result = searchBestMoveIterative(
        chess,
        diff.depth,
        diff.moveTimeMs,
        isWhite,
        req.personality
      );

      let chosenMove: Move | undefined = result.bestMove;

      // 3. Humanize engine for lower Elo levels (Controlled Suboptimal Selection)
      if (diff.blunderProbability > 0 && Math.random() < diff.blunderProbability) {
        const legalMoves = chess.moves({ verbose: true });
        if (legalMoves.length > 1) {
          // Pick a random legal move from top alternatives
          const randomIndex = Math.floor(Math.random() * Math.min(legalMoves.length, 3));
          chosenMove = legalMoves[randomIndex];
        }
      }

      if (!chosenMove) {
        const moves = chess.moves({ verbose: true });
        chosenMove = moves[0];
      }

      if (chosenMove) {
        const res: WorkerResponse = {
          id: req.id,
          type: 'BEST_MOVE',
          move: {
            from: chosenMove.from,
            to: chosenMove.to,
            promotion: chosenMove.promotion,
            san: chosenMove.san,
          },
          score: result.score,
          depth: result.depthReached,
        };
        self.postMessage(res);
      } else {
        self.postMessage({ id: req.id, type: 'ERROR', error: 'No legal moves found in position' });
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ id: req.id, type: 'ERROR', error: message });
  }
};
