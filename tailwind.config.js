/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#5b7fff',
          purple: '#8b5cf6',
          green: '#06d6a0',
          orange: '#f97316',
          pink: '#ec4899',
          yellow: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease',
        'float': 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'grad-shift': 'gradShift 5s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'slide-in': 'slideIn 0.3s ease',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '0.5' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
        gradShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(10px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
      backgroundSize: { '200': '200% 200%' },
    }
  },
  plugins: [],
};
