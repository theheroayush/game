# E2E Test Infra: Apex Chess

## Test Philosophy
- Opaque-box, requirement-driven derived from `ORIGINAL_REQUEST.md`.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.

## Feature Inventory & Test Coverage
| # | Feature | Source (Requirement) | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Pairwise) | Tier 4 (Workload) |
|---|---------|----------------------|:----------------:|:-----------------:|:-----------------:|:-----------------:|
| 1 | R1 Live Game & Analysis Sync | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | R1 Move Classification & Spline | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | R1 Replay Controls & Sandbox | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 4 | R2 Minimax Alpha-Beta Search | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 5 | R2 Quiescence & Delta Pruning | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 6 | R2 10 Elo Tiers & Personalities | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 7 | R3 Viewport Constraints & Zero Overflow | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 8 | R3 Staunton SVGs & 5 Board Themes | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 9 | R4 Tactical Puzzles & Rush | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 10 | R4 Master Endgame Drills | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 11 | R4 Opening Explorer Repertoire | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 12 | R4 Board / FEN Editor | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 13 | R4 Coordinate Speed Trainer | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: `npx tsx src/verify_chess.ts` and automated E2E test harness.
- **Compilation Check**: `npm run build` (`tsc -b && vite build`) executes cleanly with exit code 0.
- **Linter Check**: `npm run lint` (`oxlint`).

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: >= 5 test cases per feature (Happy-path verification).
- **Tier 2 (Boundary & Corner Cases)**: >= 5 test cases per feature (Empty inputs, extreme values, checkmate/stalemate, edge blunders, timeout limits).
- **Tier 3 (Cross-Feature Combinations)**: Pairwise coverage across major interacting subsystems (Live game -> Analysis, PGN Import -> Replay, Custom FEN -> AI Match, Opening Explorer -> Play vs AI).
- **Tier 4 (Real-World Application Scenarios)**: Realistic full games, grandmaster opening lines, deep endgame defense simulations, blitz puzzle rush streaks.
