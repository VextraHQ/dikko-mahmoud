import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dikko & Mahmoud",
  description: "The new Dikko & Mahmoud website is currently in development.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${newsreader.variable} antialiased motion-safe:scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-background text-foreground font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
