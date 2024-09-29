import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorBlue:"#4e848c",
        colorRed:"#ceg28e",
        colorGrey:"#f2foe3",
        colorOrange:"#fbc494",
      },
    },
  },
  plugins: [],
};
export default config;
