import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notifications = FlutterLocalNotificationsPlugin();
  static bool _initialized = false;

  static Future<void> init() async {
    if (_initialized) return;

    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const initSettings = InitializationSettings(android: androidSettings);

    try {
      await _notifications.initialize(
        settings: initSettings,
        onDidReceiveNotificationResponse: (response) {
          // Deep link payload handling
        },
      );
      _initialized = true;
    } catch (_) {
      // Graceful fallback if platform notifications are unsupported (e.g. desktop/test)
    }
  }

  static Future<void> scheduleDailyPracticeNotifications({bool enabled = true}) async {
    if (!_initialized || !enabled) return;

    const androidDetails = AndroidNotificationDetails(
      'apex_chess_daily',
      'Daily Chess Training',
      channelDescription: 'Daily tactical drills and practice reminders to keep your streak alive.',
      importance: Importance.high,
      priority: Priority.high,
      showWhen: true,
    );

    const details = NotificationDetails(android: androidDetails);

    try {
      // 1. Morning Daily Tactical Puzzle
      await _notifications.show(
        id: 101,
        title: '♟️ Daily Tactical Drill Ready!',
        body: 'Spot today\'s winning combination and boost your puzzle rating on Apex Chess.',
        notificationDetails: details,
        payload: 'puzzle',
      );

      // 2. Evening Practice Reminder
      await _notifications.show(
        id: 102,
        title: '🔥 Keep Your Win Streak Alive!',
        body: 'Play your daily rated match against The Architect to maintain your master progression.',
        notificationDetails: details,
        payload: 'play',
      );
    } catch (_) {}
  }

  static Future<void> triggerBlunderRemediationNotification(int blunderCount) async {
    if (!_initialized || blunderCount <= 0) return;

    const androidDetails = AndroidNotificationDetails(
      'apex_chess_coach',
      'Personal Coach Alerts',
      channelDescription: 'Blunder remediation and tactical reviews from your AI coach.',
      importance: Importance.high,
      priority: Priority.high,
    );

    const details = NotificationDetails(android: androidDetails);

    try {
      await _notifications.show(
        id: 103,
        title: '🧠 Coach Review: $blunderCount Blunder(s) Detected',
        body: 'Can you find the winning move today? Tap to launch Blunder Retry mode.',
        notificationDetails: details,
        payload: 'analysis',
      );
    } catch (_) {}
  }
}
