import { create } from 'zustand';
import {
  GameRoom,
  GameState,
  PlayerColor,
  AIDifficulty,
  GameRuleConfig,
  ReactionItem
} from '../types/game';
import { ClientMessage, ServerMessage } from '../types/websocket';
import { generateActionId } from '../engine/generator';
import { useGameStore } from './gameStore';

interface RoomStoreState {
  socket: WebSocket | null;
  status: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED';
  room: GameRoom | null;
  playerId: string | null;
  reactions: ReactionItem[];
  error: string | null;

  // Actions
  connect: (url?: string) => void;
  disconnect: () => void;
  createRoom: (
    playerName: string,
    avatar: string,
    color?: PlayerColor,
    rules?: Partial<GameRuleConfig>
  ) => void;
  joinRoom: (code: string, playerName: string, avatar: string, preferredColor?: PlayerColor) => void;
  leaveRoom: () => void;
  setReady: (ready: boolean) => void;
  addBot: (color: PlayerColor, difficulty?: AIDifficulty) => void;
  removeBot: (color: PlayerColor) => void;
  updateSettings: (settings: Partial<GameRuleConfig>) => void;
  startGame: () => void;
  sendReaction: (reaction: string) => void;
  sendGameAction: (msg: ClientMessage) => void;
  clearError: () => void;
}

export const useRoomStore = create<RoomStoreState>()((set, get) => ({
  socket: null,
  status: 'DISCONNECTED',
  room: null,
  playerId: null,
  reactions: [],
  error: null,

  connect: (url = 'ws://localhost:8080') => {
    const existing = get().socket;
    if (existing && existing.readyState === WebSocket.OPEN) return;

    set({ status: 'CONNECTING', error: null });

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        set({ socket: ws, status: 'CONNECTED', error: null });
        console.log('[RoomStore] WebSocket Connected to', url);

        // If had active room, attempt reconnect
        const { room, playerId } = get();
        if (room && playerId) {
          ws.send(
            JSON.stringify({
              type: 'RECONNECT',
              roomCode: room.code,
              playerId,
              lastKnownVersion: room.gameState?.version || 1,
              clientActionId: generateActionId('rec'),
              timestamp: Date.now()
            })
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data) as ServerMessage;
          switch (msg.type) {
            case 'ROOM_CREATED':
            case 'ROOM_JOINED': {
              const payload = msg.payload as { room: GameRoom; playerId: string };
              set({ room: payload.room, playerId: payload.playerId, error: null });
              break;
            }
            case 'ROOM_STATE': {
              const payload = msg.payload as { room: GameRoom };
              set({ room: payload.room });
              if (payload.room.gameState) {
                useGameStore.getState().setNetworkGameState(payload.room.gameState);
              }
              break;
            }
            case 'GAME_STATE': {
              const payload = msg.payload as { state: GameState };
              set((prev) => ({
                room: prev.room
                  ? { ...prev.room, status: payload.state.status, gameState: payload.state }
                  : null
              }));
              useGameStore.getState().setNetworkGameState(payload.state);
              break;
            }
            case 'REACTION_RECEIVED': {
              const payload = msg.payload as {
                playerId: string;
                playerName: string;
                color: PlayerColor;
                reaction: string;
              };
              const reactionItem: ReactionItem = {
                id: `rx_${Date.now()}_${Math.random()}`,
                color: payload.color,
                playerName: payload.playerName,
                text: payload.reaction
              };
              set((state) => ({
                reactions: [...state.reactions.slice(-10), reactionItem]
              }));
              break;
            }
            case 'ERROR': {
              set({ error: msg.error || 'Server error' });
              break;
            }
          }
        } catch (err) {
          console.error('[RoomStore] Failed to parse message', err);
        }
      };

      ws.onclose = () => {
        set({ socket: null, status: 'DISCONNECTED' });
      };

      ws.onerror = () => {
        set({ error: 'Failed to connect to multiplayer server' });
      };
    } catch (err) {
      set({ status: 'DISCONNECTED', error: 'WebSocket connection failed' });
    }
  },

  disconnect: () => {
    const ws = get().socket;
    if (ws) {
      ws.close();
    }
    set({ socket: null, status: 'DISCONNECTED', room: null });
  },

  createRoom: (playerName, avatar, color = 'RED', rules) => {
    const ws = get().socket;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      get().connect();
    }

    const sendCreate = () => {
      const socket = get().socket;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'CREATE_ROOM',
            playerName,
            avatar,
            color,
            rules,
            clientActionId: generateActionId('create'),
            timestamp: Date.now()
          })
        );
      }
    };

    if (get().socket?.readyState === WebSocket.OPEN) {
      sendCreate();
    } else {
      setTimeout(sendCreate, 300);
    }
  },

  joinRoom: (code, playerName, avatar, preferredColor) => {
    const ws = get().socket;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      get().connect();
    }

    const sendJoin = () => {
      const socket = get().socket;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'JOIN_ROOM',
            roomCode: code.trim().toUpperCase(),
            playerName,
            avatar,
            preferredColor,
            clientActionId: generateActionId('join'),
            timestamp: Date.now()
          })
        );
      }
    };

    if (get().socket?.readyState === WebSocket.OPEN) {
      sendJoin();
    } else {
      setTimeout(sendJoin, 300);
    }
  },

  leaveRoom: () => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'LEAVE_ROOM',
          roomCode: room.code,
          clientActionId: generateActionId('leave'),
          timestamp: Date.now()
        })
      );
    }
    set({ room: null });
  },

  setReady: (ready) => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'SET_READY',
          roomCode: room.code,
          ready,
          clientActionId: generateActionId('ready'),
          timestamp: Date.now()
        })
      );
    }
  },

  addBot: (color, difficulty) => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'ADD_BOT',
          roomCode: room.code,
          color,
          difficulty,
          clientActionId: generateActionId('bot_add'),
          timestamp: Date.now()
        })
      );
    }
  },

  removeBot: (color) => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'REMOVE_BOT',
          roomCode: room.code,
          color,
          clientActionId: generateActionId('bot_rm'),
          timestamp: Date.now()
        })
      );
    }
  },

  updateSettings: (settings) => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'UPDATE_SETTINGS',
          roomCode: room.code,
          settings,
          clientActionId: generateActionId('settings'),
          timestamp: Date.now()
        })
      );
    }
  },

  startGame: () => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'START_GAME',
          roomCode: room.code,
          clientActionId: generateActionId('start'),
          timestamp: Date.now()
        })
      );
    }
  },

  sendReaction: (reaction) => {
    const { socket, room } = get();
    if (socket && room && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'SEND_REACTION',
          roomCode: room.code,
          reaction,
          clientActionId: generateActionId('rx'),
          timestamp: Date.now()
        })
      );
    }
  },

  sendGameAction: (msg) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  },

  clearError: () => set({ error: null })
}));
