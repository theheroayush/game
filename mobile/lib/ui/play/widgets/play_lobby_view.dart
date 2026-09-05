import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../../models/chess_models.dart';
import '../../../models/engine_config.dart';
import '../../../services/haptics_service.dart';
import '../../../services/sound_service.dart';
import '../../../services/storage_service.dart';
import '../../theme/app_theme.dart';
import '../../board/chess_board_widget.dart';

/// Apex Play Hub & Match Setup Hub.
/// Allows customizing personalized chessboard and piece designs with a live preview,
/// picking AI opponent bots by skill tier, selecting side and time controls,
/// and launching matches or exploring training modes with zero friction.
class PlayLobbyView extends StatefulWidget {
  final int initialDifficulty;
  final AIPersonalityId initialPersonality;
  final PlayerColor initialColor;
  final TimeControlConfig initialTimeControl;
  final bool hasActiveMatch;
  final VoidCallback? onResumeMatch;
  final BoardThemeId currentBoardTheme;
  final PieceThemeId currentPieceTheme;
  final bool showCoordinates;
  final Function(BoardThemeId) onBoardThemeChanged;
  final Function(PieceThemeId) onPieceThemeChanged;
  final Function(bool) onCoordinatesChanged;
  final Function(int tabIndex)? onNavigateTab;
  final Function({
    required int difficultyLevel,
    required AIPersonalityId personality,
    required PlayerColor playerColor,
    required TimeControlConfig timeControl,
    bool isPassAndPlay,
  }) onStartMatch;

