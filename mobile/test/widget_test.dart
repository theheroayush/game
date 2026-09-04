import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/main.dart';
import 'package:apex_chess/models/chess_models.dart';

void main() {
  testWidgets('ApexChessApp renders successfully', (WidgetTester tester) async {
    final settings = AppSettings();
    await tester.pumpWidget(ApexChessApp(initialSettings: settings));
    await tester.pump();

    // Verify Front Page / Play Lobby renders as the opening screen
    expect(find.text('Play vs Computer'), findsOneWidget);
    expect(find.text('TIME CONTROL'), findsOneWidget);
    expect(find.text('PLAY AS'), findsOneWidget);

    // Tap Start Match CTA to enter active game board
    final startBtn = find.textContaining('Start Match');
    await tester.ensureVisible(startBtn);
    await tester.pump();
    await tester.tap(startBtn);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    // Verify brand header and game actions exist on active board
    expect(find.text('APEX '), findsOneWidget);
    expect(find.text('CHESS'), findsOneWidget);
    expect(find.text('Options'), findsOneWidget);
    expect(find.text('Hint'), findsOneWidget);
  });
}
