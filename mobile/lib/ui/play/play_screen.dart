import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../models/engine_config.dart';
import '../../engine/minimax_isolate.dart';
import '../../services/haptics_service.dart';
import '../../services/notification_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../board/chess_board_widget.dart';
import '../board/staunton_pieces.dart';

class PlayScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(GameRecord record)? onReviewGame;

  const PlayScreen({
    super.key,
    required this.settings,
    this.onReviewGame,
  });

  @override
  State<PlayScreen> createState() => _PlayScreenState();
}

class _PlayScreenState extends State<PlayScreen> {
  // Game state
  bool _isPlaying = false;
  bool _isPassAndPlay = false;
  int _difficultyLevel = 3; // Casual 1000 Elo default
  AIPersonalityId _personality = AIPersonalityId.balanced;
  SideSelection _sideSelection = SideSelection.white;
  PlayerColor _playerColor = PlayerColor.white;
  TimeControlConfig _timeControl = TIME_CONTROLS[1]; // 3+2 Blitz
  bool _flipped = false;

  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom;
  String? _lastMoveTo;
  bool _isAIThinking = false;
  List<String> _moveSans = [];

  // Clocks
  int _whiteTimeSec = 180;
  int _blackTimeSec = 180;
  Timer? _clockTimer;

  // Material and captured pieces
  List<String> _whiteCaptured = [];
  List<String> _blackCaptured = [];
  int _materialDifference = 0;

  @override
  void dispose() {
    _clockTimer?.cancel();
    super.dispose();
  }

  void _startNewGame() {
    _clockTimer?.cancel();
    _game = chess.Chess();
    _lastMoveFrom = null;
    _lastMoveTo = null;
    _moveSans = [];
    _whiteCaptured = [];
    _blackCaptured = [];
    _materialDifference = 0;

    if (_sideSelection == SideSelection.random) {
      _playerColor = Random().nextBool() ? PlayerColor.white : PlayerColor.black;
    } else if (_sideSelection == SideSelection.white) {
      _playerColor = PlayerColor.white;
    } else {
      _playerColor = PlayerColor.black;
    }

    _flipped = _playerColor == PlayerColor.black;

    final baseSec = _timeControl.baseMinutes * 60;
    _whiteTimeSec = baseSec;
    _blackTimeSec = baseSec;

    setState(() {
      _isPlaying = true;
    });

    if (_timeControl.baseMinutes > 0) {
      _startClock();
    }

    // If AI is White, trigger AI move
    if (!_isPassAndPlay && _playerColor == PlayerColor.black) {
      _triggerAIMove();
    }
  }

