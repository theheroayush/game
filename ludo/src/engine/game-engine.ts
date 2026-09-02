import {
  GameState,
  PlayerState,
  TokenState,
  PlayerColor,
  GameMode,
  GameRuleConfig,
  MoveResult,
  GameEvent
} from '../types/game';
import {
  COLOR_START_INDICES,
  getGlobalTrackIndex,
  isPositionSafe
} from './coordinates';
import { DEFAULT_RULES, COLOR_TURN_ORDER } from './rules';
import { generateSecureDice } from './generator';

export interface CreateGameOptions {
  id?: string;
  code: string;
  mode: GameMode;
  rules?: Partial<GameRuleConfig>;
  players: Array<{
    id: string;
    name: string;
    avatar: string;
    color: PlayerColor;
    type: 'HUMAN' | 'AI' | 'GUEST';
    aiDifficulty?: 'EASY' | 'NORMAL' | 'HARD' | 'EXPERT';
  }>;
}

/**
 * Initializes a new authoritative GameState.
 */
export function createInitialGameState(options: CreateGameOptions): GameState {
  const rules: GameRuleConfig = { ...DEFAULT_RULES, ...options.rules };
  const now = Date.now();

  const players: PlayerState[] = options.players.map((p) => {
    const tokens: TokenState[] = [0, 1, 2, 3].map((idx) => ({
      id: `${p.color.toLowerCase()}_token_${idx}`,
      color: p.color,
      step: -1,
      isHome: false,
      inYard: true
    }));

    return {
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      color: p.color,
      type: p.type,
      aiDifficulty: p.aiDifficulty,
      tokens,
      connected: true,
      ready: true,
      stats: {
        captures: 0,
        tokensHome: 0,
        sixesRolled: 0,
        turnsTaken: 0
      }
    };
  });

  const activeColor = players[0]?.color || 'RED';

  const initialEvent: GameEvent = {
    id: `evt_${now}_0`,
    type: 'GAME_STARTED',
    turnNumber: 1,
    playerColor: activeColor,
    timestamp: now,
    payload: { mode: options.mode, playerCount: players.length }
  };

  return {
    id: options.id || `game_${now}`,
    code: options.code,
    mode: options.mode,
    status: 'ACTIVE',
    version: 1,
    players,
    activePlayerColor: activeColor,
    dice: {
      value: null,
      rolled: false,
      rolledAt: null,
      turnNumber: 1
    },
    consecutiveSixes: 0,
    turnNumber: 1,
    legalMoves: [],
    rules,
    turnStartedAt: now,
    turnExpiresAt: now + rules.turnTimerSeconds * 1000,
    winnerOrder: [],
    events: [initialEvent],
    startedAt: now,
    updatedAt: now
  };
}

/**
 * Computes all legal token moves for a player given a dice roll.
 */
export function calculateLegalMoves(
  state: GameState,
  playerColor: PlayerColor,
  diceValue: number
): string[] {
  const player = state.players.find((p) => p.color === playerColor);
  if (!player || player.rank !== undefined) return [];

  const legalTokenIds: string[] = [];

  for (const token of player.tokens) {
    if (token.isHome) continue;

    // In Yard
    if (token.step === -1) {
      if (diceValue === 6 || !state.rules.requiresSixToEnter) {
        legalTokenIds.push(token.id);
      }
      continue;
    }

    // On Track or Home Lane
    const targetStep = token.step + diceValue;
    if (targetStep === 56) {
      // Exact hit onto HOME
      legalTokenIds.push(token.id);
    } else if (targetStep < 56) {
      // Normal advancement
      legalTokenIds.push(token.id);
    } else if (!state.rules.exactFinish && targetStep > 56) {
      // Allowed if exactFinish is disabled
      legalTokenIds.push(token.id);
    }
  }

  return legalTokenIds;
}

/**
 * Gets the next player color in turn order who has not yet finished.
 */
export function getNextActivePlayerColor(
  state: GameState,
  currentColor: PlayerColor
): PlayerColor {
  const activePlayers = state.players.filter((p) => p.rank === undefined);
  if (activePlayers.length <= 1) {
    return currentColor;
  }

  const allColors = state.players.map((p) => p.color);
  const currentIndex = allColors.indexOf(currentColor);

  for (let i = 1; i <= allColors.length; i++) {
    const nextIndex = (currentIndex + i) % allColors.length;
    const nextColor = allColors[nextIndex];
    const player = state.players.find((p) => p.color === nextColor);
    if (player && player.rank === undefined) {
      return nextColor;
    }
  }

  return currentColor;
}

