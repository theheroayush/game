// Native Web Vibration API Haptics for Mobile / Android Touchscreens

export const haptics = {
  // Subtle vibration for standard piece move (12ms)
  move: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Ignore if restricted
      }
    }
  },

  // Crisp double-tap vibration on piece capture (20ms, pause 10ms, 20ms)
  capture: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 10, 20]);
      } catch {
        // Ignore
      }
    }
  },

  // Strong vibration pattern on check (35ms, pause 15ms, 35ms)
  check: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([35, 15, 35]);
      } catch {
        // Ignore
      }
    }
  },

  // Celebratory victory pattern on checkmate / puzzle solve
  victory: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 20, 40, 20, 80]);
      } catch {
        // Ignore
      }
    }
  },

  // Warning vibration on blunder or mistake
  blunder: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 30, 60]);
      } catch {
        // Ignore
      }
    }
  },
};
