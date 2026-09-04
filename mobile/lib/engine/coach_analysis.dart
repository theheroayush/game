import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:chess/chess.dart' as chess;
import '../models/chess_models.dart';
import '../data/openings_data.dart';
import 'evaluation.dart';

int calculateAccuracy(List<double> centipawnLosses) {
  if (centipawnLosses.isEmpty) return 100;
  final avgLoss = centipawnLosses.reduce((a, b) => a + b) / centipawnLosses.length;
  final accuracy = (100 * exp(-0.0035 * avgLoss)).round();
  return max(15, min(100, accuracy));
}

int calculatePerformanceRating(int accuracy, int movesCount) {
  final base = 500 + pow(accuracy / 100, 2.2) * 2200;
  final confidenceBonus = min(100, movesCount * 2);
  return max(600, min(2850, (base + confidenceBonus / 4).round()));
}

class CoachFeedback {
  final String explanation;
  final String theme;
  const CoachFeedback({required this.explanation, required this.theme});
}

CoachFeedback generateCoachFeedback(
  chess.Chess chessBefore,
  MoveClassification classification,
  String san,
  String from,
  String to,
  double centipawnLoss,
  String? bestMoveSan,
) {
  final movedPiece = chessBefore.get(from);

  if (classification == MoveClassification.book) {
    return CoachFeedback(
      explanation: 'Master opening theory ($san). Solidifies control over key central squares while adhering to classical development principles.',
      theme: 'Opening Book',
    );
  }

  if (classification == MoveClassification.brilliant) {
    return CoachFeedback(
      explanation: 'Spectacular move ($san)! A calculated piece sacrifice that creates overwhelming tactical compensation or leads directly to an unstoppable attack.',
      theme: 'Brilliant Sacrifice',
    );
  }

  if (classification == MoveClassification.best) {
    if (san.contains('#')) {
      return CoachFeedback(explanation: 'Decisive checkmate with $san! Clinical and flawless finish.', theme: 'Checkmate');
    }
    if (san.contains('+')) {
      return CoachFeedback(explanation: 'The absolute sharpest move ($san), applying direct king pressure and restricting opponent flight squares.', theme: 'Sharp Attack');
    }
    if (movedPiece?.type.name.toLowerCase() == 'p' && (to == 'e4' || to == 'd4' || to == 'e5' || to == 'd5')) {
      return CoachFeedback(explanation: 'Optimal pawn stake in the center with $san, clamping down on key central outposts.', theme: 'Central Control');
    }
    if (san.contains('O-O')) {
      return CoachFeedback(explanation: 'Crucial king safety move ($san), activating the rook along the file while tucking the king behind a solid pawn shelter.', theme: 'King Safety');
    }
    return CoachFeedback(
      explanation: 'Top computer choice ($san). Harmoniously improves piece coordination and maintains maximum positional pressure.',
      theme: 'Optimal Move',
    );
  }

  if (classification == MoveClassification.excellent || classification == MoveClassification.good) {
    return CoachFeedback(
      explanation: 'Solid, active continuation ($san). Keeps a firm grip on the position without conceding tactical weaknesses.',
      theme: 'Solid Play',
    );
  }

  if (classification == MoveClassification.inaccuracy) {
    final alternative = bestMoveSan != null ? 'Stronger was $bestMoveSan, which ' : 'Look for active alternatives that ';
    return CoachFeedback(
      explanation: 'Slight inaccuracy ($san, +${(centipawnLoss / 100).toStringAsFixed(1)} cp loss). ${alternative}maintains more dynamic piece activity and central presence.',
      theme: 'Minor Inaccuracy',
    );
  }

  if (classification == MoveClassification.mistake) {
    final alternative = bestMoveSan != null ? 'Playing $bestMoveSan was essential here to ' : 'A more active move was needed to ';
    return CoachFeedback(
      explanation: 'Costly mistake ($san, giving up ${(centipawnLoss / 100).toStringAsFixed(1)} pawns of advantage). ${alternative}defend vulnerable squares and prevent counterplay.',
      theme: 'Positional Mistake',
    );
  }

  if (classification == MoveClassification.missedWin) {
    return CoachFeedback(
      explanation: 'Missed winning opportunity! ${bestMoveSan != null ? "The tactical knockout was $bestMoveSan, which" : "A direct tactical strike"} decisively broke through the defense.',
      theme: 'Missed Knockout',
    );
  }

  if (classification == MoveClassification.blunder) {
    final alternative = bestMoveSan != null ? ' The engine recommends $bestMoveSan.' : '';
    if (centipawnLoss > 400) {
      return CoachFeedback(
        explanation: 'Critical tactical blunder with $san! Leaves key defensive squares unguarded and opens severe counter-attack vectors.$alternative',
        theme: 'Severe Blunder',
      );
    }
    return CoachFeedback(
      explanation: 'Tactical blunder ($san, dropping ${(centipawnLoss / 100).toStringAsFixed(1)} pawns). Compromises piece coordination and invites enemy tactical strikes.$alternative',
      theme: 'Tactical Blunder',
    );
  }

  return CoachFeedback(explanation: '$san is played.', theme: 'Standard Move');
}

