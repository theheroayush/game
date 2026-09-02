import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';
import {
  GameRecord,
  PlayerColor,
  SideSelection,
  AIPersonalityId,
  TimeControlConfig,
  AppSettings,
  UserStats,
  OpeningData,
  NavigationTab,
} from './types/chess';
import { DIFFICULTY_LEVELS, AI_PERSONALITIES, TIME_CONTROLS } from './engine/engineConfig';
import { engineService } from './engine/engineService';
import { evaluatePosition, PIECE_VALUES } from './engine/evaluation';
import { findOpeningByMoves } from './data/openings';
import {
  loadSettings,
  saveSettings,
  loadStats,
  saveStats,
  loadGames,
  saveGame,
} from './utils/storage';
import { sounds } from './utils/sound';
import { voiceCoach } from './utils/voiceCoach';
import { haptics } from './utils/haptics';

import { Navbar } from './components/Navbar';
import { PlayLobby } from './components/PlayLobby';
import { Chessboard } from './components/Chessboard';
import { PlayerCard } from './components/PlayerCard';
import { MoveHistory } from './components/MoveHistory';
import { GameOverModal } from './components/GameOverModal';
import { AnalysisView } from './components/AnalysisView';
import { OpeningExplorer } from './components/OpeningExplorer';
import { GameHistoryView } from './components/GameHistoryView';
import { ProfileView } from './components/ProfileView';
import { SettingsModal } from './components/SettingsModal';
import { PuzzleView } from './components/PuzzleView';
import { EndgameTrainer } from './components/EndgameTrainer';
import { BoardEditor } from './components/BoardEditor';
import { VisualizationTrainer } from './components/VisualizationTrainer';

