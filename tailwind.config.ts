import type { Config } from "tailwindcss";

export default {
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
        skinColor: "#FFF3E3",
        brownColor: "#B88E2F",
        lightSkin: "#FCF8F3"
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
