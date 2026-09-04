import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/main.dart';
import 'package:apex_chess/models/chess_models.dart';

void main() {
  testWidgets('ApexChessApp renders successfully', (WidgetTester tester) async {
    final settings = AppSettings();
    await tester.pumpWidget(ApexChessApp(initialSettings: settings));
    await tester.pump();

    // Verify app bar title exists
    expect(find.text('♟️ Apex Chess'), findsOneWidget);
    expect(find.text('START GAME'), findsOneWidget);
  });
}
