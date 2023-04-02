/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      body: ['Opoen sans', 'sans-serify'],
      openSans: ['Open Sans', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#175ddc',
        secondary: '#1a3b66',
        text: "#28293d",
        third: "#22d68f"
      }
    },
  },
  plugins: [],
}

