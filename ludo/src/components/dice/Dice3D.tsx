import React from 'react';
import { PlayerColor } from '../../types/game';

interface Dice3DProps {
  value: number | null;
  isRolling: boolean;
  canRoll: boolean;
  activeColor: PlayerColor;
  onRoll: () => void;
  disabled?: boolean;
}

const COLOR_GLOW: Record<PlayerColor, string> = {
  RED: 'shadow-glow-red border-red-500/80 ring-4 ring-red-500/25',
  GREEN: 'shadow-glow-green border-emerald-500/80 ring-4 ring-emerald-500/25',
  YELLOW: 'shadow-glow-yellow border-amber-500/80 ring-4 ring-amber-500/25',
  BLUE: 'shadow-glow-blue border-blue-500/80 ring-4 ring-blue-500/25'
};

const COLOR_TEXT: Record<PlayerColor, string> = {
  RED: 'text-red-400',
  GREEN: 'text-emerald-400',
  YELLOW: 'text-amber-400',
  BLUE: 'text-blue-400'
};

/**
 * 3D Isometric Rest Rotations:
 * Each target face is rotated to face the camera with a subtle 3D tilt
 * so that top, front, and side faces remain visible with rich depth.
 */
const ISOMETRIC_FACE_ROTATIONS: Record<number, string> = {
  1: 'rotateX(-18deg) rotateY(-26deg)',
  2: 'rotateX(-18deg) rotateY(-116deg)',
  3: 'rotateX(-108deg) rotateY(-26deg)',
  4: 'rotateX(72deg) rotateY(-26deg)',
  5: 'rotateX(-18deg) rotateY(64deg)',
  6: 'rotateX(-18deg) rotateY(154deg)'
};

export const Dice3D: React.FC<Dice3DProps> = ({
  value,
  isRolling,
  canRoll,
  activeColor,
  onRoll,
  disabled
}) => {
  const currentVal = value && value >= 1 && value <= 6 ? value : 1;
  const cubeTransform = isRolling ? undefined : ISOMETRIC_FACE_ROTATIONS[currentVal];

  return (
    <div className="flex flex-col items-center gap-2 select-none w-full">
      <button
        type="button"
        onClick={onRoll}
        disabled={!canRoll || disabled || isRolling}
        aria-label="Roll 3D Dice"
        className={`relative p-3 sm:p-4 rounded-3xl transition-all duration-300 transform outline-none flex items-center justify-center ${
          canRoll && !disabled && !isRolling
            ? `cursor-pointer hover:scale-105 active:scale-95 bg-slate-900/90 ${COLOR_GLOW[activeColor]}`
            : 'opacity-90 cursor-not-allowed bg-slate-900/60 border border-slate-800'
        }`}
      >
        {/* Active turn pulse ring */}
        {canRoll && !disabled && !isRolling && (
          <div className="absolute inset-0 rounded-3xl animate-ping opacity-25 bg-amber-400 pointer-events-none" />
        )}

        {/* 3D Perspective Stage */}
        <div className="dice-stage">
          {/* True 3D Cube with 6 physical faces */}
          <div
            className={`dice-cube ${isRolling ? 'dice-tumbling' : ''}`}
            style={cubeTransform ? { transform: cubeTransform } : undefined}
          >
            {/* Face 1 (Front: 1 Red Center Pip) */}
            <div className="dice-face-3d face-front">
              <span className="pip-red" />
            </div>

            {/* Face 6 (Back: 6 Black Pips in 2x3 Grid) */}
            <div className="dice-face-3d face-back">
              <div className="grid grid-cols-2 gap-x-3.5 gap-y-2 p-1.5">
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
              </div>
            </div>

            {/* Face 2 (Right: 2 Diagonal Pips) */}
            <div className="dice-face-3d face-right">
              <div className="flex justify-between w-full h-full p-3">
                <span className="pip self-start" />
                <span className="pip self-end" />
              </div>
            </div>

            {/* Face 5 (Left: 4 Corners + 1 Center Pip) */}
            <div className="dice-face-3d face-left">
              <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                <div className="flex justify-between w-full h-full">
                  <div className="flex flex-col justify-between">
                    <span className="pip" />
                    <span className="pip" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="pip" />
                    <span className="pip" />
                  </div>
                </div>
                <span className="pip absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Face 3 (Top: 3 Diagonal Pips) */}
            <div className="dice-face-3d face-top">
              <div className="flex justify-between w-full h-full p-3">
                <span className="pip self-start" />
                <span className="pip self-center" />
                <span className="pip self-end" />
              </div>
            </div>

            {/* Face 4 (Bottom: 4 Corner Pips) */}
            <div className="dice-face-3d face-bottom">
              <div className="grid grid-cols-2 gap-3.5 p-3">
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
                <span className="pip" />
              </div>
            </div>
          </div>

          {/* Dynamic 3D shadow underneath */}
          <div
            className={`dice-cube-shadow ${isRolling ? 'dice-shadow-jumping' : ''}`}
          />
        </div>
      </button>

      {/* Turn Action Callout Badge */}
      <div className="flex flex-col items-center gap-0.5 mt-1">
        {canRoll && !disabled && !isRolling ? (
          <span className={`text-xs font-black uppercase tracking-wider ${COLOR_TEXT[activeColor]} animate-pulse`}>
            🎲 Tap to Roll
          </span>
        ) : isRolling ? (
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider animate-pulse">
            Rolling 3D Dice...
          </span>
        ) : (
          <span className="text-[11px] font-semibold text-slate-400">
            {value ? `Rolled: ${value}` : 'Waiting for turn'}
          </span>
        )}
      </div>
    </div>
  );
};
