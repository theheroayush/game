import { create } from 'zustand';
import {
  GameState,
  PlayerColor,
  GameMode,
  MoveResult,
  AIDifficulty,
  GameRuleConfig
} from '../types/game';
import {
  createInitialGameState,
  rollDice as engineRollDice,
  moveToken as engineMoveToken,
  handleTurnTimeout
} from '../engine/game-engine';
import { selectAIMove } from '../engine/ai';
import { soundEngine } from '../audio/sound-effects';
import { useUserStore } from './userStore';
import { useRoomStore } from './roomStore';
import { generateActionId } from '../engine/generator';
import confetti from 'canvas-confetti';

export interface AnimatingToken {
  tokenId: string;
  color: PlayerColor;
  currentStep: number;
  targetStep: number;
}

interface GameStoreState {
  gameState: GameState | null;
  isRolling: boolean;
  selectedTokenId: string | null;
  animatingToken: AnimatingToken | null;
  toastMessage: string | null;
  toastType: 'info' | 'success' | 'warning' | 'error';
  turnSecondsRemaining: number;

  // Actions
  startLocalGame: (
    mode: GameMode,
    playerConfigs: Array<{
      id: string;
      name: string;
      avatar: string;
      color: PlayerColor;
      type: 'HUMAN' | 'AI' | 'GUEST';
      aiDifficulty?: AIDifficulty;
    }>,
    rules?: Partial<GameRuleConfig>
  ) => void;
  setNetworkGameState: (state: GameState) => void;
  rollDice: () => void;
  selectToken: (tokenId: string) => void;
  executeMove: (tokenId: string) => void;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  clearToast: () => void;
  quitGame: () => void;
  triggerAIIfNeeded: () => void;
}

let localTimerInterval: NodeJS.Timeout | null = null;
let aiTurnTimeout: NodeJS.Timeout | null = null;

