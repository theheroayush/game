import 'package:flutter/material.dart';

class EvalSplinePainter extends CustomPainter {
  final List<double> evaluations;
  final int currentPly;

  EvalSplinePainter({
    required this.evaluations,
    required this.currentPly,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (evaluations.isEmpty) return;

    final bgPaint = Paint()..color = const Color(0xFF18181B);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, size.width, size.height), const Radius.circular(8)), bgPaint);

    final midY = size.height / 2;
    final baselinePaint = Paint()
      ..color = Colors.white.withAlpha(40)
      ..strokeWidth = 1.0;
    canvas.drawLine(Offset(0, midY), Offset(size.width, midY), baselinePaint);

    final n = evaluations.length;
    final stepX = n > 1 ? size.width / (n - 1) : size.width;

    final points = <Offset>[];
    for (int i = 0; i < n; i++) {
      final cp = evaluations[i].clamp(-1000.0, 1000.0);
      // Normalized between 0 and 1, where 1000cp is top (y=0) and -1000cp is bottom (y=height)
      final norm = (cp + 1000.0) / 2000.0;
      final y = size.height - (norm * size.height);
      points.add(Offset(i * stepX, y));
    }

    // Path for curve
    final path = Path();
    path.moveTo(points.first.dx, points.first.dy);

    for (int i = 0; i < points.length - 1; i++) {
      final p0 = points[i];
      final p1 = points[i + 1];
      final controlX = (p0.dx + p1.dx) / 2;
      path.cubicTo(controlX, p0.dy, controlX, p1.dy, p1.dx, p1.dy);
    }

    final strokePaint = Paint()
      ..color = const Color(0xFF10B981)
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, strokePaint);

    // Current ply vertical cursor line and dot
    if (currentPly >= 0 && currentPly < points.length) {
      final currentPt = points[currentPly];
      final cursorPaint = Paint()
        ..color = const Color(0xFFF59E0B)
        ..strokeWidth = 1.5;
      canvas.drawLine(Offset(currentPt.dx, 0), Offset(currentPt.dx, size.height), cursorPaint);

      final dotPaint = Paint()..color = const Color(0xFFF59E0B);
      canvas.drawCircle(currentPt, 4.5, dotPaint);
    }
  }

  @override
  bool shouldRepaint(covariant EvalSplinePainter oldDelegate) {
    return oldDelegate.currentPly != currentPly || oldDelegate.evaluations.length != evaluations.length;
  }
}
