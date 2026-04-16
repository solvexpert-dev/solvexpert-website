/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        primary: '#F0EDE8',
        gold: '#C9A84C',
        surface: '#141414',
        borderLine: 'rgba(255,255,255,0.08)',
        muted: 'rgba(240,237,232,0.5)',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      }
    },
  },
  plugins: [],
};