/**
 * Authoritative dice roll action.
 */
export function rollDice(
  state: GameState,
  playerColor: PlayerColor,
  forcedDiceValue?: number
): GameState {
  if (state.status !== 'ACTIVE') {
    throw new Error('Game is not active');
  }
  if (state.activePlayerColor !== playerColor) {
    throw new Error(`Not ${playerColor}'s turn`);
  }
  if (state.dice.rolled) {
    throw new Error('Dice already rolled for this turn');
  }

  const now = Date.now();
  const diceValue = forcedDiceValue !== undefined ? forcedDiceValue : generateSecureDice();
  const isSix = diceValue === 6;
  const consecutiveSixes = isSix ? state.consecutiveSixes + 1 : 0;

  // Update stats
  const updatedPlayers = state.players.map((p) => {
    if (p.color === playerColor) {
      return {
        ...p,
        stats: {
          ...p.stats,
          turnsTaken: p.stats.turnsTaken + 1,
          sixesRolled: p.stats.sixesRolled + (isSix ? 1 : 0)
        }
      };
    }
    return p;
  });

  const diceEvent: GameEvent = {
    id: `evt_${now}_${state.events.length}`,
    type: 'DICE_ROLLED',
    turnNumber: state.turnNumber,
    playerColor,
    timestamp: now,
    payload: { diceValue, consecutiveSixes }
  };

  // Check 3 consecutive 6s rule
  if (
    isSix &&
    state.rules.maxConsecutiveSixes > 0 &&
    consecutiveSixes >= state.rules.maxConsecutiveSixes
  ) {
    const penaltyEvent: GameEvent = {
      id: `evt_${now}_${state.events.length + 1}`,
      type: 'THREE_SIX_PENALTY',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: { message: 'Three consecutive 6s! Turn forfeited.' }
    };

    const nextColor = getNextActivePlayerColor(state, playerColor);

    return {
      ...state,
      version: state.version + 1,
      players: updatedPlayers,
      activePlayerColor: nextColor,
      dice: {
        value: diceValue,
        rolled: false,
        rolledAt: now,
        turnNumber: state.turnNumber + 1
      },
      consecutiveSixes: 0,
      turnNumber: state.turnNumber + 1,
      legalMoves: [],
      turnStartedAt: now,
      turnExpiresAt: now + state.rules.turnTimerSeconds * 1000,
      events: [...state.events, diceEvent, penaltyEvent],
      updatedAt: now
    };
  }

  // Calculate legal moves
  const legalMoves = calculateLegalMoves(
    { ...state, players: updatedPlayers },
    playerColor,
    diceValue
  );

  // If no legal moves available
  if (legalMoves.length === 0) {
    // If rolled 6 and extra turn rule is active, give another roll
    if (isSix && state.rules.extraTurnOnSix) {
      const extraTurnEvent: GameEvent = {
        id: `evt_${now}_${state.events.length + 1}`,
        type: 'EXTRA_TURN_GRANTED',
        turnNumber: state.turnNumber,
        playerColor,
        timestamp: now,
        payload: { reason: 'ROLLED_SIX_NO_MOVES' }
      };

      return {
        ...state,
        version: state.version + 1,
        players: updatedPlayers,
        dice: {
          value: diceValue,
          rolled: false, // allow rolling again immediately
          rolledAt: now,
          turnNumber: state.turnNumber
        },
        consecutiveSixes,
        legalMoves: [],
        turnStartedAt: now,
        turnExpiresAt: now + state.rules.turnTimerSeconds * 1000,
        events: [...state.events, diceEvent, extraTurnEvent],
        updatedAt: now
      };
    }

    // Pass turn to next player
    const nextColor = getNextActivePlayerColor(state, playerColor);
    const passEvent: GameEvent = {
      id: `evt_${now}_${state.events.length + 1}`,
      type: 'TURN_PASSED',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: { reason: 'NO_LEGAL_MOVES', diceValue }
    };

    return {
      ...state,
      version: state.version + 1,
      players: updatedPlayers,
      activePlayerColor: nextColor,
      dice: {
        value: diceValue,
        rolled: false,
        rolledAt: now,
        turnNumber: state.turnNumber + 1
      },
      consecutiveSixes: 0,
      turnNumber: state.turnNumber + 1,
      legalMoves: [],
      turnStartedAt: now,
      turnExpiresAt: now + state.rules.turnTimerSeconds * 1000,
      events: [...state.events, diceEvent, passEvent],
      updatedAt: now
    };
  }

  // Legal moves exist — await player token selection
  return {
    ...state,
    version: state.version + 1,
    players: updatedPlayers,
    dice: {
      value: diceValue,
      rolled: true,
      rolledAt: now,
      turnNumber: state.turnNumber
    },
    consecutiveSixes,
    legalMoves,
    events: [...state.events, diceEvent],
    updatedAt: now
  };
}

