import 'dart:async';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../data/puzzles_data.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../board/chess_board_widget.dart';
import '../board/board_painter.dart';

enum PuzzleMode { practice, rush3m, rush5m, survival, themes }

class PuzzlesScreen extends StatefulWidget {
  final AppSettings settings;

  const PuzzlesScreen({
    super.key,
    required this.settings,
  });

  @override
  State<PuzzlesScreen> createState() => _PuzzlesScreenState();
}

class _PuzzlesScreenState extends State<PuzzlesScreen> {
  PuzzleMode _activeMode = PuzzleMode.practice;
  List<ChessPuzzle> _activePuzzlesList = PUZZLES_DATABASE;
  int _currentPuzzleIndex = 0;
  late ChessPuzzle _currentPuzzle;
  late chess.Chess _puzzleChess;

  int _puzzleMoveIndex = 0;
  bool _isSolved = false;
  bool _isFailed = false;
  String? _statusMessage;
  List<BoardArrow> _arrows = [];
  String? _lastMoveFrom;
  String? _lastMoveTo;

  // Timed rush mode state
  int _rushTimeSeconds = 180;
  int _rushScore = 0;
  int _rushStrikes = 0;
  Timer? _rushTimer;
  bool _isRushActive = false;

  // Today's challenge solved count in session
  int _todayChallengeCount = 3;

  @override
  void initState() {
    super.initState();
    _activePuzzlesList = List.from(PUZZLES_DATABASE);
    _loadPuzzle(0);
  }

  @override
  void dispose() {
    _rushTimer?.cancel();
    super.dispose();
  }

  void _loadPuzzle(int index) {
    if (_activePuzzlesList.isEmpty) {
      _activePuzzlesList = List.from(PUZZLES_DATABASE);
    }
    _currentPuzzleIndex = index % _activePuzzlesList.length;
    _currentPuzzle = _activePuzzlesList[_currentPuzzleIndex];
    _puzzleChess = chess.Chess.fromFEN(_currentPuzzle.fen);
    _puzzleMoveIndex = 0;
    _isSolved = false;
    _isFailed = false;
    _statusMessage = null;
    _arrows = [];
    _lastMoveFrom = null;
    _lastMoveTo = null;
  }

  void _onPlayerMove(String from, String to, String? promotion) {
    if (_isSolved || _isFailed) return;

    final targetPiece = _puzzleChess.get(to);
    final isCapture = targetPiece != null;

    final moveSuccess = _puzzleChess.move({
      'from': from,
      'to': to,
      if (promotion != null) 'promotion': promotion,
    });

    if (!moveSuccess) return;

    _lastMoveFrom = from;
    _lastMoveTo = to;
    final lastMoveSan = _puzzleChess.getHistory().last.toString();

    // Check against solution
    final expectedMove = _currentPuzzle.moves[_puzzleMoveIndex];
    final isCorrect = lastMoveSan == expectedMove;

    if (isCorrect) {
      if (isCapture) {
        SoundService.playCapture();
        HapticsService.medium();
      } else {
        SoundService.playMove();
        HapticsService.light();
      }

      _puzzleMoveIndex++;

      if (_puzzleMoveIndex >= _currentPuzzle.moves.length) {
        // Puzzle solved completely!
        setState(() {
          _isSolved = true;
          _statusMessage = '🎉 Correct! +10 pts';
          _arrows = [];
          if (_todayChallengeCount < 5) _todayChallengeCount++;
        });

        SoundService.playVictory();
        HapticsService.vibrate();

        final stats = StorageService.loadStats();
        stats.puzzlesSolved++;
        stats.puzzleRating += 10;
        StorageService.saveStats(stats);

        if (_isRushActive) {
          _rushScore++;
          Future.delayed(const Duration(milliseconds: 900), () {
            if (mounted && _isRushActive) {
              setState(() {
                _loadPuzzle(_currentPuzzleIndex + 1);
              });
            }
          });
        }
      } else {
        // Play AI opponent response move
        setState(() {
          _statusMessage = 'Best move! Keep going...';
        });

        Future.delayed(const Duration(milliseconds: 500), () {
          if (!mounted || _isSolved || _isFailed) return;
          final aiMove = _currentPuzzle.moves[_puzzleMoveIndex];
          _puzzleChess.move(aiMove);
          _puzzleMoveIndex++;
          _lastMoveFrom = null;
          _lastMoveTo = null;
          SoundService.playMove();
          HapticsService.light();
          setState(() {});
        });
      }
    } else {
      // Incorrect move
      SoundService.playError();
      HapticsService.heavy();
      setState(() {
        _isFailed = true;
        _statusMessage = '❌ Not the best move. Try again!';
      });

      if (_isRushActive) {
        _rushStrikes++;
        if (_rushStrikes >= 3) {
          _endRush();
        }
      }
    }
  }

