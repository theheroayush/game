import React, { useRef, useEffect } from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCcw, Flag, Handshake, Copy, Check, Sparkles } from 'lucide-react';
import { MoveAnalysis, MoveClassification } from '../types/chess';

interface MoveHistoryProps {
  moves: { san: string; ply: number }[];
  currentPly: number;
  analyses?: MoveAnalysis[];
  onSelectPly: (ply: number) => void;
  onUndo: () => void;
  onResign: () => void;
  onDrawOffer: () => void;
  onFlip: () => void;
  isGameOver: boolean;
  pgn: string;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  moves,
  currentPly,
  analyses = [],
  onSelectPly,
  onUndo,
  onResign,
  onDrawOffer,
  onFlip,
  isGameOver,
  pgn,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Auto-scroll to active move
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentPly, moves.length]);

  const handleCopyPgn = () => {
    navigator.clipboard.writeText(pgn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group moves into pairs (White & Black)
  const pairedMoves: { moveNumber: number; white?: { san: string; ply: number }; black?: { san: string; ply: number } }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairedMoves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  const getBadgeForClassification = (classification?: MoveClassification) => {
    if (!classification) return null;
    switch (classification) {
      case 'brilliant':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 font-black border border-cyan-700">!!</span>;
      case 'best':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 font-black border border-emerald-700">!</span>;
      case 'inaccuracy':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-yellow-950 text-yellow-300 font-black border border-yellow-700">?!</span>;
      case 'mistake':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-orange-950 text-orange-300 font-black border border-orange-700">?</span>;
      case 'blunder':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-red-950 text-red-300 font-black border border-red-700">??</span>;
      case 'book':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-blue-950 text-blue-300 font-black border border-blue-700">📖</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/80 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Move Notation</span>
        <button
          onClick={handleCopyPgn}
          title="Copy PGN to clipboard"
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-zinc-100 px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'PGN'}
        </button>
      </div>

      {/* Moves Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs font-mono">
        {pairedMoves.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[140px] text-zinc-600 text-xs">
            <span className="font-sans font-medium text-zinc-400">Ready to play</span>
            <span className="mt-1 text-[11px] font-sans text-zinc-600">Make your opening move on the board</span>
          </div>
        ) : (
          pairedMoves.map((pair) => {
            const whiteAnalysis = analyses.find(a => a.ply === pair.white?.ply);
            const blackAnalysis = pair.black ? analyses.find(a => a.ply === pair.black?.ply) : undefined;

            return (
              <div
                key={pair.moveNumber}
                className="grid grid-cols-12 items-center py-0.5 px-1.5 rounded-lg hover:bg-zinc-900/80 transition-colors"
              >
                {/* Move Number */}
                <span className="col-span-2 text-[11px] text-zinc-500 font-bold">{pair.moveNumber}.</span>

                {/* White Move */}
                <button
                  onClick={() => pair.white && onSelectPly(pair.white.ply)}
                  data-active={currentPly === pair.white?.ply}
                  className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-lg text-left transition ${
                    currentPly === pair.white?.ply
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-bold">{pair.white?.san}</span>
                  {getBadgeForClassification(whiteAnalysis?.classification)}
                </button>

                {/* Black Move */}
                {pair.black ? (
                  <button
                    onClick={() => pair.black && onSelectPly(pair.black.ply)}
                    data-active={currentPly === pair.black?.ply}
                    className={`col-span-5 flex items-center justify-between px-2 py-1 rounded-lg text-left transition ${
                      currentPly === pair.black?.ply
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="font-bold">{pair.black.san}</span>
                    {getBadgeForClassification(blackAnalysis?.classification)}
                  </button>
                ) : (
                  <span className="col-span-5" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Navigation Controls (Step back, forward) */}
      <div className="grid grid-cols-4 gap-1 p-1.5 bg-zinc-900/90 border-t border-zinc-800">
        <button
          onClick={() => onSelectPly(0)}
          disabled={currentPly === 0}
          title="Start Position"
          className="flex items-center justify-center py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
        >
          <ChevronFirst className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onSelectPly(Math.max(0, currentPly - 1))}
          disabled={currentPly === 0}
          title="Previous Move"
          className="flex items-center justify-center py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onSelectPly(Math.min(moves.length, currentPly + 1))}
          disabled={currentPly === moves.length}
          title="Next Move"
          className="flex items-center justify-center py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onSelectPly(moves.length)}
          disabled={currentPly === moves.length}
          title="Current Position"
          className="flex items-center justify-center py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
        >
          <ChevronLast className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Action Bar (Undo, Draw, Resign, Flip) */}
      {!isGameOver && (
        <div className="grid grid-cols-4 gap-1.5 p-2 bg-zinc-950 border-t border-zinc-800">
          <button
            onClick={onUndo}
            disabled={moves.length === 0}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition text-[10px] font-bold border border-zinc-800"
            title="Take back last move"
          >
            <RotateCcw className="w-3.5 h-3.5 mb-0.5" />
            <span>Undo</span>
          </button>
          <button
            onClick={onFlip}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition text-[10px] font-bold border border-zinc-800"
            title="Flip Board"
          >
            <Sparkles className="w-3.5 h-3.5 mb-0.5" />
            <span>Flip</span>
          </button>
          <button
            onClick={onDrawOffer}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition text-[10px] font-bold border border-zinc-800"
            title="Offer Draw"
          >
            <Handshake className="w-3.5 h-3.5 mb-0.5" />
            <span>Draw</span>
          </button>
          <button
            onClick={onResign}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-400 hover:text-red-200 transition text-[10px] font-bold"
            title="Resign Game"
          >
            <Flag className="w-3.5 h-3.5 mb-0.5 text-red-400" />
            <span>Resign</span>
          </button>
        </div>
      )}
    </div>
  );
};
