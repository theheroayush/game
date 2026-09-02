import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { Dices, Volume2, VolumeX, Settings, HelpCircle, Trophy, User, Home } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'play' | 'leaderboard' | 'profile' | 'admin';
  onSelectTab: (tab: 'home' | 'play' | 'leaderboard' | 'profile' | 'admin') => void;
  onOpenSettings: () => void;
  onOpenHowToPlay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  onOpenHowToPlay
}) => {
  const { soundEnabled, toggleSound, profile } = useUserStore();

  return (
    <header className="relative z-40 w-full bg-slate-950/95 border-b border-slate-800/80 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Dices className="w-6 h-6 text-slate-950" />
          </div>
          <div className="text-left">
            <span className="text-lg font-extrabold text-white font-display tracking-tight flex items-center gap-1">
              LUDO <span className="text-amber-400">APEX</span>
            </span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'home' || currentTab === 'play'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" /> Play
          </button>

          <button
            onClick={() => onSelectTab('leaderboard')}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" /> Leaderboard
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'profile'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHowToPlay}
            title="How to Play"
            aria-label="How to Play"
            className="p-2 rounded-xl text-slate-300 hover:text-white glass-button cursor-pointer"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            aria-label="Toggle Sound"
            className="p-2 rounded-xl text-slate-300 hover:text-white glass-button cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            title="Game Settings"
            aria-label="Game Settings"
            className="p-2 rounded-xl text-slate-300 hover:text-white glass-button cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Avatar Mini Pill */}
          <button
            onClick={() => onSelectTab('profile')}
            className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-slate-200 max-w-[90px] truncate">
              {profile.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
