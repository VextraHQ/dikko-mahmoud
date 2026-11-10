// SERVER ONLY: local data adapter. Pages/tests/server components only; no client
// component imports this module. A Sanity adapter later keeps this DTO boundary.
import { cache } from "react";
import {
  demoInsightAuthors,
  demoInsightIndex,
  insightSelection,
} from "@/content/insight-articles";
import { demoInsightBodies } from "@/content/insight-bodies";
import { people } from "@/content/people";
import { practiceIndex } from "@/content/practice-index";
import { previewOptions } from "@/lib/preview";
import {
  articlePlainText,
  estimateReadTime,
  safeArticleHref,
  shortenText,
  validInsightImage,
} from "@/lib/insights/article";
import { matchesSearch } from "@/lib/search";
import { defaultInsightView, insightPageSize } from "@/lib/insights/query";
import {
  insightTypes,
  type InsightArticle,
  type InsightAuthor,
  type InsightBlock,
  type InsightCard,
  type InsightPage,
  type InsightQuery,
  type InsightReference,
  type InsightSource,
} from "@/types/insights";

type Bodies = Record<
  string,
  { body: InsightBlock[]; references: InsightReference[] }
>;

export type InsightData = { index: readonly InsightSource[]; bodies: Bodies };

const localData: InsightData = {
  index: demoInsightIndex,
  bodies: demoInsightBodies,
};
type Options = { allowPreview: boolean; now?: number };

function authorsFor(source: InsightSource): InsightAuthor[] {
  return source.authorIds.flatMap((id) => {
    const person = people.find((entry) => entry.id === id);
    const demo =
      source.demoOnly && demoInsightAuthors.find((entry) => entry.id === id);
    return person
      ? [{ id, name: person.name, role: person.role, profileSlug: person.slug }]
      : demo
        ? [{ ...demo }]
        : [];
  });
}

export function insightIssues(
  source: InsightSource,
  content: Bodies[string] | undefined,
  options: Options,
): string[] {
  const issues: string[] = [];
  if (source.demoOnly && !options.allowPreview) issues.push("demo-disabled");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.id) || !source.title.trim())
    issues.push("identity");
  const published = Date.parse(source.publishedAt);
  if (!Number.isFinite(published) || published > (options.now ?? Date.now()))
    issues.push("date");
  if (
    source.revisedAt &&
    (!Number.isFinite(Date.parse(source.revisedAt)) ||
      Date.parse(source.revisedAt) < published ||
      Date.parse(source.revisedAt) > (options.now ?? Date.now()))
  )
    issues.push("revision");
  if (!insightTypes.some((type) => type.value === source.type))
    issues.push("type");
  if (
    !source.authorIds.length ||
    authorsFor(source).length !== source.authorIds.length
  )
    issues.push("author");
  // Practices are optional: firm news can stand alone.
  if (
    source.practiceIds.some(
      (id) => !practiceIndex.some((practice) => practice.slug === id),
    )
  )
    issues.push("practice");
  if (!content?.body.length || !articlePlainText(content.body).trim())
    issues.push("body");
  if (content) {
    const keys = content.body.map((block) => block._key);
    if (
      keys.some((key) => !key || !/^[a-zA-Z0-9_-]+$/.test(key)) ||
      new Set(keys).size !== keys.length
    )
      issues.push("duplicate-key");
    const refs = new Set(content.references.map((ref) => ref.id));
    for (const block of content.body) {
      if (
        !["block", "takeaways", "comparisonTable", "articleImage"].includes(
          block._type,
        )
      )
        issues.push("unknown-block");
      if (block._type === "block") {
        if (
          !["normal", "h2", "h3", "blockquote"].includes(
            String(block.style ?? "normal"),
          )
        )
          issues.push("unknown-style");
        for (const mark of block.markDefs ?? []) {
          if (mark._type === "link" && !safeArticleHref(mark.href))
            issues.push("unsafe-link");
          if (mark._type === "citation" && !refs.has(String(mark.referenceId)))
            issues.push("citation");
          if (!["link", "citation"].includes(mark._type))
            issues.push("unknown-mark");
        }
        const allowedMarks = new Set([
          "strong",
          "em",
          "code",
          ...(block.markDefs ?? []).map((mark) => mark._key),
        ]);
        if (
          !Array.isArray(block.children) ||
          block.children.some(
            (span) =>
              span._type !== "span" ||
              (span.marks as string[] | undefined)?.some(
                (mark) => !allowedMarks.has(mark),
              ),
          )
        )
          issues.push("unsupported-span");
      }
    }
    if (content.references.some((ref) => !safeArticleHref(ref.href)))
      issues.push("unsafe-reference");
  }
  return [...new Set(issues)];
}

/** The first practice names the card; news without one falls back to its type. */
function insightCategory(source: InsightSource) {
  const practice = practiceIndex.find(
    (entry) => entry.slug === source.practiceIds[0],
  );
  const type = insightTypes.find((entry) => entry.value === source.type);
  return practice?.title ?? type?.label ?? "";
}

function toCard(source: InsightSource, data: InsightData): InsightCard {
  return {
    id: source.id,
    title: source.title,
    excerpt:
      source.excerpt.trim() ||
      shortenText(articlePlainText(data.bodies[source.id].body), 200),
    type: source.type,
    practiceIds: source.practiceIds,
    publishedAt: source.publishedAt,
    revisedAt: source.revisedAt,
    image: validInsightImage(source.image),
    heroImage: validInsightImage(source.heroImage),
    demoOnly: source.demoOnly,
    authors: authorsFor(source),
    category: insightCategory(source),
    readTimeMinutes: estimateReadTime(
      data.bodies[source.id].body,
      source.readTimeOverride,
    ),
  };
}

