# Ludo Web Game 🎲

A modern, high-fidelity web Ludo gaming platform with server-authoritative multiplayer, 4-tier AI, private rooms, local pass-and-play, procedural Web Audio sound effects, and persistent player analytics.

## Features

- 🎮 **4 Complete Game Modes**:
  - **Quick Play**: Instant multiplayer matchmaking.
  - **Play with Friends**: Private rooms with 6-character room codes (`AB7K9`), shareable invite links, and host controls.
  - **Play vs AI**: 4 distinct strategic bot difficulties (Easy, Normal, Hard, Expert).
  - **Local Pass-and-Play**: 2, 3, or 4 players on a single device.
- 📐 **True 15x15 SVG Board**: Scalable, resolution-independent vector board with 8 safe zones and fluid cell-by-cell hop animations.
- 🎲 **3D Tactile Dice**: Physics-styled rolling dice with dynamic turn highlights.
- 🔊 **Procedural Web Audio Engine**: Zero-latency synthesized sound effects for dice rolls, token hops, captures, safe zone chimes, and victory fanfares.
- 🛡️ **Anti-Cheat & Server Authority**: Cryptographic dice randomness (`crypto.randomInt`), legal move enforcement, turn timers, and action idempotency.
- 📊 **Stats & Leaderboard**: Complete profile tracking (wins, losses, win rate, total captures, streak, dice roll distribution), match history, and Global/Weekly/Monthly leaderboards.
- 📱 **Mobile & Tablet Optimized**: Responsive touch targets (>= 44px), iOS safe areas, and portrait/landscape adaptability.

## Quick Start

```bash
# Navigate to the ludo directory
cd ludo

# Install dependencies
npm install

# Start both Web and WebSocket Server
npm run dev

# Run automated tests
npm test
```
