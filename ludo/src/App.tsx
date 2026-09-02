import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { RoomLobby } from './pages/RoomLobby';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsModal } from './components/modals/SettingsModal';
import { HowToPlayModal } from './components/modals/HowToPlayModal';
import { useRoomStore } from './stores/roomStore';
import { useUserStore } from './stores/userStore';

export function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'play' | 'lobby' | 'leaderboard' | 'profile' | 'admin'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const { connect, joinRoom } = useRoomStore();
  const { profile } = useUserStore();

  // Check URL parameters for direct room join links (e.g. ?room=AB7K9)
  useEffect(() => {
    connect();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        joinRoom(roomParam.trim().toUpperCase(), profile.name, profile.avatar);
        setCurrentTab('lobby');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab === 'lobby' || currentTab === 'play' ? 'play' : currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenHowToPlay={() => setShowHowToPlay(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full flex flex-col">
        {currentTab === 'home' && (
          <LandingPage
            onStartGame={() => setCurrentTab('play')}
            onOpenLobby={() => setCurrentTab('lobby')}
            onOpenHowToPlay={() => setShowHowToPlay(true)}
          />
        )}

        {currentTab === 'play' && (
          <GamePage onReturnHome={() => setCurrentTab('home')} />
        )}

        {currentTab === 'lobby' && (
          <RoomLobby
            onGameStarted={() => setCurrentTab('play')}
            onLeaveLobby={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'leaderboard' && <LeaderboardPage />}

        {currentTab === 'profile' && <ProfilePage />}

        {currentTab === 'admin' && <AdminPage />}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}

export default App;
