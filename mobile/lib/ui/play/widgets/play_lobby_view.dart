import 'package:flutter/material.dart';
import '../../../models/chess_models.dart';
import '../../../models/engine_config.dart';
import '../../../services/haptics_service.dart';
import '../../../services/sound_service.dart';
import '../../theme/app_theme.dart';

/// PlayLobbyView brings 100% parity with Web UI PlayLobby.tsx:
/// - Hero Header & feature badges
/// - Quote showcase card
/// - Quick Play banner
/// - Opponent Elo slider (600 to 2500+)
/// - Play Style selection cards
/// - Time Control chips
/// - Side selection (White, Random, Black)
/// - Gradient Start CTA
class PlayLobbyView extends StatefulWidget {
  final int initialDifficulty;
  final AIPersonalityId initialPersonality;
  final PlayerColor initialColor;
  final TimeControlConfig initialTimeControl;
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

  final List<Map<String, dynamic>> _playStyles = [
    {'id': AIPersonalityId.balanced, 'title': 'Balanced', 'sub': 'Solid & reliable', 'icon': '⚖️'},
    {'id': AIPersonalityId.aggressive, 'title': 'Aggressive', 'sub': 'Attack focused', 'icon': '⚔️'},
    {'id': AIPersonalityId.positional, 'title': 'Positional', 'sub': 'Strategic', 'icon': '🏰'},
    {'id': AIPersonalityId.tactical, 'title': 'Tactical', 'sub': 'Sharp & tricky', 'icon': '✨'},
  ];

  final List<String> _eloTicks = ['600', '800', '1000', '1200', '1500', '1800', '2000', '2500+'];

  @override
  void initState() {
    super.initState();
    _difficultyLevel = widget.initialDifficulty;
    _personality = widget.initialPersonality;
    _playerColor = widget.initialColor;
    _timeControl = widget.initialTimeControl;
  }

