/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#10101a',
        'purple-tint': '#2c2a4a',
        'glow-ui': '#d1d1f8',
        'icon-color': '#a0a8b5',
        primary: '#101020',
        secondary: '#222244',
        highlight: '#00ff88',
        text: '#ffffff',
      },
      fontFamily: {
        'pixel': ['VT323', 'monospace'],
        'retro': ['Press Start 2P', 'monospace'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
      boxShadow: {
        vhs: '0 0 30px rgba(209, 209, 248, 0.3), 0 0 60px rgba(44, 42, 74, 0.2)',
        'glow-text': '0 0 6px rgba(209, 209, 248, 0.8), 0 0 12px rgba(209, 209, 248, 0.4)',
        'icon-glow': '0 0 8px rgba(160, 168, 181, 0.6)'
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-1px)' },
          '50%': { transform: 'translateY(1px)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 0.99 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.7 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(-2px, -2px)' },
          '30%': { transform: 'translate(2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-2px, 2px)' },
          '70%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(-2px, -2px)' },
          '90%': { transform: 'translate(2px, 2px)' },
        },
      },
      animation: {
        scan: 'scan 4s linear infinite',
        flicker: 'flicker 3s linear infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
        glitch: 'glitch 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}
