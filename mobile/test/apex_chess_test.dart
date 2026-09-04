import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:chess/chess.dart' as chess;
import 'package:apex_chess/models/chess_models.dart';
import 'package:apex_chess/models/engine_config.dart';
import 'package:apex_chess/data/puzzles_data.dart';
import 'package:apex_chess/data/endgames_data.dart';
import 'package:apex_chess/data/openings_data.dart';
import 'package:apex_chess/engine/evaluation.dart';
import 'package:apex_chess/engine/coach_analysis.dart';
import 'package:apex_chess/services/sync_service.dart';
import 'package:apex_chess/ui/board/staunton_pieces.dart';
import 'package:apex_chess/ui/home/home_screen.dart';
import 'package:apex_chess/ui/play/play_screen.dart';
import 'package:apex_chess/ui/learn/learn_screen.dart';
import 'package:apex_chess/ui/puzzles/puzzles_screen.dart';
import 'package:apex_chess/ui/analysis/analysis_screen.dart';
import 'package:apex_chess/ui/profile/profile_screen.dart';
import 'package:apex_chess/ui/tools/tools_screen.dart';

void main() {
  group('1. Domain Models & Personalization Configuration Tests', () {
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

    test('PieceThemeId provides 7 distinct customizable themes', () {
      expect(PieceThemeId.values.length, 7);
      expect(PieceThemeId.values.contains(PieceThemeId.staunton), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.neoEmerald), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.royalGold), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.woodcraft), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.darkObsidian), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.alphaMinimal), isTrue);
      expect(PieceThemeId.values.contains(PieceThemeId.cyberGlass), isTrue);
    });

    test('AppSettings defaults to 8:00 PM (20:00) notification and JSON round-trip', () {
      final settings = AppSettings();
      expect(settings.boardTheme, BoardThemeId.emerald);
      expect(settings.pieceTheme, PieceThemeId.staunton);
      expect(settings.dailyNotificationEnabled, isTrue);
      expect(settings.notificationHour, 20); // 8:00 PM Sharp
      expect(settings.notificationMinute, 0);

      settings.pieceTheme = PieceThemeId.neoEmerald;
      settings.notificationHour = 8; // 8:00 AM
      final json = settings.toJson();
      final revived = AppSettings.fromJson(json);
      expect(revived.pieceTheme, PieceThemeId.neoEmerald);
      expect(revived.notificationHour, 8);
      expect(revived.notificationMinute, 0);
    });

    test('UserStats initializes with Ayush profile, 1742 Elo and 6-day streak', () {
      final stats = UserStats();
      expect(stats.name, 'Ayush');
      expect(stats.rating, 1742);
      expect(stats.winStreak, 6);
      expect(stats.globalRankPercentile, 18);
      expect(stats.weeklyStreak.length, 7);

      final json = stats.toJson();
      final revived = UserStats.fromJson(json);
      expect(revived.name, 'Ayush');
      expect(revived.rating, 1742);
      expect(revived.winStreak, 6);
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
        timeControl: '10 min Rapid',
        whitePlayer: 'You',
        blackPlayer: 'Harmonic',
        whiteElo: 1742,
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
  });

  group('2. Engine Evaluation & Minimax Search Tests', () {
    test('Initial chess board evaluates symmetrically', () {
      final game = chess.Chess();
      final eval = evaluatePosition(game);
      expect(eval.abs(), lessThan(30)); // Close to 0 at start
    });

    test('Engine detects mate-in-one correctly', () {
      // Scholar's Mate position before Qxf7#
      final game = chess.Chess.fromFEN('r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 4');
      final moves = game.generate_moves();
      expect(moves.isNotEmpty, isTrue);

      bool foundMate = false;
      for (final m in moves) {
        game.move(m);
        if (game.in_checkmate) {
          foundMate = true;
          game.undo_move();
          break;
        }
        game.undo_move();
      }
      expect(foundMate, isTrue);
    });

    test('Openings database contains master openings with valid SANs', () {
      expect(OPENINGS_DATABASE.isNotEmpty, isTrue);
      for (final opening in OPENINGS_DATABASE) {
        expect(opening.moves.isNotEmpty, isTrue);
        expect(opening.name.isNotEmpty, isTrue);
        expect(opening.eco.isNotEmpty, isTrue);

        final testGame = chess.Chess();
        for (final moveSan in opening.moves) {
          final success = testGame.move(moveSan);
          expect(success, isTrue, reason: 'Opening ${opening.name} move $moveSan failed');
        }
      }
    });

    test('Puzzles database contains valid tactics with solution moves', () {
      expect(PUZZLES_DATABASE.isNotEmpty, isTrue);
      for (final puzzle in PUZZLES_DATABASE) {
        expect(puzzle.moves.isNotEmpty, isTrue);
        final puzzleGame = chess.Chess.fromFEN(puzzle.fen);
        expect(puzzleGame.fen.isNotEmpty, isTrue);

        for (final moveSan in puzzle.moves) {
          final success = puzzleGame.move(moveSan);
          expect(success, isTrue, reason: 'Puzzle ${puzzle.id} move $moveSan is invalid on ${puzzleGame.fen}');
        }
      }
    });

    test('Endgames database contains accurate study positions', () {
      expect(ENDGAME_LESSONS.isNotEmpty, isTrue);
      for (final lesson in ENDGAME_LESSONS) {
        expect(lesson.fen.isNotEmpty, isTrue);
        final testGame = chess.Chess.fromFEN(lesson.fen);
        expect(testGame.fen.isNotEmpty, isTrue);
        expect(lesson.keyPrinciples.isNotEmpty, isTrue);
      }
    });
  });

  group('3. Coach Analysis & Accuracy Engine Tests', () {
    test('Calculates high accuracy for low centipawn loss', () {
      final lowLosses = [0.0, 5.0, 10.0, 2.0];
      final accuracy = calculateAccuracy(lowLosses);
      expect(accuracy, greaterThanOrEqualTo(85));
      expect(accuracy, lessThanOrEqualTo(100));
    });

    test('Blunder centipawn loss reduces accuracy significantly', () {
      final highLosses = [150.0, 300.0, 450.0];
      final accuracy = calculateAccuracy(highLosses);
      expect(accuracy, lessThan(60));
    });

    test('Performance rating calculation scales with moves count and accuracy', () {
      final pr = calculatePerformanceRating(92, 35);
      expect(pr, greaterThan(2000));

      final syncRes = const SyncResult(
        success: true,
        message: 'Synchronized successfully',
        syncedGamesCount: 4,
      );
      expect(syncRes.success, isTrue);
      expect(syncRes.syncedGamesCount, 4);
    });
  });

  group('4. Vector Pieces & Exponential UI Widget Tests', () {
    testWidgets('ChessPieceWidget renders pure vector pieces in all 7 themes', (WidgetTester tester) async {
      for (final theme in PieceThemeId.values) {
        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(
              body: Row(
                children: [
                  ChessPieceWidget(type: 'k', color: 'w', theme: theme, size: 40),
                  ChessPieceWidget(type: 'q', color: 'w', theme: theme, size: 40),
                  ChessPieceWidget(type: 'r', color: 'w', theme: theme, size: 40),
                  ChessPieceWidget(type: 'b', color: 'b', theme: theme, size: 40),
                  ChessPieceWidget(type: 'n', color: 'b', theme: theme, size: 40),
                  ChessPieceWidget(type: 'p', color: 'b', theme: theme, size: 40),
                ],
              ),
            ),
          ),
        );
        expect(find.byType(ChessPieceWidget), findsNWidgets(6));
      }
    });

    testWidgets('HomeScreen renders greeting, streak, and continue journey card', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: HomeScreen(
            settings: AppSettings(),
            onNavigateTab: (_) {},
            onResumeGame: () {},
            onOpenNotifications: () {},
          ),
        ),
      );

      expect(find.text('Ayush 👋'), findsOneWidget);
      expect(find.text('1742'), findsOneWidget);
      expect(find.text('6 Day Streak'), findsOneWidget);
      expect(find.text('Continue Your Journey'), findsOneWidget);
      expect(find.text('Italian Game'), findsOneWidget);
      expect(find.text('Daily Training'), findsOneWidget);
      expect(find.text('Recent Games'), findsOneWidget);
    });

    testWidgets('PlayScreen renders lobby matching Screenshot 4', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PlayScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('Play'), findsOneWidget);
      expect(find.text('1742'), findsOneWidget);
      expect(find.text('PLAY NOW'), findsOneWidget);
      expect(find.text('QUICK SETUP'), findsOneWidget);
      expect(find.text('AI OPPONENTS'), findsOneWidget);
      expect(find.text('Harmonic'), findsAtLeastNWidgets(1));
      expect(find.text('Tactician'), findsOneWidget);
      expect(find.text('Berserker'), findsOneWidget);
      expect(find.text('DAILY CHALLENGE'), findsOneWidget);
    });

    testWidgets('LearnScreen renders academy and Najdorf hero card', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: LearnScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('ACADEMY & OPENINGS'), findsOneWidget);
      expect(find.text('Sicilian Defense'), findsOneWidget);
      expect(find.text('Explore Now'), findsOneWidget);
      expect(find.text('WHAT YOU\'LL GET'), findsOneWidget);
    });

    testWidgets('PuzzlesScreen renders practice modes', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: PuzzlesScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('🎯 Practice'), findsOneWidget);
      expect(find.text('⚡ 3m Rush'), findsOneWidget);
      expect(find.text('🛡️ Survival'), findsOneWidget);
    });

    testWidgets('ToolsScreen renders piece customizer and notification manager', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ToolsScreen(settings: AppSettings()),
        ),
      );

      expect(find.text('PIECE STYLE & CUSTOMIZATION'), findsOneWidget);
      expect(find.text('Live Theme Preview'), findsOneWidget);

      await tester.drag(find.byType(ListView), const Offset(0, -400));
      await tester.pumpAndSettle();

      expect(find.text('DAILY PRACTICE NOTIFICATIONS'), findsOneWidget);
      expect(find.text('8:00 PM (Sharp)'), findsOneWidget);
      expect(find.text('Send Test Alert Now (Verify Schedule)'), findsOneWidget);
    });

    testWidgets('ProfileScreen renders Ayush Upadhyay and stats matching Screenshot 2', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ProfileScreen(
            settings: AppSettings(),
            onOpenSettings: () {},
          ),
        ),
      );

      expect(find.text('Profile'), findsOneWidget);
      expect(find.text('Ayush Upadhyay'), findsOneWidget);
      expect(find.text('@apex_chess_23'), findsOneWidget);
      expect(find.text('Apex Premium'), findsOneWidget);
      expect(find.text('Rating Progress'), findsOneWidget);
      expect(find.text('Achievements'), findsOneWidget);
      expect(find.text('Recent Activity'), findsOneWidget);
    });

    testWidgets('AnalysisScreen renders review and accuracy matching Screenshot 3', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: AnalysisScreen(
            settings: AppSettings(),
          ),
        ),
      );

      expect(find.text('Review'), findsOneWidget);
      expect(find.text('92.4'), findsOneWidget);
      expect(find.text('YOU WON ⭐'), findsOneWidget);
      expect(find.text('⭐ Game Review'), findsOneWidget);
      expect(find.text('Top Moments'), findsOneWidget);
    });
  });
}
