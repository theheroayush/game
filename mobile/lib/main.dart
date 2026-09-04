import 'package:flutter/material.dart';
import 'models/chess_models.dart';
import 'services/haptics_service.dart';
import 'services/notification_service.dart';
import 'services/sound_service.dart';
import 'services/storage_service.dart';
import 'ui/home/home_screen.dart';
import 'ui/play/play_screen.dart';
import 'ui/puzzles/puzzles_screen.dart';
import 'ui/learn/learn_screen.dart';
import 'ui/analysis/analysis_screen.dart';
import 'ui/profile/profile_screen.dart';
import 'ui/tools/tools_screen.dart';

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
    NotificationService.scheduleDailyPracticeNotifications(
      enabled: true,
      hour: settings.notificationHour,
      minute: settings.notificationMinute,
    );
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
        scaffoldBackgroundColor: const Color(0xFF090D0E),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF10B981),
          secondary: Color(0xFF38BDF8),
          surface: Color(0xFF141A1F),
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
      _currentIndex = 4; // Switch to Review tab
    });
  }

  void _onNavigateTab(int targetIndex) {
    setState(() {
      _currentIndex = targetIndex;
    });
  }

  void _openSettingsModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF090D0E),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => DraggableScrollableSheet(
        initialChildSize: 0.85,
        maxChildSize: 0.95,
        minChildSize: 0.5,
        expand: false,
        builder: (_, controller) => ToolsScreen(
          settings: widget.settings,
          onSettingsChanged: widget.onSettingsChanged,
          onReviewGame: _onReviewGameRequested,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      // 0. Home Dashboard (Screenshot 5)
      HomeScreen(
        settings: widget.settings,
        onNavigateTab: _onNavigateTab,
        onResumeGame: () => _onNavigateTab(1),
        onOpenNotifications: _openSettingsModal,
        onReviewGame: _onReviewGameRequested,
      ),
      // 1. Play Hub (Screenshot 4)
      PlayScreen(
        settings: widget.settings,
        onReviewGame: _onReviewGameRequested,
        onOpenNotifications: _openSettingsModal,
      ),
      // 2. Tactical Puzzles (Screenshot 1)
      PuzzlesScreen(
        settings: widget.settings,
      ),
      // 3. Learn Academy (Screenshots 2 & 3)
      LearnScreen(
        settings: widget.settings,
        onPracticeVsAI: (fen, playerColor) {
          _onNavigateTab(1);
        },
      ),
      // 4. Review & Analysis (Screenshot 3)
      AnalysisScreen(
        key: ValueKey(_gameToAnalyze?.id ?? 'default_analysis'),
        initialGame: _gameToAnalyze,
        settings: widget.settings,
        onBackToPlay: () => _onNavigateTab(1),
      ),
      // 5. Profile (Screenshot 2)
      ProfileScreen(
        settings: widget.settings,
        onOpenSettings: _openSettingsModal,
        onReviewGame: _onReviewGameRequested,
      ),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Color(0xFF0D1217),
          border: Border(top: BorderSide(color: Color(0xFF1E2830), width: 1.0)),
        ),
        child: NavigationBarTheme(
          data: NavigationBarThemeData(
            backgroundColor: Colors.transparent,
            indicatorColor: const Color(0xFF10B981).withAlpha(40),
            labelTextStyle: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.selected)) {
                return const TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold);
              }
              return const TextStyle(color: Color(0xFF64748B), fontSize: 11);
            }),
            iconTheme: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.selected)) {
                return const IconThemeData(color: Color(0xFF10B981), size: 22);
              }
              return const IconThemeData(color: Color(0xFF64748B), size: 20);
            }),
          ),
          child: NavigationBar(
            selectedIndex: _currentIndex,
            onDestinationSelected: (index) {
              HapticsService.light();
              setState(() => _currentIndex = index);
            },
            destinations: const [
              NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
              NavigationDestination(icon: Icon(Icons.sports_esports_outlined), selectedIcon: Icon(Icons.sports_esports), label: 'Play'),
              NavigationDestination(icon: Icon(Icons.extension_outlined), selectedIcon: Icon(Icons.extension), label: 'Puzzles'),
              NavigationDestination(icon: Icon(Icons.school_outlined), selectedIcon: Icon(Icons.school), label: 'Learn'),
              NavigationDestination(icon: Icon(Icons.analytics_outlined), selectedIcon: Icon(Icons.analytics), label: 'Review'),
              NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profile'),
            ],
          ),
        ),
      ),
    );
  }
}
