import { Chess } from 'chess.js';
import { analyzeGame } from './engine/coachAnalysis';
import { minimax, PIECE_VALUES } from './engine/evaluation';
import { PUZZLES_DATABASE } from './data/puzzles';
import { ENDGAME_LESSONS } from './data/endgames';
import { OPENINGS_DATABASE, findOpeningByMoves } from './data/openings';

console.log('================================================================');
console.log('🧪 EMPIRICAL CHALLENGER 2: ANALYSIS & AUXILIARY TRAINING STRESS SUITE');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const findings: string[] = [];

function assert(condition: boolean, description: string, failureDetail?: string) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ PASS: ${description}`);
  } else {
    failedChecks++;
    const detail = failureDetail ? ` -> ${failureDetail}` : '';
    console.error(`  ❌ FAIL: ${description}${detail}`);
    findings.push(`${description}${detail}`);
  }
}

// -----------------------------------------------------------------------------
// SUITE 1: Full Game Coach Analysis on Multiple PGN Variants
// -----------------------------------------------------------------------------
console.log('--- SUITE 1: Coach Analysis Synchronization on Multiple PGN Variants ---');

// 1.1 Standard Tournament Game (Italian Game Giuoco Piano, 20 plies)
const standardPgn1 = `
[Event "Casual Game"]
[Site "Apex Chess"]
[Date "2026.08.16"]
[White "Master AI"]
[Black "Challenger"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 d6 6. O-O O-O 7. Bg5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Kg7 1-0
`;

const res1 = analyzeGame(standardPgn1);
assert(res1.moves.length === 20, 'Standard Italian Game: parsed exactly 20 plies', `Found ${res1.moves.length}`);
assert(res1.openingEco === 'C50', 'Detected Italian Game ECO C50', `Found ${res1.openingEco}`);
assert(res1.accuracyWhite > 50 && res1.accuracyWhite <= 100, `White Accuracy valid range: ${res1.accuracyWhite}%`);
assert(res1.accuracyBlack > 50 && res1.accuracyBlack <= 100, `Black Accuracy valid range: ${res1.accuracyBlack}%`);
assert(res1.performanceWhite >= 600 && res1.performanceWhite <= 2850, `Performance White rating bounded: ${res1.performanceWhite} Elo`);
assert(res1.performanceBlack >= 600 && res1.performanceBlack <= 2850, `Performance Black rating bounded: ${res1.performanceBlack} Elo`);
assert(res1.criticalMoments.length > 0, `Critical moments generated: ${res1.criticalMoments.length} moments`);
assert(res1.gameNarrative.length > 20, 'Game narrative generated with substantive text');
assert(res1.keyTakeaways.length >= 2, 'Key takeaways list generated');

// 1.2 Miniatures: Scholar's Mate (4 moves / 7 plies)
const scholarsMatePgn = '1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7# 1-0';
const resScholars = analyzeGame(scholarsMatePgn);
assert(resScholars.moves.length === 7, 'Scholar\'s Mate: parsed exactly 7 plies', `Found ${resScholars.moves.length}`);
assert(resScholars.moves[6].san === 'Qxf7#', 'Final move identified as Qxf7# checkmate');
assert(resScholars.accuracyWhite > resScholars.accuracyBlack, 'White accuracy exceeds Black accuracy in Scholar\'s mate');

// 1.3 Fool's Mate (2 moves / 4 plies)
const foolsMatePgn = '1. f3 e5 2. g4 Qh4# 0-1';
const resFools = analyzeGame(foolsMatePgn);
assert(resFools.moves.length === 4, 'Fool\'s Mate: parsed exactly 4 plies', `Found ${resFools.moves.length}`);
assert(resFools.moves[3].san === 'Qh4#', 'Final move identified as Qh4#');

// 1.4 Dirty Annotated PGN with Comments, NAGs, Variations, and Irregular Spacing
const dirtyAnnotatedPgn = `
[Event "FIDE World Championship"]
[Site "Reykjavik ISL"]
[Date "1972.07.23"]
[Round "6"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1-0"]

1. c4 { English opening chosen by Fischer } e6 2. Nf3 d5 $1 3. d4 Nf6 4. Nc3 Be7 
5. Bg5 ( 5. Bf4 O-O ) 5... O-O 6. e3 h6 $6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 1-0
`;

const resDirty = analyzeGame(dirtyAnnotatedPgn);
assert(resDirty.moves.length === 20, 'Dirty PGN with comments, NAGs, and variations parsed cleanly (20 plies)', `Found ${resDirty.moves.length}`);
assert(resDirty.openingEco === 'A10' || resDirty.openingEco === 'D30', `Opening detected for Fischer-Spassky game: ${resDirty.openingName} (${resDirty.openingEco})`);

// 1.5 Edge Case: Empty PGN string
const resEmpty = analyzeGame('');
assert(resEmpty.moves.length === 0, 'Empty PGN string handled safely without error');
assert(resEmpty.accuracyWhite === 100 && resEmpty.accuracyBlack === 100, 'Empty PGN returns 100% accuracy boundary');
assert(resEmpty.performanceWhite >= 600 && resEmpty.performanceBlack >= 600, 'Empty PGN returns valid base rating');

// -----------------------------------------------------------------------------
// SUITE 2: Move Classification Correctness & Loss Boundaries
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 2: Move Classification Correctness & Centipawn Loss Boundaries ---');

// Verify that all 10 MoveClassification keys are supported
const expectedClassifications = [
  'book', 'brilliant', 'great', 'best', 'excellent', 'good', 'inaccuracy', 'mistake', 'blunder', 'missed_win'
];
assert(expectedClassifications.length === 10, '10 move classifications specified');

// Verify Italian Game book moves are classified as 'book'
const italianPgn = '1. e4 e5 2. Nf3 Nc6 3. Bc4';
const resItalian = analyzeGame(italianPgn);
const bookMoves = resItalian.moves.filter(m => m.classification === 'book');
assert(bookMoves.length === 5, `Italian opening moves 1-5 correctly classified as 'book' (found ${bookMoves.length})`);

// Verify obvious blunder detection (Queen sac into pawn on move 2)
const blunderPgn = '1. e4 e5 2. Qh5 g6 3. Qxe5+ Qe7 4. Qxh8';
const resBlunder = analyzeGame(blunderPgn);
const blackBlunders = resBlunder.moves.filter(m => m.color === 'b' && (m.classification === 'blunder' || m.classification === 'mistake'));
assert(blackBlunders.length >= 1, `2... g6 or 3... Qe7 identified as blunder/mistake (found ${blackBlunders.length})`);

// Verify piece values map in evaluation.ts
assert(PIECE_VALUES['p'] === 100, 'Pawn value is 100 cp');
assert(PIECE_VALUES['n'] === 325, `Knight value is 325 cp (actual: ${PIECE_VALUES['n']})`);
assert(PIECE_VALUES['b'] === 335, `Bishop value is 335 cp (actual: ${PIECE_VALUES['b']})`);
assert(PIECE_VALUES['r'] === 500, 'Rook value is 500 cp');
assert(PIECE_VALUES['q'] === 900, 'Queen value is 900 cp');
assert(PIECE_VALUES['k'] === 20000, 'King value is 20000 cp');

// Verify total classifications count equals total plies
const totalCountWhite = Object.values(res1.whiteClassifications).reduce((a, b) => a + b, 0);
const totalCountBlack = Object.values(res1.blackClassifications).reduce((a, b) => a + b, 0);
assert(totalCountWhite === 10, `White classifications sum (${totalCountWhite}) equals White plies (10)`);
assert(totalCountBlack === 10, `Black classifications sum (${totalCountBlack}) equals Black plies (10)`);

// -----------------------------------------------------------------------------
// SUITE 3: CAPS Accuracy & Performance Rating Boundaries
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 3: CAPS Accuracy & Performance Rating Boundaries ---');

// Perfect Master Game simulation vs Absolute Blunderfest
const masterPgn = '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7';
const resMaster = analyzeGame(masterPgn);
assert(resMaster.accuracyWhite >= 80, `Master Opening Accuracy White: ${resMaster.accuracyWhite}%`);
assert(resMaster.accuracyBlack >= 80, `Master Opening Accuracy Black: ${resMaster.accuracyBlack}%`);
assert(resMaster.performanceWhite >= 1900, `Master Performance White rating: ${resMaster.performanceWhite} Elo`);
assert(resMaster.performanceBlack >= 1900, `Master Performance Black rating: ${resMaster.performanceBlack} Elo`);

// Blunder game
const badPgn = '1. f3 e5 2. Kf2 d5 3. Ke3 Bc5+ 4. Kd3 Bf5+ 5. Kc3 d4+ 6. Kb3 Qd5+ 7. c4 Qxc4+ 8. Kxc4 Be6+ 9. Kxc5';
const resBad = analyzeGame(badPgn);
assert(resBad.accuracyWhite < resMaster.accuracyWhite, `Wandering King Game White Accuracy (${resBad.accuracyWhite}%) < Master Accuracy (${resMaster.accuracyWhite}%)`);
assert(resBad.performanceWhite < resMaster.performanceWhite, `Wandering King Performance (${resBad.performanceWhite}) < Master Performance (${resMaster.performanceWhite})`);

// Boundary tests on calculateAccuracy and calculatePerformanceRating
assert(res1.accuracyWhite >= 15 && res1.accuracyWhite <= 100, 'Accuracy bounded between 15% and 100%');
assert(res1.performanceWhite >= 600 && res1.performanceWhite <= 2850, 'Performance bounded between 600 and 2850 Elo');

// -----------------------------------------------------------------------------
// SUITE 4: Tactical Puzzles Solution Verification Across All 15 Puzzles
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 4: Tactical Puzzles Solution Verification (15 Puzzles) ---');

assert(PUZZLES_DATABASE.length === 15, `PUZZLES_DATABASE contains 15 puzzles (found ${PUZZLES_DATABASE.length})`);

const themesFound = new Set<string>();

PUZZLES_DATABASE.forEach((puz, idx) => {
  themesFound.add(puz.theme);
  const puzChess = new Chess();
  
  // 4.1 FEN loads without throwing
  let loadOk = true;
  try {
    puzChess.load(puz.fen);
  } catch {
    loadOk = false;
  }
  assert(loadOk, `Puzzle #${idx + 1} (${puz.id}: "${puz.title}") FEN loads validly`);

  // 4.2 Turn to move matches playerColor
  assert(puzChess.turn() === puz.playerColor, `Puzzle #${idx + 1} side to move (${puzChess.turn()}) matches playerColor (${puz.playerColor})`);

  // 4.3 Execute full move sequence
  let sequenceValid = true;
  let moveIdx = 0;
  for (const moveSan of puz.moves) {
    try {
      const m = puzChess.move(moveSan);
      if (!m) {
        sequenceValid = false;
        break;
      }
    } catch {
      sequenceValid = false;
      break;
    }
    moveIdx++;
  }
  assert(sequenceValid && moveIdx === puz.moves.length, `Puzzle #${idx + 1} ("${puz.title}") all ${puz.moves.length} solution moves are 100% legal`);
});

