import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

// Skip link, header, main landmark and footer. Used by the (site) layout and
// by app/not-found.tsx, which renders outside that layout.
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="text-primary fixed top-4 left-4 z-70 -translate-y-24 rounded-full bg-white px-5 py-3 focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