  void _showHint() {
    HapticsService.light();
    if (_puzzleMoveIndex < _currentPuzzle.moves.length) {
      final moves = _puzzleChess.moves({'verbose': true});
      final expectedSan = _currentPuzzle.moves[_puzzleMoveIndex];
      String? hintFrom;
      for (final m in moves) {
        if (m['san'] == expectedSan) {
          hintFrom = m['from'] as String;
          break;
        }
      }

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('💡 Hint: ${_currentPuzzle.hint}${hintFrom != null ? " (Focus on piece at $hintFrom)" : ""}'),
          backgroundColor: const Color(0xFF141A1F),
          duration: const Duration(seconds: 3),
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  void _revealMove() {
    HapticsService.light();
    if (_puzzleMoveIndex < _currentPuzzle.moves.length) {
      final nextSan = _currentPuzzle.moves[_puzzleMoveIndex];
      final moves = _puzzleChess.moves({'verbose': true});
      for (final m in moves) {
        if (m['san'] == nextSan) {
          setState(() {
            _arrows = [
              BoardArrow(from: m['from'] as String, to: m['to'] as String, color: const Color(0xFFF59E0B)),
            ];
          });
          break;
        }
      }
    }
  }

  void _playSolution() {
    HapticsService.light();
    if (_puzzleMoveIndex < _currentPuzzle.moves.length) {
      final nextSan = _currentPuzzle.moves[_puzzleMoveIndex];
      _puzzleChess.move(nextSan);
      _puzzleMoveIndex++;
      SoundService.playMove();
      setState(() {
        _isSolved = _puzzleMoveIndex >= _currentPuzzle.moves.length;
        _statusMessage = 'Solution played';
      });
    }
  }

  void _startRush(int seconds) {
    _rushTimer?.cancel();
    _rushTimeSeconds = seconds;
    _rushScore = 0;
    _rushStrikes = 0;
    _isRushActive = true;
    _loadPuzzle(0);

    _rushTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      if (_rushTimeSeconds > 0) {
        setState(() => _rushTimeSeconds--);
      } else {
        _endRush();
      }
    });
  }