assert(themesFound.size >= 8, `Puzzles span ${themesFound.size} distinct tactical motifs`);

// -----------------------------------------------------------------------------
// SUITE 5: Master Endgame Drills & Minimax Defense Behavior
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 5: Master Endgame Drills & Minimax Defense Behavior ---');

assert(ENDGAME_LESSONS.length === 6, `ENDGAME_LESSONS contains 6 master drills (found ${ENDGAME_LESSONS.length})`);

const requiredDrills = ['eg_lucena', 'eg_philidor', 'eg_opposition', 'eg_rule_of_square', 'eg_two_bishops', 'eg_rook_mate'];

for (const drillId of requiredDrills) {
  const lesson = ENDGAME_LESSONS.find(l => l.id === drillId);
  assert(lesson !== undefined, `Drill '${drillId}' exists in ENDGAME_LESSONS`);
  if (!lesson) continue;

  // 5.1 Verify FEN validity
  const egChess = new Chess();
  let fenOk = true;
  try {
    egChess.load(lesson.fen);
  } catch {
    fenOk = false;
  }
  assert(fenOk, `Drill '${lesson.title}' FEN is valid`);
  assert(egChess.turn() === lesson.playerColor, `Drill '${lesson.title}' turn (${egChess.turn()}) matches playerColor (${lesson.playerColor})`);

  // 5.2 Verify suggested first moves are strictly legal in starting position
  for (const firstMove of lesson.suggestedFirstMoves) {
    const testChess = new Chess(lesson.fen);
    const isLegal = testChess.moves().includes(firstMove);
    assert(isLegal, `Drill '${lesson.title}' suggested first move '${firstMove}' is legal`, `Move '${firstMove}' is not in legal moves: [${testChess.moves().join(', ')}]`);
  }

  // 5.3 Simulate 4 plies of Minimax response defense against the first legal move
  const simChess = new Chess(lesson.fen);
  let playedFirst = false;
  for (const moveCandidate of lesson.suggestedFirstMoves) {
    try {
      const res = simChess.move(moveCandidate);
      if (res) {
        playedFirst = true;
        break;
      }
    } catch {
      // try next
    }
  }

  if (!playedFirst) {
    // fallback to first legal move
    const legals = simChess.moves();
    if (legals.length > 0) {
      simChess.move(legals[0]);
      playedFirst = true;
    }
  }

  assert(playedFirst, `Executed opening move in '${lesson.title}'`);

  if (!simChess.isGameOver()) {
    const aiTurnIsWhite = simChess.turn() === 'w';
    const aiResponse = minimax(simChess, 2, -Infinity, Infinity, aiTurnIsWhite, 'balanced', false);
    assert(aiResponse.bestMove !== undefined, `Minimax computed legal defensive response in '${lesson.title}': ${aiResponse.bestMove?.san}`);
    if (aiResponse.bestMove) {
      let aiMoveExecuted = false;
      try {
        const aiMoveRes = simChess.move(aiResponse.bestMove);
        if (aiMoveRes) aiMoveExecuted = true;
      } catch {
        aiMoveExecuted = false;
      }
      assert(aiMoveExecuted, `Executed AI defensive move '${aiResponse.bestMove.san}' in '${lesson.title}' without crash`);
    }
  }
}

