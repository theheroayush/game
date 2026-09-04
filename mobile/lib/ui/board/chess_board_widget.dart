import 'dart:math';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import 'board_painter.dart';
import 'staunton_pieces.dart';

class ChessBoardWidget extends StatefulWidget {
  final chess.Chess game;
  final bool flipped;
  final BoardThemeId boardTheme;
  final PieceThemeId pieceTheme;
  final bool interactive;
  final String? lastMoveFrom;
  final String? lastMoveTo;
  final List<BoardArrow> arrows;
  final Function(String from, String to, String? promotion)? onMove;
  final VoidCallback? onBoardChanged;

  const ChessBoardWidget({
    super.key,
    required this.game,
    this.flipped = false,
    this.boardTheme = BoardThemeId.emerald,
    this.pieceTheme = PieceThemeId.staunton,
    this.interactive = true,
    this.lastMoveFrom,
    this.lastMoveTo,
    this.arrows = const [],
    this.onMove,
    this.onBoardChanged,
  });

  @override
  State<ChessBoardWidget> createState() => _ChessBoardWidgetState();
}

class _ChessBoardWidgetState extends State<ChessBoardWidget> {
  String? _selectedSquare;
  List<String> _legalDestinations = [];

  void _onSquareTapped(String square) {
    if (!widget.interactive) return;

    if (_selectedSquare == null) {
      final piece = widget.game.get(square);
      if (piece != null && piece.color == widget.game.turn) {
        setState(() {
          _selectedSquare = square;
          _legalDestinations = _getLegalDestinations(square);
        });
        HapticsService.light();
      }
    } else {
      if (_legalDestinations.contains(square)) {
        _executeMove(_selectedSquare!, square);
      } else {
        final piece = widget.game.get(square);
        if (piece != null && piece.color == widget.game.turn) {
          setState(() {
            _selectedSquare = square;
            _legalDestinations = _getLegalDestinations(square);
          });
          HapticsService.light();
        } else {
          setState(() {
            _selectedSquare = null;
            _legalDestinations = [];
          });
        }
      }
    }
  }

