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
        bg:        "#000000",
        border:    "#1A1A1A",
        label:     "#444444",
        body:      "#888888",
        headline:  "#CCCCCC",
        surface:   "#0A0A0A",
      },
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "-apple-system",
          "BlinkMacSystemFont",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        hero: ["clamp(48px,8vw,100px)", { lineHeight: "1.0", letterSpacing: "-0.045em" }],
      },
      letterSpacing: {
        tightest: "-0.055em",
        tighter:  "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
