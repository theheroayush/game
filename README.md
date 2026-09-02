# 🕹️ Apex Arcade — Multi-Game Monorepo & Game Platform

[![Version](https://img.shields.io/badge/version-1.0.0-cyan.svg)](https://github.com/theheroayush/game)
[![React](https://img.shields.io/badge/React-19.2%20%7C%2018.3-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0%20%7C%205.7-3178C6.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2%20%7C%206.0-646CFF.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Passed-success.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Apex Arcade** is a unified, production-grade web games monorepo containing 4 fully-featured games: **Project Apex 3D Racing**, **Apex Chess**, **Apex Ludo**, and **Apex Tic-Tac-Toe**. Engineered with Three.js 3D WebGL physics, FIDE-calibrated Minimax AI engines (600–2500+ Elo), server-authoritative WebSocket multiplayer architectures, procedural Web Audio synthesis, and zero-latency client execution.

---

## 📑 Table of Contents

1. [Monorepo Topology & Directory Structure](#1-monorepo-topology--directory-structure)
2. [Game Inventory & Technical Deep-Dives](#2-game-inventory--technical-deep-dives)
   - [🏎️ Project Apex 3D Racing (`/apex`)](#-project-apex-3d-racing-apex)
   - [♟️ Apex Chess (`/chess`)](#-apex-chess-chess)
   - [🎲 Apex Ludo (`/ludo`)](#-apex-ludo-ludo)
   - [⚡ Apex Tic-Tac-Toe (`/tictactoe`)](#-apex-tic-tac-toe-tictactoe)
3. [Technology & Engineering Comparison Matrix](#3-technology--engineering-comparison-matrix)
4. [Prerequisites & System Requirements](#4-prerequisites--system-requirements)
5. [Getting Started & Run Commands](#5-getting-started--run-commands)
   - [Root Arcade Launcher Hub](#root-arcade-launcher-hub)
   - [Apex Chess Setup & Build](#apex-chess-setup--build)
   - [Apex Ludo Setup, Build & Tests](#apex-ludo-setup-build--tests)
   - [Project Apex 3D Racing & Tic-Tac-Toe](#project-apex-3d-racing--tic-tac-toe)
6. [Core Engineering & Architecture Standards](#6-core-engineering--architecture-standards)
7. [Verification & Quality Assurance Suite](#7-verification--quality-assurance-suite)
8. [Roadmap & Version Changelog](#8-roadmap--version-changelog)
9. [Author, Repository & License](#9-author-repository--license)

---

## 1. Monorepo Topology & Directory Structure

The monorepo organizes standalone games, full-stack platforms, and the root arcade portal into cleanly isolated workspaces with zero circular dependencies:

```
game/
├── index.html                  # Centralized Apex Obsidian Neon Arcade Launcher Hub
├── README.md                   # Comprehensive Monorepo Architecture Guide & Docs
├── .gitignore                  # Unified Root Git Hygiene Rules
│
├── tictactoe/                  # Apex Tic-Tac-Toe (Futuristic Neon Motion Experience)
│   ├── index.html              # Standalone client entry point
│   ├── favicon.svg             # Polygon vector icon
│   ├── icons.svg               # SVG symbol sheet
│   └── assets/                 # Compiled JavaScript chunks, dictionary, and CSS
│
├── apex/                       # Project Apex 3D Racing (High-End Three.js WebGL Racing)
│   ├── index.html              # Standalone 3D client entry point
│   ├── favicon.svg             # Vector favicon
│   └── assets/                 # Three.js shaders, vehicle physics, audio, and styles
│
├── chess/                      # Apex Chess (React 19 + TypeScript 6.0 Platform)
│   ├── index.html              # Vite entry point
│   ├── package.json            # Scripts: dev, build (tsc -b && vite build), lint (oxlint)
│   ├── vite.config.ts          # Vite 8.2 bundler configuration
│   ├── tsconfig.json           # TypeScript 6.0 project configuration
│   ├── tsconfig.app.json       # Strict TypeScript app compilation rules
│   ├── tailwind.config.js      # Tournament board themes (Emerald, Slate, Sapphire, Walnut)
│   ├── public/                 # Static vector assets
│   └── src/                    # Source Code
│       ├── App.tsx             # Root application coordinator
│       ├── main.tsx            # React 19 root mount
│       ├── components/         # ChessBoard, Clock, EvalBar, CoachReview, PGNModal, etc.
│       ├── engine/             # Minimax search, alpha-beta, quiescence, transposition table
│       │   ├── aiWorker.ts     # Dedicated Web Worker for non-blocking engine search
│       │   ├── evaluate.ts     # Piece-square tables, pawn structure, king safety
│       │   └── search.ts       # MVV-LVA move ordering, killer moves, delta pruning
│       ├── data/               # 15 Tactical Puzzles, 6 Endgame Drills, 15 Opening Books
│       └── types/              # FIDE rules, Elo tiers, move notation type definitions
│
└── ludo/                       # Apex Ludo (React 18 + TypeScript 5.7 Full-Stack Platform)
    ├── index.html              # Vite entry point
    ├── package.json            # Scripts: dev, server, build, test (vitest run)
    ├── vite.config.ts          # Vite 6.0 bundler configuration
    ├── tsconfig.json           # TypeScript 5.7 project configuration
    ├── tsconfig.app.json       # Strict TypeScript client rules
    ├── tsconfig.node.json      # Node server TypeScript rules
    ├── tailwind.config.js      # Responsive multi-quadrant board styling
    ├── tests/                  # Vitest Automated Test Suites
    │   ├── engine.test.ts      # 9 unit tests for game rules, safe zones & home stretch
    │   ├── ai.test.ts          # 2 integration tests for 4-tier bot AI decisions
    │   └── server.test.ts      # 2 integration tests for WebSocket room lifecycle
    └── src/                    # Source Code
        ├── App.tsx             # Root view coordinator & navigation
        ├── main.tsx            # React 18 root mount
        ├── components/         # 15x15 SVG Board, 3D Physics Dice, PlayerCards, Modals
        ├── store/              # Zustand state store with optimistic sync
        ├── engine/             # Server-authoritative anti-cheat game rules
        ├── ai/                 # 4-tier bot AI heuristic evaluator
        ├── audio/              # Procedural Web Audio synthesizer for dice & captures
        └── server/             # WebSocket Standalone Server (standalone.ts)
```
---

## 2. Game Inventory & Technical Deep-Dives

### 🏎️ Project Apex 3D Racing (`/apex`)

**Project Apex 3D Racing** is an arcade-simulation web racer built with Three.js, featuring high-speed open-wheel formula cars, procedural track geometry, dynamic lighting, and responsive simcade physics.

#### Key Mechanics & Architecture
- **Vehicle Physics Model**:
  - Longitudinal acceleration modeled with multi-gear torque curves and air drag resistance.
  - Lateral tire slip-angle friction calculation, allowing controlled power slides and handbrake drift recovery.
  - Raycasted ground clearance with spring-damper suspension simulation.
  - Slipstream drafting mechanics granting temporary top-speed boosts when trailing opponents.
- **Rendering & Visual Shaders**:
  - Three.js WebGL 2.0 rendering engine with dynamic directional sun lighting and real-time shadow mapping.
  - Procedural particle emitters generating dynamic tire smoke during burnouts/drifts and metallic sparks upon track barrier impacts.
  - Responsive camera system supporting 3 distinct viewpoints: **Chase Camera** (dynamic lag & speed FOV scaling), **Hood Camera**, and **Bumper Camera**.
- **AI Competitor Grid**:
  - Multi-vehicle AI grid following mathematical Catmull-Rom spline curves with lateral obstacle avoidance and randomized aggressiveness coefficients.
- **Controls Matrix**:
  | Action | Desktop Keyboard | Mobile / Touch |
  |---|---|---|
  | **Accelerate** | `W` or `↑` | On-Screen Throttle Pedal |
  | **Brake / Reverse** | `S` or `↓` | On-Screen Brake Pedal |
  | **Steer Left / Right** | `A` / `D` or `←` / `→` | Touch Joystick / Gyro Sensor |
  | **Handbrake Drift** | `Spacebar` | On-Screen E-Brake Button |
  | **Change Camera** | `C` | Camera Toggle Icon |
  | **Reset Vehicle** | `R` | Reset Track Button |

---

### ♟️ Apex Chess (`/chess`)

**Apex Chess** is a tournament-grade web chess platform built with React 19 and TypeScript 6.0, incorporating full FIDE rules, human-calibrated Minimax search engines, real-time coach review, and comprehensive tactical training suites.

#### Key Mechanics & Architecture
- **Minimax Search Engine (`chess/src/engine/`)**:
  - **Alpha-Beta Pruning**: Drastically reduces the search tree size while guaranteeing minimax value equality.
  - **MVV-LVA Move Ordering**: Most Valuable Victim – Least Valuable Attacker ordering searches decisive captures first (e.g., $P \times Q$ before $Q \times P$).
  - **Killer Moves Heuristic**: Records non-capture moves that caused beta cutoffs at identical plies, awarding $+8000$ and $+7000$ ordering bonuses.
  - **Quiescence Search**: Extends search on noisy tactical capture positions with $925\text{cp}$ delta pruning to completely eliminate the horizon effect.
  - **Transposition Table**: 60,000-entry LRU cache storing Zobrist-hashed positions, exact values, and lower/upper bounds.
  - **Web Worker Decoupling (`aiWorker.ts`)**: Executes search algorithms in a background thread, preventing UI thread starvation and maintaining 60fps animations.
- **10 Human-Calibrated Elo Difficulty Tiers**:
  - **Tier 1–3 (600–1000 Elo)**: High blunder frequency, shallow search depth (1–2 plies), tactical blindness.
  - **Tier 4–7 (1200–1800 Elo)**: Balanced positional play, tactical awareness, occasional tactical misses under pressure.
  - **Tier 8–10 (2000–2500+ Elo)**: Deep tactical evaluation (5–7 plies + Quiescence), optimal endgame play, near-zero blunders.
- **4 Dynamic Opponent Personalities**:
  - **Grandmaster**: Maximum positional depth, king safety prioritization, endgame optimization.
  - **Aggressive**: Sacrificial play, king hunt prioritization, gambit opening tendencies.
  - **Solid**: Defensively fortified structures, piece consolidation, low volatility.
  - **Positional**: Outpost dominance, pawn structure preservation, spatial expansion.
- **Coach Game Review & CAPS Accuracy**:
  - Computes exact centipawn evaluations for every move in the match.
  - Classifies moves: **Brilliant (!!)**, **Great (!)**, **Best**, **Excellent**, **Good**, **Inaccuracy (?)**, **Mistake (??)**, **Blunder (???)**, and **Missed Win**.
  - Generates smooth centipawn evaluation swing splines and Chess.com-style percentage accuracy scores.
- **Auxiliary Training Modules**:
  - **Tactical Puzzles**: 15 curated FEN tactical positions supporting both Practice and timed **Puzzle Rush** modes.
  - **Master Endgame Drills**: 6 critical endgame positions (Lucena, Philidor, King+Pawn vs King, Rook+Pawn vs Rook).
  - **Opening Explorer**: 15 standard master repertoires (Ruy Lopez, Sicilian Defense, Queen's Gambit, King's Indian, Caro-Kann, etc.).
  - **FEN Editor & Coordinate Trainer**: Full custom board setup with speed vision coordinate drills.
- **Controls Matrix**:
  | Action | Control Input |
  |---|---|
  | **Move Piece** | Left-Click & Drop or Click Source + Click Destination |
  | **Annotations** | Right-Click + Drag for Arrows; Right-Click Square for Color Highlights |
  | **Takeback Move** | `Z` key or Click "Undo" |
  | **Replay Match** | Arrow Keys `←` / `→` or Replay Play/Pause Controls |
  | **Coach Review** | Click "Coach Analysis" Tab |
---

### 🎲 Apex Ludo (`/ludo`)

**Apex Ludo** is a competitive multiplayer and local pass-and-play Ludo platform engineered with React 18, TypeScript 5.7, Zustand, and a standalone WebSocket server for anti-cheat authority.

#### Key Mechanics & Architecture
- **Server-Authoritative State Machine (`ludo/src/engine/`)**:
  - Normalized 15x15 coordinate system mapping each player's 4 tokens along a 56-step trajectory:
    - **Spawn Base**: Token position `-1`. Requires rolling a `6` to enter square `0`.
    - **Main Track**: Steps `0` through `50`. Tokens advance clockwise around the perimeter.
    - **Safe Zones & Star Squares**: Specific squares (Steps `1`, `9`, `14`, `22`, `27`, `35`, `40`, `48`) grant total immunity from capture. Tokens of different players may coexist safely on star squares.
    - **Home Column & Finish**: Steps `51` through `56`. Tokens require an exact roll to enter the center Victory Triangle.
  - **Capture & Bonus Mechanics**: Capturing an opponent token sends it back to its spawn base and grants the active player an immediate bonus dice roll.
  - **Consecutive Sixes Rule**: Rolling three consecutive `6`s forfeits the third roll and passes the turn to the next player.
- **3D Physics Dice Engine**:
  - Interactive 3D cube rendered with CSS 3D matrix transformations and physics-driven spin deceleration.
  - Generates fair uniform random values ($P(X=k) = 1/6$) with client-server nonce verification.
- **4-Tier Heuristic Bot AI (`ludo/src/ai/`)**:
  - **Easy**: Randomly selects among legal available token moves.
  - **Medium**: Evaluates immediate capture opportunities and prioritizes moving tokens out of the spawn base on a `6`.
  - **Hard**: Balances token progression, safe-zone star positioning, and vulnerability avoidance.
  - **Expert**: Multi-ply lookahead simulating opponent roll distributions to minimize capture risk while maximizing home-stretch advancement.
- **WebSocket Protocol (`ludo/src/server/standalone.ts`)**:
  - Low-latency JSON-RPC protocol over WebSocket (`ws://`):
    - `CREATE_ROOM`: Generates a collision-free 6-character room code (e.g., `AB7K9`).
    - `JOIN_ROOM`: Connects 2–4 players with color assignment (Red, Green, Yellow, Blue).
    - `ROLL_DICE` & `MOVE_TOKEN`: Server-validated turn progression with broadcast state diffs.
    - Heartbeat ping/pong and 60-second reconnection grace period for transient network interruptions.
- **Procedural Web Audio Synthesizer**:
  - Uses the Web Audio API (`AudioContext`) to procedurally generate all audio assets (dice shake rattle, token landing click, capture boom, victory fanfares) with zero external media files.

---

### ⚡ Apex Tic-Tac-Toe (`/tictactoe`)

**Apex Tic-Tac-Toe** is a cyberpunk-themed standalone web game featuring unbeatable Minimax game theory AI, dynamic canvas particles, and glowing win splines.

#### Key Mechanics & Architecture
- **Deterministic Minimax Algorithm**:
  - Recursively evaluates the $3 \times 3$ game tree to guaranteed optimality: $V(s) = \max_{a} \min_{b} U(s')$.
  - Unbeatable AI mode guarantees victory or forced draw against any human play.
  - Supports configurable difficulty (Easy, Medium, Unbeatable) and 2-player local pass-and-play.
- **Visuals & Dynamic Motion**:
  - High-performance HTML5 canvas particle bursts on token placement and winning lines.
  - Cyberpunk obsidian and neon plasma color palette with responsive CSS layout.

---

## 3. Technology & Engineering Comparison Matrix

| Specification Dimension | 🏎️ Project Apex 3D Racing | ♟️ Apex Chess | 🎲 Apex Ludo | ⚡ Apex Tic-Tac-Toe |
|---|---|---|---|---|
| **Directory** | `/apex` | `/chess` | `/ludo` | `/tictactoe` |
| **Language & Version** | TypeScript 5.x | TypeScript 6.0.2 | TypeScript 5.7.2 | TypeScript 5.x |
| **UI Framework** | Vanilla ES6 / Canvas | React 19.2.8 | React 18.3.1 | React 18 / TailwindCSS |
| **Styling Solution** | Custom CSS / Three.js | TailwindCSS 3.4.17 | TailwindCSS 3.4.17 | TailwindCSS + Canvas |
| **Primary Engine** | Three.js WebGL 2.0 | chess.js 1.4.0 + Custom Search | Authoritative State Machine | Deterministic Minimax Tree |
| **AI Algorithms** | Spline-Follower + Avoidance | Minimax, Alpha-Beta, Quiescence, Killer Moves | 4-Tier Heuristic / Monte Carlo | Optimal Minimax (Depth 9) |
| **Audio Architecture** | Procedural Web Audio | Procedural Web Audio | Procedural Web Audio Synth | Procedural Web Audio |
| **Multiplayer / Modes** | Local AI Grid & Time-Attack | Local Pass-and-Play + AI | WebSocket JSON-RPC & Local | Local Pass-and-Play + AI |
| **Build Tooling** | Vite Static Bundle | Vite 8.2.0 (`tsc -b && vite build`) | Vite 6.0.3 (`tsc -b && vite build`) | Vite Static Bundle |
| **Test Verification** | Manual & Visual Suite | 230+ Automated Chess Checks | 13 Vitest Unit/Integration Tests | Standalone Validation |
---

## 4. Prerequisites & System Requirements

To develop or build subprojects in this monorepo locally, ensure you have:
- **Node.js**: `v18.0.0` or higher (verified on `v26.4.0`)
- **npm**: `v9.0.0` or higher (verified on `v12.0.1`)
- **Modern Web Browser**: Chrome 110+, Edge 110+, Firefox 115+, or Safari 16.4+ (supporting WebGL 2.0 and Web Audio API)

---

## 5. Getting Started & Run Commands

### Root Arcade Launcher Hub

The root portal (`index.html`) is completely self-contained with zero runtime build dependencies. You can serve the entire monorepo with any static HTTP file server:

```bash
# From the repository root:
npx serve .
# Or using Python 3:
python -m http.server 3000
```
Open `http://localhost:3000` (or the printed port) in your web browser.

---

### Apex Chess Setup & Build

```bash
# Navigate to chess subproject
cd chess

# Install dependencies
npm install

# Start Vite development server (port 5173)
npm run dev

# Run TypeScript compiler typecheck & build production bundle
npm run build

# Run Oxlint static analysis
npm run lint
```

---

### Apex Ludo Setup, Build & Tests

```bash
# Navigate to ludo subproject
cd ludo

# Install dependencies
npm install

# Start client development server
npm run dev

# Start authoritative standalone WebSocket server (port 8080)
npm run server

# Run Vitest automated test suite (all 13 tests)
npm run test

# Run TypeScript compiler typecheck & build production bundle
npm run build
```

---

### Project Apex 3D Racing & Tic-Tac-Toe

Both `/apex` and `/tictactoe` are pre-compiled, self-contained applications:
```bash
# Project Apex 3D Racing
cd apex
# Open index.html directly or serve with npx serve .

# Apex Tic-Tac-Toe
cd ../tictactoe
# Open index.html directly or serve with npx serve .
```

---

## 6. Core Engineering & Architecture Standards

1. **Zero-Placeholder Discipline**:
   - Zero `TODO`, `FIXME`, or stubbed handler functions in production source code. Every UI state, error boundary, modal trigger, and WebSocket event handler is implemented end-to-end.
2. **Strict TypeScript Compilation**:
   - All subprojects enforce strict type checking (`tsc -b`), explicit typing of engine state objects, and zero implicit `any`.
3. **Responsive Viewport Standard**:
   - All games enforce viewport constraint equations (`calc(100vh - 230px)`) ensuring zero page-level vertical clipping on mobile (<640px), tablet (768–1024px), and desktop (1280px+).
4. **Procedural Audio Synthesizer Standard**:
   - Sound effects across games utilize the Web Audio API oscillator/gain envelope synthesizers, eliminating external MP3/WAV network dependencies and guaranteeing instant audio feedback with zero asset load latency.
5. **Clean Git Hygiene**:
   - The unified root `.gitignore` guarantees that no `node_modules`, `dist/`, `*.tsbuildinfo`, `.DS_Store`, or agent logs are tracked in source control.

---

## 7. Verification & Quality Assurance Suite

All subprojects have been rigorously audited and verified:

```
[Chess Verification]
✓ TypeScript Compilation: tsc -b passed (0 errors)
✓ Vite Production Bundle: built in 791ms
✓ Oxlint Static Code Analysis: 0 errors, 41 files scanned

[Ludo Verification]
✓ TypeScript Compilation: tsc -b passed (0 errors)
✓ Vite Production Bundle: built in 2.13s
✓ Vitest Test Suite:
  ✓ tests/engine.test.ts (9 tests passed)
  ✓ tests/ai.test.ts     (2 tests passed)
  ✓ tests/server.test.ts (2 tests passed)
  Total: 13 passed (100%)
```

---

## 8. Roadmap & Version Changelog

- **v1.0.0 (Current Release — September 2026)**:
  - Centralized Apex Obsidian Neon Arcade Portal at root (`index.html`).
  - Top-level directory isolation for `/tictactoe`, `/apex`, `/chess`, `/ludo`.
  - Comprehensive monorepo architecture guide and `.gitignore` hygiene.
  - Initial public GitHub release on `theheroayush/game`.
- **v1.1.0 (Planned)**:
  - Shared Web Audio procedural synthesizer package across all games.
  - PWA service worker offline caching for mobile home-screen install.
- **v2.0.0 (Planned)**:
  - Cross-game unified player profile with XP progression and achievements.
  - Global multiplayer leaderboards and matchmaking lobby.

---

## 9. Author, Repository & License

- **Author**: Ayush UPADHYAY
- **Email**: [ayushupadhyaofficial@gmail.com](mailto:ayushupadhyaofficial@gmail.com)
- **GitHub Repository**: [https://github.com/theheroayush/game](https://github.com/theheroayush/game)
- **License**: [MIT License](LICENSE) — Free for personal and educational use.
