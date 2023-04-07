/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'github': "url('/static/github.png')",
        'loading': "url('/static/loading.png')",
        'pass': "url('/static/pass.png')",
        'fail': "url('/static/fail.png')",
      }
    },
  },
  plugins: [],
}