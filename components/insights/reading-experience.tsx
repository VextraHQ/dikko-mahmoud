"use client";
import type { ReactNode } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion, useTransform } from "motion/react";
import { useSonner } from "sonner";
import { SiteLink } from "@/components/layout/site-link";
import { ContentsList } from "@/components/shared/contents-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { insightsCopy as copy } from "@/content/insight-copy";
import { useArticleReading } from "@/hooks/use-article-reading";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { ArticleContentsItem } from "@/types/insights";

export function ReadingExperience({
  children,
  contents,
  practices,
}: {
  children: ReactNode;
  contents: ArticleContentsItem[];
  practices: { slug: string; title: string }[];
}) {
  const { bodyRef, progress, visible, active, select, returnToTop } =
    useArticleReading(contents.map((item) => item.id));
  const ringOffset = useTransform(progress, (value) => 138.23 * (1 - value));
  const { toasts } = useSonner();
  const contentsList = (
    <ContentsList
      items={contents}
      active={active}
      onNavigate={select}
      className="mt-4"
    />
  );
  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-14">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto print:hidden">
          <div className="border-border rounded-xl border bg-slate-50 p-5 lg:p-6">
            {contents.length > 0 && (
              <>
                <nav aria-label={copy.contents} className="hidden lg:block">
                  <Eyebrow>{copy.contents}</Eyebrow>
                  {contentsList}
                </nav>
                <details className="group lg:hidden">
                  <summary className="text-primary min-h-11 cursor-pointer rounded-sm py-2 text-sm/6 font-semibold">
                    {copy.contents}
                  </summary>
                  <nav aria-label={copy.contents}>{contentsList}</nav>
                </details>
              </>
            )}
            {practices.length > 0 && (
              <nav
                aria-label={copy.expertise}
                className={cn(
                  contents.length > 0 && "border-border mt-5 border-t pt-5",
                )}
              >
                <Eyebrow>{copy.expertise}</Eyebrow>
                <ul className="mt-3 space-y-2">
                  {practices.map((practice) => (
                    <li key={practice.slug}>
                      <SiteLink
                        href={routes.practiceArea(practice.slug)}
                        className="text-primary inline-flex min-h-11 items-center gap-3 rounded-sm py-2 text-sm/6 underline-offset-4 hover:underline"
                      >
                        {practice.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0"
                          strokeWidth={1.5}
                        />
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>
        <article
          ref={bodyRef}
          id="article-reading-region"
          className="max-w-[75ch] min-w-0 text-base/8"
        >
          {children}
        </article>
      </div>
      {visible && toasts.length === 0 && (
        <button
          type="button"
          onClick={returnToTop}
          aria-label={copy.articleTop}
          title={copy.articleTop}
          className="text-primary border-border fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-12 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-sky-50 sm:right-6 sm:bottom-6 print:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-200"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="138.23"
              style={{ strokeDashoffset: ringOffset }}
            />
          </svg>
          <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      )}
      <noscript>
        <a
          href="#article-heading"
          className="text-primary mt-6 inline-flex min-h-11 items-center rounded-sm underline underline-offset-4"
        >
          {copy.articleTop}
        </a>
      </noscript>
    </>
  );
}
