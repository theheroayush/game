# ♟️ APEX CHESS MOBILE: PRODUCT REQUIREMENT DOCUMENT (PRD)
## Cross-Platform Flutter Android Application with Minimax AI & Daily Practice Loops

**Document Identifier**: PRD-APEX-CHESS-MOBILE-001  
**Version**: 1.0.0 (Production Master)  
**Author**: Apex Product & Engineering Council (AEC)  
**Status**: Ready for Implementation  
**Target Environments**: Android (Min SDK 26 / Target SDK 36), Cross-Platform Flutter (Web/Desktop compatible)  

---

## 1. Executive Summary & Vision

### 1.1 Product Mission
Apex Chess Mobile translates the acclaimed web platform (**Apex Chess Master**) into a world-class, offline-first native Android application using **Flutter 3.44+ and Dart 3.12+**. It brings every single feature of the web app into a mobile-first ergonomic experience, augmented with native device superpowers:
- **Intelligent Habit Engine**: Local push notifications and automated alarm scheduling that prompt users to practice tactics daily, analyze blunders, and maintain active win streaks.
- **Multithreaded Background AI**: A high-performance pure Dart Minimax chess engine running inside a dedicated background **Dart Isolate**, ensuring the 120Hz/60Hz mobile display remains buttery smooth during deep calculations.
- **Cross-Platform Local Server Sync**: Seamless offline-first persistence with an automated background sync client connecting to the user's local server (`http://localhost` or LAN IP) for unified cross-device progression.
- **Tournament Grade UX**: Responsive board with zero overflow, tap-to-move and drag-and-drop gestures, Staunton SVG pieces, tactile haptics, coach voice commentary, and complete training suites.

---

## 2. Comparative Architecture: Web vs. Mobile Flutter

| Subsystem | Web Implementation (React 19 / Vite) | Mobile Implementation (Flutter 3.44 / Dart 3.12) |
|---|---|---|
| **Board Viewport** | CSS `calc(100vh - 230px)` dynamic constraint | `LayoutBuilder` + `AspectRatio(1.0)` bounded to `min(width - 32, height * 0.55)` |
| **Piece Graphics** | SVG path strings inside React JSX (`ChessPiece.tsx`) | Vector Staunton renderers via `CustomPainter` & SVG asset paths |
| **AI Computation** | Web Worker (`aiWorker.ts`) + cooperative fallback | Background **Dart Isolate** (`minimax_isolate.dart`) with `SendPort`/`ReceivePort` |
| **Move Rule Engine** | `chess.js` 1.4.0 (JavaScript FIDE validator) | Pure Dart FIDE validator (`chess` / embedded rule engine) |
| **Move Analysis** | Iterative centipawn evaluation in `coachAnalysis.ts` | Async batch evaluation in Isolate; generates `FullGameAnalysis` |
| **Evaluation Graph** | SVG polygon spline in `AnalysisView.tsx` | Flutter `CustomPainter` drawing smooth quadratic bezier curves |
| **Sound & Voice** | Web Audio API oscillator + SpeechSynthesis | Flutter sound player / tone synthesizer + `flutter_tts` / haptics |
| **Haptic Feedback** | `navigator.vibrate` | `HapticFeedback.lightImpact()`, `mediumImpact()`, `heavyImpact()`, `vibrate()` |
| **Local Storage** | `window.localStorage` JSON strings | `SharedPreferences` + encrypted local JSON store / SQLite / Hive |
| **Server Sync** | None (Standalone browser client) | Automated HTTP REST client syncing to user's local server |
| **Practice Habit** | Passive web visitation | Android AlarmManager / `flutter_local_notifications` daily reminders |

---

## 3. Detailed Feature Specifications

### 3.1 Game Engine & AI Opponents (FR-1)
- **Engine Architecture**:
  - Pure Dart Minimax algorithm with Alpha-Beta pruning cutoffs.
  - Quiescence search with Delta Pruning (margin of 925 centipawns) on captures and promotions to prevent the horizon effect.
  - 2 Killer Moves per ply (indexed up to 64 plies), with +8000 and +7000 move-ordering bonuses.
  - Most Valuable Victim – Least Valuable Attacker (MVV-LVA) move ordering for captures.
  - Transposition Table caching up to 60,000 position states indexed by FEN strings.
  - Iterative Deepening with strict millisecond deadline budgets.
  - Dedicated Dart Isolate execution: The main UI thread communicates via message passing (`SearchRequest` -> `SearchResponse`) and remains 100% unblocked.
