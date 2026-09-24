import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/models/chess_models.dart';
import 'package:apex_chess/engine/minimax_isolate.dart';

void main() {
  group('Comprehensive Tactical Engine Tests', () {
    test('1. Defended pawn capture test: Queen should NOT capture defended pawn', () {
      // White Queen on d4, Black pawn on d5 defended by Nf6
      // FEN: rnbqkb1r/ppp1pppp/5n2/3p4/3Q4/5N2/PPP1PPPP/RNB1KB1R w KQkq - 0 3
      final fen = 'rnbqkb1r/ppp1pppp/5n2/3p4/3Q4/5N2/PPP1PPPP/RNB1KB1R w KQkq - 0 3';

      for (int lvl = 1; lvl <= 10; lvl++) {
        final req = AIMoveRequest(
          fen: fen,
          level: lvl,
          personality: AIPersonalityId.balanced,
          moveSans: ['d4', 'd5', 'Nf3', 'Nf6'],
        );
        final resp = computeAIMove(req);
        expect(resp.san, isNot('Qxd5'), reason: 'Level $lvl should NEVER capture defended d5 pawn with Queen!');
      }
    });

    test('2. Attacked Queen evacuation: Queen must move out of attack', () {
      // White Queen on d4 attacked by Black Knight on c6
      // FEN: r1bqkbnr/pppp1ppp/2n5/4p3/3Q4/8/PPP1PPPP/RNB1KBNR w KQkq - 1 3
      final fen = 'r1bqkbnr/pppp1ppp/2n5/4p3/3Q4/8/PPP1PPPP/RNB1KBNR w KQkq - 1 3';
      for (int lvl = 1; lvl <= 10; lvl++) {
        final req = AIMoveRequest(
          fen: fen,
          level: lvl,
          personality: AIPersonalityId.balanced,
          moveSans: ['e4', 'e5', 'd4', 'Nc6'],
        );
        final resp = computeAIMove(req);
        expect(resp.from, equals('d4'), reason: 'Level $lvl MUST move or trade the attacked Queen on d4!');
      }
    });

    test('3. Hanging piece punishment: AI captures free piece', () {
      // Black left Bishop hanging on e4 with no defense. White Knight on c3 can capture.
      // FEN: rnbqk1nr/pppp1ppp/8/8/4b3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4
      final fen = 'rnbqk1nr/pppp1ppp/8/8/4b3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4';
      final req = AIMoveRequest(
        fen: fen,
        level: 5,
        personality: AIPersonalityId.balanced,
        moveSans: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'Be7'],
      );
      final resp = computeAIMove(req);
      // Nxe4 or Bxe4 captures the free bishop
      expect(resp.to, equals('e4'), reason: 'Engine MUST capture the free bishop on e4!');
    });

    test('4. Checkmate in 1: Engine delivers mate immediately', () {
      // Scholar's Mate setup: White Queen on h5, Bishop on c4, Black f7 is target.
      // FEN: r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 2 3
      final fen = 'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 2 3';
      for (int lvl = 1; lvl <= 10; lvl++) {
        final req = AIMoveRequest(
          fen: fen,
          level: lvl,
          personality: AIPersonalityId.balanced,
        );
        final resp = computeAIMove(req);
        expect(resp.san, equals('Qxf7#'), reason: 'Level $lvl MUST deliver Qxf7# checkmate in 1!');
      }
    });

    test('5. Checkmate in 1 (Black to move): Black delivers mate', () {
      // Fool's Mate setup: 1. f3 e5 2. g4 - Black to move delivers Qh4#
      // FEN: rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2
      final fen = 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2';
      final req = AIMoveRequest(
        fen: fen,
        level: 5,
        personality: AIPersonalityId.balanced,
      );
      final resp = computeAIMove(req);
      expect(resp.san, equals('Qh4#'), reason: 'Engine as Black MUST play Qh4# checkmate!');
    });
  });
}
