/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
    extend: {
      colors: {
        darkDray: "#707070",
        black: "#060506",
        primary:"#136e63",
        secondary:"#093731",
        light: "#b6d6d2"

      },
      fontFamily: {
        reddit: ["Reddit Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

