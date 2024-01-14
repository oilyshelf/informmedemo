import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A0CC88",

          secondary: "#354086",

          accent: "#419EF3",

          neutral: "#F5F5F5",

          "base-100": "#FFFFFF",

          info: "#00d1ff",

          success: "#01EDB4",

          warning: "#FFA726",

          error: "#F44336",
        },
      },
    ],
  },
};
export default config;
