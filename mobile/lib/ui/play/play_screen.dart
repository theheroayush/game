import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../models/engine_config.dart';
import '../../engine/minimax_isolate.dart';
import '../../engine/evaluation.dart';
import '../../services/haptics_service.dart';
import '../../services/notification_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../board/board_painter.dart';
import '../board/chess_board_widget.dart';
import '../theme/app_theme.dart';
import 'widgets/evaluation_bar_widget.dart';
import 'widgets/player_card_widget.dart';
import 'widgets/play_lobby_view.dart';
import 'widgets/move_history_sheet.dart';

class PlayScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(AppSettings)? onSettingsChanged;
  final Function(GameRecord record)? onReviewGame;
  final Function(int tabIndex)? onNavigateTab;
  final bool initialInLobby;

  const PlayScreen({
    super.key,
    required this.settings,
    this.onSettingsChanged,
    this.onReviewGame,
    this.onNavigateTab,
    this.initialInLobby = true,
  });

  @override
  State<PlayScreen> createState() => _PlayScreenState();
}

class _PlayScreenState extends State<PlayScreen> {
  // Screen mode: in lobby or active match
  late bool _inLobby;

  // Match state
  bool _isPlaying = false;
  bool _isPassAndPlay = false;
  int _difficultyLevel = 4; // Club Novice 1200 Elo
  AIPersonalityId _personality = AIPersonalityId.balanced; // Harmonic Engine
  PlayerColor _playerColor = PlayerColor.white;
  TimeControlConfig _timeControl = TIME_CONTROLS[3]; // 10+5 Rapid
  bool _flipped = false;
  bool _showCoordinates = true;
  late BoardThemeId _boardTheme;
  late PieceThemeId _pieceTheme;

  chess.Chess _game = chess.Chess();
  String? _lastMoveFrom;
  String? _lastMoveTo;
  bool _isAIThinking = false;
  int _evalScore = 0;
  final List<String> _moveSans = [];
  final List<BoardArrow> _arrows = [];
  int _hintsRemaining = 3;
  final List<Map<String, dynamic>> _redoStack = [];

  // Clocks
  int _whiteTimeSec = 600;
  int _blackTimeSec = 600;
  Timer? _clockTimer;

  // Material & captured pieces
  List<String> _whiteCaptured = [];
  List<String> _blackCaptured = [];
  int _materialDifference = 0;

  @override
  void initState() {
    super.initState();
    _inLobby = widget.initialInLobby;
    _boardTheme = widget.settings.boardTheme;
    _pieceTheme = widget.settings.pieceTheme;
    _showCoordinates = widget.settings.showCoordinates;

    _setupInitialGame();
  }

  @override
  void dispose() {
    _clockTimer?.cancel();
    super.dispose();
  }

  void _setupInitialGame() {
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
    _evalScore = 0;
  }

  void _updateBoardTheme(BoardThemeId theme) {
    setState(() => _boardTheme = theme);
    widget.settings.boardTheme = theme;
    StorageService.saveSettings(widget.settings);
    widget.onSettingsChanged?.call(widget.settings);
  }

  void _updatePieceTheme(PieceThemeId theme) {
    setState(() => _pieceTheme = theme);
    widget.settings.pieceTheme = theme;
    StorageService.saveSettings(widget.settings);
    widget.onSettingsChanged?.call(widget.settings);
  }

  void _updateCoordinates(bool show) {
    setState(() => _showCoordinates = show);
    widget.settings.showCoordinates = show;
    StorageService.saveSettings(widget.settings);
    widget.onSettingsChanged?.call(widget.settings);
  }

