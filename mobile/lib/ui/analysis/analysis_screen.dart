import 'dart:math';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../../services/storage_service.dart';
import '../../engine/coach_analysis.dart';
import '../board/chess_board_widget.dart';
import '../board/board_painter.dart';

enum ReviewSubTab { gameReview, moments, analysis, report }

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
  ReviewSubTab _activeSubTab = ReviewSubTab.gameReview;
  late FullGameAnalysis _analysis;
  int _currentMoveIndex = 0;
  bool _showingEngineLine = false;
  late chess.Chess _boardGame;
  List<BoardArrow> _arrows = [];
  int _currentMomentIndex = 0;

  final String _defaultSamplePgn =
      '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Nbd7 9. Qd2 b5 10. O-O-O Rc8 11. g4 Nb6 12. g5 Nfd7 13. f4 Be7 14. f5 Bc4 15. h4 b4 16. Nd5 Nxd5 17. exd5 a5 18. Kb1 a4 19. Nc1 b3 20. cxb3 axb3 21. a3 Bxf1 22. Rhxf1 Rc2 23. Qd3 Qb8 24. Nxb3 Rg2 25. Rg1 Rxg1 26. Rxg1 O-O 27. f6 Bd8 28. fxg7 Kxg7 29. h5 Bb6 30. g6 fxg6 31. hxg6 h6 32. Rh1 Bxe3 33. Qxe3 Rf4 34. Qh3 Nf8 35. Qxh6+ Kf6 36. g7+ 1-0';

  @override
  void initState() {
    super.initState();
    _initAnalysis();
  }

  void _initAnalysis() {
    String pgnToAnalyze = widget.initialGame?.pgn ?? '';
    if (pgnToAnalyze.trim().isEmpty) {
      final recent = StorageService.getRecentGames();
      if (recent.isNotEmpty && recent.first.pgn.trim().isNotEmpty) {
        pgnToAnalyze = recent.first.pgn;
      } else {
        pgnToAnalyze = _defaultSamplePgn;
      }
    }

    _analysis = analyzeGame(pgnToAnalyze);

    if (_analysis.moves.isNotEmpty) {
      _currentMoveIndex = min(7, _analysis.moves.length - 1);
      _boardGame = chess.Chess.fromFEN(_analysis.moves[_currentMoveIndex].fenAfter);
      _updateArrows();
    } else {
      _boardGame = chess.Chess();
    }
  }

  void _goToMove(int index) {
    if (_analysis.moves.isEmpty) return;
    final target = max(0, min(index, _analysis.moves.length - 1));
    HapticsService.light();
    setState(() {
      _currentMoveIndex = target;
      _boardGame = chess.Chess.fromFEN(_analysis.moves[target].fenAfter);
      _updateArrows();
    });
  }

  void _updateArrows() {
    _arrows = [];
    if (_showingEngineLine && _analysis.moves.isNotEmpty) {
      final cur = _analysis.moves[_currentMoveIndex];
      if (cur.bestMoveFrom != null && cur.bestMoveTo != null) {
        _arrows.add(
          BoardArrow(
            from: cur.bestMoveFrom!,
            to: cur.bestMoveTo!,
            color: const Color(0xFF10B981),
          ),
        );
      }
    }
  }

  void _toggleEngineLine() {
    HapticsService.light();
    setState(() {
      _showingEngineLine = !_showingEngineLine;
      _updateArrows();
    });
  }

  @override
  Widget build(BuildContext context) {
    final curMove = _analysis.moves.isNotEmpty ? _analysis.moves[_currentMoveIndex] : null;

    final whiteAcc = _analysis.accuracyWhite;
    final blackAcc = _analysis.accuracyBlack;
    final displayWhiteAcc = widget.initialGame != null ? '$whiteAcc%' : '92.4';
    final displayBlackAcc = widget.initialGame != null ? '$blackAcc%' : '78.1';
    final gameTitle = widget.initialGame?.result ?? '1-0';
    final opponentName = widget.initialGame != null
        ? (widget.initialGame!.playerColor == 'w' ? widget.initialGame!.blackPlayer : widget.initialGame!.whitePlayer)
        : 'Harmonic (1200)';

    return Scaffold(
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Top Header: Green chart mark + "Review" + Share & Insights
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(color: const Color(0xFF10B981).withAlpha(40), shape: BoxShape.circle),
                        child: const Icon(Icons.analytics, color: Color(0xFF10B981), size: 22),
                      ),
                      const SizedBox(width: 8),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Review', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                          Text(
                            _analysis.openingName.isNotEmpty ? _analysis.openingName : 'Analyze your game. Learn. Improve.',
                            style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.share_outlined, color: Colors.white, size: 20),
                        onPressed: () => HapticsService.light(),
                      ),
                      IconButton(
                        icon: const Icon(Icons.lightbulb_outline, color: Colors.white, size: 22),
                        onPressed: () {
                          HapticsService.light();
                          setState(() => _activeSubTab = ReviewSubTab.report);
                        },
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // 2. Match Summary Accuracy Card (You vs Opponent)
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF141A1F),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFF222F38)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // You (White)
                    Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF10B981), width: 2),
                          ),
                          child: const Center(child: Text('♟️', style: TextStyle(fontSize: 20))),
                        ),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(displayWhiteAcc, style: const TextStyle(color: Color(0xFF10B981), fontSize: 18, fontWeight: FontWeight.bold)),
                            const Text('Accuracy', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                            const Text('You', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                            const Text('1742 +18', style: TextStyle(color: Color(0xFF10B981), fontSize: 10)),
                          ],
                        ),
                      ],
                    ),

                    // Center Score & Date
                    Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withAlpha(30),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            gameTitle.contains('1-0') ? 'YOU WON ⭐' : (gameTitle.contains('0-1') ? 'YOU LOST' : 'DRAW 🤝'),
                            style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(gameTitle, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w900)),
                        const Text('Standard • 10 min', style: TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                        const Text('Today, 6:32 PM', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                      ],
                    ),

                    // Opponent (Black)
                    Row(
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(displayBlackAcc, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 18, fontWeight: FontWeight.bold)),
                            const Text('Accuracy', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                            Text(opponentName, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                            const Text('1200 -18', style: TextStyle(color: Color(0xFFEF4444), fontSize: 10)),
                          ],
                        ),
                        const SizedBox(width: 8),
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF64748B), width: 2),
                          ),
                          child: const Center(child: Text('🤖', style: TextStyle(fontSize: 20))),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // 3. Sub-Tab Navigation Strip: [Game Review] [Moments] [Analysis] [Report]
              Row(
                children: [
                  _buildSubTabPill(ReviewSubTab.gameReview, '⭐ Game Review'),
                  const SizedBox(width: 8),
                  _buildSubTabPill(ReviewSubTab.moments, '♟️ Moments ${_analysis.criticalMoments.length}'),
                  const SizedBox(width: 8),
                  _buildSubTabPill(ReviewSubTab.analysis, '🔍 Analysis'),
                  const SizedBox(width: 8),
                  _buildSubTabPill(ReviewSubTab.report, '📊 Report'),
                ],
              ),
              const SizedBox(height: 14),

              // VIEW 1: GAME REVIEW & ANALYSIS
              if (_activeSubTab == ReviewSubTab.gameReview || _activeSubTab == ReviewSubTab.analysis) ...[
                // Split Layout: Left Chessboard & Right Interactive Move List
                Container(
                  padding: const EdgeInsets.all(10),
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
                          // Left: Interactive Board
                          Expanded(
                            flex: 5,
                            child: AspectRatio(
                              aspectRatio: 1.0,
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: ChessBoardWidget(
                                  game: _boardGame,
                                  boardTheme: widget.settings.boardTheme,
                                  pieceTheme: widget.settings.pieceTheme,
                                  lastMoveFrom: curMove?.from,
                                  lastMoveTo: curMove?.to,
                                  arrows: _arrows,
                                  interactive: false,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),

                          // Right: Move List Panel
                          Expanded(
                            flex: 4,
                            child: Container(
                              height: 190,
                              decoration: BoxDecoration(
                                color: const Color(0xFF0D1217),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: const Color(0xFF222F38)),
                              ),
                              child: Column(
                                children: [
                                  // Header tab
                                  Container(
                                    padding: const EdgeInsets.symmetric(vertical: 4),
                                    decoration: const BoxDecoration(
                                      border: Border(bottom: BorderSide(color: Color(0xFF10B981), width: 2)),
                                    ),
                                    child: Center(
                                      child: Text(
                                        'Moves (${_analysis.moves.length})',
                                        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                  // Move list rows
                                  Expanded(
                                    child: ListView.builder(
                                      itemCount: (_analysis.moves.length / 2).ceil(),
                                      itemBuilder: (context, rowIdx) {
                                        final whiteIdx = rowIdx * 2;
                                        final blackIdx = whiteIdx + 1;

                                        final whiteMove = whiteIdx < _analysis.moves.length ? _analysis.moves[whiteIdx] : null;
                                        final blackMove = blackIdx < _analysis.moves.length ? _analysis.moves[blackIdx] : null;

                                        final isWhiteSelected = whiteIdx == _currentMoveIndex;
                                        final isBlackSelected = blackIdx == _currentMoveIndex;

                                        return Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                                          child: Row(
                                            children: [
                                              SizedBox(
                                                width: 20,
                                                child: Text('${rowIdx + 1}.', style: const TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                                              ),
                                              // White move
                                              Expanded(
                                                child: whiteMove != null
                                                    ? GestureDetector(
                                                        onTap: () => _goToMove(whiteIdx),
                                                        child: Container(
                                                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                                          decoration: BoxDecoration(
                                                            color: isWhiteSelected ? const Color(0xFF10B981).withAlpha(40) : Colors.transparent,
                                                            borderRadius: BorderRadius.circular(4),
                                                          ),
                                                          child: Text(
                                                            '${whiteMove.san} ${_getClassEmoji(whiteMove.classification)}',
                                                            style: TextStyle(
                                                              color: isWhiteSelected ? const Color(0xFF10B981) : Colors.white,
                                                              fontSize: 10,
                                                              fontWeight: isWhiteSelected ? FontWeight.bold : FontWeight.normal,
                                                            ),
                                                          ),
                                                        ),
                                                      )
                                                    : const SizedBox(),
                                              ),
                                              // Black move
                                              Expanded(
                                                child: blackMove != null
                                                    ? GestureDetector(
                                                        onTap: () => _goToMove(blackIdx),
                                                        child: Container(
                                                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                                          decoration: BoxDecoration(
                                                            color: isBlackSelected ? const Color(0xFF10B981).withAlpha(40) : Colors.transparent,
                                                            borderRadius: BorderRadius.circular(4),
                                                          ),
                                                          child: Text(
                                                            '${blackMove.san} ${_getClassEmoji(blackMove.classification)}',
                                                            style: TextStyle(
                                                              color: isBlackSelected ? const Color(0xFF10B981) : Colors.white,
                                                              fontSize: 10,
                                                              fontWeight: isBlackSelected ? FontWeight.bold : FontWeight.normal,
                                                            ),
                                                          ),
                                                        ),
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
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      // Forward / Backward Replay Controls
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.first_page, color: Colors.white, size: 20),
                            onPressed: () => _goToMove(0),
                          ),
                          IconButton(
                            icon: const Icon(Icons.chevron_left, color: Colors.white, size: 24),
                            onPressed: () => _goToMove(_currentMoveIndex - 1),
                          ),
                          Text(
                            'Ply ${_currentMoveIndex + 1} / ${_analysis.moves.length}',
                            style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                          IconButton(
                            icon: const Icon(Icons.chevron_right, color: Colors.white, size: 24),
                            onPressed: () => _goToMove(_currentMoveIndex + 1),
                          ),
                          IconButton(
                            icon: const Icon(Icons.last_page, color: Colors.white, size: 20),
                            onPressed: () => _goToMove(_analysis.moves.length - 1),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // 4. Centipawn Evaluation Bar
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF141A1F),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFF222F38)),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(color: const Color(0xFF10B981).withAlpha(40), borderRadius: BorderRadius.circular(4)),
                            child: Text(
                              curMove != null
                                  ? '${curMove.color == 'w' ? '+' : '-'}${(curMove.centipawnLoss / 100).toStringAsFixed(1)}'
                                  : '+1.24',
                              style: const TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      SizedBox(
                        height: 24,
                        child: CustomPaint(
                          painter: _DynamicEvalTimelinePainter(
                            moves: _analysis.moves,
                            currentIndex: _currentMoveIndex,
                          ),
                          size: const Size(double.infinity, 24),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // 5. Move Feedback Card
                if (curMove != null)
                  Container(
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
                          decoration: BoxDecoration(color: _getClassColor(curMove.classification).withAlpha(40), shape: BoxShape.circle),
                          child: Text(_getClassEmoji(curMove.classification), style: const TextStyle(fontSize: 16)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    '${curMove.san} • ${_getClassTitle(curMove.classification)}',
                                    style: TextStyle(color: _getClassColor(curMove.classification), fontSize: 13, fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    '${curMove.color == 'w' ? '+' : '-'}${(curMove.centipawnLoss / 100).toStringAsFixed(1)}',
                                    style: const TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              Text(
                                curMove.coachExplanation,
                                style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        TextButton.icon(
                          style: TextButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            backgroundColor: _showingEngineLine ? const Color(0xFF10B981) : const Color(0xFF222F38),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          ),
                          icon: Icon(Icons.visibility_outlined, size: 12, color: _showingEngineLine ? Colors.black : Colors.white),
                          label: Text(
                            _showingEngineLine ? 'Line On' : 'Show Line',
                            style: TextStyle(color: _showingEngineLine ? Colors.black : Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                          onPressed: _toggleEngineLine,
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 14),

                // 6. Classification Count Chips (Brilliant, Best, Excellent, Inaccuracy, Mistake, Blunder)
                Row(
                  children: [
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.brilliant] ?? 0}', 'Brilliant', const Color(0xFF38BDF8)),
                    const SizedBox(width: 6),
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.best] ?? 0}', 'Best Moves', const Color(0xFF10B981)),
                    const SizedBox(width: 6),
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.excellent] ?? 0}', 'Excellent', const Color(0xFF22C55E)),
                    const SizedBox(width: 6),
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.inaccuracy] ?? 0}', 'Inaccuracies', const Color(0xFFF59E0B)),
                    const SizedBox(width: 6),
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.mistake] ?? 0}', 'Mistakes', const Color(0xFFF97316)),
                    const SizedBox(width: 6),
                    _buildClassPill('${_analysis.whiteClassifications[MoveClassification.blunder] ?? 0}', 'Blunders', const Color(0xFFEF4444)),
                  ],
                ),
                const SizedBox(height: 20),

                // 7. Top Moments Section
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Top Moments', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                    GestureDetector(
                      onTap: () => setState(() => _activeSubTab = ReviewSubTab.moments),
                      child: const Text('View All Moments →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                if (_analysis.criticalMoments.isNotEmpty)
                  ..._analysis.criticalMoments.take(3).map((moment) {
                    final move = moment.ply > 0 && moment.ply <= _analysis.moves.length ? _analysis.moves[moment.ply - 1] : null;
                    final isWhite = move?.color == 'w';
                    final cl = move?.classification ?? MoveClassification.mistake;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: GestureDetector(
                        onTap: () {
                          if (moment.ply > 0 && moment.ply <= _analysis.moves.length) {
                            _goToMove(moment.ply - 1);
                          }
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
                                decoration: BoxDecoration(color: _getClassColor(cl).withAlpha(30), shape: BoxShape.circle),
                                child: Text(_getClassEmoji(cl), style: const TextStyle(fontSize: 16)),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text('${move?.moveNumber ?? 1}. ${isWhite ? "" : "... "}${move?.san ?? ""}', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                                        const SizedBox(width: 6),
                                        Text(_getClassTitle(cl), style: TextStyle(color: _getClassColor(cl), fontSize: 11, fontWeight: FontWeight.bold)),
                                      ],
                                    ),
                                    const SizedBox(height: 2),
                                    Text(moment.description, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                                  ],
                                ),
                              ),
                              Text(
                                '${moment.swing > 0 ? "+" : ""}${(moment.swing / 100).toStringAsFixed(1)}',
                                style: TextStyle(color: _getClassColor(cl), fontSize: 13, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(width: 6),
                              const Icon(Icons.chevron_right, color: Color(0xFF64748B), size: 16),
                            ],
                          ),
                        ),
                      ),
                    );
                  })
                else
                  const Padding(
                    padding: EdgeInsets.all(12),
                    child: Text('No major blunders detected in this game! Clean play.', style: TextStyle(color: Color(0xFF10B981))),
                  ),
              ],

              // VIEW 2: CRITICAL MOMENTS INTERACTIVE DRILL
              if (_activeSubTab == ReviewSubTab.moments) ...[
                if (_analysis.criticalMoments.isNotEmpty) ...[
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF141A1F),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFF222F38)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Critical Moment ${_currentMomentIndex + 1} of ${_analysis.criticalMoments.length}',
                              style: const TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold),
                            ),
                            Row(
                              children: [
                                IconButton(
                                  icon: const Icon(Icons.chevron_left, color: Colors.white),
                                  onPressed: _currentMomentIndex > 0 ? () => setState(() => _currentMomentIndex--) : null,
                                ),
                                IconButton(
                                  icon: const Icon(Icons.chevron_right, color: Colors.white),
                                  onPressed: _currentMomentIndex < _analysis.criticalMoments.length - 1 ? () => setState(() => _currentMomentIndex++) : null,
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _analysis.criticalMoments[_currentMomentIndex].description,
                          style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Builder(
                          builder: (context) {
                            final m = _analysis.criticalMoments[_currentMomentIndex];
                            final critMove = m.ply > 0 && m.ply <= _analysis.moves.length ? _analysis.moves[m.ply - 1] : null;
                            if (critMove?.bestMoveSan != null) {
                              return Text(
                                'Engine Solution: ${critMove!.bestMoveSan}',
                                style: const TextStyle(color: Color(0xFF38BDF8), fontSize: 12, fontWeight: FontWeight.bold),
                              );
                            }
                            return const SizedBox();
                          },
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            foregroundColor: Colors.black,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          ),
                          icon: const Icon(Icons.visibility),
                          label: const Text('Jump to this position on board', style: TextStyle(fontWeight: FontWeight.bold)),
                          onPressed: () {
                            final m = _analysis.criticalMoments[_currentMomentIndex];
                            if (m.ply > 0 && m.ply <= _analysis.moves.length) {
                              _goToMove(m.ply - 1);
                              setState(() => _activeSubTab = ReviewSubTab.gameReview);
                            }
                          },
                        ),
                      ],
                    ),
                  ),
                ] else ...[
                  const Center(child: Text('Zero critical moments found. Flawless tactical execution!', style: TextStyle(color: Colors.white))),
                ],
              ],

              // VIEW 3: MATCH REPORT & COACH TAKEAWAYS
              if (_activeSubTab == ReviewSubTab.report) ...[
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF141A1F),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF222F38)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Game Narrative', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Text(
                        _analysis.gameNarrative,
                        style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12, height: 1.5),
                      ),
                      const SizedBox(height: 16),
                      const Text('Key Takeaways & Lessons', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      ..._analysis.keyTakeaways.map((t) => Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('💡 ', style: TextStyle(fontSize: 12)),
                                Expanded(child: Text(t, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11, height: 1.4))),
                              ],
                            ),
                          )),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSubTabPill(ReviewSubTab tab, String label) {
    final isSel = _activeSubTab == tab;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          HapticsService.light();
          setState(() => _activeSubTab = tab);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSel ? const Color(0xFF10B981).withAlpha(40) : const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: isSel ? const Color(0xFF10B981) : const Color(0xFF222F38)),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: isSel ? const Color(0xFF10B981) : const Color(0xFF94A3B8),
                fontSize: 10,
                fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildClassPill(String count, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 2),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF222F38)),
        ),
        child: Column(
          children: [
            Text(count, style: TextStyle(color: color, fontSize: 13, fontWeight: FontWeight.bold)),
            Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 8), maxLines: 1, overflow: TextOverflow.ellipsis),
          ],
        ),
      ),
    );
  }

  Color _getClassColor(MoveClassification cl) {
    switch (cl) {
      case MoveClassification.brilliant:
        return const Color(0xFF38BDF8);
      case MoveClassification.great:
      case MoveClassification.best:
        return const Color(0xFF10B981);
      case MoveClassification.excellent:
      case MoveClassification.good:
        return const Color(0xFF22C55E);
      case MoveClassification.inaccuracy:
        return const Color(0xFFF59E0B);
      case MoveClassification.mistake:
        return const Color(0xFFF97316);
      case MoveClassification.blunder:
      case MoveClassification.missedWin:
        return const Color(0xFFEF4444);
      case MoveClassification.book:
        return const Color(0xFFA855F7);
    }
  }

  String _getClassTitle(MoveClassification cl) {
    switch (cl) {
      case MoveClassification.brilliant:
        return 'Brilliant!';
      case MoveClassification.great:
        return 'Great Move';
      case MoveClassification.best:
        return 'Best Move';
      case MoveClassification.excellent:
        return 'Excellent';
      case MoveClassification.good:
        return 'Good';
      case MoveClassification.inaccuracy:
        return 'Inaccuracy';
      case MoveClassification.mistake:
        return 'Mistake';
      case MoveClassification.blunder:
        return 'Blunder';
      case MoveClassification.missedWin:
        return 'Missed Win';
      case MoveClassification.book:
        return 'Book Move';
    }
  }

  String _getClassEmoji(MoveClassification cl) {
    switch (cl) {
      case MoveClassification.brilliant:
        return '💎';
      case MoveClassification.great:
        return '✨';
      case MoveClassification.best:
        return '⭐';
      case MoveClassification.excellent:
        return '✓';
      case MoveClassification.good:
        return '👍';
      case MoveClassification.inaccuracy:
        return '⁉️';
      case MoveClassification.mistake:
        return '❓';
      case MoveClassification.blunder:
        return '❓❓';
      case MoveClassification.missedWin:
        return '✖️';
      case MoveClassification.book:
        return '📖';
    }
  }
}

