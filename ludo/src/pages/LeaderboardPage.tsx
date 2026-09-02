import React, { useState } from 'react';
import { Trophy, Medal, Flame, Swords, Crown } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { LeaderboardEntry } from '../types/stats';

export const LeaderboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'GLOBAL' | 'WEEKLY' | 'MONTHLY'>('GLOBAL');
  const { profile } = useUserStore();

  // Curated sample high-rank benchmark entries merged with current user's profile
  const baseEntries: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: 'usr_grandmaster',
      name: 'Aarav_King',
      avatar: 'avatar_7',
      gamesWon: 142,
      gamesPlayed: 180,
      winRate: 79,
      captures: 412,
      streak: 9
    },
    {
      rank: 2,
      userId: 'usr_ludo_queen',
      name: 'Riya_Star',
      avatar: 'avatar_2',
      gamesWon: 118,
      gamesPlayed: 165,
      winRate: 72,
      captures: 340,
      streak: 6
    },
    {
      rank: 3,
      userId: 'usr_apex_pro',
      name: 'Vikram_Apex',
      avatar: 'avatar_4',
      gamesWon: 95,
      gamesPlayed: 140,
      winRate: 68,
      captures: 289,
      streak: 5
    },
    {
      rank: 4,
      userId: 'usr_dice_roller',
      name: 'CyberPawn',
      avatar: 'avatar_8',
      gamesWon: 74,
      gamesPlayed: 120,
      winRate: 62,
      captures: 210,
      streak: 4
    }
  ];

  // Include current user in leaderboard calculation
  const userEntry: LeaderboardEntry = {
    rank: 5,
    userId: profile.id,
    name: profile.name,
    avatar: profile.avatar,
    gamesWon: profile.stats.gamesWon,
    gamesPlayed: profile.stats.gamesPlayed,
    winRate: profile.stats.winRate,
    captures: profile.stats.totalCaptures,
    streak: profile.stats.currentStreak
  };

  const allEntries = [...baseEntries];
  if (profile.stats.gamesPlayed > 0) {
    allEntries.push(userEntry);
    allEntries.sort((a, b) => b.gamesWon - a.gamesWon || b.winRate - a.winRate);
    allEntries.forEach((e, idx) => (e.rank = idx + 1));
  }

  const top3 = allEntries.slice(0, 3);
  const remaining = allEntries.slice(3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white font-display tracking-tight flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-amber-400" /> Apex Leaderboard
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Top rated champions ranked by authoritative victories and win rate.
        </p>

        {/* Timeframe Tabs */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 mt-4">
          {(['GLOBAL', 'WEEKLY', 'MONTHLY'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeframe(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === tab
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 max-w-lg mx-auto items-end pt-4">
        {/* #2 Rank */}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg border-2 border-slate-300">
                {top3[1].name.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                2
              </span>
            </div>
            <p className="text-xs font-bold text-white truncate max-w-[80px]">{top3[1].name}</p>
            <span className="text-[11px] font-extrabold text-amber-400">{top3[1].gamesWon} Wins</span>
            <div className="w-full h-20 bg-slate-800/80 rounded-t-2xl mt-2 border border-slate-700/60" />
          </div>
        )}

        {/* #1 Rank (Center Top) */}
        {top3[0] && (
          <div className="flex flex-col items-center">
            <Crown className="w-6 h-6 text-amber-400 animate-bounce mb-1" />
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-2xl flex items-center justify-center shadow-xl shadow-amber-500/25 border-4 border-amber-300">
                {top3[0].name.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -top-2 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                1
              </span>
            </div>
            <p className="text-xs font-bold text-white truncate max-w-[90px]">{top3[0].name}</p>
            <span className="text-xs font-extrabold text-amber-400">{top3[0].gamesWon} Wins</span>
            <div className="w-full h-28 bg-gradient-to-t from-amber-500/30 to-amber-500/10 rounded-t-2xl mt-2 border-t border-x border-amber-500/40" />
          </div>
        )}

        {/* #3 Rank */}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-700 to-amber-600 text-white font-black text-xl flex items-center justify-center shadow-lg border-2 border-amber-600">
                {top3[2].name.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                3
              </span>
            </div>
            <p className="text-xs font-bold text-white truncate max-w-[80px]">{top3[2].name}</p>
            <span className="text-[11px] font-extrabold text-amber-400">{top3[2].gamesWon} Wins</span>
            <div className="w-full h-16 bg-slate-800/80 rounded-t-2xl mt-2 border border-slate-700/60" />
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl glass-panel border border-slate-800 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span>Rank</span>
            <span>Player</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Win Rate</span>
            <span>Captures</span>
            <span>Wins</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {allEntries.map((entry) => {
            const isMe = entry.userId === profile.id;
            return (
              <div
                key={entry.userId}
                className={`px-6 py-3.5 flex items-center justify-between transition-colors ${
                  isMe
                    ? 'bg-amber-500/10 border-l-4 border-l-amber-500'
                    : 'hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1
                        ? 'bg-amber-400 text-slate-950 font-extrabold'
                        : entry.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : entry.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {entry.rank}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs border border-slate-700">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {entry.name} {isMe && '(You)'}
                      </p>
                      <span className="text-[11px] text-slate-500">
                        {entry.gamesPlayed} Matches played
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <span className="font-semibold text-emerald-400 w-12 text-right">
                    {entry.winRate}%
                  </span>
                  <span className="font-semibold text-slate-300 w-12 text-right">
                    {entry.captures}
                  </span>
                  <span className="font-black text-amber-400 w-12 text-right text-sm">
                    {entry.gamesWon}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
