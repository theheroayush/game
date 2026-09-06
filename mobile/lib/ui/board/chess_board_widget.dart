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
  final bool showCoordinates;
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
    this.showCoordinates = true,
    this.onMove,
    this.onBoardChanged,
  });

  @override
  State<ChessBoardWidget> createState() => _ChessBoardWidgetState();
}

class _ChessBoardWidgetState extends State<ChessBoardWidget> with SingleTickerProviderStateMixin {
  String? _selectedSquare;
  List<String> _legalDestinations = [];
  List<String> _legalCaptures = [];

  late final AnimationController _moveAnimController;
  late final Animation<double> _moveCurveAnim;
  String? _animFromSquare;
  String? _animToSquare;
  chess.Piece? _animPiece;

  @override
  void initState() {
    super.initState();
    _moveAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 260),
    );
    _moveCurveAnim = CurvedAnimation(
      parent: _moveAnimController,
      curve: Curves.easeOutCubic,
    );
    _moveAnimController.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        if (mounted) {
          setState(() {
            _animFromSquare = null;
            _animToSquare = null;
            _animPiece = null;
          });
        }
      }
    });
  }

  @override
  void dispose() {
    _moveAnimController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(ChessBoardWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.lastMoveFrom != null &&
        widget.lastMoveTo != null &&
        (widget.lastMoveFrom != oldWidget.lastMoveFrom ||
         widget.lastMoveTo != oldWidget.lastMoveTo)) {
      _startMoveAnimation(widget.lastMoveFrom!, widget.lastMoveTo!);
    }
  }

  void _startMoveAnimation(String from, String to) {
    if (from == to) return;
    if (_animFromSquare == from && _animToSquare == to && _moveAnimController.isAnimating) {
      return;
    }
    final piece = widget.game.get(to);
    if (piece == null) return;

    _moveAnimController.stop();
    setState(() {
      _animFromSquare = from;
      _animToSquare = to;
      _animPiece = piece;
    });
    _moveAnimController.forward(from: 0.0);
  }

  void _onSquareTapped(String square) {
    if (!widget.interactive) return;

    if (_selectedSquare == null) {
      final piece = widget.game.get(square);
      if (piece != null && piece.color == widget.game.turn) {
        setState(() {
          _selectedSquare = square;
          _updateLegalMoves(square);
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
            _updateLegalMoves(square);
          });
          HapticsService.light();
        } else {
          setState(() {
            _selectedSquare = null;
            _legalDestinations = [];
            _legalCaptures = [];
          });
        }
      }
    }
  }

  void _updateLegalMoves(String from) {
    final rawMoves = widget.game.moves({'verbose': true});
    final destinations = <String>[];
    final captures = <String>[];
    for (final m in rawMoves) {
      final map = m as Map<String, dynamic>;
      if (map['from'] == from) {
        final to = map['to'] as String;
        destinations.add(to);
        if (map['captured'] != null || widget.game.get(to) != null) {
          captures.add(to);
        }
      }
    }
    _legalDestinations = destinations;
    _legalCaptures = captures;
  }

  List<String> _getLegalDestinations(String from) {
    _updateLegalMoves(from);
    return _legalDestinations;
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
      'promotion': ?promotion,
    });

    if (moveSuccess) {
      _startMoveAnimation(from, to);
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

  Offset _squareToOffset(String sq, double squareSize, bool flipped) {
    if (sq.length < 2) return Offset.zero;
    final file = sq.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final rank = int.parse(sq[1]) - 1;
    final col = flipped ? 7 - file : file;
    final row = flipped ? rank : 7 - rank;
    return Offset(col * squareSize, row * squareSize);
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final availW = constraints.maxWidth;
        final availH = constraints.maxHeight > 0 ? constraints.maxHeight : constraints.maxWidth;

        final boardSize = min(availW, availH);
        final squareSize = boardSize / 8;
        final checkSq = _findKingCheckSquare();

        return Center(
          child: SizedBox(
            width: boardSize,
            height: boardSize,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                // 1. Board Background, Outlines, Inset Coordinates, and Arrows Canvas
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
                    captureSquares: _legalCaptures,
                    arrows: widget.arrows,
                    showCoordinates: widget.showCoordinates,
                    leftGutter: 0.0,
                    bottomGutter: 0.0,
                    borderRadius: 8.0,
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

                // 3. Smooth Physical "Lift-from-Ground" Piece Movement Animation Overlay
                if (_animPiece != null && _animFromSquare != null && _animToSquare != null)
                  AnimatedBuilder(
                    animation: _moveCurveAnim,
                    builder: (context, child) {
                      final t = _moveCurveAnim.value;
                      final fromOffset = _squareToOffset(_animFromSquare!, squareSize, widget.flipped);
                      final toOffset = _squareToOffset(_animToSquare!, squareSize, widget.flipped);
                      final currentOffset = Offset.lerp(fromOffset, toOffset, t)!;

                      // Physics: Lifts up from the ground, expands soft blurred shadow, and lands softly
                      final lift = sin(t * pi);
                      final scale = 1.0 + (0.15 * lift);
                      final shadowOpacity = (0.35 * lift).clamp(0.0, 0.35);

                      return Positioned(
                        left: currentOffset.dx,
                        top: currentOffset.dy,
                        width: squareSize,
                        height: squareSize,
                        child: Transform.scale(
                          scale: scale,
                          child: Container(
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              boxShadow: lift > 0.05
                                  ? [
                                      BoxShadow(
                                        color: Colors.black.withValues(alpha: shadowOpacity),
                                        blurRadius: 10 * lift,
                                        spreadRadius: 2 * lift,
                                        offset: Offset(0, 8 * lift),
                                      ),
                                    ]
                                  : const [],
                            ),
                            alignment: Alignment.center,
                            child: ChessPieceWidget(
                              type: _animPiece!.type.name.toLowerCase(),
                              color: _animPiece!.color == chess.Color.WHITE ? 'w' : 'b',
                              theme: widget.pieceTheme,
                              size: squareSize * 0.95,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
              ],
            ),
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
    final isFlying = sq == _animToSquare && _animPiece != null;

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
          child: (piece != null && !isFlying)
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
                          _updateLegalMoves(sq);
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
