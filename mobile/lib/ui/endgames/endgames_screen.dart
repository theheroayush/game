import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../data/endgames_data.dart';
import '../../engine/minimax_isolate.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import '../board/chess_board_widget.dart';
import '../theme/app_theme.dart';

class EndgamesScreen extends StatefulWidget {
  final AppSettings settings;

  const EndgamesScreen({super.key, required this.settings});

  @override
  State<EndgamesScreen> createState() => _EndgamesScreenState();
}

class _EndgamesScreenState extends State<EndgamesScreen> {
  int _selectedLessonIndex = 0;
  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom;
  String? _lastMoveTo;
  bool _isAIThinking = false;
  bool _isLessonComplete = false;

  @override
  void initState() {
    super.initState();
    _loadLesson(0);
  }

  void _loadLesson(int index) {
    final lesson = ENDGAME_LESSONS[index];
    _game = chess.Chess.fromFEN(lesson.fen);

    setState(() {
      _selectedLessonIndex = index;
      _lastMoveFrom = null;
      _lastMoveTo = null;
      _isAIThinking = false;
      _isLessonComplete = false;
    });
  }

  void _onPlayerMove(String from, String to, String? promotion) {
    _lastMoveFrom = from;
    _lastMoveTo = to;

    if (_game.in_checkmate || _game.in_draw) {
      setState(() => _isLessonComplete = true);
      SoundService.playVictory();
      HapticsService.vibrate();
      return;
    }

    _triggerAIDefense();
  }

  Future<void> _triggerAIDefense() async {
    setState(() => _isAIThinking = true);

    try {
      final req = AIMoveRequest(
        fen: _game.fen,
        level: 8, // Master level endgame defense
        personality: AIPersonalityId.positional,
      );

      final res = await EngineService.getBestMove(req);

      final success = _game.move({
        'from': res.from,
        'to': res.to,
        if (res.promotion != null) 'promotion': res.promotion,
      });

      if (success) {
        _lastMoveFrom = res.from;
        _lastMoveTo = res.to;

        if (_game.in_check) {
          SoundService.playCheck();
          HapticsService.heavy();
        } else {
          SoundService.playMove();
          HapticsService.light();
        }

        if (_game.in_checkmate || _game.in_draw) {
          _isLessonComplete = true;
          SoundService.playVictory();
          HapticsService.vibrate();
        }
      }
    } catch (_) {}

    if (mounted) {
      setState(() => _isAIThinking = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final lesson = ENDGAME_LESSONS[_selectedLessonIndex];
    final isFlipped = lesson.playerColor == 'b';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.dark,
        title: const Text('📚 Endgame Drills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Reset Drill',
            onPressed: () => _loadLesson(_selectedLessonIndex),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Lesson selector horizontal carousel
            Container(
              height: 48,
              color: AppColors.surface,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                itemCount: ENDGAME_LESSONS.length,
                itemBuilder: (context, index) {
                  final l = ENDGAME_LESSONS[index];
                  final isSel = index == _selectedLessonIndex;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(l.title.split('(').first.trim()),
                      selected: isSel,
                      selectedColor: AppColors.emerald,
                      backgroundColor: AppColors.card,
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : AppColors.textSecondary,
                        fontSize: 12,
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) _loadLesson(index);
                      },
                    ),
                  );
                },
              ),
            ),

            // Board
            Expanded(
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      ChessBoardWidget(
                        game: _game,
                        flipped: isFlipped,
                        boardTheme: widget.settings.boardTheme,
                        pieceTheme: widget.settings.pieceTheme,
                        interactive: !_isAIThinking && !_isLessonComplete,
                        lastMoveFrom: _lastMoveFrom,
                        lastMoveTo: _lastMoveTo,
                        onMove: _onPlayerMove,
                      ),
                      if (_isAIThinking)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.black.withAlpha(200),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: const Text('AI Defending...', style: TextStyle(color: Colors.white, fontSize: 12)),
                        ),
                    ],
                  ),
                ),
              ),
            ),

            // Lesson instructions & principles card
            Container(
              margin: const EdgeInsets.all(12),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          lesson.title,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.accentBlueMuted, borderRadius: BorderRadius.circular(4)),
                        child: const Text('Endgame', style: TextStyle(color: Color(0xFF60A5FA), fontSize: 11)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(lesson.objective, style: const TextStyle(color: Color(0xFFE4E4E7), fontSize: 12)),
                  const SizedBox(height: 6),
                  Text(
                    '💡 Tip: ${lesson.grandmasterTip}',
                    style: const TextStyle(color: AppColors.amber, fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
