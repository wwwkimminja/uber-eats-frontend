/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: false,

  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      }
    },
  },
  variants: {
    extends: {},
  },
  plugins: [],
}
