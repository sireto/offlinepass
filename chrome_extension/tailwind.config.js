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
      inter: ["Inter"],
    },
    extend: {
      colors: {
        brand: "#003E6B",
        buttonColor: "#5c75f6",
        body: "#ffffff",

        lightBackground: "#F6F8FB",
        lightGray: "#808080",

        textfield_stroke: "#D9E5F6",
        textfield_label: "#4E4E4E",

        success: "#4BB543",
        danger: "#df4759",
      },
    },
  },
  plugins: [],
};
