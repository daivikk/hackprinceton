/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blob1: "blob1 7s infinite",
        blob2: "blob2 4s infinite",
      },
      keyframes: {
        blob1: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(50px, -30px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-50px, 30px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        blob2: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(-50px, 30px) scale(1.1)",
          },
          "66%": {
            transform: "translate(50px, -30px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        transparent: 'transparent',
        'black': '#000000',
        'light-gray': '#F9FAFB',
        'light-gray-2': '#EDEDED',
        'gray-md': '#DADADA',
        'dark-gray': '#373737',
        'white':'#FFFFFF',
        'light-blue': '#D4EFFF',
        'blue': '#00A3FF',
        'light-purple': '#E9DCFF',
        'purple': "#6D55FF",
        'dark-purple': "#BD94FF",
      },
    },
  },
  plugins: [require("daisyui")],
}

