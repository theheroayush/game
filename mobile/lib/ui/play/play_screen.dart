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

enum PlayModeType { vsAI, online, local }

class PlayScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(GameRecord record)? onReviewGame;
  final VoidCallback? onOpenNotifications;

  const PlayScreen({
    super.key,
    required this.settings,
    this.onReviewGame,
    this.onOpenNotifications,
  });

  @override
  State<PlayScreen> createState() => _PlayScreenState();
}

class _PlayScreenState extends State<PlayScreen> {
  // Game state
  bool _isPlaying = false;
  PlayModeType _modeType = PlayModeType.vsAI;
  bool _isPassAndPlay = false;
  int _difficultyLevel = 4; // 1200 Elo default
  AIPersonalityId _personality = AIPersonalityId.balanced;
  SideSelection _sideSelection = SideSelection.white;
  PlayerColor _playerColor = PlayerColor.white;
  TimeControlConfig _timeControl = TIME_CONTROLS[3]; // 10 min Rapid
  bool _flipped = false;

  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom;
  String? _lastMoveTo;
  bool _isAIThinking = false;
  List<String> _moveSans = [];

  // Clocks
  int _whiteTimeSec = 600;
  int _blackTimeSec = 600;
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
      _isPassAndPlay = _modeType == PlayModeType.local;
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

