import { GameState, PlayerColor, AIDifficulty, TokenState } from '../types/game';
import {
  getGlobalTrackIndex,
  isPositionSafe,
  STAR_TRACK_INDICES
} from './coordinates';

/**
 * Evaluates candidate moves and selects the best token to move for an AI player.
 */
export function selectAIMove(
  state: GameState,
  aiColor: PlayerColor,
  difficulty: AIDifficulty = 'NORMAL'
): string | null {
  const legalMoves = state.legalMoves;
  if (!legalMoves || legalMoves.length === 0) return null;
  if (legalMoves.length === 1) return legalMoves[0];

  const diceValue = state.dice.value || 1;
  const player = state.players.find((p) => p.color === aiColor);
  if (!player) return legalMoves[0];

  switch (difficulty) {
    case 'EASY':
      return selectEasyMove(player.tokens, legalMoves);
    case 'NORMAL':
      return selectNormalMove(state, player.tokens, legalMoves, aiColor, diceValue);
    case 'HARD':
      return selectHardMove(state, player.tokens, legalMoves, aiColor, diceValue);
    case 'EXPERT':
      return selectExpertMove(state, player.tokens, legalMoves, aiColor, diceValue);
    default:
      return legalMoves[0];
  }
}

function selectEasyMove(tokens: TokenState[], legalMoves: string[]): string {
  // Mostly random, 60% chance to release from yard if available
  const yardToken = legalMoves.find((id) => {
    const t = tokens.find((tok) => tok.id === id);
    return t && t.step === -1;
  });

  if (yardToken && Math.random() < 0.6) {
    return yardToken;
  }

  const randomIndex = Math.floor(Math.random() * legalMoves.length);
  return legalMoves[randomIndex];
}

function scoreMove(
  state: GameState,
  token: TokenState,
  aiColor: PlayerColor,
  diceValue: number,
  weights: {
    capture: number;
    homeReach: number;
    homeLaneEnter: number;
    yardRelease: number;
    safeZoneLand: number;
    vulnerabilityPenalty: number;
    progressAdvancement: number;
  }
): number {
  let score = 0;
  const fromStep = token.step;
  const toStep = fromStep === -1 ? 0 : fromStep + diceValue;

  // 1. Reaching HOME (Step 56)
  if (toStep === 56) {
    score += weights.homeReach;
  }

  // 2. Entering Home Lane (Step 51..55)
  if (fromStep <= 50 && toStep >= 51) {
    score += weights.homeLaneEnter;
  }

  // 3. Yard Release
  if (fromStep === -1 && toStep === 0) {
    score += weights.yardRelease;
  }

  // 4. Capture Opportunity
  if (toStep >= 0 && toStep <= 50 && !isPositionSafe(aiColor, toStep)) {
    const targetTrack = getGlobalTrackIndex(aiColor, toStep);
    if (targetTrack !== null) {
      let captureCount = 0;
      for (const opp of state.players) {
        if (opp.color === aiColor) continue;
        for (const oppToken of opp.tokens) {
          if (oppToken.step >= 0 && oppToken.step <= 50) {
            if (getGlobalTrackIndex(opp.color, oppToken.step) === targetTrack) {
              captureCount++;
            }
          }
        }
      }
      if (captureCount > 0) {
        score += weights.capture * captureCount;
      }
    }
  }

  // 5. Landing on Safe Zone / Star
  if (toStep >= 0 && toStep <= 50) {
    const targetTrack = getGlobalTrackIndex(aiColor, toStep);
    if (targetTrack !== null && STAR_TRACK_INDICES.has(targetTrack)) {
      score += weights.safeZoneLand;
    }
  }

  // 6. Vulnerability Penalty (Opponents within 1..6 steps behind)
  if (toStep >= 0 && toStep <= 50 && !isPositionSafe(aiColor, toStep)) {
    const targetTrack = getGlobalTrackIndex(aiColor, toStep);
    if (targetTrack !== null) {
      for (const opp of state.players) {
        if (opp.color === aiColor) continue;
        for (const oppToken of opp.tokens) {
          if (oppToken.step >= 0 && oppToken.step <= 50) {
            const oppTrack = getGlobalTrackIndex(opp.color, oppToken.step);
            if (oppTrack !== null) {
              const distance = (targetTrack - oppTrack + 52) % 52;
              if (distance >= 1 && distance <= 6) {
                score -= weights.vulnerabilityPenalty * (7 - distance);
              }
            }
          }
        }
      }
    }
  }

  // 7. General Progress Advancement
  score += toStep * weights.progressAdvancement;

  return score;
}

