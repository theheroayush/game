import 'package:flutter/material.dart';

/// Centralized Design System tokens matching the Apex Chess Web UI
/// (Tailwind config & index.css)
class AppColors {
  // Backgrounds & Surfaces
  static const Color background = Color(0xFF0E1117);
  static const Color dark = Color(0xFF121417);
  static const Color surface = Color(0xFF1A1D24);
  static const Color card = Color(0xFF222630);
  static const Color border = Color(0xFF2E3442);
  static const Color borderSubtle = Color(0x1FFFFFFF);

  // Accents & Status
  static const Color accentBlue = Color(0xFF3B82F6);
  static const Color accentBlueMuted = Color(0x203B82F6);
  static const Color gold = Color(0xFFEAB308);
  static const Color goldMuted = Color(0x20EAB308);
  static const Color green = Color(0xFF22C55E);
  static const Color greenMuted = Color(0x2022C55E);
  static const Color emerald = Color(0xFF10B981);
  static const Color red = Color(0xFFEF4444);
  static const Color redMuted = Color(0x20EF4444);
  static const Color amber = Color(0xFFF59E0B);
  static const Color purple = Color(0xFFA855F7);
  static const Color indigo = Color(0xFF6366F1);

  // Typography
  static const Color textPrimary = Color(0xFFF0F6FC);
  static const Color textSecondary = Color(0xFF8B949E);
  static const Color textMuted = Color(0xFF6B7280);
}

class AppDecorations {
  static BoxDecoration card({
    Color backgroundColor = AppColors.surface,
    Color borderColor = AppColors.border,
    double borderRadius = 16.0,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: borderColor, width: 1.0),
      boxShadow: const [
        BoxShadow(
          color: Color(0x40000000),
          blurRadius: 12,
          offset: Offset(0, 4),
        ),
      ],
    );
  }

  static BoxDecoration glowCard({
    Color backgroundColor = AppColors.card,
    Color glowColor = AppColors.accentBlue,
    double borderRadius = 16.0,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(color: glowColor.withAlpha(120), width: 1.2),
      boxShadow: [
        BoxShadow(
          color: glowColor.withAlpha(50),
          blurRadius: 14,
          offset: const Offset(0, 2),
        ),
      ],
    );
  }
}
