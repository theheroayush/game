/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ludo: {
          red: {
            DEFAULT: '#EF4444',
            light: '#FCA5A5',
            dark: '#B91C1C',
            surface: '#FEF2F2'
          },
          green: {
            DEFAULT: '#10B981',
            light: '#6EE7B7',
            dark: '#047857',
            surface: '#ECFDF5'
          },
          yellow: {
            DEFAULT: '#F59E0B',
            light: '#FDE68A',
            dark: '#B45309',
            surface: '#FFFBEB'
          },
          blue: {
            DEFAULT: '#3B82F6',
            light: '#93C5FD',
            dark: '#1D4ED8',
            surface: '#EFF6FF'
          },
          safe: '#FCD34D',
          dark: {
            bg: '#0B0F19',
            card: '#131B2E',
            border: '#1E293B',
            text: '#F8FAFC'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.45)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.45)',
        'glow-yellow': '0 0 20px rgba(245, 158, 11, 0.45)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.45)',
        'glow-gold': '0 0 25px rgba(252, 211, 77, 0.6)',
        'token': '0 4px 10px rgba(0, 0, 0, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.4)',
        'board': '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      },
      keyframes: {
        'hop': {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.25) translateY(-8px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' }
        },
        'dice-spin': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) scale(0.95)' },
          '50%': { transform: 'rotateX(360deg) rotateY(180deg) scale(1.1)' },
          '100%': { transform: 'rotateX(720deg) rotateY(720deg) scale(1)' }
        }
      },
      animation: {
        'hop': 'hop 0.2s ease-in-out',
        'pulse-glow': 'pulse-glow 1.5s infinite ease-in-out',
        'dice-spin': 'dice-spin 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
      }
    },
  },
  plugins: [],
}
