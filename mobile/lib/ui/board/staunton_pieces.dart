import 'dart:math';
import 'package:flutter/material.dart';
import '../../models/chess_models.dart';

class ChessPieceWidget extends StatelessWidget {
  final String type; // 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
  final String color; // 'w' | 'b'
  final PieceThemeId theme;
  final double size;

  const ChessPieceWidget({
    super.key,
    required this.type,
    required this.color,
    this.theme = PieceThemeId.staunton,
    this.size = 40.0,
  });

  @override
  Widget build(BuildContext context) {
    final bool isWhite = color == 'w';

    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        size: Size(size, size),
        painter: VectorPiecePainter(
          type: type.toLowerCase(),
          isWhite: isWhite,
          theme: theme,
        ),
      ),
    );
  }
}

class VectorPiecePainter extends CustomPainter {
  final String type;
  final bool isWhite;
  final PieceThemeId theme;

  VectorPiecePainter({
    required this.type,
    required this.isWhite,
    required this.theme,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Palette resolution based on Theme
    final themeColors = _resolveThemePalette(theme, isWhite);

    // Subtle drop shadow for depth
    final shadowPaint = Paint()
      ..color = Colors.black.withAlpha(theme == PieceThemeId.neoEmerald ? 40 : 80)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3.0);
    canvas.save();
    canvas.translate(1.0, 2.0);
    _drawPieceGeometry(canvas, size, shadowPaint, false);
    canvas.restore();

    // Main piece body gradient paint
    final bodyPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          themeColors.gradientStart,
          themeColors.gradientMiddle,
          themeColors.gradientEnd,
        ],
        stops: const [0.0, 0.45, 1.0],
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    _drawPieceGeometry(canvas, size, bodyPaint, true);

