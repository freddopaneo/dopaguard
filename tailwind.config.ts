import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        monte: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        "halo-derive": {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(28px,-22px,0) scale(1.05)" },
          "100%": { transform: "translate3d(-24px,18px,0) scale(.97)" },
        },
        "pulse-dot": { "0%,100%": { transform: "scale(.6)", opacity: ".45" }, "50%": { transform: "scale(1.25)", opacity: "0" } },
        "radar-sweep": { to: { transform: "rotate(360deg)" } },
        "radar-ping": { "0%": { transform: "scale(.4)", opacity: ".8" }, "100%": { transform: "scale(1.9)", opacity: "0" } },
      },
      animation: {
        monte: "monte .8s cubic-bezier(.22,1,.36,1) both",
        "halo-derive": "halo-derive 26s ease-in-out infinite alternate",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "radar-sweep": "radar-sweep 6s linear infinite",
        "radar-ping": "radar-ping 2.4s ease-out infinite",
      },
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
