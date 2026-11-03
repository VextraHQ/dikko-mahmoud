import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "./fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="bg-background text-foreground font-sans">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