    // Stroke / Rim highlight paint
    final strokePaint = Paint()
      ..color = themeColors.rimColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = max(1.2, w * 0.038)
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    if (theme == PieceThemeId.neoEmerald) {
      // Glow effect for Neo Emerald theme
      final glowPaint = Paint()
        ..color = (isWhite ? const Color(0xFF10B981) : const Color(0xFF00D26A)).withAlpha(90)
        ..style = PaintingStyle.stroke
        ..strokeWidth = max(2.5, w * 0.08)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2.5);
      _drawPieceGeometry(canvas, size, glowPaint, false);
    }

    _drawPieceGeometry(canvas, size, strokePaint, false);

    // Internal accents (crown crosses, knight eyes, rook battlements)
    _drawInnerDetails(canvas, size, themeColors.detailColor);
  }

  void _drawPieceGeometry(Canvas canvas, Size size, Paint paint, bool isFill) {
    final w = size.width;
    final h = size.height;
    final path = Path();

    switch (type) {
      case 'p': // Pawn
        // Base
        path.moveTo(w * 0.22, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.78, h * 0.88);
        path.lineTo(w * 0.72, h * 0.80);
        // Pedestal
        path.quadraticBezierTo(w * 0.62, h * 0.70, w * 0.58, h * 0.52);
        // Collar
        path.lineTo(w * 0.64, h * 0.48);
        path.lineTo(w * 0.62, h * 0.44);
        path.lineTo(w * 0.38, h * 0.44);
        path.lineTo(w * 0.36, h * 0.48);
        path.lineTo(w * 0.42, h * 0.52);
        // Neck to Base
        path.quadraticBezierTo(w * 0.38, h * 0.70, w * 0.28, h * 0.80);
        path.close();

        // Head sphere
        path.addOval(Rect.fromCircle(center: Offset(w * 0.5, h * 0.30), radius: w * 0.18));
        break;

      case 'r': // Rook
        // Base
        path.moveTo(w * 0.18, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.82, h * 0.88);
        path.lineTo(w * 0.75, h * 0.80);
        // Tower Shaft
        path.lineTo(w * 0.68, h * 0.42);
        // Tower Collar
        path.lineTo(w * 0.78, h * 0.38);
        // Crenellations (3 battlements)
        path.lineTo(w * 0.78, h * 0.20);
        path.lineTo(w * 0.66, h * 0.20);
        path.lineTo(w * 0.66, h * 0.28);
        path.lineTo(w * 0.56, h * 0.28);
        path.lineTo(w * 0.56, h * 0.20);
        path.lineTo(w * 0.44, h * 0.20);
        path.lineTo(w * 0.44, h * 0.28);
        path.lineTo(w * 0.34, h * 0.28);
        path.lineTo(w * 0.34, h * 0.20);
        path.lineTo(w * 0.22, h * 0.20);
        // Left side down
        path.lineTo(w * 0.22, h * 0.38);
        path.lineTo(w * 0.32, h * 0.42);
        path.lineTo(w * 0.25, h * 0.80);
        path.close();
        break;

      case 'n': // Knight
        // Sculpted Equine Silhouette
        path.moveTo(w * 0.20, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.80, h * 0.88);
        path.lineTo(w * 0.74, h * 0.80);
        // Arched back of neck & mane
        path.quadraticBezierTo(w * 0.72, h * 0.50, w * 0.62, h * 0.32);
        // Ears
        path.lineTo(w * 0.65, h * 0.18);
        path.lineTo(w * 0.55, h * 0.22);
        path.lineTo(w * 0.52, h * 0.16);
        path.lineTo(w * 0.45, h * 0.24);
        // Forehead and Muzzle
        path.quadraticBezierTo(w * 0.32, h * 0.28, w * 0.24, h * 0.42);
        // Mouth cut and Jaw
        path.lineTo(w * 0.30, h * 0.50);
        path.lineTo(w * 0.36, h * 0.48);
        // Neck to Chest
        path.quadraticBezierTo(w * 0.46, h * 0.64, w * 0.26, h * 0.80);
        path.close();
        break;

      case 'b': // Bishop
        // Base
        path.moveTo(w * 0.20, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.80, h * 0.88);
        path.lineTo(w * 0.73, h * 0.80);
        // Tapered Pedestal
        path.quadraticBezierTo(w * 0.64, h * 0.68, w * 0.60, h * 0.52);
        // Collar
        path.lineTo(w * 0.66, h * 0.48);
        path.lineTo(w * 0.34, h * 0.48);
        path.lineTo(w * 0.40, h * 0.52);
        path.quadraticBezierTo(w * 0.36, h * 0.68, w * 0.27, h * 0.80);
        path.close();

        // Mitre Dome
        path.moveTo(w * 0.34, h * 0.46);
        path.quadraticBezierTo(w * 0.30, h * 0.32, w * 0.50, h * 0.18);
        path.quadraticBezierTo(w * 0.70, h * 0.32, w * 0.66, h * 0.46);
        path.close();

        // Top finial ball
        path.addOval(Rect.fromCircle(center: Offset(w * 0.50, h * 0.14), radius: w * 0.055));
        break;

      case 'q': // Queen
        // Base
        path.moveTo(w * 0.16, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.84, h * 0.88);
        path.lineTo(w * 0.76, h * 0.80);
        // Pedestal to Collar
        path.quadraticBezierTo(w * 0.64, h * 0.66, w * 0.58, h * 0.54);
        path.lineTo(w * 0.64, h * 0.50);
        path.lineTo(w * 0.36, h * 0.50);
        path.lineTo(w * 0.42, h * 0.54);
        path.quadraticBezierTo(w * 0.36, h * 0.66, w * 0.24, h * 0.80);
        path.close();

        // Flared Crown with 5 cusps
        path.moveTo(w * 0.36, h * 0.48);
        path.lineTo(w * 0.22, h * 0.28); // Far left cusp
        path.lineTo(w * 0.34, h * 0.34);
        path.lineTo(w * 0.38, h * 0.22); // Mid left cusp
        path.lineTo(w * 0.46, h * 0.32);
        path.lineTo(w * 0.50, h * 0.18); // Center cusp
        path.lineTo(w * 0.54, h * 0.32);
        path.lineTo(w * 0.62, h * 0.22); // Mid right cusp
        path.lineTo(w * 0.66, h * 0.34);
        path.lineTo(w * 0.78, h * 0.28); // Far right cusp
        path.lineTo(w * 0.64, h * 0.48);
        path.close();

        // 5 Crown pearls
        path.addOval(Rect.fromCircle(center: Offset(w * 0.22, h * 0.26), radius: w * 0.035));
        path.addOval(Rect.fromCircle(center: Offset(w * 0.38, h * 0.20), radius: w * 0.035));
        path.addOval(Rect.fromCircle(center: Offset(w * 0.50, h * 0.16), radius: w * 0.040));
        path.addOval(Rect.fromCircle(center: Offset(w * 0.62, h * 0.20), radius: w * 0.035));
        path.addOval(Rect.fromCircle(center: Offset(w * 0.78, h * 0.26), radius: w * 0.035));
        break;

      case 'k': // King
        // Base
        path.moveTo(w * 0.16, h * 0.88);
        path.quadraticBezierTo(w * 0.5, h * 0.94, w * 0.84, h * 0.88);
        path.lineTo(w * 0.76, h * 0.80);
        // Pedestal
        path.quadraticBezierTo(w * 0.64, h * 0.64, w * 0.59, h * 0.50);
        path.lineTo(w * 0.66, h * 0.46);
        path.lineTo(w * 0.34, h * 0.46);
        path.lineTo(w * 0.41, h * 0.50);
        path.quadraticBezierTo(w * 0.36, h * 0.64, w * 0.24, h * 0.80);
        path.close();

        // Royal Arch Crown Dome
        path.moveTo(w * 0.34, h * 0.44);
        path.quadraticBezierTo(w * 0.26, h * 0.28, w * 0.50, h * 0.24);
        path.quadraticBezierTo(w * 0.74, h * 0.28, w * 0.66, h * 0.44);
        path.close();

        // Cross Pattée on summit
        // Vertical arm
        path.addRect(Rect.fromLTWH(w * 0.465, h * 0.08, w * 0.07, h * 0.16));
        // Horizontal arm
        path.addRect(Rect.fromLTWH(w * 0.385, h * 0.125, w * 0.23, h * 0.07));
        break;
    }

    canvas.drawPath(path, paint);
  }

  void _drawInnerDetails(Canvas canvas, Size size, Color detailColor) {
    final w = size.width;
    final h = size.height;
    final detailPaint = Paint()
      ..color = detailColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = max(1.0, w * 0.03);

    if (type == 'b') {
      // Diagonal slash in Bishop mitre
      canvas.drawLine(Offset(w * 0.44, h * 0.30), Offset(w * 0.58, h * 0.38), detailPaint);
    } else if (type == 'n') {
      // Knight eye and nostril
      final dotPaint = Paint()..color = detailColor;
      canvas.drawCircle(Offset(w * 0.38, h * 0.34), w * 0.035, dotPaint);
      canvas.drawLine(Offset(w * 0.52, h * 0.36), Offset(w * 0.60, h * 0.44), detailPaint);
    } else if (type == 'k') {
      // Crown central rib line
      canvas.drawLine(Offset(w * 0.50, h * 0.26), Offset(w * 0.50, h * 0.44), detailPaint);
    }
  }

  _PiecePalette _resolveThemePalette(PieceThemeId t, bool isW) {
    switch (t) {
      case PieceThemeId.neoEmerald:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFECFDF5),
            gradientMiddle: const Color(0xFFA7F3D0),
            gradientEnd: const Color(0xFF10B981),
            rimColor: const Color(0xFF047857),
            detailColor: const Color(0xFF065F46),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF1F2937),
            gradientMiddle: const Color(0xFF111827),
            gradientEnd: const Color(0xFF030712),
            rimColor: const Color(0xFF10B981),
            detailColor: const Color(0xFF34D399),
          );
        }

      case PieceThemeId.royalGold:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFFFFBEB),
            gradientMiddle: const Color(0xFFFEF3C7),
            gradientEnd: const Color(0xFFFDE68A),
            rimColor: const Color(0xFFD97706),
            detailColor: const Color(0xFFB45309),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF2E1065),
            gradientMiddle: const Color(0xFF1E1B4B),
            gradientEnd: const Color(0xFF0F172A),
            rimColor: const Color(0xFFF59E0B),
            detailColor: const Color(0xFFFBBF24),
          );
        }

      case PieceThemeId.woodcraft:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFFEF3C7),
            gradientMiddle: const Color(0xFFFDE68A),
            gradientEnd: const Color(0xFFF59E0B),
            rimColor: const Color(0xFF92400E),
            detailColor: const Color(0xFF78350F),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF78350F),
            gradientMiddle: const Color(0xFF451A03),
            gradientEnd: const Color(0xFF291002),
            rimColor: const Color(0xFFB45309),
            detailColor: const Color(0xFFFDE68A),
          );
        }

      case PieceThemeId.darkObsidian:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFF1F5F9),
            gradientMiddle: const Color(0xFFCBD5E1),
            gradientEnd: const Color(0xFF94A3B8),
            rimColor: const Color(0xFF0284C7),
            detailColor: const Color(0xFF0284C7),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF18181B),
            gradientMiddle: const Color(0xFF09090B),
            gradientEnd: const Color(0xFF000000),
            rimColor: const Color(0xFFEF4444),
            detailColor: const Color(0xFFF87171),
          );
        }

      case PieceThemeId.alphaMinimal:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFFFFFFF),
            gradientMiddle: const Color(0xFFF8FAFC),
            gradientEnd: const Color(0xFFE2E8F0),
            rimColor: const Color(0xFF0F172A),
            detailColor: const Color(0xFF475569),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF334155),
            gradientMiddle: const Color(0xFF1E293B),
            gradientEnd: const Color(0xFF0F172A),
            rimColor: const Color(0xFF94A3B8),
            detailColor: const Color(0xFFCBD5E1),
          );
        }

      case PieceThemeId.cyberGlass:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFF0FDF4),
            gradientMiddle: const Color(0xFFE0F2FE),
            gradientEnd: const Color(0xFFBAE6FD),
            rimColor: const Color(0xFF0284C7),
            detailColor: const Color(0xFF0369A1),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF0C4A6E),
            gradientMiddle: const Color(0xFF082F49),
            gradientEnd: const Color(0xFF031826),
            rimColor: const Color(0xFF38BDF8),
            detailColor: const Color(0xFF7DD3FC),
          );
        }

      case PieceThemeId.staunton:
        if (isW) {
          return _PiecePalette(
            gradientStart: const Color(0xFFFFFFFF),
            gradientMiddle: const Color(0xFFF8FAFC),
            gradientEnd: const Color(0xFFE2E8F0),
            rimColor: const Color(0xFF1E293B),
            detailColor: const Color(0xFF334155),
          );
        } else {
          return _PiecePalette(
            gradientStart: const Color(0xFF27272A),
            gradientMiddle: const Color(0xFF18181B),
            gradientEnd: const Color(0xFF09090B),
            rimColor: const Color(0xFF71717A),
            detailColor: const Color(0xFFA1A1AA),
          );
        }
    }
  }

  @override
  bool shouldRepaint(covariant VectorPiecePainter oldDelegate) {
    return oldDelegate.type != type || oldDelegate.isWhite != isWhite || oldDelegate.theme != theme;
  }
}

class _PiecePalette {
  final Color gradientStart;
  final Color gradientMiddle;
  final Color gradientEnd;
  final Color rimColor;
  final Color detailColor;

  const _PiecePalette({
    required this.gradientStart,
    required this.gradientMiddle,
    required this.gradientEnd,
    required this.rimColor,
    required this.detailColor,
  });
}
