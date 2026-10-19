# ♟️ Apex Chess Master — Dual-Platform Engine & Training Suite
### 🌐 Web (React 19 + TypeScript) &nbsp;|&nbsp; 📱 Mobile (Flutter + Android App Bundle)

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B.svg?logo=flutter)](https://flutter.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Google Play Store Ready](https://img.shields.io/badge/Google%20Play-Release%20Ready-34A853.svg?logo=google-play)](PLAY_STORE_LISTING.md)
[![Zero Permissions](https://img.shields.io/badge/Permissions-Zero%20Required-00C853.svg)](#-privacy-first--zero-permissions-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Apex Chess Master** is a high-performance, Tier-1 chess platform built for both **Web** and **Android (Google Play Store)**. Powered by a custom minimax engine featuring **Static Exchange Evaluation (SEE)**, **SEE-filtered Quiescence Search**, and **Tapered Positional Evaluation**, Apex Chess Master delivers human-like tactical play with zero piece-drops or unrealistic blunders.

---

## 🌟 Key Highlights

```
 ┌───────────────────────────────────────────────────────────────────────────────┐
 │                            ♟️ APEX CHESS MASTER                               │
 ├───────────────────┬───────────────────┬───────────────────┬───────────────────┤
 │  🤖 10 AI Levels  │  🧠 Tier-1 Engine │  📱 Play Store AAB│  🛡️ Zero Perms   │
 │  Elo 600 to 2500  │  AlphaBeta + SEE  │  R8 Minified      │  100% Offline     │
 ├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
 │  👨‍🏫 AI Coach     │  ⚡ Threat Arrows │  ⏱️ Tactics Sprint│  🎨 Custom Themes │
 │  Accuracy & Review│  Best Move Visual │  Puzzle Rush      │  Wood / Onyx / Neo│
 └───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

### 1. 🧠 Grandmaster-Grade Engine Architecture
- **Alpha-Beta Minimax with Iterative Deepening**: Explores up to depth 8 in background isolates / web workers without freezing the UI.
- **Static Exchange Evaluation (SEE)**: Simulates full capture sequences on contested squares using smallest-attacker-first heuristics to prevent giving away pieces for defended pawns.
- **SEE-Filtered Quiescence Search**: Prunes losing tactical trades before they pollute search trees.
- **Tapered Positional Evaluation**: Interpolates King piece-square tables smoothly between opening/middlegame and endgame phases.
- **10 Calibrated Elo Tiers**: From Jimmy (600 Elo) to Magnus AI (2500 Elo).

### 2. 📱 Google Play Store Ready (Android)
- **Production Signed Bundle**: `mobile/build/app/outputs/bundle/release/app-release.aab` (50.5 MB).
- **Hardened R8 / ProGuard Optimization**: Code shrinking, dead code elimination, and resource stripping enabled.
- **Zero-Permissions Architecture**: Stripped all unnecessary permissions (`INTERNET`, `POST_NOTIFICATIONS`, `VIBRATE`). Requires **0 special permissions**, completely exempting the app from Google Play's declaration forms and video demonstration requirements.
- **Complete Listing & Policy Package**: Includes [`PLAY_STORE_LISTING.md`](PLAY_STORE_LISTING.md) and [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md).

### 3. 👨‍🏫 Personal Coach & Game Review
- **CAPS Accuracy Metric**: Evaluates play quality from 0% to 100%.
- **Move Classifications**: Flags Brilliant (💎), Great (⭐), Best (✅), Inaccuracy (?!), Mistake (?), and Blunder (??).
- **Visual Coaching Overlays**: Live threat arrows, best-move indicators, and territorial control heatmaps.
- **Blunder Remediation**: Rewind to critical mistakes and solve for the best continuation.

### 4. 🧩 Training Drills & Practice Modes
- **Tactical Puzzle Rush**: Hand-crafted puzzles with 3-minute, 5-minute, and survival formats.
- **Endgame Studies**: Theoretical endings (Rook vs King, Queen vs Pawn, King + Pawn races).
- **Master Opening Explorer**: Interactive visual guides for Sicilian, Ruy Lopez, Queen's Gambit, French, Caro-Kann, and London systems.
- **Coordinate Trainer**: Fast-paced board vision drill.

---

## 📁 Repository Structure

```
game/
├── PLAY_STORE_LISTING.md        # 📋 Google Play Store title, description, and console checklist
├── PRIVACY_POLICY.md            # 🔒 GDPR & Google Play compliant privacy policy
│
├── mobile/                      # 📱 Mobile App (Flutter / Android / iOS)
│   ├── lib/
│   │   ├── engine/              # Minimax search, SEE, tapered evaluation, coach analysis
│   │   ├── models/              # Engine configs, difficulty tiers, personalities, Elo models
│   │   ├── services/            # Storage, haptics, procedural sound synthesizer
│   │   └── ui/                  # Board, Play, Analysis, Puzzles, Openings, Tools screens
│   ├── android/
│   │   ├── app/
│   │   │   ├── build.gradle.kts # Release signing, R8 minification, ProGuard config
│   │   │   ├── proguard-rules.pro
│   │   │   └── src/main/AndroidManifest.xml # Hardened zero-permissions manifest
│   │   └── key.properties.example
│   └── test/                    # Comprehensive unit, ELO calibration & tactical test suites
│
├── src/                         # 🌐 Web App (React 19 + TypeScript + Vite)
│   ├── components/              # Interactive SVG board, eval bar, coach review, puzzle runner
│   ├── engine/                  # TypeScript Minimax engine, evaluation, web worker isolate
│   ├── data/                    # Openings repertoires and puzzle databases
│   └── types/                   # Game definitions and move interfaces
│
├── index.html                   # 🌐 Web entry point
├── package.json                 # Web dependencies and build scripts
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Getting Started

### 🌐 Running the Web Application
```bash
# Install dependencies
npm install

# Start local development server with hot-reload
npm run dev

# Build production bundle
npm run build
```

### 📱 Running & Building the Mobile App (Flutter)
```bash
cd mobile

# Get Flutter dependencies
flutter pub get

# Run static analysis (0 issues)
flutter analyze

# Run complete automated test suite
flutter test

# Build production signed Android App Bundle (.aab)
flutter build appbundle --release
```

---

## 🛡️ Privacy-First & Zero-Permissions Architecture

Apex Chess Master operates **100% on-device**:
- ❌ **No account required**
- ❌ **No telemetry or analytics tracking**
- ❌ **No runtime permissions (`POST_NOTIFICATIONS` is disabled)**
- ❌ **No internet access required to play**
- ✅ **Tactile feedback uses standard Android View haptics (no `VIBRATE` permission required)**

---

## ⚖️ License & Credits

Distributed under the **MIT License**. Created by Ayush Upadhyay ([@theheroayush](https://github.com/theheroayush)).
