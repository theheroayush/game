import { describe, it, expect } from 'vitest';
import { createInitialGameState, rollDice } from '../src/engine/game-engine';
import { selectAIMove } from '../src/engine/ai';

describe('Ludo AI Engine Tests', () => {
  const players = [
    { id: 'p1', name: 'Alice', avatar: 'avatar1', color: 'RED' as const, type: 'HUMAN' as const },
    { id: 'bot1', name: 'Bot-Green', avatar: 'avatar2', color: 'GREEN' as const, type: 'AI' as const, aiDifficulty: 'EXPERT' as const }
  ];

  it('AI legally picks a token from available legal moves', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'AI', players });
    state.activePlayerColor = 'GREEN';

    state = rollDice(state, 'GREEN', 6);
    expect(state.legalMoves.length).toBe(4);

    const moveEasy = selectAIMove(state, 'GREEN', 'EASY');
    expect(state.legalMoves).toContain(moveEasy);

    const moveNormal = selectAIMove(state, 'GREEN', 'NORMAL');
    expect(state.legalMoves).toContain(moveNormal);

    const moveHard = selectAIMove(state, 'GREEN', 'HARD');
    expect(state.legalMoves).toContain(moveHard);

    const moveExpert = selectAIMove(state, 'GREEN', 'EXPERT');
    expect(state.legalMoves).toContain(moveExpert);
  });

  it('AI prioritizes capturing opponent token', () => {
    let state = createInitialGameState({ code: 'AB7K9', mode: 'AI', players });
    state.activePlayerColor = 'GREEN';

    // Green starts at Track 13
    // Opponent Red token is at Track 17 (relative Red step 17)
    state.players[0].tokens[0].step = 17;
    state.players[0].tokens[0].inYard = false;

    // Green has token_0 at track 14 (Green step 1) and token_1 at track 20 (Green step 7)
    state.players[1].tokens[0].step = 1;
    state.players[1].tokens[0].inYard = false;

    state.players[1].tokens[1].step = 7;
    state.players[1].tokens[1].inYard = false;

    // Green rolls 3. (token_0 at step 1 + 3 = step 4 -> Track (13+4)=17 -> CAPTURE!)
    state = rollDice(state, 'GREEN', 3);

    const expertChoice = selectAIMove(state, 'GREEN', 'EXPERT');
    expect(expertChoice).toBe('green_token_0');
  });
});
