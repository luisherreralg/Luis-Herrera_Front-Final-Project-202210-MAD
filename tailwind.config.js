/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./projects/**/*.{html,ts}"],
  theme: {
    extend: {
      // Added some custom fonts to tailwind
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Koulen: ["Koulen", "sans-serif"],
      },
    },
  },
  plugins: [],
};
