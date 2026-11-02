import { notFound } from "next/navigation";

// The @profile slot's null catch-all makes every URL match this layout, so the
// main slot needs one too: unknown paths fall through to (site)/not-found.tsx
// inside the single site shell instead of rendering an empty page. Metadata
// also throws, as on practice routes, so the 404 title is kept.
export function generateMetadata() {
  notFound();
}

export default function UnknownPage() {
  notFound();
}
