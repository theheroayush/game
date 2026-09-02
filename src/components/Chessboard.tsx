import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chess, Square, PieceSymbol, Move } from 'chess.js';
import { ChessPiece } from './ChessPiece';
import { BoardArrows, BoardArrow } from './BoardArrows';
import { BoardTheme, PieceThemeId } from '../types/chess';
import { BOARD_THEMES } from '../utils/themes';
import { haptics } from '../utils/haptics';

interface ChessboardProps {
  chess: Chess;
  boardThemeId?: keyof typeof BOARD_THEMES;
  pieceThemeId?: PieceThemeId;
  flipped?: boolean;
  interactive?: boolean;
  showCoordinates?: boolean;
  showLegalMoves?: boolean;
  showLastMove?: boolean;
  lastMove?: { from: Square; to: Square } | null;
  arrows?: BoardArrow[];
  evalScore?: number; // centipawns (+ white, - black)
  showEvalBar?: boolean;
  onMove?: (from: Square, to: Square, promotion?: string) => boolean;
}

export const Chessboard: React.FC<ChessboardProps> = ({
  chess,
  boardThemeId = 'emerald',
  pieceThemeId = 'staunton',
  flipped = false,
  interactive = true,
  showCoordinates = true,
  showLegalMoves = true,
  showLastMove = true,
  lastMove = null,
  arrows = [],
  evalScore = 0,
  showEvalBar = true,
  onMove,
}) => {
  const theme: BoardTheme = BOARD_THEMES[boardThemeId] || BOARD_THEMES.emerald;

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);

  // Dragging state
  const [dragSquare, setDragSquare] = useState<Square | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; square: Square } | null>(null);
  const wasDraggingRef = useRef<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  // Find king in check
  const inCheck = chess.inCheck();
  const turn = chess.turn();
  let checkSquare: Square | null = null;
  if (inCheck) {
    const board = chess.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === turn) {
          checkSquare = piece.square;
        }
      }
    }
  }

  // Handle Square Click
  const handleSquareClick = useCallback((square: Square) => {
    if (!interactive || pendingPromotion) return;

    if (wasDraggingRef.current) {
      wasDraggingRef.current = false;
      return;
    }

    if (selectedSquare) {
      // 1. Clicked the same square -> deselect
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // 2. Clicked a valid move destination
      const validMove = legalMoves.find(m => m.to === square);
      if (validMove) {
        const piece = chess.get(selectedSquare);
        if (
          piece &&
          piece.type === 'p' &&
          ((piece.color === 'w' && square[1] === '8') || (piece.color === 'b' && square[1] === '1'))
        ) {
          setPendingPromotion({ from: selectedSquare, to: square });
          return;
        }

        const success = onMove?.(selectedSquare, square);
        if (success) {
          haptics.move();
          setSelectedSquare(null);
          setLegalMoves([]);
          return;
        }
      }

      // 3. Clicked another own piece -> switch selection
      const clickedPiece = chess.get(square);
      if (clickedPiece && clickedPiece.color === chess.turn()) {
        setSelectedSquare(square);
        setLegalMoves(chess.moves({ square, verbose: true }));
        haptics.move();
        return;
      }

      // 4. Clicked elsewhere -> deselect
      setSelectedSquare(null);
      setLegalMoves([]);
    } else {
      // No piece currently selected -> select if it's the current player's piece
      const piece = chess.get(square);
      if (piece && piece.color === chess.turn()) {
        setSelectedSquare(square);
        setLegalMoves(chess.moves({ square, verbose: true }));
        haptics.move();
      }
    }
  }, [interactive, pendingPromotion, selectedSquare, legalMoves, chess, onMove]);

  const handlePromotionSelect = (promotionPiece: string) => {
    if (!pendingPromotion) return;
    onMove?.(pendingPromotion.from, pendingPromotion.to, promotionPiece);
    haptics.move();
    setPendingPromotion(null);
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  // Convert client coordinates to board square
  const getSquareFromCoords = useCallback((clientX: number, clientY: number): Square | null => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const colWidth = rect.width / 8;
    const rowHeight = rect.height / 8;

    const fileIdx = Math.floor((clientX - rect.left) / colWidth);
    const rankIdx = Math.floor((clientY - rect.top) / rowHeight);

    const file = displayFiles[fileIdx];
    const rank = displayRanks[rankIdx];

    return `${file}${rank}` as Square;
  }, [displayFiles, displayRanks]);

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent, square: Square) => {
    if (!interactive || pendingPromotion) return;
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      pointerStartRef.current = { x: e.clientX, y: e.clientY, square };
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerStartRef.current) {
        const dx = Math.abs(e.clientX - pointerStartRef.current.x);
        const dy = Math.abs(e.clientY - pointerStartRef.current.y);
        if (dx > 4 || dy > 4) {
          const sq = pointerStartRef.current.square;
          setDragSquare(sq);
          setSelectedSquare(sq);
          setLegalMoves(chess.moves({ square: sq, verbose: true }));
          wasDraggingRef.current = true;
          setDragPos({ x: e.clientX, y: e.clientY });
        }
      } else if (dragSquare) {
        setDragPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (dragSquare && pointerStartRef.current) {
        const targetSquare = getSquareFromCoords(e.clientX, e.clientY);
        const fromSquare = pointerStartRef.current.square;
        if (targetSquare && targetSquare !== fromSquare) {
          const validMoves = chess.moves({ square: fromSquare, verbose: true });
          const isValid = validMoves.find(m => m.to === targetSquare);
          if (isValid) {
            const piece = chess.get(fromSquare);
            if (
              piece &&
              piece.type === 'p' &&
              ((piece.color === 'w' && targetSquare[1] === '8') || (piece.color === 'b' && targetSquare[1] === '1'))
            ) {
              setPendingPromotion({ from: fromSquare, to: targetSquare });
            } else {
              onMove?.(fromSquare, targetSquare);
              haptics.move();
              setSelectedSquare(null);
              setLegalMoves([]);
            }
          }
        }
        setDragSquare(null);
        setDragPos(null);
      }
      pointerStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragSquare, chess, onMove, getSquareFromCoords]);

  // Calculate Eval Bar percentage
  const clampedCp = Math.max(-1200, Math.min(1200, evalScore));
  const whitePercent = 50 + 50 * (2 / (1 + Math.exp(-0.0035 * clampedCp)) - 1);
  const evalDisplay = Math.abs(evalScore) > 9000
    ? (evalScore > 0 ? 'M' : '-M')
    : (evalScore >= 0 ? `+${(evalScore / 100).toFixed(1)}` : `${(evalScore / 100).toFixed(1)}`);

  return (
    <div className="flex items-center justify-center gap-2.5 md:gap-3.5 w-full select-none touch-none py-1">
      {/* Eval Bar */}
      {showEvalBar && (
        <div className="hidden sm:flex flex-col items-center justify-between w-4 md:w-5 h-[min(calc(100vh-230px),480px)] bg-zinc-950 rounded-full overflow-hidden border border-zinc-700/80 shadow-lg relative shrink-0">
          {/* Black Side (Top) */}
          <div
            className="w-full bg-zinc-800 transition-all duration-300"
            style={{ height: `${flipped ? whitePercent : 100 - whitePercent}%` }}
          />
          {/* White Side (Bottom) */}
          <div
            className="w-full bg-slate-100 transition-all duration-300 shadow-xs"
            style={{ height: `${flipped ? 100 - whitePercent : whitePercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[8px] md:text-[9px] font-mono font-black px-1 py-0.5 rounded bg-black/80 text-white backdrop-blur-xs border border-white/10">
              {evalDisplay}
            </span>
          </div>
        </div>
      )}

      {/* Main Board Container with Responsive Viewport Fit */}
      <div className="relative w-[min(100vw-24px,min(calc(100vh-230px),480px))] aspect-square rounded-2xl overflow-hidden shadow-board border border-zinc-700/80 bg-zinc-950 touch-none shrink-0">
        <div ref={boardRef} className="grid grid-cols-8 grid-rows-8 w-full h-full touch-none">
          {displayRanks.map((rank, rIdx) =>
            displayFiles.map((file, fIdx) => {
              const square = `${file}${rank}` as Square;
              const isLight = (fIdx + rIdx) % 2 === (flipped ? 1 : 0);
              const piece = chess.get(square);

              const isSelected = selectedSquare === square;
              const isLastMove = showLastMove && lastMove && (lastMove.from === square || lastMove.to === square);
              const isCheck = checkSquare === square;
              const isLegalTarget = legalMoves.some(m => m.to === square);
              const isCaptureTarget = isLegalTarget && piece !== null;

              // Square background color calculation
              let squareBg = isLight ? theme.lightSquare : theme.darkSquare;
              if (isSelected) squareBg = theme.selectedSquare;
              else if (isCheck) squareBg = theme.checkSquare;
              else if (isLastMove) squareBg = theme.lastMoveSquare;

              const isBeingDragged = dragSquare === square;

              return (
                <div
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  onPointerDown={(e) => handlePointerDown(e, square)}
                  style={{ backgroundColor: squareBg }}
                  className="chess-square relative flex items-center justify-center cursor-pointer transition-colors duration-150 touch-none select-none"
                  data-square={square}
                >
                  {/* Square Coordinates with Crisp Contrast */}
                  {showCoordinates && (
                    <>
                      {fIdx === 0 && (
                        <span
                          className={`absolute top-0.5 left-1 text-[9px] md:text-[11px] font-black leading-none select-none pointer-events-none ${
                            isLight ? 'text-zinc-600/85' : 'text-zinc-200/90'
                          }`}
                        >
                          {rank}
                        </span>
                      )}
                      {rIdx === 7 && (
                        <span
                          className={`absolute bottom-0.5 right-1 text-[9px] md:text-[11px] font-black leading-none select-none pointer-events-none ${
                            isLight ? 'text-zinc-600/85' : 'text-zinc-200/90'
                          }`}
                        >
                          {file}
                        </span>
                      )}
                    </>
                  )}

                  {/* Piece */}
                  {piece && !isBeingDragged && (
                    <div className="w-[88%] h-[88%] flex items-center justify-center piece-hoverable select-none pointer-events-none transition-transform">
                      <ChessPiece
                        type={piece.type}
                        color={piece.color}
                        theme={pieceThemeId}
                      />
                    </div>
                  )}

                  {/* Legal Move Dot Indicator */}
                  {showLegalMoves && isLegalTarget && !isCaptureTarget && (
                    <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-black/25 ring-2 ring-white/20 pointer-events-none shadow-xs" />
                  )}

                  {/* Capture Target Ring */}
                  {showLegalMoves && isCaptureTarget && (
                    <div className="absolute inset-1 rounded-xl border-3 md:border-4 border-black/30 pointer-events-none ring-1 ring-white/25" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic Vector Arrows Overlay */}
        {arrows && arrows.length > 0 && (
          <BoardArrows arrows={arrows} flipped={flipped} />
        )}

        {/* Floating Dragged Piece */}
        {dragSquare && dragPos && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 filter drop-shadow-2xl"
            style={{ left: dragPos.x, top: dragPos.y }}
          >
            {(() => {
              const p = chess.get(dragSquare);
              return p ? (
                <ChessPiece type={p.type} color={p.color} theme={pieceThemeId} />
              ) : null;
            })()}
          </div>
        )}

        {/* Pawn Promotion Modal */}
        {pendingPromotion && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 animate-fade-in p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-4 shadow-2xl text-center max-w-[280px]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">Promote Pawn</h4>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { symbol: 'q', label: 'Queen' },
                  { symbol: 'r', label: 'Rook' },
                  { symbol: 'b', label: 'Bishop' },
                  { symbol: 'n', label: 'Knight' },
                ].map(({ symbol, label }) => (
                  <button
                    key={symbol}
                    onClick={() => handlePromotionSelect(symbol)}
                    className="flex flex-col items-center p-2 rounded-2xl bg-zinc-800 hover:bg-blue-600 hover:scale-105 transition-all group"
                  >
                    <div className="w-10 h-10">
                      <ChessPiece
                        type={symbol as PieceSymbol}
                        color={chess.turn()}
                        theme={pieceThemeId}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-300 font-bold mt-1 group-hover:text-white">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
