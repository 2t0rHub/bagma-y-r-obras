import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
