/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Helvetica", "sans-serif"],
      },
      fontSize: {
        "4.5xl": "2.625rem",
        tiny: "10px",
        "0.5xs": "11px",
        xxs: ".62rem",
        "0.5base": "0.9375rem",
        "1.1xl": "21px",
      },
      boxShadow: {
        card: "0 0 10px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        "off-white": "#FCFCFC",
        plaster: "#EAEAEA",
        "dim-white": "#FBFBFB",
        silver: "#E0E0E0",
        iron: "#484748",
        "shamrock-green": "#3AD29F",
        "nero-black": "#212121",
        "nero-white": "#FCFCFC",
        "saffron-yellow": "#F5C32C",
        "rajah-orange": "#FDAF67",
        "dim-gray": "#848484",
        "mortar-gray": "#585555",
        "white-30%": "#FFFFFF4D",
        "light-cyan": "#D6FFF1",
        "aquamarine-blue": "#88FFD7",
        "gainsboro-gray": "#BDBDBD",
        "smoke-white": "#F2F2F2",
        "dark-gray": "#A0A0A0",
        "eclipse-gray": "#3A3A3A",
        "off-white": " #F9F9F9",
        "sea-blue": "#2196F3",
      },
      height: {
        15: "3.75rem",
      },
      spacing: {
        150: "33rem",
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        56: "14rem",
        16: "4rem",
        "8xl": "90rem",
      },
      maxWidth: {
        "34rem": "34rem",
      },
      screens: {
        xxs: "370px",
        xs: "535px",
        "1.5xl": "1380px",
        "3xl": "1700px",
      },
      listStyleType: {
        roman: "lower-roman",
        alpha: "lower-alpha",
      },
    },
    variants: {
      extend: {
        fontWeight: ["hover"],
        padding: ["hover", "group-hover"],
        opacity: ["disabled"],
      },
    },
  },
  plugins: [],
};
