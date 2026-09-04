import 'dart:async';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../data/puzzles_data.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../board/chess_board_widget.dart';

enum PuzzleMode { practice, rush3, rush5, survival }

class PuzzlesScreen extends StatefulWidget {
  final AppSettings settings;

  const PuzzlesScreen({super.key, required this.settings});

  @override
  State<PuzzlesScreen> createState() => _PuzzlesScreenState();
}

class _PuzzlesScreenState extends State<PuzzlesScreen> {
  PuzzleMode _mode = PuzzleMode.practice;
  int _currentPuzzleIndex = 0;
  int _moveStep = 0;

  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom;
  String? _lastMoveTo;

  bool _isSolved = false;
  bool _isFailed = false;
  bool _showHint = false;

  // Rush & Survival state
  int _rushScore = 0;
  int _strikes = 0;
  int _timeLeftSec = 0;
  Timer? _rushTimer;
  bool _isRushActive = false;

  @override
  void initState() {
    super.initState();
    _loadPuzzle(0);
  }

  @override
  void dispose() {
    _rushTimer?.cancel();
    super.dispose();
  }

  void _loadPuzzle(int index) {
    if (index >= PUZZLES_DATABASE.length) {
      index = 0;
    }
    final p = PUZZLES_DATABASE[index];
    _game = chess.Chess.fromFEN(p.fen);

    setState(() {
      _currentPuzzleIndex = index;
      _moveStep = 0;
      _isSolved = false;
      _isFailed = false;
      _showHint = false;
      _lastMoveFrom = null;
      _lastMoveTo = null;
    });
  }

