/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ja,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      }
    },
  },
  plugins: [],
}
