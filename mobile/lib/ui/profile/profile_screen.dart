import 'package:flutter/material.dart';
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../../services/storage_service.dart';

class ProfileScreen extends StatelessWidget {
  final AppSettings settings;
  final VoidCallback onOpenSettings;
  final Function(GameRecord record)? onReviewGame;

  const ProfileScreen({
    super.key,
    required this.settings,
    required this.onOpenSettings,
    this.onReviewGame,
  });

  @override
  Widget build(BuildContext context) {
    final stats = StorageService.loadStats();
    final recentGames = StorageService.getRecentGames();

    final is100Games = stats.gamesPlayed >= 100;
    final isStreak7 = stats.winStreak >= 7;
    final isRating1500 = stats.rating >= 1500;
    final isWins50 = stats.wins >= 50;
    final is10Perfect = stats.gamesPlayed >= 10;

    return Scaffold(
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Top Bar: Profile title + Share & Settings Icons
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Profile',
                    style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.share_outlined, color: Colors.white, size: 20),
                        onPressed: () {
                          HapticsService.light();
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('🔗 Profile link copied to clipboard!'),
                              backgroundColor: Color(0xFF10B981),
                              duration: Duration(seconds: 2),
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.settings_outlined, color: Colors.white, size: 22),
                        onPressed: () {
                          HapticsService.light();
                          onOpenSettings();
                        },
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // 2. User Hero Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Row(
                  children: [
                    // Glowing avatar
                    Stack(
                      children: [
                        Container(
                          width: 54,
                          height: 54,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF10B981), width: 2),
                            gradient: const RadialGradient(
                              colors: [Color(0xFF0F382B), Color(0xFF0A1F18)],
                            ),
                          ),
                          child: const Center(
                            child: Text('♟️', style: TextStyle(fontSize: 26)),
                          ),
                        ),
                        Positioned(
                          right: 0,
                          bottom: 0,
                          child: Container(
                            width: 16,
                            height: 16,
                            decoration: const BoxDecoration(
                              color: Color(0xFF10B981),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, size: 10, color: Colors.black),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 12),
                    // Names & details
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                stats.name == 'Ayush' ? 'Ayush Upadhyay' : (stats.name.isNotEmpty ? stats.name : 'Ayush Upadhyay'),
                                style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(width: 4),
                              const Icon(Icons.verified, color: Color(0xFF10B981), size: 16),
                            ],
                          ),
                          const SizedBox(height: 1),
                          const Text('@apex_chess_23', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                          const SizedBox(height: 3),
                          const Text('🇮🇳 India  |  Member since Mar 2024', style: TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                        ],
                      ),
                    ),
                    // Apex Premium Badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0E241E),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: const Color(0xFF10B981).withAlpha(80)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Row(
                            children: [
                              Text('💎', style: TextStyle(fontSize: 10)),
                              SizedBox(width: 4),
                              Text('Apex Premium', style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          SizedBox(height: 2),
                          Text('Active', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                          Text('Renews on 15 Jun 2025', style: TextStyle(color: Color(0xFF64748B), fontSize: 8)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // 3. 4 Key Metric Cards
              Row(
                children: [
                  _buildMetricCard('Rating', '${stats.rating}', '▲ 24', Icons.trending_up, const Color(0xFF10B981)),
                  const SizedBox(width: 8),
                  _buildMetricCard('Global Rank', 'TOP ${stats.globalRankPercentile}%', '▲ 2%', Icons.emoji_events_outlined, const Color(0xFFF59E0B)),
                  const SizedBox(width: 8),
                  _buildMetricCard('Games', '${stats.gamesPlayed}', '${stats.wins}W ${stats.losses}L ${stats.draws}D', Icons.bar_chart, const Color(0xFF38BDF8)),
                  const SizedBox(width: 8),
                  _buildMetricCard('Accuracy', '81%', '▲ 6%', Icons.radar, const Color(0xFFA855F7)),
                ],
              ),
              const SizedBox(height: 18),

              // 4. Rating Progress Area Chart Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('Rating Progress', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                            Text('Last 30 Days', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                          ],
                        ),
                        Row(
                          children: [
                            const Text('Best: ', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                            Text('${stats.rating + 26}', style: const TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),

                    // Area Line Chart Canvas with Y-axis
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Y-axis ticks
                        Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: const [
                            Text('1760', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                            SizedBox(height: 18),
                            Text('1700', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                            SizedBox(height: 18),
                            Text('1640', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                            SizedBox(height: 18),
                            Text('1580', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                          ],
                        ),
                        const SizedBox(width: 8),
                        // Chart Area
                        Expanded(
                          child: SizedBox(
                            height: 110,
                            child: CustomPaint(
                              painter: _RatingChartPainter(currentRating: stats.rating),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // X-axis dates
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        SizedBox(width: 28),
                        Text('15 Apr', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                        Text('22 Apr', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                        Text('29 Apr', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                        Text('6 May', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                        Text('13 May', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // 5. Achievements Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('Achievements', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  Text('View All →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildAchievementShield('♟️ 100', 'Games Played', is100Games ? 'Unlocked' : '${stats.gamesPlayed}/100', const Color(0xFF10B981), isUnlocked: is100Games),
                    _buildAchievementShield('⚡ 7', '7 Day Streak', isStreak7 ? 'Unlocked' : '${stats.winStreak}/7', const Color(0xFFF59E0B), isUnlocked: isStreak7),
                    _buildAchievementShield('🎯 1500', 'Rating Reached', isRating1500 ? 'Unlocked' : '${stats.rating}/1500', const Color(0xFFA855F7), isUnlocked: isRating1500),
                    _buildAchievementShield('⚔️ 50', 'Wins', isWins50 ? 'Unlocked' : '${stats.wins}/50', const Color(0xFF38BDF8), isUnlocked: isWins50),
                    _buildAchievementShield('⭐ 10', 'Perfect Games', is10Perfect ? 'Unlocked' : '${stats.wins}/10', const Color(0xFFEF4444), isUnlocked: is10Perfect),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // 6. Recent Activity Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('Recent Activity', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  Text('View All →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 10),
              if (recentGames.isNotEmpty)
                ...recentGames.take(4).map((game) {
                  final isWin = game.result.contains('1-0') && game.playerColor == 'w' || game.result.contains('0-1') && game.playerColor == 'b';
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: _buildActivityTile(
                      title: 'vs ${game.blackPlayer}',
                      result: isWin ? 'You Won' : (game.result.contains('1/2') ? 'Draw' : 'You Lost'),
                      sub: '${game.timeControl} • Move ${game.movesCount}',
                      delta: isWin ? '+18' : '-12',
                      rating: '${stats.rating}',
                      isWin: isWin,
                      onTap: () {
                        HapticsService.light();
                        onReviewGame?.call(game);
                      },
                    ),
                  );
                })
              else ...[
                _buildActivityTile(
                  title: 'vs Harmonic (1200)',
                  result: 'You Won',
                  sub: 'Blitz • 6 min',
                  delta: '+18',
                  rating: '1742',
                  isWin: true,
                  onTap: () {
                    HapticsService.light();
                    onReviewGame?.call(const GameRecord(
                      id: 'rec_harmonic_01',
                      date: '2026-09-04 18:32',
                      finalFen: 'r1bqkb1r/pp1n1ppp/4pn2/1p6/4P3/1BN2P2/PPPQ2PP/2KR2NR w kq - 0 11',
                      reason: 'Checkmate',
                      playerColor: 'w',
                      difficultyLevel: 5,
                      personality: AIPersonalityId.balanced,
                      whitePlayer: 'Ayush',
                      blackPlayer: 'Harmonic (1200)',
                      whiteElo: 1742,
                      blackElo: 1200,
                      result: '1-0',
                      timeControl: '10 min',
                      movesCount: 36,
                      pgn: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Nbd7 9. Qd2 b5 10. O-O-O Rc8 11. g4 Nb6 12. g5 Nfd7 13. f4 Be7 14. f5 Bc4 15. h4 b4 16. Nd5 Nxd5 17. exd5 a5 18. Kb1 a4 19. Nc1 b3 20. cxb3 axb3 21. a3 Bxf1 22. Rhxf1 Rc2 23. Qd3 Qb8 24. Nxb3 Rg2 25. Rg1 Rxg1 26. Rxg1 O-O 27. f6 Bd8 28. fxg7 Kxg7 29. h5 Bb6 30. g6 fxg6 31. hxg6 h6 32. Rh1 Bxe3 33. Qxe3 Rf4 34. Qh3 Nf8 35. Qxh6+ Kf6 36. g7+ 1-0',
                    ));
                  },
                ),
                const SizedBox(height: 8),
                _buildActivityTile(
                  title: 'vs Berserker (1600)',
                  result: 'You Lost',
                  sub: 'Rapid • 10 min',
                  delta: '-12',
                  rating: '1724',
                  isWin: false,
                  onTap: () {
                    HapticsService.light();
                    onReviewGame?.call(const GameRecord(
                      id: 'rec_berserker_01',
                      date: '2026-09-04 16:15',
                      finalFen: 'r1bq1rk1/ppp1npp1/6np/3pN3/1b1P4/BBP2N2/P2N1PPP/R2QR1K1 w - - 0 15',
                      reason: 'Resignation',
                      playerColor: 'w',
                      difficultyLevel: 7,
                      personality: AIPersonalityId.aggressive,
                      whitePlayer: 'Ayush',
                      blackPlayer: 'Berserker (1600)',
                      whiteElo: 1724,
                      blackElo: 1600,
                      result: '0-1',
                      timeControl: '10 min',
                      movesCount: 28,
                      pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 8. Ng5 d5 9. exd5 Ne5 10. Bb3 O-O 11. cxd4 N5g6 12. Ba3 h6 13. Nf3 Re8 14. Nbd2 Nxd5 0-1',
                    ));
                  },
                ),
                const SizedBox(height: 8),
                _buildActivityTile(
                  title: 'vs Tactician (1500)',
                  result: 'You Won',
                  sub: 'Rapid • 10 min',
                  delta: '+14',
                  rating: '1736',
                  isWin: true,
                  onTap: () {
                    HapticsService.light();
                    onReviewGame?.call(const GameRecord(
                      id: 'rec_tactician_01',
                      date: '2026-09-04 14:00',
                      finalFen: '2r1rnk1/1p1nbppp/p1p1b3/8/3PP1n1/P1NB1P2/1PQ1N1PP/3R1R1K w - - 1 17',
                      reason: 'Resignation',
                      playerColor: 'w',
                      difficultyLevel: 6,
                      personality: AIPersonalityId.tactical,
                      whitePlayer: 'Ayush',
                      blackPlayer: 'Tactician (1500)',
                      whiteElo: 1736,
                      blackElo: 1500,
                      result: '1-0',
                      timeControl: '10 min',
                      movesCount: 32,
                      pgn: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 c6 7. Bd3 Nbd7 8. Qc2 O-O 9. Nge2 Re8 10. O-O Nf8 11. f3 Be6 12. Rad1 Rc8 13. Kh1 a6 14. e4 dxe4 15. fxe4 Ng4 16. Bc1 Bg5 1-0',
                    ));
                  },
                ),
              ],
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMetricCard(String label, String value, String delta, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: const Color(0xFF222F38)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 16),
            const SizedBox(height: 6),
            Text(value, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold), maxLines: 1),
            const SizedBox(height: 2),
            Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 9)),
            Text(delta, style: TextStyle(color: color, fontSize: 9, fontWeight: FontWeight.bold), maxLines: 1),
          ],
        ),
      ),
    );
  }

  Widget _buildAchievementShield(String title, String subtitle, String status, Color color, {bool isUnlocked = true}) {
    return Container(
      width: 96,
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: const Color(0xFF141A1F),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: isUnlocked ? color.withAlpha(80) : const Color(0xFF222F38)),
      ),
      child: Column(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: isUnlocked ? color.withAlpha(20) : Colors.black38,
              shape: BoxShape.circle,
              border: Border.all(color: isUnlocked ? color : const Color(0xFF334155)),
            ),
            child: Center(
              child: Text(title.split(' ').first, style: const TextStyle(fontSize: 18)),
            ),
          ),
          const SizedBox(height: 6),
          Text(title.split(' ').last, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
          Text(subtitle, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 9), textAlign: TextAlign.center, maxLines: 1),
          Text(status, style: TextStyle(color: isUnlocked ? color : const Color(0xFF64748B), fontSize: 8, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildActivityTile({
    required String title,
    required String result,
    required String sub,
    required String delta,
    required String rating,
    required bool isWin,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
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
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isWin ? const Color(0xFF10B981).withAlpha(30) : const Color(0xFFEF4444).withAlpha(30),
                shape: BoxShape.circle,
              ),
              child: Icon(isWin ? Icons.emoji_events : Icons.close, color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444), size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 2),
                  Row(
                    children: [
                      Text(result, style: TextStyle(color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444), fontSize: 11, fontWeight: FontWeight.bold)),
                      const SizedBox(width: 6),
                      Text('• $sub', style: const TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                    ],
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(rating, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                Text(delta, style: TextStyle(color: isWin ? const Color(0xFF10B981) : const Color(0xFFEF4444), fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(width: 8),
            const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 18),
          ],
        ),
      ),
    );
  }
}

class _RatingChartPainter extends CustomPainter {
  final int currentRating;

  _RatingChartPainter({this.currentRating = 1742});

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Grid lines
    final gridPaint = Paint()
      ..color = const Color(0xFF222F38).withAlpha(80)
      ..strokeWidth = 1.0;

    for (double y = 0; y <= h; y += h / 3) {
      canvas.drawLine(Offset(0, y), Offset(w, y), gridPaint);
    }

    // Normalized points simulating last 30 days
    final points = [
      Offset(0, h * 0.82),
      Offset(w * 0.12, h * 0.70),
      Offset(w * 0.22, h * 0.68),
      Offset(w * 0.32, h * 0.55),
      Offset(w * 0.44, h * 0.58),
      Offset(w * 0.56, h * 0.64),
      Offset(w * 0.68, h * 0.42),
      Offset(w * 0.80, h * 0.46),
      Offset(w * 0.90, h * 0.34),
      Offset(w, h * 0.22), // Peak
    ];

    // Build smooth curve path
    final path = Path();
    path.moveTo(points.first.dx, points.first.dy);
    for (int i = 0; i < points.length - 1; i++) {
      final p0 = points[i];
      final p1 = points[i + 1];
      path.quadraticBezierTo((p0.dx + p1.dx) / 2, (p0.dy + p1.dy) / 2, p1.dx, p1.dy);
    }

    // Gradient fill area
    final fillPath = Path.from(path);
    fillPath.lineTo(w, h);
    fillPath.lineTo(0, h);
    fillPath.close();

    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          const Color(0xFF10B981).withAlpha(80),
          const Color(0xFF10B981).withAlpha(0),
        ],
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    canvas.drawPath(fillPath, fillPaint);

    // Glowing stroke
    final strokePaint = Paint()
      ..color = const Color(0xFF10B981)
      ..strokeWidth = 2.4
      ..style = PaintingStyle.stroke;

    canvas.drawPath(path, strokePaint);

    // End marker pill with current rating
    final lastPoint = points.last;
    final markerCenter = Offset(lastPoint.dx - 18, lastPoint.dy);
    final markerRect = RRect.fromRectAndRadius(Rect.fromCenter(center: markerCenter, width: 34, height: 18), const Radius.circular(6));

    final markerPaint = Paint()..color = const Color(0xFF10B981);
    canvas.drawRRect(markerRect, markerPaint);

    final textSpan = TextSpan(
      text: '$currentRating',
      style: const TextStyle(color: Colors.black, fontSize: 9, fontWeight: FontWeight.bold),
    );
    final tp = TextPainter(text: textSpan, textDirection: TextDirection.ltr);
    tp.layout();
    tp.paint(canvas, Offset(markerCenter.dx - tp.width / 2, markerCenter.dy - tp.height / 2));
  }

  @override
  bool shouldRepaint(covariant _RatingChartPainter oldDelegate) => oldDelegate.currentRating != currentRating;
}
