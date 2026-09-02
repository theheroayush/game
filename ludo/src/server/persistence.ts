import { UserProfile, MatchHistoryItem, LeaderboardEntry } from '../types/stats';
import { PlayerColor } from '../types/game';

export class PersistenceManager {
  private users = new Map<string, UserProfile>();
  private matchHistory = new Map<string, MatchHistoryItem[]>(); // userId -> items

  public getUser(id: string): UserProfile | undefined {
    return this.users.get(id);
  }

  public getOrCreateGuestUser(guestId: string, name?: string, avatar?: string): UserProfile {
    let user = this.users.get(guestId);
    if (!user) {
      user = {
        id: guestId,
        name: name || `Player_${guestId.substring(0, 5)}`,
        avatar: avatar || 'avatar_1',
        isGuest: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          winRate: 0,
          totalCaptures: 0,
          totalTokensHome: 0,
          totalSixesRolled: 0,
          currentStreak: 0,
          bestStreak: 0,
          favoriteColor: 'RED',
          diceRollDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
          averageGameDurationSeconds: 0
        }
      };
      this.users.set(guestId, user);
    }
    return user;
  }

  public updateUserProfile(
    userId: string,
    updates: Partial<{ name: string; avatar: string; favoriteColor: PlayerColor }>
  ): UserProfile | undefined {
    const user = this.users.get(userId);
    if (!user) return undefined;

    if (updates.name) user.name = updates.name;
    if (updates.avatar) user.avatar = updates.avatar;
    if (updates.favoriteColor) user.stats.favoriteColor = updates.favoriteColor;
    user.updatedAt = Date.now();

    return user;
  }

  public recordMatchCompletion(
    userId: string,
    match: MatchHistoryItem
  ): UserProfile | undefined {
    const user = this.getOrCreateGuestUser(userId);
    const history = this.matchHistory.get(userId) || [];
    history.unshift(match);
    this.matchHistory.set(userId, history.slice(0, 50)); // Keep last 50 matches

    const isWin = match.rank === 1;
    const stats = user.stats;

    stats.gamesPlayed += 1;
    if (isWin) {
      stats.gamesWon += 1;
      stats.currentStreak += 1;
      if (stats.currentStreak > stats.bestStreak) {
        stats.bestStreak = stats.currentStreak;
      }
    } else {
      stats.gamesLost += 1;
      stats.currentStreak = 0;
    }

    stats.winRate = Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
    stats.totalCaptures += match.captures;
    stats.totalTokensHome += match.tokensHome;

    const prevTotalSec = (stats.gamesPlayed - 1) * stats.averageGameDurationSeconds;
    stats.averageGameDurationSeconds = Math.round(
      (prevTotalSec + match.durationSeconds) / stats.gamesPlayed
    );

    user.updatedAt = Date.now();
    return user;
  }

  public getMatchHistory(userId: string): MatchHistoryItem[] {
    return this.matchHistory.get(userId) || [];
  }

  public getLeaderboard(limit = 20): LeaderboardEntry[] {
    const allUsers = Array.from(this.users.values()).filter((u) => u.stats.gamesPlayed > 0);

    // Sort primarily by wins, then by win rate, then captures
    allUsers.sort((a, b) => {
      if (b.stats.gamesWon !== a.stats.gamesWon) {
        return b.stats.gamesWon - a.stats.gamesWon;
      }
      if (b.stats.winRate !== a.stats.winRate) {
        return b.stats.winRate - a.stats.winRate;
      }
      return b.stats.totalCaptures - a.stats.totalCaptures;
    });

    return allUsers.slice(0, limit).map((u, idx) => ({
      rank: idx + 1,
      userId: u.id,
      name: u.name,
      avatar: u.avatar,
      gamesWon: u.stats.gamesWon,
      gamesPlayed: u.stats.gamesPlayed,
      winRate: u.stats.winRate,
      captures: u.stats.totalCaptures,
      streak: u.stats.currentStreak
    }));
  }
}
