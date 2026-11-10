import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { previewBanner, siteConfig } from "@/content/site";

// Skip link, header, main landmark and footer. Used by the (site) layout and
// by app/not-found.tsx, which renders outside that layout.
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="group/site-shell relative flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="text-primary fixed top-4 left-4 z-70 -translate-y-24 rounded-full bg-white px-5 py-3 focus:translate-y-0"
      >
        Skip to content
      </a>
      {/* The floating notice is hidden on paper, so printed copies and PDFs
          carry this line instead and still read as a draft. */}
      {!siteConfig.indexable && (
        <p className="hidden border-b border-slate-300 pb-2 text-center text-[9pt] tracking-wide text-slate-700 uppercase print:mb-6 print:block">
          {previewBanner.message}
        </p>
      )}
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {!siteConfig.indexable && <PreviewBanner />}
    </div>
  );
}
