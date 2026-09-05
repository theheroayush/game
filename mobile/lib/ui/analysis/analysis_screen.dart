import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../engine/coach_analysis.dart';
import '../../engine/evaluation.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import '../board/chess_board_widget.dart';
import '../board/board_painter.dart';
import '../theme/app_theme.dart';
import 'eval_spline_painter.dart';

class AnalysisScreen extends StatefulWidget {
  final GameRecord? initialGame;
  final AppSettings settings;
  final VoidCallback? onBackToPlay;

  const AnalysisScreen({
    super.key,
    this.initialGame,
    required this.settings,
    this.onBackToPlay,
  });

  @override
  State<AnalysisScreen> createState() => _AnalysisScreenState();
}

class _AnalysisScreenState extends State<AnalysisScreen> {
  GameRecord? _activeGame;
  FullGameAnalysis? _analysis;
  bool _isLoading = true;

  int _currentPly = 0;
  bool _isPlaying = false;

  // Calibrated slow pacing for readable review: Slow (2.5s), Normal (1.8s), Quick (1.2s)
  static const List<int> _speedsMs = [2500, 1800, 1200];
  static const List<String> _speedLabels = ['Slow (2.5s)', 'Normal (1.8s)', 'Quick (1.2s)'];
  int _speedIndex = 0; // Default to Slow (2.5s per move)
  Timer? _playbackTimer;

  // Board replay state
  chess.Chess _replayChess = chess.Chess();
  List<BoardArrow> _arrows = [];
  String? _lastMoveFrom;
  String? _lastMoveTo;
  bool _flipped = false;
  final ScrollController _moveScrollController = ScrollController();

  // Sub-modes
  bool _retryMode = false;
  String _retryStatus = 'idle'; // 'idle' | 'success' | 'incorrect'
  bool _sandboxMode = false;
  chess.Chess _sandboxChess = chess.Chess();
  int _sandboxEval = 0;

  @override
  void initState() {
    super.initState();
    _loadAndAnalyze(widget.initialGame);
  }

