import 'package:flutter/services.dart';

class HapticsService {
  static bool enabled = true;

  static void light() {
    if (!enabled) return;
    HapticFeedback.lightImpact();
  }

  static void medium() {
    if (!enabled) return;
    HapticFeedback.mediumImpact();
  }

  static void heavy() {
    if (!enabled) return;
    HapticFeedback.heavyImpact();
  }

  static void vibrate() {
    if (!enabled) return;
    HapticFeedback.vibrate();
  }
}
