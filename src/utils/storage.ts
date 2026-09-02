import { GameRecord, UserStats, AppSettings } from '../types/chess';

const STORAGE_KEYS = {
  SETTINGS: 'chess_apex_settings',
  STATS: 'chess_apex_stats',
  GAMES: 'chess_apex_games',
};

export const DEFAULT_SETTINGS: AppSettings = {
  boardTheme: 'emerald',
  pieceTheme: 'staunton',
  soundEnabled: true,
  soundVolume: 0.7,
  voiceCoachEnabled: false,
  hapticsEnabled: true,
  showCoordinates: true,
  showLegalMoves: true,
  showLastMove: true,
  showThreats: true,
  autoQueen: true,
  reducedMotion: false,
};

export const DEFAULT_STATS: UserStats = {
  rating: 1200,
  puzzleRating: 1200,
  puzzlesSolved: 0,
  puzzleRushBest: 0,
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  winStreak: 0,
  bestWinStreak: 0,
  ratingHistory: [{ date: new Date().toISOString().split('T')[0], rating: 1200 }],
  favoriteOpening: 'Sicilian Defense',
};

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Storage safety
  }
}

export function loadStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch {
    // Storage safety
  }
}

export function loadGames(): GameRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GAMES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveGame(game: GameRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const games = loadGames();
    const updated = [game, ...games.filter(g => g.id !== game.id)].slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(updated));

    // Update player stats
    const stats = loadStats();
    stats.gamesPlayed += 1;

    const isWhite = game.playerColor === 'w';
    const playerWon = (game.result === '1-0' && isWhite) || (game.result === '0-1' && !isWhite);
    const isDraw = game.result === '1/2-1/2';

    if (playerWon) {
      stats.wins += 1;
      stats.winStreak += 1;
      if (stats.winStreak > stats.bestWinStreak) {
        stats.bestWinStreak = stats.winStreak;
      }
      const ratingGain = Math.max(8, Math.round(32 / (1 + Math.pow(10, (stats.rating - game.blackElo) / 400))));
      stats.rating += ratingGain;
    } else if (isDraw) {
      stats.draws += 1;
      stats.winStreak = 0;
      stats.rating += 2;
    } else {
      stats.losses += 1;
      stats.winStreak = 0;
      const ratingLoss = Math.max(6, Math.round(32 / (1 + Math.pow(10, (game.blackElo - stats.rating) / 400))));
      stats.rating = Math.max(400, stats.rating - ratingLoss);
    }

    if (game.openingName) {
      stats.favoriteOpening = game.openingName;
    }

    stats.ratingHistory.push({
      date: new Date().toISOString().split('T')[0],
      rating: stats.rating,
    });
    if (stats.ratingHistory.length > 30) {
      stats.ratingHistory = stats.ratingHistory.slice(-30);
    }

    saveStats(stats);
  } catch {
    // Storage safety
  }
}

export function updateGameAnalysis(gameId: string, analysis: GameRecord['analysis']): void {
  const games = loadGames();
  const idx = games.findIndex(g => g.id === gameId);
  if (idx !== -1) {
    games[idx].analysis = analysis;
    if (analysis) {
      const isWhite = games[idx].playerColor === 'w';
      games[idx].accuracyPlayer = isWhite ? analysis.accuracyWhite : analysis.accuracyBlack;
      games[idx].accuracyAI = isWhite ? analysis.accuracyBlack : analysis.accuracyWhite;
    }
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  }
}
