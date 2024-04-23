import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "loading-gradient":
          "linear-gradient(132deg, rgba(74,160,217,1) 12%, rgba(133,113,204,1) 51%, rgba(65,137,185,1) 100%)",
      },
      backgroundColor: {
        "primary-ui": "rgba(39,39,42,1)",
        "app-gradient": "rgba(9,9,11,1)",
        "secondary-ui": "rgba(250,250,250, 1)",
        "bluescreen": "#003c94"
      },
      "textColor": {
        "secondary-font": "rgb(149,149,157)",
        "primary-font": "rgb(47,47,49)",
        "header-font": "rgba(250, 250, 250,1)"
      },
      borderColor: {
        "secondary": "rgba(250, 250, 250,1)"
      }
    },
  },
  plugins: [],
};
export default config;
