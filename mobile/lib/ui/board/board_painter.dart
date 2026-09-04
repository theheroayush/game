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
    this.color = const Color(0xFF22C55E), // Neon Green default
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
  final double leftGutter;
  final double bottomGutter;
  final double borderRadius;

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
    this.leftGutter = 22.0,
    this.bottomGutter = 22.0,
    this.borderRadius = 10.0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final effectiveLeftGutter = showCoordinates ? leftGutter : 0.0;
    final effectiveBottomGutter = showCoordinates ? bottomGutter : 0.0;

    final boardWidth = size.width - effectiveLeftGutter;
    final boardHeight = size.height - effectiveBottomGutter;
    final boardSize = min(boardWidth, boardHeight);
    final squareSize = boardSize / 8;

    final theme = BOARD_THEMES[themeId] ?? BOARD_THEMES[BoardThemeId.emerald]!;

    final lightPaint = Paint()..color = Color(theme.lightSquare);
    final darkPaint = Paint()..color = Color(theme.darkSquare);

    final boardRect = Rect.fromLTWH(effectiveLeftGutter, 0, boardSize, boardSize);
    final boardRRect = RRect.fromRectAndRadius(boardRect, Radius.circular(borderRadius));

    // 1. Draw subtle board elevation shadow
    final shadowPaint = Paint()
      ..color = Colors.black.withAlpha(140)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10.0);
    canvas.drawRRect(boardRRect.shift(const Offset(0, 3)), shadowPaint);

    // 2. Draw 8x8 Board Squares with Rounded Clipping
    canvas.save();
    canvas.clipRRect(boardRRect);

    for (int r = 0; r < 8; r++) {
      for (int f = 0; f < 8; f++) {
        final isLight = (r + f) % 2 == 0;
        final rect = Rect.fromLTWH(
          effectiveLeftGutter + f * squareSize,
          r * squareSize,
          squareSize,
          squareSize,
        );
        canvas.drawRect(rect, isLight ? lightPaint : darkPaint);

        // Calculate algebraic square
        final fileChar = String.fromCharCode('a'.codeUnitAt(0) + (flipped ? 7 - f : f));
        final rankNum = flipped ? r + 1 : 8 - r;
        final sq = '$fileChar$rankNum';

        // Last move highlight: Neon Emerald Green Glow & Outline
        if (sq == lastMoveFrom || sq == lastMoveTo) {
          final highlightRRect = RRect.fromRectAndRadius(
            rect.deflate(1.5),
            const Radius.circular(5.0),
          );

          // Translucent fill
          final fillPaint = Paint()
            ..color = const Color(0xFF22C55E).withAlpha(55)
            ..style = PaintingStyle.fill;
          canvas.drawRRect(highlightRRect, fillPaint);

          // Soft neon glow border
          final glowPaint = Paint()
            ..color = const Color(0xFF22C55E).withAlpha(110)
            ..style = PaintingStyle.stroke
            ..strokeWidth = 3.0
            ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3.5);
          canvas.drawRRect(highlightRRect, glowPaint);

          // Crisp neon green border
          final strokePaint = Paint()
            ..color = const Color(0xFF4ADE80)
            ..style = PaintingStyle.stroke
            ..strokeWidth = 2.0;
          canvas.drawRRect(highlightRRect, strokePaint);
        }

        // Selected square highlight
        if (sq == selectedSquare) {
          final selRRect = RRect.fromRectAndRadius(
            rect.deflate(1.5),
            const Radius.circular(5.0),
          );
          final selFill = Paint()
            ..color = const Color(0xFF10B981).withAlpha(80)
            ..style = PaintingStyle.fill;
          canvas.drawRRect(selRRect, selFill);

          final selStroke = Paint()
            ..color = const Color(0xFF34D399)
            ..style = PaintingStyle.stroke
            ..strokeWidth = 2.5;
          canvas.drawRRect(selRRect, selStroke);
        }

        // Check highlight (Red glow on king)
        if (sq == checkSquare) {
          final checkPaint = Paint()
            ..color = const Color(0xFFEF4444).withAlpha(160)
            ..style = PaintingStyle.fill;
          canvas.drawRect(rect, checkPaint);
        }
      }
    }

    // 3. Draw Legal Move indicators
    final moveDotPaint = Paint()..color = Colors.black.withAlpha(75);

    for (final sq in legalSquares) {
      final f = flipped ? 7 - (sq.codeUnitAt(0) - 'a'.codeUnitAt(0)) : sq.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final r = flipped ? int.parse(sq[1]) - 1 : 8 - int.parse(sq[1]);
      final center = Offset(
        effectiveLeftGutter + f * squareSize + squareSize / 2,
        r * squareSize + squareSize / 2,
      );

      canvas.drawCircle(center, squareSize * 0.15, moveDotPaint);
    }

    // 4. Draw Vector Arrows
    for (final arrow in arrows) {
      _drawArrow(canvas, effectiveLeftGutter, squareSize, arrow.from, arrow.to, arrow.color);
    }

    canvas.restore(); // End of clipped board

    // 5. Draw crisp board outline border
    final borderPaint = Paint()
      ..color = const Color(0xFF27272A)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;
    canvas.drawRRect(boardRRect, borderPaint);

    // 6. Draw Outside Coordinates (left gutter: ranks 8..1, bottom gutter: files a..h)
    if (showCoordinates) {
      const coordStyle = TextStyle(
        color: Color(0xFF94A3B8),
        fontSize: 12,
        fontWeight: FontWeight.bold,
      );

      // Ranks on left gutter
      for (int r = 0; r < 8; r++) {
        final rankNum = flipped ? r + 1 : 8 - r;
        final tp = TextPainter(
          text: TextSpan(text: '$rankNum', style: coordStyle),
          textDirection: TextDirection.ltr,
        )..layout();

        final x = (effectiveLeftGutter - tp.width) / 2 - 1.0;
        final y = r * squareSize + (squareSize - tp.height) / 2;
        tp.paint(canvas, Offset(x, y));
      }

      // Files on bottom gutter
      for (int f = 0; f < 8; f++) {
        final fileChar = String.fromCharCode('a'.codeUnitAt(0) + (flipped ? 7 - f : f));
        final tp = TextPainter(
          text: TextSpan(text: fileChar, style: coordStyle),
          textDirection: TextDirection.ltr,
        )..layout();

        final x = effectiveLeftGutter + f * squareSize + (squareSize - tp.width) / 2;
        final y = boardSize + (effectiveBottomGutter - tp.height) / 2 + 1.0;
        tp.paint(canvas, Offset(x, y));
      }
    }
  }

  void _drawArrow(Canvas canvas, double leftGutter, double squareSize, String from, String to, Color color) {
    final f1 = flipped ? 7 - (from.codeUnitAt(0) - 'a'.codeUnitAt(0)) : from.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r1 = flipped ? int.parse(from[1]) - 1 : 8 - int.parse(from[1]);
    final f2 = flipped ? 7 - (to.codeUnitAt(0) - 'a'.codeUnitAt(0)) : to.codeUnitAt(0) - 'a'.codeUnitAt(0);
    final r2 = flipped ? int.parse(to[1]) - 1 : 8 - int.parse(to[1]);

    final start = Offset(leftGutter + f1 * squareSize + squareSize / 2, r1 * squareSize + squareSize / 2);
    final end = Offset(leftGutter + f2 * squareSize + squareSize / 2, r2 * squareSize + squareSize / 2);

    final arrowPaint = Paint()
      ..color = color.withAlpha(220)
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
      ..color = color.withAlpha(220)
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
        oldDelegate.arrows.length != arrows.length ||
        oldDelegate.showCoordinates != showCoordinates ||
        oldDelegate.leftGutter != leftGutter ||
        oldDelegate.bottomGutter != bottomGutter ||
        oldDelegate.borderRadius != borderRadius;
  }
}
