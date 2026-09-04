import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/main.dart';
import 'package:apex_chess/models/chess_models.dart';

void main() {
  testWidgets('ApexChessApp renders successfully', (WidgetTester tester) async {
    final settings = AppSettings();
    await tester.pumpWidget(ApexChessApp(initialSettings: settings));
    await tester.pump();

    // Verify app brand and navigation items exist
    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Play'), findsAtLeastNWidgets(1));
    expect(find.text('Puzzles'), findsAtLeastNWidgets(1));
  });
}
