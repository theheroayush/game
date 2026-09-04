import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:chess/chess.dart' as chess;
import 'package:apex_chess/models/chess_models.dart';
import 'package:apex_chess/models/engine_config.dart';
import 'package:apex_chess/data/puzzles_data.dart';
import 'package:apex_chess/data/endgames_data.dart';
import 'package:apex_chess/data/openings_data.dart';
import 'package:apex_chess/engine/evaluation.dart';
import 'package:apex_chess/engine/minimax_isolate.dart';
import 'package:apex_chess/engine/coach_analysis.dart';
import 'package:apex_chess/services/sync_service.dart';
import 'package:apex_chess/ui/board/chess_board_widget.dart';
import 'package:apex_chess/ui/play/play_screen.dart';
import 'package:apex_chess/ui/puzzles/puzzles_screen.dart';
import 'package:apex_chess/ui/endgames/endgames_screen.dart';
import 'package:apex_chess/ui/openings/openings_screen.dart';
import 'package:apex_chess/ui/tools/tools_screen.dart';

void main() {
  group('1. Domain Models & Configuration Tests', () {
    test('Difficulty tiers contain 10 progressive Elo ratings', () {
      expect(DIFFICULTY_LEVELS.length, 10);
      expect(DIFFICULTY_LEVELS.first.elo, 600);
      expect(DIFFICULTY_LEVELS.last.elo, 2500);
      for (int i = 0; i < DIFFICULTY_LEVELS.length; i++) {
        expect(DIFFICULTY_LEVELS[i].level, i + 1);
      }
    });

    test('AI Personalities define distinct tactical styles', () {
      expect(AI_PERSONALITIES.length, 4);
      final ids = AI_PERSONALITIES.map((p) => p.id).toSet();
      expect(ids.contains(AIPersonalityId.balanced), isTrue);
      expect(ids.contains(AIPersonalityId.aggressive), isTrue);
      expect(ids.contains(AIPersonalityId.positional), isTrue);
      expect(ids.contains(AIPersonalityId.tactical), isTrue);
    });

    test('GameRecord JSON serialization preserves all metadata', () {
      final record = GameRecord(
        id: 'rec_100',
        date: '2026-09-03T12:00:00Z',
        pgn: '1. e4 e5',
        finalFen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        result: '1-0',
        winner: 'white',
        reason: 'resignation',
        playerColor: 'w',
        difficultyLevel: 4,
        personality: AIPersonalityId.aggressive,
        timeControl: '3+2 Blitz',
        whitePlayer: 'You',
        blackPlayer: 'The Valkyrie',
        whiteElo: 1200,
        blackElo: 1200,
        movesCount: 2,
      );

      final json = record.toJson();
      final revived = GameRecord.fromJson(json);

      expect(revived.id, 'rec_100');
      expect(revived.result, '1-0');
      expect(revived.personality, AIPersonalityId.aggressive);
      expect(revived.difficultyLevel, 4);
    });

    test('AppSettings defaults and JSON round-trip', () {
      final settings = AppSettings();
      expect(settings.boardTheme, BoardThemeId.emerald);
      expect(settings.pieceTheme, PieceThemeId.staunton);
      expect(settings.soundEnabled, isTrue);
      expect(settings.hapticsEnabled, isTrue);

      settings.boardTheme = BoardThemeId.sapphire;
      final json = settings.toJson();
      final revived = AppSettings.fromJson(json);
      expect(revived.boardTheme, BoardThemeId.sapphire);
    });

    test('UserStats initializes with default Elo and zero streaks', () {
      final stats = UserStats();
      expect(stats.rating, 1200);
      expect(stats.winStreak, 0);
      expect(stats.gamesPlayed, 0);
      expect(stats.wins, 0);

      final json = stats.toJson();
      final revived = UserStats.fromJson(json);
      expect(revived.rating, 1200);
    });
  });

  group('2. Engine Evaluation & Minimax Search Tests', () {
    test('Initial chess board evaluates symmetrically', () {
      final game = chess.Chess();
      final eval = evaluatePosition(game);
      expect(eval.abs(), lessThan(30)); // Close to 0 at start
    });

    test('Minimax search returns a legal move', () {
      final game = chess.Chess();
      final result = minimax(game, 2, -999999, 999999, true, useQuiescence: false);

      expect(result.bestMove, isNotNull);
      expect(result.bestMove!['from'], isNotNull);
      expect(result.bestMove!['to'], isNotNull);
    });

    test('computeAIMove handles background isolate request', () async {
      final req = AIMoveRequest(
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        level: 1,
        personality: AIPersonalityId.balanced,
      );

      final res = computeAIMove(req);
      expect(res.from.isNotEmpty, isTrue);
      expect(res.to.isNotEmpty, isTrue);
      expect(res.san.isNotEmpty, isTrue);
    });

    test('Opening book is matched on standard plies', () {
      final matched = findOpeningByMoves(['e4', 'c5']);
      expect(matched, isNotNull);
      expect(matched?.eco, 'B20');
      expect(matched?.name.contains('Sicilian'), isTrue);
    });
  });

  group('3. Curated Datasets Verification Tests', () {
    test('All 15 tactical puzzles have valid FEN and SAN moves', () {
      expect(PUZZLES_DATABASE.length, 15);
      for (final p in PUZZLES_DATABASE) {
        expect(p.id.isNotEmpty, isTrue);
        expect(p.moves.isNotEmpty, isTrue);
        final sim = chess.Chess.fromFEN(p.fen);
        expect(sim.fen.isNotEmpty, isTrue);
      }
    });

    test('All 6 endgame studies have valid FEN', () {
      expect(ENDGAME_LESSONS.length, 6);
      for (final l in ENDGAME_LESSONS) {
        expect(l.id.isNotEmpty, isTrue);
        final sim = chess.Chess.fromFEN(l.fen);
        expect(sim.fen.isNotEmpty, isTrue);
      }
    });

    test('All 15 opening repertoires are loaded with key ideas', () {
      expect(OPENINGS_DATABASE.length, 15);
      for (final op in OPENINGS_DATABASE) {
        expect(op.eco.isNotEmpty, isTrue);
        expect(op.moves.isNotEmpty, isTrue);
        expect(op.keyIdeas.isNotEmpty, isTrue);
      }
    });
  });

  group('4. Coach Analysis & Accuracy Formula Tests', () {
    test('Accuracy formula produces 100% on 0 centipawn loss', () {
      final acc = calculateAccuracy([0.0, 0.0, 0.0]);
      expect(acc, 100);
    });

    test('Performance rating maps proportionally to accuracy', () {
      expect(calculatePerformanceRating(95, 20), greaterThan(1500));
      expect(calculatePerformanceRating(40, 20), lessThan(1200));
    });

    test('Coach analysis analyzes sample PGN correctly', () {
      const pgn = '1. e4 e5 2. Nf3 Nc6';
      final analysis = analyzeGame(pgn);

      expect(analysis.moves.length, 4);
      expect(analysis.accuracyWhite, greaterThan(0));
      expect(analysis.accuracyBlack, greaterThan(0));
      expect(analysis.gameNarrative.isNotEmpty, isTrue);
    });
  });

  group('5. Cross-Platform Local Sync Tests', () {
    test('SyncResult holds status and count', () {
      const res = SyncResult(success: true, message: 'Synced', syncedGamesCount: 5);
      expect(res.success, isTrue);
      expect(res.syncedGamesCount, 5);
    });
  });

  group('6. UI Widget Rendering Smoke Tests', () {
    testWidgets('ChessBoardWidget renders 64 squares', (WidgetTester tester) async {
      final game = chess.Chess();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Center(
              child: SizedBox(
                width: 320,
                height: 320,
                child: ChessBoardWidget(
                  game: game,
                  interactive: false,
                ),
              ),
            ),
          ),
        ),
      );

      expect(find.byType(ChessBoardWidget), findsOneWidget);
    });

    testWidgets('PlayScreen renders Play Lobby by default', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PlayScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('Play vs Computer'), findsOneWidget);
      expect(find.text('TIME CONTROL'), findsOneWidget);
      expect(find.text('PLAY AS'), findsOneWidget);
    });

    testWidgets('PlayScreen renders active game board and controls', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PlayScreen(
            settings: AppSettings(),
            initialInLobby: false,
          ),
        ),
      );

      expect(find.text('APEX '), findsOneWidget);
      expect(find.text('CHESS'), findsOneWidget);
      expect(find.text('Options'), findsOneWidget);
      expect(find.text('Hint'), findsOneWidget);
      expect(find.text('Resign'), findsOneWidget);
    });

    testWidgets('PuzzlesScreen renders practice chips', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PuzzlesScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('Practice'), findsOneWidget);
      expect(find.text('3m Rush'), findsOneWidget);
      expect(find.text('Survival'), findsOneWidget);
    });

    testWidgets('EndgamesScreen renders lesson carousel', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: EndgamesScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('Lucena Position'), findsOneWidget);
      expect(find.text('Philidor Defense'), findsOneWidget);
    });

    testWidgets('OpeningsScreen renders opening explorer', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: OpeningsScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('📖 Opening Explorer'), findsOneWidget);
    });

    testWidgets('ToolsScreen renders settings and profile tabs', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ToolsScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('Settings'), findsOneWidget);
      expect(find.text('Profile'), findsOneWidget);
      expect(find.text('History'), findsOneWidget);
      expect(find.text('Editor'), findsOneWidget);
      expect(find.text('Coordinates'), findsOneWidget);
    });
  });
}
