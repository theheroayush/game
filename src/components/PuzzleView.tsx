import React, { useState, useEffect, useMemo } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from './Chessboard';
import { BoardThemeId, PieceThemeId } from '../types/chess';
import { PUZZLES_DATABASE, ChessPuzzle } from '../data/puzzles';
import { sounds } from '../utils/sound';
import { haptics } from '../utils/haptics';
import { voiceCoach } from '../utils/voiceCoach';
import {
  Sparkles,
  Flame,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
  Trophy,
  Filter,
} from 'lucide-react';

interface PuzzleViewProps {
  boardThemeId: BoardThemeId;
  pieceThemeId: PieceThemeId;
  onSolvePuzzle?: (rating: number) => void;
}

type PuzzleMode = 'practice' | 'rush_3' | 'rush_5' | 'survival';

export const PuzzleView: React.FC<PuzzleViewProps> = ({
  boardThemeId,
  pieceThemeId,
  onSolvePuzzle,
}) => {
  const [mode, setMode] = useState<PuzzleMode>('practice');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Filtered puzzle list for practice mode
  const filteredPuzzles = useMemo(() => {
    if (selectedTheme === 'all') return PUZZLES_DATABASE;
    return PUZZLES_DATABASE.filter((p) => p.theme === selectedTheme);
  }, [selectedTheme]);

  const activePuzzle: ChessPuzzle = useMemo(() => {
    return filteredPuzzles[currentIndex % filteredPuzzles.length] || PUZZLES_DATABASE[0];
  }, [filteredPuzzles, currentIndex]);

  // Interactive Chessboard state
  const [currentChess, setCurrentChess] = useState<Chess>(() => new Chess(activePuzzle.fen));
  const [moveStep, setMoveStep] = useState<number>(0);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [status, setStatus] = useState<'solving' | 'correct' | 'incorrect'>('solving');
  const [showHint, setShowHint] = useState<boolean>(false);

  // Puzzle Rush & Streak State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [strikes, setStrikes] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isRushActive, setIsRushActive] = useState<boolean>(false);
  const [rushGameOver, setRushGameOver] = useState<boolean>(false);

  // Load new puzzle onto board
  const loadPuzzle = (puz: ChessPuzzle) => {
    const c = new Chess(puz.fen);
    setCurrentChess(c);
    setMoveStep(0);
    setLastMove(null);
    setStatus('solving');
    setShowHint(false);
  };

  useEffect(() => {
    loadPuzzle(activePuzzle);
  }, [activePuzzle]);

  // Rush Timer Ticker
  useEffect(() => {
    if (!isRushActive || mode === 'practice' || mode === 'survival' || rushGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRushActive(false);
          setRushGameOver(true);
          sounds.playDefeat();
          return 0;
        }
        if (prev <= 10) sounds.playLowTimeTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRushActive, mode, rushGameOver]);

  const handleStartRush = (rushMode: 'rush_3' | 'rush_5' | 'survival') => {
    setMode(rushMode);
    setScore(0);
    setStreak(0);
    setStrikes(0);
    setTimeLeft(rushMode === 'rush_3' ? 180 : rushMode === 'rush_5' ? 300 : 0);
    setIsRushActive(true);
    setRushGameOver(false);
    setCurrentIndex(0);
  };

  // Handle Player Move Input
  const handlePlayerMove = (from: Square, to: Square, promotion?: string): boolean => {
    if (status === 'correct' || (isRushActive && rushGameOver)) return false;

    const expectedSan = activePuzzle.moves[moveStep];
    const testCopy = new Chess(currentChess.fen());

    try {
      const move = testCopy.move({ from, to, promotion: promotion || 'q' });
      if (!move) return false;

      // Check if move matches the puzzle solution
      if (move.san === expectedSan) {
        // Correct Move
        setCurrentChess(testCopy);
        setLastMove({ from, to });
        haptics.move();

        const nextStep = moveStep + 1;
        setMoveStep(nextStep);

        // Check if puzzle is completely solved
        if (nextStep >= activePuzzle.moves.length) {
          setStatus('correct');
          sounds.playCheckmate();
          haptics.victory();
          voiceCoach.announcePuzzleSuccess();

          if (isRushActive) {
            setScore((s) => s + 100 + streak * 25);
            setStreak((st) => st + 1);
          }

          if (onSolvePuzzle) onSolvePuzzle(activePuzzle.rating);
        } else {
          // Play Opponent intermediate reply automatically after 400ms
          const opponentSan = activePuzzle.moves[nextStep];
          setTimeout(() => {
            try {
              const replyCopy = new Chess(testCopy.fen());
              const oppMove = replyCopy.move(opponentSan);
              if (oppMove) {
                setCurrentChess(replyCopy);
                setLastMove({ from: oppMove.from as Square, to: oppMove.to as Square });
                setMoveStep(nextStep + 1);
                if (oppMove.captured) sounds.playCapture();
                else sounds.playMove();
              }
            } catch {
              // Ignore
            }
          }, 400);
        }
        return true;
      } else {
        // Wrong Move
        setStatus('incorrect');
        sounds.playDefeat();
        haptics.blunder();

        if (isRushActive) {
          setStreak(0);
          const newStrikes = strikes + 1;
          setStrikes(newStrikes);
          if (newStrikes >= 3) {
            setIsRushActive(false);
            setRushGameOver(true);
          }
        }
        return false;
      }
    } catch {
      return false;
    }
  };

  const handleNextPuzzle = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPuzzles.length);
  };

  const themes = ['all', 'Fork', 'Pin', 'Skewer', 'Discovered Attack', 'Smothered Mate', 'Greek Gift', 'Back Rank', 'Deflection'];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 md:py-4 pb-24 md:pb-6 animate-fade-in">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Grandmaster Tactical Puzzles</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Sharpen calculation and pattern recognition with instant tactical feedback.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl shadow-inner shrink-0">
          <button
            onClick={() => {
              setMode('practice');
              setIsRushActive(false);
              setRushGameOver(false);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              mode === 'practice' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Practice
          </button>
          <button
            onClick={() => handleStartRush('rush_3')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              mode === 'rush_3' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> 3-Min
          </button>
          <button
            onClick={() => handleStartRush('rush_5')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              mode === 'rush_5' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> 5-Min
          </button>
          <button
            onClick={() => handleStartRush('survival')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              mode === 'survival' ? 'bg-rose-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Survival
          </button>
        </div>
      </div>

      {/* Main Grid: Board on Left, Puzzle Coach Deck on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start">
        {/* Left Board Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Turn Banner */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mb-1.5 flex items-center justify-between bg-zinc-950 border border-zinc-800/90 rounded-2xl px-3.5 py-1.5 text-xs">
            <span className="flex items-center gap-2 font-bold text-zinc-200">
              <span className={`w-3.5 h-3.5 rounded-full border ${activePuzzle.playerColor === 'w' ? 'bg-white border-zinc-400' : 'bg-zinc-950 border-zinc-600'}`} />
              {activePuzzle.playerColor === 'w' ? 'White to Move & Win' : 'Black to Move & Win'}
            </span>
            <span className="font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-800/80">
              ★ {activePuzzle.rating} Elo
            </span>
          </div>

          <Chessboard
            chess={currentChess}
            boardThemeId={boardThemeId}
            pieceThemeId={pieceThemeId}
            flipped={activePuzzle.playerColor === 'b'}
            interactive={status !== 'correct' && (!isRushActive || !rushGameOver)}
            lastMove={lastMove}
            showCoordinates={true}
            showLegalMoves={true}
            showLastMove={true}
            showEvalBar={false}
            onMove={handlePlayerMove}
          />

          {/* Quick Board Toolbar */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mt-2 flex items-center justify-between gap-2">
            <button
              onClick={() => loadPuzzle(activePuzzle)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={() => setShowHint(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700/80 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Hint
            </button>
            <button
              onClick={handleNextPuzzle}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-blue-600/20"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Puzzle Info, Rush Metrics & Coach Dialogue (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Rush Scoreboard (when in Rush / Survival mode) */}
          {mode !== 'practice' && (
            <div className="bg-gradient-to-r from-zinc-900 to-indigo-950/60 border border-zinc-800 rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {mode === 'survival' ? 'Survival Rush' : `${mode === 'rush_3' ? '3-Minute' : '5-Minute'} Sprint`}
                  </h3>
                </div>
                {mode !== 'survival' && (
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-amber-400 bg-zinc-950 px-3 py-1 rounded-xl border border-zinc-800">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Score</span>
                  <span className="text-xl font-bold font-mono text-white">{score}</span>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Streak</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" /> {streak}
                  </span>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Strikes</span>
                  <span className="text-xl font-bold font-mono text-red-400">
                    {'❌'.repeat(strikes) || '0'} / 3
                  </span>
                </div>
              </div>

              {rushGameOver && (
                <div className="mt-4 p-3.5 rounded-2xl bg-zinc-950 border border-amber-500/50 text-center animate-fade-in">
                  <h4 className="text-sm font-bold text-white">🏆 Rush Complete!</h4>
                  <p className="text-xs text-zinc-300 mt-1">Final Score: <strong className="text-amber-400">{score}</strong> points</p>
                  <button
                    onClick={() => handleStartRush(mode as 'rush_3' | 'rush_5' | 'survival')}
                    className="mt-2.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Active Puzzle Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">
                  {activePuzzle.theme}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{activePuzzle.title}</h3>
              </div>
              <span className="text-xs font-mono text-zinc-500 font-bold">
                #{currentIndex + 1} of {filteredPuzzles.length}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800">
              {activePuzzle.description}
            </p>

            {/* Hint Box */}
            {showHint && (
              <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-xs text-amber-200 animate-fade-in flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Grandmaster Hint:</strong>
                  <span>{activePuzzle.hint}</span>
                </div>
              </div>
            )}

            {/* Solving Status Card */}
            {status === 'correct' && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs animate-fade-in space-y-1.5 shadow-lg">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Brilliant Solution! Puzzle Solved!</span>
                </div>
                <p className="text-zinc-200 leading-relaxed">{activePuzzle.coachExplanation}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextPuzzle}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition"
                  >
                    <span>Next Puzzle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {status === 'incorrect' && (
              <div className="p-3.5 rounded-2xl bg-red-950/90 border border-red-500 text-red-300 text-xs animate-fade-in flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Not quite the best move. Try looking for active piece tactics!</span>
                </div>
                <button
                  onClick={() => loadPuzzle(activePuzzle)}
                  className="text-amber-400 hover:text-white font-bold underline text-[11px] ml-2 shrink-0"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Theme Filter Matrix (Practice Mode) */}
          {mode === 'practice' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>Tactical Motifs & Categories</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTheme(t);
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                      selectedTheme === t
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    {t === 'all' ? 'All Motifs' : t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
