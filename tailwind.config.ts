import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lumi: {
          violet: "#7057E8",
          deep: "#4935A8",
          lavender: "#F0ECFF",
          yellow: "#FFD66B",
          mint: "#CFF5E7",
          sky: "#DCEEFF",
          coral: "#FFB7A8",
          bg: "#FAF9F6",
          surface: "#FFFFFF",
          text: "#25233A",
          muted: "#6F6B80",
          border: "#EAE7F1",
          success: "#26876A",
        },
        subject: {
          science: "#7057E8",
          math: "#2563EB",
          chemistry: "#0D9488",
          biology: "#16A34A",
          art: "#E11D48",
          coding: "#9333EA",
          earth: "#0284C7",
          language: "#EA580C",
          engineering: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(37, 35, 58, 0.04)",
        card: "0 4px 20px rgba(37, 35, 58, 0.06)",
        float: "0 10px 30px rgba(112, 87, 232, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
