/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['montserrat','sans-serif'],
        serif: ['raleway','sans-serif'],
        mono: ['sans-serif'],
      },
      colors: {
        bookPrimary: "#0d1821",
        bookBG: "#344966",
        bookBgGradient: "#344977",
        bookSec: "#B4CDED",
        brandBlueLight: "#4C79AF",
        brandBlack: "#212121",
        brandWhite: "#FFFFFF",
        bg: "#F0F4EF",
        availableGreen: "#4CAF50",

        brandGray: {
          light: "#E9E9E9",
          dark: "#3F3F3F",
        },
        brandOrange: {
          regular: "#EA7E23",
          pop: "#EA7E23",
        },
        score: {
          one: "#8B2C2C",
          two: "#FCC3C3",
          three: "#FCFAC3",
          four: "#C7FCC3",
          five: "#6E8E81",
        },
      },
    },

    fontFamily: {},
  },
  plugins: [],
};
