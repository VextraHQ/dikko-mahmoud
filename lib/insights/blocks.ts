import type {
  CalloutBlock,
  ImageBlock,
  InsightImage,
  InsightTextBlock,
  TableBlock,
} from "@/types/insights";

/**
 * Small builders for Portable Text, the format Sanity stores rich text in.
 * Local articles are written with these so they have exactly the shape an
 * editor will later produce in the Studio: paragraphs, headings, lists,
 * quotes and inline marks (bold, italic, links, citations).
 *
 *   paragraph("intro", "Plain text, ", { strong: "bold" }, " and ",
 *     { link: "a link", href: "https://…" }, ".")
 */
export type Span =
  | string
  | { strong: string }
  | { em: string }
  | { link: string; href: string }
  | { cite: string; reference: string };

type BlockStyle = "normal" | "h2" | "h3" | "blockquote";
type ListOptions = { listItem: "bullet" | "number"; level: number };

function textBlock(
  key: string,
  style: BlockStyle,
  spans: Span[],
  list?: ListOptions,
): InsightTextBlock {
  const markDefs: InsightTextBlock["markDefs"] = [];
  const children = spans.map((span, index) => {
    const spanKey = `${key}-${index}`;
    if (typeof span === "string")
      return { _type: "span", _key: spanKey, text: span, marks: [] };
    if ("strong" in span)
      return {
        _type: "span",
        _key: spanKey,
        text: span.strong,
        marks: ["strong"],
      };
    if ("em" in span)
      return { _type: "span", _key: spanKey, text: span.em, marks: ["em"] };
    const markKey = `${spanKey}-mark`;
    if ("link" in span) {
      markDefs.push({ _key: markKey, _type: "link", href: span.href });
      return {
        _type: "span",
        _key: spanKey,
        text: span.link,
        marks: [markKey],
      };
    }
    markDefs.push({
      _key: markKey,
      _type: "citation",
      referenceId: span.reference,
    });
    return { _type: "span", _key: spanKey, text: span.cite, marks: [markKey] };
  });
  return {
    _type: "block",
    _key: key,
    style,
    markDefs,
    children,
    ...list,
  };
}

export function paragraph(key: string, ...spans: Span[]) {
  return textBlock(key, "normal", spans);
}

export function heading(key: string, text: string, level: "h2" | "h3" = "h2") {
  return textBlock(key, level, [text]);
}

export function quote(key: string, text: string) {
  return textBlock(key, "blockquote", [text]);
}

/** One block per item, as Portable Text stores lists. */
export function bulletList(key: string, items: (string | Span[])[]) {
  return items.map((item, index) =>
    textBlock(
      `${key}-${index}`,
      "normal",
      typeof item === "string" ? [item] : item,
      {
        listItem: "bullet",
        level: 1,
      },
    ),
  );
}

export function numberedList(key: string, items: (string | Span[])[]) {
  return items.map((item, index) =>
    textBlock(
      `${key}-${index}`,
      "normal",
      typeof item === "string" ? [item] : item,
      {
        listItem: "number",
        level: 1,
      },
    ),
  );
}

export function takeaways(
  key: string,
  title: string,
  items: string[],
): CalloutBlock {
  return { _type: "takeaways", _key: key, title, items };
}

export function table(
  key: string,
  caption: string,
  headers: string[],
  rows: string[][],
): TableBlock {
  return {
    _type: "comparisonTable",
    _key: key,
    caption,
    headers,
    rows: rows.map((cells, index) => ({ _key: `${key}-row-${index}`, cells })),
  };
}

export function figure(
  key: string,
  image: InsightImage,
  caption?: string,
): ImageBlock {
  return {
    _type: "articleImage",
    _key: key,
    image,
    ...(caption ? { caption } : {}),
  };
}
