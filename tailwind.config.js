/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "synthwave",
      "fantasy",
      "coffee",
      "night",
      "dim",
      "lemonade",
      "lofi",
      "luxury",
      "dracula",
    ],
  },
};