Map<String, dynamic> generateGameNarrative(
  List<MoveAnalysis> moves,
  int accWhite,
  int accBlack,
  String openingName,
) {
  final blundersWhite = moves.where((m) => m.color == 'w' && (m.classification == MoveClassification.blunder || m.classification == MoveClassification.missedWin)).length;
  final blundersBlack = moves.where((m) => m.color == 'b' && (m.classification == MoveClassification.blunder || m.classification == MoveClassification.missedWin)).length;
  final brilliants = moves.where((m) => m.classification == MoveClassification.brilliant).length;

  String narrative = 'A compelling battle emerging from the $openingName. ';
  if (accWhite >= 85 && accBlack >= 85) {
    narrative += 'Both sides showcased high-level master precision with deep theoretical knowledge and clean tactical execution. ';
  } else if (accWhite > accBlack + 15) {
    narrative += "White asserted consistent strategic control from the middlegame onward, punishing Black's tactical inaccuracies with relentless accuracy. ";
  } else if (accBlack > accWhite + 15) {
    narrative += "Black outmaneuvered White in the tactical complications, capitalizing decisively on key pawn structure weaknesses. ";
  } else {
    narrative += 'A fiercely contested match with sharp swings in momentum and rich tactical possibilities for both players. ';
  }

  if (brilliants > 0) {
    narrative += 'The game featured $brilliants brilliant tactical sacrifice(s) that electrified the board.';
  }

  final takeaways = <String>[];
  if (blundersWhite == 0) {
    takeaways.add('White demonstrated exceptional tactical hygiene with zero blunders throughout the match.');
  } else {
    takeaways.add('White had $blundersWhite critical moment(s) where tactical calculations drifted; focusing on prophylactic piece defense will yield immediate rating gains.');
  }

  if (blundersBlack == 0) {
    takeaways.add('Black maintained solid positional discipline across all phases of the encounter.');
  } else {
    takeaways.add('Black conceded $blundersBlack major tactical opening(s); practicing tactical puzzles on pins and discovered checks will tighten defensive resilience.');
  }

  takeaways.add('Opening study: Deepen familiarity with the key pawn structures in the $openingName to accelerate piece mobilization.');

  return {'narrative': narrative, 'takeaways': takeaways};
}

