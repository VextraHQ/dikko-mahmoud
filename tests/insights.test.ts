import { describe, expect, it } from "vitest";
import { demoInsightIndex, insightImages } from "@/content/insight-articles";
import { demoInsightBodies } from "@/content/insight-bodies";
import { practiceIndex } from "@/content/practice-index";
import {
  articleContents,
  articlePlainText,
  cleanArticleShareUrl,
  estimateReadTime,
  formatInsightDate,
  headingAnchor,
  imagePosition,
  readingProgress,
  safeArticleHref,
  shortenText,
  validInsightImage,
} from "@/lib/insights/article";
import {
  insightArticleMetadata,
  insightListingMetadata,
  insightStructuredData,
} from "@/lib/insights/metadata";
import {
  hasInsightFilters,
  defaultInsightView,
  insightPageNumbers,
  insightQueryString,
  normalizeInsightQuery,
} from "@/lib/insights/query";
import {
  eligibleInsightSources,
  getHomeInsights,
  getInsightSlugs,
  getPracticeInsights,
  getRelatedInsights,
  insightIssues,
  insightDiagnostics,
  resolveInsight,
  selectInsightPage,
  type InsightData,
} from "@/lib/insights/repository";
import { headerTone } from "@/lib/navigation";
import { isRouteAvailable, routes } from "@/lib/routes";
import { jsonLdString } from "@/lib/structured-data";
import type { InsightBlock, InsightSource } from "@/types/insights";
const preview = { allowPreview: true, now: Date.UTC(2026, 10, 3) };
const launch = { ...preview, allowPreview: false };
const defaults = normalizeInsightQuery({});
const data = { index: demoInsightIndex, bodies: demoInsightBodies };
const first = demoInsightIndex[0];

function changed(patch: Partial<InsightSource>): InsightData {
  return { ...data, index: [{ ...first, ...patch }] };
}

