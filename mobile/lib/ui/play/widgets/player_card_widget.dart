import 'package:flutter/material.dart';
import '../../../models/chess_models.dart';
import '../../board/staunton_pieces.dart';
import '../../theme/app_theme.dart';

/// PlayerCardWidget with design parity to Web UI PlayerCard.tsx:
/// - Gradient avatar with role icon & online indicator
/// - Name & Elo badge pill
/// - Live AI thinking indicator
/// - Grouped captured pieces tray with count multipliers
/// - Gold material advantage pill (+1, +3, etc.)
/// - Digital clock with low-time warning (< 15s)
class PlayerCardWidget extends StatelessWidget {
  final String name;
  final int elo;
  final bool isAI;
  final String? aiAvatar;
  final String pieceColor; // 'w' | 'b'
  final bool isActive;
  final bool isThinking;
  final int timeLeftSeconds;
  final bool hasClock;
  final List<String> capturedPieces;
  final int materialAdvantage;
  final PieceThemeId pieceThemeId;

  const PlayerCardWidget({
    super.key,
    required this.name,
    required this.elo,
    this.isAI = false,
    this.aiAvatar,
    required this.pieceColor,
    required this.isActive,
    this.isThinking = false,
    required this.timeLeftSeconds,
    required this.hasClock,
    required this.capturedPieces,
    required this.materialAdvantage,
    this.pieceThemeId = PieceThemeId.staunton,
  });

  String _formatClock(int totalSec) {
    if (!hasClock || totalSec < 0) return '∞';
    final m = totalSec ~/ 60;
    final s = totalSec % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final isLowTime = hasClock && timeLeftSeconds <= 15 && timeLeftSeconds > 0;
    final oppColor = pieceColor == 'w' ? 'b' : 'w';

    // Group captured pieces by type
    final Map<String, int> capturedCounts = {};
    for (final p in capturedPieces) {
      final key = p.toLowerCase();
      capturedCounts[key] = (capturedCounts[key] ?? 0) + 1;
    }
    const pieceOrder = ['q', 'r', 'b', 'n', 'p'];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 3),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isActive ? AppColors.card : AppColors.surface.withAlpha(220),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isLowTime
              ? AppColors.red
              : isActive
                  ? AppColors.accentBlue.withAlpha(200)
                  : AppColors.border,
          width: isActive || isLowTime ? 1.5 : 1.0,
        ),
        boxShadow: [
          if (isActive)
            BoxShadow(
              color: AppColors.accentBlue.withAlpha(40),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          if (isLowTime)
            BoxShadow(
              color: AppColors.red.withAlpha(60),
              blurRadius: 12,
              offset: const Offset(0, 2),
            ),
        ],
      ),
      child: Row(
        children: [
          // 1. Avatar with online dot & gradient background
          Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  gradient: isAI
                      ? const LinearGradient(
                          colors: [Color(0xFF2563EB), Color(0xFF4F46E5)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        )
                      : const LinearGradient(
                          colors: [Color(0xFF3F3F46), Color(0xFF18181B)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                  border: Border.all(
                    color: isAI ? const Color(0xFF60A5FA) : const Color(0xFF52525B),
                    width: 1.0,
                  ),
                ),
                child: Center(
                  child: isAI
                      ? (aiAvatar != null && aiAvatar!.isNotEmpty
                          ? Text(aiAvatar!, style: const TextStyle(fontSize: 16))
                          : const Icon(Icons.smart_toy_outlined, color: Colors.white, size: 18))
                      : const Icon(Icons.person_outline_rounded, color: Colors.white, size: 20),
                ),
              ),
              // Status Dot
              Positioned(
                bottom: -2,
                right: -2,
                child: Container(
                  width: 10,
                  height: 10,
                  decoration: BoxDecoration(
                    color: isActive ? AppColors.green : const Color(0xFF71717A),
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.surface, width: 1.5),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(width: 10),

          // 2. Name, Elo & Captured Pieces Tray
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                // Name + Thinking indicator + Elo badge (ScaleDown fitted)
                FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        name,
                        style: const TextStyle(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(width: 6),
                      if (isThinking)
                        const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.psychology, color: AppColors.accentBlue, size: 12),
                            SizedBox(width: 2),
                            Text(
                              'thinking...',
                              style: TextStyle(
                                color: AppColors.accentBlue,
                                fontSize: 10,
                                fontStyle: FontStyle.italic,
                              ),
                            ),
                            SizedBox(width: 6),
                          ],
                        ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                        decoration: BoxDecoration(
                          color: AppColors.dark,
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(color: AppColors.border, width: 1),
                        ),
                        child: Text(
                          '$elo',
                          style: const TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'monospace',
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 3),

                // Captured Pieces Tray & Material Advantage (ScaleDown fitted)
                SizedBox(
                  height: 16,
                  child: FittedBox(
                    fit: BoxFit.scaleDown,
                    alignment: Alignment.centerLeft,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Miniature piece tray
                        ...pieceOrder.expand((pt) {
                          final count = capturedCounts[pt] ?? 0;
                          if (count <= 0) return <Widget>[];
                          return [
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ChessPieceWidget(
                                  type: pt,
                                  color: oppColor,
                                  theme: pieceThemeId,
                                  size: 14,
                                ),
                                if (count > 1)
                                  Padding(
                                    padding: const EdgeInsets.only(right: 3),
                                    child: Text(
                                      '$count',
                                      style: const TextStyle(
                                        color: AppColors.textSecondary,
                                        fontSize: 9,
                                        fontWeight: FontWeight.bold,
                                        fontFamily: 'monospace',
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ];
                        }),

                        // Material Advantage Badge (+N)
                        if (materialAdvantage > 0) ...[
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 0.5),
                            decoration: BoxDecoration(
                              color: const Color(0x30EAB308),
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(color: const Color(0x60EAB308), width: 1.0),
                            ),
                            child: Text(
                              '+$materialAdvantage',
                              style: const TextStyle(
                                color: AppColors.gold,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'monospace',
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(width: 8),

          // 3. Digital Clock Display
          if (hasClock)
            FittedBox(
              fit: BoxFit.scaleDown,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5),
                decoration: BoxDecoration(
                  color: isLowTime
                      ? const Color(0x40EF4444)
                      : isActive
                          ? AppColors.dark
                          : AppColors.surface,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                    color: isLowTime
                        ? AppColors.red
                        : isActive
                            ? AppColors.border
                            : const Color(0xFF222630),
                    width: 1.0,
                  ),
                  boxShadow: [
                    if (isLowTime)
                      const BoxShadow(
                        color: Color(0x40EF4444),
                        blurRadius: 8,
                      ),
                  ],
                ),
                child: Text(
                  _formatClock(timeLeftSeconds),
                  style: TextStyle(
                    color: isLowTime
                        ? const Color(0xFFFCA5A5)
                        : isActive
                            ? AppColors.textPrimary
                            : AppColors.textSecondary,
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'monospace',
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
