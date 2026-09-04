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
  final List<String> captureSquares;
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
    this.captureSquares = const [],
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

        // Last move highlight: Elegant translucent warm gold (Chess.com parity)
        if (sq == lastMoveFrom || sq == lastMoveTo) {
          final lastMovePaint = Paint()
            ..color = isLight
                ? const Color(0xFFF7EC74).withAlpha(140)
                : const Color(0xFFDAC33C).withAlpha(160)
            ..style = PaintingStyle.fill;
          canvas.drawRect(rect, lastMovePaint);
        }

        // Selected square highlight: Chess.com Olive/Sage Tint
        if (sq == selectedSquare) {
          final selPaint = Paint()
            ..color = isLight
                ? const Color(0xFFBACA44).withAlpha(190)
                : const Color(0xFF8A9A2A).withAlpha(200)
            ..style = PaintingStyle.fill;
          canvas.drawRect(rect, selPaint);
        }

        // Check highlight: Smooth crimson radial gradient on King
        if (sq == checkSquare) {
          final center = rect.center;
          final radius = squareSize * 0.7;
          final checkGradient = RadialGradient(
            colors: [
              const Color(0xFFEF4444).withAlpha(210),
              const Color(0xFFEF4444).withAlpha(130),
              const Color(0xFFDC2626).withAlpha(0),
            ],
            stops: const [0.0, 0.6, 1.0],
          );
          final checkPaint = Paint()
            ..shader = checkGradient.createShader(Rect.fromCircle(center: center, radius: radius));
          canvas.drawRect(rect, checkPaint);
        }
      }
    }

    // 3. Draw Legal Move indicators (Chess.com: solid dot for quiet, circular ring for capture)
    final moveDotPaint = Paint()
      ..color = Colors.black.withAlpha(45)
      ..style = PaintingStyle.fill;

    final captureRingPaint = Paint()
      ..color = Colors.black.withAlpha(45)
      ..style = PaintingStyle.stroke
      ..strokeWidth = max(2.5, squareSize * 0.08);

    for (final sq in legalSquares) {
      final f = flipped ? 7 - (sq.codeUnitAt(0) - 'a'.codeUnitAt(0)) : sq.codeUnitAt(0) - 'a'.codeUnitAt(0);
      final r = flipped ? int.parse(sq[1]) - 1 : 8 - int.parse(sq[1]);
      final center = Offset(
        effectiveLeftGutter + f * squareSize + squareSize / 2,
        r * squareSize + squareSize / 2,
      );

      if (captureSquares.contains(sq)) {
        canvas.drawCircle(center, squareSize * 0.42, captureRingPaint);
      } else {
        canvas.drawCircle(center, squareSize * 0.14, moveDotPaint);
      }
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
