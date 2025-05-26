module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], // Make Orbitron available via Tailwind
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};