import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/models/chess_models.dart';
import 'package:apex_chess/ui/board/vector_chess_pieces.dart';

void main() {
  testWidgets('VectorChessPieceWidget renders all piece types without error', (tester) async {
    final pieceTypes = ['p', 'n', 'b', 'r', 'q', 'k'];
    final pieceColors = ['w', 'b'];

    for (final theme in PieceThemeId.values) {
      for (final color in pieceColors) {
        for (final type in pieceTypes) {
          await tester.pumpWidget(
            MaterialApp(
              home: Scaffold(
                body: VectorChessPieceWidget(
                  type: type,
                  color: color,
                  theme: theme,
                  size: 48,
                ),
              ),
            ),
          );
          expect(tester.takeException(), isNull);
        }
      }
    }
  });
}
