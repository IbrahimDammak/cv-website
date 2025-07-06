/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cv-dark': '#0A400C',
        'cv-green': '#819067',
        'cv-light-green': '#B1AB86',
        'cv-cream': '#FEFAE0',
      },
      fontFamily: {
        'cal': ['"Cal Sans"', 'sans-serif'],
        'emoji': ['"Noto Color Emoji"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

