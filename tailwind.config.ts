import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        card: '#1A1A1A',
        border: '#2A2A2A',
        phase1: '#C7727E',
        phase2: '#5B8DB8',
        phase3: '#6BA354',
        phase4: '#8B6BAF',
        gold: '#E8A84B',
        danger: '#E85B5B',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'flame': 'flame 1.5s ease-in-out infinite alternate',
        'xp-fill': 'xpFill 0.8s ease-out forwards',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1)', filter: 'brightness(1)' },
          '100%': { transform: 'scaleY(1.08) scaleX(0.96)', filter: 'brightness(1.2)' },
        },
        xpFill: {
          from: { width: '0%' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
