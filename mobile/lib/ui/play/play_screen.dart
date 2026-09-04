import 'dart:async';
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../models/engine_config.dart';
import '../../engine/minimax_isolate.dart';
import '../../services/haptics_service.dart';
import '../../services/notification_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../board/board_painter.dart';
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
  bool _isPlaying = true;
  bool _isPassAndPlay = false;
  int _difficultyLevel = 4; // Club Novice 1200 Elo matching reference
  AIPersonalityId _personality = AIPersonalityId.balanced; // Harmonic Engine
  PlayerColor _playerColor = PlayerColor.black; // Ayush at top with Black or bottom with White
  TimeControlConfig _timeControl = TIME_CONTROLS[3]; // 10+5 Rapid (10 mins)
  bool _flipped = false;
  bool _showCoordinates = true;
  late BoardThemeId _boardTheme;
  late PieceThemeId _pieceTheme;

  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom = 'g8';
  String? _lastMoveTo = 'f6';
  bool _isAIThinking = false;
  final List<String> _moveSans = ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6'];
  final List<BoardArrow> _arrows = [];
  int _hintsRemaining = 3;
  final List<Map<String, dynamic>> _redoStack = [];

  // Clocks: Initialized to match reference image (Ayush 09:24, Harmonic 09:31)
  int _whiteTimeSec = 571; // 09:31
  int _blackTimeSec = 564; // 09:24
  Timer? _clockTimer;

  // Material and captured pieces
  List<String> _whiteCaptured = [];
  List<String> _blackCaptured = [];
  int _materialDifference = 0;

  @override
  void initState() {
    super.initState();
    _boardTheme = widget.settings.boardTheme;
    _pieceTheme = widget.settings.pieceTheme;
    _showCoordinates = widget.settings.showCoordinates;

    _setupInitialGame();
    _startClock();
  }

  @override
  void dispose() {
    _clockTimer?.cancel();
    super.dispose();
  }

  void _setupInitialGame() {
    _game = chess.Chess();
    // Replay sample moves to create the active board shown in reference
    for (final san in ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6']) {
      _game.move(san);
    }
    _lastMoveFrom = 'g8';
    _lastMoveTo = 'f6';
    _updateMaterial();
  }

  void _startNewGame({
    int? difficultyLevel,
    AIPersonalityId? personality,
    PlayerColor? playerColor,
    TimeControlConfig? timeControl,
    bool? isPassAndPlay,
  }) {
    _clockTimer?.cancel();
    _game = chess.Chess();
    _lastMoveFrom = null;
    _lastMoveTo = null;
    _moveSans.clear();
    _arrows.clear();
    _redoStack.clear();
    _hintsRemaining = 3;
    _whiteCaptured.clear();
    _blackCaptured.clear();
    _materialDifference = 0;

    if (difficultyLevel != null) _difficultyLevel = difficultyLevel;
    if (personality != null) _personality = personality;
    if (playerColor != null) _playerColor = playerColor;
    if (timeControl != null) _timeControl = timeControl;
    if (isPassAndPlay != null) _isPassAndPlay = isPassAndPlay;

    _flipped = _playerColor == PlayerColor.black;

    final baseSec = _timeControl.baseMinutes > 0 ? _timeControl.baseMinutes * 60 : 0;
    _whiteTimeSec = baseSec;
    _blackTimeSec = baseSec;

    setState(() {
      _isPlaying = true;
    });

    if (_timeControl.baseMinutes > 0) {
      _startClock();
    }

    if (!_isPassAndPlay && _playerColor == PlayerColor.black) {
      _triggerAIMove();
    }
  }

  void _startClock() {
    _clockTimer?.cancel();
    if (_timeControl.baseMinutes == 0) return;

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
    _arrows.clear();
    _redoStack.clear();
    if (_game.getHistory().isNotEmpty) {
      _moveSans.add(_game.getHistory().last.toString());
    }

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

  void _handleUndoMove() {
    if (_game.getHistory().isEmpty || _isAIThinking) return;

    setState(() {
      if (_isPassAndPlay) {
        final undone = _game.undo();
        if (undone != null) {
          _redoStack.add(undone);
          if (_moveSans.isNotEmpty) _moveSans.removeLast();
        }
      } else {
        // Roll back AI move and player move
        final undoneAI = _game.undo();
        if (undoneAI != null) {
          _redoStack.add(undoneAI);
          if (_moveSans.isNotEmpty) _moveSans.removeLast();
        }
        if (_game.getHistory().isNotEmpty) {
          final undonePlayer = _game.undo();
          if (undonePlayer != null) {
            _redoStack.add(undonePlayer);
            if (_moveSans.isNotEmpty) _moveSans.removeLast();
          }
        }
      }
      _arrows.clear();
      _lastMoveFrom = null;
      _lastMoveTo = null;
      _updateMaterial();
    });

    SoundService.playMove();
    HapticsService.light();
  }

  void _handleRedoMove() {
    if (_redoStack.isEmpty || _isAIThinking) return;

    setState(() {
      if (_isPassAndPlay) {
        final move = _redoStack.removeLast();
        _game.move(move);
        if (_game.getHistory().isNotEmpty) {
          _moveSans.add(_game.getHistory().last.toString());
        }
        _lastMoveFrom = move['from'];
        _lastMoveTo = move['to'];
      } else {
        final playerMove = _redoStack.removeLast();
        _game.move(playerMove);
        if (_game.getHistory().isNotEmpty) {
          _moveSans.add(_game.getHistory().last.toString());
        }
        _lastMoveFrom = playerMove['from'];
        _lastMoveTo = playerMove['to'];

        if (_redoStack.isNotEmpty) {
          final aiMove = _redoStack.removeLast();
          _game.move(aiMove);
          if (_game.getHistory().isNotEmpty) {
            _moveSans.add(_game.getHistory().last.toString());
          }
          _lastMoveFrom = aiMove['from'];
          _lastMoveTo = aiMove['to'];
        }
      }
      _arrows.clear();
      _updateMaterial();
    });

    SoundService.playMove();
    HapticsService.light();
  }

  Future<void> _handleHint() async {
    if (_hintsRemaining <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('No hints remaining for this match.'),
          duration: Duration(seconds: 2),
          backgroundColor: Color(0xFF27272A),
        ),
      );
      return;
    }

    if (_isAIThinking) return;

    try {
      final req = AIMoveRequest(
        fen: _game.fen,
        level: 6, // High quality hint
        personality: AIPersonalityId.balanced,
        moveSans: _moveSans,
      );
      final res = await EngineService.getBestMove(req);

      setState(() {
        _hintsRemaining--;
        _arrows.clear();
        _arrows.add(
          BoardArrow(
            from: res.from,
            to: res.to,
            color: const Color(0xFF22C55E),
          ),
        );
      });

      SoundService.playMove();
      HapticsService.medium();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Text('💡 ', style: TextStyle(fontSize: 16)),
                Expanded(
                  child: Text(
                    'Coach Suggestion: ${res.san} (${res.from} → ${res.to})',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            backgroundColor: const Color(0xFF10B981),
            duration: const Duration(seconds: 4),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
    } catch (_) {
      //
    }
  }

  void _handleResignPrompt() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF18181B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.flag_rounded, color: Color(0xFFEF4444)),
            SizedBox(width: 8),
            Text('Resign Match?', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
          ],
        ),
        content: const Text(
          'Are you sure you want to forfeit this match? This will count as a loss.',
          style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 14),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancel', style: TextStyle(color: Color(0xFFA1A1AA))),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFEF4444),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            onPressed: () {
              Navigator.of(ctx).pop();
              _handleGameOver(_playerColor == PlayerColor.white ? '0-1' : '1-0', 'resignation', 'Resigned');
            },
            child: const Text('Resign'),
          ),
        ],
      ),
    );
  }

  void _showCoachChatDialog() {
    final botName = AI_PERSONALITIES.firstWhere((p) => p.id == _personality).name;

    String coachTip;
    if (_moveSans.isEmpty) {
      coachTip = 'Opening Strategy: Strive to control the center squares (e4, d4, e5, d5) with pawns and develop your knights and bishops actively!';
    } else if (_game.in_check) {
      coachTip = 'Warning: Your King is currently under attack! Find a legal move to step away, block with a piece, or capture the attacker.';
    } else if (_materialDifference > 0) {
      coachTip = 'Great tactical control! You are ahead by +$_materialDifference in material. Look to trade pieces when ahead, while avoiding trading pawns unnecessarily.';
    } else if (_materialDifference < 0) {
      coachTip = 'You are trailing by ${-_materialDifference} in material. Keep your pieces coordinated and look for counter-attacking tactical pins and forks.';
    } else {
      coachTip = 'Position is balanced. Ensure your King safety is intact and look for outpost squares for your knights.';
    }

    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF18181B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: const BoxDecoration(
                    color: Color(0xFF22C55E),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.psychology_outlined, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('AI Coach & Match Chat', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                    Text('$botName • Tactical Insights', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFF27272A),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF3F3F46)),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('🤖 ', style: TextStyle(fontSize: 22)),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      coachTip,
                      style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.4),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 46,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF22C55E),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text('Back to Game', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showGameOptionsSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF18181B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (context, setSheetState) {
          return Container(
            constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.height * 0.85),
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
            child: ListView(
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: const Color(0xFF3F3F46),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    const Icon(Icons.tune_rounded, color: Color(0xFF22C55E), size: 22),
                    const SizedBox(width: 8),
                    const Text('Game Options & Setup', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                    const Spacer(),
                    IconButton(
                      icon: const Icon(Icons.close, color: Color(0xFF94A3B8), size: 20),
                      onPressed: () => Navigator.of(ctx).pop(),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Quick Action: New Game Button
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF22C55E),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    icon: const Icon(Icons.refresh_rounded),
                    label: const Text('Start Fresh Match', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                      _startNewGame();
                    },
                  ),
                ),
                const SizedBox(height: 20),

                // 1. Board Theme Selector
                const Text('BOARD THEME', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: BOARD_THEMES.values.map((th) {
                    final isSel = th.id == _boardTheme;
                    return ChoiceChip(
                      label: Text(th.name),
                      selected: isSel,
                      selectedColor: const Color(0xFF22C55E),
                      backgroundColor: const Color(0xFF27272A),
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : const Color(0xFFA1A1AA),
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          setSheetState(() => _boardTheme = th.id);
                          setState(() => _boardTheme = th.id);
                        }
                      },
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),

                // 2. Piece Theme Selector
                const Text('PIECE DESIGN', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: PieceThemeId.values.map((pt) {
                    final isSel = pt == _pieceTheme;
                    return ChoiceChip(
                      label: Text(pt.name.toUpperCase()),
                      selected: isSel,
                      selectedColor: const Color(0xFF22C55E),
                      backgroundColor: const Color(0xFF27272A),
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : const Color(0xFFA1A1AA),
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          setSheetState(() => _pieceTheme = pt);
                          setState(() => _pieceTheme = pt);
                        }
                      },
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),

                // 3. Toggles: Flip Board, Coordinates, Pass & Play
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Flip Board', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: const Text('View board from Black or White side', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                  value: _flipped,
                  activeThumbColor: const Color(0xFF22C55E),
                  onChanged: (v) {
                    setSheetState(() => _flipped = v);
                    setState(() => _flipped = v);
                  },
                ),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Outside Coordinates', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: const Text('Display 8..1 and a..h on outer board borders', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                  value: _showCoordinates,
                  activeThumbColor: const Color(0xFF22C55E),
                  onChanged: (v) {
                    setSheetState(() => _showCoordinates = v);
                    setState(() => _showCoordinates = v);
                  },
                ),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('2-Player Pass & Play', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: const Text('Play with a friend locally on this phone', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                  value: _isPassAndPlay,
                  activeThumbColor: const Color(0xFF22C55E),
                  onChanged: (v) {
                    setSheetState(() => _isPassAndPlay = v);
                    setState(() => _isPassAndPlay = v);
                  },
                ),
                const SizedBox(height: 16),

                // 4. Bot Difficulty Slider
                const Text('AI BOT DIFFICULTY', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF27272A),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel).name,
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: const Color(0xFF22C55E),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              'Level $_difficultyLevel',
                              style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                      Slider(
                        value: _difficultyLevel.toDouble(),
                        min: 1,
                        max: 10,
                        divisions: 9,
                        activeColor: const Color(0xFF22C55E),
                        inactiveColor: const Color(0xFF3F3F46),
                        onChanged: (v) {
                          setSheetState(() => _difficultyLevel = v.toInt());
                          setState(() => _difficultyLevel = v.toInt());
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // 5. Time Control Selector
                const Text('TIME CONTROLS', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: TIME_CONTROLS.map((tc) {
                    final isSel = tc.id == _timeControl.id;
                    return ChoiceChip(
                      label: Text(tc.label),
                      selected: isSel,
                      selectedColor: const Color(0xFF22C55E),
                      backgroundColor: const Color(0xFF27272A),
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : const Color(0xFFA1A1AA),
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          setSheetState(() => _timeControl = tc);
                          setState(() => _timeControl = tc);
                        }
                      },
                    );
                  }).toList(),
                ),
              ],
            ),
          );
        },
      ),
    );
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
      whitePlayer: _isPassAndPlay ? 'Player 1' : (_playerColor == PlayerColor.white ? 'Ayush' : pers.name),
      blackPlayer: _isPassAndPlay ? 'Player 2' : (_playerColor == PlayerColor.black ? 'Ayush' : pers.name),
      whiteElo: _playerColor == PlayerColor.white ? 1742 : diff.elo,
      blackElo: _playerColor == PlayerColor.black ? 1742 : diff.elo,
      movesCount: _moveSans.length,
    );

    StorageService.saveGame(record);
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
              result == '1/2-1/2'
                  ? '🤝 Draw'
                  : (result == '1-0' && _playerColor == PlayerColor.white || result == '0-1' && _playerColor == PlayerColor.black
                      ? '🏆 Victory!'
                      : '💔 Defeat'),
              style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(details, style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 13)),
          ],
        ),
        content: Container(
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
                  Text(result, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
              Column(
                children: [
                  const Text('Moves', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
                  Text('${_moveSans.length}', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              _startNewGame();
            },
            child: const Text('New Game', style: TextStyle(color: Color(0xFF22C55E), fontWeight: FontWeight.bold)),
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
      backgroundColor: const Color(0xFF090A0F),
      body: SafeArea(
        child: Column(
          children: [
            // 1. Top Header Bar matching reference
            _buildTopHeader(),

            // 2. Main Play Board & Cards Area
            Expanded(
              child: _buildPlayArea(),
            ),

            // 3. Bottom Action Bar with 5 Actions
            _buildBottomActionBar(),
          ],
        ),
      ),
    );
  }

  Widget _buildTopHeader() {
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);
    final diff = DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel, orElse: () => DIFFICULTY_LEVELS[3]);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: const Color(0xFF090A0F),
      child: Row(
        children: [
          // Back chevron
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.chevron_left_rounded, color: Colors.white, size: 30),
            onPressed: () => _showGameOptionsSheet(),
          ),
          const SizedBox(width: 8),

          // Brand Logo: ▲ APEX CHESS
          Row(
            children: const [
              Text(
                '▲',
                style: TextStyle(
                  color: Color(0xFF22C55E),
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(width: 4),
              Text(
                'APEX ',
                style: TextStyle(
                  color: Color(0xFF22C55E),
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  letterSpacing: 1.2,
                ),
              ),
              Text(
                'CHESS',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  letterSpacing: 1.2,
                ),
              ),
            ],
          ),

          const Spacer(),

          // Center Pill: 🤖 VS AI / Harmonic (1200)
          GestureDetector(
            onTap: _showGameOptionsSheet,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
              decoration: BoxDecoration(
                color: const Color(0xFF111827),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF1F2937)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('🤖 ', style: TextStyle(fontSize: 11)),
                      Text(
                        _isPassAndPlay ? 'PASS & PLAY' : 'VS AI',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 0.8,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 1),
                  Text(
                    _isPassAndPlay ? '2 Players' : '${pers.name.split(' ').first} (${diff.elo})',
                    style: const TextStyle(
                      color: Color(0xFF22C55E),
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),

          const Spacer(),

          // Right Icons: Chat & More Options
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: const Color(0xFF1F2937)),
                color: const Color(0xFF111827),
              ),
              child: const Icon(Icons.chat_bubble_outline_rounded, color: Colors.white, size: 18),
            ),
            onPressed: _showCoachChatDialog,
          ),
          const SizedBox(width: 8),
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: const Color(0xFF1F2937)),
                color: const Color(0xFF111827),
              ),
              child: const Icon(Icons.more_horiz_rounded, color: Colors.white, size: 18),
            ),
            onPressed: _showGameOptionsSheet,
          ),
        ],
      ),
    );
  }

  Widget _buildPlayArea() {
    final diff = DIFFICULTY_LEVELS.firstWhere((d) => d.level == _difficultyLevel, orElse: () => DIFFICULTY_LEVELS[3]);
    final pers = AI_PERSONALITIES.firstWhere((p) => p.id == _personality, orElse: () => AI_PERSONALITIES[0]);

    final isBlackAtTop = !_flipped;
    final isWhiteTurn = _game.turn == chess.Color.WHITE;

    // Names and ratings matching reference layout:
    // Top player: Ayush (1742) with Black bishop avatar
    // Bottom player: Harmonic (1200) with White pawn avatar
    final topName = isBlackAtTop
        ? (_playerColor == PlayerColor.black ? 'Ayush' : (_isPassAndPlay ? 'Player 2' : pers.name))
        : (_playerColor == PlayerColor.white ? 'Ayush' : (_isPassAndPlay ? 'Player 1' : pers.name));
    final topRating = isBlackAtTop
        ? (_playerColor == PlayerColor.black ? '1742' : '${diff.elo}')
        : (_playerColor == PlayerColor.white ? '1742' : '${diff.elo}');
    final topPieceType = isBlackAtTop ? 'b' : 'p';
    final topPieceColor = isBlackAtTop ? 'b' : 'w';
    final topClockSec = isBlackAtTop ? _blackTimeSec : _whiteTimeSec;
    final isTopTurn = isBlackAtTop ? !isWhiteTurn : isWhiteTurn;

    final bottomName = isBlackAtTop
        ? (_playerColor == PlayerColor.white ? 'Ayush' : (_isPassAndPlay ? 'Player 1' : '${pers.name.split(' ').first} (${diff.elo})'))
        : (_playerColor == PlayerColor.black ? 'Ayush' : (_isPassAndPlay ? 'Player 2' : '${pers.name.split(' ').first} (${diff.elo})'));
    final bottomRating = isBlackAtTop
        ? (_playerColor == PlayerColor.white ? '1742' : '${diff.elo}')
        : (_playerColor == PlayerColor.black ? '1742' : '${diff.elo}');
    final bottomPieceType = isBlackAtTop ? 'p' : 'b';
    final bottomPieceColor = isBlackAtTop ? 'w' : 'b';
    final bottomClockSec = isBlackAtTop ? _whiteTimeSec : _blackTimeSec;
    final isBottomTurn = isBlackAtTop ? isWhiteTurn : !isWhiteTurn;

    return Column(
      children: [
        // Top Player Card
        _buildPlayerCard(
          name: topName,
          rating: topRating,
          pieceType: topPieceType,
          pieceColor: topPieceColor,
          clockSec: topClockSec,
          isActiveTurn: isTopTurn,
        ),

        // Center Chessboard with Outside Coordinates
        Expanded(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  ChessBoardWidget(
                    game: _game,
                    flipped: _flipped,
                    boardTheme: _boardTheme,
                    pieceTheme: _pieceTheme,
                    interactive: !_isAIThinking,
                    lastMoveFrom: _lastMoveFrom,
                    lastMoveTo: _lastMoveTo,
                    arrows: _arrows,
                    showCoordinates: _showCoordinates,
                    onMove: _onPlayerMove,
                  ),

                  // Floating AI Calculation indicator
                  if (_isAIThinking)
                    Positioned(
                      top: 16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF111827).withAlpha(230),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFF22C55E)),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF22C55E).withAlpha(60),
                              blurRadius: 10,
                            ),
                          ],
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            SizedBox(
                              width: 14,
                              height: 14,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Color(0xFF22C55E),
                              ),
                            ),
                            SizedBox(width: 10),
                            Text(
                              'AI Thinking...',
                              style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),

        // Bottom Player Card
        _buildPlayerCard(
          name: bottomName,
          rating: bottomRating,
          pieceType: bottomPieceType,
          pieceColor: bottomPieceColor,
          clockSec: bottomClockSec,
          isActiveTurn: isBottomTurn,
        ),
      ],
    );
  }

  Widget _buildPlayerCard({
    required String name,
    required String rating,
    required String pieceType,
    required String pieceColor,
    required int clockSec,
    required bool isActiveTurn,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          // Circular Avatar with Glowing Emerald Rim & Online Dot
          Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFF1E293B),
                  border: Border.all(color: const Color(0xFF22C55E), width: 1.8),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF22C55E).withAlpha(70),
                      blurRadius: 8,
                      spreadRadius: 1,
                    ),
                  ],
                ),
                child: Center(
                  child: ChessPieceWidget(
                    type: pieceType,
                    color: pieceColor,
                    theme: _pieceTheme,
                    size: 26,
                  ),
                ),
              ),
              // Green Online Dot at Bottom Right
              Positioned(
                right: -1,
                bottom: -1,
                child: Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: const Color(0xFF22C55E),
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFF090A0F), width: 2),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(width: 12),

          // Name and Rating Crown
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                name,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 2),
              Row(
                children: [
                  const Text('👑 ', style: TextStyle(fontSize: 12)),
                  Text(
                    rating,
                    style: const TextStyle(
                      color: Color(0xFF94A3B8),
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ),

          const Spacer(),

          // Large Digital Clock Card (09:24 / 09:31)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFF111827),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: isActiveTurn ? const Color(0xFF22C55E) : const Color(0xFF1F2937),
                width: isActiveTurn ? 1.5 : 1.0,
              ),
              boxShadow: isActiveTurn
                  ? [
                      BoxShadow(
                        color: const Color(0xFF22C55E).withAlpha(50),
                        blurRadius: 8,
                      ),
                    ]
                  : null,
            ),
            child: Text(
              _timeControl.baseMinutes > 0 ? _formatClock(clockSec) : '∞',
              style: TextStyle(
                color: isActiveTurn ? Colors.white : const Color(0xFFCBD5E1),
                fontSize: 22,
                fontWeight: FontWeight.bold,
                fontFamily: 'monospace',
                letterSpacing: 1.0,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomActionBar() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
      decoration: const BoxDecoration(
        color: Color(0xFF090A0F),
        border: Border(
          top: BorderSide(color: Color(0xFF1E293B), width: 1.0),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildBottomActionItem(
            icon: Icons.menu_rounded,
            label: 'Options',
            onTap: _showGameOptionsSheet,
          ),
          _buildBottomActionItem(
            icon: Icons.arrow_back_rounded,
            label: 'Back',
            onTap: _handleUndoMove,
          ),
          _buildBottomActionItem(
            icon: Icons.arrow_forward_rounded,
            label: 'Forward',
            onTap: _handleRedoMove,
          ),
          _buildBottomActionItem(
            icon: Icons.lightbulb_outline_rounded,
            label: 'Hint',
            badgeText: '$_hintsRemaining',
            badgeColor: const Color(0xFF22C55E),
            onTap: _handleHint,
          ),
          _buildBottomActionItem(
            icon: Icons.flag_rounded,
            label: 'Resign',
            color: const Color(0xFFEF4444),
            onTap: _handleResignPrompt,
          ),
        ],
      ),
    );
  }

  Widget _buildBottomActionItem({
    required IconData icon,
    required String label,
    VoidCallback? onTap,
    Color color = const Color(0xFF94A3B8),
    String? badgeText,
    Color? badgeColor,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(icon, color: color, size: 22),
                if (badgeText != null)
                  Positioned(
                    top: -6,
                    right: -10,
                    child: Container(
                      padding: const EdgeInsets.all(3),
                      decoration: BoxDecoration(
                        color: badgeColor ?? const Color(0xFF22C55E),
                        shape: BoxShape.circle,
                      ),
                      constraints: const BoxConstraints(minWidth: 16, minHeight: 16),
                      child: Center(
                        child: Text(
                          badgeText,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontSize: 11,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
