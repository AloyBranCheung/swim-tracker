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
        "403-gradient":
          "linear-gradient(132deg, rgba(28,181,224,1) 9%, rgba(4,22,90,1) 31%, rgba(1,4,73,1) 35%, rgba(5,28,95,1) 55%, rgba(11,72,132,1) 75%, rgba(16,105,159,1) 85%, rgba(28,181,224,1) 100%)",
        "403-btn-gradient-hover":
          "linear-gradient(to right, #193242 0%, #312a4a  51%, #193242  100%)",
        "403-btn-gradient":
          "linear-gradient(to right, #2b5876 0%, #4e4376  51%, #2b5876  100%)",
      },
    },
  },
  plugins: [],
};
export default config;
