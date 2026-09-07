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

  static void selection() {
    if (!enabled) return;
    HapticFeedback.selectionClick();
  }

  static void error() {
    if (!enabled) return;
    HapticFeedback.heavyImpact();
    Future.delayed(const Duration(milliseconds: 100), () {
      HapticFeedback.heavyImpact();
    });
  }

  static void success() {
    if (!enabled) return;
    HapticFeedback.lightImpact();
    Future.delayed(const Duration(milliseconds: 80), () {
      HapticFeedback.mediumImpact();
    });
  }

  static void castle() {
    if (!enabled) return;
    HapticFeedback.mediumImpact();
    Future.delayed(const Duration(milliseconds: 70), () {
      HapticFeedback.lightImpact();
    });
  }
}
