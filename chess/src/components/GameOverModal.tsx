import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Swords, RefreshCw, BarChart2, Award } from 'lucide-react';
import { GameRecord } from '../types/chess';

interface GameOverModalProps {
  game: GameRecord;
  onNewGame: () => void;
  onAnalyze: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  game,
  onNewGame,
  onAnalyze,
  onClose,
}) => {
  const isWhite = game.playerColor === 'w';
  const playerWon = (game.result === '1-0' && isWhite) || (game.result === '0-1' && !isWhite);
  const isDraw = game.result === '1/2-1/2';

  useEffect(() => {
    if (playerWon) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      });
    }
  }, [playerWon]);

  const getTitle = () => {
    if (playerWon) return 'Victory!';
    if (isDraw) return 'Game Drawn';
    return 'Defeat';
  };

  const getSubTitle = () => {
    switch (game.reason) {
      case 'checkmate':
        return `${game.winner === 'white' ? 'White' : 'Black'} won by Checkmate`;
      case 'resignation':
        return `${game.winner === 'white' ? 'Black' : 'White'} resigned`;
      case 'timeout':
        return `${game.winner === 'white' ? 'White' : 'Black'} won on time`;
      case 'stalemate':
        return 'Stalemate — No legal moves';
      case 'threefold':
        return 'Draw by Threefold Repetition';
      case '50move':
        return 'Draw by 50-Move Rule';
      case 'insufficient':
        return 'Draw by Insufficient Material';
      case 'agreement':
        return 'Draw by Mutual Agreement';
      default:
        return 'Game Over';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Top Glow Accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
            playerWon
              ? 'from-emerald-500 via-teal-400 to-emerald-600'
              : isDraw
              ? 'from-amber-500 via-yellow-400 to-amber-600'
              : 'from-rose-500 via-red-600 to-rose-700'
          }`}
        />

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg ${
              playerWon
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-green'
                : isDraw
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-glow-gold'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
          >
            {playerWon ? <Trophy className="w-8 h-8" /> : isDraw ? <Award className="w-8 h-8" /> : <Swords className="w-8 h-8" />}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{getTitle()}</h2>
          <p className="text-sm text-zinc-400 mt-1">{getSubTitle()}</p>
        </div>

        {/* Game Stats Card */}
        <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2 text-center font-mono">
          <div>
            <span className="text-[11px] text-zinc-500 block uppercase">Result</span>
            <span className="text-base font-bold text-zinc-200">{game.result}</span>
          </div>
          <div>
            <span className="text-[11px] text-zinc-500 block uppercase">Moves</span>
            <span className="text-base font-bold text-zinc-200">{game.movesCount}</span>
          </div>
          <div>
            <span className="text-[11px] text-zinc-500 block uppercase">Opponent</span>
            <span className="text-base font-bold text-blue-400">{game.blackElo} Elo</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onAnalyze}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <BarChart2 className="w-5 h-5" />
            <span>Open Coach Analysis & Eval Graph</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onNewGame}
              className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold flex items-center justify-center gap-2 transition border border-zinc-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Rematch</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold flex items-center justify-center gap-2 transition border border-zinc-700"
            >
              <span>Back to Board</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
