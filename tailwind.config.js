/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
