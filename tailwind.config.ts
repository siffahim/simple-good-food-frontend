import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1440px",
      }
    },
    extend: {
      colors: {
        // primary: "#277E16",
        primary: "#6EA963",
        secondary: "#FDB64E",
        base: "#F8F1E6",
      }
    },
  },
  plugins: [],
};
export default config;