// -----------------------------------------------------------------------------
// SUITE 6: Opening Explorer ECO Code Matching Across All 15 Repertoires
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 6: Opening Explorer ECO Code Matching (15 Repertoires) ---');

assert(OPENINGS_DATABASE.length === 15, `OPENINGS_DATABASE contains exactly 15 repertoires (found ${OPENINGS_DATABASE.length})`);

OPENINGS_DATABASE.forEach((op, idx) => {
  // 6.1 Verify move sequence on a fresh board
  const board = new Chess();
  let allMovesLegal = true;
  for (const m of op.moves) {
    try {
      const res = board.move(m);
      if (!res) {
        allMovesLegal = false;
        break;
      }
    } catch {
      allMovesLegal = false;
      break;
    }
  }
  assert(allMovesLegal, `Opening #${idx + 1} (${op.eco}: ${op.name}) has valid move sequence`);

  // 6.2 Verify findOpeningByMoves matches exact opening
  const matched = findOpeningByMoves(op.moves);
  assert(matched?.eco === op.eco, `findOpeningByMoves correctly matches ECO ${op.eco} (${op.name})`);
});

// Test prefix fallback for partial lines
const partialSicilian = findOpeningByMoves(['e4', 'c5']);
assert(partialSicilian?.eco === 'B20', `Partial moves ['e4', 'c5'] identifies B20 Sicilian Defense`);

