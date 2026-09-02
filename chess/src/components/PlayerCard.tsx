import React from 'react';
import { Color, PieceSymbol } from 'chess.js';
import { ChessPiece } from './ChessPiece';
import { PieceThemeId } from '../types/chess';
import { Bot, User, BrainCircuit } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  elo: number;
  avatarBg?: string;
  isAI?: boolean;
  aiAvatar?: string;
  color: Color;
  isActive: boolean;
  isThinking?: boolean;
  timeLeftSeconds?: number;
  hasClock: boolean;
  capturedPieces: PieceSymbol[];
  materialAdvantage: number;
  pieceThemeId?: PieceThemeId;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  elo,
  avatarBg = 'from-blue-600 to-indigo-800',
  isAI = false,
  aiAvatar,
  color,
  isActive,
  isThinking = false,
  timeLeftSeconds = 0,
  hasClock,
  capturedPieces,
  materialAdvantage,
  pieceThemeId = 'staunton',
}) => {
  // Format clock mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const isLowTime = hasClock && timeLeftSeconds <= 15 && timeLeftSeconds > 0;

  // Group captured pieces for compact rendering
  const capturedCounts: Partial<Record<PieceSymbol, number>> = {};
  capturedPieces.forEach((p) => {
    capturedCounts[p] = (capturedCounts[p] || 0) + 1;
  });

  const pieceOrder: PieceSymbol[] = ['q', 'r', 'b', 'n', 'p'];
  const oppColor: Color = color === 'w' ? 'b' : 'w';

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 md:px-3.5 md:py-2.5 rounded-2xl border transition-all duration-200 ${
        isActive
          ? 'bg-zinc-900/95 border-blue-500/80 shadow-md ring-1 ring-blue-500/20'
          : 'bg-zinc-950/70 border-zinc-800/90 text-zinc-400'
      }`}
    >
      {/* Left: Avatar, Name, Elo & Material Tray */}
      <div className="flex items-center gap-2.5 md:gap-3">
        {/* Avatar */}
        <div
          className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-white shadow-inner bg-gradient-to-br shrink-0 ${
            isAI ? avatarBg : 'from-zinc-700 to-zinc-900 border border-zinc-700'
          }`}
        >
          {isAI ? (
            aiAvatar ? (
              <span className="text-lg md:text-xl">{aiAvatar}</span>
            ) : (
              <Bot className="w-4 h-4 md:w-5 md:h-5" />
            )
          ) : (
            <User className="w-4 h-4 md:w-5 md:h-5 text-zinc-200" />
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-xs md:text-sm font-bold text-zinc-100 truncate flex items-center gap-1.5">
              {name}
              {isThinking && (
                <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-normal text-blue-400 animate-pulse">
                  <BrainCircuit className="w-3 h-3" />
                  thinking...
                </span>
              )}
            </span>
            <span className="text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
              {elo}
            </span>
          </div>

          {/* Captured Pieces & Score */}
          <div className="flex items-center gap-1.5 mt-0.5 h-4">
            <div className="flex items-center -space-x-1">
              {pieceOrder.map((ptype) => {
                const count = capturedCounts[ptype];
                if (!count) return null;
                return (
                  <div key={ptype} className="flex items-center">
                    <div className="w-3.5 h-3.5">
                      <ChessPiece type={ptype} color={oppColor} theme={pieceThemeId} />
                    </div>
                    {count > 1 && (
                      <span className="text-[9px] text-zinc-400 font-mono -ml-0.5 mr-0.5 font-bold">
                        {count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {materialAdvantage > 0 && (
              <span className="text-[10px] font-mono font-bold text-amber-400 px-1 rounded bg-amber-950/60 border border-amber-800/60">
                +{materialAdvantage}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Clock Timer */}
      {hasClock && (
        <div
          className={`flex items-center px-2.5 md:px-3 py-1 rounded-xl font-mono font-black text-sm md:text-base border transition-all shrink-0 ${
            isLowTime
              ? 'bg-red-950 text-red-300 border-red-500 animate-pulse shadow-md shadow-red-900/40'
              : isActive
              ? 'bg-zinc-900 text-white border-zinc-700 shadow-inner'
              : 'bg-zinc-950 text-zinc-500 border-zinc-800'
          }`}
        >
          {formatTime(timeLeftSeconds)}
        </div>
      )}
    </div>
  );
};