function selectNormalMove(
  state: GameState,
  tokens: TokenState[],
  legalMoves: string[],
  aiColor: PlayerColor,
  diceValue: number
): string {
  const weights = {
    capture: 100,
    homeReach: 90,
    homeLaneEnter: 60,
    yardRelease: 70,
    safeZoneLand: 35,
    vulnerabilityPenalty: 15,
    progressAdvancement: 1.0
  };

  let bestTokenId = legalMoves[0];
  let highestScore = -Infinity;

  for (const tokenId of legalMoves) {
    const token = tokens.find((t) => t.id === tokenId)!;
    const score = scoreMove(state, token, aiColor, diceValue, weights) + (Math.random() * 5);
    if (score > highestScore) {
      highestScore = score;
      bestTokenId = tokenId;
    }
  }

  return bestTokenId;
}

function selectHardMove(
  state: GameState,
  tokens: TokenState[],
  legalMoves: string[],
  aiColor: PlayerColor,
  diceValue: number
): string {
  const weights = {
    capture: 200,
    homeReach: 180,
    homeLaneEnter: 90,
    yardRelease: 85,
    safeZoneLand: 50,
    vulnerabilityPenalty: 40,
    progressAdvancement: 2.0
  };

  let bestTokenId = legalMoves[0];
  let highestScore = -Infinity;

  for (const tokenId of legalMoves) {
    const token = tokens.find((t) => t.id === tokenId)!;
    const score = scoreMove(state, token, aiColor, diceValue, weights);
    if (score > highestScore) {
      highestScore = score;
      bestTokenId = tokenId;
    }
  }

  return bestTokenId;
}

function selectExpertMove(
  state: GameState,
  tokens: TokenState[],
  legalMoves: string[],
  aiColor: PlayerColor,
  diceValue: number
): string {
  const weights = {
    capture: 350,
    homeReach: 300,
    homeLaneEnter: 160,
    yardRelease: 120,
    safeZoneLand: 95,
    vulnerabilityPenalty: 75,
    progressAdvancement: 3.5
  };

  let bestTokenId = legalMoves[0];
  let highestScore = -Infinity;

  for (const tokenId of legalMoves) {
    const token = tokens.find((t) => t.id === tokenId)!;
    let score = scoreMove(state, token, aiColor, diceValue, weights);

    // Advanced lookahead: escape existing threat if current pos is dangerous
    if (token.step >= 0 && token.step <= 50 && !isPositionSafe(aiColor, token.step)) {
      const currentTrack = getGlobalTrackIndex(aiColor, token.step);
      if (currentTrack !== null) {
        for (const opp of state.players) {
          if (opp.color === aiColor) continue;
          for (const oppToken of opp.tokens) {
            if (oppToken.step >= 0 && oppToken.step <= 50) {
              const oppTrack = getGlobalTrackIndex(opp.color, oppToken.step);
              if (oppTrack !== null) {
                const dist = (currentTrack - oppTrack + 52) % 52;
                if (dist >= 1 && dist <= 6) {
                  // Escaping danger gives a major boost!
                  score += 65 * (7 - dist);
                }
              }
            }
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTokenId = tokenId;
    }
  }

  return bestTokenId;
}