  void _startNewGame({
    int? difficultyLevel,
    AIPersonalityId? personality,
    PlayerColor? playerColor,
    TimeControlConfig? timeControl,
    bool? isPassAndPlay,
  }) {
    _clockTimer?.cancel();
    _setupInitialGame();

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
      _inLobby = false;
      _evalScore = 0;
    });

    if (_timeControl.baseMinutes > 0) {
      _startClock();
    }

    if (!_isPassAndPlay && _playerColor == PlayerColor.black) {
      Future.delayed(const Duration(milliseconds: 350), () {
        if (mounted && _isPlaying) {
          _triggerAIMove();
        }
      });
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

    if (_timeControl.incrementSeconds > 0) {
      if (_game.turn == chess.Color.BLACK) {
        _whiteTimeSec += _timeControl.incrementSeconds;
      } else {
        _blackTimeSec += _timeControl.incrementSeconds;
      }
    }

    _updateMaterial();
    _evalScore = evaluatePosition(_game, _personality);

    if (_checkGameOver()) return;

    if (!_isPassAndPlay) {
      final isPlayerTurn = (_playerColor == PlayerColor.white && _game.turn == chess.Color.WHITE) ||
          (_playerColor == PlayerColor.black && _game.turn == chess.Color.BLACK);
      if (!isPlayerTurn) {
        _triggerAIMove();
      }
    }
  }

  Future<void> _triggerAIMove() async {
    if (!_isPlaying || _isAIThinking) return;

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

      AIMoveResponse? res;
      try {
        res = await EngineService.getBestMove(req);
      } catch (err) {
        debugPrint('EngineService getBestMove failed: $err');
      }

      if (!_isPlaying || !mounted) return;

      bool success = false;
      String? playedFrom;
      String? playedTo;
      String? playedSan;
      bool isCapture = false;

      if (res != null) {
        // 1. Try standard SAN execution first (guarantees promotion formatting)
        try {
          final targetPiece = _game.get(res.to);
          isCapture = targetPiece != null;
          success = _game.move(res.san);
          if (success) {
            playedFrom = res.from;
            playedTo = res.to;
            playedSan = res.san;
          }
        } catch (_) {
          success = false;
        }

        // 2. Try verbose coordinates
        if (!success) {
          try {
            final promo = res.promotion != null && res.promotion!.isNotEmpty ? res.promotion![0] : null;
            final moveMap = <String, dynamic>{
              'from': res.from,
              'to': res.to,
            };
            if (promo != null) {
              moveMap['promotion'] = promo;
            }
            success = _game.move(moveMap);
            if (success) {
              playedFrom = res.from;
              playedTo = res.to;
              playedSan = res.san;
            }
          } catch (_) {
            success = false;
          }
        }
      }

      // 3. Self-healing fallback: if engine response failed or errored, pick first legal move
      if (!success && !_game.game_over) {
        final rawLegal = _game.moves({'verbose': true});
        if (rawLegal.isNotEmpty) {
          final fallbackMove = rawLegal.first as Map<String, dynamic>;
          success = _game.move(fallbackMove);
          if (success) {
            playedFrom = fallbackMove['from'] as String?;
            playedTo = fallbackMove['to'] as String?;
            playedSan = fallbackMove['san'] as String?;
            final targetPiece = playedTo != null ? _game.get(playedTo) : null;
            isCapture = targetPiece != null;
          }
        }
      }

      if (success) {
        _lastMoveFrom = playedFrom;
        _lastMoveTo = playedTo;
        if (playedSan != null) {
          _moveSans.add(playedSan);
        }

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
        _evalScore = evaluatePosition(_game, _personality);
        _checkGameOver();
      }
    } catch (e) {
      debugPrint('AI move trigger unexpected error: $e');
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
      _evalScore = evaluatePosition(_game, _personality);
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
      _evalScore = evaluatePosition(_game, _personality);
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
          backgroundColor: AppColors.card,
        ),
      );
      return;
    }

    if (_isAIThinking) return;

    try {
      final req = AIMoveRequest(
        fen: _game.fen,
        level: 6,
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
            color: const Color(0xFF3B82F6),
          ),
        );
      });

      SoundService.playHint();
      HapticsService.medium();
    } catch (_) {}
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
        backgroundColor: AppColors.surface,
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
            Text(details, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          ],
        ),
        content: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  const Text('Result', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                  Text(result, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
              Column(
                children: [
                  const Text('Moves', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
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
              setState(() => _inLobby = true);
            },
            child: const Text('New Opponent', style: TextStyle(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.accentBlue,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            icon: const Icon(Icons.restart_alt_rounded, size: 18),
            label: const Text('Rematch'),
            onPressed: () {
              Navigator.of(ctx).pop();
              _startNewGame(
                difficultyLevel: _difficultyLevel,
                personality: _personality,
                playerColor: _playerColor == PlayerColor.white ? PlayerColor.black : PlayerColor.white,
                timeControl: _timeControl,
              );
            },
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.green,
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

  void _handleResignPrompt() {
    if (!_isPlaying) return;
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: const Text('Resign Game?', style: TextStyle(color: Colors.white)),
        content: const Text(
          'Are you sure you want to resign this match?',
          style: TextStyle(color: AppColors.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancel', style: TextStyle(color: AppColors.textSecondary)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.red),
            onPressed: () {
              Navigator.of(ctx).pop();
              final winner = _playerColor == PlayerColor.white ? '0-1' : '1-0';
              _handleGameOver(winner, 'resignation', 'Resigned match');
            },
            child: const Text('Resign', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _handleDrawOffer() {
    if (!_isPlaying) return;
    if (_evalScore.abs() < 60) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Draw agreed! Position is balanced.'),
          backgroundColor: AppColors.card,
        ),
      );
      _handleGameOver('1/2-1/2', 'agreement', 'Draw by mutual agreement');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Draw declined. Opponent plays on.'),
          backgroundColor: AppColors.card,
        ),
      );
    }
  }

  void _showMoveHistorySheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => MoveHistorySheet(
        moveSans: _moveSans,
        currentPly: _moveSans.length,
        pgn: _game.pgn(),
        onSelectPly: (ply) {
          // Replay up to ply
          final temp = chess.Chess();
          for (int i = 0; i < ply && i < _moveSans.length; i++) {
            temp.move(_moveSans[i]);
          }
          setState(() {
            _game = temp;
            _updateMaterial();
            _evalScore = evaluatePosition(_game, _personality);
          });
        },
        onUndo: () {
          Navigator.of(ctx).pop();
          _handleUndoMove();
        },
        onRedo: () {
          Navigator.of(ctx).pop();
          _handleRedoMove();
        },
        onFlip: () {
          setState(() => _flipped = !_flipped);
          HapticsService.light();
        },
        onOfferDraw: () {
          Navigator.of(ctx).pop();
          _handleDrawOffer();
        },
        onResign: () {
          Navigator.of(ctx).pop();
          _handleResignPrompt();
        },
      ),
    );
  }

  void _showGameOptionsSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
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
                      color: AppColors.border,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    const Icon(Icons.tune_rounded, color: AppColors.accentBlue, size: 22),
                    const SizedBox(width: 8),
                    const Expanded(
                      child: Text(
                        'Game Options & Setup',
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: AppColors.textSecondary, size: 20),
                      onPressed: () => Navigator.of(ctx).pop(),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Quick Action: Open Play Lobby
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.accentBlue,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    icon: const Icon(Icons.dashboard_customize_rounded),
                    label: const Text('Open Play Lobby (Setup Match)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                      setState(() => _inLobby = true);
                    },
                  ),
                ),
                const SizedBox(height: 16),

                // Board Theme Selector
                const Text('BOARD THEME', style: TextStyle(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: BOARD_THEMES.values.map((th) {
                    final isSel = th.id == _boardTheme;
                    return ChoiceChip(
                      label: Text(th.name),
                      selected: isSel,
                      selectedColor: AppColors.accentBlue,
                      backgroundColor: AppColors.card,
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : AppColors.textSecondary,
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

                // Piece Theme Selector
                const Text('PIECE DESIGN STYLE', style: TextStyle(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: PieceThemeId.values.map((th) {
                    final isSel = th == _pieceTheme;
                    return ChoiceChip(
                      label: Text(th.name.toUpperCase()),
                      selected: isSel,
                      selectedColor: AppColors.accentBlue,
                      backgroundColor: AppColors.card,
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : AppColors.textSecondary,
                        fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          setSheetState(() => _pieceTheme = th);
                          setState(() => _pieceTheme = th);
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

  @override
  Widget build(BuildContext context) {
    if (_inLobby) {
      final hasMatch = _moveSans.isNotEmpty && _isPlaying;
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          backgroundColor: AppColors.dark,
          elevation: 0,
          leading: hasMatch
              ? IconButton(
                  icon: const Icon(Icons.close_rounded, color: Colors.white),
                  tooltip: 'Return to Game',
                  onPressed: () => setState(() => _inLobby = false),
                )
              : (Navigator.canPop(context)
                  ? IconButton(
                      icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                      onPressed: () => Navigator.pop(context),
                    )
                  : const Center(
                      child: Text(
                        '▲',
                        style: TextStyle(
                          color: AppColors.green,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    )),
          title: const Text(
            'Apex Play Hub',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
          ),
        ),
        body: SafeArea(
          child: PlayLobbyView(
            initialDifficulty: _difficultyLevel,
            initialPersonality: _personality,
            initialColor: _playerColor,
            initialTimeControl: _timeControl,
            hasActiveMatch: hasMatch,
            onResumeMatch: () => setState(() => _inLobby = false),
            currentBoardTheme: _boardTheme,
            currentPieceTheme: _pieceTheme,
            showCoordinates: _showCoordinates,
            onBoardThemeChanged: _updateBoardTheme,
            onPieceThemeChanged: _updatePieceTheme,
            onCoordinatesChanged: _updateCoordinates,
            onNavigateTab: widget.onNavigateTab,
            onStartMatch: ({
              required int difficultyLevel,
              required AIPersonalityId personality,
              required PlayerColor playerColor,
              required TimeControlConfig timeControl,
              bool? isPassAndPlay,
            }) {
              _startNewGame(
                difficultyLevel: difficultyLevel,
                personality: personality,
                playerColor: playerColor,
                timeControl: timeControl,
                isPassAndPlay: isPassAndPlay,
              );
            },
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // 1. Top Header Bar
            _buildTopHeader(),

            // 2. Main Play Board & Cards Area
            Expanded(
              child: _buildPlayArea(),
            ),

            // 3. Bottom Action Bar with Web-Parity Controls
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
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
      decoration: const BoxDecoration(
        color: AppColors.dark,
        border: Border(bottom: BorderSide(color: AppColors.border, width: 1.0)),
      ),
      child: Row(
        children: [
          // Lobby Switcher Chevron
          IconButton(
            visualDensity: VisualDensity.compact,
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.chevron_left_rounded, color: Colors.white, size: 28),
            tooltip: 'Play Hub',
            onPressed: () {
              HapticsService.light();
              setState(() => _inLobby = true);
            },
          ),
          const SizedBox(width: 4),

          // Brand Logo: ▲ APEX CHESS
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Text(
                  '▲',
                  style: TextStyle(
                    color: AppColors.green,
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(width: 3),
                Text(
                  'APEX ',
                  style: TextStyle(
                    color: AppColors.green,
                    fontWeight: FontWeight.w900,
                    fontSize: 13,
                    letterSpacing: 1.0,
                  ),
                ),
                Text(
                  'CHESS',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 13,
                    letterSpacing: 1.0,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(width: 6),

          // Center Pill: Opponent Status
          Expanded(
            child: Center(
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: GestureDetector(
                  onTap: () => setState(() => _inLobby = true),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Text('🤖 ', style: TextStyle(fontSize: 10)),
                            Text(
                              _isPassAndPlay ? 'PASS & PLAY' : 'VS AI',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.6,
                              ),
                              maxLines: 1,
                            ),
                          ],
                        ),
                        const SizedBox(height: 1),
                        Text(
                          _isPassAndPlay ? '2 Players' : '${pers.name.split(' ').first} (${diff.elo})',
                          style: const TextStyle(
                            color: AppColors.accentBlue,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),

          const SizedBox(width: 6),

          // Move notation button (opens sheet)
          IconButton(
            visualDensity: VisualDensity.compact,
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Container(
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.border),
                color: AppColors.surface,
              ),
              child: const Icon(Icons.list_alt_rounded, color: Colors.white, size: 16),
            ),
            onPressed: _showMoveHistorySheet,
          ),
          const SizedBox(width: 6),

          // Settings gear
          IconButton(
            visualDensity: VisualDensity.compact,
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Container(
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.border),
                color: AppColors.surface,
              ),
              child: const Icon(Icons.more_horiz_rounded, color: Colors.white, size: 16),
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

    final topName = isBlackAtTop
        ? (_playerColor == PlayerColor.black ? 'Ayush' : (_isPassAndPlay ? 'Player 2' : pers.name))
        : (_playerColor == PlayerColor.white ? 'Ayush' : (_isPassAndPlay ? 'Player 1' : pers.name));
    final topElo = isBlackAtTop
        ? (_playerColor == PlayerColor.black ? 1742 : diff.elo)
        : (_playerColor == PlayerColor.white ? 1742 : diff.elo);
    final isTopAI = isBlackAtTop ? (_playerColor == PlayerColor.white) : (_playerColor == PlayerColor.black);
    final topClockSec = isBlackAtTop ? _blackTimeSec : _whiteTimeSec;
    final isTopTurn = isBlackAtTop ? !isWhiteTurn : isWhiteTurn;
    final topCaptured = isBlackAtTop ? _blackCaptured : _whiteCaptured;

    final bottomName = isBlackAtTop
        ? (_playerColor == PlayerColor.white ? 'Ayush' : (_isPassAndPlay ? 'Player 1' : pers.name))
        : (_playerColor == PlayerColor.black ? 'Ayush' : (_isPassAndPlay ? 'Player 2' : pers.name));
    final bottomElo = isBlackAtTop
        ? (_playerColor == PlayerColor.white ? 1742 : diff.elo)
        : (_playerColor == PlayerColor.black ? 1742 : diff.elo);
    final isBottomAI = isBlackAtTop ? (_playerColor != PlayerColor.white) : (_playerColor != PlayerColor.black);
    final bottomClockSec = isBlackAtTop ? _whiteTimeSec : _blackTimeSec;
    final isBottomTurn = isBlackAtTop ? isWhiteTurn : !isWhiteTurn;
    final bottomCaptured = isBlackAtTop ? _whiteCaptured : _blackCaptured;

    return Column(
      children: [
        // Top Player Card
        PlayerCardWidget(
          name: topName,
          elo: topElo,
          isAI: isTopAI,
          aiAvatar: pers.avatar,
          pieceColor: isBlackAtTop ? 'b' : 'w',
          isActive: isTopTurn,
          isThinking: _isAIThinking && isTopTurn && isTopAI,
          timeLeftSeconds: topClockSec,
          hasClock: _timeControl.baseMinutes > 0,
          capturedPieces: topCaptured,
          materialAdvantage: isBlackAtTop
              ? (_materialDifference < 0 ? -_materialDifference : 0)
              : (_materialDifference > 0 ? _materialDifference : 0),
          pieceThemeId: _pieceTheme,
        ),

        // Center Chessboard with Live Evaluation Bar
        Expanded(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 2),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  const evalBarWidth = 4.0;
                  const spacing = 3.0;
                  final availBoardW = math.max(0.0, constraints.maxWidth - evalBarWidth - spacing);
                  final availH = constraints.maxHeight;
                  final boardSize = math.min(availBoardW, availH);

                  return Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Live Centipawn Evaluation Bar (slim flush docking)
                      EvaluationBarWidget(
                        evalScore: _evalScore,
                        flipped: _flipped,
                        width: evalBarWidth,
                        height: boardSize,
                      ),
                      const SizedBox(width: spacing),

                      // Chessboard Widget
                      Expanded(
                        child: Center(
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

                              // Floating AI calculation indicator
                              if (_isAIThinking)
                                Positioned(
                                  top: 14,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                    decoration: BoxDecoration(
                                      color: AppColors.dark.withAlpha(240),
                                      borderRadius: BorderRadius.circular(20),
                                      border: Border.all(color: AppColors.accentBlue),
                                      boxShadow: [
                                        BoxShadow(
                                          color: AppColors.accentBlue.withAlpha(60),
                                          blurRadius: 10,
                                        ),
                                      ],
                                    ),
                                    child: const Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        SizedBox(
                                          width: 12,
                                          height: 12,
                                          child: CircularProgressIndicator(
                                            strokeWidth: 2,
                                            color: AppColors.accentBlue,
                                          ),
                                        ),
                                        SizedBox(width: 8),
                                        Text(
                                          'AI Thinking...',
                                          style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
        ),

        // Bottom Player Card
        PlayerCardWidget(
          name: bottomName,
          elo: bottomElo,
          isAI: isBottomAI,
          aiAvatar: pers.avatar,
          pieceColor: isBlackAtTop ? 'w' : 'b',
          isActive: isBottomTurn,
          isThinking: false,
          timeLeftSeconds: bottomClockSec,
          hasClock: _timeControl.baseMinutes > 0,
          capturedPieces: bottomCaptured,
          materialAdvantage: isBlackAtTop
              ? (_materialDifference > 0 ? _materialDifference : 0)
              : (_materialDifference < 0 ? -_materialDifference : 0),
          pieceThemeId: _pieceTheme,
        ),
      ],
    );
  }

  Widget _buildBottomActionBar() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 4),
      decoration: const BoxDecoration(
        color: AppColors.dark,
        border: Border(top: BorderSide(color: AppColors.border, width: 1.0)),
      ),
      child: Row(
        children: [
          Expanded(
            child: _buildBottomActionItem(
              icon: Icons.tune_rounded,
              label: 'Options',
              color: AppColors.accentBlue,
              onTap: _showGameOptionsSheet,
            ),
          ),
          Expanded(
            child: _buildBottomActionItem(
              icon: Icons.format_list_numbered_rounded,
              label: 'Moves',
              badgeText: '${_moveSans.length}',
              badgeColor: AppColors.accentBlue,
              onTap: _showMoveHistorySheet,
            ),
          ),
          Expanded(
            child: _buildBottomActionItem(
              icon: Icons.undo_rounded,
              label: 'Undo',
              onTap: _handleUndoMove,
            ),
          ),
          Expanded(
            child: _buildBottomActionItem(
              icon: Icons.lightbulb_outline_rounded,
              label: 'Hint',
              badgeText: '$_hintsRemaining',
              badgeColor: AppColors.green,
              onTap: _handleHint,
            ),
          ),
          Expanded(
            child: _buildBottomActionItem(
              icon: Icons.flag_outlined,
              label: 'Resign',
              color: AppColors.red,
              onTap: _handleResignPrompt,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomActionItem({
    required IconData icon,
    required String label,
    VoidCallback? onTap,
    Color color = AppColors.textSecondary,
    String? badgeText,
    Color? badgeColor,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 4),
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Stack(
                clipBehavior: Clip.none,
                children: [
                  Icon(icon, color: color, size: 20),
                  if (badgeText != null)
                    Positioned(
                      top: -6,
                      right: -10,
                      child: Container(
                        padding: const EdgeInsets.all(3),
                        decoration: BoxDecoration(
                          color: badgeColor ?? AppColors.green,
                          shape: BoxShape.circle,
                        ),
                        constraints: const BoxConstraints(minWidth: 15, minHeight: 15),
                        child: Center(
                          child: Text(
                            badgeText,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 3),
              Text(
                label,
                style: TextStyle(
                  color: color,
                  fontSize: 10,
                  fontWeight: FontWeight.w600,
                ),
                maxLines: 1,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
