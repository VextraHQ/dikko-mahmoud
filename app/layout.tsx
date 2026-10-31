import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "./fonts";
import "./globals.css";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} antialiased motion-safe:scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-background text-foreground font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
