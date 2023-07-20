/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        lightGradient:
          "linear-gradient(90deg, rgba(9, 137, 255, 1) 0%, rgba(53, 157, 255, 1) 33%, rgba(82, 170, 255, 1) 66%, rgba(104, 177, 251, 1) 100%)",
        darkGradient:
          "linear-gradient(90deg, hsl(235, 66%, 20%) 25%, hsl(224, 62%, 15%) 100%);",
      },
    },
  },
  plugins: [],
};
