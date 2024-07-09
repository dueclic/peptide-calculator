/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'colony': 'Colony, Arial, sans-serif',
    },
    extend: {
      colors: {
        'alkemya': {
          500: '#faec11'
        }
      },
    },
  },
  plugins: [],
}
