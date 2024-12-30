/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B394A",
        secondary: "#FDA5A4",
        tertiary: "#C5D0DD",
        quaternary: "#84a59d",
      },
      fontFamily: {
        primary: ["Raleway", "sans-serif"],
        secondary: ["Barlow", "sans-serif"],
        tertiary: ["Belleza", "sans-serif"],
      },
    },
  },
  plugins: [],
};