  @override
  void didUpdateWidget(covariant AnalysisScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.initialGame != oldWidget.initialGame) {
      _loadAndAnalyze(widget.initialGame);
    }
  }

  @override
  void dispose() {
    _playbackTimer?.cancel();
    _moveScrollController.dispose();
    super.dispose();
  }

  Future<void> _loadAndAnalyze(GameRecord? game) async {
    setState(() {
      _isLoading = true;
      _activeGame = game;
    });

    final pgn = game?.pgn ?? '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Nxe4 6. Re1 d5 7. Bxd5 Qxd5 8. Nc3 Qa5 9. Nxe4 Be6 10. Neg5 O-O-O';

    FullGameAnalysis analysis;
    if (game?.analysis != null) {
      analysis = game!.analysis!;
    } else {
      analysis = await CoachAnalysisService.analyzeGameAsync(pgn);
    }

    setState(() {
      _analysis = analysis;
      _isLoading = false;
      _currentPly = 0;
      _flipped = (game?.playerColor ?? 'w') == 'b';
      _updateReplayBoard(0);
    });
  }

  void _scrollToCurrentPly(int ply) {
    if (!_moveScrollController.hasClients) return;
    const chipWidth = 78.0;
    final targetOffset = math.max(0.0, ply * chipWidth - 120.0);
    _moveScrollController.animateTo(
      targetOffset,
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOut,
    );
  }

  void _updateReplayBoard(int ply) {
    final chessSim = chess.Chess();
    final moves = _analysis?.moves ?? [];

    for (int i = 0; i < ply && i < moves.length; i++) {
      chessSim.move(moves[i].san);
    }

    final arrows = <BoardArrow>[];
    String? lastFrom;
    String? lastTo;

    if (ply > 0 && ply <= moves.length) {
      final currentMove = moves[ply - 1];
      lastFrom = currentMove.from;
      lastTo = currentMove.to;

      // Draw played move arrow
      arrows.add(BoardArrow(
        from: currentMove.from,
        to: currentMove.to,
        color: currentMove.classification == MoveClassification.blunder || currentMove.classification == MoveClassification.mistake
            ? const Color(0xFFEF4444)
            : (currentMove.classification == MoveClassification.brilliant || currentMove.classification == MoveClassification.best
                ? const Color(0xFF22C55E)
                : const Color(0xFF3B82F6)),
      ));

      // Draw best move arrow if missed
      if (currentMove.bestMoveFrom != null && currentMove.bestMoveTo != null) {
        arrows.add(BoardArrow(
          from: currentMove.bestMoveFrom!,
          to: currentMove.bestMoveTo!,
          color: const Color(0xFF22C55E),
        ));
      }
    }

    setState(() {
      _currentPly = ply;
      _replayChess = chessSim;
      _arrows = arrows;
      _lastMoveFrom = lastFrom;
      _lastMoveTo = lastTo;
      _retryMode = false;
      _retryStatus = 'idle';
      _sandboxMode = false;
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToCurrentPly(ply);
    });
  }

  void _stepFirst() {
    _playbackTimer?.cancel();
    setState(() => _isPlaying = false);
    _updateReplayBoard(0);
    SoundService.playMove();
    HapticsService.light();
  }

  void _stepPrev() {
    _playbackTimer?.cancel();
    setState(() => _isPlaying = false);
    final targetPly = (_currentPly - 1).clamp(0, _analysis?.moves.length ?? 0);
    _updateReplayBoard(targetPly);
    SoundService.playMove();
    HapticsService.light();
  }

  void _stepNext({bool fromAutoPlay = false}) {
    if (!fromAutoPlay) {
      _playbackTimer?.cancel();
      setState(() => _isPlaying = false);
    }
    final maxPlies = _analysis?.moves.length ?? 0;
    if (_currentPly >= maxPlies) {
      _playbackTimer?.cancel();
      setState(() => _isPlaying = false);
      return;
    }
    final nextPly = _currentPly + 1;
    _updateReplayBoard(nextPly);

    // Audio & haptic feedback on each move
    if (nextPly <= maxPlies) {
      final m = _analysis!.moves[nextPly - 1];
      if (m.san.contains('#')) {
        SoundService.playVictory();
        HapticsService.heavy();
      } else if (m.san.contains('+')) {
        SoundService.playCheck();
        HapticsService.medium();
      } else if (m.san.contains('x')) {
        SoundService.playCapture();
        HapticsService.medium();
      } else {
        SoundService.playMove();
        HapticsService.light();
      }
    }
  }

  void _stepLast() {
    _playbackTimer?.cancel();
    setState(() => _isPlaying = false);
    _updateReplayBoard(_analysis?.moves.length ?? 0);
    SoundService.playMove();
    HapticsService.light();
  }

  void _startPlaybackTimer() {
    _playbackTimer?.cancel();
    _playbackTimer = Timer.periodic(Duration(milliseconds: _speedsMs[_speedIndex]), (timer) {
      if (_currentPly >= (_analysis?.moves.length ?? 0)) {
        timer.cancel();
        setState(() => _isPlaying = false);
      } else {
        _stepNext(fromAutoPlay: true);
      }
    });
  }

  void _togglePlayPause() {
    if (_isPlaying) {
      _playbackTimer?.cancel();
      setState(() => _isPlaying = false);
    } else {
      if (_currentPly >= (_analysis?.moves.length ?? 0)) {
        _updateReplayBoard(0);
      }
      setState(() => _isPlaying = true);
      _startPlaybackTimer();
    }
  }

  void _toggleSpeed() {
    setState(() {
      _speedIndex = (_speedIndex + 1) % _speedsMs.length;
    });
    if (_isPlaying) {
      _startPlaybackTimer();
    }
    HapticsService.light();
  }

  // "Retry Move" Blunder Puzzle Mode
  void _startRetryBlunder() {
    if (_currentPly == 0 || _analysis == null) return;
    final moveBefore = _analysis!.moves[_currentPly - 1];

    final sim = chess.Chess.fromFEN(moveBefore.fenBefore);
    setState(() {
      _retryMode = true;
      _retryStatus = 'idle';
      _replayChess = sim;
      _arrows = [];
    });
  }

  void _onRetryMoveAttempt(String from, String to, String? promotion) {
    if (_currentPly == 0 || _analysis == null) return;
    final targetAnalysis = _analysis!.moves[_currentPly - 1];

    if (from == targetAnalysis.bestMoveFrom && to == targetAnalysis.bestMoveTo) {
      setState(() {
        _retryStatus = 'success';
      });
      SoundService.playVictory();
      HapticsService.vibrate();
    } else {
      setState(() {
        _retryStatus = 'incorrect';
      });
      SoundService.playError();
      HapticsService.heavy();
    }
  }

  // "Sandbox Mode" Free exploration
  void _startSandboxMode() {
    setState(() {
      _sandboxMode = true;
      _sandboxChess = chess.Chess.fromFEN(_replayChess.fen);
      _sandboxEval = evaluatePosition(_sandboxChess);
    });
  }

  void _onSandboxMove(String from, String to, String? promotion) {
    setState(() {
      _sandboxEval = evaluatePosition(_sandboxChess);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircularProgressIndicator(color: AppColors.accentBlue),
              SizedBox(height: 16),
              Text('Analyzing Game with Minimax Engine...', style: TextStyle(color: Colors.white, fontSize: 14)),
            ],
          ),
        ),
      );
    }

    final analysis = _analysis!;
    final currentMove = _currentPly > 0 && _currentPly <= analysis.moves.length ? analysis.moves[_currentPly - 1] : null;
    final evals = [0.0, ...analysis.moves.map((m) => m.evalAfter)];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.dark,
        title: Text(
          _activeGame != null ? '${_activeGame!.whitePlayer} vs ${_activeGame!.blackPlayer}' : '👨‍🏫 Coach Review',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.list_alt_rounded, size: 22),
            tooltip: 'Move List',
            onPressed: () => _showMoveListSheet(analysis),
          ),
          IconButton(
            icon: const Icon(Icons.flip_camera_android, size: 20),
            tooltip: 'Flip Board',
            onPressed: () => setState(() => _flipped = !_flipped),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // 1. Accuracy & Performance Header Card
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              color: AppColors.surface,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildPlayerAccuracyCard('White', analysis.accuracyWhite, analysis.performanceWhite, const Color(0xFFE2E8F0)),
                  Container(width: 1, height: 36, color: AppColors.border),
                  _buildPlayerAccuracyCard('Black', analysis.accuracyBlack, analysis.performanceBlack, const Color(0xFF38BDF8)),
                ],
              ),
            ),

            // 2. Interactive Board with Last-Move Highlights
            Expanded(
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
                  child: _sandboxMode
                      ? ChessBoardWidget(
                          game: _sandboxChess,
                          flipped: _flipped,
                          boardTheme: widget.settings.boardTheme,
                          pieceTheme: widget.settings.pieceTheme,
                          interactive: true,
                          showCoordinates: widget.settings.showCoordinates,
                          onMove: _onSandboxMove,
                        )
                      : (_retryMode
                          ? ChessBoardWidget(
                              game: _replayChess,
                              flipped: _flipped,
                              boardTheme: widget.settings.boardTheme,
                              pieceTheme: widget.settings.pieceTheme,
                              interactive: _retryStatus != 'success',
                              lastMoveFrom: _lastMoveFrom,
                              lastMoveTo: _lastMoveTo,
                              showCoordinates: widget.settings.showCoordinates,
                              onMove: _onRetryMoveAttempt,
                            )
                          : ChessBoardWidget(
                              game: _replayChess,
                              flipped: _flipped,
                              boardTheme: widget.settings.boardTheme,
                              pieceTheme: widget.settings.pieceTheme,
                              interactive: false,
                              lastMoveFrom: _lastMoveFrom,
                              lastMoveTo: _lastMoveTo,
                              showCoordinates: widget.settings.showCoordinates,
                              arrows: _arrows,
                            )),
                ),
              ),
            ),

            // 3. Dynamic Bezier Evaluation Spline
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
              child: SizedBox(
                height: 30,
                child: CustomPaint(
                  size: const Size(double.infinity, 30),
                  painter: EvalSplinePainter(evaluations: evals, currentPly: _currentPly),
                ),
              ),
            ),

            // 4. Horizontal Move Ledger Strip (Click one-by-one navigation)
            _buildMoveLedgerStrip(analysis),

            // 5. Move Classification & Coach Commentary Card
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_retryMode) ...[
                    Row(
                      children: [
                        const Text('🎯 Retry Move Mode', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 13)),
                        const Spacer(),
                        TextButton(
                          onPressed: () => _updateReplayBoard(_currentPly),
                          style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                          child: const Text('Exit Retry', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _retryStatus == 'idle'
                          ? 'Can you find the winning move here?'
                          : (_retryStatus == 'success' ? '🎉 Brilliant! You found the best engine move!' : '❌ Not quite. Try another square!'),
                      style: TextStyle(
                        color: _retryStatus == 'success' ? const Color(0xFF10B981) : (_retryStatus == 'incorrect' ? const Color(0xFFEF4444) : Colors.white),
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ] else if (_sandboxMode) ...[
                    Row(
                      children: [
                        const Text('🧪 Sandbox Exploration', style: TextStyle(color: Color(0xFF38BDF8), fontWeight: FontWeight.bold, fontSize: 13)),
                        const Spacer(),
                        Text('Eval: ${(_sandboxEval / 100).toStringAsFixed(1)}', style: const TextStyle(color: Colors.white, fontSize: 12)),
                        const SizedBox(width: 8),
                        TextButton(
                          onPressed: () => _updateReplayBoard(_currentPly),
                          style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                          child: const Text('Exit Sandbox', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                        ),
                      ],
                    ),
                  ] else if (currentMove != null) ...[
                    Row(
                      children: [
                        Flexible(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                            decoration: BoxDecoration(
                              color: _getClassificationColor(currentMove.classification).withAlpha(40),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: _getClassificationColor(currentMove.classification)),
                            ),
                            child: Text(
                              '${currentMove.classification.symbol} ${currentMove.classification.label} • ${currentMove.san}',
                              style: TextStyle(color: _getClassificationColor(currentMove.classification), fontWeight: FontWeight.bold, fontSize: 11),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ),
                        if (currentMove.bestMoveSan != null &&
                            currentMove.classification != MoveClassification.best &&
                            currentMove.classification != MoveClassification.brilliant) ...[
                          const SizedBox(width: 6),
                          Text(
                            'Best: ${currentMove.bestMoveSan}',
                            style: const TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ],
                        const Spacer(),
                        if (currentMove.classification == MoveClassification.blunder || currentMove.classification == MoveClassification.mistake) ...[
                          TextButton.icon(
                            style: TextButton.styleFrom(
                              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 0),
                              minimumSize: Size.zero,
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            ),
                            icon: const Icon(Icons.refresh, size: 14, color: Color(0xFFF59E0B)),
                            label: const Text('Retry', style: TextStyle(color: Color(0xFFF59E0B), fontSize: 11)),
                            onPressed: _startRetryBlunder,
                          ),
                          const SizedBox(width: 6),
                        ],
                        TextButton.icon(
                          style: TextButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 0),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                          icon: const Icon(Icons.science_outlined, size: 14, color: Color(0xFF38BDF8)),
                          label: const Text('Sandbox', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 11)),
                          onPressed: _startSandboxMode,
                        ),
                      ],
                    ),
                    const SizedBox(height: 3),
                    Text(
                      currentMove.coachExplanation,
                      style: const TextStyle(color: Color(0xFFE4E4E7), fontSize: 11.5, height: 1.25),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ] else ...[
                    Row(
                      children: [
                        const Icon(Icons.flag_rounded, size: 14, color: AppColors.accentBlue),
                        const SizedBox(width: 6),
                        const Text('Game Overview', style: TextStyle(color: AppColors.accentBlue, fontWeight: FontWeight.bold, fontSize: 12)),
                        const Spacer(),
                        TextButton.icon(
                          style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                          icon: const Icon(Icons.science_outlined, size: 14, color: Color(0xFF38BDF8)),
                          label: const Text('Sandbox', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 11)),
                          onPressed: _startSandboxMode,
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      analysis.gameNarrative,
                      style: const TextStyle(color: Colors.white, fontSize: 11.5, height: 1.25),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),

            // 6. Interactive Replay Stepping Deck with Slow Pacing Controls
            _buildReplayControls(),
          ],
        ),
      ),
    );
  }

  Widget _buildMoveLedgerStrip(FullGameAnalysis analysis) {
    final moves = analysis.moves;

    return Container(
      height: 36,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
      child: ListView.separated(
        controller: _moveScrollController,
        scrollDirection: Axis.horizontal,
        itemCount: moves.length + 1,
        separatorBuilder: (_, _) => const SizedBox(width: 6),
        itemBuilder: (context, index) {
          final isSelected = _currentPly == index;
          if (index == 0) {
            return InkWell(
              onTap: _stepFirst,
              borderRadius: BorderRadius.circular(6),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.accentBlue.withAlpha(50) : const Color(0xFF1E1E24),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(
                    color: isSelected ? AppColors.accentBlue : AppColors.border,
                    width: isSelected ? 1.5 : 1.0,
                  ),
                ),
                alignment: Alignment.center,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.flag_rounded, size: 12, color: isSelected ? AppColors.accentBlue : const Color(0xFFA1A1AA)),
                    const SizedBox(width: 4),
                    Text(
                      'Start',
                      style: TextStyle(
                        color: isSelected ? Colors.white : const Color(0xFFA1A1AA),
                        fontSize: 11,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }

          final ply = index;
          final move = moves[ply - 1];
          final moveNumber = ((ply - 1) ~/ 2) + 1;
          final isWhite = (ply - 1) % 2 == 0;
          final moveLabel = isWhite ? '$moveNumber. ${move.san}' : '$moveNumber... ${move.san}';
          final classColor = _getClassificationColor(move.classification);

          return InkWell(
            onTap: () {
              _playbackTimer?.cancel();
              setState(() => _isPlaying = false);
              _updateReplayBoard(ply);
              SoundService.playMove();
              HapticsService.light();
            },
            borderRadius: BorderRadius.circular(6),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
              decoration: BoxDecoration(
                color: isSelected ? classColor.withAlpha(45) : const Color(0xFF18181B),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(
                  color: isSelected ? classColor : AppColors.border,
                  width: isSelected ? 1.5 : 1.0,
                ),
              ),
              alignment: Alignment.center,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    moveLabel,
                    style: TextStyle(
                      color: isSelected ? Colors.white : const Color(0xFFD4D4D8),
                      fontSize: 11,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                    ),
                  ),
                  if (move.classification.symbol.isNotEmpty) ...[
                    const SizedBox(width: 4),
                    Text(
                      move.classification.symbol,
                      style: const TextStyle(fontSize: 11),
                    ),
                  ],
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildReplayControls() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: const BoxDecoration(
        color: AppColors.dark,
        border: Border(top: BorderSide(color: AppColors.border, width: 1.0)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.first_page_rounded, size: 24),
            onPressed: _stepFirst,
            color: Colors.white,
            tooltip: 'Start of game',
          ),
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.chevron_left_rounded, size: 28),
            onPressed: _stepPrev,
            color: Colors.white,
            tooltip: 'Previous move',
          ),
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Icon(
              _isPlaying ? Icons.pause_circle_filled_rounded : Icons.play_circle_filled_rounded,
              size: 34,
            ),
            onPressed: _togglePlayPause,
            color: const Color(0xFF10B981),
            tooltip: _isPlaying ? 'Pause' : 'Auto play',
          ),
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.chevron_right_rounded, size: 28),
            onPressed: () => _stepNext(),
            color: Colors.white,
            tooltip: 'Next move',
          ),
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.last_page_rounded, size: 24),
            onPressed: _stepLast,
            color: Colors.white,
            tooltip: 'End of game',
          ),
          ActionChip(
            padding: EdgeInsets.zero,
            labelPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 0),
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            label: Text(_speedLabels[_speedIndex], style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
            backgroundColor: const Color(0xFF27272A),
            side: const BorderSide(color: AppColors.border),
            onPressed: _toggleSpeed,
          ),
        ],
      ),
    );
  }

  void _showMoveListSheet(FullGameAnalysis analysis) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      isScrollControlled: true,
      builder: (ctx) {
        final moves = analysis.moves;
        final rowCount = ((moves.length + 1) ~/ 2);

        return DraggableScrollableSheet(
          initialChildSize: 0.65,
          minChildSize: 0.4,
          maxChildSize: 0.9,
          expand: false,
          builder: (context, scrollController) {
            return Column(
              children: [
                Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.border,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: Row(
                    children: [
                      const Icon(Icons.list_alt_rounded, color: AppColors.accentBlue, size: 20),
                      const SizedBox(width: 8),
                      const Text(
                        'Complete Move Sheet',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const Spacer(),
                      Text(
                        '${moves.length} moves',
                        style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12),
                      ),
                    ],
                  ),
                ),
                const Divider(color: AppColors.border, height: 12),
                Expanded(
                  child: ListView.builder(
                    controller: scrollController,
                    itemCount: rowCount + 1,
                    itemBuilder: (context, rowIndex) {
                      if (rowIndex == 0) {
                        final isSelected = _currentPly == 0;
                        return ListTile(
                          dense: true,
                          selected: isSelected,
                          selectedTileColor: AppColors.accentBlue.withAlpha(30),
                          leading: const Icon(Icons.flag_rounded, size: 18, color: AppColors.accentBlue),
                          title: const Text('Starting Position', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                          onTap: () {
                            Navigator.of(ctx).pop();
                            _stepFirst();
                          },
                        );
                      }

                      final moveNum = rowIndex;
                      final whiteIndex = (moveNum - 1) * 2;
                      final blackIndex = whiteIndex + 1;

                      final whiteMove = whiteIndex < moves.length ? moves[whiteIndex] : null;
                      final blackMove = blackIndex < moves.length ? moves[blackIndex] : null;

                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 3),
                        child: Row(
                          children: [
                            SizedBox(
                              width: 32,
                              child: Text(
                                '$moveNum.',
                                style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Expanded(
                              child: whiteMove != null
                                  ? _buildSheetMoveButton(
                                      ctx,
                                      whiteIndex + 1,
                                      whiteMove.san,
                                      whiteMove.classification,
                                      whiteMove.evalAfter,
                                    )
                                  : const SizedBox(),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: blackMove != null
                                  ? _buildSheetMoveButton(
                                      ctx,
                                      blackIndex + 1,
                                      blackMove.san,
                                      blackMove.classification,
                                      blackMove.evalAfter,
                                    )
                                  : const SizedBox(),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  Widget _buildSheetMoveButton(
    BuildContext ctx,
    int ply,
    String san,
    MoveClassification cls,
    double eval,
  ) {
    final isSelected = _currentPly == ply;
    final color = _getClassificationColor(cls);

    return InkWell(
      onTap: () {
        Navigator.of(ctx).pop();
        _playbackTimer?.cancel();
        setState(() => _isPlaying = false);
        _updateReplayBoard(ply);
        SoundService.playMove();
        HapticsService.light();
      },
      borderRadius: BorderRadius.circular(6),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
        decoration: BoxDecoration(
          color: isSelected ? color.withAlpha(45) : const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(6),
          border: Border.all(
            color: isSelected ? color : AppColors.border,
            width: isSelected ? 1.5 : 1.0,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              san,
              style: TextStyle(
                color: isSelected ? Colors.white : const Color(0xFFE4E4E7),
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
              ),
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (cls.symbol.isNotEmpty)
                  Text(
                    cls.symbol,
                    style: const TextStyle(fontSize: 11),
                  ),
                const SizedBox(width: 4),
                Text(
                  (eval / 100).toStringAsFixed(1),
                  style: const TextStyle(color: Color(0xFF71717A), fontSize: 10),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlayerAccuracyCard(String label, int acc, int perf, Color color) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.bold)),
        const SizedBox(height: 2),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('$acc%', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(width: 6),
            Text('($perf Elo)', style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 11)),
          ],
        ),
      ],
    );
  }

  Color _getClassificationColor(MoveClassification cls) {
    switch (cls) {
      case MoveClassification.brilliant: return const Color(0xFF06B6D4);
      case MoveClassification.great: return const Color(0xFF3B82F6);
      case MoveClassification.best: return const Color(0xFF10B981);
      case MoveClassification.excellent: return const Color(0xFF22C55E);
      case MoveClassification.good: return const Color(0xFF84CC16);
      case MoveClassification.inaccuracy: return const Color(0xFFF59E0B);
      case MoveClassification.mistake: return const Color(0xFFF97316);
      case MoveClassification.blunder: return const Color(0xFFEF4444);
      case MoveClassification.missedWin: return const Color(0xFFDC2626);
      case MoveClassification.book: return const Color(0xFFA855F7);
    }
  }
}

