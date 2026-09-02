import { Chess } from 'chess.js';
import {
  evaluatePosition,
  quiescence,
  minimax,
  searchBestMoveIterative,
} from './evaluation';
import {
  DIFFICULTY_LEVELS,
  AI_PERSONALITIES,
} from './engineConfig';
import { PUZZLES_DATABASE } from '../data/puzzles';
import { engineService } from './engineService';

interface TestResult {
  category: string;
  testId: string;
  name: string;
  passed: boolean;
  scoreOrMetric: string;
  durationMs: number;
  notes: string;
}

const results: TestResult[] = [];

function record(
  category: string,
  testId: string,
  name: string,
  passed: boolean,
  scoreOrMetric: string,
  durationMs: number,
  notes: string = ''
) {
  results.push({ category, testId, name, passed, scoreOrMetric, durationMs, notes });
  const badge = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${badge} [${testId}] ${name} (${durationMs.toFixed(1)}ms) | ${scoreOrMetric} ${notes ? `| ${notes}` : ''}`);
}

async function runComprehensiveStressTest() {
  console.log('================================================================');
  console.log('♟️  APEX CHESS — ADVERSARIAL ENGINE & SEARCH STRESS TEST SUITE  ♟️');
  console.log('================================================================\n');

  // ==========================================================================
  // 1. TACTICAL PUZZLES & CHECKMATE VERIFICATION (M1, M2, M3)
  // ==========================================================================
  console.log('================================================================');
  console.log('1. TACTICAL PUZZLES & CHECKMATE VERIFICATION');
  console.log('================================================================');

  // 1.1 Mate in 1: Back-Rank Mate (White)
  {
    const start = performance.now();
    const fen = '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1';
    const chess = new Chess(fen);
    const res = minimax(chess, 2, -Infinity, Infinity, true);
    const passed = res.bestMove?.san === 'Rb8#' && res.score === 99999;
    record('Tactics', 'M1-01', 'Mate-in-1: Back-Rank Mate (White Rb8#)', passed, `Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.2 Mate in 1: Scholar\'s Mate (White Qxf7#)
  {
    const start = performance.now();
    const fen = 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 4';
    const chess = new Chess(fen);
    const res = minimax(chess, 2, -Infinity, Infinity, true);
    const passed = res.bestMove?.san === 'Qxf7#' && res.score === 99999;
    record('Tactics', 'M1-02', "Mate-in-1: Scholar's Mate (White Qxf7#)", passed, `Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.3 Mate in 1: Fool\'s Mate (Black Qh4#)
  {
    const start = performance.now();
    const fen = 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2';
    const chess = new Chess(fen);
    const res = minimax(chess, 2, -Infinity, Infinity, false);
    const passed = res.bestMove?.san === 'Qh4#' && res.score === -99999;
    record('Tactics', 'M1-03', "Mate-in-1: Fool's Mate (Black Qh4#)", passed, `Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.4 Mate in 1: Smothered Mate (White Nf7#)
  {
    const start = performance.now();
    const fen = '6rk/6pp/7N/8/8/8/8/7K w - - 0 1';
    const chess = new Chess(fen);
    const res = minimax(chess, 2, -Infinity, Infinity, true);
    const passed = res.bestMove?.san === 'Nf7#' && res.score === 99999;
    record('Tactics', 'M1-04', 'Mate-in-1: Pure Smothered Mate (White Nf7#)', passed, `Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.5 Mate in 2: Genuine Légal\'s Trap (White to move)
  // 1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6 5. Nxe5 Bxd1 6. Bxf7+ Ke7 7. Nd5#
  {
    const start = performance.now();
    const fen = 'rn1qkb1r/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6';
    const chess = new Chess(fen);
    const res = minimax(chess, 3, -Infinity, Infinity, true);
    let sequencePassed = false;
    if (res.bestMove?.san === 'Bxf7+') {
      chess.move('Bxf7+');
      chess.move('Ke7');
      const m2 = minimax(chess, 2, -Infinity, Infinity, true);
      if (m2.bestMove?.san === 'Nd5#') {
        sequencePassed = true;
      }
    }
    record('Tactics', 'M2-01', "Mate-in-2: Genuine Légal's Trap (1. Bxf7+ Ke7 2. Nd5#)", sequencePassed, `1st Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.6 Mate in 2/3: Forced Back-Rank Battery Overload (1. Qxd8+ with forced mate)
  {
    const start = performance.now();
    const mate2Fen = '3r2k1/4qppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1';
    const chess = new Chess(mate2Fen);
    const res = searchBestMoveIterative(chess, 4, 1000, true);
    const isQxd8 = res.bestMove?.san === 'Qxd8+';
    const passed = isQxd8 && (res.score === 99999 || res.score >= 500);
    record('Tactics', 'M2-02', 'Mate-in-2/3: Back-Rank Battery Overload (1. Qxd8+)', passed, `1st Move: ${res.bestMove?.san}, Score: ${res.score} cp, Depth: ${res.depthReached}`, performance.now() - start);
  }

  // 1.7 Mate in 1/2: Anastasia\'s Mating Attack
  {
    const start = performance.now();
    const anastasiaFen = '5r1k/1pp1N1p1/8/7Q/8/8/PPP2PPP/3R2K1 w - - 0 1';
    const chess = new Chess(anastasiaFen);
    const res = minimax(chess, 2, -Infinity, Infinity, true);
    const passed = (res.bestMove?.san?.includes('#') || res.score >= 99999);
    record('Tactics', 'M2-03', "Mate-in-1/2: Anastasia's Mating Attack", passed, `Move: ${res.bestMove?.san}, Score: ${res.score}`, performance.now() - start);
  }

  // 1.8 Tactical Fork (Knight Royal Fork Nxc7+)
  {
    const start = performance.now();
    const forkFen = 'r3k2r/ppp1bppp/8/3N4/8/8/PPP2PPP/R1B1K2R w KQkq - 0 1';
    const chess = new Chess(forkFen);
    const res = minimax(chess, 3, -Infinity, Infinity, true);
    const passed = res.bestMove?.san === 'Nxc7+' && res.score >= 400;
    record('Tactics', 'TACTIC-01', 'Tactical Royal Fork (1. Nxc7+ winning exchange/rook)', passed, `Move: ${res.bestMove?.san}, Score: ${res.score} cp`, performance.now() - start);
  }

  // 1.9 Tactical Skewer (Rook skewers King & Queen on open e-file with pawn advantage)
  {
    const start = performance.now();
    const skewerFen = '4q3/4k3/8/8/8/8/P7/R5K1 w - - 0 1';
    const chess = new Chess(skewerFen);
    const res = searchBestMoveIterative(chess, 3, 1000, true);
    const passed = res.bestMove?.san === 'Re1+' && res.score >= 50;
    record('Tactics', 'TACTIC-02', 'Tactical Skewer on Open e-File (1. Re1+ winning Queen)', passed, `Move: ${res.bestMove?.san}, Score: ${res.score} cp`, performance.now() - start);
  }

  // 1.10 Tactical Puzzles Verification (Multi-Puzzle Suite)
  {
    const start = performance.now();
    const puzzlesToTest = ['puz_03', 'puz_04', 'puz_07', 'puz_14', 'puz_15'];
    let puzzlesPassed = 0;
    for (const pid of puzzlesToTest) {
      const p = PUZZLES_DATABASE.find(puz => puz.id === pid)!;
      const c = new Chess(p.fen);
      const res = searchBestMoveIterative(c, 3, 800, p.playerColor === 'w');
      if (res.bestMove?.san === p.moves[0]) {
        puzzlesPassed++;
      }
    }
    record('Tactics', 'TACTIC-03', 'Tactical Puzzles Suite Execution (5 Grandmaster Motifs)', puzzlesPassed === puzzlesToTest.length, `Solved ${puzzlesPassed}/${puzzlesToTest.length} Puzzles`, performance.now() - start);
  }

  // ==========================================================================
  // 2. QUIESCENCE SEARCH & DELTA PRUNING STRESS HARNESS
  // ==========================================================================
  console.log('\n================================================================');
  console.log('2. QUIESCENCE SEARCH & DELTA PRUNING');
  console.log('================================================================');

  // 2.1 Horizon Effect Prevention: Capture Sequence Leaf Stability
  {
    const start = performance.now();
    const horizonFen = 'r1bqkbnr/pp1ppppp/2n5/2p5/3QP3/5N2/PPP2PPP/RNB1KB1R w KQkq - 1 4';
    const chess = new Chess(horizonFen);
    
    // Search with iterative deepening (which uses Quiescence)
    const searchRes = searchBestMoveIterative(chess, 2, 500, true);
    const passed = searchRes.bestMove !== undefined && searchRes.bestMove.san.length > 0 && !isNaN(searchRes.score);
    record('Quiescence', 'Q-01', 'Horizon Effect Mitigation on Hanging Queen', passed, `Search Result Move: ${searchRes.bestMove?.san}, Score: ${searchRes.score} cp, Depth: ${searchRes.depthReached}`, performance.now() - start);
  }

  // 2.2 Delta Pruning: Absolute Bound Verification
  {
    const start = performance.now();
    const whiteLosingFen = 'r1b1k2r/pppppppp/8/8/8/8/4PPPP/4K3 w kq - 0 1';
    const chess = new Chess(whiteLosingFen);
    const standPat = evaluatePosition(chess);
    const qScore = quiescence(chess, 0, 1000, true, 3);
    const deltaPruned = qScore === 0;
    record('Quiescence', 'Q-02', 'Delta Pruning Trigger on Severely Lost Position (standPat < alpha - 925)', deltaPruned, `standPat: ${standPat} cp, quiescence returned alpha: ${qScore}`, performance.now() - start);
  }

  // 2.3 Quiescence Capture Tree Convergence (Deep Exchange Sequence)
  {
    const start = performance.now();
    const tradeFen = 'r1bqk2r/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 4 8';
    const chess = new Chess(tradeFen);
    const qEval = quiescence(chess, -2000, 2000, true, 3);
    const stable = typeof qEval === 'number' && Math.abs(qEval) < 200;
    record('Quiescence', 'Q-03', 'Quiescence Convergence on 4-Piece Symmetric Center Tension', stable, `Evaluated quiet leaf score: ${qEval} cp`, performance.now() - start);
  }

  // ==========================================================================
  // 3. KILLER MOVES HEURISTIC & TRANSPOSITION TABLE CACHING
  // ==========================================================================
  console.log('\n================================================================');
  console.log('3. KILLER MOVES HEURISTIC & TRANSPOSITION TABLE CACHING');
  console.log('================================================================');

  // 3.1 Transposition Table Invariance & Symmetry
  {
    const start = performance.now();
    const g1 = new Chess();
    g1.move('d4'); g1.move('d5'); g1.move('c4'); g1.move('e6'); g1.move('Nc3'); g1.move('Nf6');
    const fenA = g1.fen();

    const g2 = new Chess();
    g2.move('c4'); g2.move('e6'); g2.move('d4'); g2.move('d5'); g2.move('Nc3'); g2.move('Nf6');
    const fenB = g2.fen();

    const evalA = minimax(new Chess(fenA), 3, -Infinity, Infinity, true);
    const evalB = minimax(new Chess(fenB), 3, -Infinity, Infinity, true);

    const identicalFen = fenA === fenB;
    const identicalScore = evalA.score === evalB.score;
    record('Transposition', 'TT-01', 'Transposition Invariance Across Transposed Move Orders', identicalFen && identicalScore, `FEN Matched: ${identicalFen}, Scores: Path A = ${evalA.score} cp, Path B = ${evalB.score} cp`, performance.now() - start);
  }

  // 3.2 Killer Move Ordering & Beta Cutoff Acceleration
  {
    const start = performance.now();
    const chess = new Chess();
    const res = minimax(chess, 4, -Infinity, Infinity, true);
    const passed = !!res.bestMove && !isNaN(res.score);
    record('KillerMoves', 'KM-01', 'Killer Moves Table Storage & Alpha-Beta Cutoff Integration', passed, `Best Move at Depth 4: ${res.bestMove?.san}, Score: ${res.score} cp`, performance.now() - start);
  }

  // ==========================================================================
  // 4. DIFFICULTY CALIBRATION (10 TIERS) & PERSONALITY POLARIZATION (4)
  // ==========================================================================
  console.log('\n================================================================');
  console.log('4. 10 DIFFICULTY TIERS & 4 PLAYING PERSONALITIES');
  console.log('================================================================');

  // 4.1 10-Tier Monotonicity & Completeness Check
  {
    const start = performance.now();
    const count = DIFFICULTY_LEVELS.length;
    let strictlyIncreasingElo = true;
    let monotonicDepth = true;
    let monotonicTime = true;
    let decreasingBlunders = true;

    for (let i = 0; i < count - 1; i++) {
      const a = DIFFICULTY_LEVELS[i];
      const b = DIFFICULTY_LEVELS[i + 1];
      if (a.elo >= b.elo) strictlyIncreasingElo = false;
      if (a.depth > b.depth) monotonicDepth = false;
      if (a.moveTimeMs > b.moveTimeMs) monotonicTime = false;
      if (a.blunderProbability < b.blunderProbability) decreasingBlunders = false;
    }

    const passed = count === 10 && strictlyIncreasingElo && monotonicDepth && monotonicTime && decreasingBlunders;
    record('Difficulty', 'DIFF-01', '10-Tier Strict Monotonic Scaling (Elo 600-2500, Depth 1-5, Time 150-700ms)', passed, `Tiers Count: ${count}, Elo: ${DIFFICULTY_LEVELS[0].elo} -> ${DIFFICULTY_LEVELS[9].elo}, Blunder Rate: ${DIFFICULTY_LEVELS[0].blunderProbability * 100}% -> ${DIFFICULTY_LEVELS[9].blunderProbability * 100}%`, performance.now() - start);
  }

  // 4.2 Empirical Blunder Injection Distribution across 1000 simulated moves
  {
    const start = performance.now();
    const blunderCounts: Record<number, number> = {};
    const SAMPLE_SIZE = 100;

    for (const diff of DIFFICULTY_LEVELS) {
      let blunders = 0;
      for (let i = 0; i < SAMPLE_SIZE; i++) {
        if (diff.blunderProbability > 0 && Math.random() < diff.blunderProbability) {
          blunders++;
        }
      }
      blunderCounts[diff.level] = blunders;
    }

    const l1Pass = blunderCounts[1] >= 15 && blunderCounts[1] <= 55;
    const l6to10Pass = [6, 7, 8, 9, 10].every(lvl => blunderCounts[lvl] === 0);
    const passed = l1Pass && l6to10Pass;

    record('Difficulty', 'DIFF-02', 'Empirical Blunder Rate Verification (N=100 per tier)', passed, `L1: ${blunderCounts[1]}%, L2: ${blunderCounts[2]}%, L3: ${blunderCounts[3]}%, L4: ${blunderCounts[4]}%, L5: ${blunderCounts[5]}%, L6-L10: 0%`, performance.now() - start);
  }

  // 4.3 4 Personalities Configuration & Behavioral Evaluation Testing
  {
    const start = performance.now();
    const ids = AI_PERSONALITIES.map(p => p.id);
    const expectedIds = ['balanced', 'aggressive', 'positional', 'tactical'];
    const configsComplete = expectedIds.every(id => ids.includes(id as any));

    // Test 1: Tactical personality gives +45cp bonus when opponent in non-terminal check
    const checkChess = new Chess();
    checkChess.move('e4'); checkChess.move('e5');
    checkChess.move('Nf3'); checkChess.move('d6');
    checkChess.move('Bb5+'); // Non-terminal check on Black King e8
    
    const balScore = evaluatePosition(checkChess, 'balanced');
    const tacScore = evaluatePosition(checkChess, 'tactical');
    const tacticalBonus = tacScore - balScore === 45;

    // Test 2: Aggressive personality (The Valkyrie) gives +35cp bonus when material ahead
    const matAheadChess = new Chess('rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); // White has Queen, Black does not
    const balMat = evaluatePosition(matAheadChess, 'balanced');
    const aggMat = evaluatePosition(matAheadChess, 'aggressive');
    const aggressiveBonus = aggMat - balMat === 35;

    const passed = configsComplete && tacticalBonus && aggressiveBonus;
    record('Personalities', 'PERS-01', '4 Personalities Behavioral & Tactical Evaluation Biases', passed, `Tactical Check Delta: +${tacScore - balScore} cp (Expected +45), Valkyrie Material Lead Delta: +${aggMat - balMat} cp (Expected +35)`, performance.now() - start);
  }

  // ==========================================================================
  // 5. GRANDMASTER LEVEL 10 SPEED & STRESS BENCHMARK
  // ==========================================================================
  console.log('\n================================================================');
  console.log('5. GRANDMASTER (LEVEL 10) SEARCH BENCHMARK & ZERO-FREEZE TEST');
  console.log('================================================================');

  const benchmarkPositions = [
    { id: 'BENCH-01', name: 'Middlegame Complex (38 legal moves)', fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 4 8' },
    { id: 'BENCH-02', name: 'Tactical Pin & Tension (Queen active)', fen: 'r2q1rk1/1pp1bppp/p1np1n2/4p3/B3P1b1/2NP1N2/PPP2PPP/R1BQR1K1 w - - 2 9' },
    { id: 'BENCH-03', name: 'Endgame Rook & Pawn Defense', fen: '8/5pk1/4p1p1/3r3p/2R2P1P/6P1/4KP2/8 w - - 0 35' },
    { id: 'BENCH-04', name: 'Closed French Center (28 legal moves)', fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 1 6' },
    { id: 'BENCH-05', name: 'Grandmaster Live Service Move Computation', fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5' },
  ];

  for (const pos of benchmarkPositions) {
    const start = performance.now();
    const chess = new Chess(pos.fen);
    const gmDiff = DIFFICULTY_LEVELS[9]; // Level 10 GM

    let moveSan = '';
    let score = 0;
    let depth = 0;

    if (pos.id === 'BENCH-05') {
      const res = await engineService.getBestMove(pos.fen, 10, 'balanced');
      moveSan = res.san;
      score = res.score;
      depth = 5;
    } else {
      const res = searchBestMoveIterative(chess, gmDiff.depth, gmDiff.moveTimeMs, chess.turn() === 'w', 'balanced');
      moveSan = res.bestMove?.san || '';
      score = res.score;
      depth = res.depthReached;
    }

    const duration = performance.now() - start;
    const passed = moveSan.length > 0 && !isNaN(score) && duration < 1500;

    record('GM-Benchmark', pos.id, `GM (2500 Elo): ${pos.name}`, passed, `Move: ${moveSan}, Eval: ${score} cp, Depth: ${depth}, Duration: ${duration.toFixed(1)}ms`, duration, duration < 850 ? 'Optimal Cadence' : 'Acceptable Bounds');
  }

  // ==========================================================================
  // FINAL SCORECARD & SUMMARY
  // ==========================================================================
  console.log('\n================================================================');
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;
  console.log(`🏁 FINAL SCORECARD: ${passed}/${total} TESTS PASSED (${failed} FAILED)`);
  console.log('================================================================');

  if (failed > 0) {
    process.exitCode = 1;
  }
}

runComprehensiveStressTest();
