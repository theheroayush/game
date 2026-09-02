import { Square, Color } from 'chess.js';

export type PlayerColor = 'w' | 'b';
export type SideSelection = 'w' | 'b' | 'random';

export type AIPersonalityId = 'balanced' | 'aggressive' | 'positional' | 'tactical';

export type NavigationTab =
  | 'play'
  | 'analysis'
  | 'puzzles'
  | 'endgames'
  | 'openings'
  | 'editor'
  | 'drills'
  | 'history'
  | 'profile';

export interface AIPersonality {
  id: AIPersonalityId;
  name: string;
  avatar: string;
  tagline: string;
  description: string;
  kingAttackWeight: number;
  centerControlWeight: number;
  tacticalWeight: number;
}

export interface DifficultyConfig {
  level: number;
  name: string;
  elo: number;
  depth: number;
  skillLevel: number; // 0 to 20
  blunderProbability: number; // 0 to 1
  moveTimeMs: number;
  description: string;
  avatarBg: string;
}

export interface TimeControlConfig {
  id: string;
  label: string;
  category: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'none';
  baseMinutes: number;
  incrementSeconds: number;
}

export type MoveClassification = 
  | 'brilliant'
  | 'great'
  | 'best'
  | 'excellent'
  | 'good'
  | 'inaccuracy'
  | 'mistake'
  | 'blunder'
  | 'missed_win'
  | 'book';

export interface MoveAnalysis {
  moveNumber: number;
  ply: number;
  san: string;
  from: Square;
  to: Square;
  color: Color;
  fenBefore: string;
  fenAfter: string;
  evalBefore: number; // Centipawns from White's perspective (+ = White advantage)
  evalAfter: number;
  mateIn?: number;
  bestMoveSan?: string;
  bestMoveFrom?: Square;
  bestMoveTo?: Square;
  bestMoveUci?: string;
  threatFrom?: Square;
  threatTo?: Square;
  classification: MoveClassification;
  centipawnLoss: number;
  coachExplanation?: string;
  tacticalTheme?: string;
  suggestedLine?: string[];
}

export interface FullGameAnalysis {
  accuracyWhite: number;
  accuracyBlack: number;
  performanceWhite: number;
  performanceBlack: number;
  gameNarrative: string;
  keyTakeaways: string[];
  whiteClassifications: Record<MoveClassification, number>;
  blackClassifications: Record<MoveClassification, number>;
  moves: MoveAnalysis[];
  criticalMoments: { ply: number; description: string; swing: number }[];
  openingEco: string;
  openingName: string;
}

export interface GameRecord {
  id: string;
  date: string;
  pgn: string;
  finalFen: string;
  result: '1-0' | '0-1' | '1/2-1/2' | '*';
  winner?: 'white' | 'black' | 'draw';
  reason: 'checkmate' | 'resignation' | 'timeout' | 'stalemate' | 'threefold' | 'insufficient' | '50move' | 'agreement';
  playerColor: PlayerColor;
  difficultyLevel: number;
  personality: AIPersonalityId;
  timeControl: string;
  whitePlayer: string;
  blackPlayer: string;
  whiteElo: number;
  blackElo: number;
  accuracyPlayer?: number;
  accuracyAI?: number;
  movesCount: number;
  openingEco?: string;
  openingName?: string;
  analysis?: FullGameAnalysis;
}

export interface UserStats {
  rating: number;
  puzzleRating: number;
  puzzlesSolved: number;
  puzzleRushBest: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  bestWinStreak: number;
  ratingHistory: { date: string; rating: number }[];
  favoriteOpening: string;
}

export type BoardThemeId = 'slate' | 'wood' | 'emerald' | 'sapphire' | 'onyx';
export type PieceThemeId = 'staunton' | 'neo' | 'woodcraft' | 'alpha' | 'minimal';

export interface BoardTheme {
  id: BoardThemeId;
  name: string;
  lightSquare: string;
  darkSquare: string;
  selectedSquare: string;
  lastMoveSquare: string;
  checkSquare: string;
  previewColor: string;
}

export interface AppSettings {
  boardTheme: BoardThemeId;
  pieceTheme: PieceThemeId;
  soundEnabled: boolean;
  soundVolume: number;
  voiceCoachEnabled: boolean;
  hapticsEnabled: boolean;
  showCoordinates: boolean;
  showLegalMoves: boolean;
  showLastMove: boolean;
  showThreats: boolean;
  autoQueen: boolean;
  reducedMotion: boolean;
}

export interface OpeningData {
  eco: string;
  name: string;
  moves: string[];
  fen: string;
  description: string;
  keyIdeas: string[];
  side: 'white' | 'black' | 'both';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