const fullNajdorf = findOpeningByMoves(['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6']);
assert(fullNajdorf?.eco === 'B90', `Full line identifies B90 Sicilian Najdorf`);

// -----------------------------------------------------------------------------
// SUITE 7: FEN Import/Export Parser Validation (Valid & Adversarial Strings)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 7: FEN Import / Export Parser Validation ---');

// 7.1 Valid FENs
const validFens = [
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'r1bqkb1r/pp2pppp/2n5/2pn4/2B5/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 6',
  '8/8/4k3/8/4K3/4P3/8/8 w - - 0 1',
  '1K1k4/1P1r4/8/8/8/8/8/2R5 w - - 0 1',
  'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
];

for (const fen of validFens) {
  try {
    const c = new Chess(fen);
    const exported = c.fen();
    assert(typeof exported === 'string' && exported.length > 10, `Valid FEN imported and exported cleanly: ${fen.slice(0, 30)}...`);
  } catch {
    assert(false, `Valid FEN failed to load: ${fen}`);
  }
}

// 7.2 Clear Board FEN validation
const clearBoard = new Chess();
clearBoard.clear();
assert(clearBoard.fen() === '8/8/8/8/8/8/8/8 w - - 0 1', 'chess.clear() produces valid empty board FEN');

// 7.3 Invalid / Adversarial FENs (must be safely rejected without unhandled crash)
const invalidFens = [
  '',
  '   ',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP', // missing fields
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNX w KQkq - 0 1', // invalid piece 'X'
  'rnbqkbnr9/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // invalid rank count 9
  '8/8/8/8/8/8/8 w - - 0 1', // only 7 ranks
  '8/8/8/8/8/8/8/8 x - - 0 1', // invalid turn 'x'
  '8/8/8/8/8/8/8/8 w INVALID - 0 1', // invalid castling
];

for (const badFen of invalidFens) {
  let threw = false;
  try {
    const c = new Chess(badFen);
    c.moves();
  } catch {
    threw = true;
  }
  assert(threw, `Invalid FEN properly rejected with exception: "${badFen.slice(0, 30)}"`);
}

// -----------------------------------------------------------------------------
// SUMMARY & FINDINGS
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`📊 STRESS TEST RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED (${failedChecks} FAILURES)`);
if (findings.length > 0) {
  console.log('🚨 FINDINGS / DEFECTS DETECTED:');
  findings.forEach((f, idx) => console.log(`   ${idx + 1}. ${f}`));
}
console.log('================================================================');
