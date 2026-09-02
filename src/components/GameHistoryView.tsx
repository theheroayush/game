import React, { useState } from 'react';
import { GameRecord } from '../types/chess';
import { History, BarChart2, Download, Copy, Check, Upload, Trophy } from 'lucide-react';
import { Chess } from 'chess.js';

interface GameHistoryViewProps {
  games: GameRecord[];
  boardThemeId?: unknown;
  pieceThemeId?: unknown;
  onSelectGameForAnalysis: (game: GameRecord) => void;
  onImportPgn: (pgn: string) => void;
}

export const GameHistoryView: React.FC<GameHistoryViewProps> = ({
  games,
  onSelectGameForAnalysis,
  onImportPgn,
}) => {
  const [filterResult, setFilterResult] = useState<'all' | 'won' | 'lost' | 'drawn'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importPgnText, setImportPgnText] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  const filteredGames = games.filter((g) => {
    const isWhite = g.playerColor === 'w';
    const playerWon = (g.result === '1-0' && isWhite) || (g.result === '0-1' && !isWhite);
    const isDrawn = g.result === '1/2-1/2';
    const playerLost = (g.result === '1-0' && !isWhite) || (g.result === '0-1' && isWhite);

    if (filterResult === 'won') return playerWon;
    if (filterResult === 'lost') return playerLost;
    if (filterResult === 'drawn') return isDrawn;
    return true;
  });

  const handleCopyPgn = (game: GameRecord) => {
    navigator.clipboard.writeText(game.pgn);
    setCopiedId(game.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPgn = (game: GameRecord) => {
    const blob = new Blob([game.pgn], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chess_game_${game.date.replace(/[: ]/g, '_')}.pgn`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importPgnText.trim()) return;
    try {
      const testChess = new Chess();
      testChess.loadPgn(importPgnText);
      onImportPgn(importPgnText);
      setShowImportModal(false);
      setImportPgnText('');
      setImportError(null);
    } catch {
      setImportError('Invalid PGN format. Please check your notation.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 md:py-4 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <span>Game Archives & Past Matches</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Review past games, download standard PGN files, or import external games for coach analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="py-1.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition border border-zinc-700"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Import PGN</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4">
        {(['all', 'won', 'lost', 'drawn'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterResult(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
              filterResult === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {tab} ({tab === 'all' ? games.length : games.filter((g) => {
              const isWhite = g.playerColor === 'w';
              if (tab === 'won') return (g.result === '1-0' && isWhite) || (g.result === '0-1' && !isWhite);
              if (tab === 'lost') return (g.result === '1-0' && !isWhite) || (g.result === '0-1' && isWhite);
              if (tab === 'drawn') return g.result === '1/2-1/2';
              return true;
            }).length})
          </button>
        ))}
      </div>

      {/* Game List */}
      {filteredGames.length === 0 ? (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center">
          <Trophy className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-300">No matches found in archive</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Play games against the AI or import existing PGNs to build your personal chess archive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredGames.map((g) => {
            const isWhite = g.playerColor === 'w';
            const playerWon = (g.result === '1-0' && isWhite) || (g.result === '0-1' && !isWhite);
            const isDrawn = g.result === '1/2-1/2';
            const opponentName = isWhite ? g.blackPlayer : g.whitePlayer;
            const cleanOpponentName = opponentName.replace(/\s*\(\d+\s*Elo\)/gi, '');
            const opponentElo = isWhite ? g.blackElo : g.whiteElo;

            return (
              <div
                key={g.id}
                className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-3.5 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Left details */}
                <div className="flex items-center gap-3.5">
                  {/* Result Badge */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner ${
                      playerWon
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : isDrawn
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {playerWon ? 'WON' : isDrawn ? 'DRAW' : 'LOST'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-100 text-sm md:text-base">
                        vs {cleanOpponentName} ({opponentElo} Elo)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {g.result}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 mt-0.5 text-xs text-zinc-400 font-mono">
                      <span>{g.openingName || 'Standard Opening'}</span>
                      <span>•</span>
                      <span>{g.movesCount} moves</span>
                      <span>•</span>
                      <span>{g.timeControl}</span>
                      {g.accuracyPlayer && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">
                            {g.accuracyPlayer}% Acc
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => onSelectGameForAnalysis(g)}
                    className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </button>

                  <button
                    onClick={() => handleCopyPgn(g)}
                    title="Copy PGN"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                  >
                    {copiedId === g.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDownloadPgn(g)}
                    title="Download PGN file"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PGN Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-400" />
              <span>Import PGN Notation</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Paste standard Portable Game Notation (PGN) below to analyze and replay.
            </p>

            <textarea
              rows={6}
              value={importPgnText}
              onChange={(e) => setImportPgnText(e.target.value)}
              placeholder="1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O..."
              className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500 mb-2 resize-none"
            />

            {importError && (
              <p className="text-xs text-rose-400 font-semibold mb-3">{importError}</p>
            )}

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition"
              >
                Import & Analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
