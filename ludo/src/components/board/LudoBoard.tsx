import React from 'react';
import { GameState, PlayerColor, TokenState } from '../../types/game';
import {
  getTokenCoordinate,
  TRACK_COORDINATES,
  STAR_TRACK_INDICES,
  START_TRACK_INDICES,
  HOME_LANE_COORDINATES
} from '../../engine/coordinates';
import { Token } from '../tokens/Token';

interface LudoBoardProps {
  gameState: GameState;
  selectedTokenId: string | null;
  onTokenClick: (tokenId: string) => void;
}

export const LudoBoard: React.FC<LudoBoardProps> = ({
  gameState,
  selectedTokenId,
  onTokenClick
}) => {
  const legalMoveSet = new Set(gameState.legalMoves);

  // Group tokens by their physical board coordinate to handle stacking
  const tokensByPosition = new Map<string, Array<{ token: TokenState; color: PlayerColor; index: number }>>();

  gameState.players.forEach((player) => {
    player.tokens.forEach((token, index) => {
      const coord = getTokenCoordinate(player.color, token.step, index);
      const key = `${coord.xPercent.toFixed(1)}_${coord.yPercent.toFixed(1)}`;
      const list = tokensByPosition.get(key) || [];
      list.push({ token, color: player.color, index });
      tokensByPosition.set(key, list);
    });
  });

  return (
    <div className="relative w-full max-w-[560px] aspect-square rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-2xl border-4 border-slate-700/80 select-none">
      {/* SVG Board Base */}
      <svg
        viewBox="0 0 1500 1500"
        className="w-full h-full rounded-2xl shadow-inner overflow-hidden"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="redYardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="greenYardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="yellowYardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="blueYardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <radialGradient id="centerStarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#EAB308" />
          </radialGradient>
        </defs>

        {/* Board Base Surface */}
        <rect x="0" y="0" width="1500" height="1500" fill="#F8FAFC" />

        {/* 4 Corner Yards (6x6 cells = 600x600 px) */}
        {/* Top-Left: Green Yard */}
        <rect x="0" y="0" width="600" height="600" fill="url(#greenYardGrad)" rx="16" />
        <rect x="100" y="100" width="400" height="400" fill="#FFFFFF" rx="28" opacity="0.95" />

        {/* Top-Right: Yellow Yard */}
        <rect x="900" y="0" width="600" height="600" fill="url(#yellowYardGrad)" rx="16" />
        <rect x="1000" y="100" width="400" height="400" fill="#FFFFFF" rx="28" opacity="0.95" />

        {/* Bottom-Left: Red Yard */}
        <rect x="0" y="900" width="600" height="600" fill="url(#redYardGrad)" rx="16" />
        <rect x="100" y="1000" width="400" height="400" fill="#FFFFFF" rx="28" opacity="0.95" />

        {/* Bottom-Right: Blue Yard */}
        <rect x="900" y="900" width="600" height="600" fill="url(#blueYardGrad)" rx="16" />
        <rect x="1000" y="1000" width="400" height="400" fill="#FFFFFF" rx="28" opacity="0.95" />

        {/* Yard Token Nest Bases */}
        {/* Green Nests */}
        <circle cx="200" cy="200" r="46" fill="#10B981" opacity="0.85" stroke="#059669" strokeWidth="4" />
        <circle cx="400" cy="200" r="46" fill="#10B981" opacity="0.85" stroke="#059669" strokeWidth="4" />
        <circle cx="200" cy="400" r="46" fill="#10B981" opacity="0.85" stroke="#059669" strokeWidth="4" />
        <circle cx="400" cy="400" r="46" fill="#10B981" opacity="0.85" stroke="#059669" strokeWidth="4" />

        {/* Yellow Nests */}
        <circle cx="1100" cy="200" r="46" fill="#F59E0B" opacity="0.85" stroke="#D97706" strokeWidth="4" />
        <circle cx="1300" cy="200" r="46" fill="#F59E0B" opacity="0.85" stroke="#D97706" strokeWidth="4" />
        <circle cx="1100" cy="400" r="46" fill="#F59E0B" opacity="0.85" stroke="#D97706" strokeWidth="4" />
        <circle cx="1300" cy="400" r="46" fill="#F59E0B" opacity="0.85" stroke="#D97706" strokeWidth="4" />

        {/* Red Nests */}
        <circle cx="200" cy="1100" r="46" fill="#EF4444" opacity="0.85" stroke="#DC2626" strokeWidth="4" />
        <circle cx="400" cy="1100" r="46" fill="#EF4444" opacity="0.85" stroke="#DC2626" strokeWidth="4" />
        <circle cx="200" cy="1300" r="46" fill="#EF4444" opacity="0.85" stroke="#DC2626" strokeWidth="4" />
        <circle cx="400" cy="1300" r="46" fill="#EF4444" opacity="0.85" stroke="#DC2626" strokeWidth="4" />

        {/* Blue Nests */}
        <circle cx="1100" cy="1100" r="46" fill="#3B82F6" opacity="0.85" stroke="#2563EB" strokeWidth="4" />
        <circle cx="1300" cy="1100" r="46" fill="#3B82F6" opacity="0.85" stroke="#2563EB" strokeWidth="4" />
        <circle cx="1100" cy="1300" r="46" fill="#3B82F6" opacity="0.85" stroke="#2563EB" strokeWidth="4" />
        <circle cx="1300" cy="1300" r="46" fill="#3B82F6" opacity="0.85" stroke="#2563EB" strokeWidth="4" />

        {/* 52 Perimeter Track Cells (100x100 px each) */}
        {TRACK_COORDINATES.map(([row, col], idx) => {
          const isStart = START_TRACK_INDICES.has(idx);
          const isStar = STAR_TRACK_INDICES.has(idx);

          let fillColor = '#FFFFFF';
          if (idx === 0) fillColor = '#FCA5A5'; // Red Start
          else if (idx === 13) fillColor = '#6EE7B7'; // Green Start
          else if (idx === 26) fillColor = '#FDE68A'; // Yellow Start
          else if (idx === 39) fillColor = '#93C5FD'; // Blue Start

          return (
            <g key={`track_${idx}`}>
              <rect
                x={col * 100}
                y={row * 100}
                width="100"
                height="100"
                fill={fillColor}
                stroke="#CBD5E1"
                strokeWidth="2.5"
              />

              {/* Star Icon on Safe Star Cells */}
              {isStar && (
                <path
                  d="M0,-24 L7,-7 L24,-7 L11,4 L16,21 L0,11 L-16,21 L-11,4 L-24,-7 L-7,-7 Z"
                  transform={`translate(${col * 100 + 50}, ${row * 100 + 50}) scale(1.15)`}
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="1.5"
                />
              )}

              {/* Arrow on starting cells */}
              {isStart && !isStar && (
                <circle
                  cx={col * 100 + 50}
                  cy={row * 100 + 50}
                  r="14"
                  fill="white"
                  stroke="#64748B"
                  strokeWidth="2.5"
                />
              )}
            </g>
          );
        })}

        {/* Home Lanes (5 cells per color) */}
        {/* Red Home Lane */}
        {HOME_LANE_COORDINATES.RED.map(([row, col], i) => (
          <rect
            key={`red_home_${i}`}
            x={col * 100}
            y={row * 100}
            width="100"
            height="100"
            fill="#EF4444"
            stroke="#DC2626"
            strokeWidth="2.5"
          />
        ))}

        {/* Green Home Lane */}
        {HOME_LANE_COORDINATES.GREEN.map(([row, col], i) => (
          <rect
            key={`green_home_${i}`}
            x={col * 100}
            y={row * 100}
            width="100"
            height="100"
            fill="#10B981"
            stroke="#059669"
            strokeWidth="2.5"
          />
        ))}

        {/* Yellow Home Lane */}
        {HOME_LANE_COORDINATES.YELLOW.map(([row, col], i) => (
          <rect
            key={`yellow_home_${i}`}
            x={col * 100}
            y={row * 100}
            width="100"
            height="100"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="2.5"
          />
        ))}

        {/* Blue Home Lane */}
        {HOME_LANE_COORDINATES.BLUE.map(([row, col], i) => (
          <rect
            key={`blue_home_${i}`}
            x={col * 100}
            y={row * 100}
            width="100"
            height="100"
            fill="#3B82F6"
            stroke="#2563EB"
            strokeWidth="2.5"
          />
        ))}

        {/* Center Goal Triangles (3x3 grid = 600..900 px) */}
        {/* Red Triangle (Bottom) */}
        <polygon points="600,900 900,900 750,750" fill="#EF4444" stroke="#DC2626" strokeWidth="2.5" />
        {/* Green Triangle (Left) */}
        <polygon points="600,600 600,900 750,750" fill="#10B981" stroke="#059669" strokeWidth="2.5" />
        {/* Yellow Triangle (Top) */}
        <polygon points="600,600 900,600 750,750" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
        {/* Blue Triangle (Right) */}
        <polygon points="900,600 900,900 750,750" fill="#3B82F6" stroke="#2563EB" strokeWidth="2.5" />

        {/* Center Star Victory Badge */}
        <circle cx="750" cy="750" r="44" fill="url(#centerStarGlow)" stroke="#CA8A04" strokeWidth="3" />
        <path
          d="M0,-22 L5.5,-7 L22,-7 L10,3.5 L14,19 L0,9 L-14,19 L-10,3.5 L-22,-7 L-5.5,-7 Z"
          transform="translate(750, 750) scale(1.2)"
          fill="#A16207"
        />
      </svg>

      {/* Interactive Token Overlay */}
      <div className="absolute inset-0 p-2 sm:p-3 pointer-events-none">
        {Array.from(tokensByPosition.entries()).map(([key, items]) => {
          const [xStr, yStr] = key.split('_');
          const xPercent = parseFloat(xStr);
          const yPercent = parseFloat(yStr);

          return (
            <div
              key={key}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute pointer-events-auto flex items-center justify-center"
            >
              {items.map((item, idx) => (
                <Token
                  key={item.token.id}
                  token={item.token}
                  color={item.color}
                  isLegal={legalMoveSet.has(item.token.id)}
                  isSelected={selectedTokenId === item.token.id}
                  onClick={() => onTokenClick(item.token.id)}
                  stackIndex={idx}
                  stackTotal={items.length}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
