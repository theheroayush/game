import 'package:flutter/material.dart';
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../openings/openings_screen.dart';
import '../endgames/endgames_screen.dart';

class LearnScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(String fen, String playerColor)? onPracticeVsAI;

  const LearnScreen({
    super.key,
    required this.settings,
    this.onPracticeVsAI,
  });

  @override
  State<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends State<LearnScreen> {
  int _activeSubTab = 0; // 0: Academy Hub, 1: Openings Explorer, 2: Endgame Drills

  @override
  Widget build(BuildContext context) {
    if (_activeSubTab == 1) {
      return Scaffold(
        backgroundColor: const Color(0xFF090D0E),
        appBar: AppBar(
          backgroundColor: const Color(0xFF141A1F),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => setState(() => _activeSubTab = 0),
          ),
          title: const Text('Opening Explorer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        ),
        body: OpeningsScreen(
          settings: widget.settings,
          onPracticeVsAI: widget.onPracticeVsAI,
        ),
      );
    }

    if (_activeSubTab == 2) {
      return Scaffold(
        backgroundColor: const Color(0xFF090D0E),
        appBar: AppBar(
          backgroundColor: const Color(0xFF141A1F),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => setState(() => _activeSubTab = 0),
          ),
          title: const Text('Endgame Drills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        ),
        body: EndgamesScreen(
          settings: widget.settings,
        ),
      );
    }

    // Default Academy Hub (Screenshots 2 & 3)
    return Scaffold(
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Tag
              Row(
                children: [
                  const Icon(Icons.menu_book, color: Color(0xFF10B981), size: 16),
                  const SizedBox(width: 6),
                  const Text(
                    'ACADEMY & OPENINGS',
                    style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.1),
                  ),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFF141A1F),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFF222F38)),
                    ),
                    child: const Text('15 Master Repertoires', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // Title
              const Text(
                'Explore. Understand.\nDominate the Opening.',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Explore openings with interactive trees, statistics, and master recommendations.',
                style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
              ),
              const SizedBox(height: 18),

              // Featured Hero Card: Sicilian Defense Najdorf
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF141A1F), Color(0xFF0E1418)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withAlpha(30),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'MOST POPULAR',
                            style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const Text('B90', style: TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Text('Sicilian Defense', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                    const Text('Najdorf Variation • 1. e4 c5 2. Nf3 d6', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                    const SizedBox(height: 14),

                    // Stats row
                    Row(
                      children: [
                        _buildHeroStat('📊 42%', 'Popularity'),
                        const SizedBox(width: 14),
                        _buildHeroStat('⭐ 52%', 'Win Rate'),
                        const SizedBox(width: 14),
                        _buildHeroStat('👥 Carlsen, Kasparov', 'Top Masters'),
                      ],
                    ),
                    const SizedBox(height: 14),

                    SizedBox(
                      width: double.infinity,
                      height: 42,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        icon: const Icon(Icons.explore_outlined, size: 18),
                        label: const Text('Explore Now', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                        onPressed: () {
                          HapticsService.light();
                          setState(() => _activeSubTab = 1);
                        },
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),

              // "WHAT YOU'LL GET" Section
              const Text(
                'WHAT YOU\'LL GET',
                style: TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8),
              ),
              const SizedBox(height: 10),
              _buildFeatureTile(
                title: 'Interactive Opening Trees',
                subtitle: 'Visualize moves, transpositions, and key theoretical ideas.',
                icon: Icons.account_tree,
                color: const Color(0xFF10B981),
                onTap: () => setState(() => _activeSubTab = 1),
              ),
              const SizedBox(height: 8),
              _buildFeatureTile(
                title: 'Endgame Conversion Drills',
                subtitle: 'Practice Lucena, Philidor, and opposition against active AI defense.',
                icon: Icons.shield,
                color: const Color(0xFF38BDF8),
                onTap: () => setState(() => _activeSubTab = 2),
              ),
              const SizedBox(height: 8),
              _buildFeatureTile(
                title: 'Master Recommendations',
                subtitle: 'Learn from modern grandmaster games and pure engine evaluations.',
                icon: Icons.lightbulb,
                color: const Color(0xFFF59E0B),
                onTap: () => setState(() => _activeSubTab = 1),
              ),
              const SizedBox(height: 8),
              _buildFeatureTile(
                title: 'Save & Practice vs AI',
                subtitle: 'Load theoretical positions directly onto the live board vs bots.',
                icon: Icons.bookmark,
                color: const Color(0xFFA855F7),
                onTap: () => setState(() => _activeSubTab = 1),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeroStat(String title, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
        Text(subtitle, style: const TextStyle(color: Color(0xFF64748B), fontSize: 10)),
      ],
    );
  }

  Widget _buildFeatureTile({
    required String title,
    required String subtitle,
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
              decoration: BoxDecoration(color: color.withAlpha(30), shape: BoxShape.circle),
              child: Icon(icon, color: color, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 18),
          ],
        ),
      ),
    );
  }
}
