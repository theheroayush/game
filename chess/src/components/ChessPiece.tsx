import React from 'react';
import { PieceSymbol, Color } from 'chess.js';
import { PieceThemeId } from '../types/chess';

interface ChessPieceProps {
  type: PieceSymbol;
  color: Color;
  theme?: PieceThemeId;
  className?: string;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  theme = 'staunton',
  className = 'w-full h-full select-none pointer-events-none',
}) => {
  const isWhite = color === 'w';

  // Palette definitions based on theme
  let whiteFill = '#ffffff';
  let whiteStroke = '#1c1917';
  let blackFill = '#27272a'; // rich dark charcoal
  let blackStroke = '#09090b';
  let detailColor = isWhite ? '#1c1917' : '#ffffff';

  if (theme === 'woodcraft') {
    whiteFill = '#fef3c7'; // warm birch
    whiteStroke = '#78350f';
    blackFill = '#451a03'; // warm walnut
    blackStroke = '#1c0a00';
    detailColor = isWhite ? '#78350f' : '#fde68a';
  } else if (theme === 'alpha') {
    whiteFill = '#e0f2fe';
    whiteStroke = '#0284c7';
    blackFill = '#0f172a';
    blackStroke = '#38bdf8';
    detailColor = isWhite ? '#0284c7' : '#38bdf8';
  } else if (theme === 'neo') {
    whiteFill = '#f8fafc';
    whiteStroke = '#0f172a';
    blackFill = '#18181b';
    blackStroke = '#000000';
    detailColor = isWhite ? '#334155' : '#e4e4e7';
  } else if (theme === 'minimal') {
    whiteFill = isWhite ? '#f8fafc' : '#18181b';
    whiteStroke = isWhite ? '#09090b' : '#71717a';
    blackFill = '#18181b';
    blackStroke = '#a1a1aa';
    detailColor = isWhite ? '#09090b' : '#f4f4f5';
  }

  const fill = isWhite ? whiteFill : blackFill;
  const stroke = isWhite ? whiteStroke : blackStroke;

  // =========================================================================
  // TOURNAMENT-GRADE CBURNETT STAUNTON VECTOR DEFINITIONS (International Standard)
  // =========================================================================

  // PAWN
  const renderPawn = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {isWhite ? (
        <path
          d="M11.5 37.5c0-6 3.5-9.5 6.5-11 1.5 1 3 1.5 4.5 1.5s3-.5 4.5-1.5c3 1.5 6.5 5 6.5 11h-22z"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M12 37.5c.5-4.5 3.5-8.5 7-10.5 1.1.7 2.3 1 3.5 1s2.4-.3 3.5-1c3.5 2 6.5 6 7 10.5H12z"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );

  // KNIGHT
  const renderKnight = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="25.5" r="1" fill={detailColor} />
      <circle cx="15" cy="15.5" r="1" fill={detailColor} />
      <path
        d="M24.55 10.4s-1.05 1.47-1.55 3.15c-.5 1.68-.3 3.65.6 4.75"
        fill="none"
        stroke={detailColor}
        strokeWidth="1.2"
      />
      <path
        d="M28.5 12.5s-1.2 1.8-1.7 3.8c-.5 2-.2 4.2.8 5.4"
        fill="none"
        stroke={detailColor}
        strokeWidth="1.2"
      />
    </svg>
  );

  // BISHOP
  const renderBishop = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"
          fill={fill}
        />
        <path d="M17.5 26h10M15 30h15" stroke={detailColor} strokeWidth="1.2" />
        <path d="M22.5 10v4M20.5 12h4" stroke={detailColor} strokeWidth="1.2" />
        <path
          d="M20 18c1.5 1 3.5 1 5 0"
          stroke={detailColor}
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );

  // ROOK
  const renderRook = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <g
        fill={fill}
        fillRule="evenodd"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
          strokeLinecap="butt"
        />
        <path d="M34 14l-3 3H14l-3-3" />
        <path
          d="M31 17v12.5H14V17"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
        <path d="M11 14h23" fill="none" stroke={detailColor} strokeWidth="1.2" />
        <path d="M14 23.5h17" fill="none" stroke={detailColor} strokeWidth="1.2" />
      </g>
    </svg>
  );

  // QUEEN
  const renderQueen = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <g
        fill={fill}
        fillRule="evenodd"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Crown 5 finials */}
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="14" cy="9" r="2.5" />
        <circle cx="22.5" cy="8" r="2.5" />
        <circle cx="31" cy="9" r="2.5" />
        <circle cx="39" cy="12" r="2.5" />
        {/* Crown body */}
        <path
          d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-7.5-14-7.5 14-7-11 2 12z"
          strokeLinecap="butt"
        />
        <path
          d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
          strokeLinecap="butt"
        />
        <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke={detailColor} strokeWidth="1.2" />
      </g>
    </svg>
  );

  // KING
  const renderKing = () => (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      <g
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cross */}
        <path d="M22.5 4v7M20 6.5h5" stroke={stroke} strokeWidth="1.8" />
        <path
          d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 20l-8.5-8.5L14 20l-7.5-6.5L9 26z"
          fill={fill}
          strokeLinecap="butt"
        />
        <path
          d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
          fill={fill}
          strokeLinecap="butt"
        />
        <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" stroke={detailColor} strokeWidth="1.2" />
        <circle cx="22.5" cy="18" r="2.5" fill={detailColor} />
      </g>
    </svg>
  );

  switch (type.toLowerCase()) {
    case 'p': return renderPawn();
    case 'n': return renderKnight();
    case 'b': return renderBishop();
    case 'r': return renderRook();
    case 'q': return renderQueen();
    case 'k': return renderKing();
    default: return null;
  }
};
