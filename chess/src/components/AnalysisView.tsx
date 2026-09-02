import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from './Chessboard';
import { BoardArrow } from './BoardArrows';
import {
  GameRecord,
  FullGameAnalysis,
  MoveAnalysis,
  MoveClassification,
  BoardThemeId,
  PieceThemeId,
} from '../types/chess';
import { analyzeGame } from '../engine/coachAnalysis';
import { evaluatePosition, minimax } from '../engine/evaluation';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Brain,
  CheckCircle2,
  BookOpen,
  ThumbsUp,
  Star,
  Target,
  Check,
  X,
  Lightbulb,
  Download,
  Share2,
  Save,
  AlertCircle,
  Crown,
  LayoutGrid,
  List,
  Info,
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface AnalysisViewProps {
  game: GameRecord;
  boardThemeId: BoardThemeId;
  pieceThemeId: PieceThemeId;
  onBackToGame: () => void;
  onPlayFromPosition?: (fen: string, sideToMove: 'w' | 'b') => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  game,
  boardThemeId,
  pieceThemeId,
  onBackToGame,
  onPlayFromPosition,
}) => {
  // Compute or retrieve precomputed analysis
  const analysis: FullGameAnalysis = useMemo(() => {
    if (game.analysis) return game.analysis;
    return analyzeGame(game.pgn);
  }, [game]);

  const [currentPly, setCurrentPly] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [flipped, setFlipped] = useState<boolean>(game.playerColor === 'b');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'board' | 'moves' | 'info' | 'openings'>('board');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // General Rating State
  const [userGameRating, setUserGameRating] = useState<number>(5);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  // Puzzle / Retry Mode State
  const [retryMode, setRetryMode] = useState<boolean>(false);
  const [retryStatus, setRetryStatus] = useState<'idle' | 'success' | 'incorrect'>('idle');
  const [retryCustomChess, setRetryCustomChess] = useState<Chess | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sandbox / Free Exploration State
  const [sandboxMode, setSandboxMode] = useState<boolean>(false);
  const [sandboxChess, setSandboxChess] = useState<Chess>(() => new Chess());
  const [sandboxEval, setSandboxEval] = useState<number>(0);
  const [sandboxLastMove, setSandboxLastMove] = useState<{ from: Square; to: Square } | null>(null);

  // "Try the Line" Exploration State
  const [tryLineActive, setTryLineActive] = useState<boolean>(false);
  const [lineHistory, setLineHistory] = useState<string[]>([]);

  const moveListContainerRef = useRef<HTMLDivElement>(null);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPlies = analysis.moves.length;

  // Reset state when a new game is analyzed
  useEffect(() => {
    setCurrentPly(0);
    setIsPlaying(false);
    setRetryMode(false);
    setSandboxMode(false);
    setTryLineActive(false);
    setLineHistory([]);
    setRetryCustomChess(null);
    setRetryStatus('idle');
    setShowHint(false);
    setFlipped(game.playerColor === 'b');
  }, [game.id, game.pgn, game.playerColor]);

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Active Move Analysis
  const currentMoveAnalysis: MoveAnalysis | undefined = useMemo(() => {
    if (currentPly <= 0 || currentPly > totalPlies) return undefined;
    return analysis.moves[currentPly - 1];
  }, [currentPly, totalPlies, analysis.moves]);

  // Generate board position for current ply
  const { currentChess, lastMove } = useMemo(() => {
    const c = new Chess();

    if (sandboxMode) {
      return { currentChess: sandboxChess, lastMove: sandboxLastMove };
    }

    if (retryMode) {
      if (retryCustomChess) {
        const hist = retryCustomChess.history({ verbose: true });
        const last = hist[hist.length - 1];
        return {
          currentChess: retryCustomChess,
          lastMove: last ? { from: last.from as Square, to: last.to as Square } : null,
        };
      }
      if (currentMoveAnalysis?.fenBefore) {
        try {
          c.load(currentMoveAnalysis.fenBefore);
          return { currentChess: c, lastMove: null };
        } catch {
          // fallback
        }
      }
    }

    if (tryLineActive && lineHistory.length > 0) {
      for (let i = 0; i < currentPly && i < totalPlies; i++) {
        try {
          c.move(analysis.moves[i].san);
        } catch {
          // ignore
        }
      }
      for (const m of lineHistory) {
        try {
          c.move(m);
        } catch {
          // ignore
        }
      }
      const hist = c.history({ verbose: true });
      const last = hist[hist.length - 1];
      return { currentChess: c, lastMove: last ? { from: last.from as Square, to: last.to as Square } : null };
    }

    let last: { from: Square; to: Square } | null = null;
    for (let i = 0; i < currentPly && i < totalPlies; i++) {
      try {
        const m = c.move(analysis.moves[i].san);
        if (m && i === currentPly - 1) {
          last = { from: m.from as Square, to: m.to as Square };
        }
      } catch {
        // ignore
      }
    }
    return { currentChess: c, lastMove: last };
  }, [
    currentPly,
    totalPlies,
    analysis.moves,
    tryLineActive,
    lineHistory,
    sandboxMode,
    sandboxChess,
    sandboxLastMove,
    retryMode,
    retryCustomChess,
    currentMoveAnalysis,
  ]);

  // Construct Dynamic Tactical Arrows
  const arrows: BoardArrow[] = useMemo(() => {
    if (!showArrows) return [];

    if (retryMode) {
      if (showHint && currentMoveAnalysis?.bestMoveFrom && currentMoveAnalysis?.bestMoveTo) {
        return [
          {
            from: currentMoveAnalysis.bestMoveFrom,
            to: currentMoveAnalysis.bestMoveTo,
            color: '#10b981',
            opacity: 0.85,
          },
        ];
      }
      return [];
    }

    if (sandboxMode) {
      const best = minimax(sandboxChess, 3, -Infinity, Infinity, sandboxChess.turn() === 'w');
      if (best.bestMove) {
        return [{ from: best.bestMove.from as Square, to: best.bestMove.to as Square, color: '#10b981', opacity: 0.85 }];
      }
      return [];
    }

    if (!currentMoveAnalysis) return [];

    const res: BoardArrow[] = [];

    // Best move recommendation (Emerald Green)
    if (currentMoveAnalysis.bestMoveFrom && currentMoveAnalysis.bestMoveTo) {
      res.push({
        from: currentMoveAnalysis.bestMoveFrom,
        to: currentMoveAnalysis.bestMoveTo,
        color: '#10b981',
        opacity: 0.85,
      });
    }

    // Threat / Played error move (Crimson Red)
    if (
      (currentMoveAnalysis.classification === 'blunder' ||
        currentMoveAnalysis.classification === 'mistake' ||
        currentMoveAnalysis.classification === 'missed_win') &&
      currentMoveAnalysis.bestMoveSan &&
      currentMoveAnalysis.bestMoveSan !== currentMoveAnalysis.san
    ) {
      res.push({
        from: currentMoveAnalysis.from,
        to: currentMoveAnalysis.to,
        color: '#ef4444',
        opacity: 0.75,
      });
    }

    return res;
  }, [showArrows, currentMoveAnalysis, sandboxMode, sandboxChess, retryMode, showHint]);

  // Navigation handlers
  const handleSelectPly = useCallback((ply: number) => {
    setSandboxMode(false);
    setTryLineActive(false);
    setLineHistory([]);
    setRetryMode(false);
    setRetryCustomChess(null);
    setRetryStatus('idle');
    setShowHint(false);
    const bounded = Math.max(0, Math.min(totalPlies, ply));
    setCurrentPly(bounded);
    sounds.playMove();
  }, [totalPlies]);

  const handleFirst = useCallback(() => handleSelectPly(0), [handleSelectPly]);
  const handlePrev = useCallback(() => handleSelectPly(currentPly - 1), [handleSelectPly, currentPly]);
  const handleNext = useCallback(() => handleSelectPly(currentPly + 1), [handleSelectPly, currentPly]);
  const handleLast = useCallback(() => handleSelectPly(totalPlies), [handleSelectPly, totalPlies]);

  // Auto-Replay Ticker
  const handleToggleReplay = useCallback(() => {
    if (!isPlaying) {
      if (currentPly >= totalPlies) {
        setCurrentPly(0);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentPly, totalPlies]);

  useEffect(() => {
    if (!isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
      return;
    }

    const intervalMs = playbackSpeed === 1 ? 1100 : playbackSpeed === 2 ? 650 : 350;
    playIntervalRef.current = setInterval(() => {
      setCurrentPly((prev) => {
        if (prev >= totalPlies) {
          setIsPlaying(false);
          return prev;
        }
        sounds.playMove();
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, totalPlies]);

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleToggleReplay();
      } else if (e.key === 'ArrowUp' || e.key === 'Home') {
        e.preventDefault();
        handleFirst();
      } else if (e.key === 'ArrowDown' || e.key === 'End') {
        e.preventDefault();
        handleLast();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFirst, handleLast, handleNext, handlePrev, handleToggleReplay]);

  // Auto-scroll Move List Table to active ply
  useEffect(() => {
    if (moveListContainerRef.current && currentPly > 0) {
      const activeRow = moveListContainerRef.current.querySelector(`[data-ply="${currentPly}"]`);
      if (activeRow) {
        activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentPly]);

  // Retry Mode Handlers
  const handleStartRetryMode = () => {
    if (!currentMoveAnalysis?.fenBefore) return;
    setRetryMode(true);
    setRetryStatus('idle');
    setRetryCustomChess(new Chess(currentMoveAnalysis.fenBefore));
    setShowHint(false);
    setSandboxMode(false);
    setTryLineActive(false);
  };

  const handleRetryMove = (from: Square, to: Square, promotion?: string): boolean => {
    if (!currentMoveAnalysis || !retryCustomChess) return false;

    const isCorrect =
      currentMoveAnalysis.bestMoveFrom &&
      currentMoveAnalysis.bestMoveTo &&
      from === currentMoveAnalysis.bestMoveFrom &&
      to === currentMoveAnalysis.bestMoveTo;

    try {
      const copy = new Chess(retryCustomChess.fen());
      const move = copy.move({ from, to, promotion: promotion || 'q' });
      if (move) {
        setRetryCustomChess(copy);
        if (isCorrect) {
          setRetryStatus('success');
          sounds.playCheckmate();
        } else {
          setRetryStatus('incorrect');
          sounds.playDefeat();
        }
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  // Sandbox Handlers
  const handleSandboxMove = (from: Square, to: Square, promotion?: string): boolean => {
    try {
      const m = sandboxChess.move({ from, to, promotion: promotion || 'q' });
      if (m) {
        setSandboxLastMove({ from: m.from as Square, to: m.to as Square });
        setSandboxEval(evaluatePosition(sandboxChess));
        sounds.playMove();
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  // "Try the Line" Handlers
  const handleStartTryLine = () => {
    if (!currentMoveAnalysis?.suggestedLine || currentMoveAnalysis.suggestedLine.length === 0) return;
    setTryLineActive(true);
    setLineHistory([]);
    setSandboxMode(false);
    setRetryMode(false);
    setRetryCustomChess(null);
  };

  const handlePlayFromHere = () => {
    if (onPlayFromPosition) {
      onPlayFromPosition(currentChess.fen(), currentChess.turn());
    } else {
      const c = new Chess(currentChess.fen());
      setSandboxChess(c);
      setSandboxEval(evaluatePosition(c));
      setSandboxLastMove(lastMove);
      setSandboxMode(true);
      showToast('Entered Sandbox Mode from current position');
    }
  };

  // Move Classification Counts
  const classCounts = useMemo(() => {
    const counts = {
      brilliant: 0,
      great: 0,
      good: 0,
      inaccuracy: 0,
      mistake: 0,
      blunder: 0,
    };
    for (const m of analysis.moves) {
      if (m.classification === 'brilliant') counts.brilliant++;
      else if (m.classification === 'great') counts.great++;
      else if (m.classification === 'good' || m.classification === 'best' || m.classification === 'excellent') counts.good++;
      else if (m.classification === 'inaccuracy') counts.inaccuracy++;
      else if (m.classification === 'mistake') counts.mistake++;
      else if (m.classification === 'blunder' || m.classification === 'missed_win') counts.blunder++;
    }
    return counts;
  }, [analysis.moves]);

  // Eval Graph Points & Spline Calculation
  const graphWidth = 320;
  const graphHeight = 70;
  const numPoints = analysis.moves.length;
  const points = useMemo(() => {
    if (numPoints === 0) return [];
    return analysis.moves.map((m, idx) => {
      const x = (idx / Math.max(1, numPoints - 1)) * graphWidth;
      const clampedEval = Math.max(-1000, Math.min(1000, m.evalAfter));
      const y = graphHeight / 2 - (clampedEval / 1000) * (graphHeight / 2 - 6);
      return { x, y, eval: m.evalAfter, ply: m.ply, san: m.san, classification: m.classification };
    });
  }, [analysis.moves, graphWidth, graphHeight, numPoints]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`, '');
  }, [points]);

  // Current Eval Display Formatter
  const currentEvalNumber = (currentMoveAnalysis?.evalAfter ? currentMoveAnalysis.evalAfter / 100 : 0).toFixed(2);
  const currentEvalText =
    currentMoveAnalysis && currentMoveAnalysis.evalAfter > 30
      ? 'White is better'
      : currentMoveAnalysis && currentMoveAnalysis.evalAfter < -30
      ? 'Black is better'
      : 'Equal position';

  // Pair moves for the 2-column move table
  const movePairs = useMemo(() => {
    const pairs: Array<{
      moveNum: number;
      white?: MoveAnalysis;
      black?: MoveAnalysis;
    }> = [];

    for (let i = 0; i < analysis.moves.length; i += 2) {
      pairs.push({
        moveNum: Math.floor(i / 2) + 1,
        white: analysis.moves[i],
        black: analysis.moves[i + 1],
      });
    }
    return pairs;
  }, [analysis.moves]);

  const isUserWhite = game.playerColor === 'w';
  const userAccuracy = isUserWhite ? analysis.accuracyWhite : analysis.accuracyBlack;
  const userPerf = isUserWhite ? analysis.performanceWhite : analysis.performanceBlack;
  const oppAccuracy = isUserWhite ? analysis.accuracyBlack : analysis.accuracyWhite;
  const oppPerf = isUserWhite ? analysis.performanceBlack : analysis.performanceWhite;
  const oppName = isUserWhite ? game.blackPlayer : game.whitePlayer;

  // Key moment cards
  const keyMomentCards = useMemo(() => {
    if (analysis.moves.length === 0) return [];
    const important = analysis.moves.filter(
      (m) =>
        m.classification === 'best' ||
        m.classification === 'excellent' ||
        m.classification === 'book' ||
        m.classification === 'great' ||
        m.classification === 'brilliant' ||
        m.classification === 'blunder'
    );
    if (important.length > 0) return important.slice(0, 3);
    return analysis.moves.slice(0, 3);
  }, [analysis.moves]);

  const getMoveIcon = (cls: MoveClassification) => {
    switch (cls) {
      case 'book':
        return <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'best':
        return <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 shrink-0" />;
      case 'excellent':
      case 'great':
        return <ThumbsUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'brilliant':
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'mistake':
      case 'inaccuracy':
        return <AlertCircle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />;
      case 'blunder':
      case 'missed_win':
        return <X className="w-3.5 h-3.5 text-red-400 shrink-0" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-5 lg:px-8 py-3 md:py-5 pb-24 md:pb-8 animate-fade-in select-none text-zinc-100">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-blue-400/40 text-xs font-bold animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          TOP BAR: BACK TO LOBBY, TITLE & MATCH RESULT
          ========================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <button
            type="button"
            onClick={onBackToGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lobby</span>
          </button>

          {/* Mobile match result */}
          <div className="sm:hidden flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-800/60">
              {analysis.openingEco || 'B01'}
            </span>
            <div className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono font-bold text-xs text-white">
              {game.result === '1-0' ? '1 - 0' : game.result === '0-1' ? '0 - 1' : '½ - ½'}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-sm sm:text-base md:text-xl font-black text-white flex items-center justify-center gap-1.5">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
            <span>Grandmaster Game Review & Coach Analysis</span>
          </h2>
          <div className="hidden sm:flex items-center justify-center gap-2 mt-0.5">
            <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-800/60">
              {analysis.openingEco || 'B01'}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {analysis.openingName || 'Scandinavian Defense'}
            </span>
          </div>
        </div>

        <div className="hidden sm:block text-right">
          <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono font-black text-xs sm:text-sm text-white">
            {game.result === '1-0' ? '1 - 0' : game.result === '0-1' ? '0 - 1' : '½ - ½'}
          </div>
          <span className="text-[10px] text-zinc-400 block mt-0.5 capitalize">
            {game.result === '1-0' ? 'White wins' : game.result === '0-1' ? 'Black wins' : 'Game drawn'}
          </span>
        </div>
      </div>

      {/* =========================================================
          TOP STATS ROW: 4-SECTION LUXURY BANNER
          ========================================================= */}
      <div className="bg-[#121620] border border-slate-800/90 rounded-3xl p-3.5 sm:p-5 shadow-2xl mb-4 sm:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 lg:gap-6 items-center">
          {/* Section 1: Coach Boris (4 cols) */}
          <div className="sm:col-span-2 md:col-span-4 flex items-start gap-3 pr-0 md:pr-3 border-b md:border-b-0 md:border-r border-slate-800/80 pb-3 md:pb-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 border border-indigo-400/40 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-lg shadow-indigo-600/30">
              🧙‍♂️
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white">Coach Boris</h3>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
                  AI Review
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2 md:line-clamp-3">
                {analysis.gameNarrative}
              </p>
            </div>
          </div>

          {/* Section 2: Your Performance (2.5 cols) */}
          <div className="sm:col-span-1 md:col-span-2 bg-slate-900/60 rounded-2xl p-3 border border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">You</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">{userAccuracy}%</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-sm sm:text-base font-black text-white font-mono">{userPerf} Elo</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                style={{ width: `${userAccuracy}%` }}
              />
            </div>
          </div>

          {/* Section 3: Opponent Performance (2.5 cols) */}
          <div className="sm:col-span-1 md:col-span-2 bg-slate-900/60 rounded-2xl p-3 border border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-700 flex items-center justify-center text-[9px]">♟</div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 truncate max-w-[85px]">{oppName}</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">{oppAccuracy}%</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-sm sm:text-base font-black text-white font-mono">{oppPerf} Elo</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-slate-600 rounded-full"
                style={{ width: `${oppAccuracy}%` }}
              />
            </div>
          </div>

          {/* Section 4: Game Accuracy Donut & Ledger (3 cols) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 flex items-center justify-between gap-3 bg-slate-900/80 rounded-2xl p-2.5 sm:p-3 border border-slate-800/80">
            {/* Donut Chart */}
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 mb-1">Accuracy</span>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-500"
                    strokeDasharray={`${userAccuracy}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] sm:text-xs font-black text-white font-mono">{userAccuracy}%</span>
              </div>
            </div>

            {/* Classification List */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[9px] sm:text-[10px] font-medium text-slate-300 flex-1">
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Brilliant</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.brilliant}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Inaccuracy</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.inaccuracy}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Great</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.great}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Mistake</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.mistake}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Good</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.good}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Blunder</span>
                <span className="font-mono font-bold text-slate-400">{classCounts.blunder}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN 3-COLUMN REVIEW ARENA
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
        {/* =========================================================
            COLUMN 1: SIDEBAR STRIP + MAIN CHESSBOARD + REPLAY DECK (5.5 cols)
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full justify-center">
            {/* Toolbar Strip (Horizontal on small mobile, vertical on sm+) */}
            <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-2 bg-[#121620] border border-slate-800/90 p-1 sm:p-1.5 rounded-2xl shrink-0 w-full sm:w-auto justify-around sm:justify-start">
              <button
                type="button"
                onClick={() => setActiveSidebarTab('board')}
                className={`p-1.5 sm:p-2 rounded-xl flex items-center sm:flex-col gap-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSidebarTab === 'board'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Board</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('moves')}
                className={`p-1.5 sm:p-2 rounded-xl flex items-center sm:flex-col gap-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSidebarTab === 'moves'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Moves</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('info')}
                className={`p-1.5 sm:p-2 rounded-xl flex items-center sm:flex-col gap-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSidebarTab === 'info'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Info</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('openings')}
                className={`p-1.5 sm:p-2 rounded-xl flex items-center sm:flex-col gap-1 text-[10px] font-bold transition cursor-pointer ${
                  activeSidebarTab === 'openings'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Openings</span>
              </button>

              <div className="hidden sm:block w-full h-px bg-slate-800 my-0.5" />

              <button
                type="button"
                onClick={() => setFlipped(!flipped)}
                title="Flip Board Orientation"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 flex items-center sm:flex-col gap-1 text-[9px] font-bold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Flip</span>
              </button>
            </div>

            {/* Chessboard */}
            <div className="w-full max-w-[min(100vw-32px,460px)] flex justify-center">
              <Chessboard
                chess={currentChess}
                boardThemeId={boardThemeId}
                pieceThemeId={pieceThemeId}
                flipped={flipped}
                interactive={retryMode || sandboxMode}
                lastMove={lastMove}
                arrows={arrows}
                evalScore={sandboxMode ? sandboxEval : currentMoveAnalysis?.evalAfter || 0}
                showEvalBar={true}
                onMove={retryMode ? handleRetryMove : sandboxMode ? handleSandboxMove : undefined}
              />
            </div>
          </div>

          {/* Comprehensive Replay & Move Scrubber Control Deck */}
          <div className="mt-2.5 bg-[#121620] border border-slate-800/90 rounded-2xl p-2.5 shadow-xl space-y-2 w-full max-w-[min(100vw-32px,520px)]">
            <div className="flex items-center justify-between gap-1">
              {/* Stepper Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleFirst}
                  disabled={currentPly === 0}
                  title="Start Position (Home / Up Arrow)"
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ChevronsLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPly === 0}
                  title="Previous Move (Left Arrow)"
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Auto Replay Play/Pause Button */}
                <button
                  type="button"
                  onClick={handleToggleReplay}
                  title="Auto Play / Pause Replay (Spacebar)"
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Replay</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPly >= totalPlies}
                  title="Next Move (Right Arrow)"
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleLast}
                  disabled={currentPly >= totalPlies}
                  title="Final Position (End / Down Arrow)"
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ChevronsRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Speed Toggle & Feature Badges */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed((s) => (s === 1 ? 2 : s === 2 ? 3 : 1))}
                  title="Replay Playback Speed"
                  className="px-2 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[10px] sm:text-[11px] font-mono font-bold text-blue-400 cursor-pointer"
                >
                  {playbackSpeed}x Speed
                </button>

                <button
                  type="button"
                  onClick={() => setShowArrows(!showArrows)}
                  title="Toggle Best Move Recommendation Arrows"
                  className={`p-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    showArrows
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Move Scrubber */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="range"
                min="0"
                max={totalPlies}
                value={currentPly}
                onChange={(e) => handleSelectPly(parseInt(e.target.value, 10))}
                className="flex-1 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-[10px] font-mono text-slate-400 font-bold shrink-0">
                Ply {currentPly}/{totalPlies}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            COLUMN 2: MOVES LIST TABLE & STEP CONTROLS (3.5 cols)
            ========================================================= */}
        <div className="lg:col-span-3 bg-[#121620] border border-slate-800/90 rounded-3xl p-3 sm:p-3.5 shadow-2xl flex flex-col h-[340px] lg:h-[520px] w-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 px-1">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Moves</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-bold">
              {analysis.moves.length} Plies
            </span>
          </div>

          {/* Move Rows Scrollable List */}
          <div
            ref={moveListContainerRef}
            className="flex-1 overflow-y-auto pr-1 py-1.5 space-y-1 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {movePairs.map((pair) => {
              const whitePly = (pair.moveNum - 1) * 2 + 1;
              const blackPly = pair.moveNum * 2;
              const isWhiteSelected = currentPly === whitePly;
              const isBlackSelected = currentPly === blackPly;

              return (
                <div
                  key={pair.moveNum}
                  className="grid grid-cols-12 items-center text-xs py-1 px-1.5 rounded-xl hover:bg-slate-800/50 transition font-mono"
                >
                  <span className="col-span-2 text-slate-500 font-bold">{pair.moveNum}.</span>

                  {/* White Move */}
                  {pair.white ? (
                    <button
                      type="button"
                      data-ply={whitePly}
                      onClick={() => handleSelectPly(whitePly)}
                      className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-lg text-left transition cursor-pointer ${
                        isWhiteSelected
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span>{pair.white.san}</span>
                      {getMoveIcon(pair.white.classification)}
                    </button>
                  ) : (
                    <div className="col-span-5" />
                  )}

                  {/* Black Move */}
                  {pair.black ? (
                    <button
                      type="button"
                      data-ply={blackPly}
                      onClick={() => handleSelectPly(blackPly)}
                      className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-lg text-left transition cursor-pointer ${
                        isBlackSelected
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span>{pair.black.san}</span>
                      {getMoveIcon(pair.black.classification)}
                    </button>
                  ) : (
                    <div className="col-span-5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Move Stepper & "Play from here" Button */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPly === 0}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePlayFromHere}
              className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition transform active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="truncate">Play from here</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPly >= totalPlies}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================
            COLUMN 3: COACH INSIGHTS & GAME OVERVIEW GRAPH (3.5 cols)
            ========================================================= */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4 w-full">
          {/* Top Card: Coach Insights */}
          <div className="bg-[#121620] border border-slate-800/90 rounded-3xl p-3.5 sm:p-4 shadow-2xl space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Coach Insights</h3>
            </div>

            {/* Active Move Detail or Dynamic Key Moments */}
            {currentMoveAnalysis ? (
              <div className="space-y-2.5 animate-fade-in">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="mt-0.5 shrink-0">{getMoveIcon(currentMoveAnalysis.classification)}</div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block capitalize">
                        {currentMoveAnalysis.classification.replace('_', ' ')} Move
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {currentMoveAnalysis.coachExplanation ||
                          `${currentMoveAnalysis.san} maintains solid pressure and controls key central files.`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-md shrink-0">
                    {currentMoveAnalysis.evalAfter >= 0 ? '+' : ''}
                    {(currentMoveAnalysis.evalAfter / 100).toFixed(2)}
                  </span>
                </div>

                {/* Retry Puzzle Mode */}
                {(currentMoveAnalysis.classification === 'blunder' ||
                  currentMoveAnalysis.classification === 'mistake' ||
                  currentMoveAnalysis.classification === 'missed_win') && (
                  <button
                    type="button"
                    onClick={handleStartRetryMode}
                    className="w-full py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Retry Move Puzzle</span>
                  </button>
                )}

                {/* Continuation Line */}
                {currentMoveAnalysis.suggestedLine && currentMoveAnalysis.suggestedLine.length > 0 && (
                  <button
                    type="button"
                    onClick={handleStartTryLine}
                    className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Try Engine Line</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {keyMomentCards.map((km, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPly(km.ply)}
                    className="w-full p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex items-start justify-between gap-2 text-left transition cursor-pointer"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="mt-0.5 shrink-0">{getMoveIcon(km.classification)}</div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block capitalize truncate">
                          {km.classification.replace('_', ' ')}: {km.san}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                          {km.coachExplanation || `${km.san} key theoretical decision.`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">
                      {km.evalAfter >= 0 ? '+' : ''}
                      {(km.evalAfter / 100).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Card: Game Overview Graph */}
          <div className="bg-[#121620] border border-slate-800/90 rounded-3xl p-3.5 sm:p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Game Overview</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Spline Area Chart */}
              <div className="flex-1 relative h-16 sm:h-20 bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800/80">
                <svg
                  viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                  className="w-full h-full cursor-pointer"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1={graphHeight / 2}
                    x2={graphWidth}
                    y2={graphHeight / 2}
                    stroke="#334155"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                  {pathD && (
                    <path
                      d={`${pathD} L ${graphWidth},${graphHeight / 2} L 0,${graphHeight / 2} Z`}
                      fill="rgba(59, 130, 246, 0.15)"
                    />
                  )}
                  {pathD && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Active Move Indicator Line */}
                  {currentPly > 0 && points[currentPly - 1] && (
                    <>
                      <line
                        x1={points[currentPly - 1].x}
                        y1="0"
                        x2={points[currentPly - 1].x}
                        y2={graphHeight}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={points[currentPly - 1].x}
                        cy={points[currentPly - 1].y}
                        r="3.5"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                </svg>
              </div>

              {/* Numerical Eval Score Indicator */}
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-black text-white font-mono block">
                  {currentEvalNumber}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block">
                  {currentEvalText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM QUICK ACTIONS TOOLBAR & GENERAL RATING
          ========================================================= */}
      <div className="mt-4 sm:mt-5 p-3 sm:p-3.5 rounded-2xl bg-[#121620] border border-slate-800/90 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shadow-xl">
        {/* Left: Quick Actions & Star Rating */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Quick Actions</span>
          </div>

          {/* Interactive 5-Star Rating Widget */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 mr-0.5">Rate Analysis:</span>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hoveredStar || userGameRating);
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => {
                    setUserGameRating(star);
                    showToast(`Rated ${star}/5 Stars! Accuracy feedback saved.`);
                  }}
                  className="p-0.5 text-slate-500 hover:text-amber-400 transition cursor-pointer"
                >
                  <Star
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
            {userGameRating > 0 && (
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 font-mono ml-0.5">
                {userGameRating}/5
              </span>
            )}
          </div>
        </div>

        {/* Right: Export & Utility Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Download PGN */}
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([game.pgn], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `apex_chess_match_${game.id}.pgn`;
              a.click();
              showToast('PGN downloaded successfully');
            }}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PGN</span>
          </button>

          {/* Share Game */}
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(game.pgn);
              showToast('Game PGN copied to clipboard');
            }}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Game</span>
          </button>

          {/* Save Game */}
          <button
            type="button"
            onClick={() => showToast('Match saved to archive')}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Game</span>
          </button>

          {/* Report Issue */}
          <button
            type="button"
            onClick={() => showToast('Feedback recorded')}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition cursor-pointer"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
