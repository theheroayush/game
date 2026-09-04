import 'package:flutter/material.dart';
import '../../../models/chess_models.dart';
import '../../../models/engine_config.dart';
import '../../../services/haptics_service.dart';
import '../../../services/sound_service.dart';
import '../../theme/app_theme.dart';

/// Clean, intuitive Chess.com-style Bot Selection & Match Setup Hub.
/// Allows picking an AI opponent by skill tier, selecting time control and side,
/// and starting a fresh match with zero friction or confusion.
class PlayLobbyView extends StatefulWidget {
  final int initialDifficulty;
  final AIPersonalityId initialPersonality;
  final PlayerColor initialColor;
  final TimeControlConfig initialTimeControl;
  final bool hasActiveMatch;
  final VoidCallback? onResumeMatch;
  final Function({
    required int difficultyLevel,
    required AIPersonalityId personality,
    required PlayerColor playerColor,
    required TimeControlConfig timeControl,
  }) onStartMatch;

  const PlayLobbyView({
    super.key,
    required this.initialDifficulty,
    required this.initialPersonality,
    required this.initialColor,
    required this.initialTimeControl,
    this.hasActiveMatch = false,
    this.onResumeMatch,
    required this.onStartMatch,
  });

  @override
  State<PlayLobbyView> createState() => _PlayLobbyViewState();
}

class _PlayLobbyViewState extends State<PlayLobbyView> {
  late int _difficultyLevel;
  late AIPersonalityId _personality;
  late PlayerColor _playerColor;
  bool _isRandomColor = false;
  late TimeControlConfig _timeControl;
  String _selectedTier = 'all'; // 'all' | 'beginner' | 'intermediate' | 'master'

  // Curated Bot Roster matching Chess.com style
  final List<Map<String, dynamic>> _bots = [
    {
      'level': 1,
      'name': 'Jimmy',
      'title': 'Novice Bot',
      'elo': 600,
      'avatar': '🤖',
      'personality': AIPersonalityId.balanced,
      'style': 'Casual',
      'tier': 'beginner',
      'desc': 'Overlooks hanging pieces, perfect for beginners learning basics.',
    },
    {
      'level': 2,
      'name': 'Martin',
      'title': 'Calm Novice',
      'elo': 800,
      'avatar': '🥋',
      'personality': AIPersonalityId.balanced,
      'style': 'Beginner',
      'tier': 'beginner',
      'desc': 'Knows rules and simple checks, struggles with multi-step tactics.',
    },
    {
      'level': 3,
      'name': 'Elena',
      'title': 'Sharp Casual',
      'elo': 1000,
      'avatar': '🎯',
      'personality': AIPersonalityId.tactical,
      'style': 'Tactical',
      'tier': 'beginner',
      'desc': 'Likes early attacks and pins, occasional tactical slips in endgames.',
    },
    {
      'level': 4,
      'name': 'Nelson',
      'title': 'Club Novice',
      'elo': 1200,
      'avatar': '⚔️',
      'personality': AIPersonalityId.aggressive,
      'style': 'Aggressive',
      'tier': 'intermediate',
      'desc': 'Aggressive queen attacker. Punishes passive openings quickly.',
    },
    {
      'level': 5,
      'name': 'Antonio',
      'title': 'Harmonic Intermediate',
      'elo': 1400,
      'avatar': '⚖️',
      'personality': AIPersonalityId.balanced,
      'style': 'Balanced',
      'tier': 'intermediate',
      'desc': 'Solid central control, patient development, balanced play.',
    },
    {
      'level': 6,
      'name': 'Sofia',
      'title': 'The Architect',
      'elo': 1600,
      'avatar': '🏰',
      'personality': AIPersonalityId.positional,
      'style': 'Positional',
      'tier': 'intermediate',
      'desc': 'Locks pawn structures, targets outpost squares, strategic mastery.',
    },
    {
      'level': 7,
      'name': 'Laura',
      'title': 'Tactical Magician',
      'elo': 1800,
      'avatar': '✨',
      'personality': AIPersonalityId.tactical,
      'style': 'Tricky',
      'tier': 'master',
      'desc': 'Constantly sets tactical traps, forks, and deflection tactics.',
    },
    {
      'level': 8,
      'name': 'Viktor',
      'title': 'Club Master',
      'elo': 2000,
      'avatar': '🦁',
      'personality': AIPersonalityId.aggressive,
      'style': 'Grandmaster',
      'tier': 'master',
      'desc': 'Fierce calculation and strong endgame conversion.',
    },
    {
      'level': 10,
      'name': 'Magnus AI',
      'title': 'Apex Engine',
      'elo': 2500,
      'avatar': '👑',
      'personality': AIPersonalityId.balanced,
      'style': 'World Champion',
      'tier': 'master',
      'desc': 'Deep iterative minimax search with quiescence horizon calculation.',
    },
  ];

