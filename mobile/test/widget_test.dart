import 'package:flutter_test/flutter_test.dart';
import 'package:apex_chess/main.dart';
import 'package:apex_chess/models/chess_models.dart';

void main() {
  testWidgets('ApexChessApp renders successfully', (WidgetTester tester) async {
    final settings = AppSettings();
    await tester.pumpWidget(ApexChessApp(initialSettings: settings));
    await tester.pump();

    // Verify brand header and game actions exist
    expect(find.text('APEX '), findsOneWidget);
    expect(find.text('CHESS'), findsOneWidget);
    expect(find.text('Options'), findsOneWidget);
    expect(find.text('Hint'), findsOneWidget);
  });
}
