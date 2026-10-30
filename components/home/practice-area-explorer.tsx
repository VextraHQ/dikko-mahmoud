"use client";

import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { useState, type ReactNode } from "react";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  practiceAreasIntro as intro,
  type PracticeArea,
} from "@/content/practice-areas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mediaQueries } from "@/lib/media-queries";
import { cn } from "@/lib/utils";
import { formatCount, formatIndex } from "@/lib/format";

export function PracticeAreaExplorer({
  areas,
  children,
}: {
  areas: PracticeArea[];
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const isDesktop = useMediaQuery(mediaQueries.desktop);
  const expanded = selected ?? (isDesktop ? 0 : null);

  return (
    <div className="practice-explorer relative isolate">
      <div className="lg:w-[46%]">{children}</div>
      <ol className="mt-10 border-t border-white/20 lg:mt-12 lg:w-[46%]">
        {areas.map((area, index) => {
          const active = expanded === index;
          const number = formatIndex(index);
          const triggerId = `practice-trigger-${area.id}`;
          const panelId = `practice-panel-${area.id}`;

          return (
            <li key={area.id} className="border-b border-white/20">
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={active}
                  aria-controls={panelId}
                  aria-disabled={isDesktop && active ? true : undefined}
                  data-active={active}
                  onClick={() => {
                    if (isDesktop && active) return;
                    setSelected(active ? null : index);
                  }}
                  className={cn(
                    "relative grid min-h-18 w-full grid-cols-[1.5rem_1fr_2rem] items-center gap-3 py-5 text-left text-white/70 hover:text-white sm:gap-4",
                    "transition-[color,transform] duration-[200ms,160ms] ease-[ease] motion-reduce:transition-none",
                    "before:ease-editorial before:absolute before:inset-y-5 before:-left-3 before:w-0.5 before:scale-y-0 before:bg-white before:transition-transform before:duration-300 motion-reduce:before:transition-none",
                    active && "text-white before:scale-y-100",
                    !(isDesktop && active) &&
                      "motion-safe:active:scale-[0.985]",
                  )}
                >
                  <span className="text-[11px]/4 tabular-nums">{number}</span>
                  <span className="font-serif text-xl/6 sm:text-2xl/7">
                    {area.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className={cn(
                      "size-8 rounded-full border border-white/25 p-1.5",
                      "transition-[transform,color,background-color,border-color] duration-[350ms,200ms,200ms,200ms] ease-[cubic-bezier(0.22,1,0.36,1),ease,ease,ease] motion-reduce:transition-none",
                      active &&
                        "text-primary rotate-135 border-white bg-white lg:rotate-45",
                    )}
                  />
                </button>
              </h3>
              <section
                id={panelId}
                aria-labelledby={triggerId}
                aria-hidden={!active}
                inert={!active}
                data-active={active}
                className={cn(
                  "group/practice-panel invisible grid grid-rows-[0fr] opacity-0",
                  "transition-[grid-template-rows,opacity,visibility] duration-[400ms,300ms,400ms] ease-[cubic-bezier(0.22,1,0.36,1),ease,ease]",
                  "lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] lg:grid-rows-[1fr] lg:transition-[opacity,visibility] lg:duration-450 lg:ease-[ease]",
                  "motion-reduce:transition-none lg:motion-reduce:transition-none",
                  active && "visible grid-rows-[1fr] opacity-100 lg:z-1",
                )}
              >
                <div className="min-h-0 overflow-hidden lg:h-full lg:rounded-2xl">
                  <figure className="bg-secondary relative isolate mb-5 flex min-h-72 flex-col justify-end overflow-hidden rounded-xl border border-white/20 bg-linear-135 from-white/7 to-transparent to-65% p-5 sm:min-h-88 sm:p-7 lg:mb-0 lg:h-full lg:rounded-2xl lg:p-8">
                    <ImageWithFallback
                      src={area.image?.src}
                      alt={area.image?.alt ?? ""}
                      fill
                      sizes="(min-width: 1440px) 615px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
                      className="object-cover"
                      fallback={
                        <EditorialCover mark={number} label={intro.eyebrow} />
                      }
                    />
                    <div
                      aria-hidden="true"
                      className="from-navy-deep/95 via-navy-deep/20 absolute inset-0 z-0 bg-linear-to-t to-transparent"
                    />
                    <figcaption className="motion-safe:group-data-[active=true]/practice-panel:animate-practice-caption relative">
                      <p className="text-[11px]/4 text-white/70 tabular-nums">
                        {number} / {formatCount(areas.length)}
                      </p>
                      <p className="mt-3 max-w-md font-serif text-3xl/8 sm:text-4xl/10 xl:text-5xl/12">
                        {area.title}
                      </p>
                      {area.summary && (
                        <p className="motion-safe:group-data-[active=true]/practice-panel:animate-practice-summary mt-4 max-w-md text-sm/6 text-white/80 sm:text-base/7">
                          {area.summary}
                        </p>
                      )}
                      <PreviewDestination>
                        <ArrowButton
                          variant="glass"
                          size="sm"
                          className="mt-5"
                          aria-label={`${intro.detailAction}: ${area.title}`}
                        >
                          {intro.detailAction}
                        </ArrowButton>
                      </PreviewDestination>
                    </figcaption>
                  </figure>
                </div>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