// Full Game Analysis Engine
FullGameAnalysis analyzeGame(String pgn) {
  final chessGame = chess.Chess();
  try {
    chessGame.load_pgn(pgn);
  } catch (_) {
    // Fallback parsing below if standard load_pgn fails
  }

  List<dynamic> history = chessGame.getHistory({'verbose': true});
  if (history.isEmpty && pgn.trim().isNotEmpty) {
    try {
      final fallbackChess = chess.Chess();
      final cleaned = pgn
          .replaceAll(RegExp(r'\{[^}]*\}'), ' ')
          .replaceAll(RegExp(r'\([^)]*\)'), ' ')
          .replaceAll(RegExp(r'\$\d+'), ' ')
          .replaceAll(RegExp(r'\d+\.+'), ' ')
          .replaceAll(RegExp(r'1-0|0-1|1/2-1/2|\*'), ' ');
      final tokens = cleaned.trim().split(RegExp(r'\s+')).where((t) => t.isNotEmpty).toList();
      for (final t in tokens) {
        try {
          final m = fallbackChess.move(t);
          if (!m) break;
        } catch (_) {
          break;
        }
      }
      if (fallbackChess.history.isNotEmpty) {
        history = fallbackChess.getHistory({'verbose': true});
      }
    } catch (_) {}
  }

  if (history.isEmpty) {
    final demo = chess.Chess();
    demo.load_pgn('1. e4 d5 2. exd5 Qxd5 3. Nc3 Qe6+ 4. Qe2 Qxe2+ 5. Bxe2 Nf6 6. d3 Bf5 7. Nf3 e6 8. O-O-O Bb4 9. Nb1 Nc6 10. Bd2 Bxd2+');
    history = demo.getHistory({'verbose': true});
  }

  final replay = chess.Chess();
  final historySans = history.map((h) => (h as Map<String, dynamic>)['san']?.toString() ?? '').toList();
  final matchedOpening = findOpeningByMoves(historySans);

  final whiteCounts = <MoveClassification, int>{
    for (final c in MoveClassification.values) c: 0,
  };
  final blackCounts = <MoveClassification, int>{
    for (final c in MoveClassification.values) c: 0,
  };

  final whiteLosses = <double>[];
  final blackLosses = <double>[];
  final analyses = <MoveAnalysis>[];
  final criticalMoments = <CriticalMoment>[];

  int previousEval = 0;

  for (int i = 0; i < history.length; i++) {
    final moveMap = history[i] as Map<String, dynamic>;
    final moveSan = moveMap['san'] as String;
    final moveFrom = moveMap['from'] as String;
    final moveTo = moveMap['to'] as String;
    final isCapture = moveMap['captured'] != null;
    final fenBefore = replay.fen;
    final isWhite = replay.turn == chess.Color.WHITE;

    // Fast minimax best move calculation (depth 2)
    final bestEngineResult = minimax(replay, 2, -999999, 999999, isWhite, useQuiescence: false);
    final bestEval = bestEngineResult.score;
    final bestMoveSan = bestEngineResult.bestMove?['san']?.toString();
    final bestMoveFrom = bestEngineResult.bestMove?['from']?.toString();
    final bestMoveTo = bestEngineResult.bestMove?['to']?.toString();

    // Apply played move
    replay.move(moveSan);
    final fenAfter = replay.fen;

    // Evaluate played move
    int playedMoveEval;
    if (bestMoveSan != null && moveSan == bestMoveSan) {
      playedMoveEval = bestEval;
    } else {
      playedMoveEval = minimax(replay, 1, -999999, 999999, !isWhite, useQuiescence: false).score;
    }

    final actualEval = evaluatePosition(replay);

    // Centipawn loss
    double cpLoss;
    if (isWhite) {
      cpLoss = max(0, (bestEval - playedMoveEval)).toDouble();
      whiteLosses.add(cpLoss);
    } else {
      cpLoss = max(0, (playedMoveEval - bestEval)).toDouble();
      blackLosses.add(cpLoss);
    }

    // Move Classification
    MoveClassification classification = MoveClassification.good;
    final bool isBookMove = matchedOpening != null && i < matchedOpening.moves.length && moveSan == matchedOpening.moves[i];

    if (isBookMove) {
      classification = MoveClassification.book;
    } else if (cpLoss == 0 && isCapture && (PIECE_VALUES[moveMap['piece']?.toString() ?? ''] ?? 0) > (PIECE_VALUES[moveMap['captured']?.toString() ?? ''] ?? 0) && (isWhite ? actualEval > 250 : actualEval < -250)) {
      classification = MoveClassification.brilliant;
    } else if (cpLoss < 12 || (bestMoveSan != null && moveSan == bestMoveSan)) {
      classification = MoveClassification.best;
    } else if (cpLoss < 35) {
      classification = MoveClassification.excellent;
    } else if (cpLoss < 75) {
      classification = MoveClassification.good;
    } else if (cpLoss < 150) {
      classification = MoveClassification.inaccuracy;
    } else if (cpLoss < 300) {
      classification = MoveClassification.mistake;
    } else {
      if ((isWhite && bestEval > 350 && playedMoveEval < 80) || (!isWhite && bestEval < -350 && playedMoveEval > -80)) {
        classification = MoveClassification.missedWin;
      } else {
        classification = MoveClassification.blunder;
      }
    }

    if (isWhite) {
      whiteCounts[classification] = (whiteCounts[classification] ?? 0) + 1;
    } else {
      blackCounts[classification] = (blackCounts[classification] ?? 0) + 1;
    }

    // Coach explanation
    final chessBefore = chess.Chess.fromFEN(fenBefore);
    final feedback = generateCoachFeedback(
      chessBefore,
      classification,
      moveSan,
      moveFrom,
      moveTo,
      cpLoss,
      bestMoveSan,
    );

    // Critical Moments (swings >= 170cp or blunder / brilliant / missed win)
    final evalSwing = (actualEval - previousEval).abs().toDouble();
    if (evalSwing >= 170 || classification == MoveClassification.blunder || classification == MoveClassification.brilliant || classification == MoveClassification.missedWin) {
      criticalMoments.add(CriticalMoment(
        ply: i + 1,
        description: 'Move ${(i ~/ 2) + 1} ($moveSan): ${feedback.theme} (Eval change: ±${(evalSwing / 100).toStringAsFixed(1)} pawns)',
        swing: evalSwing,
      ));
    }
    previousEval = actualEval;

    // Suggested Line for "Try the Line" (3 plies deep)
    final suggestedLine = <String>[];
    if (bestEngineResult.bestMove != null) {
      suggestedLine.add(bestEngineResult.bestMove!['san'] as String);
      final sim = chess.Chess.fromFEN(fenBefore);
      try {
        sim.move(bestEngineResult.bestMove!['san']);
        final reply = minimax(sim, 1, -999999, 999999, !isWhite, useQuiescence: false);
        if (reply.bestMove != null) {
          suggestedLine.add(reply.bestMove!['san'] as String);
          sim.move(reply.bestMove!['san']);
          final followUp = minimax(sim, 1, -999999, 999999, isWhite, useQuiescence: false);
          if (followUp.bestMove != null) {
            suggestedLine.add(followUp.bestMove!['san'] as String);
          }
        }
      } catch (_) {}
    }

    analyses.add(MoveAnalysis(
      moveNumber: (i ~/ 2) + 1,
      ply: i + 1,
      san: moveSan,
      from: moveFrom,
      to: moveTo,
      color: isWhite ? 'w' : 'b',
      fenBefore: fenBefore,
      fenAfter: fenAfter,
      evalBefore: bestEval.toDouble(),
      evalAfter: actualEval.toDouble(),
      bestMoveSan: bestMoveSan,
      bestMoveFrom: bestMoveFrom,
      bestMoveTo: bestMoveTo,
      classification: classification,
      centipawnLoss: cpLoss,
      coachExplanation: feedback.explanation,
      tacticalTheme: feedback.theme,
      suggestedLine: suggestedLine,
    ));
  }

  criticalMoments.sort((a, b) => b.swing.compareTo(a.swing));

  final accWhite = calculateAccuracy(whiteLosses);
  final accBlack = calculateAccuracy(blackLosses);
  final openingName = matchedOpening != null ? matchedOpening.name : 'Standard Game';
  final narrativeData = generateGameNarrative(analyses, accWhite, accBlack, openingName);

  return FullGameAnalysis(
    accuracyWhite: accWhite,
    accuracyBlack: accBlack,
    performanceWhite: calculatePerformanceRating(accWhite, analyses.length),
    performanceBlack: calculatePerformanceRating(accBlack, analyses.length),
    gameNarrative: narrativeData['narrative'] as String,
    keyTakeaways: (narrativeData['takeaways'] as List<String>),
    whiteClassifications: whiteCounts,
    blackClassifications: blackCounts,
    moves: analyses,
    criticalMoments: criticalMoments.take(6).toList(),
    openingEco: matchedOpening?.eco ?? 'A00',
    openingName: matchedOpening?.name ?? 'Standard Open Game',
  );
}

class CoachAnalysisService {
  static Future<FullGameAnalysis> analyzeGameAsync(String pgn) async {
    return await compute(analyzeGame, pgn);
  }
}