- **10 Calibrated Elo Difficulty Tiers**:
  1. *Novice (600 Elo)*: Depth 1, 35% blunder probability, 150ms move budget.
  2. *Beginner (800 Elo)*: Depth 2, 22% blunder probability, 200ms move budget.
  3. *Casual (1000 Elo)*: Depth 2, 12% blunder probability, 250ms move budget.
  4. *Club Novice (1200 Elo)*: Depth 3, 6% blunder probability, 300ms move budget.
  5. *Intermediate (1400 Elo)*: Depth 3, 2% blunder probability, 350ms move budget.
  6. *Advanced (1600 Elo)*: Depth 3, 0% blunder probability, 400ms move budget.
  7. *Club Player (1800 Elo)*: Depth 4, 0% blunder probability, 450ms move budget.
  8. *Expert (2000 Elo)*: Depth 4, 0% blunder probability, 500ms move budget.
  9. *Master (2200 Elo)*: Depth 4, 0% blunder probability, 600ms move budget.
  10. *Grandmaster (2500 Elo)*: Depth 5, 0% blunder probability, 700ms move budget.
- **4 Dynamic Personalities**:
  - *Harmonic Engine*: Balanced tournament theory (Attack: 1.0, Center: 1.0, Tactics: 1.0).
  - *The Valkyrie*: Relentless kingside attacker (Attack: 1.8, Center: 0.9, Tactics: 1.5).
  - *The Architect*: Positional fortress builder (Attack: 0.7, Center: 1.6, Tactics: 0.8).
  - *The Magician*: Trickster combinationalist (Attack: 1.3, Center: 1.0, Tactics: 1.9).

### 3.2 Mobile Chessboard & Ergonomics (FR-2)
- **Dual Gesture Input**:
  - *Tap-to-Move*: Tap piece to display glowing destination dots on legal squares; tap destination square to move.
  - *Drag-and-Drop*: Touch, drag, and release piece onto target square with smooth gesture tracking.
- **Visual Board Indicators**:
  - Last-move highlighted squares with subtle highlight color.
  - Selected piece square highlight.
  - Red pulsing glow on King square when in check or checkmate.
  - Auto-pawn promotion dialog modal (Queen, Rook, Bishop, Knight).
  - Guide arrows (green for best moves, red for blunders, blue for repertoire paths).
- **Themes & Customization**:
  - 5 Board Themes: Emerald Classic, Slate Modern, Walnut Wood, Sapphire Neon, Carbon Dark.
  - 5 Piece Themes: Staunton Tournament, Neo Modern, Woodcraft, Alpha, Minimalist.
  - Board flip toggle (`w` / `b` perspective).

### 3.3 Coach Game Review & CAPS Accuracy (FR-3)
- **Full Game Analysis Algorithm**:
  - Analyzes every ply of a completed game or imported PGN.
  - Compares played moves against minimax best move evaluation.
  - Computes Centipawn Loss ($cpLoss = \max(0, bestEval - playedEval)$).
  - Calculates CAPS Accuracy:
    $$\text{Accuracy} = \operatorname{clamp}\left(15, 100, \operatorname{round}\left(100 \times e^{-0.0035 \times \text{avgLoss}}\right)\right)$$
  - Calculates Estimated Performance Elo:
    $$\text{Performance} = \operatorname{clamp}\left(600, 2850, \operatorname{round}\left(500 + \left(\frac{\text{Accuracy}}{100}\right)^{2.2} \times 2200 + \frac{\min(100, 2 \times \text{moves})}{4}\right)\right)$$
- **10 Move Classifications**:
  1. Brilliant (💎): Sacrifices material while maintaining large winning advantage ($cpLoss = 0$).
  2. Great (⭐): Finds the sole sharp winning move.
  3. Best (✅): Matches top engine recommendation ($cpLoss < 12$).
  4. Excellent: High quality move ($cpLoss < 35$).
  5. Good: Solid natural move ($cpLoss < 75$).
  6. Inaccuracy (⚠️): Suboptimal choice ($75 \le cpLoss < 150$).
  7. Mistake: Significant concession ($150 \le cpLoss < 300$).
  8. Blunder (❌): Game-altering mistake ($cpLoss \ge 300$).
  9. Missed Win: Dropped a decisive winning advantage ($bestEval > +3.5 \to playedEval < +0.8$).
  10. Book (📚): Opening theory move matching master repertoire.
- **Interactive Review Deck**:
  - Stepping controls: First Ply, Previous Ply, Play/Pause with 1x/2x/3x speed, Next Ply, Last Ply.
  - Evaluation Swing Spline: Custom bezier area chart rendering centipawn advantage curve.
  - Coach Feedback: Tactical explanations ("Optimal pawn stake in the center with d4", "Missed winning fork on f7").
  - "Retry Move" Mode: Automatically rewinds to user mistakes and challenges the player to find the best move.
  - "Try the Line": Previews 3-ply refutation sequences.
  - "Sandbox Mode": Free exploration of alternative moves with live engine score evaluation.

