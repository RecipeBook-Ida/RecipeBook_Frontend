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
        bookPrimary:{
          light: "#8ecae6",
          medium: "#219ebc",
          dark: "#023047",
        },
      bookSec: {
        light: "#ffb703",
        medium: "#fb8500",
        dark: "#9b2226",
      },
        bookBG: "#344966",
        bookBgGradient: "#344977",
      },
    },

    fontFamily: {},
  },
  plugins: [],
};
