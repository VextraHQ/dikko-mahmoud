import localFont from "next/font/local";

// Shared by the root layout and global-error.tsx (which replaces the layout).
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "400 700",
  variable: "--font-manrope",
  display: "swap",
});
const newsreader = localFont({
  src: "./fonts/newsreader-latin.woff2",
  weight: "400 700",
  variable: "--font-newsreader",
  display: "swap",
});

export const fontVariables = `${manrope.variable} ${newsreader.variable}`;
