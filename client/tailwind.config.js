module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: {
          50: "#FFFAF0",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
