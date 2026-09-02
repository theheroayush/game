import React from 'react';
import { Square } from 'chess.js';

export interface BoardArrow {
  from: Square;
  to: Square;
  color?: string; // e.g. '#10b981' (emerald), '#ef4444' (red), '#38bdf8' (cyan)
  opacity?: number;
  label?: string;
}

interface BoardArrowsProps {
  arrows: BoardArrow[];
  flipped?: boolean;
}

export const BoardArrows: React.FC<BoardArrowsProps> = ({ arrows, flipped = false }) => {
  if (!arrows || arrows.length === 0) return null;

  const getSquareCenter = (square: Square): { x: number; y: number } => {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(square[1], 10);

    const fIdx = flipped ? 7 - file : file;
    const rIdx = flipped ? 7 - rank : rank;

    return {
      x: (fIdx + 0.5) * 12.5,
      y: (rIdx + 0.5) * 12.5,
    };
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="arrow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {arrows.map((arrow, idx) => {
        const start = getSquareCenter(arrow.from);
        const end = getSquareCenter(arrow.to);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.hypot(dx, dy);
        if (len === 0) return null;

        const ux = dx / len;
        const uy = dy / len;
        const nx = -uy;
        const ny = ux;

        const shaftWidth = 2.4;
        const headLength = 4.4;
        const headWidth = 5.2;
        const startOffset = 2.0;

        // Points
        const sx1 = start.x + ux * startOffset + nx * (shaftWidth / 2);
        const sy1 = start.y + uy * startOffset + ny * (shaftWidth / 2);
        const sx2 = start.x + ux * startOffset - nx * (shaftWidth / 2);
        const sy2 = start.y + uy * startOffset - ny * (shaftWidth / 2);

        const bx = end.x - ux * headLength;
        const by = end.y - uy * headLength;

        const bx1 = bx + nx * (shaftWidth / 2);
        const by1 = by + ny * (shaftWidth / 2);
        const bx2 = bx - nx * (shaftWidth / 2);
        const by2 = by - ny * (shaftWidth / 2);

        const hx1 = bx + nx * (headWidth / 2);
        const hy1 = by + ny * (headWidth / 2);
        const hx2 = bx - nx * (headWidth / 2);
        const hy2 = by - ny * (headWidth / 2);

        const tipX = end.x - ux * 0.8;
        const tipY = end.y - uy * 0.8;

        const path = `M ${sx1} ${sy1} L ${bx1} ${by1} L ${hx1} ${hy1} L ${tipX} ${tipY} L ${hx2} ${hy2} L ${bx2} ${by2} L ${sx2} ${sy2} Z`;
        const arrowColor = arrow.color || '#10b981';
        const opacity = arrow.opacity !== undefined ? arrow.opacity : 0.85;

        return (
          <g key={idx} filter="url(#arrow-glow)">
            {/* Arrow Path */}
            <path
              d={path}
              fill={arrowColor}
              opacity={opacity}
              stroke="#000000"
              strokeWidth="0.3"
              strokeLinejoin="round"
            />
            {/* Start circle indicator */}
            <circle
              cx={start.x}
              cy={start.y}
              r={1.8}
              fill={arrowColor}
              opacity={opacity}
            />
          </g>
        );
      })}
    </svg>
  );
};
