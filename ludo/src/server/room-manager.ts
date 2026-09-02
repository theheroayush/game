import {
  PlayerColor,
  GameRuleConfig,
  AIDifficulty,
  PlayerType,
  GameState
} from '../types/game';
import { generateRoomCode } from '../engine/generator';
import { DEFAULT_RULES, COLOR_TURN_ORDER } from '../engine/rules';

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
  status: 'WAITING' | 'STARTING' | 'ACTIVE' | 'FINISHED';
  rules: GameRuleConfig;
  createdAt: number;
  updatedAt: number;
  gameState?: GameState;
}

export class RoomManager {
  private rooms = new Map<string, GameRoom>();
  private playerRoomMap = new Map<string, string>(); // playerId -> roomCode

  public createRoom(
    hostId: string,
    hostName: string,
    hostAvatar: string,
    hostColor: PlayerColor = 'RED',
    rules?: Partial<GameRuleConfig>
  ): GameRoom {
    const code = generateRoomCode();
    const now = Date.now();

    const hostPlayer: RoomPlayer = {
      id: hostId,
      name: hostName || 'Player 1',
      avatar: hostAvatar || 'avatar_1',
      color: hostColor,
      type: 'HUMAN',
      ready: true, // Host is ready by default
      connected: true,
      lastActiveAt: now
    };

    const room: GameRoom = {
      code,
      hostId,
      maxPlayers: 4,
      players: [hostPlayer],
      status: 'WAITING',
      rules: { ...DEFAULT_RULES, ...rules },
      createdAt: now,
      updatedAt: now
    };

    this.rooms.set(code, room);
    this.playerRoomMap.set(hostId, code);
    return room;
  }

  public getRoom(code: string): GameRoom | undefined {
    return this.rooms.get(code.toUpperCase());
  }

  public getRoomByPlayerId(playerId: string): GameRoom | undefined {
    const code = this.playerRoomMap.get(playerId);
    if (!code) return undefined;
    return this.rooms.get(code);
  }

  public joinRoom(
    code: string,
    playerId: string,
    playerName: string,
    playerAvatar: string,
    preferredColor?: PlayerColor
  ): { success: boolean; room?: GameRoom; error?: string } {
    const room = this.getRoom(code);
    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.status !== 'WAITING') {
      // Check if reconnecting existing player
      const existing = room.players.find((p) => p.id === playerId);
      if (existing) {
        existing.connected = true;
        existing.lastActiveAt = Date.now();
        return { success: true, room };
      }
      return { success: false, error: 'Game is already in progress' };
    }

    // Check if player already in room
    const existingPlayer = room.players.find((p) => p.id === playerId);
    if (existingPlayer) {
      existingPlayer.name = playerName;
      existingPlayer.avatar = playerAvatar;
      existingPlayer.connected = true;
      existingPlayer.lastActiveAt = Date.now();
      return { success: true, room };
    }

    if (room.players.length >= room.maxPlayers) {
      return { success: false, error: 'Room is full (max 4 players)' };
    }

    // Pick available color
    const usedColors = new Set(room.players.map((p) => p.color));
    let assignedColor: PlayerColor = 'RED';

    if (preferredColor && !usedColors.has(preferredColor)) {
      assignedColor = preferredColor;
    } else {
      for (const c of COLOR_TURN_ORDER) {
        if (!usedColors.has(c)) {
          assignedColor = c;
          break;
        }
      }
    }

    const newPlayer: RoomPlayer = {
      id: playerId,
      name: playerName || `Player ${room.players.length + 1}`,
      avatar: playerAvatar || 'avatar_1',
      color: assignedColor,
      type: 'HUMAN',
      ready: false,
      connected: true,
      lastActiveAt: Date.now()
    };

    room.players.push(newPlayer);
    room.updatedAt = Date.now();
    this.playerRoomMap.set(playerId, room.code);

    return { success: true, room };
  }

  public leaveRoom(code: string, playerId: string): { room?: GameRoom; wasHost: boolean } {
    const room = this.getRoom(code);
    if (!room) return { wasHost: false };

    const wasHost = room.hostId === playerId;
    room.players = room.players.filter((p) => p.id !== playerId);
    this.playerRoomMap.delete(playerId);

    if (room.players.length === 0) {
      this.rooms.delete(code);
      return { wasHost };
    }

    // Reassign host if needed
    if (wasHost) {
      const human = room.players.find((p) => p.type === 'HUMAN') || room.players[0];
      room.hostId = human.id;
      human.ready = true;
    }

    room.updatedAt = Date.now();
    return { room, wasHost };
  }

  public setPlayerReady(code: string, playerId: string, ready: boolean): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    const player = room.players.find((p) => p.id === playerId);
    if (player) {
      player.ready = ready;
      room.updatedAt = Date.now();
    }
    return room;
  }

  public addBot(
    code: string,
    color: PlayerColor,
    difficulty: AIDifficulty = 'NORMAL'
  ): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room || room.status !== 'WAITING' || room.players.length >= room.maxPlayers) {
      return undefined;
    }

    const usedColors = new Set(room.players.map((p) => p.color));
    if (usedColors.has(color)) return undefined;

    const botPlayer: RoomPlayer = {
      id: `bot_${color.toLowerCase()}_${Date.now()}`,
      name: `Bot ${color}`,
      avatar: `bot_${color.toLowerCase()}`,
      color,
      type: 'AI',
      aiDifficulty: difficulty,
      ready: true,
      connected: true,
      lastActiveAt: Date.now()
    };

    room.players.push(botPlayer);
    room.updatedAt = Date.now();
    return room;
  }

  public removeBot(code: string, color: PlayerColor): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room || room.status !== 'WAITING') return undefined;

    room.players = room.players.filter((p) => !(p.type === 'AI' && p.color === color));
    room.updatedAt = Date.now();
    return room;
  }

  public updateRules(code: string, newRules: Partial<GameRuleConfig>): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room || room.status !== 'WAITING') return undefined;

    room.rules = { ...room.rules, ...newRules };
    room.updatedAt = Date.now();
    return room;
  }

  public getAllActiveRooms(): GameRoom[] {
    return Array.from(this.rooms.values());
  }
}