  @override
  void initState() {
    super.initState();
    _difficultyLevel = widget.initialDifficulty;
    _personality = widget.initialPersonality;
    _playerColor = widget.initialColor;
    _timeControl = widget.initialTimeControl;
  }

  void _handleStart() {
    final finalColor = _isRandomColor
        ? (DateTime.now().millisecond % 2 == 0 ? PlayerColor.white : PlayerColor.black)
        : _playerColor;

    SoundService.playStart();
    HapticsService.medium();

    widget.onStartMatch(
      difficultyLevel: _difficultyLevel,
      personality: _personality,
      playerColor: finalColor,
      timeControl: _timeControl,
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentBot = _bots.firstWhere(
      (b) => b['level'] == _difficultyLevel,
      orElse: () => _bots[3], // Nelson (1200) default
    );

    final filteredBots = _selectedTier == 'all'
        ? _bots
        : _bots.where((b) => b['tier'] == _selectedTier).toList();

    return SingleChildScrollView(
      physics: const ClampingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Header Title: "Play vs Computer"
          FittedBox(
            fit: BoxFit.scaleDown,
            alignment: Alignment.centerLeft,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.accentBlue.withAlpha(35),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.smart_toy_rounded, color: AppColors.accentBlue, size: 20),
                ),
                const SizedBox(width: 10),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Play vs Computer',
                      style: TextStyle(
                        color: AppColors.textPrimary,
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -0.4,
                      ),
                    ),
                    Text(
                      'Select your opponent bot and time control',
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 11.5,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // 2. If active match in progress: Resume Banner
          if (widget.hasActiveMatch && widget.onResumeMatch != null) ...[
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: const Color(0x301E3A8A),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.accentBlue),
              ),
              child: Row(
                children: [
                  const Icon(Icons.play_circle_fill_rounded, color: AppColors.accentBlue, size: 28),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Match in Progress',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                        Text(
                          'You have an active game running on the board',
                          style: TextStyle(color: AppColors.textSecondary, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.accentBlue,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: widget.onResumeMatch,
                    child: const Text('Resume', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
          ],

          // 3. Bot Tier Filter Tabs
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _buildTierChip('all', 'All Bots (${_bots.length})'),
                const SizedBox(width: 6),
                _buildTierChip('beginner', 'Beginner (600–1000)'),
                const SizedBox(width: 6),
                _buildTierChip('intermediate', 'Intermediate (1200–1600)'),
                const SizedBox(width: 6),
                _buildTierChip('master', 'Master (1800–2500)'),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // 4. Bot Selection Cards (2-column responsive grid)
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 1.45,
            children: filteredBots.map((bot) {
              final isSel = _difficultyLevel == bot['level'];
              return InkWell(
                onTap: () {
                  setState(() {
                    _difficultyLevel = bot['level'] as int;
                    _personality = bot['personality'] as AIPersonalityId;
                  });
                  HapticsService.light();
                },
                borderRadius: BorderRadius.circular(14),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                  decoration: BoxDecoration(
                    color: isSel ? const Color(0x301E3A8A) : AppColors.card,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(
                      color: isSel ? AppColors.accentBlue : AppColors.border,
                      width: isSel ? 2.0 : 1.0,
                    ),
                    boxShadow: [
                      if (isSel)
                        BoxShadow(
                          color: AppColors.accentBlue.withAlpha(50),
                          blurRadius: 10,
                          offset: const Offset(0, 2),
                        ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        children: [
                          // Bot Avatar
                          Container(
                            width: 28,
                            height: 28,
                            decoration: BoxDecoration(
                              color: isSel ? AppColors.accentBlue.withAlpha(40) : AppColors.surface,
                              shape: BoxShape.circle,
                              border: Border.all(color: isSel ? AppColors.accentBlue : AppColors.border),
                            ),
                            child: Center(
                              child: Text(bot['avatar'] as String, style: const TextStyle(fontSize: 14)),
                            ),
                          ),
                          const SizedBox(width: 6),
                          // Name & Elo
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                FittedBox(
                                  fit: BoxFit.scaleDown,
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    bot['name'] as String,
                                    style: TextStyle(
                                      color: isSel ? Colors.white : AppColors.textPrimary,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12.5,
                                    ),
                                  ),
                                ),
                                Text(
                                  '${bot['elo']} Elo',
                                  style: TextStyle(
                                    color: isSel ? AppColors.accentBlue : AppColors.textSecondary,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                    fontFamily: 'monospace',
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      // Style badge
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Flexible(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                              decoration: BoxDecoration(
                                color: AppColors.surface,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                bot['style'] as String,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(color: AppColors.textSecondary, fontSize: 8.5, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                          if (isSel) ...[
                            const SizedBox(width: 4),
                            const Icon(Icons.check_circle_rounded, color: AppColors.accentBlue, size: 14),
                          ],
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 16),

          // 5. Selected Opponent Bio Strip
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              children: [
                const Icon(Icons.info_outline_rounded, color: AppColors.accentBlue, size: 16),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    '${currentBot['name']}: ${currentBot['desc']}',
                    style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),

          // 6. Time Control Section
          const Row(
            children: [
              Icon(Icons.schedule_rounded, color: AppColors.green, size: 15),
              SizedBox(width: 6),
              Text(
                'TIME CONTROL',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          LayoutBuilder(
            builder: (context, constraints) {
              final itemWidth = (constraints.maxWidth - 12) / 3;
              return Wrap(
                spacing: 6,
                runSpacing: 6,
                children: TIME_CONTROLS.map((tc) {
                  final isSel = _timeControl.id == tc.id;
                  final parts = tc.label.split(' ');
                  final timePart = parts.first;
                  final typePart = parts.length > 1 ? parts[1] : '';

                  return InkWell(
                    onTap: () {
                      setState(() => _timeControl = tc);
                      HapticsService.light();
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      width: itemWidth.clamp(60.0, double.infinity),
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                      decoration: BoxDecoration(
                        color: isSel ? const Color(0x301E3A8A) : AppColors.card,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSel ? AppColors.accentBlue : AppColors.border,
                          width: isSel ? 1.5 : 1.0,
                        ),
                      ),
                      child: Column(
                        children: [
                          Text(
                            timePart,
                            style: TextStyle(
                              color: isSel ? AppColors.accentBlue : Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 12,
                              fontFamily: 'monospace',
                            ),
                          ),
                          Text(
                            typePart,
                            style: const TextStyle(
                              color: AppColors.textSecondary,
                              fontSize: 9,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),
          const SizedBox(height: 18),

          // 7. Side Selection (Play as White / Random / Black)
          const Row(
            children: [
              Icon(Icons.sports_kabaddi_rounded, color: Color(0xFFF472B6), size: 15),
              SizedBox(width: 6),
              Text(
                'PLAY AS',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              // White
              Expanded(
                child: _buildSideSelectionButton(
                  label: 'White',
                  icon: '♔',
                  isSelected: !_isRandomColor && _playerColor == PlayerColor.white,
                  onTap: () {
                    setState(() {
                      _isRandomColor = false;
                      _playerColor = PlayerColor.white;
                    });
                    HapticsService.light();
                  },
                ),
              ),
              const SizedBox(width: 8),

              // Random
              Expanded(
                child: _buildSideSelectionButton(
                  label: 'Random',
                  icon: '☯',
                  isSelected: _isRandomColor,
                  onTap: () {
                    setState(() => _isRandomColor = true);
                    HapticsService.light();
                  },
                ),
              ),
              const SizedBox(width: 8),

              // Black
              Expanded(
                child: _buildSideSelectionButton(
                  label: 'Black',
                  icon: '♚',
                  isSelected: !_isRandomColor && _playerColor == PlayerColor.black,
                  onTap: () {
                    setState(() {
                      _isRandomColor = false;
                      _playerColor = PlayerColor.black;
                    });
                    HapticsService.light();
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: 22),

          // 8. Single High-Impact Start Match CTA Button
          SizedBox(
            width: double.infinity,
            height: 52,
            child: Container(
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF2563EB), Color(0xFF4F46E5)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF2563EB).withAlpha(100),
                    blurRadius: 14,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: _handleStart,
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.sports_esports_rounded, color: Colors.white, size: 22),
                      const SizedBox(width: 8),
                      Text(
                        'Start Match vs ${currentBot['name']} (${currentBot['elo']})',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          fontSize: 15,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildTierChip(String tierId, String label) {
    final isSel = _selectedTier == tierId;
    return InkWell(
      onTap: () {
        setState(() => _selectedTier = tierId);
        HapticsService.light();
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isSel ? AppColors.accentBlue : AppColors.card,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSel ? AppColors.accentBlue : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSel ? Colors.white : AppColors.textSecondary,
            fontSize: 11,
            fontWeight: isSel ? FontWeight.bold : FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Widget _buildSideSelectionButton({
    required String label,
    required String icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0x301E3A8A) : AppColors.card,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.accentBlue : AppColors.border,
            width: isSelected ? 2.0 : 1.0,
          ),
        ),
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(icon, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: 6),
              Text(
                label,
                style: TextStyle(
                  color: isSelected ? AppColors.accentBlue : Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
