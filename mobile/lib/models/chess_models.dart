typedef Square = String;

enum PlayerColor { white, black }

extension PlayerColorExt on PlayerColor {
  String get code => this == PlayerColor.white ? 'w' : 'b';
  static PlayerColor fromCode(String c) => c == 'w' ? PlayerColor.white : PlayerColor.black;
}

enum SideSelection { white, black, random }

enum AIPersonalityId { balanced, aggressive, positional, tactical }

enum NavigationTab { play, analysis, puzzles, endgames, openings, tools }

class AIPersonality {
  final AIPersonalityId id;
  final String name;
  final String avatar;
  final String tagline;
  final String description;
  final double kingAttackWeight;
  final double centerControlWeight;
  final double tacticalWeight;

  const AIPersonality({
    required this.id,
    required this.name,
    required this.avatar,
    required this.tagline,
    required this.description,
    required this.kingAttackWeight,
    required this.centerControlWeight,
    required this.tacticalWeight,
  });
}

class DifficultyConfig {
  final int level;
  final String name;
  final int elo;
  final int depth;
  final int skillLevel; // 0 to 20
  final double blunderProbability; // 0 to 1
  final int moveTimeMs;
  final String description;
  final String badgeColor;

  const DifficultyConfig({
    required this.level,
    required this.name,
    required this.elo,
    required this.depth,
    required this.skillLevel,
    required this.blunderProbability,
    required this.moveTimeMs,
    required this.description,
    required this.badgeColor,
  });
}

class TimeControlConfig {
  final String id;
  final String label;
  final String category; // 'bullet' | 'blitz' | 'rapid' | 'classical' | 'none'
  final int baseMinutes;
  final int incrementSeconds;

  const TimeControlConfig({
    required this.id,
    required this.label,
    required this.category,
    required this.baseMinutes,
    required this.incrementSeconds,
  });
}

enum MoveClassification {
  brilliant,
  great,
  best,
  excellent,
  good,
  inaccuracy,
  mistake,
  blunder,
  missedWin,
  book,
}

extension MoveClassificationExt on MoveClassification {
  String get label {
    switch (this) {
      case MoveClassification.brilliant: return 'Brilliant';
      case MoveClassification.great: return 'Great';
      case MoveClassification.best: return 'Best';
      case MoveClassification.excellent: return 'Excellent';
      case MoveClassification.good: return 'Good';
      case MoveClassification.inaccuracy: return 'Inaccuracy';
      case MoveClassification.mistake: return 'Mistake';
      case MoveClassification.blunder: return 'Blunder';
      case MoveClassification.missedWin: return 'Missed Win';
      case MoveClassification.book: return 'Book';
    }
  }

  String get symbol {
    switch (this) {
      case MoveClassification.brilliant: return '💎';
      case MoveClassification.great: return '⭐';
      case MoveClassification.best: return '✅';
      case MoveClassification.excellent: return '👍';
      case MoveClassification.good: return '✓';
      case MoveClassification.inaccuracy: return '⚠️';
      case MoveClassification.mistake: return '❓';
      case MoveClassification.blunder: return '❌';
      case MoveClassification.missedWin: return '🎯';
      case MoveClassification.book: return '📖';
    }
  }
}

class MoveAnalysis {
  final int moveNumber;
  final int ply;
  final String san;
  final Square from;
  final Square to;
  final String color; // 'w' | 'b'
  final String fenBefore;
  final String fenAfter;
  final double evalBefore; // centipawns (+ = White advantage)
  final double evalAfter;
  final String? bestMoveSan;
  final Square? bestMoveFrom;
  final Square? bestMoveTo;
  final MoveClassification classification;
  final double centipawnLoss;
  final String coachExplanation;
  final String tacticalTheme;
  final List<String> suggestedLine;