  const PlayLobbyView({
    super.key,
    required this.initialDifficulty,
    required this.initialPersonality,
    required this.initialColor,
    required this.initialTimeControl,
    this.hasActiveMatch = false,
    this.onResumeMatch,
    required this.currentBoardTheme,
    required this.currentPieceTheme,
    required this.showCoordinates,
    required this.onBoardThemeChanged,
    required this.onPieceThemeChanged,
    required this.onCoordinatesChanged,
    this.onNavigateTab,
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
  bool _isPassAndPlay = false;

  late chess.Chess _previewGame;
  late UserStats _userStats;

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
    // Italian Game classic preview position
    _previewGame = chess.Chess.fromFEN('r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3');
    _userStats = StorageService.loadStats();
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
      isPassAndPlay: _isPassAndPlay,
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
          // 1. Hero Brand Header
          _buildBrandHeroHeader(),
          const SizedBox(height: 12),

          // 2. Active Match In Progress Banner (if applicable)
          if (widget.hasActiveMatch && widget.onResumeMatch != null) ...[
            _buildResumeMatchBanner(),
            const SizedBox(height: 14),
          ],

          // 3. Personalized Chessboard Customizer Card (Front & Center!)
          _buildBoardPersonalizationCard(),
          const SizedBox(height: 16),

          // 4. Game Mode Selector (vs Computer / Pass & Play)
          _buildGameModeSwitcher(),
          const SizedBox(height: 16),

          // 5. Opponent Bot Selection (When vs Computer)
          if (!_isPassAndPlay) ...[
            _buildBotSelectionSection(filteredBots, currentBot),
            const SizedBox(height: 16),
          ],

          // 6. Time Control Section
          _buildTimeControlSection(),
          const SizedBox(height: 16),

          // 7. Side Selection (White / Random / Black)
          _buildSideSelectionSection(),
          const SizedBox(height: 20),

          // 8. Primary Start Match Action CTA
          _buildStartActionButton(currentBot),
          const SizedBox(height: 24),

          // 9. Quick Training & Exploration Action Grid
          _buildQuickTrainingGrid(),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildBrandHeroHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          // 3D Knight App Icon Avatar
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border, width: 1.5),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x30000000),
                  blurRadius: 8,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10.5),
              child: Image.asset(
                'assets/icon/app_icon.png',
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Container(
                  color: AppColors.card,
                  child: const Center(
                    child: Text('♞', style: TextStyle(fontSize: 24, color: AppColors.gold)),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: Row(
                    children: [
                      const Text(
                        'Apex Chess',
                        style: TextStyle(
                          color: AppColors.textPrimary,
                          fontSize: 17,
                          fontWeight: FontWeight.w900,
                          letterSpacing: -0.4,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                        decoration: BoxDecoration(
                          color: AppColors.green.withAlpha(30),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: AppColors.green.withAlpha(80)),
                        ),
                        child: const Text(
                          'v2.1 GM',
                          style: TextStyle(
                            color: AppColors.green,
                            fontSize: 9.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 2),
                const Text(
                  'Grandmaster AI & Training Engine',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 10.5,
                  ),
                ),
              ],
            ),
          ),
          // User Rating Chip
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.card,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.military_tech_rounded, color: AppColors.gold, size: 14),
                    const SizedBox(width: 4),
                    Text(
                      '${_userStats.rating}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w900,
                        fontSize: 13,
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ),
                Text(
                  _userStats.winStreak > 0 ? '🔥 ${_userStats.winStreak} Streak' : '${_userStats.wins}W / ${_userStats.losses}L',
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 9.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResumeMatchBanner() {
    return Container(
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
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            onPressed: widget.onResumeMatch,
            child: const Text('Resume', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          ),
        ],
      ),
    );
  }

  Widget _buildBoardPersonalizationCard() {
    final curTheme = BOARD_THEMES[widget.currentBoardTheme] ?? BOARD_THEMES[BoardThemeId.emerald]!;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header: "PERSONALIZED CHESSBOARD"
          Row(
            children: [
              const Icon(Icons.palette_rounded, color: AppColors.gold, size: 16),
              const SizedBox(width: 8),
              const Expanded(
                child: Text(
                  'PERSONALIZED CHESSBOARD',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.8,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              // Coordinates Toggle
              InkWell(
                onTap: () {
                  widget.onCoordinatesChanged(!widget.showCoordinates);
                  HapticsService.light();
                },
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: widget.showCoordinates ? AppColors.accentBlue.withAlpha(30) : AppColors.card,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: widget.showCoordinates ? AppColors.accentBlue : AppColors.border,
                    ),
                  ),
                  child: Text(
                    widget.showCoordinates ? 'Coords ON' : 'Coords OFF',
                    style: TextStyle(
                      color: widget.showCoordinates ? AppColors.accentBlue : AppColors.textSecondary,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Live Mini-Board Preview & Current Theme Summary
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Interactive Mini-Board Preview (110x110)
              Container(
                width: 110,
                height: 110,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppColors.border, width: 1.5),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x30000000),
                      blurRadius: 8,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8.5),
                  child: ChessBoardWidget(
                    game: _previewGame,
                    boardTheme: widget.currentBoardTheme,
                    pieceTheme: widget.currentPieceTheme,
                    interactive: false,
                    showCoordinates: false,
                  ),
                ),
              ),
              const SizedBox(width: 12),

              // Theme Summary Details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 14,
                          height: 14,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: LinearGradient(
                              colors: [Color(curTheme.lightSquare), Color(curTheme.darkSquare)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            border: Border.all(color: Colors.white30, width: 1),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            curTheme.name,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Piece Style: ${_formatPieceThemeName(widget.currentPieceTheme)}',
                      style: const TextStyle(
                        color: AppColors.accentBlue,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Tap themes below to customize board & piece styles in real-time.',
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 10.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),

          // Board Themes Horizontal Swatch Carousel
          const Text(
            'BOARD COLOR THEME',
            style: TextStyle(
              color: AppColors.textSecondary,
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 6),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: BOARD_THEMES.values.map((th) {
                final isSel = th.id == widget.currentBoardTheme;
                return Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: InkWell(
                    onTap: () {
                      widget.onBoardThemeChanged(th.id);
                      HapticsService.light();
                    },
                    borderRadius: BorderRadius.circular(10),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
                      decoration: BoxDecoration(
                        color: isSel ? AppColors.accentBlue.withAlpha(35) : AppColors.card,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: isSel ? AppColors.accentBlue : AppColors.border,
                          width: isSel ? 1.8 : 1.0,
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 14,
                            height: 14,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: LinearGradient(
                                colors: [Color(th.lightSquare), Color(th.darkSquare)],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ),
                              border: Border.all(color: Colors.white24, width: 0.8),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            th.name,
                            style: TextStyle(
                              color: isSel ? Colors.white : AppColors.textPrimary,
                              fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                              fontSize: 11,
                            ),
                          ),
                          if (isSel) ...[
                            const SizedBox(width: 4),
                            const Icon(Icons.check_circle_rounded, color: AppColors.accentBlue, size: 12),
                          ],
                        ],
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 10),

          // Piece Style Choice Chips
          const Text(
            'PIECE DESIGN STYLE',
            style: TextStyle(
              color: AppColors.textSecondary,
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 6),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: PieceThemeId.values.map((p) {
                final isSel = p == widget.currentPieceTheme;
                return Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: ChoiceChip(
                    label: Text(_formatPieceThemeName(p)),
                    selected: isSel,
                    selectedColor: AppColors.accentBlue,
                    backgroundColor: AppColors.card,
                    labelStyle: TextStyle(
                      color: isSel ? Colors.white : AppColors.textSecondary,
                      fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      fontSize: 11,
                    ),
                    onSelected: (selected) {
                      if (selected) {
                        widget.onPieceThemeChanged(p);
                        HapticsService.light();
                      }
                    },
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGameModeSwitcher() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          // Play vs Computer
          Expanded(
            child: InkWell(
              onTap: () {
                setState(() => _isPassAndPlay = false);
                HapticsService.light();
              },
              borderRadius: BorderRadius.circular(11),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 9),
                decoration: BoxDecoration(
                  color: !_isPassAndPlay ? AppColors.accentBlue : Colors.transparent,
                  borderRadius: BorderRadius.circular(11),
                ),
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.smart_toy_rounded,
                        color: !_isPassAndPlay ? Colors.white : AppColors.textSecondary,
                        size: 16,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Play vs Computer',
                        style: TextStyle(
                          color: !_isPassAndPlay ? Colors.white : AppColors.textSecondary,
                          fontWeight: FontWeight.bold,
                          fontSize: 12.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          // Pass & Play (Local)
          Expanded(
            child: InkWell(
              onTap: () {
                setState(() => _isPassAndPlay = true);
                HapticsService.light();
              },
              borderRadius: BorderRadius.circular(11),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 9, horizontal: 4),
                decoration: BoxDecoration(
                  color: _isPassAndPlay ? AppColors.accentBlue : Colors.transparent,
                  borderRadius: BorderRadius.circular(11),
                ),
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.people_rounded,
                        color: _isPassAndPlay ? Colors.white : AppColors.textSecondary,
                        size: 16,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Pass & Play (Local)',
                        style: TextStyle(
                          color: _isPassAndPlay ? Colors.white : AppColors.textSecondary,
                          fontWeight: FontWeight.bold,
                          fontSize: 12.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBotSelectionSection(List<Map<String, dynamic>> filteredBots, Map<String, dynamic> currentBot) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Bot Tier Filter Tabs
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
        const SizedBox(height: 10),

        // 2-Column Bot Grid
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
        const SizedBox(height: 10),

        // Selected Opponent Bio Strip
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
      ],
    );
  }

  Widget _buildTimeControlSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
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
      ],
    );
  }

  Widget _buildSideSelectionSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
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
      ],
    );
  }

  Widget _buildStartActionButton(Map<String, dynamic> currentBot) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF2563EB), Color(0xFF10B981)],
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF2563EB).withAlpha(90),
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
                Icon(
                  _isPassAndPlay ? Icons.people_rounded : Icons.sports_esports_rounded,
                  color: Colors.white,
                  size: 22,
                ),
                const SizedBox(width: 8),
                Text(
                  _isPassAndPlay
                      ? 'Start Pass & Play Match'
                      : 'Start Match vs ${currentBot['name']} (${currentBot['elo']})',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 15,
                    letterSpacing: 0.3,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildQuickTrainingGrid() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.explore_rounded, color: AppColors.accentBlue, size: 15),
            SizedBox(width: 6),
            Text(
              'TRAINING & EXPLORATION',
              style: TextStyle(
                color: AppColors.textSecondary,
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: _buildTrainingCard(
                icon: Icons.extension_rounded,
                iconColor: const Color(0xFFF59E0B),
                title: 'Tactics Puzzles',
                subtitle: 'Daily tactical drills',
                onTap: () => widget.onNavigateTab?.call(2),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _buildTrainingCard(
                icon: Icons.menu_book_rounded,
                iconColor: const Color(0xFF10B981),
                title: 'Openings',
                subtitle: '15 Master lines',
                onTap: () => widget.onNavigateTab?.call(4),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: _buildTrainingCard(
                icon: Icons.military_tech_rounded,
                iconColor: const Color(0xFF6366F1),
                title: 'Endgames',
                subtitle: 'Technique studies',
                onTap: () => widget.onNavigateTab?.call(3),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _buildTrainingCard(
                icon: Icons.analytics_rounded,
                iconColor: const Color(0xFFEC4899),
                title: 'Game Review',
                subtitle: 'Coach analysis',
                onTap: () => widget.onNavigateTab?.call(1),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTrainingCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: () {
        HapticsService.light();
        onTap();
      },
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                color: iconColor.withAlpha(30),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: iconColor, size: 16),
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
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 9.5,
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

  String _formatPieceThemeName(PieceThemeId theme) {
    switch (theme) {
      case PieceThemeId.staunton:
        return 'Staunton (Vector)';
      case PieceThemeId.neo:
        return 'Neo Modern';
      case PieceThemeId.woodcraft:
        return 'Woodcraft';
      case PieceThemeId.alpha:
        return 'Alpha Classic';
      case PieceThemeId.minimal:
        return 'Minimalist';
    }
  }
}
