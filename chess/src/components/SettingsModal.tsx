import React from 'react';
import { AppSettings, BoardThemeId, PieceThemeId } from '../types/chess';
import { BOARD_THEMES, PIECE_THEMES } from '../utils/themes';
import { ChessPiece } from './ChessPiece';
import { Settings, X, Volume2, VolumeX, Palette, Eye, Check, Mic, Smartphone } from 'lucide-react';
import { sounds } from '../utils/sound';
import { voiceCoach } from '../utils/voiceCoach';
import { haptics } from '../utils/haptics';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const handleThemeChange = (themeId: BoardThemeId) => {
    const updated = { ...settings, boardTheme: themeId };
    onUpdateSettings(updated);
  };

  const handlePieceThemeChange = (pieceId: PieceThemeId) => {
    const updated = { ...settings, pieceTheme: pieceId };
    onUpdateSettings(updated);
  };

  const handleSoundToggle = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    sounds.setEnabled(updated.soundEnabled);
    if (updated.soundEnabled) sounds.playMove();
    onUpdateSettings(updated);
  };

  const handleVoiceToggle = () => {
    const updated = { ...settings, voiceCoachEnabled: !settings.voiceCoachEnabled };
    voiceCoach.setEnabled(updated.voiceCoachEnabled);
    if (updated.voiceCoachEnabled) {
      voiceCoach.speak('Grandmaster Boris voice commentary enabled.');
    }
    onUpdateSettings(updated);
  };

  const handleHapticsToggle = () => {
    const updated = { ...settings, hapticsEnabled: !settings.hapticsEnabled };
    if (updated.hapticsEnabled) {
      haptics.victory();
    }
    onUpdateSettings(updated);
  };

  const handleVolumeChange = (vol: number) => {
    const updated = { ...settings, soundVolume: vol };
    sounds.setVolume(vol);
    voiceCoach.setVolume(vol);
    onUpdateSettings(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <span>Preferences & Themes</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Board Themes */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-400" />
            <span>Board Visual Theme</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.values(BOARD_THEMES).map((theme) => {
              const isSelected = settings.boardTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/30'
                      : 'bg-zinc-950/60 hover:bg-zinc-800 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200">{theme.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  {/* Palette Sample */}
                  <div className="flex h-5 w-full rounded-lg overflow-hidden border border-zinc-700">
                    <div style={{ backgroundColor: theme.lightSquare }} className="flex-1" />
                    <div style={{ backgroundColor: theme.darkSquare }} className="flex-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Piece Sets */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Chess Piece Style</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PIECE_THEMES.map((pt) => {
              const isSelected = settings.pieceTheme === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => handlePieceThemeChange(pt.id)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/30'
                      : 'bg-zinc-950/60 hover:bg-zinc-800 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-zinc-200 block">{pt.name}</span>
                      <span className="text-[10px] text-zinc-500">{pt.description}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>

                  {/* Piece Preview Row */}
                  <div className="flex items-center justify-around bg-zinc-900 rounded-lg p-1.5 border border-zinc-800">
                    <div className="w-6 h-6">
                      <ChessPiece type="k" color="w" theme={pt.id} />
                    </div>
                    <div className="w-6 h-6">
                      <ChessPiece type="q" color="w" theme={pt.id} />
                    </div>
                    <div className="w-6 h-6">
                      <ChessPiece type="n" color="b" theme={pt.id} />
                    </div>
                    <div className="w-6 h-6">
                      <ChessPiece type="r" color="b" theme={pt.id} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio & Voice Commentary Settings */}
        <div className="mb-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
              <span className="text-sm font-semibold text-zinc-200">Sound Effects</span>
            </div>
            <button
              onClick={handleSoundToggle}
              className={`w-12 h-6 rounded-full transition p-1 ${
                settings.soundEnabled ? 'bg-blue-600' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Coach Narration Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-sm font-semibold text-zinc-200 block">Voice Coach Commentary</span>
                <span className="text-[10px] text-zinc-400">Real-time GM Boris speech narration</span>
              </div>
            </div>
            <button
              onClick={handleVoiceToggle}
              className={`w-12 h-6 rounded-full transition p-1 ${
                settings.voiceCoachEnabled ? 'bg-amber-600' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  settings.voiceCoachEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Mobile Haptics Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-sm font-semibold text-zinc-200 block">Mobile Vibration Haptics</span>
                <span className="text-[10px] text-zinc-400">Touch feedback on moves and checks</span>
              </div>
            </div>
            <button
              onClick={handleHapticsToggle}
              className={`w-12 h-6 rounded-full transition p-1 ${
                settings.hapticsEnabled ? 'bg-purple-600' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  settings.hapticsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {settings.soundEnabled && (
            <div className="space-y-1 pt-2 border-t border-zinc-800">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Master Volume</span>
                <span className="font-mono">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          )}
        </div>

        {/* Gameplay Toggles */}
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-300">Show Board Coordinates</span>
            <input
              type="checkbox"
              checked={settings.showCoordinates}
              onChange={(e) => onUpdateSettings({ ...settings, showCoordinates: e.target.checked })}
              className="w-4 h-4 rounded accent-blue-600 bg-zinc-800"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-300">Highlight Legal Move Targets</span>
            <input
              type="checkbox"
              checked={settings.showLegalMoves}
              onChange={(e) => onUpdateSettings({ ...settings, showLegalMoves: e.target.checked })}
              className="w-4 h-4 rounded accent-blue-600 bg-zinc-800"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-300">Highlight Last Move</span>
            <input
              type="checkbox"
              checked={settings.showLastMove}
              onChange={(e) => onUpdateSettings({ ...settings, showLastMove: e.target.checked })}
              className="w-4 h-4 rounded accent-blue-600 bg-zinc-800"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-300">Auto-Queen on Promotion</span>
            <input
              type="checkbox"
              checked={settings.autoQueen}
              onChange={(e) => onUpdateSettings({ ...settings, autoQueen: e.target.checked })}
              className="w-4 h-4 rounded accent-blue-600 bg-zinc-800"
            />
          </label>
        </div>

        {/* Done button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};
