import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dopaguard: {
          navy: "#133742",
          navyDark: "#0d2e38",
          navyMid: "#1e4d5e",
          lime: "#c7ff98",
          teal: "#60d9d1",
          cream: "#fafaf7",
          muted: "#e8f0ee",
          critical: "#EF4444",
          success: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;
