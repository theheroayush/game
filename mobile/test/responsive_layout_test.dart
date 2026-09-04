import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/main.dart';
import 'package:apex_chess/models/chess_models.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  final viewports = [
    const Size(320, 568),
    const Size(360, 580),
    const Size(360, 640),
    const Size(375, 667),
    const Size(390, 844),
    const Size(412, 732),
    const Size(412, 915),
  ];

  for (final size in viewports) {
    testWidgets('Verify zero overflow at ${size.width}x${size.height}', (WidgetTester tester) async {
      tester.view.physicalSize = size;
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      final settings = AppSettings();
      await tester.pumpWidget(ApexChessApp(initialSettings: settings));
      await tester.pump();

      // Check for exceptions on Play screen
      expect(tester.takeException(), isNull, reason: 'Overflow on Play screen at $size');

      // Test all tabs (0: Play, 1: Review, 2: Puzzles, 3: Endgames, 4: Openings, 5: Tools)
      final tabs = [
        find.byIcon(Icons.analytics_outlined),
        find.byIcon(Icons.extension_outlined),
        find.byIcon(Icons.military_tech_outlined),
        find.byIcon(Icons.menu_book_outlined),
        find.byIcon(Icons.tune_outlined),
      ];

      for (int i = 0; i < tabs.length; i++) {
        await tester.tap(tabs[i]);
        await tester.pump();
        expect(tester.takeException(), isNull, reason: 'Overflow on Tab $i at $size');
      }
    });
  }
}
