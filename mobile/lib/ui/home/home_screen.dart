import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../../services/storage_service.dart';
import '../board/chess_board_widget.dart';

class HomeScreen extends StatelessWidget {
  final AppSettings settings;
  final Function(int tabIndex) onNavigateTab;
  final VoidCallback onResumeGame;
  final VoidCallback onOpenNotifications;
  final Function(GameRecord record)? onReviewGame;

  const HomeScreen({
    super.key,
    required this.settings,
    required this.onNavigateTab,
    required this.onResumeGame,
    required this.onOpenNotifications,
    this.onReviewGame,
  });

  @override
  Widget build(BuildContext context) {
    final stats = StorageService.loadStats();
    final inProgressChess = chess.Chess.fromFEN('r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5');

    return Scaffold(
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. App Header: APEX CHESS Logo + Notification Bell
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      // Stylized Emerald 'A' mark
                      Container(
                        width: 28,
                        height: 28,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF10B981), Color(0xFF059669)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Center(
                          child: Text(
                            '▲',
                            style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      RichText(
                        text: const TextSpan(
                          children: [
                            TextSpan(
                              text: 'APEX ',
                              style: TextStyle(
                                color: Color(0xFF10B981),
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 1.5,
                              ),
                            ),
                            TextSpan(
                              text: 'CHESS',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {
                      HapticsService.light();
                      onOpenNotifications();
                    },
                    child: Stack(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF141A1F),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFF222F38)),
                          ),
                          child: const Icon(Icons.notifications_outlined, color: Colors.white, size: 20),
                        ),
                        Positioned(
                          right: 6,
                          top: 6,
                          child: Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: Color(0xFF10B981),
                              shape: BoxShape.circle,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // 2. Greeting & Rating Graph Card
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Good evening,',
                          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${stats.name} 👋',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Rating Widget
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF141A1F),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: const Color(0xFF222F38)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'RATING',
                              style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                            ),
                            Row(
                              children: [
                                Text(
                                  '${stats.rating}',
                                  style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '+${stats.ratingGain}',
                                  style: const TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            Text(
                              'GLOBAL RANK Top ${stats.globalRankPercentile}%',
                              style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 10),
                            ),
                          ],
                        ),
                        const SizedBox(width: 10),
                        // Micro Sparkline
                        SizedBox(
                          width: 46,
                          height: 28,
                          child: CustomPaint(
                            painter: _MicroSparklinePainter(color: const Color(0xFF10B981)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // 3. 7-Day Streak Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withAlpha(30),
                        shape: BoxShape.circle,
                      ),
                      child: const Text('🔥', style: TextStyle(fontSize: 20)),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${stats.winStreak} Day Streak',
                            style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Keep it up! You\'re on fire.',
                            style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                    // Weekday pills: M T W T F S S
                    Row(
                      children: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].asMap().entries.map((e) {
                        final idx = e.key;
                        final day = e.value;
                        final done = idx < stats.winStreak;
                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 2),
                          child: Column(
                            children: [
                              Text(day, style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 3),
                              Container(
                                width: 16,
                                height: 16,
                                decoration: BoxDecoration(
                                  color: done ? const Color(0xFF10B981) : const Color(0xFF222F38),
                                  shape: BoxShape.circle,
                                ),
                                child: done
                                    ? const Icon(Icons.check, size: 10, color: Colors.black)
                                    : null,
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 18),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // 4. Quick Navigation Cards (Play, Puzzles, Openings, Endgames, Review)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildNavCard(
                      title: 'Play',
                      sub: 'Play vs AI or Online',
                      icon: Icons.sports_esports,
                      color: const Color(0xFF10B981),
                      onTap: () => onNavigateTab(1),
                    ),
                    _buildNavCard(
                      title: 'Puzzles',
                      sub: 'Sharpen your tactics',
                      icon: Icons.extension,
                      color: const Color(0xFFF59E0B),
                      onTap: () => onNavigateTab(2),
                    ),
                    _buildNavCard(
                      title: 'Openings',
                      sub: 'Study openings & theory',
                      icon: Icons.menu_book,
                      color: const Color(0xFFA855F7),
                      onTap: () => onNavigateTab(3),
                    ),
                    _buildNavCard(
                      title: 'Endgames',
                      sub: 'Practice endgames & drills',
                      icon: Icons.shield,
                      color: const Color(0xFF38BDF8),
                      onTap: () => onNavigateTab(3),
                    ),
                    _buildNavCard(
                      title: 'Review',
                      sub: 'Analyze your games',
                      icon: Icons.analytics,
                      color: const Color(0xFF22C55E),
                      onTap: () => onNavigateTab(4),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),

              // 5. Continue Your Journey Card
              const Text(
                'Continue Your Journey',
                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Row(
                  children: [
                    // Mini Chessboard Widget preview
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: SizedBox(
                        width: 110,
                        height: 110,
                        child: ChessBoardWidget(
                          game: inProgressChess,
                          boardTheme: settings.boardTheme,
                          pieceTheme: settings.pieceTheme,
                          interactive: false,
                          showCoordinates: false,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    // Details column
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF10B981).withAlpha(40),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: const Text(
                                  'IN PROGRESS',
                                  style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                                ),
                              ),
                              const Icon(Icons.more_horiz, color: Color(0xFF64748B), size: 18),
                            ],
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Italian Game',
                            style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          const Text(
                            'Giuoco Piano',
                            style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Last played: Today, 7:45 PM',
                            style: TextStyle(color: Color(0xFF64748B), fontSize: 10),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'Move 12 • White to move',
                            style: TextStyle(color: Color(0xFFCBD5E1), fontSize: 11),
                          ),
                          const SizedBox(height: 8),
                          SizedBox(
                            height: 34,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF10B981),
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                padding: const EdgeInsets.symmetric(horizontal: 14),
                              ),
                              icon: const Icon(Icons.play_arrow, size: 16),
                              label: const Text('Resume', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                              onPressed: () {
                                HapticsService.light();
                                onResumeGame();
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),

              // 6. Daily Training Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Daily Training', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  TextButton(
                    onPressed: () => onNavigateTab(2),
                    child: const Text('View All', style: TextStyle(color: Color(0xFF10B981), fontSize: 12)),
                  ),
                ],
              ),
              Row(
                children: [
                  // Tactical Focus Card
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF141A1F),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: const Color(0xFF222F38)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(6),
                                decoration: BoxDecoration(color: const Color(0xFF10B981).withAlpha(30), shape: BoxShape.circle),
                                child: const Icon(Icons.gps_fixed, color: Color(0xFF10B981), size: 16),
                              ),
                              const SizedBox(width: 8),
                              const Text('Tactical Focus', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          const SizedBox(height: 6),
                          const Text('8 min • 12 puzzles', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                          const SizedBox(height: 2),
                          const Text('Improve your tactical vision', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                          const SizedBox(height: 10),
                          Row(
                            children: [
                              Expanded(
                                child: LinearProgressIndicator(
                                  value: 0.5,
                                  backgroundColor: const Color(0xFF222F38),
                                  color: const Color(0xFF10B981),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                              ),
                              const SizedBox(width: 8),
                              const Text('6 / 12', style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  // Endgame Booster Card
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF141A1F),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: const Color(0xFF222F38)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(6),
                                decoration: BoxDecoration(color: const Color(0xFFA855F7).withAlpha(30), shape: BoxShape.circle),
                                child: const Icon(Icons.all_inclusive, color: Color(0xFFA855F7), size: 16),
                              ),
                              const SizedBox(width: 8),
                              const Text('Endgame Booster', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          const SizedBox(height: 6),
                          const Text('15 min • 5 drills', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                          const SizedBox(height: 2),
                          const Text('Master key endgame techniques', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                          const SizedBox(height: 8),
                          Align(
                            alignment: Alignment.centerRight,
                            child: TextButton(
                              style: TextButton.styleFrom(padding: EdgeInsets.zero, visualDensity: VisualDensity.compact),
                              onPressed: () => onNavigateTab(3),
                              child: const Text('Start >', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 22),

              // 7. Recent Games Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Recent Games', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  TextButton(
                    onPressed: () => onNavigateTab(5),
                    child: const Text('View All', style: TextStyle(color: Color(0xFF10B981), fontSize: 12)),
                  ),
                ],
              ),
              if (StorageService.getRecentGames().isNotEmpty)
                ...StorageService.getRecentGames().take(2).map((game) {
                  final isWin = game.result.contains('1-0') && game.playerColor == 'w' || game.result.contains('0-1') && game.playerColor == 'b';
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: _buildRecentGameTile(
                      opponent: game.playerColor == 'w' ? game.blackPlayer : game.whitePlayer,
                      isWin: isWin,
                      ratingDelta: isWin ? '+18' : '-12',
                      rating: stats.rating,
                      date: '${game.timeControl} • Move ${game.movesCount}',
                      onTap: () {
                        HapticsService.light();
                        if (onReviewGame != null) {
                          onReviewGame!(game);
                        } else {
                          onNavigateTab(4);
                        }
                      },
                    ),
                  );
                })
              else ...[
                _buildRecentGameTile(
                  opponent: 'Harmonic',
                  isWin: true,
                  ratingDelta: '+18',
                  rating: 1742,
                  date: 'Standard • Today, 6:32 PM',
                  onTap: () => onNavigateTab(4),
                ),
                const SizedBox(height: 8),
                _buildRecentGameTile(
                  opponent: 'Tactician',
                  isWin: false,
                  ratingDelta: '-12',
                  rating: 1724,
                  date: 'Blitz • Today, 4:15 PM',
                  onTap: () => onNavigateTab(4),
                ),
              ],
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavCard({
    required String title,
    required String sub,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: () {
        HapticsService.light();
        onTap();
      },
      child: Container(
        width: 105,
        height: 110,
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: const Color(0xFF222F38)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(color: color.withAlpha(30), borderRadius: BorderRadius.circular(8)),
              child: Icon(icon, color: color, size: 20),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                Text(sub, style: const TextStyle(color: Color(0xFF64748B), fontSize: 9), maxLines: 1, overflow: TextOverflow.ellipsis),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentGameTile({
    required String opponent,
    required bool isWin,
    required String ratingDelta,
    required int rating,
    required String date,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: () {
        HapticsService.light();
        onTap();
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: const Color(0xFF222F38)),
        ),
        child: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: isWin ? const Color(0xFF10B981).withAlpha(30) : const Color(0xFFEF4444).withAlpha(30),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Center(
                child: Text('♟️', style: TextStyle(fontSize: 18, color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444))),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text('vs $opponent', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: isWin ? const Color(0xFF10B981).withAlpha(30) : const Color(0xFFEF4444).withAlpha(30),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          isWin ? 'WIN' : 'LOSS',
                          style: TextStyle(color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444), fontSize: 9, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(date, style: const TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                  Row(
                    children: [
                      Text('⭐ $rating', style: const TextStyle(color: Colors.white, fontSize: 11)),
                      const SizedBox(width: 4),
                      Text(ratingDelta, style: TextStyle(color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444), fontSize: 11, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ],
              ),
            ),
            // Micro Sparkline
            SizedBox(
              width: 44,
              height: 24,
              child: CustomPaint(
                painter: _MicroSparklinePainter(color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444)),
              ),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 18),
          ],
        ),
      ),
    );
  }
}

class _MicroSparklinePainter extends CustomPainter {
  final Color color;

  _MicroSparklinePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final points = [
      Offset(0, size.height * 0.8),
      Offset(size.width * 0.25, size.height * 0.7),
      Offset(size.width * 0.5, size.height * 0.5),
      Offset(size.width * 0.75, size.height * 0.6),
      Offset(size.width, size.height * 0.2),
    ];

    final path = Path();
    path.moveTo(points.first.dx, points.first.dy);
    for (int i = 0; i < points.length - 1; i++) {
      final p0 = points[i];
      final p1 = points[i + 1];
      path.quadraticBezierTo((p0.dx + p1.dx) / 2, (p0.dy + p1.dy) / 2, p1.dx, p1.dy);
    }

    final strokePaint = Paint()
      ..color = color
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, strokePaint);

    final dotPaint = Paint()..color = color;
    canvas.drawCircle(points.last, 3.0, dotPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
