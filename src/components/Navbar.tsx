import React, { useState } from 'react';
import {
  Gamepad2,
  BarChart2,
  BookOpen,
  History,
  User,
  Settings,
  Crown,
  Sparkles,
  Layers,
  Wrench,
  Eye,
  Menu,
  X,
  Trophy,
  ChevronDown,
} from 'lucide-react';
import { NavigationTab } from '../types/chess';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSettings: () => void;
  userElo: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  userElo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleTabClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'play', label: 'Play', icon: Gamepad2 },
    { id: 'analysis', label: 'Analyze', icon: BarChart2 },
    { id: 'puzzles', label: 'Puzzles', icon: Sparkles },
    { id: 'endgames', label: 'Endgames', icon: Layers },
    { id: 'openings', label: 'Openings', icon: BookOpen },
    { id: 'editor', label: 'Editor', icon: Wrench },
    { id: 'drills', label: 'Vision', icon: Eye },
    { id: 'history', label: 'Archive', icon: History },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 select-none">
        <div className="max-w-7xl mx-auto px-3 md:px-6 h-15 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleTabClick('play')}
            className="flex items-center gap-2.5 group focus:outline-hidden shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition">
              <Crown className="w-4 h-4 fill-white/20" />
            </div>
            <span className="font-black text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
              Apex Chess
              <span className="text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.2 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                PRO
              </span>
            </span>
          </button>

          {/* Desktop Navigation Tabs Container */}
          <nav className="hidden md:flex items-center gap-0.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right User Stats & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live Elo Badge */}
            <button
              type="button"
              onClick={() => handleTabClick('profile')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
              <span className="text-xs font-mono font-bold text-zinc-200">{userElo} Elo</span>
            </button>

            {/* Trophy Leaderboard Button */}
            <button
              type="button"
              onClick={() => handleTabClick('profile')}
              title="Rankings & Achievements"
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 transition cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
            </button>

            {/* User Profile Pill with Avatar & Chevron */}
            <button
              type="button"
              onClick={() => handleTabClick('profile')}
              className="flex items-center gap-1.5 p-1 pr-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold shadow-inner">
                ♟
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {/* Settings Gear Button */}
            <button
              type="button"
              onClick={onOpenSettings}
              title="Customization & Themes"
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Drawer Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-3 animate-fade-in space-y-1">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleTabClick('profile')}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currentTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Bottom Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 flex items-center justify-around py-1.5 px-2">
        <button
          type="button"
          onClick={() => handleTabClick('play')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
            currentTab === 'play' ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('analysis')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
            currentTab === 'analysis' ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Analyze</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('puzzles')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
            currentTab === 'puzzles' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Puzzles</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('endgames')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
            currentTab === 'endgames' ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Endgames</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('openings')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold cursor-pointer ${
            currentTab === 'openings' ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Openings</span>
        </button>
      </nav>
    </>
  );
};
