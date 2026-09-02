import React from 'react';
import { PlayerColor, PlayerState } from '../../types/game';
import { Bot, User, WifiOff, Crown } from 'lucide-react';

interface PlayerCardProps {
  player: PlayerState;
  isActive: boolean;
  timerSeconds?: number;
  maxTimerSeconds?: number;
}

const COLOR_THEMES: Record<
  PlayerColor,
  { border: string; bg: string; text: string; ring: string; badge: string; dot: string }
> = {
  RED: {
    border: 'border-red-500/70',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    ring: 'ring-red-500',
    badge: 'bg-red-500',
    dot: 'bg-red-400'
  },
  GREEN: {
    border: 'border-emerald-500/70',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500',
    badge: 'bg-emerald-500',
    dot: 'bg-emerald-400'
  },
  YELLOW: {
    border: 'border-amber-500/70',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    ring: 'ring-amber-500',
    badge: 'bg-amber-500',
    dot: 'bg-amber-400'
  },
  BLUE: {
    border: 'border-blue-500/70',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    ring: 'ring-blue-500',
    badge: 'bg-blue-500',
    dot: 'bg-blue-400'
  }
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isActive,
  timerSeconds = 30,
  maxTimerSeconds = 30
}) => {
  const theme = COLOR_THEMES[player.color];
  const tokensHome = player.tokens.filter((t) => t.isHome).length;
  const isFinished = player.rank !== undefined;

  // Percentage for timer bar
  const timerPercent = Math.max(0, Math.min(100, (timerSeconds / maxTimerSeconds) * 100));

  return (
    <div
      className={`relative p-3 rounded-2xl border transition-all duration-300 ${
        isActive
          ? `${theme.border} ${theme.bg} ring-2 ${theme.ring} shadow-xl shadow-${player.color.toLowerCase()}-500/10 scale-[1.02]`
          : 'border-slate-800/80 bg-slate-900/70 opacity-90'
      }`}
    >
      {/* Active turn indicator pulse */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full animate-ping" />
      )}

      <div className="flex items-center gap-3">
        {/* Avatar Container */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
              theme.badge
            } border-2 border-white/20`}
          >
            {player.type === 'AI' ? (
              <Bot className="w-5 h-5" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>

          {/* Color Indicator Mini Badge */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${theme.badge}`}
          />
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="text-sm font-bold truncate text-slate-100">
              {player.name}
            </h4>
            {isFinished && (
              <span className="flex-shrink-0 flex items-center gap-1 text-[11px] font-black text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Crown className="w-3 h-3" /> #{player.rank}
              </span>
            )}
            {!player.connected && (
              <WifiOff className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            )}
          </div>

          {/* Status Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-1 font-semibold text-slate-300">
              Home: <span className="font-black text-amber-400">{tokensHome}/4</span>
            </span>

            {player.type === 'AI' ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-emerald-400 uppercase tracking-wider">
                {player.aiDifficulty || 'BOT'}
              </span>
            ) : (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 uppercase tracking-wider">
                HUMAN
              </span>
            )}
          </div>

          {/* 4 Micro Token Dots */}
          <div className="flex items-center gap-1.5 mt-2">
            {player.tokens.map((t, idx) => (
              <span
                key={idx}
                title={t.isHome ? 'Home' : t.step < 0 ? 'Yard' : `Step ${t.step}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  t.isHome
                    ? 'bg-amber-400 ring-2 ring-amber-300 shadow-sm'
                    : t.step >= 0
                    ? `${theme.dot} ring-1 ring-white/60`
                    : 'bg-slate-700 border border-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Turn Countdown Progress Line */}
      {isActive && !isFinished && (
        <div className="mt-2.5 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            style={{ width: `${timerPercent}%` }}
            className={`h-full transition-all duration-300 ${
              timerSeconds <= 5
                ? 'bg-red-500 animate-pulse'
                : timerSeconds <= 10
                ? 'bg-amber-400'
                : theme.badge
            }`}
          />
        </div>
      )}
    </div>
  );
};
