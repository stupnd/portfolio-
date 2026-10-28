import type { Config } from "tailwindcss";

/** Every colour is a CSS variable (space-separated RGB) so the dark theme and
 *  the ink band can re-scope them without touching component classes. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        raised: token("raised"),
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        rule: {
          DEFAULT: token("rule"),
          strong: token("rule-strong"),
        },
        // Cobalt: the one colour that owns regions (the record panel, actions)
        accent: {
          DEFAULT: token("accent"),
          soft: token("accent-soft"),
          ink: token("accent-ink"),
          // Legacy aliases still used inside LedgerSim
          cyan: token("ack"),
          violet: token("accent"),
        },
        ack: token("ack"),
        pending: token("pending"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-martian)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7.2vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 4.6vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.5rem, 2.6vw, 2.125rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
