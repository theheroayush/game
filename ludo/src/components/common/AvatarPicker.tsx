import React from 'react';

export const AVATAR_OPTIONS = [
  { id: 'avatar_1', name: 'Lion', color: 'from-amber-400 to-orange-600', emoji: '🦁' },
  { id: 'avatar_2', name: 'Tiger', color: 'from-orange-500 to-red-600', emoji: '🐯' },
  { id: 'avatar_3', name: 'Dragon', color: 'from-emerald-400 to-teal-700', emoji: '🐲' },
  { id: 'avatar_4', name: 'Eagle', color: 'from-blue-400 to-indigo-700', emoji: '🦅' },
  { id: 'avatar_5', name: 'Wolf', color: 'from-slate-400 to-slate-700', emoji: '🐺' },
  { id: 'avatar_6', name: 'Fox', color: 'from-yellow-400 to-amber-600', emoji: '🦊' },
  { id: 'avatar_7', name: 'Crown', color: 'from-yellow-300 to-yellow-600', emoji: '👑' },
  { id: 'avatar_8', name: 'Rocket', color: 'from-purple-400 to-indigo-600', emoji: '🚀' }
];

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {AVATAR_OPTIONS.map((av) => {
        const isSelected = selectedAvatar === av.id;
        return (
          <button
            key={av.id}
            type="button"
            onClick={() => onSelect(av.id)}
            className={`p-2 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              isSelected
                ? 'bg-amber-500/20 border-2 border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/40 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${av.color} flex items-center justify-center text-2xl shadow-md border-2 border-white/20`}
            >
              {av.emoji}
            </div>
            <span className="text-[11px] font-medium text-slate-300">{av.name}</span>
          </button>
        );
      })}
    </div>
  );
};
