import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { LudoServer } from '../src/server/ws-server';
import { WebSocket } from 'ws';
import { ServerMessage } from '../src/types/websocket';

describe('Ludo WebSocket Server Protocol & Idempotency Tests', () => {
  let server: LudoServer;
  const PORT = 8089;
  const WS_URL = `ws://localhost:${PORT}`;

  beforeAll(() => {
    server = new LudoServer(PORT);
  });

  afterAll(() => {
    server.close();
  });

  it('Client connects and receives PONG on PING', async () => {
    const ws = new WebSocket(WS_URL);
    await new Promise((resolve) => ws.on('open', resolve));

    const pongPromise = new Promise<ServerMessage>((resolve) => {
      ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'PONG') resolve(msg);
      });
    });

    ws.send(
      JSON.stringify({
        type: 'PING',
        clientActionId: 'act_ping_1',
        timestamp: Date.now()
      })
    );

    const pong = await pongPromise;
    expect(pong.type).toBe('PONG');
    expect(pong.clientActionId).toBe('act_ping_1');

    ws.close();
  });

  it('Host creates room and receives ROOM_CREATED with 6-char code', async () => {
    const ws = new WebSocket(WS_URL);
    await new Promise((resolve) => ws.on('open', resolve));

    const roomPromise = new Promise<ServerMessage<{ room: { code: string } }>>((resolve) => {
      ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'ROOM_CREATED') resolve(msg);
      });
    });

    ws.send(
      JSON.stringify({
        type: 'CREATE_ROOM',
        playerName: 'AyushHost',
        avatar: 'avatar_1',
        clientActionId: 'act_create_1',
        timestamp: Date.now()
      })
    );

    const res = await roomPromise;
    expect(res.type).toBe('ROOM_CREATED');
    expect(res.payload.room.code).toBeDefined();
    expect(res.payload.room.code.length).toBe(6);

    ws.close();
  });
});