  void _handleStart() {
    SoundService.playMove();
    HapticsService.medium();

    PlayerColor finalColor = _playerColor;
    if (_isRandomColor) {
      finalColor = (DateTime.now().millisecond % 2 == 0) ? PlayerColor.white : PlayerColor.black;
    }

    widget.onStartMatch(
      difficultyLevel: _difficultyLevel,
      personality: _personality,
      playerColor: finalColor,
      timeControl: _timeControl,
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentDiff = DIFFICULTY_LEVELS.firstWhere(
      (d) => d.level == _difficultyLevel,
      orElse: () => DIFFICULTY_LEVELS[2],
    );
    final currentPers = AI_PERSONALITIES.firstWhere(
      (p) => p.id == _personality,
      orElse: () => AI_PERSONALITIES[0],
    );

    return SingleChildScrollView(
      physics: const ClampingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Header Title & Subtitle matching web
          Row(
            children: [
              const Text(
                'Play Chess vs ',
                style: TextStyle(
                  color: AppColors.textPrimary,
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.5,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.accentBlueMuted,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppColors.accentBlue.withAlpha(120)),
                ),
                child: const Text(
                  'AI',
                  style: TextStyle(
                    color: AppColors.accentBlue,
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'Choose your opponent and start playing.',
            style: TextStyle(
              color: AppColors.textSecondary,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 8),

          // Subtitle pill
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0x301E3A8A),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0x603B82F6)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.auto_awesome, color: AppColors.accentBlue, size: 13),
                SizedBox(width: 5),
                Flexible(
                  child: Text(
                    'Human-calibrated Elo levels · Unique AI personalities',
                    style: TextStyle(
                      color: Color(0xFF93C5FD),
                      fontSize: 10.5,
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // 2. Luxury Quote Card
          Container(
            padding: const EdgeInsets.all(12),
            decoration: AppDecorations.card(
              backgroundColor: AppColors.card,
              borderColor: AppColors.border,
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.accentBlue.withAlpha(30),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.format_quote_rounded, color: AppColors.accentBlue, size: 18),
                ),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    '“Chess is the gymnasium of the mind.” — Blaise Pascal',
                    style: TextStyle(
                      color: Color(0xFFE2E8F0),
                      fontSize: 12,
                      fontStyle: FontStyle.italic,
                      height: 1.3,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // 3. 4 Feature Badges Grid (2x2)
          Row(
            children: [
              Expanded(
                child: _buildMiniFeatureBadge(
                  icon: Icons.bolt_rounded,
                  title: 'Adaptive AI',
                  subtitle: 'Adjusts to level',
                  accentColor: AppColors.amber,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildMiniFeatureBadge(
                  icon: Icons.trending_up_rounded,
                  title: 'Track Progress',
                  subtitle: 'Deep insights',
                  accentColor: AppColors.purple,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: _buildMiniFeatureBadge(
                  icon: Icons.verified_user_outlined,
                  title: 'Fair Play',
                  subtitle: 'No unfair tricks',
                  accentColor: AppColors.green,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildMiniFeatureBadge(
                  icon: Icons.emoji_events_outlined,
                  title: 'Climb Rankings',
                  subtitle: 'Elo progression',
                  accentColor: AppColors.gold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),

          // 4. Quick Play Banner Card
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: AppDecorations.card(
              backgroundColor: AppColors.card,
              borderColor: AppColors.border,
            ),
            child: Row(
              children: [
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: AppColors.accentBlue.withAlpha(40),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.accentBlue.withAlpha(80)),
                  ),
                  child: const Icon(Icons.flash_on_rounded, color: AppColors.accentBlue, size: 20),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Quick Play',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${currentDiff.elo} Elo · ${_timeControl.label} · ${_isRandomColor ? "Random" : (_playerColor == PlayerColor.white ? "White" : "Black")}',
                        style: const TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 11,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.accentBlue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    elevation: 4,
                  ),
                  onPressed: _handleStart,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('Play Now', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      Icon(Icons.chevron_right_rounded, size: 16),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 5. Interactive Setup Deck
          Container(
            padding: const EdgeInsets.all(16),
            decoration: AppDecorations.card(
              backgroundColor: AppColors.surface,
              borderColor: AppColors.border,
              borderRadius: 20,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // SECTION 1: OPPONENT
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.person_outline_rounded, color: AppColors.amber, size: 14),
                        SizedBox(width: 5),
                        Text(
                          'OPPONENT',
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.0,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      currentDiff.name.split(' ').first,
                      style: const TextStyle(
                        color: AppColors.accentBlue,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    Text(
                      '${currentDiff.elo} Elo',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        fontFamily: 'monospace',
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '(${currentDiff.description})',
                        style: const TextStyle(color: AppColors.textSecondary, fontSize: 10),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),

                // Elo Slider
                SliderTheme(
                  data: SliderTheme.of(context).copyWith(
                    activeTrackColor: AppColors.accentBlue,
                    inactiveTrackColor: AppColors.dark,
                    thumbColor: Colors.white,
                    overlayColor: AppColors.accentBlue.withAlpha(50),
                    trackHeight: 6,
                  ),
                  child: Slider(
                    value: _difficultyLevel.toDouble(),
                    min: 1,
                    max: 10,
                    divisions: 9,
                    onChanged: (val) {
                      setState(() => _difficultyLevel = val.round());
                      HapticsService.light();
                    },
                  ),
                ),
                // Elo Ticks
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: _eloTicks.map((t) {
                      return Text(
                        t,
                        style: const TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 9,
                          fontFamily: 'monospace',
                          fontWeight: FontWeight.w600,
                        ),
                      );
                    }).toList(),
                  ),
                ),
                const SizedBox(height: 16),
                const Divider(color: AppColors.border, height: 1),
                const SizedBox(height: 14),

                // SECTION 2: PLAY STYLE
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.star_outline_rounded, color: AppColors.accentBlue, size: 14),
                        SizedBox(width: 5),
                        Text(
                          'PLAY STYLE',
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.0,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      currentPers.name,
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                GridView.count(
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 2.3,
                  children: _playStyles.map((st) {
                    final isSel = _personality == st['id'];
                    return InkWell(
                      onTap: () {
                        setState(() => _personality = st['id']);
                        HapticsService.light();
                      },
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0x301E3A8A) : AppColors.card,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: isSel ? AppColors.accentBlue : AppColors.border,
                            width: isSel ? 1.5 : 1.0,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Row(
                              children: [
                                Text(st['icon'] as String, style: const TextStyle(fontSize: 12)),
                                const SizedBox(width: 4),
                                Text(
                                  st['title'] as String,
                                  style: TextStyle(
                                    color: isSel ? AppColors.accentBlue : Colors.white,
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              st['sub'] as String,
                              style: const TextStyle(color: AppColors.textSecondary, fontSize: 9.5),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),
                const Divider(color: AppColors.border, height: 1),
                const SizedBox(height: 14),

                // SECTION 3: TIME CONTROL
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.schedule_rounded, color: AppColors.green, size: 14),
                        SizedBox(width: 5),
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
                    InkWell(
                      onTap: () {
                        setState(() => _timeControl = TIME_CONTROLS.last);
                        HapticsService.light();
                      },
                      child: Text(
                        _timeControl.category == 'none' ? '✓ No Clock' : 'No Clock',
                        style: TextStyle(
                          color: _timeControl.category == 'none' ? AppColors.accentBlue : AppColors.textSecondary,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: TIME_CONTROLS.sublist(0, 5).map((tc) {
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
                        width: (MediaQuery.of(context).size.width - 70) / 3,
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
                ),
                const SizedBox(height: 16),
                const Divider(color: AppColors.border, height: 1),
                const SizedBox(height: 14),

                // SECTION 4: YOUR COLOR
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.sports_kabaddi_rounded, color: Color(0xFFF472B6), size: 14),
                        SizedBox(width: 5),
                        Text(
                          'YOUR COLOR',
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.0,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      _isRandomColor
                          ? 'Random'
                          : (_playerColor == PlayerColor.white ? 'White' : 'Black'),
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    // White
                    Expanded(
                      child: _buildColorSelectionButton(
                        label: 'White',
                        isSelected: !_isRandomColor && _playerColor == PlayerColor.white,
                        avatar: Container(
                          width: 14,
                          height: 14,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF94A3B8), width: 1.5),
                          ),
                        ),
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
                      child: _buildColorSelectionButton(
                        label: 'Random',
                        isSelected: _isRandomColor,
                        avatar: const Icon(Icons.shuffle_rounded, color: AppColors.accentBlue, size: 16),
                        onTap: () {
                          setState(() => _isRandomColor = true);
                          HapticsService.light();
                        },
                      ),
                    ),
                    const SizedBox(width: 8),

                    // Black
                    Expanded(
                      child: _buildColorSelectionButton(
                        label: 'Black',
                        isSelected: !_isRandomColor && _playerColor == PlayerColor.black,
                        avatar: Container(
                          width: 14,
                          height: 14,
                          decoration: BoxDecoration(
                            color: const Color(0xFF18181B),
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF52525B), width: 1.5),
                          ),
                        ),
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
                const SizedBox(height: 20),

                // SECTION 5: Full Width Gradient "Play Now" Button
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
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.sports_esports_rounded, color: Colors.white, size: 20),
                          SizedBox(width: 10),
                          Text(
                            'Play Now — Start your game',
                            style: TextStyle(
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
              ],
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildMiniFeatureBadge({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color accentColor,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border, width: 1.0),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: accentColor.withAlpha(30),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: accentColor, size: 16),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.bold,
                    fontSize: 11,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  subtitle,
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 9,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildColorSelectionButton({
    required String label,
    required bool isSelected,
    required Widget avatar,
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
            width: isSelected ? 1.5 : 1.0,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            avatar,
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
    );
  }
}
