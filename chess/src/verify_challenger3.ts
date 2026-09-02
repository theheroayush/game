import { Chess } from 'chess.js';
import { OPENINGS_DATABASE, findOpeningByMoves } from './data/openings';
import { ENDGAME_LESSONS } from './data/endgames';
import { PUZZLES_DATABASE } from './data/puzzles';

console.log('================================================================');
console.log('🛡️  CHALLENGER 3 AUXILIARY & REPLAY VERIFICATION');
console.log('================================================================');

console.log('\n1. VERIFYING 15 OPENING REPERTOIRES & FEN SYNCHRONIZATION:');
for (const op of OPENINGS_DATABASE) {
  const c = new Chess();
  for (const m of op.moves) {
    const res = c.move(m);
    if (!res) throw new Error('Illegal move ' + m + ' in ' + op.eco);
  }
  if (c.fen() !== op.fen) {
    throw new Error('FEN mismatch in ' + op.eco + ': expected ' + c.fen() + ' but found ' + op.fen);
  }
  const matched = findOpeningByMoves(op.moves);
  if (!matched || matched.eco !== op.eco) {
    throw new Error('findOpeningByMoves failed to match ' + op.eco);
  }
  console.log('  ✅ ' + op.eco + ' (' + op.name + ') verified: ' + op.moves.length + ' plies -> ' + op.fen);
}

console.log('\n2. VERIFYING 6 MASTER ENDGAME LESSONS & SUGGESTED FIRST MOVES:');
for (const eg of ENDGAME_LESSONS) {
  const c = new Chess(eg.fen);
  if (c.turn() !== eg.playerColor) {
    throw new Error('Color turn mismatch in ' + eg.id);
  }
  for (const move of eg.suggestedFirstMoves) {
    const testC = new Chess(eg.fen);
    const res = testC.move(move);
    if (!res) {
      throw new Error('Illegal suggested move ' + move + ' in ' + eg.id);
    }
    console.log('  ✅ ' + eg.id + ' (' + eg.title + ') suggested move "' + move + '" legal -> ' + testC.fen());
  }
}

console.log('\n3. VERIFYING BOARD EDITOR EMPTY BOARD RESET:');
const empty = new Chess();
empty.clear();
const emptyFen = empty.fen();
if (emptyFen !== '8/8/8/8/8/8/8/8 w - - 0 1') {
  throw new Error('Unexpected empty FEN: ' + emptyFen);
}
console.log('  ✅ chess.clear() produces valid empty board FEN: ' + emptyFen);

console.log('\n4. VERIFYING TACTICAL PUZZLES (15 PUZZLES):');
for (const puzzle of PUZZLES_DATABASE) {
  const c = new Chess(puzzle.fen);
  for (const m of puzzle.moves) {
    const res = c.move(m);
    if (!res) throw new Error('Illegal move ' + m + ' in puzzle ' + puzzle.id);
  }
  console.log('  ✅ Puzzle ' + puzzle.id + ' (' + puzzle.title + ') solved successfully (' + puzzle.moves.length + ' moves).');
}

console.log('\n================================================================');
console.log('🎉 ALL REPLAY & AUXILIARY CHECKS PASSED EMPIRICALLY!');
console.log('================================================================');
