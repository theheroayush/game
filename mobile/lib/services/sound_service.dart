import 'package:flutter/services.dart';

class SoundService {
  static bool enabled = true;
  static double volume = 0.7;

  static void playMove() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playCapture() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playCheck() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.alert);
  }

  static void playVictory() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.alert);
  }

  static void playError() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.alert);
  }
}
