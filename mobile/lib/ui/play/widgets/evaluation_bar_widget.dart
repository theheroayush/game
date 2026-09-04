import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';

/// Vertical Evaluation Bar matching Web UI Chessboard.tsx
class EvaluationBarWidget extends StatelessWidget {
  final int evalScore; // Centipawns (+ for White, - for Black)
  final bool flipped;
  final double width;
  final double? height;

  const EvaluationBarWidget({
    super.key,
    required this.evalScore,
    this.flipped = false,
    this.width = 12.0,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    // Sigmoid percentage calculation matching web:
    final clampedCp = evalScore.clamp(-1200, 1200);
    final rawWhitePercent = 50.0 + 50.0 * (2.0 / (1.0 + math.exp(-0.0035 * clampedCp)) - 1.0);
    final clampedPercent = rawWhitePercent.clamp(5.0, 95.0);

    // Format display string (+1.4, -0.6, M, etc.)
    final String evalDisplay;
    if (evalScore.abs() > 9000) {
      evalDisplay = evalScore > 0 ? 'M' : '-M';
    } else {
      final double score = evalScore / 100.0;
      evalDisplay = score >= 0 ? '+${score.toStringAsFixed(1)}' : score.toStringAsFixed(1);
    }

    final double topPercent = flipped ? clampedPercent : (100.0 - clampedPercent);
    final double bottomPercent = 100.0 - topPercent;

    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(width / 2),
        border: Border.all(color: AppColors.border, width: 1.0),
        boxShadow: const [
          BoxShadow(
            color: Color(0x60000000),
            blurRadius: 6,
            offset: Offset(0, 2),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Column(
            children: [
              // Top Segment (Black or White based on flipped)
              Expanded(
                flex: (topPercent * 10).round(),
                child: Container(
                  color: flipped ? Colors.white : const Color(0xFF222630),
                ),
              ),
              // Bottom Segment
              Expanded(
                flex: (bottomPercent * 10).round(),
                child: Container(
                  color: flipped ? const Color(0xFF222630) : Colors.white,
                ),
              ),
            ],
          ),
          // Numerical score pill overlay
          Positioned(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 1),
              decoration: BoxDecoration(
                color: Colors.black.withAlpha(200),
                borderRadius: BorderRadius.circular(4),
              ),
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Text(
                  evalDisplay,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 8,
                    fontWeight: FontWeight.w900,
                    fontFamily: 'monospace',
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
