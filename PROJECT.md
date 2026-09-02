# Project: Apex Chess

## Architecture
Apex Chess is a Tier-1 web chess platform built in React 19, TypeScript 6.0, TailwindCSS, and `chess.js` 1.4.0.
- **Frontend / Presentation**: React 19 SPA with TailwindCSS, responsive viewport sizing (`calc(100vh - 230px)`), Staunton SVG piece renderer (`ChessPiece.tsx`), SVG vector arrows (`BoardArrows.tsx`), and theme system (`themes.ts`).
- **Game Engine & Rules**: `chess.js` 1.4.0 enforcing full FIDE rules (legal moves, checkmate, stalemate, castling, en passant, promotion, 50-move, threefold repetition).
- **AI Opponent Engine**: Minimax with Alpha-Beta pruning, MVV-LVA move ordering, 2 Killer Moves per ply (up to 64 plies), Delta-pruned Quiescence search, 60k-entry Transposition Table, Iterative Deepening with deadline budget, and Web Worker thread execution with cooperative main-thread fallback (`aiWorker.ts`, `engineService.ts`, `evaluation.ts`).
- **Coach Analysis & Replay Synchronization**: Immediate game synchronization (`GameRecord`), centipawn loss calculation, 10-category move classification, CAPS accuracy, Performance Elo estimation, dynamic SVG evaluation swing spline, interactive stepping deck, "Try the Line", "Retry Move" blunder puzzles, and free "Sandbox Mode".
- **Auxiliary Training Suite**:
  - Tactical Puzzles (15 puzzles, 9 motifs, Practice, 3-min Rush, 5-min Rush, Survival).
  - Master Endgame Drills (6 endgame studies against live Minimax engine defense).
  - Opening Explorer (15 master repertoires with guide arrows and "Practice vs AI").
  - Board / FEN Editor (piece palette, FEN validator/loader, Play & Analyze triggers).
  - Coordinate Speed Trainer (30-second rapid square-finding drill).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Real-Time Game Replay Sync | Immediate synchronization of active games & PGN imports to Coach Analysis without sample fallbacks | M1 | Survey |
