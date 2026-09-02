# ♟️ Apex Chess Master — Modern Web Chess & Training Platform

[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-theheroayush%2Fgame-blue.svg)](https://github.com/theheroayush/game)

Welcome to **Apex Chess Master**! ♟️✨

**Apex Chess Master** is a web chess game and training suite that runs right inside your web browser. Whether you are playing your very first game of chess or training to become a tournament champion, Apex Chess gives you smart AI opponents, tactical puzzles, opening guides, and a personal AI Coach to help you learn and have fun!

---

## 🌟 What Makes Apex Chess Awesome?

```
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                           ♟️ APEX CHESS MASTER                            │
 ├───────────────────┬───────────────────┬───────────────────┬───────────────┤
 │  🤖 10 AI Levels  │  🎭 4 Bot Styles  │  👨‍🏫 Game Review   │  🧩 Puzzles   │
 │  Beginner to GM   │  Attack / Defend  │  Coach Analysis   │  15 Drills    │
 └───────────────────┴───────────────────┴───────────────────┴───────────────┘
```

### 1. 🤖 10 Bot Difficulty Levels (For All Skill Levels)
You don't need to be a grandmaster to enjoy playing! Choose from 10 calibrated difficulty tiers:
- **Level 1–3 (Beginner / Elo 600–1000)**: Friendly bots that make fun mistakes, giving you plenty of chances to attack and win.
- **Level 4–6 (Intermediate / Elo 1200–1600)**: Good club-level bots that test your tactics and basic openings.
- **Level 7–8 (Advanced / Elo 1800–2000)**: Strong tactical bots that calculate several moves ahead.
- **Level 9–10 (Master & Grandmaster / Elo 2200–2500+)**: Near-perfect play powered by deep Minimax search algorithms.

### 2. 🎭 4 Dynamic Bot Personalities
Play against bots with unique playing styles:
- ⚔️ **The Valkyrie**: Aggressive attacker who loves sacrificing pieces to hunt your King.
- 🛡️ **The Architect**: Solid positional defender who builds fortress-like pawn structures.
- 🪄 **The Magician**: Tricky tactical player who loves surprise forks, skewers, and pins.
- ⚖️ **Harmonic**: Balanced, patient tournament style.

### 3. 👨‍🏫 Personal Chess Coach & Game Review
After every game, click **"Coach Review"** to get a breakdown of your play:
- **Accuracy Score (CAPS)**: See how accurate your moves were (0% to 100%).
- **Move Classifications**: Finds your **Brilliant (💎)**, **Great (⭐)**, **Best (✅)** moves, as well as **Mistakes (⚠️)** and **Blunders (❌)**.
- **Visual Arrows**: Green arrows show what you should have played; red arrows show where the mistake happened.
- **"Retry Move" Mode**: Rewind to your biggest mistakes and try finding the winning move yourself!

### 4. 🧩 Tactical Puzzles & Puzzle Rush
- **15 Hand-Crafted Puzzles**: Practice forks, pins, back-rank checkmates, and deflection tactics.
- **Timed Modes**: Play **3-Minute Rush**, **5-Minute Rush**, or **Survival Mode** (3 strikes and you're out).

### 5. 📚 Master Opening Explorer & Endgame Drills
- **Opening Guide**: Step through famous chess openings (e.g., *Sicilian Defense*, *Queen's Gambit*, *Ruy Lopez*, *French Defense*) with interactive guide arrows.
- **Endgame Drills**: Practice theoretical winning endgames (like King + Rook vs King, Queen vs Pawn on 7th rank) against an active computer defense.

### 6. 🎨 Beautiful Tournament Board Themes
Customize your chessboard with 5 premium themes and piece styles:
- **Board Themes**: Emerald Classic, Slate Dark, Walnut Wood, Sapphire Neon, and Carbon Night.
- **Piece Styles**: Staunton, Neo Modern, Woodcraft, Alpha, and Minimalist.

---

## 🚀 How to Start Playing in 10 Seconds (Super Easy)

You do **NOT** need any coding knowledge or extra software!

### Easiest Way:
1. Open this folder on your computer.
2. Double-click the file named **`index.html`**.
3. It will open immediately in your web browser (Google Chrome, Microsoft Edge, Safari, Brave, or Firefox).
4. Click **"New Game"**, choose your favorite AI level, and make your first move!

---

## 🎮 Game Controls & How to Play

| Action | How to Do It |
|---|---|
| **Move a Piece** | Click the piece you want to move. Green dots appear on all legal squares. Click your target square (or simply drag and drop). |
| **Castle** | Move your King two squares toward the Rook (e1 to g1 or e1 to c1). |
| **Pawn Promotion** | When your pawn reaches the other end of the board, a menu automatically opens to let you choose **Queen, Rook, Bishop, or Knight**. |
| **En Passant** | Fully supported! Capture an enemy pawn that moved 2 squares past yours. |
| **Flip Board** | Click the **Flip Board** button (or press `F` on your keyboard) to view the board from Black's perspective. |
| **Step Through Moves** | Use the `←` (Previous) and `→` (Next) buttons or keyboard arrow keys. |

---

## ⏱️ Game Modes & Time Controls

- ⚡ **Bullet**: Fast 1-minute or 2-minute games.
- 🔥 **Blitz**: 3-minute and 5-minute action games.
- ⏳ **Rapid**: 10-minute and 15-minute standard games.
- 🧘 **Casual / Unlimited**: No clock pressure. Take as much time as you want to think!
- 👥 **2-Player Pass & Play**: Play against a friend sitting beside you on the same device.

---

## 📁 Clean Project Structure

```
game/
├── index.html              # 🌐 Main web entry file (Double-click to play!)
├── package.json            # 📦 Project dependencies & scripts
├── README.md               # 📖 This complete guide
├── LICENSE                 # ⚖️ MIT Open Source License
├── .gitignore              # 🛡️ Clean exclusion of build caches
├── vite.config.ts          # ⚡ Lightning-fast Vite build configuration
├── tailwind.config.js      # 🎨 Board themes and modern styling
│
├── public/                 # 🖼️ Vector piece icons, sounds & favicon
│
└── src/                    # 💻 Core Source Code
    ├── main.tsx            # React root mount
    ├── App.tsx             # Main Game Hub & view coordinator
    │
    ├── components/         # ♟️ UI Components (Board, Clock, EvalBar, CoachReview, Puzzles)
    │   ├── ChessBoard.tsx  # Interactive 8x8 SVG chessboard
    │   ├── AnalysisView.tsx# Move-by-move Game Review with CAPS score
    │   ├── PuzzleView.tsx  # Tactical Puzzle Rush mode
    │   ├── OpeningsView.tsx# Opening Explorer with guide arrows
    │   └── EndgameView.tsx # Endgame trainer against live AI
    │
    ├── engine/             # 🧠 AI Decision Engine (Minimax + Alpha-Beta Pruning)
    │   ├── aiWorker.ts     # Background web worker for instant moves
    │   ├── evaluate.ts     # Piece-square tables, pawn structure & king safety
    │   └── search.ts       # Move ordering & quiescence search
    │
    ├── data/               # 📚 Opening book repertoires & puzzle database
    └── types/              # 📐 TypeScript game state & move definitions
```

---

## 💻 For Developers & Tech Enthusiasts (Optional)

If you would like to run the live development server or modify the code:

### 1. Requirements
- Node.js (version 18 or newer)
- npm

### 2. Commands
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (with instant hot-reloading)
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Run Oxlint code quality verification (0 warnings, 0 errors)
npm run lint
```

---

## ❓ Frequently Asked Questions (FAQ)

#### Q1: Is this game completely free?
> **Yes, 100% free!** No subscriptions, no ads, and no in-app purchases.

#### Q2: Can I play without an internet connection?
> **Yes!** The game and all AI bots run entirely inside your browser and work 100% offline.

#### Q3: Does it work on mobile phones and tablets?
> **Yes!** The board automatically scales to fit phone and tablet screens with touch drag-and-drop support.

#### Q4: Can I import and export PGN game records?
> **Yes!** You can export your games to standard PGN notation or paste any PGN from Chess.com / Lichess to analyze it in the Coach Review.

---

## ⚖️ License
This project is open-source and licensed under the **MIT License**.

**Created with ❤️ by Ayush Upadhyay ([@theheroayush](https://github.com/theheroayush))**
