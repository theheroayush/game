import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, MatchHistoryItem, LeaderboardEntry } from '../types/stats';
import { soundEngine } from '../audio/sound-effects';
import { PlayerColor } from '../types/game';

interface UserState {
  profile: UserProfile;
  matchHistory: MatchHistoryItem[];
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
  confirmMoves: boolean;
  autoSelectOnlyMove: boolean;

  setProfileName: (name: string) => void;
  setProfileAvatar: (avatar: string) => void;
  setFavoriteColor: (color: PlayerColor) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleReducedMotion: () => void;
  toggleConfirmMoves: () => void;
  toggleAutoSelectOnlyMove: () => void;
  recordMatch: (match: MatchHistoryItem) => void;
}

const DEFAULT_GUEST_ID = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: {
        id: DEFAULT_GUEST_ID,
        name: 'Player',
        avatar: 'avatar_1',
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
      },
      matchHistory: [],
      soundEnabled: true,
      musicEnabled: true,
      reducedMotion: false,
      confirmMoves: false,
      autoSelectOnlyMove: true,

      setProfileName: (name: string) => {
        set((state) => ({
          profile: {
            ...state.profile,
            name: name.trim().slice(0, 20) || 'Player',
            updatedAt: Date.now()
          }
        }));
      },

      setProfileAvatar: (avatar: string) => {
        set((state) => ({
          profile: { ...state.profile, avatar, updatedAt: Date.now() }
        }));
      },

      setFavoriteColor: (color: PlayerColor) => {
        set((state) => ({
          profile: {
            ...state.profile,
            stats: { ...state.profile.stats, favoriteColor: color },
            updatedAt: Date.now()
          }
        }));
      },

      toggleSound: () => {
        const next = !get().soundEnabled;
        soundEngine.setSoundEnabled(next);
        set({ soundEnabled: next });
      },

      toggleMusic: () => {
        const next = !get().musicEnabled;
        soundEngine.setMusicEnabled(next);
        set({ musicEnabled: next });
      },

      toggleReducedMotion: () => {
        set((state) => ({ reducedMotion: !state.reducedMotion }));
      },

      toggleConfirmMoves: () => {
        set((state) => ({ confirmMoves: !state.confirmMoves }));
      },

      toggleAutoSelectOnlyMove: () => {
        set((state) => ({ autoSelectOnlyMove: !state.autoSelectOnlyMove }));
      },

      recordMatch: (match: MatchHistoryItem) => {
        const state = get();
        const isWin = match.rank === 1;
        const stats = { ...state.profile.stats };

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

        const newHistory = [match, ...state.matchHistory.slice(0, 49)];

        set({
          profile: {
            ...state.profile,
            stats,
            updatedAt: Date.now()
          },
          matchHistory: newHistory
        });
      }
    }),
    {
      name: 'ludo_user_profile'
    }
  )
);
