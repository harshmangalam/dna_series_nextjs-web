module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#1E1D32",
          2: "#26253F",
          3: "#171627",
          4: "#131222",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