  void _startClock() {
    _clockTimer?.cancel();
    _clockTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!_isPlaying) {
        timer.cancel();
        return;
      }
      setState(() {
        if (_game.turn == chess.Color.WHITE) {
          if (_whiteTimeSec > 0) {
            _whiteTimeSec--;
          } else {
            _handleGameOver('0-1', 'timeout', 'Black won on time');
          }
        } else {
          if (_blackTimeSec > 0) {
            _blackTimeSec--;
          } else {
            _handleGameOver('1-0', 'timeout', 'White won on time');
          }
        }
      });
    });
  }

  void _onPlayerMove(String from, String to, String? promotion) {
    _lastMoveFrom = from;
    _lastMoveTo = to;
    _moveSans.add(_game.getHistory().last.toString());

    // Increment clock
    if (_timeControl.incrementSeconds > 0) {
      if (_game.turn == chess.Color.BLACK) {
        _whiteTimeSec += _timeControl.incrementSeconds;
      } else {
        _blackTimeSec += _timeControl.incrementSeconds;
      }
    }

    _updateMaterial();

    if (_checkGameOver()) return;

    if (!_isPassAndPlay) {
      _triggerAIMove();
    }
  }

  Future<void> _triggerAIMove() async {
    setState(() {
      _isAIThinking = true;
    });

    try {
      final req = AIMoveRequest(
        fen: _game.fen,
        level: _difficultyLevel,
        personality: _personality,
        moveSans: _moveSans,
      );

      final res = await EngineService.getBestMove(req);

      if (!_isPlaying) return;

      final targetPiece = _game.get(res.to);
      final isCapture = targetPiece != null;

      final success = _game.move({
        'from': res.from,
        'to': res.to,
        if (res.promotion != null) 'promotion': res.promotion,
      });

      if (success) {
        _lastMoveFrom = res.from;
        _lastMoveTo = res.to;
        _moveSans.add(res.san);

        if (isCapture) {
          SoundService.playCapture();
          HapticsService.medium();
        } else {
          SoundService.playMove();
          HapticsService.light();
        }

        if (_game.in_check) {
          SoundService.playCheck();
          HapticsService.heavy();
        }

        if (_timeControl.incrementSeconds > 0) {
          if (_game.turn == chess.Color.WHITE) {
            _blackTimeSec += _timeControl.incrementSeconds;
          } else {
            _whiteTimeSec += _timeControl.incrementSeconds;
          }
        }

        _updateMaterial();
        _checkGameOver();
      }
    } catch (_) {
      // Fallback
    } finally {
      if (mounted) {
        setState(() {
          _isAIThinking = false;
        });
      }
    }
  }

  void _updateMaterial() {
    const startingCounts = {'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1};
    final currentCounts = {
      'w': {'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0},
      'b': {'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0},
    };

    for (int r = 1; r <= 8; r++) {
      for (int f = 0; f < 8; f++) {
        final sq = String.fromCharCode('a'.codeUnitAt(0) + f) + r.toString();
        final p = _game.get(sq);
        if (p != null && p.type != chess.PieceType.KING) {
          final colorCode = p.color == chess.Color.WHITE ? 'w' : 'b';
          final typeCode = p.type.name.toLowerCase();
          currentCounts[colorCode]![typeCode] = (currentCounts[colorCode]![typeCode] ?? 0) + 1;
        }
      }
    }

    final wCap = <String>[];
    final bCap = <String>[];

    startingCounts.forEach((pt, count) {
      final missingW = count - (currentCounts['w']![pt] ?? 0);
      final missingB = count - (currentCounts['b']![pt] ?? 0);
      for (int i = 0; i < missingW; i++) {
        bCap.add(pt);
      }
      for (int i = 0; i < missingB; i++) {
        wCap.add(pt);
      }
    });

    int wVal = 0;
    int bVal = 0;
    const vals = {'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9};
    vals.forEach((pt, v) {
      wVal += (currentCounts['w']![pt] ?? 0) * v;
      bVal += (currentCounts['b']![pt] ?? 0) * v;
    });

    setState(() {
      _whiteCaptured = wCap;
      _blackCaptured = bCap;
      _materialDifference = wVal - bVal;
    });
  }

  bool _checkGameOver() {
    if (_game.in_checkmate) {
      final winner = _game.turn == chess.Color.WHITE ? '0-1' : '1-0';
      _handleGameOver(winner, 'checkmate', 'Checkmate');
      return true;
    } else if (_game.in_stalemate) {
      _handleGameOver('1/2-1/2', 'stalemate', 'Draw by Stalemate');
      return true;
    } else if (_game.in_threefold_repetition) {
      _handleGameOver('1/2-1/2', 'threefold', 'Draw by Threefold Repetition');
      return true;
    } else if (_game.insufficient_material) {
      _handleGameOver('1/2-1/2', 'insufficient', 'Draw by Insufficient Material');
      return true;
    }
    return false;
  }

  void _handleGameOver(String result, String reason, String details) {
    _clockTimer?.cancel();
    setState(() {
      _isPlaying = false;
    });

    SoundService.playVictory();
    HapticsService.vibrate();

    final diff = DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel, orElse: () => DIFFICULTY_LEVELS[2]);
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);

    final record = GameRecord(
      id: 'game_${DateTime.now().millisecondsSinceEpoch}',
      date: DateTime.now().toIso8601String(),
      pgn: _game.pgn(),
      finalFen: _game.fen,
      result: result,
      winner: result == '1-0' ? 'white' : (result == '0-1' ? 'black' : 'draw'),
      reason: reason,
      playerColor: _playerColor.code,
      difficultyLevel: _difficultyLevel,
      personality: _personality,
      timeControl: _timeControl.label,
      whitePlayer: _isPassAndPlay ? 'Player 1' : (_playerColor == PlayerColor.white ? 'You' : pers.name),
      blackPlayer: _isPassAndPlay ? 'Player 2' : (_playerColor == PlayerColor.black ? 'You' : pers.name),
      whiteElo: _playerColor == PlayerColor.white ? 1200 : diff.elo,
      blackElo: _playerColor == PlayerColor.black ? 1200 : diff.elo,
      movesCount: _moveSans.length,
    );

    StorageService.saveGame(record);

    // Schedule notification alert
    NotificationService.scheduleDailyPracticeNotifications(enabled: widget.settings.dailyNotificationEnabled);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF18181B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Column(
          children: [
            Text(
              result == '1/2-1/2' ? '🤝 Draw' : (result == '1-0' && _playerColor == PlayerColor.white || result == '0-1' && _playerColor == PlayerColor.black ? '🏆 Victory!' : '💔 Defeat'),
              style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(details, style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 14)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              decoration: BoxDecoration(
                color: const Color(0xFF27272A),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      const Text('Result', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                      Text(result, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Column(
                    children: [
                      const Text('Moves', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                      Text('${_moveSans.length}', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              setState(() {
                _isPlaying = false;
              });
            },
            child: const Text('Play Lobby', style: TextStyle(color: Color(0xFFA1A1AA))),
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            icon: const Icon(Icons.analytics_outlined, size: 18),
            label: const Text('Coach Review'),
            onPressed: () {
              Navigator.of(ctx).pop();
              widget.onReviewGame?.call(record);
            },
          ),
        ],
      ),
    );
  }

  String _formatClock(int totalSec) {
    final m = totalSec ~/ 60;
    final s = totalSec % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF18181B),
        title: Row(
          children: [
            const Text('♟️ Apex Chess', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            const Spacer(),
            if (_isPlaying) ...[
              IconButton(
                icon: const Icon(Icons.flip_camera_android, size: 20),
                tooltip: 'Flip Board',
                onPressed: () => setState(() => _flipped = !_flipped),
              ),
              IconButton(
                icon: const Icon(Icons.flag_outlined, size: 20, color: Color(0xFFEF4444)),
                tooltip: 'Resign',
                onPressed: () => _handleGameOver(_playerColor == PlayerColor.white ? '0-1' : '1-0', 'resignation', 'Resigned'),
              ),
            ],
          ],
        ),
      ),
      body: SafeArea(
        child: _isPlaying ? _buildActiveGameView() : _buildPlayLobby(),
      ),
    );
  }

  Widget _buildPlayLobby() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF3B82F6).withAlpha(40),
                    shape: BoxShape.circle,
                  ),
                  child: const Text('♟️', style: TextStyle(fontSize: 28)),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Apex Chess Master', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                      SizedBox(height: 4),
                      Text('Pure Dart Minimax AI in Background Isolates', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // 1. Difficulty Level Selector
          const Text('BOT DIFFICULTY', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF18181B),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF27272A)),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel).name,
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: Color(int.parse(DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel).badgeColor)),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        'Level $_difficultyLevel',
                        style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
                Slider(
                  value: _difficultyLevel.toDouble(),
                  min: 1,
                  max: 10,
                  divisions: 9,
                  activeColor: const Color(0xFF10B981),
                  inactiveColor: const Color(0xFF3F3F46),
                  onChanged: (v) => setState(() => _difficultyLevel = v.toInt()),
                ),
                Text(
                  DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel).description,
                  style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // 2. Personality Selector
          const Text('BOT PERSONALITY', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
          const SizedBox(height: 8),
          Row(
            children: AI_PERSONALITIES.map((p) {
              final isSelected = p.id == _personality;
              return Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _personality = p.id),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFF27272A) : const Color(0xFF18181B),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: isSelected ? const Color(0xFF3B82F6) : const Color(0xFF27272A), width: 1.5),
                    ),
                    child: Column(
                      children: [
                        Text(p.avatar, style: const TextStyle(fontSize: 22)),
                        const SizedBox(height: 4),
                        Text(p.name.split(' ').first, style: TextStyle(color: isSelected ? Colors.white : const Color(0xFFA1A1AA), fontSize: 11, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 20),

          // 3. Side & Mode Selection
          const Text('PLAY AS & MODE', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: SegmentedButton<SideSelection>(
                  segments: const [
                    ButtonSegment(value: SideSelection.white, label: Text('White ♔')),
                    ButtonSegment(value: SideSelection.random, label: Text('🎲')),
                    ButtonSegment(value: SideSelection.black, label: Text('Black ♚')),
                  ],
                  selected: {_sideSelection},
                  onSelectionChanged: (set) => setState(() => _sideSelection = set.first),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('2-Player Pass & Play', style: TextStyle(color: Colors.white, fontSize: 14)),
            subtitle: const Text('Play with a friend locally on the same phone', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
            value: _isPassAndPlay,
            activeColor: const Color(0xFF10B981),
            onChanged: (v) => setState(() => _isPassAndPlay = v),
          ),
          const SizedBox(height: 12),

          // 4. Time Controls
          const Text('TIME CONTROL', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: TIME_CONTROLS.map((tc) {
              final isSel = tc.id == _timeControl.id;
              return ChoiceChip(
                label: Text(tc.label),
                selected: isSel,
                selectedColor: const Color(0xFF10B981),
                labelStyle: TextStyle(color: isSel ? Colors.white : const Color(0xFFA1A1AA), fontWeight: isSel ? FontWeight.bold : FontWeight.normal),
                backgroundColor: const Color(0xFF18181B),
                onSelected: (selected) {
                  if (selected) setState(() => _timeControl = tc);
                },
              );
            }).toList(),
          ),
          const SizedBox(height: 32),

          // Start Button
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              icon: const Icon(Icons.play_arrow_rounded, size: 28),
              label: const Text('START GAME', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
              onPressed: _startNewGame,
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildActiveGameView() {
    final isWhiteTurn = _game.turn == chess.Color.WHITE;
    final opponentIsWhite = _playerColor == PlayerColor.black;
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);

    return Column(
      children: [
        // 1. Top Player Card (Opponent)
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: const Color(0xFF18181B),
          child: Row(
            children: [
              Text(pers.avatar, style: const TextStyle(fontSize: 24)),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _isPassAndPlay ? 'Player 2' : pers.name,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  Text(
                    'Level $_difficultyLevel (${DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel).elo} Elo)',
                    style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 11),
                  ),
                ],
              ),
              const Spacer(),
              // Captured pieces tally
              Row(
                children: (opponentIsWhite ? _whiteCaptured : _blackCaptured).take(5).map((pt) {
                  return ChessPieceWidget(type: pt, color: opponentIsWhite ? 'b' : 'w', size: 16);
                }).toList(),
              ),
              const SizedBox(width: 8),
              // Clock
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: !isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B).withAlpha(40) : const Color(0xFF27272A),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  _timeControl.baseMinutes > 0 ? _formatClock(opponentIsWhite ? _whiteTimeSec : _blackTimeSec) : '∞',
                  style: TextStyle(
                    color: !isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B) : Colors.white,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'monospace',
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),

        // 2. Center Chessboard
        Expanded(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  ChessBoardWidget(
                    game: _game,
                    flipped: _flipped,
                    boardTheme: widget.settings.boardTheme,
                    pieceTheme: widget.settings.pieceTheme,
                    interactive: !_isAIThinking,
                    lastMoveFrom: _lastMoveFrom,
                    lastMoveTo: _lastMoveTo,
                    onMove: _onPlayerMove,
                  ),
                  if (_isAIThinking)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.black.withAlpha(200),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFF3B82F6)),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)),
                          SizedBox(width: 10),
                          Text('AI Calculating...', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),

        // 3. Bottom Player Card (User)
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: const Color(0xFF18181B),
          child: Row(
            children: [
              const CircleAvatar(
                radius: 14,
                backgroundColor: Color(0xFF10B981),
                child: Text('👤', style: TextStyle(fontSize: 14)),
              ),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _isPassAndPlay ? 'Player 1' : 'You',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  Text(
                    'Elo ${StorageService.loadStats().rating}',
                    style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 11),
                  ),
                ],
              ),
              const Spacer(),
              Row(
                children: (!opponentIsWhite ? _whiteCaptured : _blackCaptured).take(5).map((pt) {
                  return ChessPieceWidget(type: pt, color: !opponentIsWhite ? 'b' : 'w', size: 16);
                }).toList(),
              ),
              if (_materialDifference != 0) ...[
                const SizedBox(width: 4),
                Text(
                  '${_materialDifference > 0 ? "+" : ""}$_materialDifference',
                  style: TextStyle(
                    color: (_playerColor == PlayerColor.white ? _materialDifference > 0 : _materialDifference < 0) ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B).withAlpha(40) : const Color(0xFF27272A),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  _timeControl.baseMinutes > 0 ? _formatClock(!opponentIsWhite ? _whiteTimeSec : _blackTimeSec) : '∞',
                  style: TextStyle(
                    color: isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B) : Colors.white,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'monospace',
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),

        // 4. Move history horizontal ribbon
        Container(
          height: 38,
          color: const Color(0xFF09090B),
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _moveSans.length,
            itemBuilder: (context, index) {
              final isWhiteMove = index % 2 == 0;
              final moveNum = (index ~/ 2) + 1;
              return Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Text(
                    isWhiteMove ? '$moveNum. ${_moveSans[index]}' : _moveSans[index],
                    style: TextStyle(
                      color: index == _moveSans.length - 1 ? const Color(0xFFF59E0B) : const Color(0xFFA1A1AA),
                      fontWeight: index == _moveSans.length - 1 ? FontWeight.bold : FontWeight.normal,
                      fontSize: 13,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
