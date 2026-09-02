import React from 'react';
import { SideSelection, AIPersonalityId, TimeControlConfig } from '../types/chess';
import { DIFFICULTY_LEVELS, AI_PERSONALITIES, TIME_CONTROLS } from '../engine/engineConfig';
import {
  Zap,
  Swords,
  Clock,
  Shuffle,
  ChevronRight,
  User,
  Star,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Trophy,
  Quote,
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface PlayLobbyProps {
  difficultyLevel: number;
  onSelectDifficulty: (level: number) => void;
  personality: AIPersonalityId;
  onSelectPersonality: (p: AIPersonalityId) => void;
  side: SideSelection;
  onSelectSide: (side: SideSelection) => void;
  timeControl: TimeControlConfig;
  onSelectTimeControl: (tc: TimeControlConfig) => void;
  onStartGame: () => void;
}

const PLAY_STYLES: Array<{
  id: AIPersonalityId;
  title: string;
  subtitle: string;
}> = [
  { id: 'balanced', title: 'Balanced', subtitle: 'Solid & reliable' },
  { id: 'aggressive', title: 'Aggressive', subtitle: 'Attack focused' },
  { id: 'positional', title: 'Positional', subtitle: 'Strategic' },
  { id: 'tactical', title: 'Tactical', subtitle: 'Sharp & tricky' },
];

const ELO_TICKS = ['600', '800', '1000', '1200', '1500', '1800', '2000', '2500+'];

export const PlayLobby: React.FC<PlayLobbyProps> = ({
  difficultyLevel,
  onSelectDifficulty,
  personality,
  onSelectPersonality,
  side,
  onSelectSide,
  timeControl,
  onSelectTimeControl,
  onStartGame,
}) => {
  const currentDiff =
    DIFFICULTY_LEVELS.find((d) => d.level === difficultyLevel) || DIFFICULTY_LEVELS[2];
  const currentPers =
    AI_PERSONALITIES.find((p) => p.id === personality) || AI_PERSONALITIES[0];

  const handleStart = () => {
    sounds.playStart();
    onStartGame();
  };

  const personalityName =
    PLAY_STYLES.find((s) => s.id === personality)?.title || 'Balanced';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-4 md:py-6 pb-24 md:pb-8 animate-fade-in select-none">
      {/* 2-Column Responsive Layout matching reference design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* =========================================================
            LEFT COLUMN: HERO, LUXURY BOARD SHOWCASE & FEATURE BADGES
            ========================================================= */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          {/* Header Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-2">
              Play Chess vs <span className="text-blue-500">AI</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 mt-1.5 font-medium">
              Choose your opponent and start playing.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-[11px] font-semibold mt-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Human-calibrated Elo levels · Unique AI personalities</span>
            </div>
          </div>

          {/* Luxury Showcase Board Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-zinc-800/80 bg-zinc-950">
              <img
                src="/luxury_chess_hero.jpg"
                onError={(e) => {
                  e.currentTarget.src = '/board_showcase.png';
                }}
                alt="Tournament Chessboard"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition duration-700"
              />
            </div>

            {/* Quote Row */}
            <div className="w-full flex items-center justify-center gap-2.5 pt-3.5 pb-1 px-3 text-center">
              <Quote className="w-4 h-4 text-blue-500 shrink-0 fill-blue-500/20" />
              <p className="text-xs md:text-sm text-zinc-300 font-serif italic">
                “Chess is the gymnasium of the mind.”
                <span className="text-zinc-500 not-italic font-sans text-xs ml-2 font-normal">
                  — Blaise Pascal
                </span>
              </p>
            </div>
          </div>

          {/* 4 Feature Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-100 block truncate">Adaptive AI</span>
                <span className="text-[10px] text-zinc-400 block truncate">Adjusts to level</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-100 block truncate">Track Progress</span>
                <span className="text-[10px] text-zinc-400 block truncate">Deep insights</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-100 block truncate">Fair Play</span>
                <span className="text-[10px] text-zinc-400 block truncate">No unfair tricks</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-100 block truncate">Climb Rankings</span>
                <span className="text-[10px] text-zinc-400 block truncate">Elo progression</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: QUICK PLAY & INTERACTIVE SETUP DECK
            ========================================================= */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          {/* Quick Play Banner Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 sm:p-5 shadow-xl flex items-center justify-between gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <Zap className="w-5 h-5 fill-blue-400/20" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white">Quick Play</h3>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {currentDiff.elo} Elo · {timeControl.label} ·{' '}
                  {side === 'random' ? 'Random' : side === 'w' ? 'White' : 'Black'} · {personalityName}
                </p>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="py-2.5 px-4 sm:px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-blue-600/25 transition transform active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Play Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Game Config Deck */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 backdrop-blur-sm">
            {/* Section 1: OPPONENT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>OPPONENT</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const next = (difficultyLevel % 10) + 1;
                    onSelectDifficulty(next);
                  }}
                  className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Change</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Current Opponent Label */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {currentDiff.elo} Elo
                </span>
                <span className="text-sm font-bold text-blue-400">{currentDiff.name.split(' ')[0]}</span>
                <span className="text-xs text-zinc-500">({currentDiff.description})</span>
              </div>

              {/* Slider */}
              <div className="relative pt-1 pb-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={difficultyLevel}
                  onChange={(e) => onSelectDifficulty(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-2"
                />

                {/* Elo Scale Ticks */}
                <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-zinc-500 px-0.5">
                  {ELO_TICKS.map((tick, idx) => (
                    <span
                      key={tick}
                      className={
                        (idx === 0 && difficultyLevel <= 1) ||
                        (idx === 2 && difficultyLevel === 3) ||
                        (idx === 7 && difficultyLevel >= 10)
                          ? 'text-zinc-200 font-bold'
                          : ''
                      }
                    >
                      {tick}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: PLAY STYLE */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-blue-400" />
                  <span>PLAY STYLE</span>
                </label>
                <span className="text-xs text-zinc-500 font-semibold">{currentPers.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLAY_STYLES.map((st) => {
                  const isSelected = personality === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onSelectPersonality(st.id)}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/40 text-blue-400 shadow-md'
                          : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div>
                        <span
                          className={`text-xs font-bold block ${
                            isSelected ? 'text-blue-400' : 'text-zinc-200'
                          }`}
                        >
                          {st.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 block mt-0.5 truncate">
                          {st.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: TIME CONTROL */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TIME CONTROL</span>
                </label>
                <button
                  type="button"
                  onClick={() => onSelectTimeControl(TIME_CONTROLS[5])}
                  className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  {timeControl.id === 'none' ? '✓ No Clock' : 'No Clock'}
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_CONTROLS.slice(0, 5).map((tc) => {
                  const isSelected = timeControl.id === tc.id;
                  const [main, sub] = tc.label.split(' ');
                  return (
                    <button
                      key={tc.id}
                      type="button"
                      onClick={() => onSelectTimeControl(tc)}
                      className={`py-2 px-1.5 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/40 text-blue-400 shadow-md font-bold'
                          : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span className={`text-xs font-black ${isSelected ? 'text-blue-400' : 'text-zinc-200'}`}>
                        {main}
                      </span>
                      <span className="text-[10px] text-zinc-400 capitalize">{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: YOUR COLOR */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-pink-400" />
                  <span>YOUR COLOR</span>
                </label>
                <span className="text-xs text-zinc-500 font-semibold capitalize">
                  {side === 'w' ? 'White' : side === 'b' ? 'Black' : 'Random'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* White */}
                <button
                  type="button"
                  onClick={() => onSelectSide('w')}
                  className={`py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-2 transition cursor-pointer ${
                    side === 'w'
                      ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/40 text-blue-400 font-bold shadow-md'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 bg-white" />
                  <span className="text-xs font-bold">White</span>
                </button>

                {/* Random */}
                <button
                  type="button"
                  onClick={() => onSelectSide('random')}
                  className={`py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-2 transition cursor-pointer ${
                    side === 'random'
                      ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/40 text-blue-400 font-bold shadow-md'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-bold">Random</span>
                </button>

                {/* Black */}
                <button
                  type="button"
                  onClick={() => onSelectSide('b')}
                  className={`py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-2 transition cursor-pointer ${
                    side === 'b'
                      ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/40 text-blue-400 font-bold shadow-md'
                      : 'bg-zinc-950/60 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-700 bg-zinc-950" />
                  <span className="text-xs font-bold">Black</span>
                </button>
              </div>
            </div>

            {/* Bottom Primary Start Button */}
            <button
              type="button"
              onClick={handleStart}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>Play Now — Start your game</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
