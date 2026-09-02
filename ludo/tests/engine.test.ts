import { describe, it, expect } from 'vitest';
import {
  createInitialGameState,
  calculateLegalMoves,
  rollDice,
  moveToken,
  getNextActivePlayerColor
} from '../src/engine/game-engine';
import { isPositionSafe, getGlobalTrackIndex } from '../src/engine/coordinates';

describe('Ludo Game Engine - Core Acceptance Rules', () => {
  const basePlayers = [
    { id: 'p1', name: 'Alice', avatar: 'avatar1', color: 'RED' as const, type: 'HUMAN' as const },
    { id: 'p2', name: 'Bob', avatar: 'avatar2', color: 'GREEN' as const, type: 'HUMAN' as const }
  ];

  it('Test 1: Player rolls 6 with all four tokens in yard -> All 4 tokens are selectable', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });
    expect(state.activePlayerColor).toBe('RED');

    // Force dice roll to 6
    state = rollDice(state, 'RED', 6);
    expect(state.dice.value).toBe(6);
    expect(state.legalMoves.length).toBe(4);
    expect(state.legalMoves).toEqual([
      'red_token_0',
      'red_token_1',
      'red_token_2',
      'red_token_3'
    ]);
  });

  it('Test 2: Player rolls 5 with all tokens in yard -> No moves, turn automatically passes', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });
    expect(state.activePlayerColor).toBe('RED');

    // Force roll 5
    state = rollDice(state, 'RED', 5);
    expect(state.dice.value).toBe(5);
    expect(state.legalMoves.length).toBe(0);
    // Turn should have automatically passed to GREEN
    expect(state.activePlayerColor).toBe('GREEN');
  });

  it('Test 3: Player has one token exactly 3 cells from home and rolls 3 -> Token reaches HOME', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });
    // Set red_token_0 to step 53 (3 steps from 56)
    state.players[0].tokens[0].step = 53;
    state.players[0].tokens[0].inYard = false;

    state = rollDice(state, 'RED', 3);
    expect(state.legalMoves).toContain('red_token_0');

    const result = moveToken(state, 'RED', 'red_token_0');
    expect(result.reachedHome).toBe(true);
    expect(result.toStep).toBe(56);
    const movedToken = result.nextState.players[0].tokens.find((t) => t.id === 'red_token_0');
    expect(movedToken?.isHome).toBe(true);
    expect(movedToken?.step).toBe(56);
  });

  it('Test 4: Player has one token 3 cells from home and rolls 4 -> Move is invalid (exact finish)', () => {
    let state = createInitialGameState({
      code: 'AB7K9',
      mode: 'LOCAL',
      players: basePlayers,
      rules: { exactFinish: true }
    });
    // Set red_token_0 to step 53
    state.players[0].tokens[0].step = 53;
    state.players[0].tokens[0].inYard = false;

    const legal = calculateLegalMoves(state, 'RED', 4);
    expect(legal).not.toContain('red_token_0');
  });

  it('Test 5: Token lands on opponent on non-safe cell -> Captures opponent to yard & grants bonus turn', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });

    // Red start is track 0. Green start is track 13.
    // Place Green token on track 5 (Green relative step: (5 - 13 + 52) % 52 = 44)
    state.players[1].tokens[0].step = 44; // Green token at global track index (13 + 44) % 52 = 5
    state.players[1].tokens[0].inYard = false;

    // Place Red token at track 1 (Red relative step 1)
    state.players[0].tokens[0].step = 1;
    state.players[0].tokens[0].inYard = false;

    // Red rolls 4 (1 + 4 = 5) -> Lands on track 5 (non-safe)
    state = rollDice(state, 'RED', 4);
    expect(state.legalMoves).toContain('red_token_0');

    const result = moveToken(state, 'RED', 'red_token_0');
    expect(result.capturedTokenId).toBe('green_token_0');
    expect(result.capturedPlayerColor).toBe('GREEN');
    expect(result.grantedExtraTurn).toBe(true);

    // Verify Green token returned to yard
    const greenToken = result.nextState.players[1].tokens.find((t) => t.id === 'green_token_0');
    expect(greenToken?.step).toBe(-1);
    expect(greenToken?.inYard).toBe(true);

    // Verify Red gets next turn (extra turn)
    expect(result.nextState.activePlayerColor).toBe('RED');
  });

  it('Test 6: Token lands on safe cell occupied by opponent -> Opponent is NOT captured', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });

    // Global Track Pos 8 is Green Star Safe cell.
    // Green token at Track 8: Green relative step is (8 - 13 + 52) % 52 = 47
    state.players[1].tokens[0].step = 47;
    state.players[1].tokens[0].inYard = false;

    // Red token at step 4 (Global track pos 4)
    state.players[0].tokens[0].step = 4;
    state.players[0].tokens[0].inYard = false;

    // Red rolls 4 -> lands on step 8 (Global track pos 8, Safe Star)
    state = rollDice(state, 'RED', 4);
    const result = moveToken(state, 'RED', 'red_token_0');

    expect(result.capturedTokenId).toBeUndefined();
    const greenToken = result.nextState.players[1].tokens.find((t) => t.id === 'green_token_0');
    expect(greenToken?.step).toBe(47); // Not sent to yard
    expect(greenToken?.inYard).toBe(false);
  });

  it('Test 7: Moving another player token throws error', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });
    state = rollDice(state, 'RED', 6);

    expect(() => {
      moveToken(state, 'RED', 'green_token_0');
    }).toThrow();
  });

  it('Test 8: Three consecutive 6s rule forfeits turn immediately', () => {
    let state = createInitialGameState({
      code: 'AB7K9',
      mode: 'LOCAL',
      players: basePlayers,
      rules: { maxConsecutiveSixes: 3 }
    });

    // 1st Six
    state = rollDice(state, 'RED', 6);
    state = moveToken(state, 'RED', 'red_token_0').nextState;
    expect(state.activePlayerColor).toBe('RED');
    expect(state.consecutiveSixes).toBe(1);

    // 2nd Six
    state = rollDice(state, 'RED', 6);
    state = moveToken(state, 'RED', 'red_token_1').nextState;
    expect(state.activePlayerColor).toBe('RED');
    expect(state.consecutiveSixes).toBe(2);

    // 3rd Six -> Penalty should trigger immediately and pass turn to GREEN!
    state = rollDice(state, 'RED', 6);
    expect(state.activePlayerColor).toBe('GREEN');
    expect(state.consecutiveSixes).toBe(0);
  });

  it('Test 11: All 4 tokens reach HOME -> Player wins and game completes', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'LOCAL', players: basePlayers });

    // Set tokens 0, 1, 2 to HOME
    state.players[0].tokens[0].step = 56;
    state.players[0].tokens[0].isHome = true;
    state.players[0].tokens[0].inYard = false;

    state.players[0].tokens[1].step = 56;
    state.players[0].tokens[1].isHome = true;
    state.players[0].tokens[1].inYard = false;

    state.players[0].tokens[2].step = 56;
    state.players[0].tokens[2].isHome = true;
    state.players[0].tokens[2].inYard = false;

    // Token 3 is at step 55 (1 away from 56)
    state.players[0].tokens[3].step = 55;
    state.players[0].tokens[3].inYard = false;

    state = rollDice(state, 'RED', 1);
    const result = moveToken(state, 'RED', 'red_token_3');

    expect(result.gameFinished).toBe(true);
    expect(result.nextState.status).toBe('FINISHED');
    expect(result.winnerColor).toBe('RED');
    expect(result.nextState.winnerOrder).toEqual(['RED']);
  });
});
