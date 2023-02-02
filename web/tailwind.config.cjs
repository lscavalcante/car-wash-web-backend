/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#121214',
        bgCard: '#202024',
        nuPurple: '#8257e6',
        nuGray: '#CCCCCCCC',
        nuWhite: '#E1E1E6'
      },
    },
  },
  plugins: [],
}
