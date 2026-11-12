import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { ArticleImage } from "@/components/insights/article-image";
import { SiteLink } from "@/components/layout/site-link";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { headingAnchor, safeArticleHref } from "@/lib/insights/article";
import type {
  ImageBlock,
  InsightBlock,
  TableBlock,
  CalloutBlock,
} from "@/types/insights";

function SafeArticleLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const safe = safeArticleHref(href);
  if (!safe) return <>{children}</>;
  const className =
    "text-primary wrap-break-word underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
  return safe.startsWith("/") || safe.startsWith("#") ? (
    <SiteLink href={safe} className={className}>
      {children}
    </SiteLink>
  ) : (
    <a href={safe} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Headings keep their own ids for the contents panel; everything else is
// styled by the prose wrapper below, so editors' Portable Text needs no classes.
const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={headingAnchor(value._key ?? "heading")} tabIndex={-1}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={headingAnchor(value._key ?? "heading")} tabIndex={-1}>
        {children}
      </h3>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <SafeArticleLink href={String(value?.href ?? "")}>
        {children}
      </SafeArticleLink>
    ),
    citation: ({ value, children }) => (
      <a
        href={`#reference-${String(value?.referenceId ?? "")}`}
        className="text-primary rounded-sm text-sm underline underline-offset-4"
      >
        {/* Reads as "Reference [1]"; the record key is never announced. */}
        <span className="sr-only">Reference</span>
        {children}
      </a>
    ),
  },
  types: {
    takeaways: ({ value }: { value: CalloutBlock }) => (
      <aside className="not-prose border-primary/15 my-10 rounded-2xl border bg-sky-50/60 p-6 sm:p-8">
        <p className={eyebrowClass}>{value.title}</p>
        <ul className="mt-5 space-y-3 text-base/7">
          {value.items.map((item) => (
            <li key={item} className="text-foreground flex gap-3">
              <Check
                aria-hidden="true"
                className="text-primary mt-1.5 size-4 shrink-0"
                strokeWidth={1.5}
              />
              {item}
            </li>
          ))}
        </ul>
      </aside>
    ),
    comparisonTable: ({ value }: { value: TableBlock }) => (
      <figure className="not-prose my-10">
        <figcaption
          id={`${value._key}-caption`}
          className="text-primary mb-3 text-sm/6 font-semibold"
        >
          {value.caption}
        </figcaption>
        <div
          role="region"
          aria-labelledby={`${value._key}-caption`}
          tabIndex={0}
          className="border-border overflow-x-auto rounded-lg border"
        >
          <table className="w-full min-w-140 border-collapse text-left text-sm/6">
            <thead className="bg-slate-50">
              <tr>
                {value.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="border-border border-b px-4 py-3 font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, index) => (
                    <td
                      key={`${row._key}-${value.headers[index]}`}
                      className="border-border border-b px-4 py-3 align-top last:border-b-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    ),
    articleImage: ({ value }: { value: ImageBlock }) => (
      <figure className="not-prose my-10">
        <div
          className="relative isolate overflow-hidden rounded-xl"
          style={{
            // Tall photos are cropped to landscape so one image never
            // fills the whole screen mid-article.
            aspectRatio: Math.max(
              value.image.width / value.image.height,
              3 / 2,
            ),
          }}
        >
          <ArticleImage
            image={value.image}
            title={value.caption ?? value.image.alt}
            sizes="(min-width: 1440px) 800px, (min-width: 1024px) 60vw, 92vw"
          />
        </div>
        {value.caption && (
          <figcaption className="text-muted-foreground mt-2 text-xs/6">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};
/** Typography for editor-written rich text, tuned to the site's serif and navy. */
const proseClass = [
  "prose prose-slate max-w-none sm:prose-lg",
  "prose-p:text-slate-600 prose-li:text-slate-600 prose-li:marker:text-primary",
  "prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground prose-headings:scroll-mt-32",
  "prose-h2:text-2xl/[1.3] sm:prose-h2:text-3xl/[1.25] prose-h3:text-xl/7 sm:prose-h3:text-2xl/8",
  // Phones get a tighter rhythm; desktop keeps the roomier prose defaults.
  "max-sm:prose-h2:mt-10 max-sm:prose-h2:mb-3 max-sm:prose-h3:mt-8 max-sm:prose-h3:mb-2 max-sm:prose-p:my-4 max-sm:prose-li:my-1 max-sm:prose-ul:my-4 max-sm:prose-ol:my-4",
  "prose-strong:text-foreground prose-a:no-underline",
  "prose-blockquote:border-primary prose-blockquote:font-serif prose-blockquote:text-2xl/[1.35] sm:prose-blockquote:text-3xl/[1.3] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-primary",
].join(" ");

export function ArticleBody({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div className={proseClass}>
      <PortableText value={blocks} components={components} />
    </div>
  );
}
