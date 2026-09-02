import React from 'react';
import { GameState } from '../../types/game';
import { Trophy, RefreshCw, Home, Award, Swords } from 'lucide-react';

interface GameOverModalProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onPlayAgain,
  onHome
}) => {
  if (gameState.status !== 'FINISHED') return null;

  // Rank players
  const rankedPlayers = [...gameState.players].sort((a, b) => {
    if (a.rank !== undefined && b.rank !== undefined) return a.rank - b.rank;
    if (a.rank !== undefined) return -1;
    if (b.rank !== undefined) return 1;
    const aHome = a.tokens.filter((t) => t.isHome).length;
    const bHome = b.tokens.filter((t) => t.isHome).length;
    return bHome - aHome;
  });

  const winner = rankedPlayers[0];
  const durationSec = gameState.finishedAt
    ? Math.round((gameState.finishedAt - gameState.startedAt) / 1000)
    : 0;
  const durationMin = Math.floor(durationSec / 60);
  const durationRemSec = durationSec % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-slate-700/80 shadow-2xl text-center">
        {/* Trophy Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3 animate-bounce">
          <Trophy className="w-8 h-8 text-slate-950" />
        </div>

        <h2 className="text-2xl font-black text-white font-display">
          {winner.name} Wins!
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Match completed in {durationMin > 0 ? `${durationMin}m ` : ''}
          {durationRemSec}s
        </p>

        {/* Podium Standings */}
        <div className="mt-5 space-y-2.5">
          {rankedPlayers.map((player, idx) => {
            const isFirst = idx === 0;
            const homeCount = player.tokens.filter((t) => t.isHome).length;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isFirst
                    ? 'bg-amber-500/15 border-amber-500/40 ring-1 ring-amber-500/50'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isFirst
                        ? 'bg-amber-400 text-slate-950'
                        : idx === 1
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      {player.name}
                    </p>
                    <span className="text-xs text-slate-400 capitalize">
                      {player.color.toLowerCase()} Player
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <Swords className="w-3.5 h-3.5 text-amber-400" />
                    {player.stats.captures}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    {homeCount}/4
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={onHome}
            className="flex-1 py-3 px-4 rounded-xl glass-button text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};
