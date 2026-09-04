import 'dart:convert';
import 'dart:math';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/chess_models.dart';

class StorageService {
  static const String _keySettings = 'chess_apex_settings';
  static const String _keyStats = 'chess_apex_stats';
  static const String _keyGames = 'chess_apex_games';

  static SharedPreferences? _prefs;

  static Future<void> init() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  static AppSettings loadSettings() {
    try {
      final raw = _prefs?.getString(_keySettings);
      if (raw != null) {
        return AppSettings.fromJson(jsonDecode(raw) as Map<String, dynamic>);
      }
    } catch (_) {}
    return AppSettings();
  }

  static Future<void> saveSettings(AppSettings settings) async {
    try {
      await _prefs?.setString(_keySettings, jsonEncode(settings.toJson()));
    } catch (_) {}
  }

  static UserStats loadStats() {
    try {
      final raw = _prefs?.getString(_keyStats);
      if (raw != null) {
        return UserStats.fromJson(jsonDecode(raw) as Map<String, dynamic>);
      }
    } catch (_) {}
    return UserStats();
  }

  static Future<void> saveStats(UserStats stats) async {
    try {
      await _prefs?.setString(_keyStats, jsonEncode(stats.toJson()));
    } catch (_) {}
  }

  static List<GameRecord> loadGames() {
    try {
      final raw = _prefs?.getString(_keyGames);
      if (raw != null) {
        final list = jsonDecode(raw) as List<dynamic>;
        return list.map((e) => GameRecord.fromJson(e as Map<String, dynamic>)).toList();
      }
    } catch (_) {}
    return [];
  }

  static List<GameRecord> getRecentGames() => loadGames();

  static Future<void> saveGame(GameRecord game) async {
    try {
      final games = loadGames();
      final updated = [game, ...games.where((g) => g.id != game.id)].take(100).toList();
      await _prefs?.setString(_keyGames, jsonEncode(updated.map((g) => g.toJson()).toList()));

      // Update Player Stats
      final stats = loadStats();
      stats.gamesPlayed += 1;

      final bool isWhite = game.playerColor == 'w';
      final bool playerWon = (game.result == '1-0' && isWhite) || (game.result == '0-1' && !isWhite);
      final bool isDraw = game.result == '1/2-1/2';

      if (playerWon) {
        stats.wins += 1;
        stats.winStreak += 1;
        if (stats.winStreak > stats.bestWinStreak) {
          stats.bestWinStreak = stats.winStreak;
        }
        final opponentElo = isWhite ? game.blackElo : game.whiteElo;
        final ratingGain = max(8, (32 / (1 + pow(10, (stats.rating - opponentElo) / 400))).round());
        stats.rating += ratingGain;
      } else if (isDraw) {
        stats.draws += 1;
        stats.winStreak = 0;
        stats.rating += 2;
      } else {
        stats.losses += 1;
        stats.winStreak = 0;
        final opponentElo = isWhite ? game.blackElo : game.whiteElo;
        final ratingLoss = max(6, (32 / (1 + pow(10, (opponentElo - stats.rating) / 400))).round());
        stats.rating = max(400, stats.rating - ratingLoss);
      }

      if (game.openingName != null && game.openingName!.isNotEmpty) {
        stats.favoriteOpening = game.openingName!;
      }

      final today = DateTime.now().toIso8601String().split('T')[0];
      stats.ratingHistory.add(RatingEntry(date: today, rating: stats.rating));
      if (stats.ratingHistory.length > 30) {
        stats.ratingHistory = stats.ratingHistory.sublist(stats.ratingHistory.length - 30);
      }

      await saveStats(stats);
    } catch (_) {}
  }

  static Future<void> updateGameAnalysis(String gameId, FullGameAnalysis analysis) async {
    try {
      final games = loadGames();
      final idx = games.indexWhere((g) => g.id == gameId);
      if (idx != -1) {
        final existing = games[idx];
        final bool isWhite = existing.playerColor == 'w';
        final updated = GameRecord(
          id: existing.id,
          date: existing.date,
          pgn: existing.pgn,
          finalFen: existing.finalFen,
          result: existing.result,
          winner: existing.winner,
          reason: existing.reason,
          playerColor: existing.playerColor,
          difficultyLevel: existing.difficultyLevel,
          personality: existing.personality,
          timeControl: existing.timeControl,
          whitePlayer: existing.whitePlayer,
          blackPlayer: existing.blackPlayer,
          whiteElo: existing.whiteElo,
          blackElo: existing.blackElo,
          accuracyPlayer: isWhite ? analysis.accuracyWhite : analysis.accuracyBlack,
          accuracyAI: isWhite ? analysis.accuracyBlack : analysis.accuracyWhite,
          movesCount: existing.movesCount,
          openingEco: existing.openingEco,
          openingName: existing.openingName,
          analysis: analysis,
        );
        games[idx] = updated;
        await _prefs?.setString(_keyGames, jsonEncode(games.map((g) => g.toJson()).toList()));
      }
    } catch (_) {}
  }
}
