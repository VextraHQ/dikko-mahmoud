import { afterEach, describe, expect, it, vi } from "vitest";

import { siteConfig } from "@/content/site";
import {
  createPageMetadata,
  createSiteMetadata,
  getSiteUrl,
  pageTitle,
} from "@/lib/metadata";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("pageTitle", () => {
  it("appends the firm name", () => {
    expect(pageTitle("The Firm")).toBe(`The Firm | ${siteConfig.name}`);
  });

  it("falls back to the firm name alone", () => {
    expect(pageTitle()).toBe(siteConfig.name);
  });
});

describe("getSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL and trims a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.example.com/");
    expect(getSiteUrl()).toBe("https://staging.example.com");
  });

  it("uses the Vercel preview URL on previews", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_URL", "dm-git-feature.vercel.app");
    expect(getSiteUrl()).toBe("https://dm-git-feature.vercel.app");
  });
});

describe("createPageMetadata", () => {
  it("keeps the shared Open Graph fields on every page", () => {
    const metadata = createPageMetadata({
      title: "The Firm",
      description: "About us.",
      path: "/the-firm",
    });
    expect(metadata.title).toEqual({
      absolute: `The Firm | ${siteConfig.name}`,
    });
    expect(metadata.alternates?.canonical).toBe("/the-firm");
    expect(metadata.openGraph).toMatchObject({
      siteName: siteConfig.name,
      url: "/the-firm",
      description: "About us.",
    });
  });
});

describe("createSiteMetadata", () => {
  it("follows the indexable switch", () => {
    expect(createSiteMetadata().robots).toEqual({
      index: siteConfig.indexable,
      follow: true,
    });
  });
});
