import { GameMode, PlayerColor } from './game';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isGuest: boolean;
  createdAt: number;
  updatedAt: number;
  stats: UserStats;
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number; // percentage 0 to 100
  totalCaptures: number;
  totalTokensHome: number;
  totalSixesRolled: number;
  currentStreak: number;
  bestStreak: number;
  favoriteColor: PlayerColor;
  diceRollDistribution: Record<number, number>; // 1: count, 2: count, ..., 6: count
  averageGameDurationSeconds: number;
}

export interface MatchHistoryItem {
  id: string;
  gameId: string;
  roomCode: string;
  mode: GameMode;
  date: number;
  playerColor: PlayerColor;
  rank: number; // 1 = Won, 2 = 2nd, etc.
  totalPlayers: number;
  durationSeconds: number;
  captures: number;
  tokensHome: number;
  turnsTaken: number;
  opponentNames: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  gamesWon: number;
  gamesPlayed: number;
  winRate: number;
  captures: number;
  streak: number;
}
