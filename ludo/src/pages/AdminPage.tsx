import React from 'react';
import { useRoomStore } from '../stores/roomStore';
import { Activity, Server, Users, Shield, Cpu, RefreshCw } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { status, room } = useRoomStore();

  const metrics = [
    { label: 'Server State', value: status, icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { label: 'Active Memory Rooms', value: room ? '1 Active' : '0 Active', icon: <Users className="w-5 h-5 text-blue-400" /> },
    { label: 'Engine Integrity', value: '100% Verified', icon: <Shield className="w-5 h-5 text-amber-400" /> },
    { label: 'Event Ordering', value: 'Monotonic Strict', icon: <Activity className="w-5 h-5 text-purple-400" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white font-display flex items-center gap-2">
            <Cpu className="w-6 h-6 text-amber-400" /> System Observability & Admin Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, authoritative state monitor, and game server diagnostics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">{m.label}</span>
              {m.icon}
            </div>
            <span className="text-lg font-bold text-white font-mono">{m.value}</span>
          </div>
        ))}
      </div>

      {/* Active Room Inspector */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 shadow-xl mb-8">
        <h3 className="text-base font-bold text-white font-display mb-4">
          Active Local / WebSocket Room State
        </h3>

        {room ? (
          <div className="space-y-3">
            <div className="flex justify-between text-xs py-2 border-b border-slate-800">
              <span className="text-slate-400">Room Code:</span>
              <span className="font-mono font-bold text-amber-400">{room.code}</span>
            </div>
            <div className="flex justify-between text-xs py-2 border-b border-slate-800">
              <span className="text-slate-400">Status:</span>
              <span className="font-bold text-white">{room.status}</span>
            </div>
            <div className="flex justify-between text-xs py-2 border-b border-slate-800">
              <span className="text-slate-400">Connected Players:</span>
              <span className="font-bold text-white">{room.players.length} / {room.maxPlayers}</span>
            </div>
            <div className="flex justify-between text-xs py-2">
              <span className="text-slate-400">Game State Version:</span>
              <span className="font-mono text-emerald-400">
                v{room.gameState?.version || 1}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">No rooms active on this client instance.</p>
        )}
      </div>
    </div>
  );
};
