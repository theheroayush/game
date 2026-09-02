import { GameState, PlayerColor, GameRuleConfig, AIDifficulty, PlayerType } from './game';

export type ClientMessageType =
  | 'PING'
  | 'CREATE_ROOM'
  | 'JOIN_ROOM'
  | 'LEAVE_ROOM'
  | 'SET_READY'
  | 'ADD_BOT'
  | 'REMOVE_BOT'
  | 'UPDATE_SETTINGS'
  | 'START_GAME'
  | 'ROLL_DICE'
  | 'MOVE_TOKEN'
  | 'SEND_REACTION'
  | 'RECONNECT';

export type ServerMessageType =
  | 'PONG'
  | 'ROOM_CREATED'
  | 'ROOM_JOINED'
  | 'ROOM_STATE'
  | 'GAME_STATE'
  | 'DICE_ROLLED'
  | 'TOKEN_MOVED'
  | 'TURN_STARTED'
  | 'REACTION_RECEIVED'
  | 'ERROR'
  | 'PLAYER_DISCONNECTED'
  | 'PLAYER_RECONNECTED'
  | 'GAME_OVER';

export interface BaseClientMessage {
  type: ClientMessageType;
  clientActionId: string;
  timestamp: number;
}

export interface PingMessage extends BaseClientMessage {
  type: 'PING';
}

export interface CreateRoomMessage extends BaseClientMessage {
  type: 'CREATE_ROOM';
  playerName: string;
  avatar: string;
  color?: PlayerColor;
  rules?: Partial<GameRuleConfig>;
}

export interface JoinRoomMessage extends BaseClientMessage {
  type: 'JOIN_ROOM';
  roomCode: string;
  playerName: string;
  avatar: string;
  preferredColor?: PlayerColor;
}

export interface SetReadyMessage extends BaseClientMessage {
  type: 'SET_READY';
  roomCode: string;
  ready: boolean;
}

export interface AddBotMessage extends BaseClientMessage {
  type: 'ADD_BOT';
  roomCode: string;
  color: PlayerColor;
  difficulty: AIDifficulty;
}

export interface RemoveBotMessage extends BaseClientMessage {
  type: 'REMOVE_BOT';
  roomCode: string;
  color: PlayerColor;
}

export interface UpdateSettingsMessage extends BaseClientMessage {
  type: 'UPDATE_SETTINGS';
  roomCode: string;
  settings: Partial<GameRuleConfig>;
}

export interface StartGameMessage extends BaseClientMessage {
  type: 'START_GAME';
  roomCode: string;
}

export interface RollDiceMessage extends BaseClientMessage {
  type: 'ROLL_DICE';
  gameId: string;
  roomCode: string;
  turnNumber: number;
}

export interface MoveTokenMessage extends BaseClientMessage {
  type: 'MOVE_TOKEN';
  gameId: string;
  roomCode: string;
  turnNumber: number;
  tokenId: string;
}

export interface SendReactionMessage extends BaseClientMessage {
  type: 'SEND_REACTION';
  roomCode: string;
  reaction: string; // emoji or quick text e.g. "🔥", "GG", "Lucky 6!"
}

export interface ReconnectMessage extends BaseClientMessage {
  type: 'RECONNECT';
  roomCode: string;
  playerId: string;
  lastKnownVersion: number;
}

export type ClientMessage =
  | PingMessage
  | CreateRoomMessage
  | JoinRoomMessage
  | SetReadyMessage
  | AddBotMessage
  | RemoveBotMessage
  | UpdateSettingsMessage
  | StartGameMessage
  | RollDiceMessage
  | MoveTokenMessage
  | SendReactionMessage
  | ReconnectMessage;

export interface ServerMessage<T = unknown> {
  type: ServerMessageType;
  seq: number;
  timestamp: number;
  payload: T;
  clientActionId?: string;
  error?: string;
}
