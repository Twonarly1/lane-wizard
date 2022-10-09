/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          animation: {
            wiggle: "wiggle 1s ease-in-out  infinite",
            wave: "wave 20s ease-in-out infinite",

        },
        keyframes: {
            wiggle: {
                "0%, 100%": { transform: "rotate(-5deg)" },
                "50%": { transform: "rotate(5deg)" },
            },
            wave: {
              to: { "margin-left": "-100%" },
            },
          },
        },
    },
    plugins: [
      require("@tailwindcss/forms"),
      require('tailwind-scrollbar-hide')
  ],
}
