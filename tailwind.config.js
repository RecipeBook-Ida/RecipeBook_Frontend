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
        bookNeutral: "#e9d8a6",
        bookBase:{
          light: "#94d2bd",
          regular: "#0a9396",
          dark: "#005f73",
          darkest: "#001219"
        },
        bookAccent: {
          lightest: "#ee9b00",
          light: "#ca6702",
          regular: "#bb3e03",
          dark: "#ae2012",
          darkest: "#9b2226"
        },
        bookBG: "#fbf7f4",
        bookBgGradient: "#344977",
        
      },
    },

    fontFamily: {},
  },
  plugins: [],
};
