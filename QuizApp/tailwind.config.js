/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#22c55e',
          'green-bright': '#00ff00',
          'green-dim': '#166534',
          dark: '#0a0a0a',
          'dark-light': '#111111',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #22c55e, 0 0 10px #22c55e' },
          '100%': { textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateX(-100%) rotate(-10deg)', opacity: 0 },
        },
        slideRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateX(100%) rotate(10deg)', opacity: 0 },
        },
      },
      boxShadow: {
        'glow': '0 0 10px #22c55e, 0 0 20px #22c55e',
        'glow-bright': '0 0 15px #00ff00, 0 0 30px #00ff00',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
