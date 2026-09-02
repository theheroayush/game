import { AIPersonalityId } from '../types/chess';
import { DIFFICULTY_LEVELS } from './engineConfig';
import { Chess, Move } from 'chess.js';
import { evaluatePosition, searchBestMoveIterative } from './evaluation';
import { findOpeningByMoves } from '../data/openings';
import { WorkerRequest, WorkerResponse } from './aiWorker';

export interface AIMoveResult {
  from: string;
  to: string;
  promotion?: string;
  san: string;
  score: number;
}

class EngineService {
  private worker: Worker | null = null;
  private pendingRequests = new Map<string, { resolve: (res: AIMoveResult) => void; reject: (err: unknown) => void }>();

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    try {
      if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
        this.worker = new Worker(new URL('./aiWorker.ts', import.meta.url), { type: 'module' });
        this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
          const res = e.data;
          const handler = this.pendingRequests.get(res.id);
          if (handler) {
            this.pendingRequests.delete(res.id);
            if (res.type === 'BEST_MOVE' && res.move) {
              handler.resolve({
                from: res.move.from,
                to: res.move.to,
                promotion: res.move.promotion,
                san: res.move.san,
                score: res.score || 0,
              });
            } else {
              handler.reject(new Error(res.error || 'Failed to compute best move'));
            }
          }
        };
        this.worker.onerror = (err) => {
          console.warn('AI Worker encountered an error, falling back to non-blocking main thread execution:', err);
        };
      }
    } catch (err) {
      console.warn('Web Worker initialization skipped:', err);
      this.worker = null;
    }
  }

  public async getBestMove(
    fen: string,
    level: number,
    personality: AIPersonalityId,
    moveSans: string[] = []
  ): Promise<AIMoveResult> {
    const diff = DIFFICULTY_LEVELS.find(d => d.level === level) || DIFFICULTY_LEVELS[2];
    
    // Add natural human cadence (100ms - 250ms)
    const cadenceDelay = Math.min(diff.moveTimeMs / 2, 250);
    await new Promise(resolve => setTimeout(resolve, cadenceDelay));

    // Try Web Worker if active
    if (this.worker) {
      try {
        const requestId = `ai_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const workerPromise = new Promise<AIMoveResult>((resolve, reject) => {
          this.pendingRequests.set(requestId, { resolve, reject });
        });

        const req: WorkerRequest = {
          id: requestId,
          type: 'SEARCH_MOVE',
          fen,
          level,
          personality,
          moveSans,
        };

        this.worker.postMessage(req);

        // Safety timeout to prevent hanging forever
        const timeoutPromise = new Promise<AIMoveResult>((_, reject) => {
          setTimeout(() => {
            this.pendingRequests.delete(requestId);
            reject(new Error('Worker move calculation timed out'));
          }, diff.moveTimeMs + 1200);
        });

        return await Promise.race([workerPromise, timeoutPromise]);
      } catch (err) {
        console.warn('Worker computation failed or timed out, running cooperative fallback search:', err);
      }
    }

    // Cooperative non-blocking main thread fallback
    await new Promise(resolve => setTimeout(resolve, 0));
    return this.calculateMove(fen, level, personality, moveSans);
  }

  private calculateMove(
    fen: string,
    level: number,
    personality: AIPersonalityId,
    moveSans: string[]
  ): AIMoveResult {
    const chess = new Chess(fen);
    const diff = DIFFICULTY_LEVELS.find(d => d.level === level) || DIFFICULTY_LEVELS[2];
    const isWhite = chess.turn() === 'w';

    // 1. Opening book check (first 12 plies)
    if (moveSans.length < 12) {
      const opening = findOpeningByMoves(moveSans);
      if (opening && moveSans.length < opening.moves.length) {
        const nextSan = opening.moves[moveSans.length];
        try {
          const temp = new Chess(fen);
          const bookMove = temp.move(nextSan);
          if (bookMove) {
            return {
              from: bookMove.from,
              to: bookMove.to,
              promotion: bookMove.promotion,
              san: bookMove.san,
              score: evaluatePosition(temp, personality),
            };
          }
        } catch {
          // Ignore and continue to search
        }
      }
    }

    // 2. Iterative Deepening with time budget & quiescence
    const searchResult = searchBestMoveIterative(
      chess,
      diff.depth,
      diff.moveTimeMs,
      isWhite,
      personality
    );

    let chosen: Move | undefined = searchResult.bestMove;

    // 3. Humanized blunder injection for lower Elo levels (1 to 4)
    if (diff.blunderProbability > 0 && Math.random() < diff.blunderProbability) {
      const legalMoves = chess.moves({ verbose: true });
      if (legalMoves.length > 1) {
        chosen = legalMoves[Math.floor(Math.random() * Math.min(legalMoves.length, 3))];
      }
    }

    if (!chosen) {
      const legalMoves = chess.moves({ verbose: true });
      chosen = legalMoves[0];
    }

    if (!chosen) {
      throw new Error('No legal move available in position');
    }

    return {
      from: chosen.from,
      to: chosen.to,
      promotion: chosen.promotion,
      san: chosen.san,
      score: searchResult.score,
    };
  }
}

export const engineService = new EngineService();
