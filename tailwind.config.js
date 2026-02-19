module.exports = {
  content: [
    "./index.html",
    "./_pages/**/*.{html,md}",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./collections/**/*.{md,html}",
    "./assets/**/*.{js,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
