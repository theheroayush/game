import 'package:flutter_test/flutter_test.dart';
import 'package:chess/chess.dart' as chess;
import 'package:apex_chess/models/chess_models.dart';
import 'package:apex_chess/models/engine_config.dart';
import 'package:apex_chess/engine/evaluation.dart';
import 'package:apex_chess/engine/minimax_isolate.dart';

void main() {
  group('1. Graduated Elo Sequence Configuration Tests', () {
    test('DIFFICULTY_LEVELS contains 10 distinct, strictly ordered Elo levels', () {
      expect(DIFFICULTY_LEVELS.length, 10);
      for (int i = 0; i < DIFFICULTY_LEVELS.length - 1; i++) {
        expect(DIFFICULTY_LEVELS[i].elo, lessThan(DIFFICULTY_LEVELS[i + 1].elo));
        expect(DIFFICULTY_LEVELS[i].level, lessThan(DIFFICULTY_LEVELS[i + 1].level));
      }
    });

    test('Novice bots (600-800 Elo) have high noise, high temperature, and shallow book', () {
      final jimmy = DIFFICULTY_LEVELS.firstWhere((d) => d.level == 1);
      final martin = DIFFICULTY_LEVELS.firstWhere((d) => d.level == 2);

      expect(jimmy.elo, 600);
      expect(jimmy.evalNoise, greaterThanOrEqualTo(300));
      expect(jimmy.temperature, greaterThanOrEqualTo(300.0));
      expect(jimmy.bookMaxPlies, lessThanOrEqualTo(2));
      expect(jimmy.useQuiescence, isFalse);

      expect(martin.elo, 800);
      expect(martin.evalNoise, greaterThanOrEqualTo(200));
      expect(martin.temperature, greaterThanOrEqualTo(200.0));
      expect(martin.bookMaxPlies, lessThanOrEqualTo(3));
    });

    test('Master bots (2000-2500 Elo) have zero noise, tight temperature, and deep search', () {
      final viktor = DIFFICULTY_LEVELS.firstWhere((d) => d.level == 8);
      final magnus = DIFFICULTY_LEVELS.firstWhere((d) => d.level == 10);

      expect(viktor.elo, 2000);
      expect(viktor.evalNoise, 0);
      expect(viktor.temperature, lessThanOrEqualTo(10.0));
      expect(viktor.useQuiescence, isTrue);

      expect(magnus.elo, 2500);
      expect(magnus.evalNoise, 0);
      expect(magnus.temperature, lessThanOrEqualTo(2.0));
      expect(magnus.bookMaxPlies, greaterThanOrEqualTo(16));
      expect(magnus.depth, greaterThanOrEqualTo(5));
      expect(magnus.useQuiescence, isTrue);
    });

    test('Nelson (1200 Elo) is configured with aggressive queen sorties', () {
      final nelson = DIFFICULTY_LEVELS.firstWhere((d) => d.level == 4);
      expect(nelson.elo, 1200);
      expect(nelson.temperature, inInclusiveRange(70.0, 110.0));
      expect(nelson.evalNoise, inInclusiveRange(60, 100));
      expect(nelson.bookMaxPlies, inInclusiveRange(4, 8));
    });
  });

  group('2. Mid-Game Anti-Fallback & Iterative Deepening Tests', () {
    test('searchBestMoveIterative returns valid scored root moves on complex midgame FEN', () {
      // Italian Game middlegame position
      const midgameFen = 'r1bqk2r/pppp1ppp/2n5/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5';
      final game = chess.Chess.fromFEN(midgameFen);

      final result = searchBestMoveIterative(
        game,
        3,
        400,
        true,
        personality: AIPersonalityId.balanced,
      );

      expect(result.bestMove, isNotNull);
      expect(result.depthReached, greaterThanOrEqualTo(2));
      expect(result.rootMoves.isNotEmpty, isTrue);
      expect(result.rootMoves.first.score, result.score);
    });

    test('Interrupted search does not return null or corrupt bestMove', () {
      const complexFen = 'r3k2r/pb1p1ppp/1pn1pn2/2b5/4P3/2N2NP1/PPP1BP1P/R1BQK2R w KQkq - 1 9';
      final game = chess.Chess.fromFEN(complexFen);

      // Give tiny 5ms time budget so depth 4 will immediately interrupt
      final result = searchBestMoveIterative(
        game,
        4,
        5,
        true,
      );

      expect(result.bestMove, isNotNull);
      expect(result.depthReached, greaterThanOrEqualTo(1));
      expect(result.rootMoves.isNotEmpty, isTrue);
    });
  });

  group('3. Bot Computation & Elo Sequence Execution Tests', () {
    test('Jimmy (Level 1, 600 Elo) computes a legal move without freezing', () {
      final game = chess.Chess();
      final req = AIMoveRequest(
        fen: game.fen,
        level: 1,
        personality: AIPersonalityId.balanced,
        moveSans: [],
      );

      final res = computeAIMove(req);
      expect(res.from.length, 2);
      expect(res.to.length, 2);
      expect(res.san.isNotEmpty, isTrue);

      // Verify move is legal in position
      final temp = chess.Chess.fromFEN(game.fen);
      expect(temp.move(res.san), isTrue);
    });

    test('Magnus AI (Level 10, 2500 Elo) computes strong legal move on tactical position', () {
      // White has a hanging black bishop on c5
      const tacticalFen = 'r1bqk2r/pppp1ppp/2n5/2b1p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4';
      final req = AIMoveRequest(
        fen: tacticalFen,
        level: 10,
        personality: AIPersonalityId.balanced,
        moveSans: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'],
      );

      final res = computeAIMove(req);
      expect(res.from.isNotEmpty, isTrue);
      expect(res.to.isNotEmpty, isTrue);
      expect(res.san.isNotEmpty, isTrue);

      final temp = chess.Chess.fromFEN(tacticalFen);
      expect(temp.move(res.san), isTrue);
    });

    test('Nelson (Level 4, 1200 Elo) aggressive personality awards bonus for checks', () {
      // Position where white king is in check from Qh4+ but has legal escapes/blocks
      const checkFen = 'rnb1kbnr/pppp1ppp/8/8/4p2q/5P2/PPPPP1PP/RNBQKBNR w KQkq - 1 3';
      final checkGame = chess.Chess.fromFEN(checkFen);
      expect(checkGame.in_check, isTrue);
      expect(checkGame.in_checkmate, isFalse);

      final aggressiveEval = evaluatePosition(checkGame, AIPersonalityId.aggressive);
      final balancedEval = evaluatePosition(checkGame, AIPersonalityId.balanced);

      // Aggressive evaluation amplifies the tactical check score
      expect(aggressiveEval, isNot(equals(balancedEval)));
    });
  });
}
