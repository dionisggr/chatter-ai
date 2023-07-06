/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-white': '#ffffff2b',
        'dark-grey': '#202123',
        'darker-grey': '#121212',
        'light-grey': '#353740',
      },
      translate: ['group-hover'],
      animation: {
        'bounce-delay-1': 'bounce 1s infinite 200ms',
        'bounce-delay-2': 'bounce 1s infinite 400ms',
        'bounce-delay-3': 'bounce 1s infinite 600ms',
        'bounce-delay-4': 'bounce 1s infinite 800ms',
        'bounce-delay-5': 'bounce 1s infinite 1000ms',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
