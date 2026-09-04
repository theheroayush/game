import 'dart:math';
import 'package:flutter/material.dart';
import '../../models/chess_models.dart';
import '../../models/engine_config.dart';

class BoardArrow {
  final String from;
  final String to;
  final Color color;

  const BoardArrow({
    required this.from,
    required this.to,
    this.color = const Color(0xFF22C55E), // Green default
  });
}

class BoardPainter extends CustomPainter {
  final BoardThemeId themeId;
  final bool flipped;
  final String? selectedSquare;
  final String? lastMoveFrom;
  final String? lastMoveTo;
  final String? checkSquare;
  final List<String> legalSquares;
  final List<BoardArrow> arrows;
  final bool showCoordinates;

  BoardPainter({
    required this.themeId,
    required this.flipped,
    this.selectedSquare,
    this.lastMoveFrom,
    this.lastMoveTo,
    this.checkSquare,
    this.legalSquares = const [],
    this.arrows = const [],
    this.showCoordinates = true,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final squareSize = size.width / 8;
    final theme = BOARD_THEMES[themeId] ?? BOARD_THEMES[BoardThemeId.emerald]!;

    final lightPaint = Paint()..color = Color(theme.lightSquare);
    final darkPaint = Paint()..color = Color(theme.darkSquare);
    final selectedPaint = Paint()..color = Color(theme.selectedSquare).withAlpha(160);
    final lastMovePaint = Paint()..color = Color(theme.lastMoveSquare).withAlpha(120);
    final checkPaint = Paint()..color = Color(theme.checkSquare).withAlpha(180);

    // 1. Draw 8x8 squares
    for (int r = 0; r < 8; r++) {
      for (int f = 0; f < 8; f++) {
        final isLight = (r + f) % 2 == 0;
        final rect = Rect.fromLTWH(f * squareSize, r * squareSize, squareSize, squareSize);
        canvas.drawRect(rect, isLight ? lightPaint : darkPaint);

        // Calculate algebraic square
        final fileChar = String.fromCharCode('a'.codeUnitAt(0) + (flipped ? 7 - f : f));
        final rankNum = flipped ? r + 1 : 8 - r;
        final sq = '$fileChar$rankNum';

        // Last move highlight
        if (sq == lastMoveFrom || sq == lastMoveTo) {
          canvas.drawRect(rect, lastMovePaint);
        }

        // Selected square highlight
        if (sq == selectedSquare) {
          canvas.drawRect(rect, selectedPaint);
        }

        // Check highlight
        if (sq == checkSquare) {
          canvas.drawRect(rect, checkPaint);
        }

        // Coordinates
        if (showCoordinates) {
          final coordColor = isLight ? Color(theme.darkSquare) : Color(theme.lightSquare);
          final textStyle = TextStyle(color: coordColor.withAlpha(200), fontSize: 10, fontWeight: FontWeight.bold);

          // Draw rank number on left file (f == 0)
          if (f == 0) {
            final textSpan = TextSpan(text: '$rankNum', style: textStyle);
            final tp = TextPainter(text: textSpan, textDirection: TextDirection.ltr);
            tp.layout();
            tp.paint(canvas, Offset(f * squareSize + 2, r * squareSize + 2));
          }

          // Draw file letter on bottom rank (r == 7)
          if (r == 7) {
            final textSpan = TextSpan(text: fileChar, style: textStyle);
            final tp = TextPainter(text: textSpan, textDirection: TextDirection.ltr);
            tp.layout();
            tp.paint(canvas, Offset((f + 1) * squareSize - tp.width - 2, (r + 1) * squareSize - tp.height - 2));
          }
        }
      }
    }

    // 2. Draw Legal Move indicators
    final dotPaint = Paint()..color = Colors.black.withAlpha(70);

    for (final sq in legalSquares) {
      final f = flipped ? 7 - (sq.codeUnitAt(0) - 'a'.codeUnitAt(0)) : sq.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final r = flipped ? int.parse(sq[1]) - 1 : 8 - int.parse(sq[1]);
      final center = Offset(f * squareSize + squareSize / 2, r * squareSize + squareSize / 2);

      canvas.drawCircle(center, squareSize * 0.16, dotPaint);
    }

    // 3. Draw Vector Arrows
    for (final arrow in arrows) {
      _drawArrow(canvas, size, squareSize, arrow.from, arrow.to, arrow.color);
    }
  }

  void _drawArrow(Canvas canvas, Size size, double squareSize, String from, String to, Color color) {
    final f1 = flipped ? 7 - (from.codeUnitAt(0) - 'a'.codeUnitAt(0)) : from.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r1 = flipped ? int.parse(from[1]) - 1 : 8 - int.parse(from[1]);
    final f2 = flipped ? 7 - (to.codeUnitAt(0) - 'a'.codeUnitAt(0)) : to.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r2 = flipped ? int.parse(to[1]) - 1 : 8 - int.parse(to[1]);

    final start = Offset(f1 * squareSize + squareSize / 2, r1 * squareSize + squareSize / 2);
    final end = Offset(f2 * squareSize + squareSize / 2, r2 * squareSize + squareSize / 2);

    final arrowPaint = Paint()
      ..color = color.withAlpha(200)
      ..strokeWidth = 5.0
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;

    canvas.drawLine(start, end, arrowPaint);

    // Arrow head
    final angle = atan2(end.dy - start.dy, end.dx - start.dx);
    const arrowHeadLength = 16.0;
    const arrowHeadAngle = 0.45;

    final path = Path();
    path.moveTo(end.dx, end.dy);
    path.lineTo(
      end.dx - arrowHeadLength * cos(angle - arrowHeadAngle),
      end.dy - arrowHeadLength * sin(angle - arrowHeadAngle),
    );
    path.lineTo(
      end.dx - arrowHeadLength * cos(angle + arrowHeadAngle),
      end.dy - arrowHeadLength * sin(angle + arrowHeadAngle),
    );
    path.close();

    final headPaint = Paint()
      ..color = color.withAlpha(200)
      ..style = PaintingStyle.fill;

    canvas.drawPath(path, headPaint);
  }

  @override
  bool shouldRepaint(covariant BoardPainter oldDelegate) {
    return oldDelegate.themeId != themeId ||
        oldDelegate.flipped != flipped ||
        oldDelegate.selectedSquare != selectedSquare ||
        oldDelegate.lastMoveFrom != lastMoveFrom ||
        oldDelegate.lastMoveTo != lastMoveTo ||
        oldDelegate.checkSquare != checkSquare ||
        oldDelegate.legalSquares.length != legalSquares.length ||
        oldDelegate.arrows.length != arrows.length;
  }
}