    final diff = DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel, orElse: () => DIFFICULTY_LEVELS[3]);
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
      whiteElo: _playerColor == PlayerColor.white ? 1742 : diff.elo,
      blackElo: _playerColor == PlayerColor.black ? 1742 : diff.elo,
      movesCount: _moveSans.length,
    );

    StorageService.saveGame(record);

    NotificationService.scheduleDailyPracticeNotifications(
      enabled: widget.settings.dailyNotificationEnabled,
      hour: widget.settings.notificationHour,
      minute: widget.settings.notificationMinute,
    );

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF141A1F),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFF222F38))),
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
                color: const Color(0xFF1F2937),
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

  void _openCustomizeSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF141A1F),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (context, setSheetState) => Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Game Setup', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(ctx)),
                ],
              ),
              const SizedBox(height: 12),
              const Text('SIDE SELECTION', style: TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Row(
                children: [
                  _buildSideChoice(SideSelection.white, 'White ♔', setSheetState),
                  const SizedBox(width: 8),
                  _buildSideChoice(SideSelection.random, 'Random 🎲', setSheetState),
                  const SizedBox(width: 8),
                  _buildSideChoice(SideSelection.black, 'Black ♚', setSheetState),
                ],
              ),
              const SizedBox(height: 16),
              const Text('TIME CONTROL', style: TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold)),
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
                    backgroundColor: const Color(0xFF222F38),
                    labelStyle: TextStyle(color: isSel ? Colors.white : const Color(0xFFA1A1AA)),
                    onSelected: (selected) {
                      if (selected) {
                        setState(() => _timeControl = tc);
                        setSheetState(() {});
                      }
                    },
                  );
                }).toList(),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSideChoice(SideSelection side, String label, StateSetter setSheetState) {
    final isSel = _sideSelection == side;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() => _sideSelection = side);
          setSheetState(() {});
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSel ? const Color(0xFF10B981) : const Color(0xFF222F38),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(color: isSel ? Colors.white : const Color(0xFFA1A1AA), fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),
        ),
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
      backgroundColor: const Color(0xFF090D0E),
      body: SafeArea(
        child: _isPlaying ? _buildActiveGameView() : _buildPlayHub(),
      ),
    );
  }

  // =================== PLAY HUB (SCREENSHOT 4) ===================
  Widget _buildPlayHub() {
    final diff = DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel, orElse: () => DIFFICULTY_LEVELS[3]);
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Header with Rating Badge and Notification Bell
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Play',
                    style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 2),
                  Text(
                    'Choose your opponent and start a game',
                    style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                  ),
                ],
              ),
              Row(
                children: [
                  // Crown rating pill
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFF141A1F),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFF222F38)),
                    ),
                    child: Row(
                      children: const [
                        Text('👑', style: TextStyle(fontSize: 14)),
                        SizedBox(width: 4),
                        Text(
                          '1742',
                          style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  // Bell
                  GestureDetector(
                    onTap: widget.onOpenNotifications,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF141A1F),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: const Color(0xFF222F38)),
                      ),
                      child: const Icon(Icons.notifications_outlined, color: Colors.white, size: 18),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),

          // 2. Segmented Mode Switcher: Play vs AI / Online / Local
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: const Color(0xFF141A1F),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF222F38)),
            ),
            child: Row(
              children: [
                _buildModePill(PlayModeType.vsAI, '🤖 Play vs AI'),
                _buildModePill(PlayModeType.online, '🌐 Online'),
                _buildModePill(PlayModeType.local, '👥 Local'),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 3. Hero Card: PLAY vs AI with glowing CTA
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F261F), Color(0xFF0D1E19), Color(0xFF0A1313)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF10B981).withAlpha(120), width: 1.5),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF10B981).withAlpha(30),
                  blurRadius: 18,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Column(
              children: [
                // Glowing King icon and Title
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withAlpha(40),
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text('♔', style: TextStyle(fontSize: 32, color: Color(0xFF10B981))),
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'PLAY',
                  style: TextStyle(
                    color: Color(0xFF10B981),
                    fontSize: 38,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 2.0,
                  ),
                ),
                const Text(
                  'vs AI',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Jump into a game. Anytime.',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF10B981),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      elevation: 6,
                      shadowColor: const Color(0xFF10B981).withAlpha(100),
                    ),
                    icon: const Icon(Icons.play_arrow, size: 24),
                    label: const Text('PLAY NOW', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                    onPressed: _startNewGame,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // 4. Quick Setup Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('QUICK SETUP', style: TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8)),
              GestureDetector(
                onTap: _openCustomizeSheet,
                child: const Text('Customize 🎛️', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              _buildSetupCard('Play As', _sideSelection == SideSelection.white ? 'White' : (_sideSelection == SideSelection.black ? 'Black' : 'Random'), '♔'),
              const SizedBox(width: 8),
              _buildSetupCard('Opponent', pers.name.split(' ').first, pers.avatar),
              const SizedBox(width: 8),
              _buildSetupCard('Difficulty', '${diff.elo}', '📊'),
              const SizedBox(width: 8),
              _buildSetupCard('Time Control', _timeControl.label, '⏱️'),
            ],
          ),
          const SizedBox(height: 20),

          // 5. AI Opponents Carousel
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('AI OPPONENTS', style: TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8)),
              Text('View All →', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _buildAIOpponentCard(
                  name: 'Harmonic',
                  role: 'Balanced',
                  elo: 1200,
                  avatarEmoji: '🤖',
                  avatarColor: const Color(0xFF10B981),
                  isSelected: _personality == AIPersonalityId.balanced,
                  onTap: () => setState(() {
                    _personality = AIPersonalityId.balanced;
                    _difficultyLevel = 4;
                  }),
                ),
                _buildAIOpponentCard(
                  name: 'Tactician',
                  role: 'Tactical',
                  elo: 1400,
                  avatarEmoji: '⚔️',
                  avatarColor: const Color(0xFF38BDF8),
                  isSelected: _personality == AIPersonalityId.tactical,
                  onTap: () => setState(() {
                    _personality = AIPersonalityId.tactical;
                    _difficultyLevel = 5;
                  }),
                ),
                _buildAIOpponentCard(
                  name: 'Berserker',
                  role: 'Aggressive',
                  elo: 1600,
                  avatarEmoji: '🔥',
                  avatarColor: const Color(0xFFEF4444),
                  isSelected: _personality == AIPersonalityId.aggressive,
                  onTap: () => setState(() {
                    _personality = AIPersonalityId.aggressive;
                    _difficultyLevel = 6;
                  }),
                ),
                _buildAIOpponentCard(
                  name: 'Fortress',
                  role: 'Defensive',
                  elo: 1300,
                  avatarEmoji: '🛡️',
                  avatarColor: const Color(0xFFA855F7),
                  isSelected: _personality == AIPersonalityId.positional,
                  onTap: () => setState(() {
                    _personality = AIPersonalityId.positional;
                    _difficultyLevel = 4;
                  }),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // 6. Daily Challenge Card
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
                  child: const Icon(Icons.track_changes, color: Color(0xFF10B981), size: 22),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('DAILY CHALLENGE', style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 2),
                      const Text('Win a game as Black', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      LinearProgressIndicator(
                        value: 0.5,
                        backgroundColor: const Color(0xFF222F38),
                        color: const Color(0xFF10B981),
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 14),
                Column(
                  children: const [
                    Text('Reward', style: TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                    SizedBox(height: 2),
                    Text('👑 25', style: TextStyle(color: Color(0xFF10B981), fontSize: 14, fontWeight: FontWeight.bold)),
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
    );
  }

  Widget _buildModePill(PlayModeType mode, String label) {
    final isSel = _modeType == mode;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          HapticsService.light();
          setState(() => _modeType = mode);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSel ? const Color(0xFF10B981).withAlpha(40) : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: isSel ? const Color(0xFF10B981) : Colors.transparent),
          ),
          child: Center(
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
      ),
    );
  }

  Widget _buildSetupCard(String label, String value, String icon) {
    return Expanded(
      child: GestureDetector(
        onTap: _openCustomizeSheet,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
          decoration: BoxDecoration(
            color: const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF222F38)),
          ),
          child: Column(
            children: [
              Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 9, fontWeight: FontWeight.bold), maxLines: 1),
              const SizedBox(height: 6),
              Text(icon, style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 4),
              Text(value, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold), maxLines: 1),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAIOpponentCard({
    required String name,
    required String role,
    required int elo,
    required String avatarEmoji,
    required Color avatarColor,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: () {
        HapticsService.light();
        onTap();
      },
      child: Container(
        width: 105,
        margin: const EdgeInsets.only(right: 10),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: const Color(0xFF141A1F),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected ? const Color(0xFF10B981) : const Color(0xFF222F38),
            width: isSelected ? 1.8 : 1.0,
          ),
        ),
        child: Column(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: avatarColor.withAlpha(30),
                shape: BoxShape.circle,
                border: Border.all(color: avatarColor.withAlpha(80)),
              ),
              child: Center(child: Text(avatarEmoji, style: const TextStyle(fontSize: 22))),
            ),
            const SizedBox(height: 8),
            Text(name, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
            Text(role, style: const TextStyle(color: Color(0xFF64748B), fontSize: 10)),
            const SizedBox(height: 4),
            Text('$elo', style: TextStyle(color: isSelected ? const Color(0xFF10B981) : const Color(0xFF94A3B8), fontSize: 11, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  // =================== ACTIVE MATCH VIEW ===================
  Widget _buildActiveGameView() {
    final isWhiteTurn = _game.turn == chess.Color.WHITE;
    final opponentIsWhite = _playerColor == PlayerColor.black;
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);

    return Column(
      children: [
        // 1. Top Player Card (Opponent)
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: const Color(0xFF141A1F),
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
              Row(
                children: (opponentIsWhite ? _whiteCaptured : _blackCaptured).take(5).map((pt) {
                  return ChessPieceWidget(type: pt, color: opponentIsWhite ? 'b' : 'w', size: 16);
                }).toList(),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: !isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B).withAlpha(40) : const Color(0xFF222F38),
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
                        border: Border.all(color: const Color(0xFF10B981)),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF10B981))),
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
          color: const Color(0xFF141A1F),
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
                  color: isWhiteTurn && _timeControl.baseMinutes > 0 ? const Color(0xFFF59E0B).withAlpha(40) : const Color(0xFF222F38),
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

        // 4. Move history ribbon + controls
        Container(
          height: 44,
          color: const Color(0xFF090D0E),
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.flip_camera_android, size: 18, color: Colors.white),
                onPressed: () => setState(() => _flipped = !_flipped),
              ),
              Expanded(
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
                            color: index == _moveSans.length - 1 ? const Color(0xFF10B981) : const Color(0xFFA1A1AA),
                            fontWeight: index == _moveSans.length - 1 ? FontWeight.bold : FontWeight.normal,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              IconButton(
                icon: const Icon(Icons.flag_outlined, size: 18, color: Color(0xFFEF4444)),
                onPressed: () => _handleGameOver(_playerColor == PlayerColor.white ? '0-1' : '1-0', 'resignation', 'Resigned'),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
