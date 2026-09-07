import 'package:flutter/services.dart';

class SoundService {
  static bool enabled = true;
  static double volume = 0.7;

  static void playStart() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

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

  static void playHint() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playCastle() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
    Future.delayed(const Duration(milliseconds: 75), () {
      SystemSound.play(SystemSoundType.click);
    });
  }

  static void playLowTimeTick() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playSprintSuccess() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playSprintStrike() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.alert);
  }

  static void playBanter() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.click);
  }

  static void playDefeat() {
    if (!enabled) return;
    SystemSound.play(SystemSoundType.alert);
  }
}
