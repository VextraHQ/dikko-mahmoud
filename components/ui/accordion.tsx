"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Accordion(
  props: ComponentProps<typeof AccordionPrimitive.Root>,
) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

const itemLooks = {
  /** Rows divided by hairlines (mobile menu, practice services). */
  line: "border-border border-b",
  /**
   * Rounded cards (Journey, FAQs): pale when closed, navy with white text
   * when open. Pair with `AccordionChevron` and give the list a gap. Everything
   * changes over 350ms: height on `ease-soft` like every accordion
   * (app/styles/motion.css), colours on an even `ease-in-out`, because a
   * fast-start curve flips navy to white in the first 100ms and blinks.
   */
  card: "ease-in-out overflow-hidden rounded-2xl bg-slate-100 transition-colors duration-350 hover:bg-slate-200/70 data-[state=open]:bg-secondary data-[state=open]:text-white data-[state=open]:hover:bg-secondary motion-reduce:transition-none",
};

export function AccordionItem({
  variant = "line",
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item> & {
  variant?: keyof typeof itemLooks;
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(itemLooks[variant], className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  indicator,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /** Replaces the default plus/minus button, e.g. a navigation chevron. */
  indicator?: ReactNode;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion flex flex-1 items-center gap-5 rounded-lg py-6 text-left disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        {indicator ?? (
          <span
            aria-hidden="true"
            className="text-primary group-data-[state=open]/accordion:border-primary/15 flex size-11 shrink-0 items-center justify-center rounded-full border border-transparent transition-colors group-hover/accordion:bg-white group-data-[state=open]/accordion:bg-white motion-reduce:transition-none"
          >
            <Plus
              strokeWidth={1.5}
              className="size-5 group-data-[state=open]/accordion:hidden"
            />
            <Minus
              strokeWidth={1.5}
              className="hidden size-5 group-data-[state=open]/accordion:block"
            />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * The round button at the end of a card row: blue with a white chevron, then
 * white with a navy chevron that turns over once the row opens. It fades on
 * the card's 350ms beat, so the whole row changes as one. `children` replaces
 * the chevron (the Journey shows an arrow on desktop).
 */
export function AccordionChevron({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-primary group-data-[state=open]/accordion:text-secondary flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-350 ease-in-out group-data-[state=open]/accordion:bg-white motion-reduce:transition-none",
        className,
      )}
    >
      {children ?? <AccordionChevronIcon />}
    </span>
  );
}

/** The chevron alone, for composing a custom `AccordionChevron`. */
export function AccordionChevronIcon({ className }: { className?: string }) {
  return (
    <ChevronDown
      strokeWidth={1.75}
      className={cn(
        "ease-soft size-5 transition-transform duration-350 group-data-[state=open]/accordion:rotate-180 motion-reduce:transition-none",
        className,
      )}
    />
  );
}

export function AccordionContent({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "motion-safe:data-[state=open]:animate-accordion-down motion-safe:data-[state=closed]:animate-accordion-up overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}
