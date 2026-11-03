import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundView } from "@/components/shared/not-found-view";
import { systemPages } from "@/content/system-pages";

const content = systemPages.notFound;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.description,
  robots: { index: false, follow: true },
};

// Unmatched URLs render outside the (site) layout, so this boundary adds chrome.
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