class _DynamicEvalTimelinePainter extends CustomPainter {
  final List<MoveAnalysis> moves;
  final int currentIndex;

  _DynamicEvalTimelinePainter({required this.moves, required this.currentIndex});

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final mid = h / 2;

    // Center line
    final linePaint = Paint()
      ..color = const Color(0xFF222F38)
      ..strokeWidth = 1.0;
    canvas.drawLine(Offset(0, mid), Offset(w, mid), linePaint);

    if (moves.isEmpty) return;

    final step = w / max(1, moves.length - 1);
    final path = Path();
    path.moveTo(0, mid);

    for (int i = 0; i < moves.length; i++) {
      final m = moves[i];
      final cp = m.color == 'w' ? -m.centipawnLoss : m.centipawnLoss;
      final normY = (mid + (cp / 400.0) * (h / 2)).clamp(2.0, h - 2.0);
      path.lineTo(i * step, normY);
    }

    final strokePaint = Paint()
      ..color = const Color(0xFF10B981)
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, strokePaint);

    // Scrubber line at currentIndex
    final scrubberX = (currentIndex * step).clamp(0.0, w);
    final scrubberPaint = Paint()
      ..color = Colors.white
      ..strokeWidth = 2.0;
    canvas.drawLine(Offset(scrubberX, 0), Offset(scrubberX, h), scrubberPaint);
    canvas.drawCircle(Offset(scrubberX, mid), 3.0, Paint()..color = const Color(0xFF10B981));
  }

  @override
  bool shouldRepaint(covariant _DynamicEvalTimelinePainter oldDelegate) =>
      oldDelegate.currentIndex != currentIndex || oldDelegate.moves.length != moves.length;
}
