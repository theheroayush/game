import React, { useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { useGameStore } from '../stores/gameStore';
import { useRoomStore } from '../stores/roomStore';
import { PlayerColor, AIDifficulty } from '../types/game';
import { Dices, Users, Bot, Smartphone, ArrowRight, PlusCircle, LogIn, Sparkles, Shield } from 'lucide-react';

interface LandingPageProps {
  onStartGame: () => void;
  onOpenLobby: () => void;
  onOpenHowToPlay: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartGame,
  onOpenLobby,
  onOpenHowToPlay
}) => {
  const { profile } = useUserStore();
  const { startLocalGame } = useGameStore();
  const { createRoom, joinRoom, error, clearError } = useRoomStore();

  const [joinCode, setJoinCode] = useState('');
  const [selectedAiDifficulty, setSelectedAiDifficulty] = useState<AIDifficulty>('NORMAL');
  const [localPlayerCount, setLocalPlayerCount] = useState<2 | 3 | 4>(4);
  const [activeModal, setActiveModal] = useState<'NONE' | 'AI' | 'LOCAL' | 'JOIN' | 'CREATE'>('NONE');

  // Quick Play Match
  const handleQuickPlay = () => {
    startLocalGame('QUICK', [
      {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        color: 'RED',
        type: 'HUMAN'
      },
      {
        id: 'bot_green',
        name: 'Alex (Bot)',
        avatar: 'avatar_3',
        color: 'GREEN',
        type: 'AI',
        aiDifficulty: 'NORMAL'
      },
      {
        id: 'bot_yellow',
        name: 'Jordan (Bot)',
        avatar: 'avatar_4',
        color: 'YELLOW',
        type: 'AI',
        aiDifficulty: 'NORMAL'
      },
      {
        id: 'bot_blue',
        name: 'Sam (Bot)',
        avatar: 'avatar_5',
        color: 'BLUE',
        type: 'AI',
        aiDifficulty: 'NORMAL'
      }
    ]);
    onStartGame();
  };

  // Single Player vs AI
  const handleStartAIGame = (difficulty: AIDifficulty) => {
    startLocalGame('AI', [
      {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        color: 'RED',
        type: 'HUMAN'
      },
      {
        id: 'bot_green',
        name: `Bot Green`,
        avatar: 'avatar_3',
        color: 'GREEN',
        type: 'AI',
        aiDifficulty: difficulty
      },
      {
        id: 'bot_yellow',
        name: `Bot Yellow`,
        avatar: 'avatar_6',
        color: 'YELLOW',
        type: 'AI',
        aiDifficulty: difficulty
      },
      {
        id: 'bot_blue',
        name: `Bot Blue`,
        avatar: 'avatar_4',
        color: 'BLUE',
        type: 'AI',
        aiDifficulty: difficulty
      }
    ]);
    setActiveModal('NONE');
    onStartGame();
  };

  // Local Pass & Play
  const handleStartLocalGame = (count: 2 | 3 | 4) => {
    const colors: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];
    const players = Array.from({ length: count }, (_, i) => ({
      id: `local_p_${i + 1}`,
      name: i === 0 ? profile.name : `Player ${i + 1}`,
      avatar: `avatar_${i + 1}`,
      color: colors[i],
      type: 'HUMAN' as const
    }));

    startLocalGame('LOCAL', players);
    setActiveModal('NONE');
    onStartGame();
  };

  // Create Online Room
  const handleCreateRoom = () => {
    createRoom(profile.name, profile.avatar, 'RED');
    setActiveModal('NONE');
    onOpenLobby();
  };

  // Join Online Room
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    joinRoom(joinCode.trim(), profile.name, profile.avatar);
    setActiveModal('NONE');
    onOpenLobby();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hero Header */}
      <section className="text-center py-6 sm:py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Server-Authoritative Board Game
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-tight">
          Ludo. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">Your Way.</span>
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
          Play online with friends, challenge high-tier AI bots, or enjoy classic local pass-and-play on mobile & desktop.
        </p>

        {/* Primary CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleQuickPlay}
            className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Dices className="w-5 h-5" />
            Play Now
          </button>

          <button
            onClick={() => setActiveModal('CREATE')}
            className="py-3.5 px-6 rounded-2xl glass-button text-slate-200 hover:text-white font-bold text-base flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-amber-400" />
            Create Private Room
          </button>
        </div>
      </section>

      {/* Game Mode Selection Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {/* Quick Play */}
        <div
          onClick={handleQuickPlay}
          className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 mb-4 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
            <Dices className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Quick Match</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Jump instantly into a 4-player match with zero waiting friction.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            Play Instantly <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Private Room with Friends */}
        <div
          onClick={() => setActiveModal('JOIN')}
          className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Play with Friends</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Create or join a private room using a 6-character room code or link.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
            Join Room <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Vs AI Bots */}
        <div
          onClick={() => setActiveModal('AI')}
          className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Play vs AI</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Practice tactics against 4 difficulty tiers: Easy, Normal, Hard & Expert.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Choose Difficulty <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Local Pass & Play */}
        <div
          onClick={() => setActiveModal('LOCAL')}
          className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Pass & Play</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            2 to 4 players taking turns on a single phone, tablet, or laptop.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            Setup Players <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <footer className="pt-8 pb-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-emerald-400" /> Server Authoritative
          </span>
          <span className="flex items-center gap-1">
            <Dices className="w-4 h-4 text-amber-400" /> True 15x15 SVG Board
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHowToPlay}
            className="hover:text-white transition-colors cursor-pointer"
          >
            How to Play
          </button>
          <span>•</span>
          <span>Fast & Responsive</span>
        </div>
      </footer>

      {/* AI Difficulty Selector Modal */}
      {activeModal === 'AI' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4 text-center">
              Select AI Bot Difficulty
            </h3>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {(['EASY', 'NORMAL', 'HARD', 'EXPERT'] as AIDifficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedAiDifficulty(diff)}
                  className={`py-3 px-3 rounded-xl font-bold text-xs capitalize transition-all cursor-pointer ${
                    selectedAiDifficulty === diff
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {diff.toLowerCase()}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartAIGame(selectedAiDifficulty)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
              >
                Start Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local Pass & Play Modal */}
      {activeModal === 'LOCAL' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4 text-center">
              Select Number of Players
            </h3>
            <div className="flex justify-center gap-3 mb-5">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => setLocalPlayerCount(count as 2 | 3 | 4)}
                  className={`w-14 h-14 rounded-2xl font-black text-lg transition-all cursor-pointer ${
                    localPlayerCount === count
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartLocalGame(localPlayerCount)}
                className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Start Local
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {activeModal === 'JOIN' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-1 text-center">
              Join Private Room
            </h3>
            <p className="text-xs text-slate-400 text-center mb-4">
              Enter the 6-character room code from your friend
            </p>

            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. AB7K9"
                className="w-full text-center tracking-widest text-2xl font-black uppercase py-3 rounded-2xl bg-slate-900 border border-slate-700 text-amber-400 focus:outline-none focus:border-amber-400"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('NONE')}
                  className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!joinCode.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs shadow-md cursor-pointer disabled:opacity-50"
                >
                  Join Room
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setActiveModal('CREATE')}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Or Create a New Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Modal */}
      {activeModal === 'CREATE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-1 text-center">
              Create Private Room
            </h3>
            <p className="text-xs text-slate-400 text-center mb-5">
              Host a room and invite friends via a shareable code or link
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCreateRoom}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Generate Room
              </button>
              <button
                onClick={() => setActiveModal('NONE')}
                className="w-full py-2.5 rounded-2xl glass-button text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