  const MoveAnalysis({
    required this.moveNumber,
    required this.ply,
    required this.san,
    required this.from,
    required this.to,
    required this.color,
    required this.fenBefore,
    required this.fenAfter,
    required this.evalBefore,
    required this.evalAfter,
    this.bestMoveSan,
    this.bestMoveFrom,
    this.bestMoveTo,
    required this.classification,
    required this.centipawnLoss,
    required this.coachExplanation,
    required this.tacticalTheme,
    this.suggestedLine = const [],
  });

  Map<String, dynamic> toJson() => {
    'moveNumber': moveNumber,
    'ply': ply,
    'san': san,
    'from': from,
    'to': to,
    'color': color,
    'fenBefore': fenBefore,
    'fenAfter': fenAfter,
    'evalBefore': evalBefore,
    'evalAfter': evalAfter,
    'bestMoveSan': bestMoveSan,
    'bestMoveFrom': bestMoveFrom,
    'bestMoveTo': bestMoveTo,
    'classification': classification.name,
    'centipawnLoss': centipawnLoss,
    'coachExplanation': coachExplanation,
    'tacticalTheme': tacticalTheme,
    'suggestedLine': suggestedLine,
  };

  factory MoveAnalysis.fromJson(Map<String, dynamic> json) {
    return MoveAnalysis(
      moveNumber: json['moveNumber'] as int,
      ply: json['ply'] as int,
      san: json['san'] as String,
      from: json['from'] as Square,
      to: json['to'] as Square,
      color: json['color'] as String,
      fenBefore: json['fenBefore'] as String,
      fenAfter: json['fenAfter'] as String,
      evalBefore: (json['evalBefore'] as num).toDouble(),
      evalAfter: (json['evalAfter'] as num).toDouble(),
      bestMoveSan: json['bestMoveSan'] as String?,
      bestMoveFrom: json['bestMoveFrom'] as Square?,
      bestMoveTo: json['bestMoveTo'] as Square?,
      classification: MoveClassification.values.firstWhere(
        (c) => c.name == json['classification'],
        orElse: () => MoveClassification.good,
      ),
      centipawnLoss: (json['centipawnLoss'] as num).toDouble(),
      coachExplanation: json['coachExplanation'] as String? ?? '',
      tacticalTheme: json['tacticalTheme'] as String? ?? '',
      suggestedLine: (json['suggestedLine'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }
}

class CriticalMoment {
  final int ply;
  final String description;
  final double swing;

  const CriticalMoment({
    required this.ply,
    required this.description,
    required this.swing,
  });

  Map<String, dynamic> toJson() => {
    'ply': ply,
    'description': description,
    'swing': swing,
  };

  factory CriticalMoment.fromJson(Map<String, dynamic> json) => CriticalMoment(
    ply: json['ply'] as int,
    description: json['description'] as String,
    swing: (json['swing'] as num).toDouble(),
  );
}

class FullGameAnalysis {
  final int accuracyWhite;
  final int accuracyBlack;
  final int performanceWhite;
  final int performanceBlack;
  final String gameNarrative;
  final List<String> keyTakeaways;
  final Map<MoveClassification, int> whiteClassifications;
  final Map<MoveClassification, int> blackClassifications;
  final List<MoveAnalysis> moves;
  final List<CriticalMoment> criticalMoments;
  final String openingEco;
  final String openingName;

  const FullGameAnalysis({
    required this.accuracyWhite,
    required this.accuracyBlack,
    required this.performanceWhite,
    required this.performanceBlack,
    required this.gameNarrative,
    required this.keyTakeaways,
    required this.whiteClassifications,
    required this.blackClassifications,
    required this.moves,
    required this.criticalMoments,
    required this.openingEco,
    required this.openingName,
  });

  Map<String, dynamic> toJson() => {
    'accuracyWhite': accuracyWhite,
    'accuracyBlack': accuracyBlack,
    'performanceWhite': performanceWhite,
    'performanceBlack': performanceBlack,
    'gameNarrative': gameNarrative,
    'keyTakeaways': keyTakeaways,
    'whiteClassifications': whiteClassifications.map((k, v) => MapEntry(k.name, v)),
    'blackClassifications': blackClassifications.map((k, v) => MapEntry(k.name, v)),
    'moves': moves.map((m) => m.toJson()).toList(),
    'criticalMoments': criticalMoments.map((c) => c.toJson()).toList(),
    'openingEco': openingEco,
    'openingName': openingName,
  };

  factory FullGameAnalysis.fromJson(Map<String, dynamic> json) {
    final wClass = <MoveClassification, int>{};
    (json['whiteClassifications'] as Map<String, dynamic>? ?? {}).forEach((k, v) {
      final cls = MoveClassification.values.firstWhere((c) => c.name == k, orElse: () => MoveClassification.good);
      wClass[cls] = v as int;
    });

    final bClass = <MoveClassification, int>{};
    (json['blackClassifications'] as Map<String, dynamic>? ?? {}).forEach((k, v) {
      final cls = MoveClassification.values.firstWhere((c) => c.name == k, orElse: () => MoveClassification.good);
      bClass[cls] = v as int;
    });

    return FullGameAnalysis(
      accuracyWhite: json['accuracyWhite'] as int? ?? 100,
      accuracyBlack: json['accuracyBlack'] as int? ?? 100,
      performanceWhite: json['performanceWhite'] as int? ?? 1200,
      performanceBlack: json['performanceBlack'] as int? ?? 1200,
      gameNarrative: json['gameNarrative'] as String? ?? '',
      keyTakeaways: (json['keyTakeaways'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      whiteClassifications: wClass,
      blackClassifications: bClass,
      moves: (json['moves'] as List<dynamic>?)?.map((m) => MoveAnalysis.fromJson(m as Map<String, dynamic>)).toList() ?? [],
      criticalMoments: (json['criticalMoments'] as List<dynamic>?)?.map((c) => CriticalMoment.fromJson(c as Map<String, dynamic>)).toList() ?? [],
      openingEco: json['openingEco'] as String? ?? 'A00',
      openingName: json['openingName'] as String? ?? 'Standard Game',
    );
  }
}

class GameRecord {
  final String id;
  final String date;
  final String pgn;
  final String finalFen;
  final String result; // '1-0' | '0-1' | '1/2-1/2' | '*'
  final String? winner; // 'white' | 'black' | 'draw'
  final String reason;
  final String playerColor; // 'w' | 'b'
  final int difficultyLevel;
  final AIPersonalityId personality;
  final String timeControl;
  final String whitePlayer;
  final String blackPlayer;
  final int whiteElo;
  final int blackElo;
  final int? accuracyPlayer;
  final int? accuracyAI;
  final int movesCount;
  final String? openingEco;
  final String? openingName;
  final FullGameAnalysis? analysis;

  const GameRecord({
    required this.id,
    required this.date,
    required this.pgn,
    required this.finalFen,
    required this.result,
    this.winner,
    required this.reason,
    required this.playerColor,
    required this.difficultyLevel,
    required this.personality,
    required this.timeControl,
    required this.whitePlayer,
    required this.blackPlayer,
    required this.whiteElo,
    required this.blackElo,
    this.accuracyPlayer,
    this.accuracyAI,
    required this.movesCount,
    this.openingEco,
    this.openingName,
    this.analysis,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'date': date,
    'pgn': pgn,
    'finalFen': finalFen,
    'result': result,
    'winner': winner,
    'reason': reason,
    'playerColor': playerColor,
    'difficultyLevel': difficultyLevel,
    'personality': personality.name,
    'timeControl': timeControl,
    'whitePlayer': whitePlayer,
    'blackPlayer': blackPlayer,
    'whiteElo': whiteElo,
    'blackElo': blackElo,
    'accuracyPlayer': accuracyPlayer,
    'accuracyAI': accuracyAI,
    'movesCount': movesCount,
    'openingEco': openingEco,
    'openingName': openingName,
    'analysis': analysis?.toJson(),
  };

  factory GameRecord.fromJson(Map<String, dynamic> json) {
    return GameRecord(
      id: json['id'] as String,
      date: json['date'] as String,
      pgn: json['pgn'] as String,
      finalFen: json['finalFen'] as String,
      result: json['result'] as String,
      winner: json['winner'] as String?,
      reason: json['reason'] as String,
      playerColor: json['playerColor'] as String,
      difficultyLevel: json['difficultyLevel'] as int,
      personality: AIPersonalityId.values.firstWhere(
        (p) => p.name == json['personality'],
        orElse: () => AIPersonalityId.balanced,
      ),
      timeControl: json['timeControl'] as String,
      whitePlayer: json['whitePlayer'] as String,
      blackPlayer: json['blackPlayer'] as String,
      whiteElo: json['whiteElo'] as int,
      blackElo: json['blackElo'] as int,
      accuracyPlayer: json['accuracyPlayer'] as int?,
      accuracyAI: json['accuracyAI'] as int?,
      movesCount: json['movesCount'] as int,
      openingEco: json['openingEco'] as String?,
      openingName: json['openingName'] as String?,
      analysis: json['analysis'] != null ? FullGameAnalysis.fromJson(json['analysis'] as Map<String, dynamic>) : null,
    );
  }
}

class RatingEntry {
  final String date;
  final int rating;

  const RatingEntry({required this.date, required this.rating});

  Map<String, dynamic> toJson() => {'date': date, 'rating': rating};
  factory RatingEntry.fromJson(Map<String, dynamic> json) => RatingEntry(
    date: json['date'] as String,
    rating: json['rating'] as int,
  );
}

class UserStats {
  int rating;
  int puzzleRating;
  int puzzlesSolved;
  int puzzleRushBest;
  int gamesPlayed;
  String name;
  int globalRankPercentile;
  int ratingGain;
  List<bool> weeklyStreak;
  int wins;
  int losses;
  int draws;
  int winStreak;
  int bestWinStreak;
  List<RatingEntry> ratingHistory;
  String favoriteOpening;

  UserStats({
    this.name = 'Ayush',
    this.globalRankPercentile = 18,
    this.ratingGain = 24,
    List<bool>? weeklyStreak,
    this.rating = 1742,
    this.puzzleRating = 1850,
    this.puzzlesSolved = 142,
    this.puzzleRushBest = 24,
    this.gamesPlayed = 86,
    this.wins = 54,
    this.losses = 26,
    this.draws = 6,
    this.winStreak = 6,
    this.bestWinStreak = 9,
    List<RatingEntry>? ratingHistory,
    this.favoriteOpening = 'Italian Game',
  })  : weeklyStreak = weeklyStreak ?? [true, true, true, true, true, true, false],
        ratingHistory = ratingHistory ?? [
          RatingEntry(date: '2026-08-28', rating: 1680),
          RatingEntry(date: '2026-08-29', rating: 1695),
          RatingEntry(date: '2026-08-30', rating: 1710),
          RatingEntry(date: '2026-08-31', rating: 1705),
          RatingEntry(date: '2026-09-01', rating: 1720),
          RatingEntry(date: '2026-09-02', rating: 1718),
          RatingEntry(date: '2026-09-03', rating: 1742),
        ];

  Map<String, dynamic> toJson() => {
    'name': name,
    'globalRankPercentile': globalRankPercentile,
    'ratingGain': ratingGain,
    'weeklyStreak': weeklyStreak,
    'rating': rating,
    'puzzleRating': puzzleRating,
    'puzzlesSolved': puzzlesSolved,
    'puzzleRushBest': puzzleRushBest,
    'gamesPlayed': gamesPlayed,
    'wins': wins,
    'losses': losses,
    'draws': draws,
    'winStreak': winStreak,
    'bestWinStreak': bestWinStreak,
    'ratingHistory': ratingHistory.map((r) => r.toJson()).toList(),
    'favoriteOpening': favoriteOpening,
  };

  factory UserStats.fromJson(Map<String, dynamic> json) => UserStats(
    name: json['name'] as String? ?? 'Ayush',
    globalRankPercentile: json['globalRankPercentile'] as int? ?? 18,
    ratingGain: json['ratingGain'] as int? ?? 24,
    weeklyStreak: (json['weeklyStreak'] as List<dynamic>?)?.map((e) => e as bool).toList(),
    rating: json['rating'] as int? ?? 1742,
    puzzleRating: json['puzzleRating'] as int? ?? 1850,
    puzzlesSolved: json['puzzlesSolved'] as int? ?? 142,
    puzzleRushBest: json['puzzleRushBest'] as int? ?? 24,
    gamesPlayed: json['gamesPlayed'] as int? ?? 86,
    wins: json['wins'] as int? ?? 54,
    losses: json['losses'] as int? ?? 26,
    draws: json['draws'] as int? ?? 6,
    winStreak: json['winStreak'] as int? ?? 6,
    bestWinStreak: json['bestWinStreak'] as int? ?? 9,
    ratingHistory: (json['ratingHistory'] as List<dynamic>?)?.map((r) => RatingEntry.fromJson(r as Map<String, dynamic>)).toList(),
    favoriteOpening: json['favoriteOpening'] as String? ?? 'Italian Game',
  );
}

enum BoardThemeId { emerald, slate, wood, sapphire, onyx }
enum PieceThemeId { staunton, neoEmerald, royalGold, woodcraft, darkObsidian, alphaMinimal, cyberGlass }

class BoardThemeColors {
  final BoardThemeId id;
  final String name;
  final int lightSquare;
  final int darkSquare;
  final int selectedSquare;
  final int lastMoveSquare;
  final int checkSquare;

  const BoardThemeColors({
    required this.id,
    required this.name,
    required this.lightSquare,
    required this.darkSquare,
    required this.selectedSquare,
    required this.lastMoveSquare,
    required this.checkSquare,
  });
}

class AppSettings {
  BoardThemeId boardTheme;
  PieceThemeId pieceTheme;
  bool soundEnabled;
  double soundVolume;
  bool voiceCoachEnabled;
  bool hapticsEnabled;
  bool showCoordinates;
  bool showLegalMoves;
  bool showLastMove;
  bool showThreats;
  bool autoQueen;
  bool dailyNotificationEnabled;
  int notificationHour;
  int notificationMinute;
  String localServerUrl;

  AppSettings({
    this.boardTheme = BoardThemeId.emerald,
    this.pieceTheme = PieceThemeId.staunton,
    this.soundEnabled = true,
    this.soundVolume = 0.7,
    this.voiceCoachEnabled = false,
    this.hapticsEnabled = true,
    this.showCoordinates = true,
    this.showLegalMoves = true,
    this.showLastMove = true,
    this.showThreats = true,
    this.autoQueen = true,
    this.dailyNotificationEnabled = true,
    this.notificationHour = 20, // 8:00 PM default
    this.notificationMinute = 0,
    this.localServerUrl = 'http://10.0.2.2:8080',
  });

  Map<String, dynamic> toJson() => {
    'boardTheme': boardTheme.name,
    'pieceTheme': pieceTheme.name,
    'soundEnabled': soundEnabled,
    'soundVolume': soundVolume,
    'voiceCoachEnabled': voiceCoachEnabled,
    'hapticsEnabled': hapticsEnabled,
    'showCoordinates': showCoordinates,
    'showLegalMoves': showLegalMoves,
    'showLastMove': showLastMove,
    'showThreats': showThreats,
    'autoQueen': autoQueen,
    'dailyNotificationEnabled': dailyNotificationEnabled,
    'notificationHour': notificationHour,
    'notificationMinute': notificationMinute,
    'localServerUrl': localServerUrl,
  };

  factory AppSettings.fromJson(Map<String, dynamic> json) {
    PieceThemeId pTheme = PieceThemeId.staunton;
    final pStr = json['pieceTheme'] as String?;
    if (pStr != null) {
      if (pStr == 'neo' || pStr == 'neoEmerald') {
        pTheme = PieceThemeId.neoEmerald;
      } else if (pStr == 'alpha' || pStr == 'alphaMinimal') {
        pTheme = PieceThemeId.alphaMinimal;
      } else if (pStr == 'woodcraft') {
        pTheme = PieceThemeId.woodcraft;
      } else if (pStr == 'royalGold') {
        pTheme = PieceThemeId.royalGold;
      } else if (pStr == 'darkObsidian') {
        pTheme = PieceThemeId.darkObsidian;
      } else if (pStr == 'cyberGlass') {
        pTheme = PieceThemeId.cyberGlass;
      } else {
        pTheme = PieceThemeId.staunton;
      }
    }

    return AppSettings(
      boardTheme: BoardThemeId.values.firstWhere(
        (b) => b.name == json['boardTheme'],
        orElse: () => BoardThemeId.emerald,
      ),
      pieceTheme: pTheme,
      soundEnabled: json['soundEnabled'] as bool? ?? true,
      soundVolume: (json['soundVolume'] as num?)?.toDouble() ?? 0.7,
      voiceCoachEnabled: json['voiceCoachEnabled'] as bool? ?? false,
      hapticsEnabled: json['hapticsEnabled'] as bool? ?? true,
      showCoordinates: json['showCoordinates'] as bool? ?? true,
      showLegalMoves: json['showLegalMoves'] as bool? ?? true,
      showLastMove: json['showLastMove'] as bool? ?? true,
      showThreats: json['showThreats'] as bool? ?? true,
      autoQueen: json['autoQueen'] as bool? ?? true,
      dailyNotificationEnabled: json['dailyNotificationEnabled'] as bool? ?? true,
      notificationHour: json['notificationHour'] as int? ?? 20,
      notificationMinute: json['notificationMinute'] as int? ?? 0,
      localServerUrl: json['localServerUrl'] as String? ?? 'http://10.0.2.2:8080',
    );
  }
}

class ChessPuzzle {
  final String id;
  final String title;
  final String theme;
  final int rating;
  final String playerColor; // 'w' | 'b'
  final String fen;
  final List<String> moves;
  final String description;
  final String hint;
  final String coachExplanation;

  const ChessPuzzle({
    required this.id,
    required this.title,
    required this.theme,
    required this.rating,
    required this.playerColor,
    required this.fen,
    required this.moves,
    required this.description,
    required this.hint,
    required this.coachExplanation,
  });
}

class EndgameLesson {
  final String id;
  final String title;
  final String category;
  final String difficulty;
  final String fen;
  final String playerColor; // 'w' | 'b'
  final String objective;
  final List<String> keyPrinciples;
  final String grandmasterTip;
  final List<String> suggestedFirstMoves;

  const EndgameLesson({
    required this.id,
    required this.title,
    required this.category,
    required this.difficulty,
    required this.fen,
    required this.playerColor,
    required this.objective,
    required this.keyPrinciples,
    required this.grandmasterTip,
    required this.suggestedFirstMoves,
  });
}

class OpeningData {
  final String eco;
  final String name;
  final List<String> moves;
  final String fen;
  final String description;
  final List<String> keyIdeas;
  final String side; // 'white' | 'black' | 'both'
  final String difficulty;

  const OpeningData({
    required this.eco,
    required this.name,
    required this.moves,
    required this.fen,
    required this.description,
    required this.keyIdeas,
    required this.side,
    required this.difficulty,
  });
}
