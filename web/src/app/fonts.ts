import localFont from "next/font/local";

// BDO Grotesk Variable — display / headline family. Full 100–900 weight range.
export const bdoGrotesk = localFont({
  src: "./fonts/BDOGrotesk-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});

// Inter — body / UI family. 400 + 700 latin.
export const inter = localFont({
  src: [
    { path: "./fonts/Inter-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-700-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "sans-serif"],
});
