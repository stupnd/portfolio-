import type { Config } from "tailwindcss";

/** Every colour is a CSS variable (space-separated RGB) so the night edition
 *  and the alternate plate re-scope them without touching component classes. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: token("paper"), 2: token("paper-2") },
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        rule: {
          DEFAULT: token("rule"),
          strong: token("rule-strong"),
        },
        accent: {
          DEFAULT: token("accent"),
          ink: token("accent-ink"),
        },
        ack: token("ack"),
        pending: token("pending"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-text)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        cover: ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.015em" }],
        headline: ["clamp(2.5rem, 5vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.012em" }],
      },
      maxWidth: {
        issue: "84rem",
      },
      borderRadius: {
        DEFAULT: "0",
      },
    },
  },
  plugins: [],
};
export default config;
