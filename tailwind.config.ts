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
          bg: "#0F172A",
          accent: "#22D3EE",
          critical: "#EF4444",
          success: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;
