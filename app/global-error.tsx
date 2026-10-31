"use client";

import { ErrorView, type ErrorViewProps } from "@/components/shared/error-view";
import { fontVariables } from "./fonts";
import "./globals.css";

// Last resort when the root layout fails. It replaces that layout, so it
// brings its own <html>, fonts and styles.
export default function GlobalError(props: ErrorViewProps) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="bg-background text-foreground font-sans">
        <ErrorView {...props} />
      </body>
    </html>
  );
}
