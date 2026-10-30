"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useIsPresent,
} from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { type FirmMilestone, journeyIntro } from "@/content/firm";
import { useDirectionalSelection } from "@/hooks/use-directional-selection";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mediaQueries } from "@/lib/media-queries";
import { formatCount, formatIndex } from "@/lib/format";

export type JourneyItem = FirmMilestone & {
  description: string;
  caption: { title: string; description: string };
};
const ease = [0.22, 1, 0.36, 1] as const;
function JourneyMedia({ item }: { item: JourneyItem }) {
  return (
    <figure>
      <div className="group/journey-picture bg-secondary relative isolate h-60 overflow-hidden sm:h-80 lg:h-112">
        <div className="motion-safe:ease-editorial absolute inset-0 motion-safe:transition-transform motion-safe:duration-550 motion-safe:group-hover/journey-picture:scale-[1.02]">
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
        <p className="font-serif text-xl/7">{item.caption.title}</p>
        <p className="mt-1 text-xs/5 text-white/75">
          {item.caption.description}
        </p>
      </figcaption>
    </figure>
  );
}

const panelVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 16 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
  exit: (direction: number) => ({
    opacity: 0,
    x: -direction * 10,
    transition: { duration: 0.25, ease },
  }),
};
function JourneyPanel({
  item,
  direction,
}: {
  item: JourneyItem;
  direction: number;
}) {
  const present = useIsPresent();
  return (
    <m.div
      data-journey-panel={item.id}
      data-current={present}
      aria-hidden={!present}
      inert={!present}
      custom={direction}
      variants={panelVariants}
      initial="enter"
      animate="visible"
      exit="exit"
      className="col-start-1 row-start-1 min-w-0"
    >
      <JourneyMedia item={item} />
    </m.div>
  );
}

export function JourneyExplorer({ items }: { items: readonly JourneyItem[] }) {
  const selection = useDirectionalSelection(items.map((item) => item.id));
  const desktop = useMediaQuery(mediaQueries.desktop);
  // Server render and first paint assume reduced motion (no entrance motion).
  const reduce = useMediaQuery(mediaQueries.reducedMotion, true);
  const value = selection.id || (desktop ? items[0]?.id : "");
  const current = items.findIndex((item) => item.id === value);
  if (!items.length) return null;
  return (
    <LazyMotion features={domAnimation} strict>
      <div data-journey-enhanced className="relative lg:min-h-152">
        <Accordion
          type="single"
          collapsible={!desktop}
          value={value}
          onValueChange={selection.select}
          className="border-border border-t lg:w-[44%]"
        >
          {items.map((item) => {
            const body = (
              <>
                <p className="text-sm/6 sm:text-base/7">{item.description}</p>
                <div className="mt-5 lg:hidden">
                  <JourneyMedia item={item} />
                </div>
              </>
            );
            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="data-[state=open]:bg-slate-100"
              >
                <AccordionTrigger className="ease-editorial gap-3 rounded-none px-4 py-4 transition-colors duration-500 hover:bg-sky-50 focus-visible:bg-sky-50 motion-reduce:transition-none [&>span:last-child]:size-8 [&>span:last-child]:border-0 [&>span:last-child]:bg-transparent">
                  <span className="text-primary w-16 shrink-0 font-serif text-2xl/9 sm:w-20 sm:text-3xl/10">
                    {item.year}
                  </span>
                  <span className="text-navy-deep flex-1 font-serif text-xl/7 sm:text-2xl/8">
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="motion-safe:data-[state=closed]:[animation-duration:400ms] motion-safe:data-[state=open]:[animation-duration:550ms]">
                  {reduce ? (
                    <div className="px-4 pb-5">{body}</div>
                  ) : (
                    <m.div
                      initial={
                        selection.animate
                          ? {
                              opacity: 0,
                              x: desktop ? selection.direction * 10 : 0,
                              y: desktop ? 0 : 8,
                            }
                          : false
                      }
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="px-4 pb-5"
                    >
                      {body}
                    </m.div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div
          data-journey-desktop-media
          className="hidden lg:absolute lg:top-0 lg:right-0 lg:grid lg:w-[49%] lg:overflow-hidden"
        >
          {reduce ? (
            <div data-journey-panel={items[current]?.id} data-current="true">
              <JourneyMedia item={items[current] ?? items[0]} />
            </div>
          ) : (
            <AnimatePresence initial={false} custom={selection.direction}>
              <JourneyPanel
                key={(items[current] ?? items[0]).id}
                item={items[current] ?? items[0]}
                direction={selection.direction}
              />
            </AnimatePresence>
          )}
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
              className="border-primary/25 text-primary hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary ease-editorial duration-500 hover:text-white focus-visible:text-white"
              size="icon"
              aria-label="Previous milestone"
              disabled={current <= 0}
              onClick={() => selection.select(items[current - 1].id)}
            >
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.5}
                className="motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/button:-translate-x-0.5 motion-safe:group-focus-visible/button:-translate-x-0.5"
              />
            </Button>
            <Button
              variant="inverse"
              className="border-primary/25 text-primary hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary ease-editorial duration-500 hover:text-white focus-visible:text-white"
              size="icon"
              aria-label="Next milestone"
              disabled={current >= items.length - 1}
              onClick={() => selection.select(items[current + 1].id)}
            >
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/button:translate-x-0.5 motion-safe:group-focus-visible/button:translate-x-0.5"
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
            <summary className="cursor-pointer font-serif text-2xl/8">
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
    </LazyMotion>
  );
}