/**
 * Authoritative move token action.
 */
export function moveToken(
  state: GameState,
  playerColor: PlayerColor,
  tokenId: string
): MoveResult {
  if (state.status !== 'ACTIVE') {
    throw new Error('Game is not active');
  }
  if (state.activePlayerColor !== playerColor) {
    throw new Error(`Not ${playerColor}'s turn`);
  }
  if (!state.dice.rolled || state.dice.value === null) {
    throw new Error('Dice has not been rolled');
  }
  if (!state.legalMoves.includes(tokenId)) {
    throw new Error(`Token ${tokenId} is not a legal move`);
  }

  const now = Date.now();
  const diceValue = state.dice.value;
  const player = state.players.find((p) => p.color === playerColor)!;
  const token = player.tokens.find((t) => t.id === tokenId)!;

  const fromStep = token.step;
  let toStep: number;

  if (fromStep === -1) {
    toStep = 0; // Release from yard
  } else {
    toStep = Math.min(56, fromStep + diceValue);
  }

  const reachedHome = toStep === 56;
  let capturedTokenId: string | undefined;
  let capturedPlayerColor: PlayerColor | undefined;

  // Check capture if landing on track (0 to 50) and cell is not safe
  if (toStep >= 0 && toStep <= 50 && !isPositionSafe(playerColor, toStep)) {
    const targetTrackIndex = getGlobalTrackIndex(playerColor, toStep)!;

    for (const otherPlayer of state.players) {
      if (otherPlayer.color === playerColor) continue;

      for (const otherToken of otherPlayer.tokens) {
        if (otherToken.step >= 0 && otherToken.step <= 50) {
          const otherTrackIndex = getGlobalTrackIndex(otherPlayer.color, otherToken.step);
          if (otherTrackIndex === targetTrackIndex) {
            capturedTokenId = otherToken.id;
            capturedPlayerColor = otherPlayer.color;
            break;
          }
        }
      }
      if (capturedTokenId) break;
    }
  }

  // Update players state
  let updatedPlayers = state.players.map((p) => {
    let tokens = p.tokens;

    if (p.color === playerColor) {
      tokens = tokens.map((t) => {
        if (t.id === tokenId) {
          return {
            ...t,
            step: toStep,
            inYard: false,
            isHome: reachedHome
          };
        }
        return t;
      });

      return {
        ...p,
        tokens,
        stats: {
          ...p.stats,
          captures: p.stats.captures + (capturedTokenId ? 1 : 0),
          tokensHome: p.stats.tokensHome + (reachedHome ? 1 : 0)
        }
      };
    }

    if (capturedPlayerColor && p.color === capturedPlayerColor) {
      tokens = tokens.map((t) => {
        if (t.id === capturedTokenId) {
          return {
            ...t,
            step: -1,
            inYard: true,
            isHome: false
          };
        }
        return t;
      });
      return { ...p, tokens };
    }

    return p;
  });

  // Check victory for moving player
  const movingPlayerTokens = updatedPlayers.find((p) => p.color === playerColor)!.tokens;
  const allTokensHome = movingPlayerTokens.every((t) => t.isHome);
  let newWinnerOrder = [...state.winnerOrder];
  let winnerColor: PlayerColor | undefined;

  if (allTokensHome && !newWinnerOrder.includes(playerColor)) {
    newWinnerOrder.push(playerColor);
    winnerColor = playerColor;
    const rank = newWinnerOrder.length;

    updatedPlayers = updatedPlayers.map((p) => {
      if (p.color === playerColor) {
        return { ...p, rank, finishedAt: now };
      }
      return p;
    });
  }

  // Check if entire match is finished
  const activeRemainingPlayers = updatedPlayers.filter((p) => p.rank === undefined);
  const isGameFinished =
    activeRemainingPlayers.length <= 1 || (state.players.length === 2 && newWinnerOrder.length >= 1);

  // Check extra turn reward
  const rolledSix = diceValue === 6 && state.rules.extraTurnOnSix;
  const captureReward = Boolean(capturedTokenId && state.rules.extraTurnOnCapture);
  const homeReward = reachedHome;
  const grantedExtraTurn = !isGameFinished && (rolledSix || captureReward || homeReward);

  // Events
  const newEvents: GameEvent[] = [
    {
      id: `evt_${now}_${state.events.length}`,
      type: 'TOKEN_MOVED',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: { tokenId, fromStep, toStep }
    }
  ];

  if (capturedTokenId && capturedPlayerColor) {
    newEvents.push({
      id: `evt_${now}_${state.events.length + 1}`,
      type: 'TOKEN_CAPTURED',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: {
        capturedTokenId,
        capturedPlayerColor,
        atTrackIndex: getGlobalTrackIndex(playerColor, toStep)
      }
    });
  }

  if (reachedHome) {
    newEvents.push({
      id: `evt_${now}_${state.events.length + 2}`,
      type: 'TOKEN_HOME',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: { tokenId }
    });
  }

  if (winnerColor) {
    newEvents.push({
      id: `evt_${now}_${state.events.length + 3}`,
      type: 'PLAYER_WON',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: { rank: newWinnerOrder.length }
    });
  }

  if (isGameFinished) {
    newEvents.push({
      id: `evt_${now}_${state.events.length + 4}`,
      type: 'GAME_FINISHED',
      turnNumber: state.turnNumber,
      timestamp: now,
      payload: { winnerOrder: newWinnerOrder }
    });
  } else if (grantedExtraTurn) {
    newEvents.push({
      id: `evt_${now}_${state.events.length + 5}`,
      type: 'EXTRA_TURN_GRANTED',
      turnNumber: state.turnNumber,
      playerColor,
      timestamp: now,
      payload: {
        reason: captureReward ? 'CAPTURE' : homeReward ? 'REACHED_HOME' : 'ROLLED_SIX'
      }
    });
  }

  const nextActiveColor = isGameFinished
    ? playerColor
    : grantedExtraTurn
    ? playerColor
    : getNextActivePlayerColor({ ...state, players: updatedPlayers }, playerColor);

  const nextState: GameState = {
    ...state,
    version: state.version + 1,
    status: isGameFinished ? 'FINISHED' : 'ACTIVE',
    players: updatedPlayers,
    activePlayerColor: nextActiveColor,
    dice: {
      value: null,
      rolled: false,
      rolledAt: null,
      turnNumber: grantedExtraTurn ? state.turnNumber : state.turnNumber + 1
    },
    consecutiveSixes: rolledSix ? state.consecutiveSixes : 0,
    turnNumber: grantedExtraTurn ? state.turnNumber : state.turnNumber + 1,
    legalMoves: [],
    winnerOrder: newWinnerOrder,
    turnStartedAt: now,
    turnExpiresAt: now + state.rules.turnTimerSeconds * 1000,
    events: [...state.events, ...newEvents],
    updatedAt: now,
    finishedAt: isGameFinished ? now : undefined
  };

  return {
    nextState,
    movedTokenId: tokenId,
    fromStep,
    toStep,
    capturedTokenId,
    capturedPlayerColor,
    reachedHome,
    grantedExtraTurn,
    gameFinished: isGameFinished,
    winnerColor
  };
}

/**
 * Forces a turn pass on timeout or disconnect.
 */
export function handleTurnTimeout(state: GameState): GameState {
  if (state.status !== 'ACTIVE') return state;

  const now = Date.now();
  const nextColor = getNextActivePlayerColor(state, state.activePlayerColor);

  const passEvent: GameEvent = {
    id: `evt_${now}_${state.events.length}`,
    type: 'TURN_PASSED',
    turnNumber: state.turnNumber,
    playerColor: state.activePlayerColor,
    timestamp: now,
    payload: { reason: 'TURN_TIMEOUT' }
  };

  return {
    ...state,
    version: state.version + 1,
    activePlayerColor: nextColor,
    dice: {
      value: null,
      rolled: false,
      rolledAt: null,
      turnNumber: state.turnNumber + 1
    },
    consecutiveSixes: 0,
    turnNumber: state.turnNumber + 1,
    legalMoves: [],
    turnStartedAt: now,
    turnExpiresAt: now + state.rules.turnTimerSeconds * 1000,
    events: [...state.events, passEvent],
    updatedAt: now
  };
}
