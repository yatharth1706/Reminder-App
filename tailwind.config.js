/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    extend: {
      maxHeight: {
        128: "32rem",
      },
      height: {
        100: "28rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
