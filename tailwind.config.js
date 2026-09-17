/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#07080A',
          secondary: '#0E1015',
          tertiary: '#141720',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        crimson: {
          DEFAULT: '#D90429',
          bright: '#EF233C',
          dark: '#7F0916',
          muted: 'rgba(217, 4, 41, 0.15)',
        },
        surface: {
          white: '#F8F9FA',
          muted: '#94A3B8',
          subtle: '#64748B',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      boxShadow: {
        'crimson-glow': '0 0 25px -5px rgba(217, 4, 41, 0.4)',
        'crimson-subtle': '0 0 15px rgba(217, 4, 41, 0.2)',
      },
    },
  },
  plugins: [],
};

