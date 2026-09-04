import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import '../models/chess_models.dart';
import 'storage_service.dart';

class SyncResult {
  final bool success;
  final String message;
  final int syncedGamesCount;

  const SyncResult({
    required this.success,
    required this.message,
    this.syncedGamesCount = 0,
  });
}

class SyncService {
  static Future<bool> checkServerHealth(String serverUrl) async {
    try {
      final uri = Uri.parse('$serverUrl/api/health');
      final res = await http.get(uri).timeout(const Duration(seconds: 3));
      return res.statusCode == 200;
    } catch (_) {
      return false;
    }
  }

  static Future<SyncResult> syncWithLocalServer(String serverUrl) async {
    try {
      final cleanUrl = serverUrl.endsWith('/') ? serverUrl.substring(0, serverUrl.length - 1) : serverUrl;

      // 1. Check health
      final isHealthy = await checkServerHealth(cleanUrl);
      if (!isHealthy) {
        return const SyncResult(
          success: false,
          message: 'Local server is currently unreachable. Playing in offline-first mode.',
        );
      }

      // 2. Upload local games
      final localGames = StorageService.loadGames();
      final gamesUri = Uri.parse('$cleanUrl/api/sync/games');
      final postGamesRes = await http.post(
        gamesUri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'games': localGames.map((g) => g.toJson()).toList()}),
      ).timeout(const Duration(seconds: 5));

      // 3. Download remote games
      final getGamesRes = await http.get(gamesUri).timeout(const Duration(seconds: 5));
      int remoteCount = 0;
      if (getGamesRes.statusCode == 200) {
        final data = jsonDecode(getGamesRes.body);
        if (data is Map && data['games'] is List) {
          final remoteGames = (data['games'] as List).map((g) => GameRecord.fromJson(g as Map<String, dynamic>)).toList();
          remoteCount = remoteGames.length;
          // Merge remote games into local storage
          for (final rg in remoteGames) {
            if (!localGames.any((lg) => lg.id == rg.id)) {
              await StorageService.saveGame(rg);
            }
          }
        }
      }

      // 4. Sync stats
      final localStats = StorageService.loadStats();
      final statsUri = Uri.parse('$cleanUrl/api/sync/stats');
      await http.post(
        statsUri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(localStats.toJson()),
      ).timeout(const Duration(seconds: 5));

      return SyncResult(
        success: postGamesRes.statusCode == 200,
        message: 'Successfully synchronized with local server.',
        syncedGamesCount: max(localGames.length, remoteCount),
      );
    } catch (e) {
      return SyncResult(
        success: false,
        message: 'Sync error: $e (Operating safely offline)',
      );
    }
  }
}
