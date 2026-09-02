import React, { useState, useEffect, useMemo } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from './Chessboard';
import { BoardThemeId, PieceThemeId } from '../types/chess';
import { ENDGAME_LESSONS, EndgameLesson } from '../data/endgames';
import { minimax } from '../engine/evaluation';
import { sounds } from '../utils/sound';
import { haptics } from '../utils/haptics';
import {
  Crown,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  GraduationCap,
  Layers,
} from 'lucide-react';

interface EndgameTrainerProps {
  boardThemeId: BoardThemeId;
  pieceThemeId: PieceThemeId;
}

export const EndgameTrainer: React.FC<EndgameTrainerProps> = ({
  boardThemeId,
  pieceThemeId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(ENDGAME_LESSONS[0].id);

  const activeLesson: EndgameLesson = useMemo(() => {
    return ENDGAME_LESSONS.find((l) => l.id === selectedId) || ENDGAME_LESSONS[0];
  }, [selectedId]);

  const [currentChess, setCurrentChess] = useState<Chess>(() => new Chess(activeLesson.fen));
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);

  // Load lesson
  const loadLesson = (lesson: EndgameLesson) => {
    const c = new Chess(lesson.fen);
    setCurrentChess(c);
    setLastMove(null);
    setIsGameOver(false);
    setGameResult(null);
    setMovesCount(0);
  };

  useEffect(() => {
    loadLesson(activeLesson);
  }, [activeLesson]);

  // Handle Player Move Input
  const handlePlayerMove = (from: Square, to: Square, promotion?: string): boolean => {
    if (isGameOver) return false;
    if (currentChess.turn() !== activeLesson.playerColor) return false;

    try {
      const copy = new Chess(currentChess.fen());
      const move = copy.move({ from, to, promotion: promotion || 'q' });
      if (!move) return false;

      setCurrentChess(copy);
      setLastMove({ from, to });
      setMovesCount((m) => m + 1);
      haptics.move();

      if (move.captured) sounds.playCapture();
      else if (move.san.includes('O-O')) sounds.playCastle();
      else sounds.playMove();

      if (copy.isCheck()) sounds.playCheck();

      // Check if won/draw
      if (copy.isGameOver()) {
        setIsGameOver(true);
        if (copy.isCheckmate()) {
          setGameResult('Checkmate! Master technique successfully executed!');
          sounds.playCheckmate();
          haptics.victory();
        } else if (copy.isDraw() || copy.isStalemate()) {
          setGameResult('Drawn game! Theoretical objective completed.');
          sounds.playMove();
        }
        return true;
      }

      // AI Stubborn Defense Response
      setTimeout(() => {
        try {
          const aiCopy = new Chess(copy.fen());
          const isWhite = aiCopy.turn() === 'w';
          const aiSearch = minimax(aiCopy, 3, -Infinity, Infinity, isWhite);
          if (aiSearch.bestMove) {
            const aiMove = aiCopy.move(aiSearch.bestMove);
            if (aiMove) {
              setCurrentChess(aiCopy);
              setLastMove({ from: aiMove.from as Square, to: aiMove.to as Square });
              if (aiMove.captured) sounds.playCapture();
              else sounds.playMove();

              if (aiCopy.isGameOver()) {
                setIsGameOver(true);
                if (aiCopy.isCheckmate()) {
                  setGameResult('Opponent checkmated you. Review the key principles and try again!');
                  sounds.playDefeat();
                } else {
                  setGameResult('Game drawn by theoretical stalemate or agreement.');
                }
              }
            }
          }
        } catch {
          // Ignore
        }
      }, 400);

      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-4 md:py-6 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
            <Crown className="w-6 h-6 text-amber-400" />
            <span>Master Endgame Conversion Trainer & Drills</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Master critical theoretical endgames with active practice against stubborn computer defense.
          </p>
        </div>
      </div>

      {/* Main Grid: Directory on Left, Board in Center, Principles on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Lesson Directory (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-2xl space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Endgame Repertoire ({ENDGAME_LESSONS.length})</span>
          </h3>

          <div className="space-y-1.5">
            {ENDGAME_LESSONS.map((lesson) => {
              const isSelected = lesson.id === selectedId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedId(lesson.id)}
                  className={`w-full text-left p-3 rounded-2xl transition border ${
                    isSelected
                      ? 'bg-amber-600/20 border-amber-500 text-white shadow-md'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/80 border-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold block truncate max-w-[200px]">{lesson.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-amber-300 border border-zinc-700">
                      {lesson.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 mt-1 block line-clamp-1">{lesson.objective}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Board & Interaction (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Turn Banner */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mb-2.5 flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2 text-xs">
            <span className="flex items-center gap-2 font-bold text-zinc-200">
              <span className={`w-3.5 h-3.5 rounded-full border ${activeLesson.playerColor === 'w' ? 'bg-white border-zinc-400' : 'bg-zinc-950 border-zinc-600'}`} />
              {activeLesson.playerColor === 'w' ? 'Play as White' : 'Play as Black'}
            </span>
            <span className="font-mono text-zinc-400">Moves: {movesCount}</span>
          </div>

          <Chessboard
            chess={currentChess}
            boardThemeId={boardThemeId}
            pieceThemeId={pieceThemeId}
            flipped={activeLesson.playerColor === 'b'}
            interactive={!isGameOver && currentChess.turn() === activeLesson.playerColor}
            lastMove={lastMove}
            showCoordinates={true}
            showLegalMoves={true}
            showLastMove={true}
            showEvalBar={false}
            onMove={handlePlayerMove}
          />

          {/* Quick Toolbar */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mt-3 flex items-center justify-between">
            <button
              onClick={() => loadLesson(activeLesson)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Drill
            </button>
          </div>

          {/* Result Alert */}
          {gameResult && (
            <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mt-3 p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{gameResult}</span>
            </div>
          )}
        </div>

        {/* Right Lesson Technique & Motifs (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">
                {activeLesson.difficulty}
              </span>
              <h3 className="text-sm font-bold text-white mt-2">{activeLesson.title}</h3>
            </div>

            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white block mb-1">🎯 Objective:</strong>
              <span>{activeLesson.objective}</span>
            </div>

            {/* Key Principles Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Key Technical Principles</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-zinc-300">
                {activeLesson.keyPrinciples.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-zinc-950/40 p-2 rounded-xl border border-zinc-800/80">
                    <span className="w-4 h-4 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grandmaster Tip Box */}
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-700/50 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-300">
                <GraduationCap className="w-4 h-4" />
                <span>Coach Boris Advice:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-300">{activeLesson.grandmasterTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