### 3.4 Auxiliary Training Suite (FR-4)
1. **Tactical Puzzles & Puzzle Rush**:
   - 15 curated tactical puzzles across 9 themes: Fork, Pin, Skewer, Discovered Attack, Smothered Mate, Greek Gift, Back Rank, Deflection, Endgame Tactic.
   - Modes: Practice (with hints and coach explanations), 3-Minute Rush, 5-Minute Rush, 3-Strike Survival.
   - Puzzle rating tracking and rush high-score persistence.
2. **Master Endgame Drills**:
   - 6 fundamental endgame setups (Lucena Position Bridge, Philidor 3rd Rank Barrier, King & Pawn Direct Opposition, Queen vs Pawn on 7th, Rook vs Pawn, Trebuchet Zugzwang).
   - Played against active Minimax AI defense.
3. **Master Opening Explorer**:
   - 15 master openings (Sicilian Najdorf, Sicilian Open, Ruy Lopez, Italian Game, French Defense, Caro-Kann, Queen's Gambit Declined, King's Indian Defense, English Opening, Nimzo-Indian, etc.).
   - Interactive step-by-step move navigation, visual arrows, and "Practice vs AI" launch button.
4. **Board & FEN Editor**:
   - Visual piece palette (drag pieces onto board or clear board).
   - FEN string parser and validator.
   - Launch custom setups into "Play vs AI" or "Analyze in Coach".
5. **Coordinate Speed Trainer**:
   - 30-second rapid square-finding test (e.g., "Tap e4").
   - Instant feedback, accuracy calculation, and board orientation flip.

### 3.5 Daily Practice Notifications & Habit Engine (FR-5)
- **Scheduled Notifications**:
  - **09:00 AM Daily Tactical Puzzle**: "♟️ Daily Tactic Ready: Spot today's winning motif and sharpen your calculation!"
  - **08:00 PM Daily Rated Practice**: "🔥 Streak Alert: Play today's match to maintain your active win streak!"
  - **Blunder Remediation Alert (24h post-game)**: "🧠 Coach Alert: You had a critical blunder yesterday on move 16. Rewind and fix it now!"
  - **Inactivity Warning**: Triggers after 48 hours without play.
- **Deep-Linking**: Tapping notifications launches directly to the relevant view (Puzzle, Blunder Retry, or Play).

### 3.6 Local Server Cross-Platform Data Synchronization (FR-6)
- **Local Storage**: Zero-dependency local persistence via SharedPreferences / SQLite storing games, stats, and settings.
- **Local Server Sync Service**:
  - Configurable server address in Settings (default `http://10.0.2.2:8080` for Android emulator, or LAN IP `http://192.168.x.x:8080`).
  - Automatic background sync when connected to Wi-Fi.
  - Endpoints:
    - `GET /api/health`: Server connection status.
    - `POST /api/sync/games`: Transmit local games with SHA-256 UUIDs.
    - `GET /api/sync/games`: Download games recorded on web or other clients.
    - `POST /api/sync/stats`: Sync ratings and puzzle rush scores.
    - `GET /api/sync/stats`: Pull unified statistics.
    - `POST /api/sync/settings`: Sync board and piece themes.

---

## 4. UI/UX Specifications & Mobile Design System

- **Color Tokens**:
  - Dark Surface 900: `#09090b`
  - Dark Surface 800: `#18181b`
  - Dark Surface 700: `#27272a`
  - Accent Amber: `#f59e0b`
  - Accent Emerald: `#10b981`
  - Accent Blue: `#3b82f6`
  - Accent Rose: `#f43f5e`
- **Typography**: Clean modern sans-serif typography, large legible coordinate labels, high-contrast clock displays.
- **Layout Structure**:
  - Bottom Navigation Bar: Play, Analysis, Puzzles, Endgames, Openings, Tools (Editor, Drills, History, Profile).
  - Zero Horizontal Scrolling: Board and controls fit neatly within phone viewport without clipping.

---

## 5. Verification & Acceptance Criteria

1. **AI Performance**: Dart Isolate minimax completes search within time budgets (150ms–700ms) with zero UI jank.
2. **Feature Parity**: All 23 features from the web inventory are fully operational in the Flutter Android app.
3. **Data Integrity**: Games played offline persist safely and sync to the local server when reachable.
4. **Push Notifications**: Daily alerts schedule properly in Android system alarm registry.
5. **Code Quality**: Zero analysis errors (`flutter analyze`), clean decoupled architecture, and zero placeholders.
