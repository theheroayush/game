import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../data/openings_data.dart';
import '../board/chess_board_widget.dart';
import '../board/board_painter.dart';
import '../theme/app_theme.dart';

class OpeningsScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(String fen, String playerColor)? onPracticeVsAI;

  const OpeningsScreen({
    super.key,
    required this.settings,
    this.onPracticeVsAI,
  });

  @override
  State<OpeningsScreen> createState() => _OpeningsScreenState();
}

class _OpeningsScreenState extends State<OpeningsScreen> {
  int _selectedOpeningIndex = 0;
  int _currentMoveIndex = 0;
  chess.Chess _game = chess.Chess();
  List<BoardArrow> _arrows = [];

  @override
  void initState() {
    super.initState();
    _loadOpening(0);
  }

  void _loadOpening(int index) {
    setState(() {
      _selectedOpeningIndex = index;
      _currentMoveIndex = 0;
      _game = chess.Chess();
      _updateArrows();
    });
  }

  void _stepTo(int moveIndex) {
    final opening = OPENINGS_DATABASE[_selectedOpeningIndex];
    final target = moveIndex.clamp(0, opening.moves.length);

    final sim = chess.Chess();
    for (int i = 0; i < target; i++) {
      sim.move(opening.moves[i]);
    }

    setState(() {
      _currentMoveIndex = target;
      _game = sim;
      _updateArrows();
    });
  }

  void _updateArrows() {
    final opening = OPENINGS_DATABASE[_selectedOpeningIndex];
    final arrows = <BoardArrow>[];

    if (_currentMoveIndex < opening.moves.length) {
      final nextSan = opening.moves[_currentMoveIndex];
      final sim = chess.Chess.fromFEN(_game.fen);
      try {
        final success = sim.move(nextSan);
        if (success) {
          final lastState = sim.history.last;
          arrows.add(BoardArrow(
            from: lastState.move.fromAlgebraic,
            to: lastState.move.toAlgebraic,
            color: const Color(0xFF38BDF8),
          ));
        }
      } catch (_) {}
    }

    _arrows = arrows;
  }

  @override
  Widget build(BuildContext context) {
    final opening = OPENINGS_DATABASE[_selectedOpeningIndex];
    final isFlipped = opening.side == 'black';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.dark,
        title: const Text('📖 Opening Explorer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Opening selector carousel
            Container(
              height: 48,
              color: AppColors.surface,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                itemCount: OPENINGS_DATABASE.length,
                itemBuilder: (context, index) {
                  final op = OPENINGS_DATABASE[index];
                  final isSel = index == _selectedOpeningIndex;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text('${op.eco}: ${op.name.split(':').first}'),
                      selected: isSel,
                      selectedColor: AppColors.accentBlue,
                      backgroundColor: AppColors.card,
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : AppColors.textSecondary,
                        fontSize: 12,
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) _loadOpening(index);
                      },
                    ),
                  );
                },
              ),
            ),

            // Center Board
            Expanded(
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: ChessBoardWidget(
                    game: _game,
                    flipped: isFlipped,
                    boardTheme: widget.settings.boardTheme,
                    pieceTheme: widget.settings.pieceTheme,
                    interactive: false,
                    arrows: _arrows,
                  ),
                ),
              ),
            ),

            // Stepping navigation bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: const BoxDecoration(
                color: AppColors.dark,
                border: Border.symmetric(horizontal: BorderSide(color: AppColors.border, width: 1.0)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    visualDensity: VisualDensity.compact,
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    icon: const Icon(Icons.first_page_rounded, size: 22),
                    color: Colors.white,
                    onPressed: () => _stepTo(0),
                  ),
                  IconButton(
                    visualDensity: VisualDensity.compact,
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    icon: const Icon(Icons.chevron_left_rounded, size: 22),
                    color: Colors.white,
                    onPressed: () => _stepTo(_currentMoveIndex - 1),
                  ),
                  Flexible(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6),
                      child: Text(
                        'Move $_currentMoveIndex / ${opening.moves.length}',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  IconButton(
                    visualDensity: VisualDensity.compact,
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    icon: const Icon(Icons.chevron_right_rounded, size: 22),
                    color: Colors.white,
                    onPressed: () => _stepTo(_currentMoveIndex + 1),
                  ),
                  IconButton(
                    visualDensity: VisualDensity.compact,
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    icon: const Icon(Icons.last_page_rounded, size: 22),
                    color: Colors.white,
                    onPressed: () => _stepTo(opening.moves.length),
                  ),
                ],
              ),
            ),

            // Description and key strategic ideas
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
                          '${opening.eco} — ${opening.name}',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.greenMuted, borderRadius: BorderRadius.circular(4)),
                        child: Text(opening.difficulty, style: const TextStyle(color: Color(0xFF34D399), fontSize: 11)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(opening.description, style: const TextStyle(color: Color(0xFFE4E4E7), fontSize: 12)),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6,
                    runSpacing: 4,
                    children: opening.keyIdeas.map((idea) {
                      return Chip(
                        label: Text(idea, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                        backgroundColor: AppColors.card,
                        padding: EdgeInsets.zero,
                        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      );
                    }).toList(),
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
