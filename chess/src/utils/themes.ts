import { BoardTheme, BoardThemeId, PieceThemeId } from '../types/chess';

export const BOARD_THEMES: Record<BoardThemeId, BoardTheme> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Classic',
    lightSquare: '#ebecd0',
    darkSquare: '#779556',
    selectedSquare: 'rgba(247, 247, 105, 0.65)',
    lastMoveSquare: 'rgba(247, 247, 105, 0.42)',
    checkSquare: 'rgba(239, 68, 68, 0.8)',
    previewColor: '#779556',
  },
  slate: {
    id: 'slate',
    name: 'Tournament Slate',
    lightSquare: '#dee3ea',
    darkSquare: '#72889c',
    selectedSquare: 'rgba(59, 130, 246, 0.6)',
    lastMoveSquare: 'rgba(245, 158, 11, 0.38)',
    checkSquare: 'rgba(239, 68, 68, 0.8)',
    previewColor: '#72889c',
  },
  wood: {
    id: 'wood',
    name: 'Classic Walnut',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    selectedSquare: 'rgba(100, 200, 100, 0.55)',
    lastMoveSquare: 'rgba(202, 138, 4, 0.4)',
    checkSquare: 'rgba(220, 38, 38, 0.8)',
    previewColor: '#b58863',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Ocean Sapphire',
    lightSquare: '#dbe4eb',
    darkSquare: '#4a7596',
    selectedSquare: 'rgba(99, 102, 241, 0.6)',
    lastMoveSquare: 'rgba(250, 204, 21, 0.4)',
    checkSquare: 'rgba(239, 68, 68, 0.8)',
    previewColor: '#4a7596',
  },
  onyx: {
    id: 'onyx',
    name: 'Obsidian Carbon',
    lightSquare: '#334155',
    darkSquare: '#1e293b',
    selectedSquare: 'rgba(147, 197, 253, 0.5)',
    lastMoveSquare: 'rgba(56, 189, 248, 0.35)',
    checkSquare: 'rgba(244, 63, 94, 0.8)',
    previewColor: '#1e293b',
  },
};

export interface PieceThemeMeta {
  id: PieceThemeId;
  name: string;
  description: string;
}

export const PIECE_THEMES: PieceThemeMeta[] = [
  { id: 'staunton', name: 'Tournament Staunton', description: 'Official FIDE & international tournament standard vectors' },
  { id: 'neo', name: 'Neo Digital', description: 'Bold contemporary championship contrast' },
  { id: 'woodcraft', name: 'Artisan Woodcraft', description: 'Handcrafted walnut & birch tones' },
  { id: 'alpha', name: 'Cyber Luminescent', description: 'Sharp cyan & midnight silhouettes' },
  { id: 'minimal', name: 'Modern Minimalist', description: 'Clean geometric vector outline' },
];