export const App: React.FC = () => {
  // Navigation & Settings State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('play');
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const [settings, setSettings] = useState<AppSettings>(() => {
    const loaded = loadSettings();
    return {
      ...loaded,
      voiceCoachEnabled: loaded.voiceCoachEnabled ?? false,
      hapticsEnabled: loaded.hapticsEnabled ?? true,
    };
  });
  const [stats, setStats] = useState<UserStats>(loadStats);
  const [games, setGames] = useState<GameRecord[]>(loadGames);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync settings with services on init
  useEffect(() => {
    sounds.setEnabled(settings.soundEnabled);
    sounds.setVolume(settings.soundVolume);
    voiceCoach.setEnabled(settings.voiceCoachEnabled);
    voiceCoach.setVolume(settings.soundVolume);
  }, [settings]);

  // Active Game Configuration
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameover'>('lobby');
  const [difficultyLevel, setDifficultyLevel] = useState<number>(3); // Default 1000 Elo Casual
  const [personality, setPersonality] = useState<AIPersonalityId>('balanced');
  const [sideSelection, setSideSelection] = useState<SideSelection>('w');
  const [playerColor, setPlayerColor] = useState<PlayerColor>('w');
  const [timeControl, setTimeControl] = useState<TimeControlConfig>(TIME_CONTROLS[1]); // 3+2 Blitz default
  const [flippedBoard, setFlippedBoard] = useState<boolean>(false);

  // Live Chess Board State
  const [chess] = useState<Chess>(() => new Chess());
  const [turn, setTurn] = useState<Color>('w');
  const [, setRenderTrigger] = useState<number>(0);
  const forceRender = useCallback(() => setRenderTrigger((n) => n + 1), []);

  const [movesHistory, setMovesHistory] = useState<{ san: string; ply: number }[]>([]);
  const [currentPly, setCurrentPly] = useState<number>(0);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [evalScore, setEvalScore] = useState<number>(20);

  // Clocks State (seconds)
  const [whiteTime, setWhiteTime] = useState<number>(180);
  const [blackTime, setBlackTime] = useState<number>(180);
  const clockTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Game End & Active Game Record
  const [completedGame, setCompletedGame] = useState<GameRecord | null>(null);
  const [selectedGameForAnalysis, setSelectedGameForAnalysis] = useState<GameRecord | null>(null);

  const diffConfig = DIFFICULTY_LEVELS.find((d) => d.level === difficultyLevel) || DIFFICULTY_LEVELS[2];
  const persConfig = AI_PERSONALITIES.find((p) => p.id === personality) || AI_PERSONALITIES[0];

  // Material evaluation and captured pieces tracking
  const { whiteCaptured, blackCaptured, materialAdvantage } = React.useMemo(() => {
    const board = chess.board();
    const currentCounts: Record<PieceSymbol, { w: number; b: number }> = {
      p: { w: 0, b: 0 },
      n: { w: 0, b: 0 },
      b: { w: 0, b: 0 },
      r: { w: 0, b: 0 },
      q: { w: 0, b: 0 },
      k: { w: 0, b: 0 },
    };

    board.forEach((row) => {
      row.forEach((piece) => {
        if (piece) {
          currentCounts[piece.type][piece.color]++;
        }
      });
    });

    const startingCounts: Record<PieceSymbol, number> = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 };
    const wCaptured: PieceSymbol[] = [];
    const bCaptured: PieceSymbol[] = [];

    (Object.keys(startingCounts) as PieceSymbol[]).forEach((ptype) => {
      const missingWhite = startingCounts[ptype] - currentCounts[ptype].w;
      const missingBlack = startingCounts[ptype] - currentCounts[ptype].b;
      for (let i = 0; i < missingWhite; i++) bCaptured.push(ptype);
      for (let i = 0; i < missingBlack; i++) wCaptured.push(ptype);
    });

    let wScore = 0;
    let bScore = 0;
    (Object.keys(PIECE_VALUES) as PieceSymbol[]).forEach((ptype) => {
      if (ptype !== 'k') {
        wScore += currentCounts[ptype].w * PIECE_VALUES[ptype];
        bScore += currentCounts[ptype].b * PIECE_VALUES[ptype];
      }
    });

    const diff = Math.round((wScore - bScore) / 100);
    return {
      whiteCaptured: wCaptured,
      blackCaptured: bCaptured,
      materialAdvantage: diff,
    };
  }, [chess]);

  // Handle Game End
  const handleGameOver = useCallback(
    (reason: GameRecord['reason'], winner?: 'white' | 'black' | 'draw') => {
      if (clockTimerRef.current) clearInterval(clockTimerRef.current);

      let res: GameRecord['result'] = '*';
      if (winner === 'white') res = '1-0';
      else if (winner === 'black') res = '0-1';
      else if (winner === 'draw') res = '1/2-1/2';

      const matchOpening = findOpeningByMoves(movesHistory.map((m) => m.san));
      const pgnString =
        chess.pgn() ||
        movesHistory
          .map((m, i) => `${i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}${m.san}`)
          .join(' ');

      const gameRecord: GameRecord = {
        id: `game_${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pgn: pgnString || '1. e4 e5',
        finalFen: chess.fen(),
        result: res,
        winner,
        reason,
        playerColor,
        difficultyLevel,
        personality,
        timeControl: timeControl.label,
        whitePlayer: playerColor === 'w' ? 'You' : `${diffConfig.name} (${persConfig.name})`,
        blackPlayer: playerColor === 'b' ? 'You' : `${diffConfig.name} (${persConfig.name})`,
        whiteElo: playerColor === 'w' ? stats.rating : diffConfig.elo,
        blackElo: playerColor === 'b' ? stats.rating : diffConfig.elo,
        movesCount: movesHistory.length,
        openingEco: matchOpening?.eco,
        openingName: matchOpening?.name,
      };

      // Sound & Haptic
      const playerWon = (res === '1-0' && playerColor === 'w') || (res === '0-1' && playerColor === 'b');
      if (playerWon) {
        sounds.playCheckmate();
        haptics.victory();
      } else {
        sounds.playDefeat();
      }

      // Persist game
      saveGame(gameRecord);
      setGames(loadGames());
      setStats(loadStats());

      setCompletedGame(gameRecord);
      setSelectedGameForAnalysis(gameRecord);
      setGameState('gameover');
    },
    [chess, movesHistory, playerColor, difficultyLevel, personality, timeControl, diffConfig, persConfig, stats.rating]
  );

  const gameOverRef = useRef(handleGameOver);
  gameOverRef.current = handleGameOver;

  // Stable Clock Countdown Ticker
  useEffect(() => {
    if (gameState !== 'playing' || timeControl.category === 'none') {
      if (clockTimerRef.current) {
        clearInterval(clockTimerRef.current);
        clockTimerRef.current = null;
      }
      return;
    }

    clockTimerRef.current = setInterval(() => {
      if (turn === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            gameOverRef.current('timeout', 'black');
            return 0;
          }
          if (prev === 15) sounds.playLowTimeTick();
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            gameOverRef.current('timeout', 'white');
            return 0;
          }
          if (prev === 15) sounds.playLowTimeTick();
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (clockTimerRef.current) {
        clearInterval(clockTimerRef.current);
        clockTimerRef.current = null;
      }
    };
  }, [gameState, timeControl, turn]);

  // AI Turn Execution
  const triggerAIMove = useCallback(async () => {
    if (gameState !== 'playing' || chess.isGameOver()) return;
    const currentTurn = chess.turn();
    if (currentTurn === playerColor) return;

    setIsAIThinking(true);
    try {
      const moveSans = chess.history();
      const aiResult = await engineService.getBestMove(
        chess.fen(),
        difficultyLevel,
        personality,
        moveSans
      );

      const move = chess.move({
        from: aiResult.from,
        to: aiResult.to,
        promotion: aiResult.promotion || 'q',
      });

      if (move) {
        const nextTurn = chess.turn();
        setTurn(nextTurn);
        setLastMove({ from: move.from, to: move.to });
        const newHist = chess.history().map((s, idx) => ({ san: s, ply: idx + 1 }));
        setMovesHistory(newHist);
        setCurrentPly(newHist.length);

        // Sound, Haptic & Voice Commentary
        if (move.captured) {
          sounds.playCapture();
          haptics.capture();
        } else if (move.san.includes('O-O')) {
          sounds.playCastle();
          haptics.move();
        } else {
          sounds.playMove();
          haptics.move();
        }

        if (chess.inCheck()) {
          sounds.playCheck();
          haptics.check();
        }

        voiceCoach.announceMove(move.san, !!move.captured, chess.inCheck(), chess.isCheckmate());

        // Increment clock
        if (timeControl.incrementSeconds > 0) {
          if (currentTurn === 'w') setWhiteTime((t) => t + timeControl.incrementSeconds);
          else setBlackTime((t) => t + timeControl.incrementSeconds);
        }

        // Eval update
        setEvalScore(evaluatePosition(chess, personality));
        forceRender();

        // Check if game over
        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            handleGameOver('checkmate', currentTurn === 'w' ? 'white' : 'black');
          } else if (chess.isStalemate()) {
            handleGameOver('stalemate', 'draw');
          } else if (chess.isThreefoldRepetition()) {
            handleGameOver('threefold', 'draw');
          } else if (chess.isInsufficientMaterial()) {
            handleGameOver('insufficient', 'draw');
          } else {
            handleGameOver('50move', 'draw');
          }
        }
      }
    } catch (err) {
      console.error('AI move execution error:', err);
    } finally {
      setIsAIThinking(false);
    }
  }, [gameState, chess, playerColor, difficultyLevel, personality, timeControl, forceRender, handleGameOver]);

  // Start a New Game
  const handleStartGame = (customOpening?: OpeningData) => {
    chess.reset();
    let assignedColor: PlayerColor = 'w';
    if (sideSelection === 'random') {
      assignedColor = Math.random() < 0.5 ? 'w' : 'b';
    } else {
      assignedColor = sideSelection;
    }
    setPlayerColor(assignedColor);
    setFlippedBoard(assignedColor === 'b');
    setTurn('w');

    const baseSecs = timeControl.baseMinutes * 60;
    setWhiteTime(baseSecs);
    setBlackTime(baseSecs);

    const initialMoves: { san: string; ply: number }[] = [];

    if (customOpening) {
      for (const san of customOpening.moves) {
        const m = chess.move(san);
        if (m) {
          initialMoves.push({ san: m.san, ply: initialMoves.length + 1 });
        }
      }
      setTurn(chess.turn());
    }

    setMovesHistory(initialMoves);
    setCurrentPly(initialMoves.length);
    setLastMove(null);
    setEvalScore(20);
    setCompletedGame(null);
    setSelectedGameForAnalysis(null);
    setIsAIThinking(false);
    setGameState('playing');
    setCurrentTab('play');
    window.scrollTo({ top: 0, behavior: 'instant' });
    forceRender();

    // If AI is White, trigger AI move
    if (assignedColor === 'b' && initialMoves.length % 2 === 0) {
      setTimeout(() => triggerAIMove(), 300);
    }
  };

  // Launch Play vs AI from custom Board Editor position
  const handlePlayFromCustomPosition = (fen: string, sideToMove: 'w' | 'b') => {
    try {
      chess.load(fen);
      setPlayerColor(sideToMove);
      setFlippedBoard(sideToMove === 'b');
      setTurn(chess.turn());

      const baseSecs = timeControl.baseMinutes * 60;
      setWhiteTime(baseSecs);
      setBlackTime(baseSecs);

      setMovesHistory([]);
      setCurrentPly(0);
      setLastMove(null);
      setEvalScore(evaluatePosition(chess, personality));
      setCompletedGame(null);
      setSelectedGameForAnalysis(null);
      setIsAIThinking(false);
      setGameState('playing');
      setCurrentTab('play');
      forceRender();

      if (chess.turn() !== sideToMove) {
        setTimeout(() => triggerAIMove(), 300);
      }
    } catch {
      alert('Invalid FEN position');
    }
  };

  // Launch Coach Analysis for custom FEN
  const handleAnalyzeCustomPosition = (fen: string) => {
    const customRec: GameRecord = {
      id: `custom_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      pgn: '1. e4 e5',
      finalFen: fen,
      result: '*',
      reason: 'agreement',
      playerColor: 'w',
      difficultyLevel: 5,
      personality: 'balanced',
      timeControl: 'Custom Setup',
      whitePlayer: 'Custom Position',
      blackPlayer: 'Coach Analysis',
      whiteElo: 1500,
      blackElo: 1500,
      movesCount: 0,
    };
    setSelectedGameForAnalysis(customRec);
    setCurrentTab('analysis');
  };

  // Handle Player Move Input
  const handlePlayerMove = (from: Square, to: Square, promotion?: string): boolean => {
    if (gameState !== 'playing' || isAIThinking) return false;
    if (chess.turn() !== playerColor) return false;

    try {
      const move = chess.move({ from, to, promotion: promotion || (settings.autoQueen ? 'q' : undefined) });
      if (!move) return false;

      const nextTurn = chess.turn();
      setTurn(nextTurn);
      setLastMove({ from: move.from, to: move.to });
      const newHist = chess.history().map((s, idx) => ({ san: s, ply: idx + 1 }));
      setMovesHistory(newHist);
      setCurrentPly(newHist.length);

      // Play Sound, Haptics & Voice
      if (move.captured) {
        sounds.playCapture();
        haptics.capture();
      } else if (move.san.includes('O-O')) {
        sounds.playCastle();
        haptics.move();
      } else {
        sounds.playMove();
        haptics.move();
      }

      if (chess.inCheck()) {
        sounds.playCheck();
        haptics.check();
      }

      voiceCoach.announceMove(move.san, !!move.captured, chess.inCheck(), chess.isCheckmate());

      // Add increment
      if (timeControl.incrementSeconds > 0) {
        if (playerColor === 'w') setWhiteTime((t) => t + timeControl.incrementSeconds);
        else setBlackTime((t) => t + timeControl.incrementSeconds);
      }

      setEvalScore(evaluatePosition(chess, personality));
      forceRender();

      // Check Game Over
      if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
          handleGameOver('checkmate', playerColor === 'w' ? 'white' : 'black');
        } else if (chess.isStalemate()) {
          handleGameOver('stalemate', 'draw');
        } else if (chess.isThreefoldRepetition()) {
          handleGameOver('threefold', 'draw');
        } else if (chess.isInsufficientMaterial()) {
          handleGameOver('insufficient', 'draw');
        } else {
          handleGameOver('50move', 'draw');
        }
        return true;
      }

      // Schedule AI turn
      setTimeout(() => triggerAIMove(), 200);
      return true;
    } catch {
      return false;
    }
  };

  // Undo Last Move
  const handleUndoMove = () => {
    if (gameState !== 'playing' || movesHistory.length === 0 || isAIThinking) return;

    if (chess.turn() === playerColor) {
      chess.undo();
      chess.undo();
      const updated = movesHistory.slice(0, -2);
      setMovesHistory(updated);
      setCurrentPly(updated.length);
    } else {
      chess.undo();
      const updated = movesHistory.slice(0, -1);
      setMovesHistory(updated);
      setCurrentPly(updated.length);
    }

    setTurn(chess.turn());
    const hist = chess.history({ verbose: true });
    const last = hist[hist.length - 1];
    setLastMove(last ? { from: last.from, to: last.to } : null);
    setEvalScore(evaluatePosition(chess, personality));
    sounds.playMove();
    forceRender();
  };

  const handleResign = () => {
    if (gameState !== 'playing') return;
    const confirmResign = window.confirm('Are you sure you want to resign this game?');
    if (confirmResign) {
      handleGameOver('resignation', playerColor === 'w' ? 'black' : 'white');
    }
  };

  const handleDrawOffer = () => {
    if (gameState !== 'playing') return;
    if (Math.abs(evalScore) < 60) {
      alert(`${diffConfig.name} accepted your draw offer!`);
      handleGameOver('agreement', 'draw');
    } else {
      alert(`${diffConfig.name} declined the draw offer and plays on.`);
    }
  };

  const handleSelectHistoryPly = (ply: number) => {
    const temp = new Chess();
    for (let i = 0; i < ply && i < movesHistory.length; i++) {
      temp.move(movesHistory[i].san);
    }
    setCurrentPly(ply);
    sounds.playMove();
  };

  const handleOpenAnalysis = (targetGame?: GameRecord) => {
    setGameState('lobby');
    let gameToAnalyze = targetGame;
    if (!gameToAnalyze && gameState === 'playing' && (movesHistory.length > 0 || chess.history().length > 0)) {
      const matchOpening = findOpeningByMoves(movesHistory.map((m) => m.san));
      const pgnString =
        chess.pgn() ||
        movesHistory
          .map((m, i) => `${i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}${m.san}`)
          .join(' ');

      gameToAnalyze = {
        id: `game_${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pgn: pgnString || '1. e4 e5',
        finalFen: chess.fen(),
        result: '*',
        reason: 'agreement',
        playerColor,
        difficultyLevel,
        personality,
        timeControl: timeControl.label,
        whitePlayer: playerColor === 'w' ? 'You' : `${diffConfig.name} (${persConfig.name})`,
        blackPlayer: playerColor === 'b' ? 'You' : `${diffConfig.name} (${persConfig.name})`,
        whiteElo: playerColor === 'w' ? stats.rating : diffConfig.elo,
        blackElo: playerColor === 'b' ? stats.rating : diffConfig.elo,
        movesCount: movesHistory.length,
        openingEco: matchOpening?.eco,
        openingName: matchOpening?.name,
      };
    } else if (!gameToAnalyze) {
      gameToAnalyze = completedGame || (games.length > 0 ? games[0] : undefined);
    }

    if (gameToAnalyze) {
      setSelectedGameForAnalysis(gameToAnalyze);
    }
    handleSelectTab('analysis');
  };

  const handleSolvePuzzle = (puzzleRating: number) => {
    setStats((prev) => {
      const updated = {
        ...prev,
        puzzlesSolved: prev.puzzlesSolved + 1,
        puzzleRating: prev.puzzleRating + Math.max(5, Math.round((puzzleRating - prev.puzzleRating) / 10)),
      };
      saveStats(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#0e1117] text-[#f0f6fc] flex flex-col font-sans">
      {/* Primary Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'play' && gameState === 'gameover') {
            setGameState('lobby');
          }
          if (tab === 'analysis') {
            handleOpenAnalysis();
          } else {
            handleSelectTab(tab);
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        userElo={stats.rating}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-2 md:pt-4 pb-16 lg:pb-12">
        {/* TAB 1: PLAY VS AI & LIVE GAME */}
        {currentTab === 'play' && (
          <>
            {gameState === 'lobby' ? (
              <PlayLobby
                difficultyLevel={difficultyLevel}
                onSelectDifficulty={setDifficultyLevel}
                personality={personality}
                onSelectPersonality={setPersonality}
                side={sideSelection}
                onSelectSide={setSideSelection}
                timeControl={timeControl}
                onSelectTimeControl={setTimeControl}
                onStartGame={() => handleStartGame()}
              />
            ) : (
              <div className="max-w-6xl mx-auto px-2 sm:px-4 py-1.5 md:py-3 pb-24 md:pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start">
                  {/* Left Board Column (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col items-center space-y-1.5 md:space-y-2">
                    {/* Opponent Card (Top) */}
                    <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))]">
                      <PlayerCard
                        name={playerColor === 'w' ? `${diffConfig.name}` : 'You'}
                        elo={playerColor === 'w' ? diffConfig.elo : stats.rating}
                        avatarBg={diffConfig.avatarBg}
                        isAI={playerColor === 'w'}
                        aiAvatar={persConfig.avatar}
                        color={playerColor === 'w' ? 'b' : 'w'}
                        isActive={turn === (playerColor === 'w' ? 'b' : 'w')}
                        isThinking={isAIThinking && turn === (playerColor === 'w' ? 'b' : 'w')}
                        timeLeftSeconds={playerColor === 'w' ? blackTime : whiteTime}
                        hasClock={timeControl.category !== 'none'}
                        capturedPieces={playerColor === 'w' ? blackCaptured : whiteCaptured}
                        materialAdvantage={
                          playerColor === 'w'
                            ? Math.max(0, -materialAdvantage)
                            : Math.max(0, materialAdvantage)
                        }
                        pieceThemeId={settings.pieceTheme}
                      />
                    </div>

                    {/* Main Board */}
                    <Chessboard
                      chess={chess}
                      boardThemeId={settings.boardTheme}
                      pieceThemeId={settings.pieceTheme}
                      flipped={flippedBoard}
                      interactive={gameState === 'playing' && !isAIThinking && turn === playerColor}
                      showCoordinates={settings.showCoordinates}
                      showLegalMoves={settings.showLegalMoves}
                      showLastMove={settings.showLastMove}
                      lastMove={lastMove}
                      evalScore={evalScore}
                      showEvalBar={true}
                      onMove={handlePlayerMove}
                    />

                    {/* Player Card (Bottom) */}
                    <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))]">
                      <PlayerCard
                        name={playerColor === 'w' ? 'You' : `${diffConfig.name}`}
                        elo={playerColor === 'w' ? stats.rating : diffConfig.elo}
                        avatarBg={diffConfig.avatarBg}
                        isAI={playerColor !== 'w'}
                        aiAvatar={persConfig.avatar}
                        color={playerColor}
                        isActive={turn === playerColor}
                        isThinking={false}
                        timeLeftSeconds={playerColor === 'w' ? whiteTime : blackTime}
                        hasClock={timeControl.category !== 'none'}
                        capturedPieces={playerColor === 'w' ? whiteCaptured : blackCaptured}
                        materialAdvantage={
                          playerColor === 'w'
                            ? Math.max(0, materialAdvantage)
                            : Math.max(0, -materialAdvantage)
                        }
                        pieceThemeId={settings.pieceTheme}
                      />
                    </div>
                  </div>

                  {/* Right Move History & Action Panel (5 cols) */}
                  <div className="lg:col-span-5 h-[420px] md:h-[min(70vh,580px)]">
                    <MoveHistory
                      moves={movesHistory}
                      currentPly={currentPly}
                      onSelectPly={handleSelectHistoryPly}
                      onUndo={handleUndoMove}
                      onResign={handleResign}
                      onDrawOffer={handleDrawOffer}
                      onFlip={() => setFlippedBoard(!flippedBoard)}
                      isGameOver={gameState !== 'playing'}
                      pgn={chess.pgn()}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 2: COACH ANALYSIS */}
        {currentTab === 'analysis' && (
          <AnalysisView
            game={
              (selectedGameForAnalysis && (selectedGameForAnalysis.movesCount ?? 0) > 0)
                ? selectedGameForAnalysis
                : (completedGame && (completedGame.movesCount ?? 0) > 0)
                ? completedGame
                : (games.find((g) => (g.movesCount ?? 0) > 0)) || {
                    id: 'demo_game',
                    date: 'Aug 16, 2026',
                    pgn: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qe6+ 4. Qe2 Qxe2+ 5. Bxe2 Nf6 6. d3 Bf5 7. Nf3 e6 8. O-O-O Bb4 9. Nb1 Nc6 10. Bd2 Bxd2+',
                    finalFen: 'r3k2r/ppp2ppp/2n1pn2/5b2/8/3P1N2/PPPBbPPP/1NKR3R b kq - 1 10',
                    result: '0-1',
                    reason: 'resignation',
                    playerColor: 'w',
                    difficultyLevel: 3,
                    personality: 'balanced',
                    timeControl: '3+2 Blitz',
                    whitePlayer: 'You',
                    blackPlayer: 'Casual (1000 Elo)',
                    whiteElo: 1200,
                    blackElo: 1000,
                    movesCount: 20,
                    openingEco: 'B01',
                    openingName: 'Scandinavian Defense',
                  }
            }
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
            onBackToGame={() => {
              setGameState('lobby');
              setCurrentTab('play');
            }}
            onPlayFromPosition={(fen, side) => handlePlayFromCustomPosition(fen, side)}
          />
        )}

        {/* TAB 3: TACTICAL PUZZLES & PUZZLE RUSH */}
        {currentTab === 'puzzles' && (
          <PuzzleView
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
            onSolvePuzzle={handleSolvePuzzle}
          />
        )}

        {/* TAB 4: MASTER ENDGAME DRILLS */}
        {currentTab === 'endgames' && (
          <EndgameTrainer
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
          />
        )}

        {/* TAB 5: MASTER OPENING EXPLORER */}
        {currentTab === 'openings' && (
          <OpeningExplorer
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
            onPlayOpening={(opening) => {
              handleStartGame(opening);
            }}
          />
        )}

        {/* TAB 6: INTERACTIVE BOARD EDITOR */}
        {currentTab === 'editor' && (
          <BoardEditor
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
            onPlayFromPosition={handlePlayFromCustomPosition}
            onAnalyzePosition={handleAnalyzeCustomPosition}
          />
        )}

        {/* TAB 7: VISUALIZATION & COORDINATE SPEED DRILLS */}
        {currentTab === 'drills' && (
          <VisualizationTrainer boardThemeId={settings.boardTheme} />
        )}

        {/* TAB 8: ARCHIVES & GAME HISTORY */}
        {currentTab === 'history' && (
          <GameHistoryView
            games={games}
            boardThemeId={settings.boardTheme}
            pieceThemeId={settings.pieceTheme}
            onSelectGameForAnalysis={(g) => {
              setSelectedGameForAnalysis(g);
              setCurrentTab('analysis');
            }}
            onImportPgn={(importedPgn) => {
              const testChess = new Chess();
              testChess.loadPgn(importedPgn);
              const customGame: GameRecord = {
                id: `imported_${Date.now()}`,
                date: new Date().toLocaleDateString(),
                pgn: importedPgn,
                finalFen: testChess.fen(),
                result: '*',
                reason: 'agreement',
                playerColor: 'w',
                difficultyLevel: 5,
                personality: 'balanced',
                timeControl: 'Standard',
                whitePlayer: 'White',
                blackPlayer: 'Black',
                whiteElo: 1500,
                blackElo: 1500,
                movesCount: testChess.history().length,
              };
              saveGame(customGame);
              setGames(loadGames());
              setSelectedGameForAnalysis(customGame);
              setCurrentTab('analysis');
            }}
          />
        )}

        {/* TAB 9: STATS & PLAYER PROFILE */}
        {currentTab === 'profile' && <ProfileView stats={stats} games={games} />}
      </main>

      {/* Game Over Modal */}
      {gameState === 'gameover' && currentTab === 'play' && completedGame && (
        <GameOverModal
          game={completedGame}
          onNewGame={() => {
            setGameState('lobby');
          }}
          onAnalyze={() => {
            handleOpenAnalysis(completedGame);
          }}
          onClose={() => {
            setGameState('lobby');
          }}
        />
      )}

      {/* Settings & Customization Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            saveSettings(newSettings);
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
