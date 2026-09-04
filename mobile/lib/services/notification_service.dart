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

  static Future<void> scheduleDailyPracticeNotifications({
    bool enabled = true,
    int hour = 20,
    int minute = 0,
  }) async {
    if (!_initialized || !enabled) {
      try {
        await _notifications.cancel(id: 101);
        await _notifications.cancel(id: 102);
      } catch (_) {}
      return;
    }

    const androidDetails = AndroidNotificationDetails(
      'apex_chess_daily',
      'Daily Chess Training',
      channelDescription: 'Daily tactical drills and practice reminders to keep your streak alive.',
      importance: Importance.high,
      priority: Priority.high,
      showWhen: true,
    );

    const details = NotificationDetails(android: androidDetails);

    final displayHour = hour == 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    final amPm = hour >= 12 ? 'PM' : 'AM';
    final formattedTime = '$displayHour:${minute.toString().padLeft(2, '0')} $amPm';

    try {
      if (hour >= 17) {
        // Evening notification (e.g. sharp 8:00 PM practice)
        await _notifications.show(
          id: 102,
          title: '🔥 Keep Your Win Streak Alive!',
          body: 'Sharp $formattedTime alert! Jump into your daily rated match against The Architect on Apex Chess.',
          notificationDetails: details,
          payload: 'play',
        );
      } else {
        // Morning notification (e.g. 8:00 AM tactical drill)
        await _notifications.show(
          id: 101,
          title: '♟️ Daily Tactical Drill Ready!',
          body: 'Sharp $formattedTime alert! Spot today\'s winning combination and boost your rating on Apex Chess.',
          notificationDetails: details,
          payload: 'puzzle',
        );
      }
    } catch (_) {}
  }

  static Future<void> showImmediateTestAlert({int hour = 20, int minute = 0}) async {
    if (!_initialized) return;

    const androidDetails = AndroidNotificationDetails(
      'apex_chess_test',
      'Test Notifications',
      channelDescription: 'Test notifications for personal schedule verification.',
      importance: Importance.max,
      priority: Priority.high,
      showWhen: true,
    );

    const details = NotificationDetails(android: androidDetails);
    final displayHour = hour == 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    final amPm = hour >= 12 ? 'PM' : 'AM';
    final formattedTime = '$displayHour:${minute.toString().padLeft(2, '0')} $amPm';

    try {
      await _notifications.show(
        id: 999,
        title: '👑 Apex Chess Daily Alert Configured',
        body: 'Your daily reminder is set for sharp $formattedTime. You will be notified automatically to keep your master progression active!',
        notificationDetails: details,
        payload: 'home',
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
