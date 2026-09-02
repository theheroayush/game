import React, { useState } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';
import { Chessboard } from './Chessboard';
import { ChessPiece } from './ChessPiece';
import { BoardThemeId, PieceThemeId } from '../types/chess';
import { sounds } from '../utils/sound';
import {
  Wrench,
  RotateCcw,
  Trash2,
  Play,
  Brain,
  Copy,
  Check,
  ClipboardPaste,
  ShieldCheck,
} from 'lucide-react';

interface BoardEditorProps {
  boardThemeId: BoardThemeId;
  pieceThemeId: PieceThemeId;
  onPlayFromPosition: (fen: string, sideToMove: 'w' | 'b') => void;
  onAnalyzePosition: (fen: string) => void;
}

type PaletteItem = { type: PieceSymbol; color: Color } | 'trash' | null;

export const BoardEditor: React.FC<BoardEditorProps> = ({
  boardThemeId,
  pieceThemeId,
  onPlayFromPosition,
  onAnalyzePosition,
}) => {
  const [chess, setChess] = useState<Chess>(() => new Chess());
  const [selectedPalette, setSelectedPalette] = useState<PaletteItem>(null);
  const [sideToMove, setSideToMove] = useState<Color>('w');
  const [customFenInput, setCustomFenInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generate current valid FEN string
  const currentFen = chess.fen();

  // Handle Square Click in Editor Mode
  const handleSquareClick = (square: Square) => {
    try {
      const fen = chess.fen();
      const temp = new Chess(fen);

      if (selectedPalette === 'trash') {
        temp.remove(square);
      } else if (selectedPalette) {
        temp.put({ type: selectedPalette.type, color: selectedPalette.color }, square);
      }

      setChess(temp);
      setErrorMessage(null);
      sounds.playMove();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    }
  };

  const handleClearBoard = () => {
    const empty = new Chess();
    empty.clear();
    setChess(empty);
    setErrorMessage(null);
  };

  const handleStartingPosition = () => {
    const start = new Chess();
    setChess(start);
    setSideToMove('w');
    setErrorMessage(null);
  };

  const handleCopyFen = () => {
    navigator.clipboard.writeText(currentFen);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadCustomFen = () => {
    try {
      const c = new Chess(customFenInput.trim());
      setChess(c);
      setSideToMove(c.turn());
      setErrorMessage(null);
    } catch {
      setErrorMessage('Invalid FEN position string. Please verify the format.');
    }
  };

  const whitePieces: PieceSymbol[] = ['k', 'q', 'r', 'b', 'n', 'p'];
  const blackPieces: PieceSymbol[] = ['k', 'q', 'r', 'b', 'n', 'p'];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 md:py-4 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400" />
            <span>Interactive Board & FEN Position Editor</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Build custom endgame studies, set up puzzle positions from books, or import any FEN for immediate play and analysis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start">
        {/* Left Column: Interactive Board (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Piece Palette */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mb-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl p-2.5 shadow-lg space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
              Select Piece Palette:
            </span>

            {/* White Pieces */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-300 w-12 shrink-0">White:</span>
              <div className="flex flex-wrap gap-1.5">
                {whitePieces.map((p) => {
                  const isSelected = selectedPalette && typeof selectedPalette === 'object' && selectedPalette.type === p && selectedPalette.color === 'w';
                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPalette({ type: p, color: 'w' })}
                      className={`w-9 h-9 p-1 rounded-xl border flex items-center justify-center transition ${
                        isSelected ? 'bg-blue-600/30 border-blue-500 shadow-md ring-1 ring-blue-500/40' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'
                      }`}
                    >
                      <div className="w-6 h-6">
                        <ChessPiece type={p} color="w" theme={pieceThemeId} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Black Pieces */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-300 w-12 shrink-0">Black:</span>
              <div className="flex flex-wrap gap-1.5">
                {blackPieces.map((p) => {
                  const isSelected = selectedPalette && typeof selectedPalette === 'object' && selectedPalette.type === p && selectedPalette.color === 'b';
                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPalette({ type: p, color: 'b' })}
                      className={`w-9 h-9 p-1 rounded-xl border flex items-center justify-center transition ${
                        isSelected ? 'bg-blue-600/30 border-blue-500 shadow-md ring-1 ring-blue-500/40' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'
                      }`}
                    >
                      <div className="w-6 h-6">
                        <ChessPiece type={p} color="b" theme={pieceThemeId} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tools */}
            <div className="flex items-center gap-2 pt-1 border-t border-zinc-800">
              <button
                onClick={() => setSelectedPalette('trash')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                  selectedPalette === 'trash' ? 'bg-red-600 border-red-500 text-white shadow-md' : 'bg-zinc-950 hover:bg-zinc-800 border-zinc-800 text-red-400'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" /> Eraser Tool
              </button>
              <button
                onClick={() => setSelectedPalette(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  selectedPalette === null ? 'bg-zinc-700 text-white border-zinc-500' : 'bg-zinc-950 hover:bg-zinc-800 border-zinc-800 text-zinc-400'
                }`}
              >
                Normal Move Mode
              </button>
            </div>
          </div>

          <div
            onClick={(e) => {
              const target = (e.target as HTMLElement).closest('[data-square]');
              if (target) {
                const sq = target.getAttribute('data-square') as Square;
                if (sq && selectedPalette) {
                  handleSquareClick(sq);
                }
              }
            }}
          >
            <Chessboard
              chess={chess}
              boardThemeId={boardThemeId}
              pieceThemeId={pieceThemeId}
              flipped={false}
              interactive={selectedPalette === null}
              showCoordinates={true}
              showLegalMoves={true}
              showLastMove={false}
              showEvalBar={false}
            />
          </div>

          {/* Quick Board Tools */}
          <div className="w-full max-w-[min(100vw-24px,min(calc(100vh-230px),480px))] mt-3 flex items-center justify-between gap-2">
            <button
              onClick={handleStartingPosition}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Starting Position
            </button>
            <button
              onClick={handleClearBoard}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-red-400 hover:text-red-300 border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Board
            </button>
          </div>
        </div>

        {/* Right Column: Settings & Launch Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Side to Move & Castling Setup */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Position Properties</span>
            </h3>

            {/* Turn Selector */}
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-2">Active Side to Move:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSideToMove('w')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    sideToMove === 'w' ? 'bg-slate-100 text-zinc-950 border-white shadow-md' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  White to Move
                </button>
                <button
                  onClick={() => setSideToMove('b')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    sideToMove === 'b' ? 'bg-zinc-950 text-white border-zinc-500 shadow-md' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  Black to Move
                </button>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="pt-2 space-y-2 border-t border-zinc-800">
              <button
                onClick={() => onPlayFromPosition(currentFen, sideToMove)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition hover:scale-101"
              >
                <Play className="w-4 h-4" />
                <span>Play vs AI from this Position</span>
              </button>

              <button
                onClick={() => onAnalyzePosition(currentFen)}
                className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Analyze with Coach Boris</span>
              </button>
            </div>
          </div>

          {/* FEN String I/O Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">FEN Notation Output</h3>

            <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 font-mono text-xs text-zinc-300 break-all select-all">
              {currentFen}
            </div>

            <button
              onClick={handleCopyFen}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 border border-zinc-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied FEN to Clipboard!' : 'Copy FEN String'}</span>
            </button>

            {/* Custom FEN Loader */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <label className="text-[11px] text-zinc-400 font-semibold block">Load Custom FEN / Position:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFenInput}
                  onChange={(e) => setCustomFenInput(e.target.value)}
                  placeholder="Paste FEN string here..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-hidden focus:border-amber-500"
                />
                <button
                  onClick={handleLoadCustomFen}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" /> Load
                </button>
              </div>
              {errorMessage && (
                <p className="text-[11px] text-red-400 bg-red-950/40 p-2 rounded-xl border border-red-800/80">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
