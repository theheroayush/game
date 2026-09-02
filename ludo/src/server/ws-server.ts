import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import {
  ClientMessage,
  ServerMessage,
  ServerMessageType
} from '../types/websocket';
import { GameState, PlayerColor } from '../types/game';
import { RoomManager, GameRoom } from './room-manager';
import { GameManager } from './game-manager';
import { PersistenceManager } from './persistence';

interface ClientConnection {
  ws: WebSocket;
  playerId?: string;
  roomCode?: string;
  lastPing: number;
}

export class LudoServer {
  private wss: WebSocketServer;
  private clients = new Map<WebSocket, ClientConnection>();
  private playerWsMap = new Map<string, WebSocket>();
  public roomManager = new RoomManager();
  public gameManager = new GameManager();
  public persistence = new PersistenceManager();
  private seqCounter = 1;

  constructor(port = 8080) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      this.handleConnection(ws, req);
    });

    this.gameManager.setOnStateChange((roomCode, state) => {
      this.broadcastGameState(roomCode, state);
    });

    console.log(`[LudoServer] WebSocket Server running on port ${port}`);
  }

  private handleConnection(ws: WebSocket, _req: IncomingMessage) {
    const conn: ClientConnection = {
      ws,
      lastPing: Date.now()
    };
    this.clients.set(ws, conn);

    ws.on('message', (data: string | Buffer) => {
      try {
        const text = data.toString();
        const msg = JSON.parse(text) as ClientMessage;
        this.handleMessage(ws, msg);
      } catch (err: unknown) {
        this.sendError(ws, 'Invalid JSON payload');
      }
    });

    ws.on('close', () => {
      this.handleDisconnect(ws);
    });

    ws.on('error', () => {
      this.handleDisconnect(ws);
    });
  }

  private handleDisconnect(ws: WebSocket) {
    const conn = this.clients.get(ws);
    if (!conn) return;

    if (conn.playerId) {
      this.playerWsMap.delete(conn.playerId);
      if (conn.roomCode) {
        const room = this.roomManager.getRoom(conn.roomCode);
        if (room) {
          const player = room.players.find((p) => p.id === conn.playerId);
          if (player) {
            player.connected = false;
            player.lastActiveAt = Date.now();
            this.broadcastRoomState(room.code);
          }
        }
      }
    }
    this.clients.delete(ws);
  }

  private handleMessage(ws: WebSocket, msg: ClientMessage) {
    const conn = this.clients.get(ws);
    if (!conn) return;

    switch (msg.type) {
      case 'PING':
        conn.lastPing = Date.now();
        this.send(ws, 'PONG', { time: Date.now() }, msg.clientActionId);
        break;

      case 'CREATE_ROOM': {
        const playerId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        conn.playerId = playerId;
        this.playerWsMap.set(playerId, ws);

        const room = this.roomManager.createRoom(
          playerId,
          msg.playerName,
          msg.avatar,
          msg.color || 'RED',
          msg.rules
        );

        conn.roomCode = room.code;
        this.persistence.getOrCreateGuestUser(playerId, msg.playerName, msg.avatar);

        this.send(ws, 'ROOM_CREATED', { room, playerId }, msg.clientActionId);
        break;
      }

      case 'JOIN_ROOM': {
        const playerId = conn.playerId || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        conn.playerId = playerId;
        this.playerWsMap.set(playerId, ws);

        const res = this.roomManager.joinRoom(
          msg.roomCode,
          playerId,
          msg.playerName,
          msg.avatar,
          msg.preferredColor
        );

        if (!res.success || !res.room) {
          this.sendError(ws, res.error || 'Failed to join room', msg.clientActionId);
          return;
        }

        conn.roomCode = res.room.code;
        this.persistence.getOrCreateGuestUser(playerId, msg.playerName, msg.avatar);

        this.send(ws, 'ROOM_JOINED', { room: res.room, playerId }, msg.clientActionId);
        this.broadcastRoomState(res.room.code);
        break;
      }

      case 'SET_READY': {
        if (!conn.playerId) return;
        const room = this.roomManager.setPlayerReady(msg.roomCode, conn.playerId, msg.ready);
        if (room) {
          this.broadcastRoomState(room.code);
        }
        break;
      }

      case 'ADD_BOT': {
        const room = this.roomManager.addBot(msg.roomCode, msg.color, msg.difficulty);
        if (room) {
          this.broadcastRoomState(room.code);
        }
        break;
      }

      case 'REMOVE_BOT': {
        const room = this.roomManager.removeBot(msg.roomCode, msg.color);
        if (room) {
          this.broadcastRoomState(room.code);
        }
        break;
      }

      case 'UPDATE_SETTINGS': {
        const room = this.roomManager.updateRules(msg.roomCode, msg.settings);
        if (room) {
          this.broadcastRoomState(room.code);
        }
        break;
      }

      case 'START_GAME': {
        const room = this.roomManager.getRoom(msg.roomCode);
        if (!room) {
          this.sendError(ws, 'Room not found', msg.clientActionId);
          return;
        }

        if (room.hostId !== conn.playerId) {
          this.sendError(ws, 'Only host can start the game', msg.clientActionId);
          return;
        }

        if (room.players.length < 2) {
          this.sendError(ws, 'Need at least 2 players to start', msg.clientActionId);
          return;
        }

        const gameState = this.gameManager.startGame(room);
        this.broadcastGameState(room.code, gameState);
        break;
      }

      case 'ROLL_DICE': {
        const room = this.roomManager.getRoom(msg.roomCode);
        if (!room || !conn.playerId) return;

        const player = room.players.find((p) => p.id === conn.playerId);
        if (!player) return;

        const res = this.gameManager.rollDice(msg.roomCode, player.color, msg.clientActionId);
        if (!res.success || !res.state) {
          this.sendError(ws, res.error || 'Failed to roll dice', msg.clientActionId);
        }
        break;
      }

      case 'MOVE_TOKEN': {
        const room = this.roomManager.getRoom(msg.roomCode);
        if (!room || !conn.playerId) return;

        const player = room.players.find((p) => p.id === conn.playerId);
        if (!player) return;

        const res = this.gameManager.moveToken(
          msg.roomCode,
          player.color,
          msg.tokenId,
          msg.clientActionId
        );
        if (!res.success) {
          this.sendError(ws, res.error || 'Illegal move', msg.clientActionId);
        }
        break;
      }

      case 'SEND_REACTION': {
        const room = this.roomManager.getRoom(msg.roomCode);
        if (!room || !conn.playerId) return;
        const player = room.players.find((p) => p.id === conn.playerId);
        if (player) {
          this.broadcast(room.code, 'REACTION_RECEIVED', {
            playerId: player.id,
            playerName: player.name,
            color: player.color,
            reaction: msg.reaction
          });
        }
        break;
      }

      case 'RECONNECT': {
        conn.playerId = msg.playerId;
        conn.roomCode = msg.roomCode;
        this.playerWsMap.set(msg.playerId, ws);

        const room = this.roomManager.getRoom(msg.roomCode);
        if (!room) {
          this.sendError(ws, 'Room not found for reconnection', msg.clientActionId);
          return;
        }

        const player = room.players.find((p) => p.id === msg.playerId);
        if (player) {
          player.connected = true;
          player.lastActiveAt = Date.now();
        }

        const game = this.gameManager.getGame(msg.roomCode);
        if (game) {
          this.send(ws, 'GAME_STATE', { state: game }, msg.clientActionId);
        } else {
          this.send(ws, 'ROOM_STATE', { room }, msg.clientActionId);
        }
        break;
      }
    }
  }

  public broadcastRoomState(roomCode: string) {
    const room = this.roomManager.getRoom(roomCode);
    if (!room) return;
    this.broadcast(roomCode, 'ROOM_STATE', { room });
  }

  public broadcastGameState(roomCode: string, state: GameState) {
    this.broadcast(roomCode, 'GAME_STATE', { state });

    // If game finished, record stats for all human players
    if (state.status === 'FINISHED' && state.finishedAt) {
      const durationSeconds = Math.round((state.finishedAt - state.startedAt) / 1000);
      const allNames = state.players.map((p) => p.name);

      for (const p of state.players) {
        if (p.type === 'HUMAN' || p.type === 'GUEST') {
          this.persistence.recordMatchCompletion(p.id, {
            id: `match_${state.id}_${p.id}`,
            gameId: state.id,
            roomCode: state.code,
            mode: state.mode,
            date: state.finishedAt,
            playerColor: p.color,
            rank: p.rank || state.players.length,
            totalPlayers: state.players.length,
            durationSeconds,
            captures: p.stats.captures,
            tokensHome: p.stats.tokensHome,
            turnsTaken: p.stats.turnsTaken,
            opponentNames: allNames.filter((n) => n !== p.name)
          });
        }
      }
    }
  }

  public broadcast<T>(roomCode: string, type: ServerMessageType, payload: T) {
    const room = this.roomManager.getRoom(roomCode);
    if (!room) return;

    for (const player of room.players) {
      if (player.type === 'HUMAN' || player.type === 'GUEST') {
        const ws = this.playerWsMap.get(player.id);
        if (ws && ws.readyState === WebSocket.OPEN) {
          this.send(ws, type, payload);
        }
      }
    }
  }

  public send<T>(
    ws: WebSocket,
    type: ServerMessageType,
    payload: T,
    clientActionId?: string
  ) {
    if (ws.readyState !== WebSocket.OPEN) return;
    const msg: ServerMessage<T> = {
      type,
      seq: this.seqCounter++,
      timestamp: Date.now(),
      payload,
      clientActionId
    };
    ws.send(JSON.stringify(msg));
  }

  public sendError(ws: WebSocket, error: string, clientActionId?: string) {
    if (ws.readyState !== WebSocket.OPEN) return;
    const msg: ServerMessage<{ message: string }> = {
      type: 'ERROR',
      seq: this.seqCounter++,
      timestamp: Date.now(),
      payload: { message: error },
      error,
      clientActionId
    };
    ws.send(JSON.stringify(msg));
  }

  public close() {
    this.gameManager.destroy();
    this.wss.close();
  }
}
