# Ludo Game Rules & Coordinate Specification

## 1. Board Layout & Coordinate System

The board is structured as a **15x15 grid** (rows 0 to 14, columns 0 to 14).

### 1.1 Quad Origins & Colors
- **Red**: Bottom-Left (Yard: rows 9..14, cols 0..5). Start cell: `(row 13, col 6)`.
- **Green**: Top-Left (Yard: rows 0..5, cols 0..5). Start cell: `(row 6, col 1)`.
- **Yellow**: Top-Right (Yard: rows 0..5, cols 9..14). Start cell: `(row 1, col 8)`.
- **Blue**: Bottom-Right (Yard: rows 9..14, cols 9..14). Start cell: `(row 8, col 13)`.

### 1.2 Step Progress Model (0 to 56)
Each player's token traverses 57 logical positions:
- **-1 / YARD**: Inside player's home base yard.
- **0**: Starting cell on the main perimeter track (Safe cell).
- **1..50**: Traversal along the 52-cell main cyclic track.
- **51..55**: Player's private colored home lane (Safe from opponents).
- **56 / HOME**: Center victory home triangle.

### 1.3 Safe Cells (8 Total)
1. **Red Start**: `(row 13, col 6)` — Global Track Pos 0
2. **Red Star**: `(row 12, col 8)` — Global Track Pos 47
3. **Green Start**: `(row 6, col 1)` — Global Track Pos 13
4. **Green Star**: `(row 8, col 2)` — Global Track Pos 8
5. **Yellow Start**: `(row 1, col 8)` — Global Track Pos 26
6. **Yellow Star**: `(row 2, col 6)` — Global Track Pos 21
7. **Blue Start**: `(row 8, col 13)` — Global Track Pos 39
8. **Blue Star**: `(row 6, col 12)` — Global Track Pos 34

## 2. Standard & Configurable Rules

| Rule | Default | Configurable Options | Description |
|------|---------|----------------------|-------------|
| `requiresSixToEnter` | `true` | `true / false` | Token needs a 6 to enter track from yard. |
| `extraTurnOnSix` | `true` | `true / false` | Rolling a 6 awards an immediate bonus roll. |
| `maxConsecutiveSixes` | `3` | `0 (off), 3` | Rolling 3 consecutive sixes forfeits the turn. |
| `extraTurnOnCapture` | `true` | `true / false` | Capturing an opponent's token awards a bonus roll. |
| `exactFinish` | `true` | `true / false` | Token must roll the exact number of spaces to land on HOME (56). |
| `turnTimerSeconds` | `30` | `15, 30, 45, 60` | Authoritative countdown before auto-turn pass. |
| `stackingEnabled` | `true` | `true / false` | Multiple tokens of the same color can occupy the same cell. |

## 3. Captures & Safe Havens
- If an active token lands on a cell occupied by 1 or more opponent tokens **and** the cell is **NOT** a safe cell, the opponent token is captured and returned to its yard.
- Tokens on safe cells cannot be captured.
- Tokens in home lanes (steps 51..55) cannot be reached or captured by opponents.

## 4. Victory Condition
The first player to move all 4 tokens into the HOME zone (step 56) wins 1st place. Subsequent ranks (2nd, 3rd) are awarded as other players complete their tokens.
