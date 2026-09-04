import 'package:flutter/material.dart';
import '../../models/chess_models.dart';
import 'vector_chess_pieces.dart';

/// ChessPieceWidget delegates to VectorChessPieceWidget for tournament-grade vector SVG rendering.
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
    return VectorChessPieceWidget(
      type: type,
      color: color,
      theme: theme,
      size: size,
    );
  }
}
