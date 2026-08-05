import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core surfaces — near-black with a slight blue cast, never pure #000
        base: {
          950: "#07080c",
          900: "#0b0d13",
          850: "#10131c",
          800: "#151926",
          700: "#1e2436",
        },
        // Accent: electric indigo → cyan range
        accent: {
          DEFAULT: "#6c7cff",
          soft: "#8b98ff",
          cyan: "#4cc9f0",
          violet: "#a78bfa",
        },
        ink: {
          DEFAULT: "#e8eaf2",
          muted: "#9aa1b5",
          faint: "#5c6377",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 5.25rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
