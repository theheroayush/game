import React from 'react';
import { UserStats, GameRecord } from '../types/chess';
import { Trophy, TrendingUp, Flame, Target, Shield } from 'lucide-react';

interface ProfileViewProps {
  stats: UserStats;
  games?: GameRecord[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({ stats, games: _games }) => {
  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;
  const lossRate = stats.gamesPlayed > 0 ? Math.round((stats.losses / stats.gamesPlayed) * 100) : 0;
  const drawRate = stats.gamesPlayed > 0 ? Math.round((stats.draws / stats.gamesPlayed) * 100) : 0;

  const getTier = (rating: number) => {
    if (rating >= 2400) return { title: 'Grandmaster', color: 'text-amber-400 bg-amber-950/60 border-amber-600' };
    if (rating >= 2200) return { title: 'Master', color: 'text-rose-400 bg-rose-950/60 border-rose-600' };
    if (rating >= 2000) return { title: 'Candidate Master', color: 'text-purple-400 bg-purple-950/60 border-purple-600' };
    if (rating >= 1800) return { title: 'Expert Player', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-600' };
    if (rating >= 1500) return { title: 'Club Player', color: 'text-blue-400 bg-blue-950/60 border-blue-600' };
    if (rating >= 1200) return { title: 'Intermediate', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-600' };
    if (rating >= 900) return { title: 'Casual Improver', color: 'text-yellow-400 bg-yellow-950/60 border-yellow-600' };
    return { title: 'Novice Explorer', color: 'text-zinc-400 bg-zinc-900 border-zinc-700' };
  };

  const tier = getTier(stats.rating);

  // Rating Progression Sparkline Coordinates
  const graphWidth = 600;
  const graphHeight = 120;
  const history = stats.ratingHistory || [{ date: 'Today', rating: 1200 }];
  const minRating = Math.min(...history.map(h => h.rating), stats.rating) - 50;
  const maxRating = Math.max(...history.map(h => h.rating), stats.rating) + 50;
  const ratingRange = Math.max(100, maxRating - minRating);

  const points = history.map((h, i) => {
    const x = (i / Math.max(1, history.length - 1)) * graphWidth;
    const y = graphHeight - ((h.rating - minRating) / ratingRange) * (graphHeight - 20) - 10;
    return { x, y, rating: h.rating, date: h.date };
  });

  const pathD = points.reduce(
    (acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`,
    ''
  );

  return (
    <div className="max-w-5xl mx-auto px-3 py-6 pb-24 md:pb-8 animate-fade-in space-y-6">
      {/* Header Profile Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white text-3xl shadow-lg border border-blue-400/30">
              ♛
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Player Profile</h1>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.color}`}
                >
                  {tier.title}
                </span>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 flex items-center gap-2">
                <span>Account Status: Active Member</span>
                <span>•</span>
                <span>Favorite: {stats.favoriteOpening}</span>
              </p>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl px-6 py-4 text-center font-mono shadow-inner">
            <span className="text-xs text-zinc-500 uppercase block font-semibold">Estimated Elo</span>
            <span className="text-3xl md:text-4xl font-extrabold text-blue-400">{stats.rating}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold uppercase">Games</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-white">{stats.gamesPlayed}</span>
          <span className="text-[11px] text-zinc-500 block mt-0.5">Total completed</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold uppercase">Win Rate</span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-emerald-400">{winRate}%</span>
          <span className="text-[11px] text-zinc-500 block mt-0.5">{stats.wins} victories</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold uppercase">Win Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-amber-400">{stats.winStreak}</span>
          <span className="text-[11px] text-zinc-500 block mt-0.5">Best: {stats.bestWinStreak}</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold uppercase">Draws</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-zinc-300">{stats.draws}</span>
          <span className="text-[11px] text-zinc-500 block mt-0.5">{drawRate}% draw rate</span>
        </div>
      </div>

      {/* Rating Progress Graph */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Rating Progression Over Time</span>
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Calculated from AI matches and performance accuracy</p>
          </div>
          <span className="font-mono text-xs font-bold text-blue-400">
            {stats.rating >= 1200 ? `+${stats.rating - 1200}` : stats.rating - 1200} pts from baseline
          </span>
        </div>

        <div className="relative w-full h-[120px] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 p-2">
          <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full" preserveAspectRatio="none">
            {pathD && (
              <path
                d={`${pathD} L ${graphWidth},${graphHeight} L 0,${graphHeight} Z`}
                fill="rgba(59, 130, 246, 0.12)"
              />
            )}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {points.map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={idx === points.length - 1 ? 5 : 3}
                fill={idx === points.length - 1 ? '#3b82f6' : '#60a5fa'}
                stroke="#18181b"
                strokeWidth={1.5}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Win/Loss/Draw Distribution Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3">Result Distribution</h3>
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-zinc-950 border border-zinc-800">
          <div style={{ width: `${winRate}%` }} className="bg-emerald-500 transition-all" title={`Won: ${winRate}%`} />
          <div style={{ width: `${drawRate}%` }} className="bg-amber-500 transition-all" title={`Drawn: ${drawRate}%`} />
          <div style={{ width: `${lossRate}%` }} className="bg-rose-500 transition-all" title={`Lost: ${lossRate}%`} />
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Won ({stats.wins})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Drawn ({stats.draws})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Lost ({stats.losses})
          </span>
        </div>
      </div>
    </div>
  );
};
