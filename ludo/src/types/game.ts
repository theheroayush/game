export type PlayerColor = 'RED' | 'GREEN' | 'YELLOW' | 'BLUE';

export type GameMode = 'QUICK' | 'FRIENDS' | 'AI' | 'LOCAL';

export type GameStatus = 'WAITING' | 'STARTING' | 'ACTIVE' | 'FINISHED' | 'ABANDONED';

export type AIDifficulty = 'EASY' | 'NORMAL' | 'HARD' | 'EXPERT';

export type PlayerType = 'HUMAN' | 'AI' | 'GUEST';

export interface TokenState {
  id: string; // e.g. "token_0", "token_1", "token_2", "token_3"
  color: PlayerColor;
  step: number; // -1: YARD, 0..50: TRACK, 51..55: HOME_PATH, 56: HOME
  isHome: boolean;
  inYard: boolean;
}

export interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  color: PlayerColor;
  type: PlayerType;
  aiDifficulty?: AIDifficulty;
  tokens: TokenState[];
  connected: boolean;
  ready: boolean;
  rank?: number; // 1 = 1st place, 2 = 2nd place, etc.
  finishedAt?: number;
  stats: {
    captures: number;
    tokensHome: number;
    sixesRolled: number;
    turnsTaken: number;
  };
}

export interface DiceState {
  value: number | null; // 1 to 6
  rolled: boolean;
  rolledAt: number | null;
  turnNumber: number;
}

export interface GameRuleConfig {
  requiresSixToEnter: boolean;
  extraTurnOnSix: boolean;
  maxConsecutiveSixes: number; // 3 = forfeits turn after 3rd six; 0 = unlimited
  extraTurnOnCapture: boolean;
  exactFinish: boolean;
  turnTimerSeconds: number; // 15, 30, 45, 60
  stackingEnabled: boolean;
}

export interface BoardCoordinate {
  row: number; // 0 to 14
  col: number; // 0 to 14
  xPercent: number; // 0 to 100 for SVG/Canvas
  yPercent: number; // 0 to 100 for SVG/Canvas
  isSafe: boolean;
  isStar: boolean;
  isStart: boolean;
  color?: PlayerColor;
}

export interface GameEvent {
  id: string;
  type:
    | 'GAME_CREATED'
    | 'PLAYER_JOINED'
    | 'PLAYER_LEFT'
    | 'PLAYER_READY'
    | 'GAME_STARTED'
    | 'TURN_STARTED'
    | 'DICE_ROLLED'
    | 'TOKEN_MOVED'
    | 'TOKEN_CAPTURED'
    | 'TOKEN_HOME'
    | 'EXTRA_TURN_GRANTED'
    | 'THREE_SIX_PENALTY'
    | 'TURN_PASSED'
    | 'PLAYER_DISCONNECTED'
    | 'PLAYER_RECONNECTED'
    | 'PLAYER_WON'
    | 'GAME_FINISHED';
  turnNumber: number;
  playerId?: string;
  playerColor?: PlayerColor;
  timestamp: number;
  payload?: Record<string, unknown>;
}

export interface GameState {
  id: string;
  code: string; // 6-character room code (e.g. "AB7K9")
  mode: GameMode;
  status: GameStatus;
  version: number;
  players: PlayerState[];
  activePlayerColor: PlayerColor;
  dice: DiceState;
  consecutiveSixes: number;
  turnNumber: number;
  legalMoves: string[]; // Token IDs that can legally move
  rules: GameRuleConfig;
  turnStartedAt: number;
  turnExpiresAt: number;
  winnerOrder: PlayerColor[];
  events: GameEvent[];
  startedAt: number;
  updatedAt: number;
  finishedAt?: number;
}

export interface MoveResult {
  nextState: GameState;
  movedTokenId: string;
  fromStep: number;
  toStep: number;
  capturedTokenId?: string;
  capturedPlayerColor?: PlayerColor;
  reachedHome: boolean;
  grantedExtraTurn: boolean;
  gameFinished: boolean;
  winnerColor?: PlayerColor;
}

export interface RoomPlayer {
  id: string;
  name: string;
  avatar: string;
  color: PlayerColor;
  type: PlayerType;
  aiDifficulty?: AIDifficulty;
  ready: boolean;
  connected: boolean;
  socketId?: string;
  lastActiveAt: number;
}

export interface GameRoom {
  code: string;
  hostId: string;
  maxPlayers: number;
  players: RoomPlayer[];
  status: GameStatus;
  rules: GameRuleConfig;
  createdAt: number;
  updatedAt: number;
  gameState?: GameState;
}

export interface ReactionItem {
  id: string;
  color: PlayerColor;
  playerName: string;
  text: string;
}
