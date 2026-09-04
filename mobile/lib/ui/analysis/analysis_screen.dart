import 'dart:async';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../engine/coach_analysis.dart';
import '../../engine/evaluation.dart';
import '../../services/haptics_service.dart';
import '../../services/sound_service.dart';
import '../board/chess_board_widget.dart';
import '../board/board_painter.dart';
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
  int _playbackSpeed = 1;
  Timer? _playbackTimer;

  // Board replay state
  chess.Chess _replayChess = chess.Chess();
  List<BoardArrow> _arrows = [];
  bool _flipped = false;

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

  void _updateReplayBoard(int ply) {
    final chessSim = chess.Chess();
    final moves = _analysis?.moves ?? [];

    for (int i = 0; i < ply && i < moves.length; i++) {
      chessSim.move(moves[i].san);
    }

    final arrows = <BoardArrow>[];
    if (ply > 0 && ply <= moves.length) {
      final currentMove = moves[ply - 1];

      // Draw played move arrow
      arrows.add(BoardArrow(
        from: currentMove.from,
        to: currentMove.to,
        color: currentMove.classification == MoveClassification.blunder || currentMove.classification == MoveClassification.mistake
            ? const Color(0xFFEF4444)
            : const Color(0xFF3B82F6),
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
      _retryMode = false;
      _retryStatus = 'idle';
      _sandboxMode = false;
    });
  }

  void _stepFirst() => _updateReplayBoard(0);
  void _stepPrev() => _updateReplayBoard((_currentPly - 1).clamp(0, _analysis?.moves.length ?? 0));
  void _stepNext() => _updateReplayBoard((_currentPly + 1).clamp(0, _analysis?.moves.length ?? 0));
  void _stepLast() => _updateReplayBoard(_analysis?.moves.length ?? 0);

  void _togglePlayPause() {
    if (_isPlaying) {
      _playbackTimer?.cancel();
      setState(() => _isPlaying = false);
    } else {
      setState(() => _isPlaying = true);
      _playbackTimer?.cancel();
      _playbackTimer = Timer.periodic(Duration(milliseconds: 1000 ~/ _playbackSpeed), (timer) {
        if (_currentPly >= (_analysis?.moves.length ?? 0)) {
          timer.cancel();
          setState(() => _isPlaying = false);
        } else {
          _stepNext();
        }
      });
    }
  }

  void _toggleSpeed() {
    final speeds = [1, 2, 3];
    final nextIdx = (speeds.indexOf(_playbackSpeed) + 1) % speeds.length;
    setState(() => _playbackSpeed = speeds[nextIdx]);
    if (_isPlaying) {
      _togglePlayPause();
      _togglePlayPause();
    }
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
        backgroundColor: Color(0xFF09090B),
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircularProgressIndicator(color: Color(0xFF10B981)),
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
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF18181B),
        title: Text(
          _activeGame != null ? '${_activeGame!.whitePlayer} vs ${_activeGame!.blackPlayer}' : '👨‍🏫 Coach Review',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.flip_camera_android, size: 20),
            onPressed: () => setState(() => _flipped = !_flipped),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // 1. Accuracy & Performance Header Card
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              color: const Color(0xFF18181B),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildPlayerAccuracyCard('White', analysis.accuracyWhite, analysis.performanceWhite, const Color(0xFFE2E8F0)),
                  Container(width: 1, height: 40, color: const Color(0xFF27272A)),
                  _buildPlayerAccuracyCard('Black', analysis.accuracyBlack, analysis.performanceBlack, const Color(0xFF38BDF8)),
                ],
              ),
            ),

            // 2. Interactive Board
            Expanded(
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: _sandboxMode
                      ? ChessBoardWidget(
                          game: _sandboxChess,
                          flipped: _flipped,
                          boardTheme: widget.settings.boardTheme,
                          pieceTheme: widget.settings.pieceTheme,
                          interactive: true,
                          onMove: _onSandboxMove,
                        )
                      : (_retryMode
                          ? ChessBoardWidget(
                              game: _replayChess,
                              flipped: _flipped,
                              boardTheme: widget.settings.boardTheme,
                              pieceTheme: widget.settings.pieceTheme,
                              interactive: _retryStatus != 'success',
                              onMove: _onRetryMoveAttempt,
                            )
                          : ChessBoardWidget(
                              game: _replayChess,
                              flipped: _flipped,
                              boardTheme: widget.settings.boardTheme,
                              pieceTheme: widget.settings.pieceTheme,
                              interactive: false,
                              arrows: _arrows,
                            )),
                ),
              ),
            ),

            // 3. Dynamic Bezier Evaluation Spline
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: SizedBox(
                height: 38,
                child: CustomPaint(
                  size: const Size(double.infinity, 38),
                  painter: EvalSplinePainter(evaluations: evals, currentPly: _currentPly),
                ),
              ),
            ),

            // 4. Move Classification & Coach Commentary Card
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFF18181B),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF27272A)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (_retryMode) ...[
                    Row(
                      children: [
                        const Text('🎯 Retry Move Mode', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 14)),
                        const Spacer(),
                        TextButton(
                          onPressed: () => _updateReplayBoard(_currentPly),
                          child: const Text('Exit Retry', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                        ),
                      ],
                    ),
                    Text(
                      _retryStatus == 'idle'
                          ? 'Can you find the winning move here?'
                          : (_retryStatus == 'success' ? '🎉 Brilliant! You found the best engine move!' : '❌ Not quite. Try another square!'),
                      style: TextStyle(
                        color: _retryStatus == 'success' ? const Color(0xFF10B981) : (_retryStatus == 'incorrect' ? const Color(0xFFEF4444) : Colors.white),
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ] else if (_sandboxMode) ...[
                    Row(
                      children: [
                        const Text('🧪 Sandbox Exploration', style: TextStyle(color: Color(0xFF38BDF8), fontWeight: FontWeight.bold, fontSize: 14)),
                        const Spacer(),
                        Text('Eval: ${(_sandboxEval / 100).toStringAsFixed(1)}', style: const TextStyle(color: Colors.white, fontSize: 13)),
                        TextButton(
                          onPressed: () => _updateReplayBoard(_currentPly),
                          child: const Text('Exit Sandbox', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                        ),
                      ],
                    ),
                  ] else if (currentMove != null) ...[
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: _getClassificationColor(currentMove.classification).withAlpha(40),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: _getClassificationColor(currentMove.classification)),
                          ),
                          child: Text(
                            '${currentMove.classification.symbol} ${currentMove.classification.label} (${currentMove.san})',
                            style: TextStyle(color: _getClassificationColor(currentMove.classification), fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                        ),
                        const Spacer(),
                        if (currentMove.classification == MoveClassification.blunder || currentMove.classification == MoveClassification.mistake)
                          TextButton.icon(
                            style: TextButton.styleFrom(padding: EdgeInsets.zero),
                            icon: const Icon(Icons.refresh, size: 16, color: Color(0xFFF59E0B)),
                            label: const Text('Retry', style: TextStyle(color: Color(0xFFF59E0B), fontSize: 12)),
                            onPressed: _startRetryBlunder,
                          ),
                        TextButton.icon(
                          style: TextButton.styleFrom(padding: EdgeInsets.zero),
                          icon: const Icon(Icons.science_outlined, size: 16, color: Color(0xFF38BDF8)),
                          label: const Text('Sandbox', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 12)),
                          onPressed: _startSandboxMode,
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      currentMove.coachExplanation,
                      style: const TextStyle(color: Color(0xFFE4E4E7), fontSize: 12),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ] else ...[
                    Text(
                      analysis.gameNarrative,
                      style: const TextStyle(color: Colors.white, fontSize: 12),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),

            // 5. Interactive Replay Stepping Deck
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              color: const Color(0xFF18181B),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(icon: const Icon(Icons.first_page_rounded), onPressed: _stepFirst, color: Colors.white),
                  IconButton(icon: const Icon(Icons.chevron_left_rounded), onPressed: _stepPrev, color: Colors.white),
                  IconButton(
                    icon: Icon(_isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded),
                    onPressed: _togglePlayPause,
                    color: const Color(0xFF10B981),
                    iconSize: 28,
                  ),
                  IconButton(icon: const Icon(Icons.chevron_right_rounded), onPressed: _stepNext, color: Colors.white),
                  IconButton(icon: const Icon(Icons.last_page_rounded), onPressed: _stepLast, color: Colors.white),
                  ActionChip(
                    label: Text('${_playbackSpeed}x', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    backgroundColor: const Color(0xFF27272A),
                    onPressed: _toggleSpeed,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlayerAccuracyCard(String label, int acc, int perf, Color color) {
    return Column(
      children: [
        Text(label, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.bold)),
        const SizedBox(height: 2),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('$acc%', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
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
