/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5BACA1",
        "primary-600": "#2b7d6f",
        "primary-300": "#b4dbd6",
      },
    },
  },
  darkMode: false,
  plugins: [],
};
