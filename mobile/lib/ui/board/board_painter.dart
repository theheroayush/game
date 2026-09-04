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
    this.color = const Color(0xFF10B981), // Emerald green default
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

    final lightColor = Color(theme.lightSquare);
    final darkColor = Color(theme.darkSquare);
    final selectedPaint = Paint()..color = const Color(0xFF10B981).withAlpha(120);
    final lastMovePaint = Paint()..color = const Color(0xFFF59E0B).withAlpha(100);
    final checkPaint = Paint()
      ..shader = RadialGradient(
        colors: [const Color(0xFFEF4444).withAlpha(220), const Color(0xFFEF4444).withAlpha(40)],
      ).createShader(Rect.fromLTWH(0, 0, squareSize, squareSize));

    // Outer border stroke
    final borderPaint = Paint()
      ..color = const Color(0xFF27272A)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, size.width, size.height), const Radius.circular(8)), borderPaint);

    // 1. Draw 8x8 squares
    for (int r = 0; r < 8; r++) {
      for (int f = 0; f < 8; f++) {
        final isLight = (r + f) % 2 == 0;
        final rect = Rect.fromLTWH(f * squareSize, r * squareSize, squareSize, squareSize);
        final basePaint = Paint()..color = isLight ? lightColor : darkColor;
        canvas.drawRect(rect, basePaint);

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
          canvas.save();
          canvas.translate(rect.left, rect.top);
          canvas.drawRect(Rect.fromLTWH(0, 0, squareSize, squareSize), checkPaint);
          canvas.restore();
        }

        // Coordinates
        if (showCoordinates) {
          final coordColor = isLight ? darkColor : lightColor;
          final textStyle = TextStyle(
            color: coordColor.withAlpha(190),
            fontSize: squareSize * 0.22,
            fontWeight: FontWeight.bold,
          );

          // Draw rank number on left file (f == 0)
          if (f == 0) {
            final textSpan = TextSpan(text: '$rankNum', style: textStyle);
            final tp = TextPainter(text: textSpan, textDirection: TextDirection.ltr);
            tp.layout();
            tp.paint(canvas, Offset(f * squareSize + 3, r * squareSize + 2));
          }

          // Draw file letter on bottom rank (r == 7)
          if (r == 7) {
            final textSpan = TextSpan(text: fileChar, style: textStyle);
            final tp = TextPainter(text: textSpan, textDirection: TextDirection.ltr);
            tp.layout();
            tp.paint(canvas, Offset((f + 1) * squareSize - tp.width - 3, (r + 1) * squareSize - tp.height - 2));
          }
        }
      }
    }

    // 2. Draw Legal Move indicators with soft halos
    final dotPaint = Paint()..color = const Color(0xFF10B981).withAlpha(160);
    final haloPaint = Paint()
      ..color = const Color(0xFF10B981).withAlpha(50)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2.0);

    for (final sq in legalSquares) {
      final f = flipped ? 7 - (sq.codeUnitAt(0) - 'a'.codeUnitAt(0)) : sq.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final r = flipped ? int.parse(sq[1]) - 1 : 8 - int.parse(sq[1]);
      final center = Offset(f * squareSize + squareSize / 2, r * squareSize + squareSize / 2);

      canvas.drawCircle(center, squareSize * 0.20, haloPaint);
      canvas.drawCircle(center, squareSize * 0.14, dotPaint);
    }

    // 3. Draw Vector Arrows
    for (final arrow in arrows) {
      _drawArrow(canvas, size, squareSize, arrow.from, arrow.to, arrow.color);
    }
  }

  void _drawArrow(Canvas canvas, Size size, double sqSize, String from, String to, Color color) {
    final f1 = flipped ? 7 - (from.codeUnitAt(0) - 'a'.codeUnitAt(0)) : from.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r1 = flipped ? int.parse(from[1]) - 1 : 8 - int.parse(from[1]);
    final f2 = flipped ? 7 - (to.codeUnitAt(0) - 'a'.codeUnitAt(0)) : to.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r2 = flipped ? int.parse(to[1]) - 1 : 8 - int.parse(to[1]);

    final start = Offset(f1 * sqSize + sqSize / 2, r1 * sqSize + sqSize / 2);
    final end = Offset(f2 * sqSize + sqSize / 2, r2 * sqSize + sqSize / 2);

    final dx = end.dx - start.dx;
    final dy = end.dy - start.dy;
    final angle = atan2(dy, dx);
    final length = sqrt(dx * dx + dy * dy);

    if (length < 10) return;

    final shaftPaint = Paint()
      ..color = color.withAlpha(210)
      ..strokeWidth = sqSize * 0.16
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;

    final headPaint = Paint()
      ..color = color.withAlpha(230)
      ..style = PaintingStyle.fill;

    // Shorten line slightly so arrow head fits cleanly
    final headLength = sqSize * 0.36;
    final lineEnd = Offset(
      start.dx + (length - headLength * 0.7) * cos(angle),
      start.dy + (length - headLength * 0.7) * sin(angle),
    );

    canvas.drawLine(start, lineEnd, shaftPaint);

    // Arrowhead
    final headPath = Path();
    final p0 = end;
    final p1 = Offset(end.dx - headLength * cos(angle - pi / 6), end.dy - headLength * sin(angle - pi / 6));
    final p2 = Offset(end.dx - headLength * cos(angle + pi / 6), end.dy - headLength * sin(angle + pi / 6));

    headPath.moveTo(p0.dx, p0.dy);
    headPath.lineTo(p1.dx, p1.dy);
    headPath.lineTo(p2.dx, p2.dy);
    headPath.close();

    canvas.drawPath(headPath, headPaint);
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
