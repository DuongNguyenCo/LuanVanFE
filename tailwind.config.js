/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-dupe-keys
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1360: "1360px",
        1024: "1024px",
        170: "170px",
        140: "140px",
        50: "50px",
        30: "30px",
      },
      height: {
        60: "50px",
        170: "170px",
        70: "70px",
        200: "200px",
        "1px": "1px",
        30: "30px",
      },
      lineHeight: {
        70: "70px",
        60: "60px",
        200: "200px",
        30: "30px",
        56: "56px",
      },
      margin: {
        70: "70px",
      },
      padding: {
        70: "70px",
      },
      maxWidth: {
        170: "170px",
        50: "50px",
      },
      maxHeight: {
        170: "170px",
        50: "50px",
      },
      minHeight: {
        300: "300px",
        80: "80px",
        122: "122px",
        228: "228px",
        50: "50px",
      },
      colors: {
        step: "#CBCBCB",
        stepActive: "#67B7DC",
        button: "rgb(234,30,48)",
        chinh: "rgb(34,31,32)",
        phu: "rgb(233,233,233)",
        chu1: "rgb(155,154,154)",
        chu2: "rgb(255,255,255)",
        link: "#005aff",
        mini: "#999",
        black: "#000",
        phu3: "rgb(46,42,43)",
        chu3: "rgb(187,189,191)",
      },
      fontSize: {
        h1: "22px",
        p: "20px",
        span: "16px",
        mini: "10px",
        big: "32px",
      },
      boxShadow: {
        box1: "box-shadow: 0 -2px 5px 0 #ccc;",
      },
    },
  },
  plugins: [],
};
