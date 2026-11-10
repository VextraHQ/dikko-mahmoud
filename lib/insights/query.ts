import { practiceIndex } from "@/content/practice-index";
import { insightTypes, type InsightQuery } from "@/types/insights";

export const insightPageSize = 9;

export type RawInsightQuery = Record<string, string | string[] | undefined>;

export function normalizeInsightQuery(raw: RawInsightQuery): InsightQuery {
  const first = (key: string) =>
    (Array.isArray(raw[key]) ? raw[key][0] : raw[key]) ?? "";
  const page = first("page");
  return {
    q: first("q").trim().replace(/\s+/g, " ").slice(0, 120),
    type: insightTypes.some((item) => item.value === first("type"))
      ? first("type")
      : "",
    practice: practiceIndex.some((item) => item.slug === first("practice"))
      ? first("practice")
      : "",
    sort: first("sort") === "oldest" ? "oldest" : "newest",
    page:
      /^\d+$/.test(page) &&
      Number.isSafeInteger(Number(page)) &&
      Number(page) > 0
        ? Number(page)
        : 1,
  };
}

export function insightQueryString(query: InsightQuery) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.type) params.set("type", query.type);
  if (query.practice) params.set("practice", query.practice);
  if (query.sort !== "newest") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params.size ? `?${params.toString()}` : "";
}

export function hasInsightFilters(query: InsightQuery) {
  return !!(query.q || query.type || query.practice);
}

export function defaultInsightView(query: InsightQuery) {
  return (
    !hasInsightFilters(query) && query.sort === "newest" && query.page === 1
  );
}

export function insightPageNumbers(
  current: number,
  total: number,
): (number | "gap-before" | "gap-after")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  return [
    1,
    ...(current > 3 ? ["gap-before" as const] : []),
    ...Array.from(
      {
        length: Math.min(total - 1, current + 1) - Math.max(2, current - 1) + 1,
      },
      (_, i) => Math.max(2, current - 1) + i,
    ),
    ...(current < total - 2 ? ["gap-after" as const] : []),
    total,
  ];
}
