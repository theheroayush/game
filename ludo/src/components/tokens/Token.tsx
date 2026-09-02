import React from 'react';
import { PlayerColor, TokenState } from '../../types/game';

interface TokenProps {
  token: TokenState;
  color: PlayerColor;
  isLegal: boolean;
  isSelected: boolean;
  onClick?: () => void;
  stackIndex?: number;
  stackTotal?: number;
}

const COLOR_GRADIENTS: Record<PlayerColor, string> = {
  RED: 'from-red-400 via-red-500 to-red-700 shadow-red-500/60',
  GREEN: 'from-emerald-400 via-emerald-500 to-emerald-700 shadow-emerald-500/60',
  YELLOW: 'from-amber-300 via-amber-400 to-amber-600 shadow-amber-500/60',
  BLUE: 'from-blue-400 via-blue-500 to-blue-700 shadow-blue-500/60'
};

const COLOR_RING: Record<PlayerColor, string> = {
  RED: 'ring-red-300',
  GREEN: 'ring-emerald-300',
  YELLOW: 'ring-amber-200',
  BLUE: 'ring-blue-300'
};

export const Token: React.FC<TokenProps> = ({
  color,
  isLegal,
  isSelected,
  onClick,
  stackIndex = 0,
  stackTotal = 1
}) => {
  // Compute stack offset if multiple tokens share the exact same cell
  const getStackStyle = () => {
    if (stackTotal <= 1) return {};
    const offsetDistance = 7; // px
    const angle = (stackIndex / stackTotal) * 2 * Math.PI;
    const x = Math.cos(angle) * offsetDistance;
    const y = Math.sin(angle) * offsetDistance;
    return {
      transform: `translate(${x}px, ${y}px) scale(${stackTotal > 2 ? 0.85 : 0.95})`,
      zIndex: 20 + stackIndex
    };
  };

  return (
    <div
      onClick={isLegal ? onClick : undefined}
      style={getStackStyle()}
      className={`relative flex items-center justify-center transition-transform duration-200 ${
        isLegal ? 'cursor-pointer' : 'pointer-events-none'
      }`}
    >
      {/* Halo pulse when legal to move */}
      {isLegal && (
        <div
          className="absolute -inset-2 rounded-full animate-ping opacity-60 bg-white pointer-events-none"
        />
      )}

      {/* 3D Pawn Disc */}
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${
          COLOR_GRADIENTS[color]
        } shadow-xl border-2 border-white flex items-center justify-center transition-all ${
          isLegal
            ? 'token-legal hover:scale-125 ring-2 ring-white'
            : 'opacity-95'
        } ${isSelected ? `ring-4 ${COLOR_RING[color]} scale-125` : ''}`}
      >
        {/* Inner concentric 3D dome */}
        <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-white/40 border border-white/70 shadow-inner flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
};
