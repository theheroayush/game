import 'package:flutter/material.dart';
import 'models/chess_models.dart';
import 'services/haptics_service.dart';
import 'services/notification_service.dart';
import 'services/sound_service.dart';
import 'services/storage_service.dart';
import 'ui/play/play_screen.dart';
import 'ui/analysis/analysis_screen.dart';
import 'ui/puzzles/puzzles_screen.dart';
import 'ui/endgames/endgames_screen.dart';
import 'ui/openings/openings_screen.dart';
import 'ui/tools/tools_screen.dart';

import 'ui/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize offline services
  await StorageService.init();
  await NotificationService.init();

  final settings = StorageService.loadSettings();
  SoundService.enabled = settings.soundEnabled;
  SoundService.volume = settings.soundVolume;
  HapticsService.enabled = settings.hapticsEnabled;

  if (settings.dailyNotificationEnabled) {
    NotificationService.scheduleDailyPracticeNotifications(enabled: true);
  }

  runApp(ApexChessApp(initialSettings: settings));
}

class ApexChessApp extends StatefulWidget {
  final AppSettings initialSettings;

  const ApexChessApp({super.key, required this.initialSettings});

  @override
  State<ApexChessApp> createState() => _ApexChessAppState();
}

class _ApexChessAppState extends State<ApexChessApp> {
  late AppSettings _settings;

  @override
  void initState() {
    super.initState();
    _settings = widget.initialSettings;
  }

  void _updateSettings(AppSettings newSettings) {
    setState(() {
      _settings = newSettings;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Apex Chess Master',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.accentBlue,
          secondary: AppColors.green,
          surface: AppColors.surface,
        ),
      ),
      home: MainShell(
        settings: _settings,
        onSettingsChanged: _updateSettings,
      ),
    );
  }
}

class MainShell extends StatefulWidget {
  final AppSettings settings;
  final Function(AppSettings) onSettingsChanged;

  const MainShell({
    super.key,
    required this.settings,
    required this.onSettingsChanged,
  });

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;
  GameRecord? _gameToAnalyze;

  void _onReviewGameRequested(GameRecord record) {
    setState(() {
      _gameToAnalyze = record;
      _currentIndex = 1; // Switch to Analysis tab
    });
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      PlayScreen(
        settings: widget.settings,
        onReviewGame: _onReviewGameRequested,
      ),
      AnalysisScreen(
        key: ValueKey(_gameToAnalyze?.id ?? 'default_analysis'),
        initialGame: _gameToAnalyze,
        settings: widget.settings,
        onBackToPlay: () => setState(() => _currentIndex = 0),
      ),
      PuzzlesScreen(
        settings: widget.settings,
      ),
      EndgamesScreen(
        settings: widget.settings,
      ),
      OpeningsScreen(
        settings: widget.settings,
      ),
      ToolsScreen(
        settings: widget.settings,
        onSettingsChanged: widget.onSettingsChanged,
        onReviewGame: _onReviewGameRequested,
      ),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBarTheme(
        data: NavigationBarThemeData(
          backgroundColor: AppColors.dark,
          indicatorColor: AppColors.accentBlue.withAlpha(40),
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const TextStyle(color: AppColors.accentBlue, fontSize: 11, fontWeight: FontWeight.bold);
            }
            return const TextStyle(color: AppColors.textSecondary, fontSize: 11);
          }),
          iconTheme: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const IconThemeData(color: AppColors.accentBlue, size: 22);
            }
            return const IconThemeData(color: AppColors.textSecondary, size: 20);
          }),
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          onDestinationSelected: (index) {
            HapticsService.light();
            setState(() => _currentIndex = index);
          },
          destinations: const [
            NavigationDestination(icon: Icon(Icons.sports_esports_outlined), selectedIcon: Icon(Icons.sports_esports), label: 'Play'),
            NavigationDestination(icon: Icon(Icons.analytics_outlined), selectedIcon: Icon(Icons.analytics), label: 'Review'),
            NavigationDestination(icon: Icon(Icons.extension_outlined), selectedIcon: Icon(Icons.extension), label: 'Puzzles'),
            NavigationDestination(icon: Icon(Icons.military_tech_outlined), selectedIcon: Icon(Icons.military_tech), label: 'Endgames'),
            NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: 'Openings'),
            NavigationDestination(icon: Icon(Icons.tune_outlined), selectedIcon: Icon(Icons.tune), label: 'Tools'),
          ],
        ),
      ),
    );
  }
}
