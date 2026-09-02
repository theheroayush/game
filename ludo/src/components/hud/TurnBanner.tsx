import React from 'react';
import { GameState } from '../../types/game';

interface TurnBannerProps {
  gameState: GameState;
  myPlayerId?: string;
  turnSeconds: number;
}

export const TurnBanner: React.FC<TurnBannerProps> = ({
  gameState,
  myPlayerId,
  turnSeconds
}) => {
  const activeColor = gameState.activePlayerColor;
  const activePlayer = gameState.players.find((p) => p.color === activeColor);
  if (!activePlayer) return null;

  const isMyTurn = activePlayer.id === myPlayerId;
  const rolled = gameState.dice.rolled;
  const diceValue = gameState.dice.value;

  let message = '';
  if (gameState.status === 'FINISHED') {
    const winner = gameState.players.find((p) => p.color === gameState.winnerOrder[0]);
    message = `🏆 Game Finished! ${winner?.name || 'Player'} Won!`;
  } else if (!rolled) {
    if (gameState.mode === 'LOCAL') {
      message = `${activePlayer.name}'s Turn — Roll the dice 🎲`;
    } else {
      message = isMyTurn ? 'Your Turn! Roll the dice 🎲' : `${activePlayer.name}'s turn to roll...`;
    }
  } else {
    if (gameState.mode === 'LOCAL') {
      message = `${activePlayer.name} rolled ${diceValue}! Select a glowing token to move.`;
    } else {
      message = isMyTurn
        ? `You rolled ${diceValue}! Select a glowing token to move.`
        : `${activePlayer.name} rolled ${diceValue}. Moving token...`;
    }
  }

  return (
    <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel border border-slate-700/60 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${
            activeColor === 'RED'
              ? 'bg-red-500'
              : activeColor === 'GREEN'
              ? 'bg-emerald-500'
              : activeColor === 'YELLOW'
              ? 'bg-amber-500'
              : 'bg-blue-500'
          }`}
        />
        <p className="text-sm font-semibold text-slate-200 truncate">
          {message}
        </p>
      </div>

      {gameState.status === 'ACTIVE' && (
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
          <span>⏱️</span>
          <span className={turnSeconds <= 5 ? 'text-red-400 font-extrabold' : ''}>
            {turnSeconds}s
          </span>
        </div>
      )}
    </div>
  );
};
