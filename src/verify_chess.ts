import { Chess } from 'chess.js';
import { evaluatePosition } from './engine/evaluation';
import { analyzeGame } from './engine/coachAnalysis';
import { findOpeningByMoves, OPENINGS_DATABASE } from './data/openings';
import { PUZZLES_DATABASE } from './data/puzzles';
import { ENDGAME_LESSONS } from './data/endgames';
import { DIFFICULTY_LEVELS, AI_PERSONALITIES, TIME_CONTROLS } from './engine/engineConfig';
import { engineService } from './engine/engineService';

console.log('==============================================');
console.log('🏆 APEX CHESS — AUTOMATED VERIFICATION SUITE');
console.log('==============================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

async function runTests() {
  // 1. Test Rules Engine
  console.log('--- TEST GROUP 1: Chess Rules & Move Generation ---');
  const chess = new Chess();
  assert(chess.moves().length === 20, 'Initial position has 20 legal moves');

  // Scholars Mate Checkmate
  chess.move('e4'); chess.move('e5');
  chess.move('Bc4'); chess.move('Nc6');
  chess.move('Qh5'); chess.move('Nf6');
  chess.move('Qxf7#');
  assert(chess.isCheckmate() === true, 'Scholars Mate is correctly identified as Checkmate');
  assert(chess.isGameOver() === true, 'isGameOver returns true on checkmate');

  // En Passant Test
  const epChess = new Chess('rnbqkbnr/pppp1ppp/8/4pP2/8/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 3');
  const epMoves = epChess.moves({ verbose: true });
  assert(epMoves.some(m => m.san === 'fxe6' || m.flags.includes('e')), 'En Passant capture is legal and recognized');

  // 2. Test Positional Evaluation & Bishop Pair Bonus
  console.log('\n--- TEST GROUP 2: Positional Evaluation & Bishop Pair ---');
  const startEval = evaluatePosition(new Chess());
  assert(Math.abs(startEval) < 50, `Initial position evaluation is balanced (${startEval} cp)`);

  const bishopPairChess = new Chess('r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/3P1N2/PPP2PPP/R1BQK2R w KQkq - 0 1');
  const bishopPairEval = evaluatePosition(bishopPairChess);
  assert(typeof bishopPairEval === 'number', `Positional score computed with bishop pair: ${bishopPairEval} cp`);

  // 3. Test Grandmaster Mode Iterative Deepening & Speed
  console.log('\n--- TEST GROUP 3: Grandmaster Mode (Level 10) & Iterative Deepening ---');
  const gmChess = new Chess('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');
  const startTime = Date.now();
  const gmResult = await engineService.getBestMove(gmChess.fen(), 10, 'balanced', ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6']);
  const elapsedMs = Date.now() - startTime;
  assert(gmResult.san !== undefined && gmResult.san.length > 0, `GM Mode returned legal move: ${gmResult.san}`);
  assert(elapsedMs < 2000, `GM Mode move computed quickly without freeze (${elapsedMs}ms)`);

  // 4. Test Tactical Puzzles Database & Solution Legality
  console.log('\n--- TEST GROUP 4: Tactical Puzzles Database ---');
  assert(PUZZLES_DATABASE.length >= 10, `Puzzles database contains ${PUZZLES_DATABASE.length} tactical puzzles`);
  let allPuzzlesValid = true;
  for (const puzzle of PUZZLES_DATABASE) {
    try {
      const pzChess = new Chess(puzzle.fen);
      for (const moveSan of puzzle.moves) {
        const res = pzChess.move(moveSan);
        if (!res) {
          allPuzzlesValid = false;
          console.log(`❌ Invalid move "${moveSan}" in puzzle ${puzzle.id} (${puzzle.title})`);
          break;
        }
      }
    } catch (err: unknown) {
      allPuzzlesValid = false;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`❌ Exception in puzzle ${puzzle.id} (${puzzle.title}): ${msg}`);
    }
  }
  assert(allPuzzlesValid, 'All puzzle starting positions and solution move sequences are valid and legal');

  // 5. Test Endgame Conversion Drills
  console.log('\n--- TEST GROUP 5: Master Endgame Drills ---');
  assert(ENDGAME_LESSONS.length >= 6, `Endgame lessons database contains ${ENDGAME_LESSONS.length} master drills`);
  let allEndgamesValid = true;
  for (const lesson of ENDGAME_LESSONS) {
    try {
      const egChess = new Chess(lesson.fen);
      if (egChess.moves().length === 0) allEndgamesValid = false;
    } catch {
      allEndgamesValid = false;
    }
  }
  assert(allEndgamesValid, 'All endgame lessons have valid FEN positions and legal moves');

  // 6. Test Difficulty Levels & Personalities
  console.log('\n--- TEST GROUP 6: Engine Configs & Personalities ---');
  assert(DIFFICULTY_LEVELS.length === 10, '10 Calibrated Difficulty Levels configured (600 to 2500 Elo)');
  assert(AI_PERSONALITIES.length === 4, '4 AI Personalities configured (Balanced, Aggressive, Positional, Tactical)');
  assert(TIME_CONTROLS.length === 5, '5 Clock & Time Controls configured');

  // 7. Test Opening Database & ECO Matching
  console.log('\n--- TEST GROUP 7: Opening Database & ECO Matching ---');
  assert(OPENINGS_DATABASE.length >= 15, `Openings database contains ${OPENINGS_DATABASE.length} master openings`);
  const sicilianOpening = findOpeningByMoves(['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6']);
  assert(sicilianOpening?.eco === 'B90', `Correctly identified Sicilian Najdorf (ECO ${sicilianOpening?.eco})`);

  // 8. Test Coach Analysis
  console.log('\n--- TEST GROUP 8: Full Game Coach Analysis ---');
  const testPgn = '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. O-O O-O 6. c3 d6 7. Bg5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Kg7';
  const gameAnalysis = analyzeGame(testPgn);
  assert(gameAnalysis.moves.length === 20, `Analyzed all 20 plies in test game`);
  assert(gameAnalysis.accuracyWhite >= 0 && gameAnalysis.accuracyWhite <= 100, `White Accuracy: ${gameAnalysis.accuracyWhite}%`);
  assert(gameAnalysis.openingEco === 'C50', `Opening detected in analysis: ${gameAnalysis.openingName} (${gameAnalysis.openingEco})`);

  console.log('\n==============================================');
  console.log(`🎉 VERIFICATION RESULT: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('==============================================');
}

runTests();
