/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1780px",
      "4xl": "2160px", // only need to control product grid mode in ultra 4k device
    },
    fontFamily: {
      Chau_Philomene_One: ["Chau_Philomene_One", "sans-serif"],
    },
    extend: {
      colors: {
        brand: "#003E6B",
        body: "#ffffff",
        lightBackground: "#F6F8FB",
        textfield_stroke: "#D9E5F6",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