  List<String> _getLegalDestinations(String from) {
    final rawMoves = widget.game.moves({'verbose': true});
    final destinations = <String>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (map['from'] == from) {
        destinations.add(map['to'] as String);
      }
    }
    return destinations;
  }

  void _executeMove(String from, String to) {
    final piece = widget.game.get(from);
    final isPawnPromotion = piece?.type == chess.PieceType.PAWN &&
        ((piece?.color == chess.Color.WHITE && to.endsWith('8')) ||
            (piece?.color == chess.Color.BLACK && to.endsWith('1')));

    if (isPawnPromotion) {
      _showPromotionDialog(from, to);
    } else {
      _finalizeMove(from, to, null);
    }
  }

  void _showPromotionDialog(String from, String to) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF18181B),
        title: const Text('Promote Pawn', style: TextStyle(color: Colors.white, fontSize: 18)),
        content: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: ['q', 'r', 'b', 'n'].map((p) {
            return InkWell(
              onTap: () {
                Navigator.of(ctx).pop();
                _finalizeMove(from, to, p);
              },
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFF27272A),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: ChessPieceWidget(
                  type: p,
                  color: widget.game.turn == chess.Color.WHITE ? 'w' : 'b',
                  theme: widget.pieceTheme,
                  size: 44,
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  void _finalizeMove(String from, String to, String? promotion) {
    setState(() {
      _selectedSquare = null;
      _legalDestinations = [];
    });

    final targetPiece = widget.game.get(to);
    final isCapture = targetPiece != null;

    final moveSuccess = widget.game.move({
      'from': from,
      'to': to,
      if (promotion != null) 'promotion': promotion,
    });

    if (moveSuccess) {
      if (isCapture) {
        SoundService.playCapture();
        HapticsService.medium();
      } else {
        SoundService.playMove();
        HapticsService.light();
      }

      if (widget.game.in_check) {
        SoundService.playCheck();
        HapticsService.heavy();
      }

      widget.onMove?.call(from, to, promotion);
      widget.onBoardChanged?.call();
    }
  }

  String? _findKingCheckSquare() {
    if (!widget.game.in_check) return null;
    final turn = widget.game.turn;
    for (int rank = 1; rank <= 8; rank++) {
      for (int file = 0; file < 8; file++) {
        final sq = String.fromCharCode('a'.codeUnitAt(0) + file) + rank.toString();
        final p = widget.game.get(sq);
        if (p != null && p.type == chess.PieceType.KING && p.color == turn) {
          return sq;
        }
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final boardSize = min(constraints.maxWidth, constraints.maxHeight > 0 ? constraints.maxHeight : constraints.maxWidth);
        final squareSize = boardSize / 8;
        final checkSq = _findKingCheckSquare();

        return SizedBox(
          width: boardSize,
          height: boardSize,
          child: Stack(
            children: [
              // 1. Board Background and Arrows Canvas
              CustomPaint(
                size: Size(boardSize, boardSize),
                painter: BoardPainter(
                  themeId: widget.boardTheme,
                  flipped: widget.flipped,
                  selectedSquare: _selectedSquare,
                  lastMoveFrom: widget.lastMoveFrom,
                  lastMoveTo: widget.lastMoveTo,
                  checkSquare: checkSq,
                  legalSquares: _legalDestinations,
                  arrows: widget.arrows,
                ),
              ),

              // 2. Interactive Pieces & Tap detector Grid
              for (int r = 0; r < 8; r++)
                for (int f = 0; f < 8; f++)
                  Positioned(
                    left: f * squareSize,
                    top: r * squareSize,
                    width: squareSize,
                    height: squareSize,
                    child: _buildSquareInteractive(f, r, squareSize),
                  ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSquareInteractive(int f, int r, double squareSize) {
    final fileChar = String.fromCharCode('a'.codeUnitAt(0) + (widget.flipped ? 7 - f : f));
    final rankNum = widget.flipped ? r + 1 : 8 - r;
    final sq = '$fileChar$rankNum';
    final piece = widget.game.get(sq);

    return DragTarget<String>(
      onWillAcceptWithDetails: (details) {
        return widget.interactive && details.data != sq;
      },
      onAcceptWithDetails: (details) {
        final from = details.data;
        final legal = _getLegalDestinations(from);
        if (legal.contains(sq)) {
          _executeMove(from, sq);
        }
      },
      builder: (context, candidateData, rejectedData) {
        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () => _onSquareTapped(sq),
          child: piece != null
              ? (widget.interactive && piece.color == widget.game.turn
                  ? Draggable<String>(
                      data: sq,
                      feedback: Material(
                        color: Colors.transparent,
                        child: ChessPieceWidget(
                          type: piece.type.name.toLowerCase(),
                          color: piece.color == chess.Color.WHITE ? 'w' : 'b',
                          theme: widget.pieceTheme,
                          size: squareSize * 1.15,
                        ),
                      ),
                      childWhenDragging: Opacity(
                        opacity: 0.25,
                        child: ChessPieceWidget(
                          type: piece.type.name.toLowerCase(),
                          color: piece.color == chess.Color.WHITE ? 'w' : 'b',
                          theme: widget.pieceTheme,
                          size: squareSize * 0.95,
                        ),
                      ),
                      onDragStarted: () {
                        setState(() {
                          _selectedSquare = sq;
                          _legalDestinations = _getLegalDestinations(sq);
                        });
                        HapticsService.light();
                      },
                      child: ChessPieceWidget(
                        type: piece.type.name.toLowerCase(),
                        color: piece.color == chess.Color.WHITE ? 'w' : 'b',
                        theme: widget.pieceTheme,
                        size: squareSize * 0.95,
                      ),
                    )
                  : ChessPieceWidget(
                      type: piece.type.name.toLowerCase(),
                      color: piece.color == chess.Color.WHITE ? 'w' : 'b',
                      theme: widget.pieceTheme,
                      size: squareSize * 0.95,
                    ))
              : const SizedBox.shrink(),
        );
      },
    );
  }
}
