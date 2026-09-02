import { BoardCoordinate, PlayerColor } from '../types/game';

// 52 Perimeter Track cells in clockwise order starting from Red Start (13, 6)
export const TRACK_COORDINATES: Array<[number, number]> = [
  [13, 6], // 0: Red Start (Safe)
  [12, 6], // 1
  [11, 6], // 2
  [10, 6], // 3
  [9, 6],  // 4
  [8, 5],  // 5
  [8, 4],  // 6
  [8, 3],  // 7
  [8, 2],  // 8: Green Star (Safe)
  [8, 1],  // 9
  [8, 0],  // 10
  [7, 0],  // 11
  [6, 0],  // 12
  [6, 1],  // 13: Green Start (Safe)
  [6, 2],  // 14
  [6, 3],  // 15
  [6, 4],  // 16
  [6, 5],  // 17
  [5, 6],  // 18
  [4, 6],  // 19
  [3, 6],  // 20
  [2, 6],  // 21: Yellow Star (Safe)
  [1, 6],  // 22
  [0, 6],  // 23
  [0, 7],  // 24
  [0, 8],  // 25
  [1, 8],  // 26: Yellow Start (Safe)
  [2, 8],  // 27
  [3, 8],  // 28
  [4, 8],  // 29
  [5, 8],  // 30
  [6, 9],  // 31
  [6, 10], // 32
  [6, 11], // 33
  [6, 12], // 34: Blue Star (Safe)
  [6, 13], // 35
  [6, 14], // 36
  [7, 14], // 37
  [8, 14], // 38
  [8, 13], // 39: Blue Start (Safe)
  [8, 12], // 40
  [8, 11], // 41
  [8, 10], // 42
  [8, 9],  // 43
  [9, 8],  // 44
  [10, 8], // 45
  [11, 8], // 46
  [12, 8], // 47: Red Star (Safe)
  [13, 8], // 48
  [14, 8], // 49
  [14, 7], // 50
  [14, 6]  // 51
];

// Color start indices on the 52-cell track
export const COLOR_START_INDICES: Record<PlayerColor, number> = {
  RED: 0,
  GREEN: 13,
  YELLOW: 26,
  BLUE: 39
};

// 8 Safe cells on the 52 track (indices)
export const SAFE_TRACK_INDICES = new Set<number>([0, 8, 13, 21, 26, 34, 39, 47]);
export const STAR_TRACK_INDICES = new Set<number>([8, 21, 34, 47]);
export const START_TRACK_INDICES = new Set<number>([0, 13, 26, 39]);

// 5 Home lane cells for each player color (steps 51 to 55)
export const HOME_LANE_COORDINATES: Record<PlayerColor, Array<[number, number]>> = {
  RED: [
    [13, 7],
    [12, 7],
    [11, 7],
    [10, 7],
    [9, 7]
  ],
  GREEN: [
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5]
  ],
  YELLOW: [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7]
  ],
  BLUE: [
    [7, 13],
    [7, 12],
    [7, 11],
    [7, 10],
    [7, 9]
  ]
};

// Yard coordinates for 4 tokens of each color [token_0, token_1, token_2, token_3]
export const YARD_COORDINATES: Record<PlayerColor, Array<[number, number]>> = {
  RED: [
    [10.5, 1.5],
    [10.5, 3.5],
    [12.5, 1.5],
    [12.5, 3.5]
  ],
  GREEN: [
    [1.5, 1.5],
    [1.5, 3.5],
    [3.5, 1.5],
    [3.5, 3.5]
  ],
  YELLOW: [
    [1.5, 10.5],
    [1.5, 12.5],
    [3.5, 10.5],
    [3.5, 12.5]
  ],
  BLUE: [
    [10.5, 10.5],
    [10.5, 12.5],
    [12.5, 10.5],
    [12.5, 12.5]
  ]
};

// Final HOME Center positions (step 56) in percentages (x%, y%)
export const HOME_CENTER_PERCENTAGES: Record<PlayerColor, { x: number; y: number }> = {
  RED: { x: 50, y: 55 },
  GREEN: { x: 45, y: 50 },
  YELLOW: { x: 50, y: 45 },
  BLUE: { x: 55, y: 50 }
};

/**
 * Converts a grid (row, col) on a 15x15 board to exact percentage coordinates (0 to 100).
 * Row 0..14, Col 0..14 where each cell is (100 / 15)% = 6.6667%
 */
export function gridToPercent(row: number, col: number): { x: number; y: number } {
  const cellSize = 100 / 15;
  return {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2
  };
}

/**
 * Maps a player token's step (-1 to 56) and token index (0..3) to physical/SVG coordinates.
 */
export function getTokenCoordinate(
  color: PlayerColor,
  step: number,
  tokenIndex: number
): BoardCoordinate {
  // 1. In Yard
  if (step < 0) {
    const [row, col] = YARD_COORDINATES[color][tokenIndex] || YARD_COORDINATES[color][0];
    const { x, y } = gridToPercent(row, col);
    return {
      row: Math.floor(row),
      col: Math.floor(col),
      xPercent: x,
      yPercent: y,
      isSafe: true,
      isStar: false,
      isStart: false,
      color
    };
  }

  // 2. Center Home
  if (step >= 56) {
    const center = HOME_CENTER_PERCENTAGES[color];
    return {
      row: 7,
      col: 7,
      xPercent: center.x,
      yPercent: center.y,
      isSafe: true,
      isStar: false,
      isStart: false,
      color
    };
  }

  // 3. Home Lane (steps 51 to 55)
  if (step >= 51 && step <= 55) {
    const laneIndex = step - 51;
    const [row, col] = HOME_LANE_COORDINATES[color][laneIndex];
    const { x, y } = gridToPercent(row, col);
    return {
      row,
      col,
      xPercent: x,
      yPercent: y,
      isSafe: true,
      isStar: false,
      isStart: false,
      color
    };
  }

  // 4. Main 52-cell track (steps 0 to 50)
  const trackIndex = (COLOR_START_INDICES[color] + step) % 52;
  const [row, col] = TRACK_COORDINATES[trackIndex];
  const { x, y } = gridToPercent(row, col);
  const isStart = START_TRACK_INDICES.has(trackIndex);
  const isStar = STAR_TRACK_INDICES.has(trackIndex);
  const isSafe = SAFE_TRACK_INDICES.has(trackIndex);

  return {
    row,
    col,
    xPercent: x,
    yPercent: y,
    isSafe,
    isStar,
    isStart,
    color: isStart ? color : undefined
  };
}

/**
 * Returns the absolute global track index for a token at a given step on the 52-cell track.
 * Returns null if token is in Yard, Home Lane, or Home Center.
 */
export function getGlobalTrackIndex(color: PlayerColor, step: number): number | null {
  if (step < 0 || step > 50) return null;
  return (COLOR_START_INDICES[color] + step) % 52;
}

/**
 * Checks whether a given position (color + step) is safe from opponent captures.
 */
export function isPositionSafe(color: PlayerColor, step: number): boolean {
  if (step < 0 || step >= 51) return true; // Yard, Home Lane, and Home are always safe
  const trackIndex = getGlobalTrackIndex(color, step);
  if (trackIndex === null) return true;
  return SAFE_TRACK_INDICES.has(trackIndex);
}
