import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;
type ShareImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

const shareImageAlt =
  "Dikko & Mahmoud — Built on experience. Guided by principles.";
const openGraphImage = {
  url: "/opengraph-image.png",
  width: 2400,
  height: 1260,
  alt: shareImageAlt,
};
const twitterImage = {
  url: "/twitter-image.png",
  width: 2400,
  height: 1200,
  alt: shareImageAlt,
};

function absoluteImage(image: ShareImage) {
  return { ...image, url: new URL(image.url, getSiteUrl()).toString() };
}

function trimSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * The address the site is being served from:
 * 1. NEXT_PUBLIC_SITE_URL (custom domains, staging, local share testing)
 * 2. Vercel's preview or production URL
 * 3. The configured fallback in content/site.ts
 */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }
  const vercelUrl =
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;
  if (vercelUrl) return trimSlash(`https://${vercelUrl}`);
  return trimSlash(siteConfig.url);
}

/** "The Firm" → "The Firm | Dikko & Mahmoud"; no title → the firm name. */
export function pageTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}

// Next.js replaces (not merges) a parent's `openGraph` when a page sets its
// own, so every page rebuilds the shared fields through this one function.
function openGraph({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
}): OpenGraph {
  return {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: path,
    title,
    description,
    images: [
      image
        ? absoluteImage(image)
        : { ...absoluteImage(openGraphImage), type: "image/png" },
    ],
  };
}

function twitter({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: ShareImage;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteImage(image ?? twitterImage)],
  };
}

const robots: Metadata["robots"] = siteConfig.indexable
  ? { index: true, follow: true }
  : { index: false, follow: true };

/** Site-wide defaults, used once by the root layout. */
export function createSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    alternates: { canonical: "/" },
    openGraph: openGraph({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    }),
    twitter: twitter({
      title: siteConfig.name,
      description: siteConfig.description,
    }),
    robots,
  };
}

/**
 * Metadata for one page. Pass the page's own title (without the firm name),
 * a one- or two-sentence description and its path from `routes`.
 */
export function createPageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: ShareImage;
}): Metadata {
  const fullTitle = pageTitle(title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: openGraph({ title: fullTitle, description, path, image }),
    twitter: twitter({ title: fullTitle, description, image }),
  };
}
