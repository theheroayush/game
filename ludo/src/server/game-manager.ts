import {
  GameState,
  PlayerColor,
  MoveResult
} from '../types/game';
import {
  createInitialGameState,
  rollDice,
  moveToken,
  handleTurnTimeout
} from '../engine/game-engine';
import { selectAIMove } from '../engine/ai';
import { GameRoom } from './room-manager';

export interface ActionCacheEntry {
  clientActionId: string;
  result: MoveResult | GameState;
  timestamp: number;
}

export class GameManager {
  private games = new Map<string, GameState>(); // roomCode -> GameState
  private actionCache = new Map<string, ActionCacheEntry>(); // clientActionId -> entry
  private timerInterval: NodeJS.Timeout | null = null;
  private onStateChangeCallback?: (roomCode: string, state: GameState) => void;

  constructor() {
    this.startTimerLoop();
  }

  public setOnStateChange(callback: (roomCode: string, state: GameState) => void) {
    this.onStateChangeCallback = callback;
  }

  public startGame(room: GameRoom): GameState {
    const gameState = createInitialGameState({
      code: room.code,
      mode: 'FRIENDS',
      rules: room.rules,
      players: room.players.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        color: p.color,
        type: p.type,
        aiDifficulty: p.aiDifficulty
      }))
    });

    this.games.set(room.code, gameState);
    room.status = 'ACTIVE';
    room.gameState = gameState;

    this.triggerBotTurnIfNeeded(room.code);
    return gameState;
  }

  public getGame(roomCode: string): GameState | undefined {
    return this.games.get(roomCode.toUpperCase());
  }

  public setGame(roomCode: string, state: GameState) {
    this.games.set(roomCode.toUpperCase(), state);
  }

  public hasAction(clientActionId: string): boolean {
    return this.actionCache.has(clientActionId);
  }

  public getCachedAction(clientActionId: string): ActionCacheEntry | undefined {
    return this.actionCache.get(clientActionId);
  }

  public rollDice(
    roomCode: string,
    playerColor: PlayerColor,
    clientActionId: string
  ): { success: boolean; state?: GameState; error?: string } {
    const game = this.getGame(roomCode);
    if (!game) return { success: false, error: 'Game not found' };

    if (this.hasAction(clientActionId)) {
      return { success: true, state: game };
    }

    try {
      const nextState = rollDice(game, playerColor);
      this.games.set(roomCode, nextState);

      this.actionCache.set(clientActionId, {
        clientActionId,
        result: nextState,
        timestamp: Date.now()
      });

      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(roomCode, nextState);
      }

      this.triggerBotTurnIfNeeded(roomCode);
      return { success: true, state: nextState };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid dice roll';
      return { success: false, error: msg };
    }
  }

  public moveToken(
    roomCode: string,
    playerColor: PlayerColor,
    tokenId: string,
    clientActionId: string
  ): { success: boolean; result?: MoveResult; state?: GameState; error?: string } {
    const game = this.getGame(roomCode);
    if (!game) return { success: false, error: 'Game not found' };

    if (this.hasAction(clientActionId)) {
      return { success: true, state: game };
    }

    try {
      const moveRes = moveToken(game, playerColor, tokenId);
      this.games.set(roomCode, moveRes.nextState);

      this.actionCache.set(clientActionId, {
        clientActionId,
        result: moveRes,
        timestamp: Date.now()
      });

      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(roomCode, moveRes.nextState);
      }

      this.triggerBotTurnIfNeeded(roomCode);
      return { success: true, result: moveRes, state: moveRes.nextState };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid move';
      return { success: false, error: msg };
    }
  }

  public triggerBotTurnIfNeeded(roomCode: string) {
    const game = this.getGame(roomCode);
    if (!game || game.status !== 'ACTIVE') return;

    const activePlayer = game.players.find((p) => p.color === game.activePlayerColor);
    if (!activePlayer || activePlayer.type !== 'AI') return;

    // AI thinking delay (600ms to 1000ms for natural feel)
    setTimeout(() => {
      const currentGame = this.getGame(roomCode);
      if (!currentGame || currentGame.status !== 'ACTIVE') return;
      if (currentGame.activePlayerColor !== activePlayer.color) return;

      if (!currentGame.dice.rolled) {
        const rollRes = this.rollDice(roomCode, activePlayer.color, `bot_roll_${Date.now()}`);
        if (!rollRes.success || !rollRes.state) return;

        // If bot rolled and legal moves exist, schedule token move
        if (rollRes.state.legalMoves.length > 0) {
          setTimeout(() => {
            const stateAfterRoll = this.getGame(roomCode);
            if (!stateAfterRoll || stateAfterRoll.activePlayerColor !== activePlayer.color) return;

            const bestTokenId = selectAIMove(
              stateAfterRoll,
              activePlayer.color,
              activePlayer.aiDifficulty || 'NORMAL'
            );

            if (bestTokenId) {
              this.moveToken(roomCode, activePlayer.color, bestTokenId, `bot_move_${Date.now()}`);
            }
          }, 800);
        }
      }
    }, 600);
  }

  private startTimerLoop() {
    this.timerInterval = setInterval(() => {
      const now = Date.now();
      for (const [code, game] of this.games.entries()) {
        if (game.status === 'ACTIVE' && now > game.turnExpiresAt) {
          const nextState = handleTurnTimeout(game);
          this.games.set(code, nextState);
          if (this.onStateChangeCallback) {
            this.onStateChangeCallback(code, nextState);
          }
          this.triggerBotTurnIfNeeded(code);
        }
      }

      // Evict old action cache items (> 5 minutes)
      for (const [key, entry] of this.actionCache.entries()) {
        if (now - entry.timestamp > 300000) {
          this.actionCache.delete(key);
        }
      }
    }, 1000);
  }

  public destroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
