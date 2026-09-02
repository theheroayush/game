import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { Volume2, VolumeX, Music, Sparkles, CheckSquare, Zap, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    soundEnabled,
    musicEnabled,
    reducedMotion,
    confirmMoves,
    autoSelectOnlyMove,
    toggleSound,
    toggleMusic,
    toggleReducedMotion,
    toggleConfirmMoves,
    toggleAutoSelectOnlyMove
  } = useUserStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white font-display">Game Settings</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="mt-5 space-y-4">
          {/* Sound FX */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-amber-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <p className="text-sm font-semibold text-white">Sound Effects</p>
                <p className="text-xs text-slate-400">Tactile procedural dice & move audio</p>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEnabled ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Music */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <Music className={`w-5 h-5 ${musicEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
              <div>
                <p className="text-sm font-semibold text-white">Background Ambience</p>
                <p className="text-xs text-slate-400">Casual atmospheric audio loop</p>
              </div>
            </div>
            <button
              onClick={toggleMusic}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                musicEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  musicEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto-select single legal move */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">Fast Move Single Choice</p>
                <p className="text-xs text-slate-400">Auto-moves when only 1 legal token exists</p>
              </div>
            </div>
            <button
              onClick={toggleAutoSelectOnlyMove}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoSelectOnlyMove ? 'bg-indigo-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  autoSelectOnlyMove ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Confirm Moves */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-white">Confirm Token Tap</p>
                <p className="text-xs text-slate-400">Tap twice to avoid accidental moves on mobile</p>
              </div>
            </div>
            <button
              onClick={toggleConfirmMoves}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                confirmMoves ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  confirmMoves ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-white">Reduced Animations</p>
                <p className="text-xs text-slate-400">Low-latency instant step transitions</p>
              </div>
            </div>
            <button
              onClick={toggleReducedMotion}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                reducedMotion ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
