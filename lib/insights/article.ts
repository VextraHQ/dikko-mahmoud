import type {
  ArticleContentsItem,
  InsightBlock,
  InsightImage,
} from "@/types/insights";

export function safeArticleHref(value: unknown): string | null {
  if (
    typeof value !== "string" ||
    !value.trim() ||
    /[\u0000-\u0020]/.test(value)
  )
    return null;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\"))
    return value;
  if (/^#[\w-]+$/.test(value)) return value;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function articleBlockText(block: InsightBlock): string {
  if (block._type === "block")
    return ((block.children ?? []) as { text?: string }[])
      .map((span) => span.text ?? "")
      .join("");
  if (block._type === "takeaways")
    return [block.title, ...block.items].join(" ");
  if (block._type === "comparisonTable")
    return [
      block.caption,
      ...block.headers,
      ...block.rows.flatMap((row) => row.cells),
    ].join(" ");
  if (block._type === "articleImage") return block.caption ?? "";
  return "";
}

export function articlePlainText(blocks: readonly InsightBlock[]) {
  return blocks.map(articleBlockText).join(" ").replace(/\s+/g, " ").trim();
}

/** Cut at a word boundary with an ellipsis, so a fallback excerpt never ends mid-word. */
export function shortenText(text: string, max: number) {
  if (text.length <= max) return text;
  const lastSpace = text.lastIndexOf(" ", max);
  const cut = lastSpace > 0 ? text.slice(0, lastSpace) : text.slice(0, max);
  return `${cut.replace(/[\s,;:.]+$/, "")}…`;
}

export function estimateReadTime(
  blocks: readonly InsightBlock[],
  override?: number,
) {
  if (Number.isInteger(override) && Number(override) > 0)
    return Number(override);
  return Math.max(
    1,
    Math.ceil(
      articlePlainText(blocks).split(/\s+/).filter(Boolean).length / 200,
    ),
  );
}

export function headingAnchor(key: string): string {
  return `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export function articleContents(
  blocks: readonly InsightBlock[],
): ArticleContentsItem[] {
  return blocks.flatMap((block) =>
    block._type === "block" && ["h2", "h3"].includes(String(block.style))
      ? [
          {
            id: headingAnchor(block._key),
            text: articleBlockText(block),
            level: block.style === "h3" ? 3 : 2,
          },
        ]
      : [],
  );
}

export function readingProgress(
  scroll: number,
  start: number,
  end: number,
  viewport: number,
  header = 112,
): number {
  const distance = end - start - Math.max(0, viewport - header);
  if (distance <= 0) return scroll + viewport >= end ? 1 : 0;
  return Math.max(0, Math.min(1, (scroll - start + header) / distance));
}

export function validInsightImage(
  image: InsightImage | null | undefined,
): InsightImage | null {
  return image &&
    safeArticleHref(image.src) &&
    typeof image.alt === "string" &&
    image.alt.trim() &&
    image.width > 0 &&
    image.height > 0
    ? image
    : null;
}

export function imagePosition(image: InsightImage | null | undefined): string {
  const point = image?.focalPoint ?? image?.hotspot ?? { x: 0.5, y: 0.5 };
  const clamp = (n: number) =>
    Number.isFinite(n) ? Math.max(0, Math.min(1, n)) * 100 : 50;
  return `${clamp(point.x)}% ${clamp(point.y)}%`;
}

export function formatInsightDate(value: string): string {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date)
    : "";
}

export function cleanArticleShareUrl(origin: string, path: string): string {
  const url = new URL(path, origin);
  url.search = "";
  url.hash = "";
  return url.href;
}
