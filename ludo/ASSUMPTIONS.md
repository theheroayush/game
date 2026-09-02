# Engineering Assumptions & Verification Register

## 1. Verified Facts (PRD Ground Truth)
- Standard 4-player Ludo with Red, Green, Yellow, Blue quadrants.
- 52-tile cyclic perimeter track with 8 standard safe squares (4 starts + 4 stars).
- 4 Game Modes: Quick Play, Private Room (with 6-character code), Play vs AI (4 difficulty tiers), and Local Pass-and-Play.
- Server is the single source of truth for dice rolls, legal moves, turn state, captures, and victory.
- Action idempotency with `clientActionId` prevents double-roll/double-move anomalies.
- Full offline/PWA capability: procedural Web Audio synthesizer eliminates external sound file asset dependencies.

## 2. Reversibility Classification
- **Type 1 Choices (Irreversible / High Stakes)**:
  - Step progression numbering (0..56) and grid translation formulas.
  - WebSocket event contract and state snapshot structure.
  - Action verification & idempotency pipeline.
- **Type 2 Choices (Reversible / Iterative)**:
  - Color hex values and SVG gradient styling.
  - Audio synthesizer waveform frequencies and envelope ADSR parameters.
  - AI heuristics weight constants.
  - Turn animation step duration (100–150ms).

## 3. Assumptions Register
- **A1. Network Fallback**: If the standalone WebSocket server is not running or disconnected in offline environments, the frontend gracefully falls back to an in-memory client-side authoritative controller for single-player AI and local pass-and-play matches.
- **A2. Web Audio Synthesizer**: Procedural sound generation via the Web Audio API provides zero-latency, cross-platform audio without requiring large remote MP3 downloads.
- **A3. Persistence Model**: User profiles, statistics, match history, and leaderboard records are stored in browser localStorage with structured JSON schemas and synced with the backend.
