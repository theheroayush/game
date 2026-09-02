import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useUserStore } from '../stores/userStore';
import { useRoomStore } from '../stores/roomStore';
import { LudoBoard } from '../components/board/LudoBoard';
import { Dice3D } from '../components/dice/Dice3D';
import { PlayerCard } from '../components/hud/PlayerCard';
import { TurnBanner } from '../components/hud/TurnBanner';
import { GameOverModal } from '../components/modals/GameOverModal';
import { LogOut, Smile, Volume2, VolumeX, AlertTriangle, Sparkles } from 'lucide-react';

interface GamePageProps {
  onReturnHome: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onReturnHome }) => {
  const {
    gameState,
    isRolling,
    selectedTokenId,
    toastMessage,
    toastType,
    turnSecondsRemaining,
    rollDice,
    selectToken,
    quitGame,
    startLocalGame
  } = useGameStore();

  const { profile, soundEnabled, toggleSound } = useUserStore();
  const { sendReaction } = useRoomStore();

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  if (!gameState) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold text-white mb-3 font-display">No Active Game</h2>
        <button
          onClick={onReturnHome}
          className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm cursor-pointer shadow-lg shadow-amber-500/20"
        >
          Return to Main Menu
        </button>
      </div>
    );
  }

  const activeColor = gameState.activePlayerColor;
  const activePlayer = gameState.players.find((p) => p.color === activeColor);

  // Check if current user is active player
  const isMyTurn =
    activePlayer?.type === 'HUMAN' &&
    (gameState.mode === 'LOCAL' || activePlayer?.id === profile.id);

  const canRoll = Boolean(isMyTurn && !gameState.dice.rolled && gameState.status === 'ACTIVE');

  // Handle Play Again
  const handlePlayAgain = () => {
    startLocalGame(
      gameState.mode,
      gameState.players.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        color: p.color,
        type: p.type,
        aiDifficulty: p.aiDifficulty
      })),
      gameState.rules
    );
  };

  const handleQuit = () => {
    quitGame();
    onReturnHome();
  };

  const emojiReactions = ['🔥', '🎉', '😱', '🎲', '👑', '😎', '💥', 'GG'];

  // Map players by color
  const redPlayer = gameState.players.find((p) => p.color === 'RED');
  const greenPlayer = gameState.players.find((p) => p.color === 'GREEN');
  const yellowPlayer = gameState.players.find((p) => p.color === 'YELLOW');
  const bluePlayer = gameState.players.find((p) => p.color === 'BLUE');

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6 flex flex-col items-center min-h-[calc(100vh-4.5rem)] select-none">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 max-w-6xl">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {gameState.mode === 'LOCAL'
              ? 'Local Match'
              : gameState.mode === 'AI'
              ? 'Vs AI Bot'
              : `Room: ${gameState.code}`}
          </span>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Turn #{gameState.turnNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            title="Send Reaction"
            className="p-2 rounded-xl glass-button text-slate-300 hover:text-white cursor-pointer"
          >
            <Smile className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            className="p-2 rounded-xl glass-button text-slate-300 hover:text-white cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            onClick={() => setShowLeaveConfirm(true)}
            className="p-2 sm:px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </div>

      {/* Floating Reaction Bar */}
      {showReactionPicker && (
        <div className="w-full max-w-sm mb-3 p-2 rounded-2xl glass-panel border border-slate-700 shadow-xl flex items-center justify-around animate-fade-in">
          {emojiReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                sendReaction(emoji);
                setShowReactionPicker(false);
              }}
              className="text-xl p-1.5 rounded-xl hover:bg-slate-800 hover:scale-125 transition-all cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Live Toast Notice */}
      {toastMessage && (
        <div
          className={`w-full max-w-lg mb-2.5 px-4 py-2 rounded-2xl text-xs font-bold text-center border shadow-xl animate-fade-in transition-all ${
            toastType === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : toastType === 'warning'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : toastType === 'error'
              ? 'bg-red-500/20 text-red-300 border-red-500/50'
              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
          }`}
        >
          {toastMessage}
        </div>
      )}

      {/* Turn Banner */}
      <div className="w-full max-w-6xl mb-3">
        <TurnBanner
          gameState={gameState}
          myPlayerId={profile.id}
          turnSeconds={turnSecondsRemaining}
        />
      </div>

      {/* Main Arena Layout: Left (Red & Green), Center (Board), Right (Yellow & Blue + Corner 3D Dice) */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-start justify-center">
        {/* Left Side: Red & Green Player Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 order-2 lg:order-1">
          {redPlayer && (
            <PlayerCard
              player={redPlayer}
              isActive={activeColor === redPlayer.color}
              timerSeconds={turnSecondsRemaining}
              maxTimerSeconds={gameState.rules.turnTimerSeconds}
            />
          )}
          {greenPlayer && (
            <PlayerCard
              player={greenPlayer}
              isActive={activeColor === greenPlayer.color}
              timerSeconds={turnSecondsRemaining}
              maxTimerSeconds={gameState.rules.turnTimerSeconds}
            />
          )}
        </div>

        {/* Center: Ludo Board */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
          <LudoBoard
            gameState={gameState}
            selectedTokenId={selectedTokenId}
            onTokenClick={selectToken}
          />
        </div>

        {/* Right Side: Yellow & Blue Player Cards + Corner 3D Dice Station */}
        <div className="lg:col-span-3 flex flex-col gap-3 order-3">
          {/* Yellow & Blue Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {yellowPlayer && (
              <PlayerCard
                player={yellowPlayer}
                isActive={activeColor === yellowPlayer.color}
                timerSeconds={turnSecondsRemaining}
                maxTimerSeconds={gameState.rules.turnTimerSeconds}
              />
            )}
            {bluePlayer && (
              <PlayerCard
                player={bluePlayer}
                isActive={activeColor === bluePlayer.color}
                timerSeconds={turnSecondsRemaining}
                maxTimerSeconds={gameState.rules.turnTimerSeconds}
              />
            )}
          </div>

          {/* DEDICATED CORNER 3D DICE STATION */}
          <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl flex flex-col items-center">
            {/* Header / Active Player Pill */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 pb-2.5 mb-2 border-b border-slate-800">
              <span className="flex items-center gap-2 text-white">
                <span
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    activeColor === 'RED'
                      ? 'bg-red-500 shadow-sm shadow-red-500/50'
                      : activeColor === 'GREEN'
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                      : activeColor === 'YELLOW'
                      ? 'bg-amber-500 shadow-sm shadow-amber-500/50'
                      : 'bg-blue-500 shadow-sm shadow-blue-500/50'
                  }`}
                />
                <span className="truncate max-w-[120px]">{activePlayer?.name}'s Turn</span>
              </span>
              <span className="font-mono text-amber-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                6s: {gameState.consecutiveSixes}/3
              </span>
            </div>

            {/* 3D Rolling Dice Cube */}
            <Dice3D
              value={gameState.dice.value}
              isRolling={isRolling}
              canRoll={canRoll}
              activeColor={activeColor}
              onRoll={rollDice}
              disabled={gameState.status !== 'ACTIVE'}
            />

            {/* Turn Status Subtitle */}
            <div className="w-full mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Last Value:</span>
              <span className="text-sm font-black text-amber-400 font-mono">
                {gameState.dice.value ?? '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Game Confirmation Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl text-center animate-fade-in">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Leave Current Match?
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Leaving an active game will return you to the main menu.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
              >
                Stay
              </button>
              <button
                onClick={handleQuit}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Leave Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Celebration Modal */}
      <GameOverModal
        gameState={gameState}
        onPlayAgain={handlePlayAgain}
        onHome={handleQuit}
      />
    </div>
  );
};
