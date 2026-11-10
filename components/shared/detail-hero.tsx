import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Split hero for detail pages (articles, practice areas). Text and photo share
 * one height: the eyebrow starts level with the photo's top edge and the
 * footer rule sits on its bottom edge. On desktop the photo runs to the page
 * edge; on phones it comes first, full width.
 */
export function DetailHero({
  headingId,
  eyebrow,
  title,
  lead,
  footer,
  media,
  credit,
}: {
  headingId: string;
  eyebrow: ReactNode;
  title: string;
  lead: ReactNode;
  footer: ReactNode;
  /** A `fill` image; the frame sets its size. */
  media: ReactNode;
  credit?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-6 pt-4 pb-10 sm:gap-8 sm:pt-8 sm:pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-12 lg:pb-20"
    >
      <div className="flex min-w-0 flex-col max-lg:order-2">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id={headingId}
          tabIndex={-1}
          className="mt-4 scroll-mt-32 font-serif text-[40px]/[1.06] text-balance sm:text-5xl/[1.05] xl:text-[64px]/[1.03]"
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg/8 text-slate-700 lg:text-xl/8">
          {lead}
        </p>
        <div className="mt-8 border-t border-slate-200 pt-5 lg:mt-auto">
          {footer}
        </div>
      </div>
      <figure className="relative isolate aspect-16/10 overflow-hidden max-lg:order-1 max-sm:-mx-4 sm:rounded-xl lg:-mr-8 lg:aspect-auto lg:min-h-120 lg:rounded-r-none xl:-mr-20 min-[92rem]:rounded-r-xl">
        {media}
        {credit && (
          <figcaption className="absolute right-3 bottom-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px]/4 text-white backdrop-blur-sm">
            Photo: {credit}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