| 2 | Move Classification Engine | Centipawn loss evaluation and 10 move categories (Brilliant to Blunder) | M1 | Survey |
| 3 | Centipawn Evaluation Swing Spline | SVG area spline rendering evaluation graph over game plies with baseline 0.0cp | M1 | Survey |
| 4 | CAPS Accuracy & Performance Elo | Harmonic mean accuracy (0-100%) and Performance rating formula | M1 | Survey |
| 5 | Interactive Step & Replay Deck | Full replay controls (First, Prev, Play/Pause, Next, Last, Speeds 1x/2x/3x, Keyboard shortcuts) | M1 | Survey |
| 6 | Blunder Retry & Sandbox Modes | "Retry Move" puzzle rewind mode and free-form "Sandbox Mode" with live minimax evaluation | M1 | Survey |
| 7 | Alpha-Beta Minimax Search | Depth-limited search with alpha-beta cutoffs, MVV-LVA move ordering | M2 | Survey |
| 8 | Quiescence Search with Delta Pruning | Horizon effect elimination via capture/promotion tactical tree search with delta pruning (925cp) | M2 | Survey |
| 9 | Killer Moves Heuristic | 2 quiet beta-cutoff killer moves per ply with +8000/+7000 move ordering bonus | M2 | Survey |
| 10 | Transposition Table Caching | Caching evaluated positions by FEN string up to 60,000 states | M2 | Survey |
| 11 | 10 Calibrated Elo Tiers | 10 difficulty tiers (600 to 2500 Elo) with scaled depth, blunder probability, and move time | M2 | Survey |
| 12 | 4 Dynamic Personalities | Harmonic (Balanced), The Valkyrie (Aggressive), The Architect (Positional), The Magician (Tactical) | M2 | Survey |
| 13 | Web Worker Execution & Fallback | Dedicated worker thread for AI search with race-timeout fallback to cooperative main thread | M2 | Survey |
| 14 | Opening Book Integration | Instant opening book moves for first 12 plies matching master database | M2 | Survey |
| 15 | Responsive Viewport Constraint | `w-[min(100vw-24px,min(calc(100vh-230px),480px))]` zero-overflow layout | M3 | Survey |
| 16 | 5 Board Themes & Staunton SVGs | Emerald, Slate, Walnut, Sapphire, Carbon themes + 5 piece styles (Staunton, Neo, Woodcraft, Alpha, Minimal) | M3 | Survey |
| 17 | High-Contrast Accessible Modals | Game Over (with confetti), Settings, Preferences, PGN Import, and Promotion modals | M3 | Survey |
| 18 | Tactical Puzzles & Puzzle Rush | 15 puzzles across 9 themes with Practice, 3-min, 5-min Rush, and 3-strike Survival modes | M4 | Survey |
| 19 | Master Endgame Drills | 6 theoretical endgames played against live Minimax engine defense | M4 | Survey |
| 20 | Opening Explorer Repertoire | 15 master opening repertoires with step navigation, guide arrows, and "Practice vs AI" | M4 | Survey |
| 21 | Board / FEN Editor | Interactive piece palette, FEN export/import, play vs AI, analyze in coach | M4 | Survey |
| 22 | Coordinate Speed Training | 30-second rapid coordinate recognition drill with accuracy and orientation flip | M4 | Survey |
| 23 | E2E Verification & Hardening | 100% E2E test pass across Tiers 1-4 and Tier 5 adversarial stress testing | M5 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | R1 Live Game & Analysis Sync | Move classification, centipawn loss, CAPS accuracy, SVG swing spline, replay deck, retry & sandbox | none | DONE |
| M2 | R2 AI Calibration & Personalities | Minimax alpha-beta, quiescence with delta pruning, killer moves, transposition table, 10 Elo tiers, 4 personalities, worker fallback | none | DONE |
| M3 | R3 Responsive UI & Tournament Themes | Viewport constraints `calc(100vh-230px)`, Staunton SVGs, 5 board themes, modal styling & lint polishing | none | DONE |
| M4 | R4 Auxiliary Training Suite | Puzzles (Practice/Rush/Survival), Endgame Drills vs AI, Opening Explorer, FEN Editor, Coordinate Trainer | M2 | DONE |
| M5 | Final E2E Suite & Adversarial Hardening | Phase 1 (Tiers 1-4 E2E Test Suite Pass) + Phase 2 (Tier 5 Adversarial Coverage Hardening) | M1, M2, M3, M4 | DONE |

## Verification Sign-Off
- **TypeScript Build**: `tsc -b && vite build` (0 errors, 827ms).
- **Linter**: `oxlint` (0 errors, 0 warnings across 40+ files).
- **Test Suite Results**:
  - `src/verify_chess.ts`: 20/20 PASS (100%)
  - `src/verify_challenger3.ts`: 100% PASS
  - `src/stress_test_challenger2.ts`: 183/183 PASS (100%)
  - `src/engine/ai_stress_test.ts`: 23/23 PASS (100%)
  - **Total Automated Checks**: **230 / 230 PASSED (0 FAILURES)**.
- **Reviewer Verdicts**:
  - Reviewer 1 (Engine & Analysis): APPROVE
  - Reviewer 2 (UI & Training Suite): APPROVE
  - Reviewer 3 (Final Comprehensive Review): APPROVE
- **Challenger Verdicts**:
  - Challenger 1 (Engine Stress): APPROVE
  - Challenger 3 (Final Stress & Remediation): APPROVE
- **Forensic Auditor Verdicts**:
  - Auditor 1 (Static & Runtime Forensics): CLEAN
  - Auditor 2 (Final Forensic Integrity Audit): CLEAN
