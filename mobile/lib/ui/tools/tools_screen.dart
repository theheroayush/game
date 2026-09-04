import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:chess/chess.dart' as chess;
import '../../models/chess_models.dart';
import '../../services/haptics_service.dart';
import '../../services/notification_service.dart';
import '../../services/sound_service.dart';
import '../../services/storage_service.dart';
import '../../services/sync_service.dart';
import '../board/chess_board_widget.dart';
import '../board/staunton_pieces.dart';

enum ToolSubView { editor, coordinates, history, profile, settings }

class ToolsScreen extends StatefulWidget {
  final AppSettings settings;
  final Function(AppSettings updatedSettings)? onSettingsChanged;
  final Function(GameRecord record)? onReviewGame;

  const ToolsScreen({
    super.key,
    required this.settings,
    this.onSettingsChanged,
    this.onReviewGame,
  });

  @override
  State<ToolsScreen> createState() => _ToolsScreenState();
}

class _ToolsScreenState extends State<ToolsScreen> {
  ToolSubView _activeSubView = ToolSubView.settings;

  // Board Editor State
  chess.Chess _editorChess = chess.Chess();
  String? _selectedPalettePiece; // e.g. 'P', 'N', 'B', 'R', 'Q', 'K', 'p', 'n', 'b', 'r', 'q', 'k'
  final TextEditingController _fenController = TextEditingController();

  // Coordinate Trainer State
  String _targetCoordinate = 'e4';
  int _coordScore = 0;
  int _coordTimeLeft = 30;
  bool _isCoordActive = false;
  Timer? _coordTimer;
  bool _coordFlipped = false;

  // Sync state
  bool _isSyncing = false;
  String? _syncMessage;

  @override
  void initState() {
    super.initState();
    _fenController.text = _editorChess.fen;
  }

  @override
  void dispose() {
    _coordTimer?.cancel();
    _fenController.dispose();
    super.dispose();
  }

