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

    // Unicode international Staunton representation with custom theme styling
    String symbol = '';
    switch (type.toLowerCase()) {
      case 'k': symbol = isWhite ? '♔' : '♚'; break;
      case 'q': symbol = isWhite ? '♕' : '♛'; break;
      case 'r': symbol = isWhite ? '♖' : '♜'; break;
      case 'b': symbol = isWhite ? '♗' : '♝'; break;
      case 'n': symbol = isWhite ? '♘' : '♞'; break;
      case 'p': symbol = isWhite ? '♙' : '♟'; break;
    }

    Color pieceColor;
    Color strokeColor;

    switch (theme) {
      case PieceThemeId.woodcraft:
        pieceColor = isWhite ? const Color(0xFFFEF3C7) : const Color(0xFF451A03);
        strokeColor = isWhite ? const Color(0xFF78350F) : const Color(0xFF1C0A00);
        break;
      case PieceThemeId.alpha:
        pieceColor = isWhite ? const Color(0xFFE0F2FE) : const Color(0xFF0F172A);
        strokeColor = isWhite ? const Color(0xFF0284C7) : const Color(0xFF38BDF8);
        break;
      case PieceThemeId.neo:
        pieceColor = isWhite ? const Color(0xFFF8FAFC) : const Color(0xFF18181B);
        strokeColor = isWhite ? const Color(0xFF334155) : const Color(0xFF000000);
        break;
      case PieceThemeId.minimal:
        pieceColor = isWhite ? const Color(0xFFF8FAFC) : const Color(0xFF18181B);
        strokeColor = isWhite ? const Color(0xFF71717A) : const Color(0xFFA1A1AA);
        break;
      case PieceThemeId.staunton:
        // Rich ivory porcelain for white, deep obsidian gloss for black matching reference
        pieceColor = isWhite ? const Color(0xFFFBF9F0) : const Color(0xFF181B1E);
        strokeColor = isWhite ? const Color(0xFF3E3A32) : const Color(0xFF0A0C0E);
        break;
    }

    return SizedBox(
      width: size,
      height: size,
      child: Center(
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Realistic ambient contact shadow onto the square
            Positioned(
              bottom: size * 0.06,
              child: Container(
                width: size * 0.58,
                height: size * 0.16,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.elliptical(size * 0.29, size * 0.08)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withAlpha(isWhite ? 110 : 150),
                      blurRadius: size * 0.12,
                      spreadRadius: 1.0,
                    ),
                  ],
                ),
              ),
            ),
            // Outer crisp stroke for high contrast and piece definition
            Text(
              symbol,
              style: TextStyle(
                fontSize: size * 0.88,
                fontFamily: 'sans-serif',
                fontWeight: FontWeight.bold,
                foreground: Paint()
                  ..style = PaintingStyle.stroke
                  ..strokeWidth = isWhite ? 2.6 : 3.0
                  ..color = strokeColor.withAlpha(isWhite ? 220 : 255),
              ),
            ),
            // Primary 3D shaded piece body
            Text(
              symbol,
              style: TextStyle(
                fontSize: size * 0.88,
                fontFamily: 'sans-serif',
                fontWeight: FontWeight.bold,
                color: pieceColor,
                shadows: [
                  Shadow(
                    color: Colors.black.withAlpha(isWhite ? 80 : 160),
                    blurRadius: 4.0,
                    offset: const Offset(1.0, 2.5),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
