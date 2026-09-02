import React, { useState, useEffect } from 'react';
import { Square } from 'chess.js';
import { BoardThemeId } from '../types/chess';
import { sounds } from '../utils/sound';
import { haptics } from '../utils/haptics';
import {
  Eye,
  Trophy,
  RotateCcw,
  Target,
  Play,
  Award,
} from 'lucide-react';

interface VisualizationTrainerProps {
  boardThemeId: BoardThemeId;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function getRandomSquare(): Square {
  const file = FILES[Math.floor(Math.random() * 8)];
  const rank = RANKS[Math.floor(Math.random() * 8)];
  return `${file}${rank}` as Square;
}

export const VisualizationTrainer: React.FC<VisualizationTrainerProps> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<'w' | 'b'>('w');
  const [targetSquare, setTargetSquare] = useState<Square>(getRandomSquare);
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  // 30-Second Timer Ticker
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          sounds.playCheckmate();
          haptics.victory();
          return 0;
        }
        if (t <= 5) sounds.playLowTimeTick();
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleStartGame = () => {
    setScore(0);
    setTotalAttempts(0);
    setTimeLeft(30);
    setTargetSquare(getRandomSquare());
    setIsPlaying(true);
  };

  const handleSquareClick = (square: Square) => {
    if (!isPlaying) return;

    setTotalAttempts((a) => a + 1);
    if (square === targetSquare) {
      setScore((s) => s + 1);
      sounds.playMove();
      haptics.move();
      setTargetSquare(getRandomSquare());
    } else {
      sounds.playDefeat();
      haptics.blunder();
    }
  };

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 100;

  const displayFiles = orientation === 'w' ? FILES : [...FILES].reverse();
  const displayRanks = orientation === 'w' ? RANKS : [...RANKS].reverse();

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 md:py-4 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            <span>Chessboard Coordinate & Visualization Trainer</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Train instant square recognition and notation instinct under time pressure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start">
        {/* Left Column: Trainer Board (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Target Prompt Banner */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mb-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 flex items-center justify-between shadow-lg">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Target Square:</span>
            </span>
            <span className="text-xl font-black font-mono tracking-widest text-white bg-purple-950/80 px-3.5 py-0.5 rounded-xl border border-purple-700/80 shadow-md">
              {isPlaying ? targetSquare.toUpperCase() : '—'}
            </span>
          </div>

          {/* Coordinate Board Grid (No coordinates shown on board to train visualization) */}
          <div className="w-[min(100vw-24px,min(calc(100vh-230px),480px))] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-800 grid grid-cols-8 grid-rows-8 relative">
            {displayRanks.map((r, rIdx) =>
              displayFiles.map((f, fIdx) => {
                const sq = `${f}${r}` as Square;
                const isLight = (rIdx + fIdx) % 2 === 0;

                return (
                  <button
                    key={sq}
                    onClick={() => handleSquareClick(sq)}
                    disabled={!isPlaying}
                    className={`w-full h-full transition-colors flex items-center justify-center font-mono font-bold text-xs ${
                      isLight ? 'bg-[#ebecd0] hover:bg-[#f6f7eb]' : 'bg-[#779556] hover:bg-[#8ca86b]'
                    }`}
                  />
                );
              })
            )}

            {!isPlaying && (
              <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <Trophy className="w-10 h-10 text-amber-400 mb-2" />
                <h3 className="text-base font-bold text-white mb-1">
                  {totalAttempts > 0 ? 'Drill Complete!' : '30-Second Coordinate Sprint'}
                </h3>
                {totalAttempts > 0 && (
                  <p className="text-xs text-zinc-300 mb-3">
                    Score: <strong className="text-emerald-400 font-bold">{score}</strong> • Accuracy:{' '}
                    <strong className="text-blue-400 font-bold">{accuracy}%</strong>
                  </p>
                )}
                <button
                  onClick={handleStartGame}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{totalAttempts > 0 ? 'Play Again' : 'Start Drill'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Toolbar */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mt-2 flex items-center justify-between">
            <button
              onClick={() => setOrientation(orientation === 'w' ? 'b' : 'w')}
              disabled={isPlaying}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 border border-zinc-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Flip ({orientation === 'w' ? 'White' : 'Black'})
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-bold">Time</span>
                <div className="text-sm font-mono font-bold text-amber-400 leading-none">{timeLeft}s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Tips (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Performance Metrics</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Correct Squares</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">{score}</span>
              </div>
              <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Accuracy</span>
                <span className="text-2xl font-bold font-mono text-blue-400">{accuracy}%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Why Coordinate Training Matters:</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-400 leading-relaxed">
                <li>• Instant calculation without visual hesitation.</li>
                <li>• Essential for reading chess books and master game notation.</li>
                <li>• Foundation for blindfold chess and multi-ply deep visualization.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