  // Coordinate Trainer
  void _startCoordinateTrainer() {
    _coordTimer?.cancel();
    setState(() {
      _coordScore = 0;
      _coordTimeLeft = 30;
      _isCoordActive = true;
      _targetCoordinate = _randomSquare();
    });

    _coordTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_coordTimeLeft > 0) {
        setState(() => _coordTimeLeft--);
      } else {
        timer.cancel();
        setState(() => _isCoordActive = false);
        SoundService.playVictory();
      }
    });
  }

  String _randomSquare() {
    final files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    final ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    return '${files[Random().nextInt(8)]}${ranks[Random().nextInt(8)]}';
  }

  void _onCoordinateTapped(String sq) {
    if (!_isCoordActive) return;

    if (sq == _targetCoordinate) {
      SoundService.playMove();
      HapticsService.light();
      setState(() {
        _coordScore++;
        _targetCoordinate = _randomSquare();
      });
    } else {
      SoundService.playError();
      HapticsService.heavy();
    }
  }

  // Board Editor
  void _onEditorSquareTapped(String sq) {
    if (_selectedPalettePiece != null) {
      final isWhite = _selectedPalettePiece == _selectedPalettePiece!.toUpperCase();
      final typeChar = _selectedPalettePiece!.toLowerCase();
      chess.PieceType? pt;
      switch (typeChar) {
        case 'p': pt = chess.PieceType.PAWN; break;
        case 'n': pt = chess.PieceType.KNIGHT; break;
        case 'b': pt = chess.PieceType.BISHOP; break;
        case 'r': pt = chess.PieceType.ROOK; break;
        case 'q': pt = chess.PieceType.QUEEN; break;
        case 'k': pt = chess.PieceType.KING; break;
      }

      if (pt != null) {
        _editorChess.put(
          chess.Piece(pt, isWhite ? chess.Color.WHITE : chess.Color.BLACK),
          sq,
        );
      }
    } else {
      _editorChess.remove(sq);
    }

    setState(() {
      _fenController.text = _editorChess.fen;
    });
  }

  // Server Sync
  Future<void> _runSync() async {
    setState(() {
      _isSyncing = true;
      _syncMessage = 'Syncing with local server...';
    });

    final res = await SyncService.syncWithLocalServer(widget.settings.localServerUrl);

    setState(() {
      _isSyncing = false;
      _syncMessage = res.message;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF18181B),
        title: const Text('⚙️ Tools & Settings', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Segmented Navigation Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              color: const Color(0xFF18181B),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildSubViewChip('Settings', ToolSubView.settings, Icons.settings),
                    _buildSubViewChip('Profile', ToolSubView.profile, Icons.person),
                    _buildSubViewChip('History', ToolSubView.history, Icons.history),
                    _buildSubViewChip('Editor', ToolSubView.editor, Icons.edit),
                    _buildSubViewChip('Coordinates', ToolSubView.coordinates, Icons.grid_on),
                  ],
                ),
              ),
            ),

            // Active Sub-view
            Expanded(
              child: _buildSubViewContent(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSubViewChip(String label, ToolSubView view, IconData icon) {
    final isSel = _activeSubView == view;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: ChoiceChip(
        avatar: Icon(icon, size: 16, color: isSel ? Colors.white : const Color(0xFFA1A1AA)),
        label: Text(label),
        selected: isSel,
        selectedColor: const Color(0xFF10B981),
        backgroundColor: const Color(0xFF27272A),
        labelStyle: TextStyle(
          color: isSel ? Colors.white : const Color(0xFFA1A1AA),
          fontSize: 12,
          fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
        ),
        onSelected: (sel) {
          if (sel) setState(() => _activeSubView = view);
        },
      ),
    );
  }

  Widget _buildSubViewContent() {
    switch (_activeSubView) {
      case ToolSubView.settings: return _buildSettingsView();
      case ToolSubView.profile: return _buildProfileView();
      case ToolSubView.history: return _buildHistoryView();
      case ToolSubView.editor: return _buildEditorView();
      case ToolSubView.coordinates: return _buildCoordinatesView();
    }
  }

  // =================== SETTINGS VIEW ===================
  Widget _buildSettingsView() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // 1. Board Theme
        const Text('BOARD THEME', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: BoardThemeId.values.map((t) {
            final isSel = widget.settings.boardTheme == t;
            return ChoiceChip(
              label: Text(t.name.toUpperCase()),
              selected: isSel,
              selectedColor: const Color(0xFF10B981),
              backgroundColor: const Color(0xFF18181B),
              labelStyle: TextStyle(color: isSel ? Colors.white : const Color(0xFFA1A1AA)),
              onSelected: (sel) {
                if (sel) {
                  widget.settings.boardTheme = t;
                  StorageService.saveSettings(widget.settings);
                  widget.onSettingsChanged?.call(widget.settings);
                  setState(() {});
                }
              },
            );
          }).toList(),
        ),
        const SizedBox(height: 20),

        // 2. Piece Theme Customizer with Live 6-Piece Preview
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('PIECE STYLE & CUSTOMIZATION', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: const Color(0xFF10B981).withAlpha(40), borderRadius: BorderRadius.circular(6)),
              child: Text(
                widget.settings.pieceTheme.name.toUpperCase(),
                style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Live preview of pieces in selected theme
        Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
          decoration: BoxDecoration(
            color: const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0xFF222F38)),
          ),
          child: Column(
            children: [
              const Text('Live Theme Preview', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ChessPieceWidget(type: 'k', color: 'w', theme: widget.settings.pieceTheme, size: 38),
                  ChessPieceWidget(type: 'q', color: 'w', theme: widget.settings.pieceTheme, size: 38),
                  ChessPieceWidget(type: 'r', color: 'w', theme: widget.settings.pieceTheme, size: 38),
                  ChessPieceWidget(type: 'b', color: 'b', theme: widget.settings.pieceTheme, size: 38),
                  ChessPieceWidget(type: 'n', color: 'b', theme: widget.settings.pieceTheme, size: 38),
                  ChessPieceWidget(type: 'p', color: 'b', theme: widget.settings.pieceTheme, size: 38),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: PieceThemeId.values.map((p) {
            final isSel = widget.settings.pieceTheme == p;
            String label;
            switch (p) {
              case PieceThemeId.staunton: label = 'Classic Staunton'; break;
              case PieceThemeId.neoEmerald: label = 'Neo Emerald Cyber'; break;
              case PieceThemeId.royalGold: label = 'Royal 24K Gold'; break;
              case PieceThemeId.woodcraft: label = 'Luxury Woodcraft'; break;
              case PieceThemeId.darkObsidian: label = 'Dark Obsidian'; break;
              case PieceThemeId.alphaMinimal: label = 'Alpha Minimalist'; break;
              case PieceThemeId.cyberGlass: label = 'Cyber Hologram'; break;
            }

            return ChoiceChip(
              label: Text(label),
              selected: isSel,
              selectedColor: const Color(0xFF10B981),
              backgroundColor: const Color(0xFF141A1F),
              labelStyle: TextStyle(
                color: isSel ? Colors.white : const Color(0xFFA1A1AA),
                fontSize: 12,
                fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
              ),
              onSelected: (sel) {
                if (sel) {
                  HapticsService.light();
                  widget.settings.pieceTheme = p;
                  StorageService.saveSettings(widget.settings);
                  widget.onSettingsChanged?.call(widget.settings);
                  setState(() {});
                }
              },
            );
          }).toList(),
        ),
        const SizedBox(height: 22),

        // 3. Audio & Haptics Toggles
        const Text('AUDIO & HAPTICS', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        const SizedBox(height: 6),
        Container(
          decoration: BoxDecoration(
            color: const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0xFF222F38)),
          ),
          child: Material(
            color: Colors.transparent,
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Sound Effects', style: TextStyle(color: Colors.white, fontSize: 14)),
                  value: widget.settings.soundEnabled,
                  activeThumbColor: const Color(0xFF10B981),
                  onChanged: (v) {
                    widget.settings.soundEnabled = v;
                    SoundService.enabled = v;
                    StorageService.saveSettings(widget.settings);
                    setState(() {});
                  },
                ),
                const Divider(color: Color(0xFF222F38), height: 1),
                SwitchListTile(
                  title: const Text('Haptic Vibration', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: const Text('Tactile response on moves, captures, and checks', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 11)),
                  value: widget.settings.hapticsEnabled,
                  activeThumbColor: const Color(0xFF10B981),
                  onChanged: (v) {
                    widget.settings.hapticsEnabled = v;
                    HapticsService.enabled = v;
                    StorageService.saveSettings(widget.settings);
                    setState(() {});
                  },
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 22),

        // 4. Daily Practice Notification Manager (8:00 PM Sharp or Custom)
        const Text('DAILY PRACTICE NOTIFICATIONS', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: const Color(0xFF141A1F),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0xFF222F38)),
          ),
          child: Material(
            color: Colors.transparent,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Daily Training Alerts', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                  subtitle: const Text('Alerts to keep your win streak alive and turn you into a pro player', style: TextStyle(color: Color(0xFFA1A1AA), fontSize: 11)),
                  value: widget.settings.dailyNotificationEnabled,
                  activeThumbColor: const Color(0xFF10B981),
                  onChanged: (v) {
                    widget.settings.dailyNotificationEnabled = v;
                    NotificationService.scheduleDailyPracticeNotifications(
                      enabled: v,
                      hour: widget.settings.notificationHour,
                      minute: widget.settings.notificationMinute,
                    );
                    StorageService.saveSettings(widget.settings);
                    setState(() {});
                  },
                ),
              if (widget.settings.dailyNotificationEnabled) ...[
                const Divider(color: Color(0xFF222F38), height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('SCHEDULED TIME', style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 2),
                        Text(
                          '${widget.settings.notificationHour == 0 ? 12 : (widget.settings.notificationHour > 12 ? widget.settings.notificationHour - 12 : widget.settings.notificationHour)}:${widget.settings.notificationMinute.toString().padLeft(2, '0')} ${widget.settings.notificationHour >= 12 ? 'PM' : 'AM'} (Sharp)',
                          style: const TextStyle(color: Color(0xFF10B981), fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF222F38),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      icon: const Icon(Icons.schedule, size: 16),
                      label: const Text('Change Time', style: TextStyle(fontSize: 12)),
                      onPressed: () async {
                        final picked = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay(
                            hour: widget.settings.notificationHour,
                            minute: widget.settings.notificationMinute,
                          ),
                        );
                        if (picked != null) {
                          widget.settings.notificationHour = picked.hour;
                          widget.settings.notificationMinute = picked.minute;
                          NotificationService.scheduleDailyPracticeNotifications(
                            enabled: true,
                            hour: picked.hour,
                            minute: picked.minute,
                          );
                          StorageService.saveSettings(widget.settings);
                          setState(() {});
                        }
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Presets
                Row(
                  children: [
                    _buildNotificationPresetChip('8:00 PM Sharp 🌙', 20, 0),
                    const SizedBox(width: 8),
                    _buildNotificationPresetChip('8:00 AM Morning ☀️', 8, 0),
                  ],
                ),
                const SizedBox(height: 14),
                // Send immediate test alert button
                SizedBox(
                  width: double.infinity,
                  height: 38,
                  child: OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFF10B981)),
                      foregroundColor: const Color(0xFF10B981),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    icon: const Icon(Icons.notifications_active_outlined, size: 16),
                    label: const Text('Send Test Alert Now (Verify Schedule)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    onPressed: () {
                      HapticsService.light();
                      NotificationService.showImmediateTestAlert(
                        hour: widget.settings.notificationHour,
                        minute: widget.settings.notificationMinute,
                      );
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('🔔 Notification alert sent to device!'),
                          duration: Duration(seconds: 2),
                          backgroundColor: Color(0xFF10B981),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
        const SizedBox(height: 22),

        // 4. Local Server Cross-Platform Sync
        const Text('LOCAL SERVER SYNCHRONIZATION', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: const Color(0xFF18181B),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF27272A)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: TextEditingController(text: widget.settings.localServerUrl),
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: const InputDecoration(
                  labelText: 'Local Server Base URL',
                  labelStyle: TextStyle(color: Color(0xFF94A3B8)),
                  border: OutlineInputBorder(),
                  isDense: true,
                ),
                onChanged: (v) {
                  widget.settings.localServerUrl = v;
                  StorageService.saveSettings(widget.settings);
                },
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF3B82F6),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  icon: _isSyncing
                      ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.sync, size: 18),
                  label: const Text('Sync with Local Server'),
                  onPressed: _isSyncing ? null : _runSync,
                ),
              ),
              if (_syncMessage != null) ...[
                const SizedBox(height: 8),
                Text(_syncMessage!, style: const TextStyle(color: Color(0xFF10B981), fontSize: 12)),
              ],
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildNotificationPresetChip(String label, int hour, int minute) {
    final isSel = widget.settings.notificationHour == hour && widget.settings.notificationMinute == minute;
    return GestureDetector(
      onTap: () {
        HapticsService.light();
        widget.settings.notificationHour = hour;
        widget.settings.notificationMinute = minute;
        NotificationService.scheduleDailyPracticeNotifications(
          enabled: true,
          hour: hour,
          minute: minute,
        );
        StorageService.saveSettings(widget.settings);
        setState(() {});
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isSel ? const Color(0xFF10B981).withAlpha(40) : const Color(0xFF222F38),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: isSel ? const Color(0xFF10B981) : Colors.transparent),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSel ? const Color(0xFF10B981) : const Color(0xFFA1A1AA),
            fontSize: 11,
            fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  // =================== PROFILE VIEW ===================
  Widget _buildProfileView() {
    final stats = StorageService.loadStats();
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF18181B),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF27272A)),
          ),
          child: Row(
            children: [
              const CircleAvatar(
                radius: 28,
                backgroundColor: Color(0xFF10B981),
                child: Text('♟️', style: TextStyle(fontSize: 28)),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Pro Player', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text('Active Win Streak: ${stats.winStreak} 🔥 (Best: ${stats.bestWinStreak})', style: const TextStyle(color: Color(0xFFF59E0B), fontSize: 12)),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(child: _buildStatCard('Chess Rating', '${stats.rating}', 'Elo', const Color(0xFF10B981))),
            const SizedBox(width: 12),
            Expanded(child: _buildStatCard('Tactics Rating', '${stats.puzzleRating}', 'Elo', const Color(0xFF3B82F6))),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: _buildStatCard('Games Played', '${stats.gamesPlayed}', '${stats.wins}W / ${stats.losses}L', const Color(0xFFA855F7))),
            const SizedBox(width: 12),
            Expanded(child: _buildStatCard('Puzzle Rush Best', '${stats.puzzleRushBest}', 'high score', const Color(0xFFF59E0B))),
          ],
        ),
      ],
    );
  }

  Widget _buildStatCard(String label, String value, String sub, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF27272A)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
          const SizedBox(height: 6),
          Text(value, style: TextStyle(color: color, fontSize: 24, fontWeight: FontWeight.bold)),
          const SizedBox(height: 2),
          Text(sub, style: const TextStyle(color: Color(0xFF71717A), fontSize: 11)),
        ],
      ),
    );
  }

  // =================== HISTORY VIEW ===================
  Widget _buildHistoryView() {
    final games = StorageService.loadGames();
    if (games.isEmpty) {
      return const Center(
        child: Text('No past games recorded yet. Play a match!', style: TextStyle(color: Color(0xFFA1A1AA))),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: games.length,
      itemBuilder: (context, index) {
        final g = games[index];
        final bool isWin = (g.result == '1-0' && g.playerColor == 'w') || (g.result == '0-1' && g.playerColor == 'b');
        final bool isDraw = g.result == '1/2-1/2';

        return Card(
          color: const Color(0xFF18181B),
          margin: const EdgeInsets.only(bottom: 8),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: isWin ? const Color(0xFF10B981).withAlpha(40) : (isDraw ? Colors.grey.withAlpha(40) : const Color(0xFFEF4444).withAlpha(40)),
              child: Text(
                isWin ? 'W' : (isDraw ? 'D' : 'L'),
                style: TextStyle(color: isWin ? const Color(0xFF10B981) : (isDraw ? Colors.white : const Color(0xFFEF4444)), fontWeight: FontWeight.bold),
              ),
            ),
            title: Text('${g.whitePlayer} vs ${g.blackPlayer}', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
            subtitle: Text('${g.result} • ${g.timeControl} • ${g.date.split("T").first}', style: const TextStyle(color: Color(0xFFA1A1AA), fontSize: 12)),
            trailing: const Icon(Icons.analytics_outlined, color: Color(0xFF10B981)),
            onTap: () => widget.onReviewGame?.call(g),
          ),
        );
      },
    );
  }

  // =================== BOARD EDITOR ===================
  Widget _buildEditorView() {
    return Column(
      children: [
        // Palette
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          color: const Color(0xFF18181B),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: ['K', 'Q', 'R', 'B', 'N', 'P', 'k', 'q', 'r', 'b', 'n', 'p'].map((p) {
              final isSel = _selectedPalettePiece == p;
              final isWhite = p == p.toUpperCase();
              return GestureDetector(
                onTap: () => setState(() => _selectedPalettePiece = isSel ? null : p),
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: isSel ? const Color(0xFF3B82F6).withAlpha(60) : Colors.transparent,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: isSel ? const Color(0xFF3B82F6) : Colors.transparent),
                  ),
                  child: ChessPieceWidget(type: p.toLowerCase(), color: isWhite ? 'w' : 'b', size: 26),
                ),
              );
            }).toList(),
          ),
        ),

        // Board
        Expanded(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: ChessBoardWidget(
                game: _editorChess,
                boardTheme: widget.settings.boardTheme,
                pieceTheme: widget.settings.pieceTheme,
                interactive: true,
                onMove: (f, t, p) {
                  _onEditorSquareTapped(t);
                },
              ),
            ),
          ),
        ),

        // Controls
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _fenController,
                  style: const TextStyle(color: Colors.white, fontSize: 11),
                  decoration: const InputDecoration(isDense: true, border: OutlineInputBorder()),
                  onSubmitted: (v) {
                    try {
                      final n = chess.Chess.fromFEN(v);
                      setState(() => _editorChess = n);
                    } catch (_) {}
                  },
                ),
              ),
              IconButton(
                icon: const Icon(Icons.copy, size: 18, color: Colors.white),
                onPressed: () => Clipboard.setData(ClipboardData(text: _fenController.text)),
              ),
              IconButton(
                icon: const Icon(Icons.cleaning_services, size: 18, color: Color(0xFFEF4444)),
                onPressed: () {
                  _editorChess.clear();
                  setState(() => _fenController.text = _editorChess.fen);
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  // =================== COORDINATE TRAINER ===================
  Widget _buildCoordinatesView() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: const Color(0xFF18181B),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Target: $_targetCoordinate', style: const TextStyle(color: Color(0xFFF59E0B), fontSize: 20, fontWeight: FontWeight.bold)),
              Text('Score: $_coordScore', style: const TextStyle(color: Color(0xFF10B981), fontSize: 18, fontWeight: FontWeight.bold)),
              Text('Time: ${_coordTimeLeft}s', style: const TextStyle(color: Colors.white, fontSize: 16)),
            ],
          ),
        ),
        Expanded(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: ChessBoardWidget(
                game: chess.Chess(),
                flipped: _coordFlipped,
                boardTheme: widget.settings.boardTheme,
                pieceTheme: widget.settings.pieceTheme,
                interactive: true,
                onMove: (f, t, p) {
                  _onCoordinateTapped(f);
                },
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.flip_camera_android, color: Colors.white),
                onPressed: () => setState(() => _coordFlipped = !_coordFlipped),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), foregroundColor: Colors.white),
                  onPressed: _isCoordActive ? null : _startCoordinateTrainer,
                  child: Text(_isCoordActive ? 'Training Running...' : 'Start 30s Drill'),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
