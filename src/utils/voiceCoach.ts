// Web Speech API Voice Commentary for Grandmaster Boris

class VoiceCoachService {
  private enabled: boolean = false;
  private volume: number = 0.8;
  private rate: number = 1.05;
  private pitch: number = 0.95;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public speak(text: string, priority: 'low' | 'high' = 'low') {
    if (!this.enabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      if (priority === 'high') {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.volume;
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male')) && v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors gracefully
    }
  }

  // Pre-configured situational GM Boris voice callouts
  public announceMove(san: string, isCapture: boolean, isCheck: boolean, isCheckmate: boolean) {
    if (!this.enabled) return;
    if (isCheckmate) {
      this.speak(`Checkmate! Clinical finish.`, 'high');
    } else if (isCheck) {
      this.speak(`Check!`, 'high');
    } else if (isCapture) {
      if (san.startsWith('Q')) this.speak(`Queen takes on ${san.slice(-2)}`);
      else if (san.startsWith('R')) this.speak(`Rook takes`);
      else if (san.startsWith('B')) this.speak(`Bishop captures`);
      else if (san.startsWith('N')) this.speak(`Knight captures`);
    } else if (san.includes('O-O-O')) {
      this.speak(`Queenside castling`);
    } else if (san.includes('O-O')) {
      this.speak(`Kingside castling`);
    }
  }

  public announceBrilliant() {
    this.speak(`Brilliant move! What a spectacular sacrifice!`, 'high');
  }

  public announceBlunder() {
    this.speak(`Tactical blunder. Look for counterplay.`, 'high');
  }

  public announcePuzzleSuccess() {
    this.speak(`Outstanding tactical vision! Puzzle solved!`, 'high');
  }
}

export const voiceCoach = new VoiceCoachService();
