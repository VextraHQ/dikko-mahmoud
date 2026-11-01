import { readFileSync } from "node:fs";
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

  it("keeps both correctly sized share images when a page replaces metadata", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com/");
    const metadata = createPageMetadata({
      title: "The Firm",
      description: "About us.",
      path: "/the-firm",
    });
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "https://preview.example.com/opengraph-image.png",
        width: 2400,
        height: 1260,
        type: "image/png",
      }),
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: `The Firm | ${siteConfig.name}`,
      description: "About us.",
      images: [
        expect.objectContaining({
          url: "https://preview.example.com/twitter-image.png",
          width: 2400,
          height: 1200,
        }),
      ],
    });
  });

  it("uses a page-specific image on both platforms without assuming PNG", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com");
    const image = { url: "/article.jpg", alt: "An article cover" };
    const metadata = createPageMetadata({
      title: "An article",
      description: "Article description.",
      path: "/insights/article",
      image,
    });
    const expected = [
      { ...image, url: "https://preview.example.com/article.jpg" },
    ];
    expect(metadata.openGraph?.images).toEqual(expected);
    expect(metadata.twitter).toMatchObject({ images: expected });
  });
});

describe("createSiteMetadata", () => {
  it("follows the indexable switch", () => {
    expect(createSiteMetadata().robots).toEqual({
      index: siteConfig.indexable,
      follow: true,
    });
  });

  it("sets root share defaults with absolute deployment URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.com");
    const metadata = createSiteMetadata();
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "https://preview.example.com/opengraph-image.png",
        width: 2400,
        height: 1260,
      }),
    ]);
    expect(metadata.twitter).toMatchObject({
      images: [
        expect.objectContaining({
          url: "https://preview.example.com/twitter-image.png",
          width: 2400,
          height: 1200,
        }),
      ],
    });
  });
});

describe("share image files", () => {
  it.each([
    { name: "opengraph-image", width: 2400, height: 1260, maxBytes: 8_000_000 },
    { name: "twitter-image", width: 2400, height: 1200, maxBytes: 5_000_000 },
  ])("$name matches its declared dimensions and has alt text", (asset) => {
    const bytes = readFileSync(
      new URL(`../app/${asset.name}.png`, import.meta.url),
    );
    expect(bytes.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect(bytes.toString("ascii", 12, 16)).toBe("IHDR");
    expect(bytes.readUInt32BE(16)).toBe(asset.width);
    expect(bytes.readUInt32BE(20)).toBe(asset.height);
    expect(bytes.length).toBeLessThan(asset.maxBytes);
    expect(
      readFileSync(
        new URL(`../app/${asset.name}.alt.txt`, import.meta.url),
        "utf8",
      ).trim(),
    ).toBe("Dikko & Mahmoud — Built on experience. Guided by principles.");
  });
});
