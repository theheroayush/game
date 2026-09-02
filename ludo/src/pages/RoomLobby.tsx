import React, { useState, useEffect } from 'react';
import { useRoomStore } from '../stores/roomStore';
import { useUserStore } from '../stores/userStore';
import { useGameStore } from '../stores/gameStore';
import { PlayerColor, AIDifficulty, RoomPlayer } from '../types/game';
import {
  Copy,
  Check,
  Share2,
  Users,
  Bot,
  Plus,
  Trash2,
  Play,
  Settings,
  Shield,
  ArrowLeft
} from 'lucide-react';

interface RoomLobbyProps {
  onGameStarted: () => void;
  onLeaveLobby: () => void;
}

const COLOR_STYLES: Record<PlayerColor, { bg: string; border: string; text: string }> = {
  RED: { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400' },
  GREEN: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400' },
  YELLOW: { bg: 'bg-amber-500/10', border: 'border-amber-500/40', text: 'text-amber-400' },
  BLUE: { bg: 'bg-blue-500/10', border: 'border-blue-500/40', text: 'text-blue-400' }
};

export const RoomLobby: React.FC<RoomLobbyProps> = ({ onGameStarted, onLeaveLobby }) => {
  const {
    room,
    playerId,
    setReady,
    addBot,
    removeBot,
    startGame,
    leaveRoom,
    updateSettings,
    error,
    clearError
  } = useRoomStore();

  const { profile } = useUserStore();
  const { setNetworkGameState } = useGameStore();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Watch for game state transition to ACTIVE
  useEffect(() => {
    if (room?.gameState && room.status === 'ACTIVE') {
      setNetworkGameState(room.gameState);
      onGameStarted();
    }
  }, [room, onGameStarted, setNetworkGameState]);

  if (!room) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Connecting to Room...</h3>
        <p className="text-sm text-slate-400 mb-4">Please wait or return to the main menu.</p>
        <button
          onClick={onLeaveLobby}
          className="py-2.5 px-6 rounded-xl glass-button text-xs font-semibold cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const isHost = room.hostId === playerId;
  const myPlayer = room.players.find((p: RoomPlayer) => p.id === playerId);
  const allReady = room.players.length >= 2 && room.players.every((p: RoomPlayer) => p.ready);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?room=${room.code}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLeave = () => {
    leaveRoom();
    onLeaveLobby();
  };

  const colorOrder: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleLeave}
          className="flex items-center gap-2 py-2 px-4 rounded-xl glass-button text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Leave Room
        </button>

        {isHost && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 py-2 px-4 rounded-xl glass-button text-xs font-semibold text-amber-400 cursor-pointer"
          >
            <Settings className="w-4 h-4" /> Rule Settings
          </button>
        )}
      </div>

      {/* Room Code Card */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl text-center mb-8">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Private Room Code
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-widest my-2">
          {room.code}
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Share this code or invite link with your friends to play together.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleCopyCode}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedCode ? 'Code Copied!' : 'Copy Code'}
          </button>

          <button
            onClick={handleCopyLink}
            className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-slate-950" /> : <Share2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copied!' : 'Share Invite Link'}
          </button>
        </div>
      </div>

      {/* 4 Player Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {colorOrder.map((color) => {
          const player = room.players.find((p: RoomPlayer) => p.color === color);
          const style = COLOR_STYLES[color];

          if (player) {
            const isMe = player.id === playerId;
            return (
              <div
                key={color}
                className={`p-4 rounded-2xl border ${style.border} ${style.bg} flex items-center justify-between shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg ${
                      color === 'RED'
                        ? 'bg-red-500'
                        : color === 'GREEN'
                        ? 'bg-emerald-500'
                        : color === 'YELLOW'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {player.type === 'AI' ? (
                      <Bot className="w-6 h-6" />
                    ) : (
                      player.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">
                        {player.name} {isMe && '(You)'}
                      </h4>
                      {player.id === room.hostId && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400">
                          Host
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 capitalize">
                      {color.toLowerCase()} Player
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      player.ready
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {player.ready ? 'Ready' : 'Not Ready'}
                  </span>

                  {isHost && player.type === 'AI' && (
                    <button
                      onClick={() => removeBot(color)}
                      title="Remove Bot"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          }

          // Empty Slot
          return (
            <div
              key={color}
              className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Empty Slot</h4>
                  <span className="text-xs text-slate-500 capitalize">
                    {color.toLowerCase()}
                  </span>
                </div>
              </div>

              {isHost && (
                <button
                  onClick={() => addBot(color, 'NORMAL')}
                  className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bot
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Host / Ready Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="text-xs text-slate-400">
          Players: <span className="font-bold text-white">{room.players.length}/4</span> (Need 2+ to start)
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isHost && myPlayer && (
            <button
              onClick={() => setReady(!myPlayer.ready)}
              className={`flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                myPlayer.ready
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {myPlayer.ready ? 'I am Ready ✓' : 'Click when Ready'}
            </button>
          )}

          {isHost && (
            <button
              onClick={startGame}
              disabled={!allReady}
              className={`flex-1 sm:flex-initial py-3 px-8 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                allReady
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Start Game
            </button>
          )}
        </div>
      </div>

      {/* Rule Settings Drawer/Modal for Host */}
      {showSettings && isHost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4">
              Private Room Rules
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Turn Timer</span>
                <div className="flex gap-1.5">
                  {[15, 30, 45, 60].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => updateSettings({ turnTimerSeconds: sec })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                        room.rules.turnTimerSeconds === sec
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Three 6s Forfeit Rule</span>
                <button
                  onClick={() =>
                    updateSettings({
                      maxConsecutiveSixes: room.rules.maxConsecutiveSixes === 3 ? 0 : 3
                    })
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    room.rules.maxConsecutiveSixes === 3
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {room.rules.maxConsecutiveSixes === 3 ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Exact Home Finish</span>
                <button
                  onClick={() => updateSettings({ exactFinish: !room.rules.exactFinish })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    room.rules.exactFinish
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {room.rules.exactFinish ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs cursor-pointer hover:bg-slate-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
