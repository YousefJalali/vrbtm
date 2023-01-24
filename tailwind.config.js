/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./libs/**/*.{js,ts,jsx,tsx,svg}",
    "./node_modules/react-quill/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#4E63F2",
          "primary-focus": "#0E25C2",
        },
      },
    ],
  },
  // theme: {
  //   colors: {
  //     transparent: "transparent",
  //     brand: {
  //       primary: {
  //         DEFAULT: "#4E63F2",
  //         50: "#F9FAFF",
  //         100: "#E6E9FD",
  //         200: "#C0C7FA",
  //         300: "#9AA6F8",
  //         400: "#7484F5",
  //         500: "#4E63F2",
  //         600: "#1A35EE",
  //         700: "#0E25C2",
  //         800: "#0A1B8D",
  //         900: "#071159",
  //       },
  //     },

  //     utility: {
  //       action: "#009ce3",
  //       information: "#4d6680",
  //       confirmation: "#78a100",
  //       warning: "#f2b600",
  //       critical: "#e81c00",
  //       rating: "#ffc120",
  //       saved: "#e44753",
  //     },

  //     content: {
  //       contrast: "rgba(19, 41, 63, 1)",
  //       default: "rgba(19, 41, 63, 0.8)",
  //       subtle: "rgba(19, 41, 63, 0.65)",
  //       nonessential: "rgba(19, 41, 63, 0.4)",
  //     },

  //     layout: {
  //       divider: "rgba(167, 174, 181, 0.6)",
  //       level0: "rgba(255, 255, 255, 1)",
  //       level0accent: "rgba(237, 240, 242, 1)",
  //       level1: "rgba(249, 250, 251, 1)",
  //       level1accent: "rgba(228, 231, 235, 1)",
  //       level2: "rgba(242, 245, 247, 1)",
  //       level2accent: "rgba(220, 225, 230, 1)",
  //       level3: "rgba(235, 239, 242, 1)",
  //       level3accent: "rgba(211, 216, 222, 1)",
  //     },
  //   },

  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-montserrat)"],
  //     },
  //   },
  // },
}