export function eligibleInsightSources(
  options: Options = previewOptions,
  data = localData,
) {
  return data.index.filter(
    (source) =>
      insightIssues(source, data.bodies[source.id], options).length === 0,
  );
}

export function insightDiagnostics(
  options: Options = previewOptions,
  data = localData,
) {
  return data.index.flatMap((source) => {
    const issues = insightIssues(
      source,
      data.bodies[source.id],
      options,
    ).filter((issue) => issue !== "demo-disabled");
    return issues.length ? [{ id: source.id, issues }] : [];
  });
}

const reportedDiagnostics = new Set<string>();

function reportLocalDiagnostics() {
  for (const diagnostic of insightDiagnostics()) {
    const key = JSON.stringify(diagnostic);
    if (!reportedDiagnostics.has(key)) {
      reportedDiagnostics.add(key);
      console.warn("Excluded invalid Insight record", diagnostic);
    }
  }
}

export function resolveInsight(
  id: string,
  options: Options = previewOptions,
  data = localData,
): InsightArticle | null {
  const source = data.index.find((entry) => entry.id === id);
  if (!source || insightIssues(source, data.bodies[id], options).length)
    return null;
  const references = data.bodies[id].references.filter(
    (ref, index, refs) =>
      refs.findIndex((item) => item.id === ref.id || item.href === ref.href) ===
      index,
  );
  return {
    ...toCard(source, data),
    body: data.bodies[id].body,
    references,
    practices: practiceIndex.filter((practice) =>
      source.practiceIds.includes(practice.slug),
    ),
    seo: source.seo,
  };
}

export function selectInsightPage(
  query: InsightQuery,
  options: Options = previewOptions,
  data = localData,
): InsightPage {
  const eligible = eligibleInsightSources(options, data);
  const ordered = [...eligible].sort(
    (a, b) =>
      Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
      a.id.localeCompare(b.id),
  );
  const featured =
    ordered.find((source) => source.id === insightSelection.featuredId) ??
    ordered[0];

  // Archive membership stays stable when the editor changes the feature.
  // The hero highlights it only on the default first page.
  const matched = ordered.filter(
    (source) =>
      (!query.type || source.type === query.type) &&
      (!query.practice || source.practiceIds.includes(query.practice)) &&
      matchesSearch(
        [
          source.title,
          source.excerpt,
          ...source.keywords,
          articlePlainText(data.bodies[source.id].body),
        ].join(" "),
        query.q,
      ),
  );
  if (query.sort === "oldest") matched.reverse();
  const totalPages = Math.ceil(matched.length / insightPageSize);
  const page = Math.min(query.page, Math.max(1, totalPages));
  return {
    items: matched
      .slice((page - 1) * insightPageSize, page * insightPageSize)
      .map((source) => toCard(source, data)),
    total: matched.length,
    catalogueTotal: eligible.length,
    page,
    pageSize: insightPageSize,
    totalPages,
    query: { ...query, page },
    facets: {
      practices: practiceIndex
        .filter((practice) =>
          eligible.some((source) => source.practiceIds.includes(practice.slug)),
        )
        .map((practice) => ({ value: practice.slug, label: practice.title })),
      types: insightTypes
        .filter((type) => eligible.some((source) => source.type === type.value))
        .map((type) => ({ ...type })),
    },
    featured:
      featured && defaultInsightView(query) ? toCard(featured, data) : null,
  };
}

/** Bounded read-model interface. Future CMS adapter returns only this page. */
export async function getInsightPage(query: InsightQuery) {
  reportLocalDiagnostics();
  return selectInsightPage(query);
}

/**
 * One article per request. `cache` lets generateMetadata and the page share a
 * single read, so the future CMS adapter makes one query, not two.
 */
export const getInsight = cache(async (id: string) => {
  reportLocalDiagnostics();
  return resolveInsight(id);
});

export function getInsightSlugs(options: Options = previewOptions) {
  return eligibleInsightSources(options).map((source) => source.id);
}

export function getInsightSitemapEntries() {
  return eligibleInsightSources().map((source) => ({
    id: source.id,
    modified: source.revisedAt ?? source.publishedAt,
  }));
}

export function getRelatedInsights(
  article: InsightArticle,
  limit = 3,
  options: Options = previewOptions,
  data = localData,
) {
  const source = data.index.find((entry) => entry.id === article.id);
  const explicit = source?.relatedIds ?? [];
  return eligibleInsightSources(options, data)
    .filter((candidate) => candidate.id !== article.id)
    .sort((a, b) => {
      const rank = (candidate: InsightSource) =>
        explicit.includes(candidate.id)
          ? explicit.indexOf(candidate.id) - explicit.length - 2
          : candidate.practiceIds.some((id) => article.practiceIds.includes(id))
            ? -1
            : 0;
      return (
        rank(a) - rank(b) ||
        Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
        a.id.localeCompare(b.id)
      );
    })
    .slice(0, limit)
    .map((candidate) => toCard(candidate, data));
}

export function getHomeInsights(options: Options = previewOptions) {
  const available = eligibleInsightSources(options);
  const selected = insightSelection.homeIds.flatMap((id) => {
    const item = available.find((source) => source.id === id);
    return item ? [toCard(item, localData)] : [];
  });
  const [feature, ...supporting] = selected;
  return feature ? { feature, supporting: supporting.slice(0, 3) } : null;
}

/** Newest articles tagged with one practice, for its practice page. */
export function getPracticeInsights(
  practiceSlug: string,
  limit = 3,
  options: Options = previewOptions,
) {
  return eligibleInsightSources(options)
    .filter((source) => source.practiceIds.includes(practiceSlug))
    .sort(
      (a, b) =>
        Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
        a.id.localeCompare(b.id),
    )
    .slice(0, limit)
    .map((source) => toCard(source, localData));
}