export const useGameStore = create<GameStoreState>()((set, get) => ({
  gameState: null,
  isRolling: false,
  selectedTokenId: null,
  animatingToken: null,
  toastMessage: null,
  toastType: 'info',
  turnSecondsRemaining: 30,

  startLocalGame: (mode, playerConfigs, rules) => {
    if (localTimerInterval) clearInterval(localTimerInterval);
    if (aiTurnTimeout) clearTimeout(aiTurnTimeout);

    const initial = createInitialGameState({
      code: 'LOCAL',
      mode,
      rules,
      players: playerConfigs
    });

    set({
      gameState: initial,
      isRolling: false,
      selectedTokenId: null,
      animatingToken: null,
      turnSecondsRemaining: initial.rules.turnTimerSeconds
    });

    soundEngine.playTurnAlert();

    // Start local timer loop
    localTimerInterval = setInterval(() => {
      const state = get().gameState;
      if (!state || state.status !== 'ACTIVE') return;

      const remaining = Math.max(0, Math.ceil((state.turnExpiresAt - Date.now()) / 1000));
      set({ turnSecondsRemaining: remaining });

      if (remaining <= 5 && remaining > 0) {
        soundEngine.playTimerTick();
      }

      if (remaining === 0) {
        const nextState = handleTurnTimeout(state);
        set({ gameState: nextState, selectedTokenId: null });
        get().showToast('Turn timed out! Turn passed.', 'warning');
        get().triggerAIIfNeeded();
      }
    }, 1000);

    get().triggerAIIfNeeded();
  },

  setNetworkGameState: (state: GameState) => {
    const prev = get().gameState;
    set({
      gameState: state,
      turnSecondsRemaining: Math.max(0, Math.ceil((state.turnExpiresAt - Date.now()) / 1000))
    });

    // Check if game just finished
    if (state.status === 'FINISHED' && (!prev || prev.status !== 'FINISHED')) {
      soundEngine.playVictory();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Record in local user store if human participant
      const myId = useUserStore.getState().profile.id;
      const myPlayer = state.players.find((p) => p.id === myId);
      if (myPlayer) {
        const durationSec = state.finishedAt ? Math.round((state.finishedAt - state.startedAt) / 1000) : 60;
        useUserStore.getState().recordMatch({
          id: `net_match_${Date.now()}`,
          gameId: state.id,
          roomCode: state.code,
          mode: state.mode,
          date: Date.now(),
          playerColor: myPlayer.color,
          rank: myPlayer.rank || state.players.length,
          totalPlayers: state.players.length,
          durationSeconds: durationSec,
          captures: myPlayer.stats.captures,
          tokensHome: myPlayer.stats.tokensHome,
          turnsTaken: myPlayer.stats.turnsTaken,
          opponentNames: state.players.filter((p) => p.id !== myId).map((p) => p.name)
        });
      }
    }
  },

  rollDice: () => {
    const { gameState, isRolling } = get();
    if (!gameState || gameState.status !== 'ACTIVE' || isRolling) return;
    if (gameState.dice.rolled) return;

    const activeColor = gameState.activePlayerColor;
    const activePlayer = gameState.players.find((p) => p.color === activeColor);
    if (!activePlayer) return;

    set({ isRolling: true });
    soundEngine.playDiceRoll();

    // If Online Room Mode (only when not a LOCAL game)
    if (gameState.code !== 'LOCAL') {
      setTimeout(() => {
        set({ isRolling: false });
        useRoomStore.getState().sendGameAction({
          type: 'ROLL_DICE',
          gameId: gameState.id,
          roomCode: gameState.code,
          turnNumber: gameState.turnNumber,
          clientActionId: generateActionId('roll'),
          timestamp: Date.now()
        });
      }, 850);
      return;
    }

    // Local / Offline Mode: 850ms 3D tumble animation
    setTimeout(() => {
      try {
        const nextState = engineRollDice(gameState, activeColor);
        const rolledVal = nextState.dice.value;

        // If legal moves exist:
        if (nextState.legalMoves.length > 0) {
          set({ gameState: nextState, isRolling: false });

          if (rolledVal === 6) {
            get().showToast(`${activePlayer.name} rolled a 6! Tap a glowing token 🎲`, 'success');
          } else {
            get().showToast(`${activePlayer.name} rolled ${rolledVal}! Tap a glowing token.`, 'info');
          }

          // Auto-select if only 1 move available and user preference enabled
          const autoSelect = useUserStore.getState().autoSelectOnlyMove;
          if (nextState.legalMoves.length === 1 && autoSelect && activePlayer.type === 'HUMAN') {
            setTimeout(() => {
              get().executeMove(nextState.legalMoves[0]);
            }, 450);
          }
        } else {
          // No legal moves available: display the roll on the dice cube for 1.4s so player clearly sees it
          const stateWithRollShown: GameState = {
            ...gameState,
            dice: {
              value: rolledVal,
              rolled: true,
              rolledAt: Date.now(),
              turnNumber: gameState.turnNumber
            }
          };

          set({ gameState: stateWithRollShown, isRolling: false });
          const noMoveMsg =
            rolledVal === 6
              ? `${activePlayer.name} rolled 6. Consecutive sixes limit reached! Passing turn...`
              : `${activePlayer.name} rolled ${rolledVal}. Need a 6 to enter track! Passing turn...`;
          get().showToast(noMoveMsg, 'warning');

          setTimeout(() => {
            set({ gameState: nextState });
            get().triggerAIIfNeeded();
          }, 1400);
        }
      } catch (err: unknown) {
        set({ isRolling: false });
        console.error(err);
      }
    }, 850);
  },

  selectToken: (tokenId: string) => {
    const { gameState } = get();
    if (!gameState || gameState.status !== 'ACTIVE') return;
    if (!gameState.legalMoves.includes(tokenId)) return;

    set({ selectedTokenId: tokenId });
    soundEngine.playClick();

    const confirmMoves = useUserStore.getState().confirmMoves;
    if (!confirmMoves) {
      get().executeMove(tokenId);
    }
  },

  executeMove: (tokenId: string) => {
    const { gameState } = get();
    if (!gameState || gameState.status !== 'ACTIVE') return;
    if (!gameState.legalMoves.includes(tokenId)) return;

    const activeColor = gameState.activePlayerColor;

    // Online Mode (when not a LOCAL game)
    if (gameState.code !== 'LOCAL') {
      useRoomStore.getState().sendGameAction({
        type: 'MOVE_TOKEN',
        gameId: gameState.id,
        roomCode: gameState.code,
        turnNumber: gameState.turnNumber,
        tokenId,
        clientActionId: generateActionId('move'),
        timestamp: Date.now()
      });
      set({ selectedTokenId: null });
      return;
    }

    // Local Mode
    try {
      const moveRes = engineMoveToken(gameState, activeColor, tokenId);
      soundEngine.playTokenHop();

      if (moveRes.capturedTokenId) {
        soundEngine.playCapture();
        get().showToast(`${gameState.activePlayerColor} captured ${moveRes.capturedPlayerColor}! 💥 Extra turn awarded.`, 'warning');
      } else if (moveRes.reachedHome) {
        soundEngine.playTokenHome();
        get().showToast(`Token reached HOME! 🎯`, 'success');
      }

      if (moveRes.gameFinished) {
        soundEngine.playVictory();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        get().showToast(`🎉 ${moveRes.winnerColor} WON THE GAME!`, 'success');

        // Record stats
        const myId = useUserStore.getState().profile.id;
        const myPlayer = moveRes.nextState.players.find((p) => p.id === myId) || moveRes.nextState.players[0];
        const durationSec = Math.round((Date.now() - gameState.startedAt) / 1000);
        useUserStore.getState().recordMatch({
          id: `local_match_${Date.now()}`,
          gameId: gameState.id,
          roomCode: 'LOCAL',
          mode: gameState.mode,
          date: Date.now(),
          playerColor: myPlayer.color,
          rank: myPlayer.rank || 1,
          totalPlayers: gameState.players.length,
          durationSeconds: durationSec,
          captures: myPlayer.stats.captures,
          tokensHome: myPlayer.stats.tokensHome,
          turnsTaken: myPlayer.stats.turnsTaken,
          opponentNames: gameState.players.filter((p) => p.id !== myPlayer.id).map((p) => p.name)
        });
      }

      set({
        gameState: moveRes.nextState,
        selectedTokenId: null,
        turnSecondsRemaining: moveRes.nextState.rules.turnTimerSeconds
      });

      get().triggerAIIfNeeded();
    } catch (err: unknown) {
      console.error(err);
    }
  },

  triggerAIIfNeeded: () => {
    if (aiTurnTimeout) clearTimeout(aiTurnTimeout);

    const state = get().gameState;
    if (!state || state.status !== 'ACTIVE') return;

    const activePlayer = state.players.find((p) => p.color === state.activePlayerColor);
    if (!activePlayer || activePlayer.type !== 'AI') return;

    // Natural bot think time: 600ms before starting roll
    aiTurnTimeout = setTimeout(() => {
      const current = get().gameState;
      if (!current || current.status !== 'ACTIVE') return;
      if (current.activePlayerColor !== activePlayer.color) return;

      if (!current.dice.rolled) {
        // Bot initiates 3D roll
        set({ isRolling: true });
        soundEngine.playDiceRoll();

        setTimeout(() => {
          const stateBeforeBotRoll = get().gameState;
          if (!stateBeforeBotRoll || stateBeforeBotRoll.activePlayerColor !== activePlayer.color) {
            set({ isRolling: false });
            return;
          }

          const nextState = engineRollDice(stateBeforeBotRoll, activePlayer.color);
          const rolledVal = nextState.dice.value;

          if (nextState.legalMoves.length > 0) {
            set({ gameState: nextState, isRolling: false });

            const bestTokenId = selectAIMove(
              nextState,
              activePlayer.color,
              activePlayer.aiDifficulty || 'NORMAL'
            );

            if (bestTokenId) {
              setTimeout(() => {
                get().executeMove(bestTokenId);
              }, 850);
            }
          } else {
            // Bot rolled with no legal moves: display bot's rolled face for 1.4s so human sees it
            const stateWithRollShown: GameState = {
              ...stateBeforeBotRoll,
              dice: {
                value: rolledVal,
                rolled: true,
                rolledAt: Date.now(),
                turnNumber: stateBeforeBotRoll.turnNumber
              }
            };

            set({ gameState: stateWithRollShown, isRolling: false });
            get().showToast(
              `${activePlayer.name} rolled ${rolledVal}. No moves available.`,
              'info'
            );

            setTimeout(() => {
              set({ gameState: nextState });
              get().triggerAIIfNeeded();
            }, 1400);
          }
        }, 850);
      }
    }, 600);
  },

  showToast: (msg: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    set({ toastMessage: msg, toastType: type });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 3500);
  },

  clearToast: () => set({ toastMessage: null }),

  quitGame: () => {
    if (localTimerInterval) clearInterval(localTimerInterval);
    if (aiTurnTimeout) clearTimeout(aiTurnTimeout);
    set({ gameState: null, selectedTokenId: null, isRolling: false });
  }
}));
