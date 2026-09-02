import React, { useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { AvatarPicker } from '../components/common/AvatarPicker';
import {
  Trophy,
  Award,
  Swords,
  Flame,
  Clock,
  Dices,
  Edit2,
  Check,
  History
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, matchHistory, setProfileName, setProfileAvatar } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [avatarInput, setAvatarInput] = useState(profile.avatar);

  const stats = profile.stats;

  const handleSave = () => {
    if (nameInput.trim()) {
      setProfileName(nameInput.trim());
    }
    setProfileAvatar(avatarInput);
    setIsEditing(false);
  };

  const avgMinutes = Math.floor(stats.averageGameDurationSeconds / 60);
  const avgSeconds = stats.averageGameDurationSeconds % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 shadow-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl font-black text-slate-950 shadow-xl shadow-amber-500/20 border-4 border-white/20">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white font-display">
                {profile.name}
              </h2>
              {profile.isGuest && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Guest
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">ID: {profile.id}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="py-2.5 px-5 rounded-xl glass-button text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Edit2 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal / Drawer */}
      {isEditing && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl mb-8 animate-fade-in">
          <h3 className="text-base font-bold text-white font-display mb-4">
            Customize Player Identity
          </h3>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                maxLength={20}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Choose Avatar
              </label>
              <AvatarPicker
                selectedAvatar={avatarInput}
                onSelect={(id) => setAvatarInput(id)}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 rounded-xl glass-button text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Metrics Cards */}
      <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-400" /> Career Statistics
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        {/* Win Rate */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Win Rate</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-display">
            {stats.winRate}%
          </span>
          <p className="text-[11px] text-slate-500 mt-1">
            {stats.gamesWon}W / {stats.gamesLost}L
          </p>
        </div>

        {/* Total Games */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Games Played</span>
            <Dices className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-black text-white font-display">
            {stats.gamesPlayed}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Total completed matches</p>
        </div>

        {/* Captures */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Total Captures</span>
            <Swords className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-2xl font-black text-red-400 font-display">
            {stats.totalCaptures}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Opponent tokens caught</p>
        </div>

        {/* Streak */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <span className="text-2xl font-black text-orange-400 font-display">
            {stats.currentStreak}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Best: {stats.bestStreak} wins</p>
        </div>
      </div>

      {/* Match History */}
      <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-indigo-400" /> Match History
      </h3>

      {matchHistory.length === 0 ? (
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center text-slate-400">
          <p className="text-sm font-medium">Your first game is waiting.</p>
          <p className="text-xs text-slate-500 mt-1">Play a match to see your career statistics recorded here.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {matchHistory.map((item) => {
            const isWin = item.rank === 1;
            const durationMin = Math.floor(item.durationSeconds / 60);
            const durationSec = item.durationSeconds % 60;
            const timeAgo = new Date(item.date).toLocaleDateString();

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                      isWin
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{item.rank}
                  </span>

                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isWin ? 'Victory!' : `${item.rank}${item.rank === 2 ? 'nd' : item.rank === 3 ? 'rd' : 'th'} Place`}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.mode} Match • vs {item.totalPlayers - 1} opponents
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="flex items-center gap-3 font-semibold text-slate-300">
                    <span>⚔️ {item.captures}</span>
                    <span>🏠 {item.tokensHome}/4</span>
                    <span className="flex items-center gap-1 text-slate-400 font-normal">
                      <Clock className="w-3 h-3" /> {durationMin}m {durationSec}s
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">{timeAgo}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