  void _startRushMode(PuzzleMode mode) {
    _rushTimer?.cancel();
    final time = mode == PuzzleMode.rush3 ? 180 : 300;
    setState(() {
      _mode = mode;
      _rushScore = 0;
      _strikes = 0;
      _timeLeftSec = time;
      _isRushActive = true;
    });
    _loadPuzzle(0);

    _rushTimer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_timeLeftSec > 0) {
        setState(() => _timeLeftSec--);
      } else {
        _endRushMode('Time\'s Up!');
      }
    });
  }

  void _startSurvivalMode() {
    _rushTimer?.cancel();
    setState(() {
      _mode = PuzzleMode.survival;
      _rushScore = 0;
      _strikes = 0;
      _isRushActive = true;
    });
    _loadPuzzle(0);
  }

  void _endRushMode(String reason) {
    _rushTimer?.cancel();
    setState(() => _isRushActive = false);

    final stats = StorageService.loadStats();
    if (_rushScore > stats.puzzleRushBest) {
      stats.puzzleRushBest = _rushScore;
      StorageService.saveStats(stats);
    }

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF18181B),
        title: Text(reason, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Your Score:', style: TextStyle(color: Color(0xFFA1A1AA))),
            const SizedBox(height: 8),
            Text('$_rushScore', style: const TextStyle(color: Color(0xFF10B981), fontSize: 36, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              setState(() => _mode = PuzzleMode.practice);
              _loadPuzzle(0);
            },
            child: const Text('Back to Practice', style: TextStyle(color: Color(0xFF10B981))),
          ),
        ],
      ),
    );
  }

  void _onPlayerMove(String from, String to, String? promotion) {
    if (_isSolved || _isFailed) return;

    final p = PUZZLES_DATABASE[_currentPuzzleIndex];
    final expectedSan = p.moves[_moveStep];
    final playedSan = _game.getHistory().last.toString();

    if (playedSan == expectedSan) {
      // Correct Move
      _lastMoveFrom = from;
      _lastMoveTo = to;
      SoundService.playMove();
      HapticsService.light();

      final nextStep = _moveStep + 1;
      if (nextStep >= p.moves.length) {
        // Solved!
        setState(() {
          _isSolved = true;
          _rushScore++;
        });
        SoundService.playVictory();
        HapticsService.vibrate();

        // Update stats
        final stats = StorageService.loadStats();
        stats.puzzlesSolved++;
        stats.puzzleRating += 12;
        StorageService.saveStats(stats);

        if (_mode != PuzzleMode.practice && _isRushActive) {
          Future.delayed(const Duration(milliseconds: 700), () {
            if (mounted && _isRushActive) {
              _loadPuzzle((_currentPuzzleIndex + 1) % PUZZLES_DATABASE.length);
            }
          });
        }
      } else {
        // Automatic opponent reply
        _moveStep = nextStep;
        final opponentSan = p.moves[_moveStep];
        Future.delayed(const Duration(milliseconds: 400), () {
          if (mounted) {
            _game.move(opponentSan);
            final oppState = _game.history.last;
            setState(() {
              _lastMoveFrom = oppState.move.fromAlgebraic;
              _lastMoveTo = oppState.move.toAlgebraic;
              _moveStep++;
            });
            SoundService.playMove();
            HapticsService.light();
          }
        });
      }
    } else {
      // Incorrect Move
      SoundService.playError();
      HapticsService.heavy();
      _game.undo();

      if (_mode == PuzzleMode.survival) {
        setState(() => _strikes++);
        if (_strikes >= 3) {
          _endRushMode('3 Strikes — Game Over!');
          return;
        }
      }

      setState(() {
        _isFailed = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = PUZZLES_DATABASE[_currentPuzzleIndex];
    final isFlipped = p.playerColor == 'b';

    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF18181B),
        title: const Text('🧩 Tactical Puzzles', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Mode Selectors
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: const Color(0xFF18181B),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildModeChip('Practice', PuzzleMode.practice, () {
                      _rushTimer?.cancel();
                      setState(() {
                        _mode = PuzzleMode.practice;
                        _isRushActive = false;
                      });
                      _loadPuzzle(_currentPuzzleIndex);
                    }),
                    const SizedBox(width: 8),
                    _buildModeChip('3m Rush', PuzzleMode.rush3, () => _startRushMode(PuzzleMode.rush3)),
                    const SizedBox(width: 8),
                    _buildModeChip('5m Rush', PuzzleMode.rush5, () => _startRushMode(PuzzleMode.rush5)),
                    const SizedBox(width: 8),
                    _buildModeChip('Survival', PuzzleMode.survival, _startSurvivalMode),
                  ],
                ),
              ),
            ),

            // Rush / Survival Status bar
            if (_mode != PuzzleMode.practice)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                color: const Color(0xFF27272A),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Score: $_rushScore', style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 14)),
                    if (_mode == PuzzleMode.rush3 || _mode == PuzzleMode.rush5)
                      Text(
                        '⏱️ ${_timeLeftSec ~/ 60}:${(_timeLeftSec % 60).toString().padLeft(2, "0")}',
                        style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    if (_mode == PuzzleMode.survival)
                      Row(
                        children: [
                          const Text('Strikes: ', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                          for (int s = 0; s < 3; s++)
                            Icon(Icons.close, size: 16, color: s < _strikes ? const Color(0xFFEF4444) : const Color(0xFF52525B)),
                        ],
                      ),
                  ],
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
                    lastMoveFrom: _lastMoveFrom,
                    lastMoveTo: _lastMoveTo,
                    onMove: _onPlayerMove,
                  ),
                ),
              ),
            ),

            // Feedback and Controls
            Container(
              margin: const EdgeInsets.all(12),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF18181B),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF27272A)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Flexible(
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Flexible(
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(color: const Color(0xFF3B82F6).withAlpha(40), borderRadius: BorderRadius.circular(6)),
                                child: Text(
                                  p.theme,
                                  style: const TextStyle(color: Color(0xFF60A5FA), fontSize: 12, fontWeight: FontWeight.bold),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text('${p.rating}', style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      if (_mode == PuzzleMode.practice) ...[
                        TextButton.icon(
                          style: TextButton.styleFrom(
                            padding: EdgeInsets.zero,
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                          icon: const Icon(Icons.lightbulb_outline, size: 16, color: Color(0xFFF59E0B)),
                          label: const Text('Hint', style: TextStyle(color: Color(0xFFF59E0B), fontSize: 12)),
                          onPressed: () => setState(() => _showHint = true),
                        ),
                        const SizedBox(width: 6),
                        IconButton(
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                          icon: const Icon(Icons.arrow_forward, size: 20, color: Colors.white),
                          onPressed: () => _loadPuzzle((_currentPuzzleIndex + 1) % PUZZLES_DATABASE.length),
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    _isSolved
                        ? '🎉 Solved! ${p.coachExplanation}'
                        : (_isFailed ? '❌ That wasn\'t it. Try again!' : (_showHint ? '💡 Hint: ${p.hint}' : p.description)),
                    style: TextStyle(
                      color: _isSolved ? const Color(0xFF10B981) : (_isFailed ? const Color(0xFFEF4444) : Colors.white),
                      fontSize: 13,
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

  Widget _buildModeChip(String label, PuzzleMode mode, VoidCallback onTap) {
    final isSel = _mode == mode;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSel ? const Color(0xFF10B981) : const Color(0xFF27272A),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          style: TextStyle(color: isSel ? Colors.white : const Color(0xFFA1A1AA), fontWeight: isSel ? FontWeight.bold : FontWeight.normal, fontSize: 12),
        ),
      ),
    );
  }
}
