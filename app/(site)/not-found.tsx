import type { Metadata } from "next";
import { NotFoundView } from "@/components/shared/not-found-view";
import { systemPages } from "@/content/system-pages";

const content = systemPages.notFound;
export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.description,
  robots: { index: false, follow: true },
};

// A built route rejected its parameters; the (site) layout already owns chrome.
export default function SiteNotFound() {
  return <NotFoundView />;
}
