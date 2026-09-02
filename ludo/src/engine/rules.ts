import { GameRuleConfig } from '../types/game';

export const DEFAULT_RULES: GameRuleConfig = {
  requiresSixToEnter: true,
  extraTurnOnSix: true,
  maxConsecutiveSixes: 3, // 3 sixes triggers turn forfeit
  extraTurnOnCapture: true,
  exactFinish: true, // must roll exact count to reach home step 56
  turnTimerSeconds: 30,
  stackingEnabled: true
};

export const COLOR_TURN_ORDER: Array<'RED' | 'GREEN' | 'YELLOW' | 'BLUE'> = [
  'RED',
  'GREEN',
  'YELLOW',
  'BLUE'
];
