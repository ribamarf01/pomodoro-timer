/** @type {import('tailwindcss').Config} */ 
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins" :['Poppins', 'sans-serif']
      },
      colors: {
        "mint-cream": "#EAF2EF"
      }
    },
  },
  plugins: [],
}