describe("Insights query state", () => {
  it("normalizes repeated inputs, whitespace, unknown filters and invalid pages", () => {
    expect(
      normalizeInsightQuery({
        q: ["  useful   notes ", "ignored"],
        page: "-3",
        sort: "popular",
        type: "bad",
        practice: "not-real",
      }),
    ).toEqual({ ...defaults, q: "useful notes" });
    for (const page of ["0", "NaN", "1.5", "999999999999999999", "Infinity"])
      expect(normalizeInsightQuery({ page }).page).toBe(1);
    expect(normalizeInsightQuery({ q: "x".repeat(500) }).q).toHaveLength(120);
  });
  it("round-trips only canonical non-default state with safe encoding", () => {
    const query = normalizeInsightQuery({
      q: "contract & board",
      type: "case-note",
      practice: practiceIndex[0].slug,
      sort: "oldest",
      page: "2",
    });
    const search = insightQueryString(query);
    expect(search).toContain("q=contract+%26+board");
    expect(
      normalizeInsightQuery(Object.fromEntries(new URLSearchParams(search))),
    ).toEqual(query);
    expect(insightQueryString(defaults)).toBe("");
  });
  it("treats only search, type and practice as filters", () => {
    expect(hasInsightFilters(defaults)).toBe(false);
    for (const patch of [
      { q: "x" },
      { type: "article" },
      { practice: practiceIndex[0].slug },
    ])
      expect(hasInsightFilters({ ...defaults, ...patch })).toBe(true);
    expect(hasInsightFilters({ ...defaults, sort: "oldest" })).toBe(false);
  });
  it("bounds pagination controls even for a large archive", () => {
    expect(insightPageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(insightPageNumbers(50, 100)).toEqual([
      1,
      "gap-before",
      49,
      50,
      51,
      "gap-after",
      100,
    ]);
    expect(insightPageNumbers(1, 100)).toEqual([1, 2, "gap-after", 100]);
  });
});

describe("CMS-compatible records and homepage synchronization", () => {
  it("reports invalid records without treating disabled samples as data errors", () => {
    expect(insightDiagnostics(launch)).toEqual([]);
    expect(
      insightDiagnostics(preview, changed({ authorIds: ["missing"] })),
    ).toEqual([{ id: first.id, issues: ["author"] }]);
  });
  it("sorts instants correctly across ISO timezone offsets", () => {
    const index = [
      { ...demoInsightIndex[0], publishedAt: "2026-09-15T12:00:00+05:00" },
      { ...demoInsightIndex[1], publishedAt: "2026-09-15T08:00:00Z" },
    ];
    expect(
      selectInsightPage({ ...defaults, type: index[0].type }, preview, {
        ...data,
        index: index.map((source) => ({ ...source, type: index[0].type })),
      }).items.map((item) => item.id),
    ).toEqual([index[1].id, index[0].id]);
  });
  it("has 27 unique complete demo articles and valid canonical references", () => {
    expect(new Set(demoInsightIndex.map((article) => article.id)).size).toBe(
      27,
    );
    expect(eligibleInsightSources(preview)).toHaveLength(27);
    for (const source of demoInsightIndex) {
      expect(
        insightIssues(source, demoInsightBodies[source.id], preview),
      ).toEqual([]);
      const article = resolveInsight(source.id, preview)!;
      expect(article.authors.length).toBeGreaterThan(0);
      expect(article.category).toBe(
        practiceIndex.find(
          (practice) => practice.slug === source.practiceIds[0],
        )?.title ?? "Firm news",
      );
      expect(article.readTimeMinutes).toBeGreaterThan(0);
    }
  });
  it("excludes all samples at launch and never supplies a demo as a missing record", () => {
    expect(eligibleInsightSources(launch)).toEqual([]);
    expect(getInsightSlugs(launch)).toEqual([]);
    expect(getHomeInsights(launch)).toBeNull();
    expect(resolveInsight(first.id, launch)).toBeNull();
    expect(resolveInsight("not-an-article", preview)).toBeNull();
  });
  it("uses the identical card metadata for Home, listing and article", () => {
    const home = getHomeInsights(preview)!;
    expect([
      home.feature.id,
      ...home.supporting.map((item) => item.id),
    ]).toEqual([
      "corporate-decisions",
      "dispute-strategy",
      "energy-projects",
      "technology-ip",
    ]);
    for (const card of [home.feature, ...home.supporting]) {
      const article = resolveInsight(card.id, preview)!;
      for (const key of [
        "title",
        "excerpt",
        "category",
        "authors",
        "image",
        "publishedAt",
        "readTimeMinutes",
      ] as const)
        expect(card[key]).toEqual(article[key]);
    }
  });
  it("projects no article bodies, references, keywords or SEO into card data", () => {
    const page = selectInsightPage(defaults, preview);
    for (const card of [...page.items, page.featured!]) {
      for (const field of [
        "body",
        "references",
        "keywords",
        "seo",
        "authorIds",
      ])
        expect(card).not.toHaveProperty(field);
    }
  });
  it("lists a practice's newest tagged articles, and nothing without tags", () => {
    const items = getPracticeInsights("energy-oil-gas", 3, preview);
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThanOrEqual(3);
    expect(
      items.every((item) => item.practiceIds.includes("energy-oil-gas")),
    ).toBe(true);
    const dates = items.map((item) => Date.parse(item.publishedAt));
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
    expect(getPracticeInsights("not-a-practice", 3, preview)).toEqual([]);
    expect(getPracticeInsights("energy-oil-gas", 3, launch)).toEqual([]);
  });

  it("lets firm news stand alone without a practice area", () => {
    const news = resolveInsight("introducing-legal-insights-series", preview)!;
    expect(news.type).toBe("firm-news");
    expect(news.practices).toEqual([]);
    expect(news.category).toBe("Firm news");
    expect(
      selectInsightPage({ ...defaults, type: "firm-news" }, preview).total,
    ).toBe(1);
  });
  it("rejects unresolved authors/practices, bad or future dates and incomplete bodies", () => {
    for (const patch of [
      { authorIds: ["missing"] },
      { authorIds: [] },
      { practiceIds: ["missing"] },
      { publishedAt: "bad" },
      { publishedAt: "2100-01-01" },
      { revisedAt: "1990-01-01" },
    ])
      expect(resolveInsight(first.id, preview, changed(patch))).toBeNull();
    expect(
      resolveInsight(first.id, preview, { ...data, bodies: {} }),
    ).toBeNull();
    expect(
      resolveInsight(first.id, preview, {
        ...data,
        bodies: { [first.id]: { body: [], references: [] } },
      }),
    ).toBeNull();
  });
  it("allows genuine canonical authors independently of demo records", () => {
    const input = changed({ demoOnly: false, authorIds: ["ab-mahmoud"] });
    expect(
      resolveInsight(first.id, launch, input)?.authors[0].profileSlug,
    ).toBe("ab-mahmoud");
  });
  it("derives missing excerpts and uses a branded fallback for invalid/missing media", () => {
    const article = resolveInsight(
      first.id,
      preview,
      changed({ excerpt: "", image: null }),
    )!;
    expect(article.excerpt.length).toBeGreaterThan(0);
    expect(article.excerpt.length).toBeLessThanOrEqual(200);
    expect(article.image).toBeNull();
    expect(
      resolveInsight(
        first.id,
        preview,
        changed({ image: { ...insightImages.papers, src: "javascript:bad" } }),
      )?.image,
    ).toBeNull();
  });
});

describe("server archive selection", () => {
  it("searches every word in any order, ignoring accents", () => {
    const ids = (q: string) =>
      selectInsightPage({ ...defaults, q }, preview).items.map(
        (item) => item.id,
      );
    expect(ids("patent nigeria")).toContain("patent-registration-nigeria");
    expect(ids("Nigéria PATENT")).toContain("patent-registration-nigeria");
    expect(ids("patent zzzz")).toEqual([]);
  });

  it("returns three bounded, distinct pages in deterministic order", () => {
    const pages = [1, 2, 3].map((page) =>
      selectInsightPage({ ...defaults, page }, preview),
    );
    expect(pages.map((page) => page.items.length)).toEqual([9, 9, 9]);
    const ids = pages.flatMap((page) => page.items.map((item) => item.id));
    expect(new Set(ids).size).toBe(27);
    expect(ids).toContain("patent-registration-nigeria");
    expect(pages.map((page) => page.featured?.id ?? null)).toEqual([
      "patent-registration-nigeria",
      null,
      null,
    ]);
    expect(
      pages.every((page) => page.total === 27 && page.totalPages === 3),
    ).toBe(true);
  });
  it("puts results first for search, filters and alternate sorting without changing archive membership", () => {
    expect(defaultInsightView(defaults)).toBe(true);
    for (const patch of [
      { q: "patent" },
      { type: "article" },
      { practice: "intellectual-property-technology" },
      { sort: "oldest" as const },
      { page: 2 },
    ]) {
      const query = { ...defaults, ...patch };
      expect(defaultInsightView(query)).toBe(false);
      expect(selectInsightPage(query, preview).featured).toBeNull();
    }
    const newest = selectInsightPage(defaults, preview);
    const oldest = selectInsightPage({ ...defaults, sort: "oldest" }, preview);
    expect(oldest.total).toBe(newest.total);
    expect(
      selectInsightPage({ ...defaults, q: "patent nigeria" }, preview).items[0]
        .id,
    ).toBe(newest.featured?.id);
  });
  it("filters title/body/type/practice before slicing and keeps facets on no matches", () => {
    const page = selectInsightPage(
      {
        ...defaults,
        practice: "intellectual-property-technology",
        type: "article",
      },
      preview,
    );
    expect(page.items.length).toBeGreaterThan(0);
    expect(
      page.items.every(
        (item) =>
          item.practiceIds.includes("intellectual-property-technology") &&
          item.type === "article",
      ),
    ).toBe(true);
    expect(
      selectInsightPage({ ...defaults, q: "WIPO" }, preview).items[0].id,
    ).toBe(first.id);
    const none = selectInsightPage(
      { ...defaults, q: "does-not-exist-xyz" },
      preview,
    );
    expect(none.items).toEqual([]);
    expect(none.totalPages).toBe(0);
    expect(none.facets.practices).toHaveLength(9);
  });
  it("sorts oldest first and clamps a stale page to the final valid page", () => {
    expect(
      selectInsightPage({ ...defaults, sort: "oldest" }, preview).items[0].id,
    ).toBe(demoInsightIndex[26].id);
    expect(selectInsightPage({ ...defaults, page: 999 }, preview).page).toBe(3);
  });
  it("distinguishes empty collections and valid single-item collections", () => {
    const empty = selectInsightPage(defaults, preview, {
      index: [],
      bodies: {},
    });
    expect(empty.catalogueTotal).toBe(0);
    expect(empty.featured).toBeNull();
    expect(empty.totalPages).toBe(0);
    const single = selectInsightPage(defaults, preview, {
      ...data,
      index: [demoInsightIndex[1]],
    });
    expect(single.totalPages).toBe(1);
    expect(single.items).toHaveLength(1);
    expect(single.featured?.id).toBe(demoInsightIndex[1].id);
  });
  it("uses stable tie-breakers when dates coincide", () => {
    const tied = {
      ...data,
      index: demoInsightIndex
        .slice(0, 3)
        .map((source) => ({ ...source, publishedAt: first.publishedAt })),
    };
    const page = selectInsightPage(defaults, preview, tied);
    const expected = tied.index.map((source) => source.id).sort();
    expect(page.items.map((item) => item.id)).toEqual(expected);
  });
  it("excludes the current article and ranks same-practice related articles first", () => {
    const article = resolveInsight(first.id, preview)!;
    const related = getRelatedInsights(article, 3, preview);
    expect(related).toHaveLength(3);
    expect(related.some((item) => item.id === first.id)).toBe(false);
    expect(new Set(related.map((item) => item.id)).size).toBe(3);
    expect(related[0].practiceIds).toEqual(article.practiceIds);
    expect(getRelatedInsights(article, 3, launch)).toEqual([]);
  });
});

describe("article structure and reading", () => {
  it("shortens a fallback excerpt at a word boundary", () => {
    expect(shortenText("Short text", 200)).toBe("Short text");
    expect(shortenText("One two three four", 9)).toBe("One two…");
    expect(shortenText("Unbreakablelongword", 5)).toBe("Unbre…");
  });

  it("generates unique stable anchors even for duplicate heading text", () => {
    const article = resolveInsight("transaction-document-review", preview)!;
    const contents = articleContents(article.body);
    const repeated = contents.filter(
      (item) => item.text === "A note on sources",
    );
    expect(repeated).toHaveLength(2);
    expect(repeated[0].id).not.toBe(repeated[1].id);
    expect(new Set(contents.map((item) => item.id)).size).toBe(contents.length);
    expect(
      articleContents(resolveInsight("property-records", preview)!.body),
    ).toEqual([]);
    expect(headingAnchor("stable-key")).toBe("section-stable-key");
  });
  it("counts visible custom blocks and provides safe reading-time defaults", () => {
    const blocks = demoInsightBodies[first.id].body;
    const text = articlePlainText(blocks);
    expect(text).toContain("WIPO");
    expect(text).toContain("A sample structure for a reading file");
    expect(estimateReadTime(blocks, 7)).toBe(7);
    expect(estimateReadTime([], 0)).toBe(1);
    expect(estimateReadTime([], -1)).toBe(1);
    expect(estimateReadTime(blocks, 1.5)).toBe(estimateReadTime(blocks));
  });
  it("keeps progress bounded by the article, independent of footer length", () => {
    expect(readingProgress(0, 600, 3000, 800)).toBe(0);
    expect(readingProgress(2200, 600, 3000, 800)).toBe(1);
    expect(readingProgress(9000, 600, 3000, 800)).toBe(1);
    expect(readingProgress(1000, 600, 3000, 800)).toBeGreaterThan(0);
    expect(Number.isFinite(readingProgress(0, 0, 100, 800))).toBe(true);
  });
  it("rejects unsupported blocks, marks and references rather than losing prose", () => {
    const content = demoInsightBodies[first.id];
    const unsupported = {
      _type: "unsupported",
      _key: "unsupported",
    } as unknown as InsightBlock;
    expect(
      insightIssues(
        first,
        { ...content, body: [...content.body, unsupported] },
        preview,
      ),
    ).toContain("unknown-block");
    const unsafe = {
      _type: "block" as const,
      _key: "unsafe",
      style: "normal",
      markDefs: [{ _type: "link", _key: "evil", href: "javascript:alert(1)" }],
      children: [
        { _type: "span" as const, _key: "span", text: "text", marks: ["evil"] },
      ],
    };
    expect(
      insightIssues(first, { ...content, body: [unsafe] }, preview),
    ).toContain("unsafe-link");
    expect(
      insightIssues(
        first,
        { ...content, body: [...content.body, content.body[0]] },
        preview,
      ),
    ).toContain("duplicate-key");
    expect(
      insightIssues(first, { ...content, references: [] }, preview),
    ).toContain("citation");
  });
});

describe("media, shares, metadata and routes", () => {
  it("validates URLs and preserves dimensions, focal point and source metadata", () => {
    for (const bad of [
      "javascript:alert(1)",
      "//example.com",
      "data:text/html,x",
      "https://user:secret@example.com",
      "https://exa mple.com",
    ])
      expect(safeArticleHref(bad)).toBeNull();
    expect(safeArticleHref("https://www.wipo.int/en/web/patents")).toContain(
      "wipo.int",
    );
    expect(safeArticleHref("#reference-wipo")).toBe("#reference-wipo");
    expect(validInsightImage(insightImages.papers)).toBe(insightImages.papers);
    expect(validInsightImage({ ...insightImages.papers, width: 0 })).toBeNull();
    expect(
      imagePosition({ ...insightImages.papers, focalPoint: { x: 1.5, y: -1 } }),
    ).toBe("100% 0%");
    expect(imagePosition(null)).toBe("50% 50%");
  });
  it("shares the actual preview origin without tracking or heading fragments", () => {
    expect(
      cleanArticleShareUrl(
        "http://localhost:3000",
        `${routes.insight(first.id)}?utm_source=x#section-start`,
      ),
    ).toBe(`http://localhost:3000${routes.insight(first.id)}`);
  });
  it("uses authored dates consistently and handles invalid dates explicitly", () => {
    expect(formatInsightDate("2026-09-15T09:00:00Z")).toBe("15 Sept 2026");
    expect(formatInsightDate("invalid")).toBe("");
  });
  it("uses self-canonical numbered pages and no-index filtered results", () => {
    expect(
      insightListingMetadata({ ...defaults, page: 2 }).alternates?.canonical,
    ).toBe(`${routes.insights}?page=2`);
    expect(insightListingMetadata({ ...defaults, q: "patent" }).robots).toEqual(
      { index: false, follow: true },
    );
  });
  it("uses identical article SEO fields, with a wide branded fallback for portrait media", () => {
    const article = resolveInsight("energy-projects", preview)!;
    const metadata = insightArticleMetadata(article);
    expect(metadata.alternates?.canonical).toBe(routes.insight(article.id));
    expect(metadata.description).toBe(article.excerpt);
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      `${routes.insight(article.id)}/share-card.png`,
    );
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(insightStructuredData(article)).toBeNull();
  });
  it("escapes script-sensitive structured data and emits only real author data", () => {
    expect(
      jsonLdString({ text: "</script><script>bad</script>" }),
    ).not.toContain("</script>");
    const article = resolveInsight(
      first.id,
      launch,
      changed({ demoOnly: false, authorIds: ["ab-mahmoud"] }),
    )!;
    const structured = insightStructuredData(article)!;
    expect(structured[0].author?.[0].name).toBe(article.authors[0].name);
    expect(structured[0].datePublished).toBe(article.publishedAt);
  });
  it("activates the article route family without a growing client slug inventory", () => {
    expect(isRouteAvailable(routes.insights)).toBe(true);
    expect(isRouteAvailable(routes.insight(first.id))).toBe(true);
    expect(isRouteAvailable("/insights-fake")).toBe(false);
    expect(isRouteAvailable("/insights/foo/bar")).toBe(false);
    expect(headerTone(routes.insights)).toBe("dark");
    expect(headerTone(routes.insight(first.id))).toBe("light");
  });
});
