import 'package:flutter_test/flutter_test.dart';
import 'package:chess/chess.dart' as chess;

void main() {
  test('chess package API verification', () {
    final game = chess.Chess();
    expect(game.fen, equals('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
    expect(game.turn, equals(chess.Color.WHITE));
    
    // Test moves
    final moves = game.moves({'verbose': true});
    expect(moves.isNotEmpty, isTrue);
    
    // Move e4
    final m = game.move('e4');
    expect(m, isTrue);
    expect(game.turn, equals(chess.Color.BLACK));
    
    // Test undo
    final undone = game.undo();
    expect(undone, isNotNull);
    expect(game.turn, equals(chess.Color.WHITE));
  });
}
