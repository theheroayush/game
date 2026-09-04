import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../services/haptics_service.dart';
import '../../theme/app_theme.dart';

/// MoveHistorySheet matching Web UI MoveHistory.tsx:
/// - SAN move pairs table (White & Black)
/// - Step navigation controls (First, Prev, Next, Last)
/// - Match actions (Undo, Flip, Draw, Resign)
/// - Copy PGN button
class MoveHistorySheet extends StatelessWidget {
  final List<String> moveSans;
  final int currentPly;
  final String pgn;
  final Function(int ply) onSelectPly;
  final VoidCallback onUndo;
  final VoidCallback? onRedo;
  final VoidCallback onFlip;
  final VoidCallback onOfferDraw;
  final VoidCallback onResign;

  const MoveHistorySheet({
    super.key,
    required this.moveSans,
    required this.currentPly,
    required this.pgn,
    required this.onSelectPly,
    required this.onUndo,
    this.onRedo,
    required this.onFlip,
    required this.onOfferDraw,
    required this.onResign,
  });

  @override
  Widget build(BuildContext context) {
    // Pair moves into White / Black
    final List<Map<String, dynamic>> pairedMoves = [];
    for (int i = 0; i < moveSans.length; i += 2) {
      pairedMoves.add({
        'num': (i ~/ 2) + 1,
        'white': moveSans[i],
        'whitePly': i + 1,
        'black': (i + 1 < moveSans.length) ? moveSans[i + 1] : null,
        'blackPly': (i + 1 < moveSans.length) ? i + 2 : null,
      });
    }

    return Container(
      constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.height * 0.7),
      decoration: const BoxDecoration(
        color: AppColors.dark,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        border: Border(
          top: BorderSide(color: AppColors.border, width: 1.0),
        ),
      ),
      child: SafeArea(
        top: false,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle pill
            const SizedBox(height: 10),
            Center(
              child: Container(
                width: 38,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'MOVE NOTATION',
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.0,
                    ),
                  ),
                  TextButton.icon(
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      backgroundColor: AppColors.surface,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                        side: const BorderSide(color: AppColors.border),
                      ),
                    ),
                    icon: const Icon(Icons.copy_rounded, color: AppColors.textSecondary, size: 14),
                    label: const Text(
                      'PGN',
                      style: TextStyle(color: AppColors.textPrimary, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: pgn));
                      HapticsService.light();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('PGN copied to clipboard!'),
                          duration: Duration(seconds: 1),
                          backgroundColor: AppColors.card,
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const Divider(color: AppColors.border, height: 1),

            // Move list scroll area
            Flexible(
              child: pairedMoves.isEmpty
                  ? const Center(
                      child: Padding(
                        padding: EdgeInsets.all(32),
                        child: Text(
                          'No moves yet. Make your opening move!',
                          style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
                        ),
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      itemCount: pairedMoves.length,
                      itemBuilder: (context, index) {
                        final pair = pairedMoves[index];
                        final isWhiteActive = currentPly == pair['whitePly'];
                        final isBlackActive = currentPly == pair['blackPly'];

                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 2),
                          child: Row(
                            children: [
                              // Move number
                              SizedBox(
                                width: 36,
                                child: Text(
                                  '${pair['num']}.',
                                  style: const TextStyle(
                                    color: AppColors.textMuted,
                                    fontSize: 12,
                                    fontFamily: 'monospace',
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),

                              // White move button
                              Expanded(
                                child: InkWell(
                                  onTap: () {
                                    onSelectPly(pair['whitePly'] as int);
                                    HapticsService.light();
                                  },
                                  borderRadius: BorderRadius.circular(6),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                                    decoration: BoxDecoration(
                                      color: isWhiteActive ? AppColors.accentBlue : Colors.transparent,
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      pair['white'] as String,
                                      style: TextStyle(
                                        color: isWhiteActive ? Colors.white : AppColors.textPrimary,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                        fontFamily: 'monospace',
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 6),

                              // Black move button
                              Expanded(
                                child: pair['black'] != null
                                    ? InkWell(
                                        onTap: () {
                                          onSelectPly(pair['blackPly'] as int);
                                          HapticsService.light();
                                        },
                                        borderRadius: BorderRadius.circular(6),
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                                          decoration: BoxDecoration(
                                            color: isBlackActive ? AppColors.accentBlue : Colors.transparent,
                                            borderRadius: BorderRadius.circular(6),
                                          ),
                                          child: Text(
                                            pair['black'] as String,
                                            style: TextStyle(
                                              color: isBlackActive ? Colors.white : AppColors.textPrimary,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 13,
                                              fontFamily: 'monospace',
                                            ),
                                          ),
                                        ),
                                      )
                                    : const SizedBox.shrink(),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
            ),

            // Step Navigation Bar (First, Prev, Next, Last)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: const BoxDecoration(
                color: AppColors.surface,
                border: Border(
                  top: BorderSide(color: AppColors.border, width: 1.0),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: IconButton(
                      icon: const Icon(Icons.first_page_rounded, color: AppColors.textPrimary),
                      onPressed: currentPly > 0 ? () => onSelectPly(0) : null,
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: const Icon(Icons.chevron_left_rounded, color: AppColors.textPrimary),
                      onPressed: currentPly > 0 ? () => onSelectPly(currentPly - 1) : null,
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: const Icon(Icons.chevron_right_rounded, color: AppColors.textPrimary),
                      onPressed: currentPly < moveSans.length ? () => onSelectPly(currentPly + 1) : null,
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: const Icon(Icons.last_page_rounded, color: AppColors.textPrimary),
                      onPressed: currentPly < moveSans.length ? () => onSelectPly(moveSans.length) : null,
                    ),
                  ),
                ],
              ),
            ),

            // Action Buttons Bar (Undo, Flip, Draw, Resign)
            Container(
              padding: const EdgeInsets.fromLTRB(14, 8, 14, 12),
              color: AppColors.dark,
              child: Row(
                children: [
                  Expanded(
                    child: _buildActionButton(
                      icon: Icons.undo_rounded,
                      label: 'Undo',
                      onTap: onUndo,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  if (onRedo != null) ...[
                    const SizedBox(width: 6),
                    Expanded(
                      child: _buildActionButton(
                        icon: Icons.redo_rounded,
                        label: 'Redo',
                        onTap: onRedo!,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                  const SizedBox(width: 6),
                  Expanded(
                    child: _buildActionButton(
                      icon: Icons.sync_rounded,
                      label: 'Flip',
                      onTap: onFlip,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildActionButton(
                      icon: Icons.handshake_outlined,
                      label: 'Draw',
                      onTap: onOfferDraw,
                      color: AppColors.amber,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildActionButton(
                      icon: Icons.flag_outlined,
                      label: 'Resign',
                      onTap: onResign,
                      color: AppColors.red,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    required Color color,
  }) {
    return InkWell(
      onTap: () {
        HapticsService.light();
        onTap();
      },
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(height: 3),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontSize: 10.5,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
