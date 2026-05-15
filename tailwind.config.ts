import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0F0F0F",
        card: "#141414",
        line: "#1F1F1F",
        ink: "#F5F2EA",
        muted: "#9A9A9A",
        ember: "#FF3B1F",
        amber: "#FF6A00",
        gold: "#F5B23D",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "ui-serif", "Georgia"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.025em",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 80s linear infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(.16,1,.3,1) forwards",
        flicker: "flicker 3s steps(1) infinite",
        scan: "scan 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 96%, 100%": { opacity: "1" },
          "97%": { opacity: "0.6" },
          "98%": { opacity: "0.9" },
          "99%": { opacity: "0.5" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
