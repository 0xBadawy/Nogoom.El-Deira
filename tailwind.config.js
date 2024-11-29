/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8a2ae3",
        primaryHover: "#8a2ae377",
        secondary: "#ffed4a",
        grayC: "#cbb9e0",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};