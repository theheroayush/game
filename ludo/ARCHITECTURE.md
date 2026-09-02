# Ludo Web Game Architecture

## 1. System Overview

The Ludo Web Game is built on a strict **Server-Authoritative** architecture. The client functions primarily as a presentation and input layer, while the server (or local authoritative controller) validates all rules, generates cryptographically secure dice rolls, computes legal moves, and manages turn progression and victory states.

```
+-------------------------------------------------------------------------+
|                               Browser Client                            |
|  +-------------------+  +-------------------+  +---------------------+  |
|  |  React UI / Views |  |  Zustand Stores   |  | Web Audio SFX Engine|  |
|  +---------+---------+  +---------+---------+  +----------+----------+  |
|            |                      |                       |             |
|            +----------------------+-----------------------+             |
|                                   |                                     |
|                       +-----------v------------+                        |
|                       | Game Controller Bridge |                        |
|                       +-----+------------+-----+                        |
+-----------------------------|------------|------------------------------+
                              |            |
             [Online Mode]    |            |   [Offline / AI / Local Mode]
             WebSocket / HTTP |            |   In-Memory Loop
                              v            v
+-----------------------------+----+  +----+------------------------------+
|     Node.js WebSocket Server     |  |    Local Authoritative Runner     |
|  +----------------------------+  |  |  +-----------------------------+  |
|  | Room & Matchmaking Manager |  |  |  | 4-Tier AI Engine            |  |
|  +----------------------------+  |  |  +-----------------------------+  |
|  | Game State Manager         |  |  |  | Pure Game Engine            |  |
|  +----------------------------+  |  |  +-----------------------------+  |
|  | Action Idempotency Cache   |  |  +-----------------------------------+
|  +----------------------------+  |
|  | Local / DB Persistence     |  |
|  +----------------------------+  |
|  | Pure Game Engine           |  |
|  +----------------------------+  |
+----------------------------------+
```

## 2. Core Subsystems

### 2.1 Pure Game Engine (`/src/engine`)
- **Deterministic & Dependency-Free**: Pure TypeScript logic with zero DOM or network ties.
- **Normalized Coordinate System**: Relative steps (0 to 56) mapped to 15x15 board grid coordinates.
- **Rule Engine**: Configurable parameters (Yard roll-out, Extra roll on 6, Extra roll on capture, 3-sixes penalty, Safe zones, Exact home roll, Token stacking).
- **AI Decision Engine**: 4 heuristic tiers (Easy: random; Normal: greedy; Hard: weighted positional; Expert: probabilistic forward simulation).

### 2.2 Server & Real-Time Synchronization (`/src/server`)
- **WebSocket Protocol**: JSON-RPC style messaging with sequence numbers (`seq`) and idempotency keys (`clientActionId`).
- **Room Lifecycle**: 6-character room codes (`AB7K9`), shareable invite links, player slots, host controls, ready states, AI fill.
- **Turn Timer Authority**: Server timestamps `turnStartedAt` and `turnExpiresAt`; automatic pass or legal action on timeout.
- **Reconnection Handling**: 60–120s grace period; full state snapshot restoration (`FULL_GAME_STATE`) upon reconnect.

### 2.3 Audio & Visual Presentation (`/src/components` & `/src/audio`)
- **Procedural Web Audio**: Zero external audio asset dependencies. Dynamically synthesized dice rattles, token hops, captures, safe zone chimes, and victory fanfares.
- **15x15 SVG/DOM Hybrid Board**: Scalable, resolution-independent board with animated token hops (120ms/cell), glow highlights, and depth shadows.
- **3D Interactive Dice**: Physics-styled rolling dice with tactile press feedback.
