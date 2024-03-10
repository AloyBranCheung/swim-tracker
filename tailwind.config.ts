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
        "app-gradient":
          "linear-gradient(132deg, rgba(31,162,198,1) 12%, rgba(22,99,170,1) 34%, rgba(0,37,180,1) 66%, rgba(0,10,227,1) 100%)",
        "403-btn-gradient-hover":
          "linear-gradient(132deg, rgba(61,122,161,1) 0%, rgba(111,96,166,1) 51%, rgba(56,110,144,1) 100%)",
        "loading-gradient":
          "linear-gradient(132deg, rgba(74,160,217,1) 12%, rgba(133,113,204,1) 51%, rgba(65,137,185,1) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
