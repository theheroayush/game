import React, { useState } from 'react';
import { Chess, Square } from 'chess.js';
import { OPENINGS_DATABASE } from '../data/openings';
import { OpeningData, BoardThemeId, PieceThemeId } from '../types/chess';
import { Chessboard } from './Chessboard';
import { BookOpen, Play, ChevronLeft, ChevronRight, RotateCcw, Lightbulb, Search } from 'lucide-react';
import { sounds } from '../utils/sound';

interface OpeningExplorerProps {
  boardThemeId: BoardThemeId;
  pieceThemeId: PieceThemeId;
  onPlayOpening: (opening: OpeningData) => void;
}

export const OpeningExplorer: React.FC<OpeningExplorerProps> = ({
  boardThemeId,
  pieceThemeId,
  onPlayOpening,
}) => {
  const [selectedOpening, setSelectedOpening] = useState<OpeningData>(OPENINGS_DATABASE[0]);
  const [moveStep, setMoveStep] = useState<number>(OPENINGS_DATABASE[0].moves.length);
  const [filterSide, setFilterSide] = useState<'all' | 'white' | 'black'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter openings
  const filteredOpenings = OPENINGS_DATABASE.filter((op) => {
    const matchesSide = filterSide === 'all' || op.side === filterSide || op.side === 'both';
    const matchesSearch =
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.eco.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSide && matchesSearch;
  });

  // Reconstruct board at moveStep and calculate next book move arrow
  const { previewChess, lastMove, guideArrows } = React.useMemo(() => {
    const c = new Chess();
    let last: { from: Square; to: Square } | null = null;
    for (let i = 0; i < moveStep && i < selectedOpening.moves.length; i++) {
      const m = c.move(selectedOpening.moves[i]);
      if (m && i === moveStep - 1) {
        last = { from: m.from, to: m.to };
      }
    }

    // Next move arrow
    const arrows = [];
    if (moveStep < selectedOpening.moves.length) {
      const nextSan = selectedOpening.moves[moveStep];
      const validMoves = c.moves({ verbose: true });
      const nextMove = validMoves.find((m) => m.san === nextSan);
      if (nextMove) {
        arrows.push({
          from: nextMove.from as Square,
          to: nextMove.to as Square,
          color: '#38bdf8', // Cyan Guide Arrow
          opacity: 0.85,
        });
      }
    }

    return { previewChess: c, lastMove: last, guideArrows: arrows };
  }, [selectedOpening, moveStep]);

  const handleSelectOpening = (op: OpeningData) => {
    setSelectedOpening(op);
    setMoveStep(op.moves.length);
    sounds.playMove();
  };

  const handleStepPrev = () => {
    if (moveStep > 0) {
      setMoveStep(moveStep - 1);
      sounds.playMove();
    }
  };

  const handleStepNext = () => {
    if (moveStep < selectedOpening.moves.length) {
      setMoveStep(moveStep + 1);
      sounds.playMove();
    }
  };

  const handleReset = () => {
    setMoveStep(0);
    sounds.playMove();
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 md:py-4 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Master Opening Explorer</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Explore grandmaster opening repertoire, learn key strategic motifs, and practice lines against AI.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search openings, ECO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 w-44 md:w-56"
            />
          </div>

          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
            {(['all', 'white', 'black'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterSide(s)}
                className={`px-2.5 py-1 rounded-lg capitalize font-bold transition text-xs ${
                  filterSide === s ? 'bg-blue-600 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start">
        {/* Openings Repertoire List (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-2.5 h-[min(calc(100vh-210px),540px)] flex flex-col shadow-xl">
          <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
            <span>Repertoire Directory ({filteredOpenings.length})</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 p-2">
            {filteredOpenings.map((op) => {
              const isSelected = selectedOpening.eco === op.eco && selectedOpening.name === op.name;
              return (
                <button
                  key={`${op.eco}_${op.name}`}
                  onClick={() => handleSelectOpening(op)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 shadow-md'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/80 border-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-zinc-100">{op.name}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-blue-400 border border-zinc-700">
                      {op.eco}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2">{op.description}</p>
                  <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-zinc-500">
                    <span className="truncate">{op.moves.slice(0, 6).join(' ')}...</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Opening Board & Theory (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 md:p-3.5 shadow-xl">
            {/* Header with Play Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-zinc-800 mb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">{selectedOpening.name}</h2>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">
                    {selectedOpening.eco}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  {selectedOpening.difficulty} Repertoire • {selectedOpening.moves.length} moves
                </span>
              </div>

              <button
                onClick={() => onPlayOpening(selectedOpening)}
                className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Practice vs AI</span>
              </button>
            </div>

            {/* Board & Step Controls */}
            <div className="flex flex-col items-center">
              <Chessboard
                chess={previewChess}
                boardThemeId={boardThemeId}
                pieceThemeId={pieceThemeId}
                interactive={false}
                lastMove={lastMove}
                arrows={guideArrows}
                showEvalBar={false}
              />

              {/* Step Controls */}
              <div className="flex items-center justify-center gap-3 mt-4 w-full max-w-[400px]">
                <button
                  onClick={handleReset}
                  title="Reset to start"
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleStepPrev}
                  disabled={moveStep === 0}
                  className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-semibold text-zinc-200 transition flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="font-mono text-xs text-zinc-400 font-bold px-2">
                  {moveStep} / {selectedOpening.moves.length}
                </span>
                <button
                  onClick={handleStepNext}
                  disabled={moveStep === selectedOpening.moves.length}
                  className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-semibold text-zinc-200 transition flex items-center justify-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Moves Sequence Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3 justify-center max-w-[500px]">
                {selectedOpening.moves.map((san, idx) => {
                  const isCurrent = idx === moveStep - 1;
                  const isPlayed = idx < moveStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setMoveStep(idx + 1);
                        sounds.playMove();
                      }}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40'
                          : isPlayed
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-zinc-950/80 text-zinc-600'
                      }`}
                    >
                      {Math.floor(idx / 2) + 1}
                      {idx % 2 === 0 ? '.' : '...'}
                      {san}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Strategic Ideas Card */}
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Key Strategic Plans & Motifs</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedOpening.keyIdeas.map((idea, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
