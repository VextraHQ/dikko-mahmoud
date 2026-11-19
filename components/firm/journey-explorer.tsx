"use client";

import { pictureZoomClass } from "@/components/ui/picture-zoom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionChevron,
  AccordionChevronIcon,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { type FirmMilestone, journeyIntro } from "@/content/firm";
import { useSelection } from "@/hooks/use-selection";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mediaQueries } from "@/lib/media-queries";
import { formatCount, formatIndex } from "@/lib/format";

export type JourneyItem = FirmMilestone & {
  description: string;
  caption: { title: string; description: string };
};

function JourneyMedia({ item }: { item: JourneyItem }) {
  return (
    <figure>
      <div className="group/picture bg-secondary relative isolate h-60 overflow-hidden sm:h-80 lg:h-112">
        <div className={cn("absolute inset-0", pictureZoomClass)}>
          <ImageWithFallback
            src={item.media?.src}
            alt={item.media?.alt ?? ""}
            fill
            sizes="(min-width: 1440px) 630px, (min-width: 1024px) 47vw, (min-width: 640px) calc(100vw - 96px), calc(100vw - 32px)"
            className="object-cover"
            fallback={<EditorialCover mark={item.year} />}
          />
        </div>
      </div>
      <figcaption className="bg-secondary px-4 py-4 text-white">
        <p className="type-row font-serif">{item.caption.title}</p>
        <p className="mt-1 text-xs/5 text-white/75">
          {item.caption.description}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * The round button at the end of each year. Phones and tablets show the
 * shared chevron, which turns over when the year opens (it can close again).
 * From desktop up a year stays selected while its picture shows, so the
 * button is an arrow pointing at that picture instead.
 */
const milestoneIndicator = (
  <AccordionChevron>
    <AccordionChevronIcon className="lg:hidden" />
    <ArrowRight
      strokeWidth={1.75}
      className="ease-editorial hidden size-4 transition-transform duration-200 group-data-[state=closed]/accordion:group-hover/accordion:translate-x-0.5 motion-reduce:transition-none lg:block"
    />
  </AccordionChevron>
);

/**
 * A change of year is one 350ms beat: the cards resize and the text fades in
 * from a slight blur (the shared accordion timing), the text fades in place and the new picture fades in over the
 * previous one, which stays underneath until covered. Nothing slides, and
 * nothing animates until the visitor first picks a year.
 */
export function JourneyExplorer({ items }: { items: readonly JourneyItem[] }) {
  const selection = useSelection(items[0]?.id ?? "");
  const desktop = useMediaQuery(mediaQueries.desktop);
  const value = selection.id || (desktop ? items[0]?.id : "");
  const current = items.findIndex((item) => item.id === value);
  if (!items.length) return null;
  const shown = items[current] ?? items[0];
  const previous = items.find(
    (item) => item.id === selection.previousId && item.id !== shown.id,
  );
  const fadeIn = selection.changed && "motion-safe:animate-card-fade";
  return (
    <>
      <div data-journey-enhanced className="relative lg:min-h-152">
        <Accordion
          type="single"
          collapsible={!desktop}
          value={value}
          onValueChange={selection.select}
          className="space-y-3 lg:w-[44%]"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} variant="card">
              <AccordionTrigger
                className="gap-4 rounded-2xl px-5 py-4 focus-visible:-outline-offset-2 sm:gap-6 sm:px-6 sm:py-5"
                indicator={milestoneIndicator}
              >
                <span className="text-primary w-16 shrink-0 font-serif text-2xl/9 transition-colors duration-350 ease-in-out group-data-[state=open]/accordion:text-white sm:w-20 sm:text-3xl/10">
                  {item.year}
                </span>
                <span className="text-navy-deep type-card flex-1 font-serif transition-colors duration-350 ease-in-out group-data-[state=open]/accordion:text-white">
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-5 pb-6 sm:px-6">
                  <p className="text-sm/6 text-white/85 sm:text-base/7">
                    {item.description}
                  </p>
                  <div className="mt-5 overflow-hidden rounded-xl lg:hidden">
                    <JourneyMedia item={item} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div
          data-journey-desktop-media
          className="hidden lg:absolute lg:top-0 lg:right-0 lg:grid lg:w-[49%] lg:overflow-hidden"
        >
          {/* The previous picture stays underneath while the new one fades in
              on top, so the frame never dips to its background colour. */}
          {previous && (
            <div
              key={previous.id}
              aria-hidden="true"
              inert
              className="col-start-1 row-start-1 min-w-0"
            >
              <JourneyMedia item={previous} />
            </div>
          )}
          <div
            key={shown.id}
            data-journey-panel={shown.id}
            className={cn("col-start-1 row-start-1 min-w-0", fadeIn)}
          >
            <JourneyMedia item={shown} />
          </div>
        </div>
        <div className="hidden lg:absolute lg:right-0 lg:bottom-0 lg:flex lg:w-[49%] lg:items-center lg:justify-between lg:gap-4">
          <p className="text-primary text-xs/5">
            <span aria-live="polite" aria-atomic="true">
              {formatIndex(current)} / {formatCount(items.length)}
            </span>{" "}
            · {journeyIntro.pagingHint}
          </p>
          <div className="flex gap-3">
            <Button
              variant="inverse"
              className="border-primary/25 text-primary hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary ease-editorial duration-200 hover:text-white focus-visible:text-white"
              size="icon"
              aria-label="Previous milestone"
              disabled={current <= 0}
              onClick={() => selection.select(items[current - 1].id)}
            >
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.5}
                className="motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/button:-translate-x-0.5 motion-safe:group-focus-visible/button:-translate-x-0.5"
              />
            </Button>
            <Button
              variant="inverse"
              className="border-primary/25 text-primary hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary ease-editorial duration-200 hover:text-white focus-visible:text-white"
              size="icon"
              aria-label="Next milestone"
              disabled={current >= items.length - 1}
              onClick={() => selection.select(items[current + 1].id)}
            >
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/button:translate-x-0.5 motion-safe:group-focus-visible/button:translate-x-0.5"
              />
            </Button>
          </div>
        </div>
      </div>
      <noscript>
        <style>{`[data-journey-enhanced] { display: none; }`}</style>
        {items.map((item, index) => (
          <details
            key={item.id}
            name="firm-journey"
            open={index === 0}
            className="border-border border-b py-5"
          >
            <summary className="type-card cursor-pointer font-serif">
              {item.year} · {item.title}
            </summary>
            <p className="my-5 max-w-3xl text-sm/6 sm:text-base/7">
              {item.description}
            </p>
            <div className="max-w-2xl">
              <JourneyMedia item={item} />
            </div>
          </details>
        ))}
      </noscript>
    </>
  );
}