  void _endRush() {
    _rushTimer?.cancel();
    _isRushActive = false;
    SoundService.playVictory();
    HapticsService.vibrate();

    final stats = StorageService.loadStats();
    if (_rushScore > stats.puzzleRushBest) {
      stats.puzzleRushBest = _rushScore;
      StorageService.saveStats(stats);
    }

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF141A1F),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFF222F38))),
        title: const Text('⚡ Puzzle Rush Complete!', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Score: $_rushScore Puzzles Solved', style: const TextStyle(color: Color(0xFF10B981), fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Text('Strikes: $_rushStrikes / 3', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              setState(() => _activeMode = PuzzleMode.practice);
            },
            child: const Text('Back to Practice', style: TextStyle(color: Color(0xFF10B981))),
          ),
        ],
      ),
    );
  }

  void _filterByTheme(String theme) {
    HapticsService.light();
    final filtered = PUZZLES_DATABASE.where((p) => p.theme.toLowerCase() == theme.toLowerCase()).toList();
    setState(() {
      _activePuzzlesList = filtered.isNotEmpty ? filtered : List.from(PUZZLES_DATABASE);
      _loadPuzzle(0);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('🎯 Filtered by $theme (${_activePuzzlesList.length} puzzles)'),
        backgroundColor: const Color(0xFF141A1F),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _showThemesModal() {
    final themes = ['Fork', 'Pin', 'Mate', 'Endgame', 'Discovery', 'Skewer'];
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF141A1F),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Select Tactical Theme', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                ActionChip(
                  label: const Text('All Themes'),
                  backgroundColor: const Color(0xFF222F38),
                  labelStyle: const TextStyle(color: Colors.white),
                  onPressed: () {
                    Navigator.pop(ctx);
                    setState(() {
                      _activePuzzlesList = List.from(PUZZLES_DATABASE);
                      _loadPuzzle(0);
                    });
                  },
                ),
                ...themes.map((t) => ActionChip(
                      label: Text(t),
                      backgroundColor: const Color(0xFF222F38),
                      labelStyle: const TextStyle(color: Colors.white),
                      onPressed: () {
                        Navigator.pop(ctx);
                        _filterByTheme(t);
                      },
                    )),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final stats = StorageService.loadStats();

    return Scaffold(
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Top Bar: Stylized Puzzle Piece Logo + Title + Streak & Rating
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withAlpha(40),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.extension, color: Color(0xFF10B981), size: 22),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text('Puzzles', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                              Text('Sharpen your tactics. Solve. Improve.', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10), maxLines: 1, overflow: TextOverflow.ellipsis),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  Row(
                    children: [
                      // Streak badge
                      Column(
                        children: [
                          Row(
                            children: [
                              const Text('🔥', style: TextStyle(fontSize: 13)),
                              const SizedBox(width: 2),
                              Text('${stats.winStreak * 2}', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          const Text('Day Streak', style: TextStyle(color: Color(0xFF64748B), fontSize: 8)),
                        ],
                      ),
                      const SizedBox(width: 12),
                      // Rating badge
                      Column(
                        children: [
                          Row(
                            children: [
                              const Text('🏆', style: TextStyle(fontSize: 13)),
                              const SizedBox(width: 2),
                              Text('${stats.rating}', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          const Text('Rating', style: TextStyle(color: Color(0xFF64748B), fontSize: 8)),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // 2. Mode Selector Pills: Practice, 3m Rush, 5m Rush, Survival, Themes
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildModePill(PuzzleMode.practice, '🎯 Practice', Icons.gps_fixed),
                    _buildModePill(PuzzleMode.rush3m, '⚡ 3m Rush', Icons.flash_on),
                    _buildModePill(PuzzleMode.rush5m, '⚡ 5m Rush', Icons.flash_on),
                    _buildModePill(PuzzleMode.survival, '🛡️ Survival', Icons.shield),
                    _buildModePill(PuzzleMode.themes, '🔲 Themes', Icons.grid_view),
                  ],
                ),
              ),
              const SizedBox(height: 12),

              // Timed Rush Status Strip if active
              if (_isRushActive) ...[
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E2830),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF10B981)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.timer, color: Color(0xFF10B981), size: 16),
                          const SizedBox(width: 6),
                          Text(
                            '${(_rushTimeSeconds ~/ 60).toString().padLeft(2, '0')}:${(_rushTimeSeconds % 60).toString().padLeft(2, '0')}',
                            style: TextStyle(
                              color: _rushTimeSeconds < 30 ? const Color(0xFFEF4444) : const Color(0xFF10B981),
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      Text('Solved: $_rushScore', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      Row(
                        children: [
                          Text(_rushStrikes >= 1 ? '❌' : '⚪', style: const TextStyle(fontSize: 12)),
                          Text(_rushStrikes >= 2 ? '❌' : '⚪', style: const TextStyle(fontSize: 12)),
                          Text(_rushStrikes >= 3 ? '❌' : '⚪', style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
              ],

              // 3. Active Tactical Puzzle Card (Left Info & Right Chessboard)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Column(
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Left Column: Tag, White to move, solve to gain, action buttons
                        SizedBox(
                          width: 110,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF38BDF8).withAlpha(40),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      _currentPuzzle.theme,
                                      style: const TextStyle(color: Color(0xFF38BDF8), fontSize: 9, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  const SizedBox(width: 4),
                                  Text('• ${_currentPuzzle.rating}', style: const TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(
                                _currentPuzzle.playerColor == 'w' ? 'White to move' : 'Black to move',
                                style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 1),
                              const Text('Find the winning move.', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 9)),
                              const SizedBox(height: 8),
                              const Text('Solve to gain', style: TextStyle(color: Color(0xFF64748B), fontSize: 8)),
                              Row(
                                children: const [
                                  Text('👑', style: TextStyle(fontSize: 11)),
                                  SizedBox(width: 4),
                                  Text('10 pts', style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold)),
                                ],
                              ),
                              const SizedBox(height: 10),
                              // Action buttons
                              _buildActionButton(Icons.lightbulb_outline, 'Hint', _showHint),
                              const SizedBox(height: 5),
                              _buildActionButton(Icons.visibility_outlined, 'Reveal', _revealMove),
                              const SizedBox(height: 5),
                              _buildActionButton(Icons.play_arrow_outlined, 'Solution', _playSolution),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        // Right Side: High-fidelity Chessboard
                        Expanded(
                          child: AspectRatio(
                            aspectRatio: 1.0,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: ChessBoardWidget(
                                game: _puzzleChess,
                                flipped: _currentPuzzle.playerColor == 'b',
                                boardTheme: widget.settings.boardTheme,
                                pieceTheme: widget.settings.pieceTheme,
                                lastMoveFrom: _lastMoveFrom,
                                lastMoveTo: _lastMoveTo,
                                arrows: _arrows,
                                onMove: _onPlayerMove,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // Navigation / Result banner
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        TextButton.icon(
                          style: TextButton.styleFrom(padding: EdgeInsets.zero, visualDensity: VisualDensity.compact),
                          icon: const Icon(Icons.chevron_left, size: 16, color: Color(0xFF94A3B8)),
                          label: const Text('Prev', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                          onPressed: _currentPuzzleIndex > 0 ? () => setState(() => _loadPuzzle(_currentPuzzleIndex - 1)) : null,
                        ),
                        Text(
                          'Puzzle ${_currentPuzzleIndex + 1} of ${_activePuzzlesList.length}',
                          style: const TextStyle(color: Color(0xFF64748B), fontSize: 10),
                        ),
                        TextButton.icon(
                          style: TextButton.styleFrom(padding: EdgeInsets.zero, visualDensity: VisualDensity.compact),
                          icon: const Icon(Icons.chevron_right, size: 16, color: Color(0xFF10B981)),
                          label: const Text('Next', style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold)),
                          onPressed: () => setState(() => _loadPuzzle(_currentPuzzleIndex + 1)),
                        ),
                      ],
                    ),
                    if (_statusMessage != null) ...[
                      const SizedBox(height: 6),
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 10),
                        decoration: BoxDecoration(
                          color: _isSolved ? const Color(0xFF10B981).withAlpha(30) : const Color(0xFFEF4444).withAlpha(30),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _statusMessage!,
                          style: TextStyle(
                            color: _isSolved ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // 4. Your Puzzle Stats Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('Your Puzzle Stats', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  Text('View All →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  _buildStatCard('Rating', '${stats.puzzleRating}', '+18', Icons.gps_fixed, const Color(0xFF10B981)),
                  const SizedBox(width: 8),
                  _buildStatCard('Solved', '${stats.puzzlesSolved}', 'This month', Icons.bar_chart, const Color(0xFFA855F7)),
                  const SizedBox(width: 8),
                  _buildStatCard('Accuracy', '81%', 'Nice!', Icons.radar, const Color(0xFFF59E0B)),
                  const SizedBox(width: 8),
                  _buildStatCard('Avg Time', '00:28', 'Seconds', Icons.schedule, const Color(0xFF38BDF8)),
                ],
              ),
              const SizedBox(height: 20),

              // 5. Puzzle Sets Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('Puzzle Sets', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  Text('View All →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  _buildSetCard('Daily Puzzle', 'A new puzzle every day', 'Solved', Icons.calendar_today, const Color(0xFF10B981), isSolved: true, onTap: () {
                    _loadPuzzle(0);
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Loaded Daily Puzzle!')));
                  }),
                  const SizedBox(width: 8),
                  _buildSetCard('Tactical Themes', 'Pins, forks, skewers', '1234 puzzles', Icons.sports_kabaddi, const Color(0xFFA855F7), onTap: _showThemesModal),
                  const SizedBox(width: 8),
                  _buildSetCard('Mate in X', 'Find the forced mate', '856 puzzles', Icons.workspace_premium, const Color(0xFFF59E0B), onTap: () => _filterByTheme('Fork')),
                  const SizedBox(width: 8),
                  _buildSetCard('Endgame', 'Test your technique', '632 puzzles', Icons.shield, const Color(0xFF38BDF8), onTap: () => _filterByTheme('Fork')),
                ],
              ),
              const SizedBox(height: 20),

              // 6. Today's Challenge Card
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
                      decoration: BoxDecoration(color: const Color(0xFF10B981).withAlpha(30), shape: BoxShape.circle),
                      child: const Icon(Icons.gps_fixed, color: Color(0xFF10B981), size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Today\'s Challenge', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 2),
                          const Text('Solve 5 puzzles with 80% accuracy', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                          const SizedBox(height: 6),
                          Row(
                            children: [
                              Expanded(
                                child: LinearProgressIndicator(
                                  value: _todayChallengeCount / 5.0,
                                  backgroundColor: const Color(0xFF222F38),
                                  color: const Color(0xFF10B981),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text('$_todayChallengeCount / 5', style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      children: [
                        const Text('Reward', style: TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                        const SizedBox(height: 2),
                        Text(_todayChallengeCount >= 5 ? 'CLAIMED 🎉' : '👑 25', style: const TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 18),
                  ],
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildModePill(PuzzleMode mode, String label, IconData icon) {
    final isSel = _activeMode == mode;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: () {
          HapticsService.light();
          setState(() {
            _activeMode = mode;
            if (mode == PuzzleMode.rush3m) _startRush(180);
            if (mode == PuzzleMode.rush5m) _startRush(300);
            if (mode == PuzzleMode.themes) _showThemesModal();
          });
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isSel ? const Color(0xFF10B981).withAlpha(40) : const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: isSel ? const Color(0xFF10B981) : const Color(0xFF222F38)),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: isSel ? const Color(0xFF10B981) : const Color(0xFF94A3B8),
              fontSize: 12,
              fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF222F38),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 12, color: Colors.white),
            const SizedBox(width: 4),
            Text(label, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String val, String sub, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFF222F38)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 16),
            const SizedBox(height: 4),
            Text(val, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
            Text(sub, style: TextStyle(color: color, fontSize: 9, fontWeight: FontWeight.bold), maxLines: 1),
          ],
        ),
      ),
    );
  }

  Widget _buildSetCard(String title, String sub, String count, IconData icon, Color color, {bool isSolved = false, VoidCallback? onTap}) {
    return Expanded(
      child: GestureDetector(
        onTap: () {
          HapticsService.light();
          onTap?.call();
        },
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: isSolved ? const Color(0xFF10B981) : const Color(0xFF222F38)),
          ),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(color: color.withAlpha(30), shape: BoxShape.circle),
                child: Icon(icon, color: color, size: 16),
              ),
              const SizedBox(height: 6),
              Text(title, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
              Text(count, style: TextStyle(color: isSolved ? const Color(0xFF10B981) : const Color(0xFF64748B), fontSize: 9), maxLines: 1),
            ],
          ),
        ),
      ),
    );
  }
}
