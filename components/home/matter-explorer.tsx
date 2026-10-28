"use client";

import { useRef, useState } from "react";
import {
  selectedMatters as content,
  type SelectedMatter,
} from "@/content/matters";

export function MatterExplorer({ matters }: { matters: SelectedMatter[] }) {
  const [selected, setSelected] = useState(() =>
    Math.max(
      0,
      matters.findIndex((matter) => matter.id === content.defaultId),
    ),
  );
  const featureRef = useRef<HTMLElement>(null);

  function selectMatter(index: number) {
    setSelected(index);
    if (window.matchMedia("(min-width: 64rem)").matches) return;

    // On the stacked layout, bring the requested preview back into view.
    requestAnimationFrame(() => {
      featureRef.current?.focus({ preventScroll: true });
      featureRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_1.17fr] lg:gap-16">
      <section
        ref={featureRef}
        tabIndex={-1}
        aria-labelledby={`matter-title-${matters[selected].id} matter-organisation-${matters[selected].id}`}
        className="bg-primary grid overflow-hidden rounded-2xl text-white"
      >
        {matters.map((matter, index) => {
          const active = selected === index;
          return (
            <div
              key={matter.id}
              id={`matter-card-${matter.id}`}
              data-matter-card
              data-active={active}
              aria-hidden={!active}
              inert={!active}
              className="invisible col-start-1 row-start-1 flex min-h-100 flex-col p-6 opacity-0 transition-[opacity,visibility] duration-240 ease-[ease] data-[active=true]:visible data-[active=true]:opacity-100 motion-reduce:transition-none sm:min-h-112 sm:p-8 xl:min-h-144 xl:p-10"
            >
              <p className="text-[10px]/4 font-semibold tracking-widest text-sky-200 uppercase">
                {content.featureLabel} / {matter.category}
              </p>
              <h3
                id={`matter-title-${matter.id}`}
                className="mt-5 font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
              >
                {matter.category}
              </h3>
              <p className="mt-6 text-sm/6 text-sky-200/90 sm:mt-8 sm:text-base/7">
                {matter.topic}
              </p>
              <div className="mt-auto pt-6 sm:pt-12">
                <p
                  id={`matter-organisation-${matter.id}`}
                  className="font-serif text-2xl/7 sm:text-3xl/9"
                >
                  {matter.organisation}
                </p>
                <p className="mt-5 text-sm/6 text-sky-200/90 sm:text-base/7">
                  {matter.summary}
                </p>
                <p className="mt-5 text-[11px]/5 text-sky-200/90">
                  {matter.qualifier}
                </p>
              </div>
            </div>
          );
        })}
      </section>
      <fieldset className="min-w-0">
        <legend className="text-muted-foreground text-[10px]/4 font-semibold tracking-widest uppercase">
          {content.selectorLabel}
        </legend>
        <ol className="mt-4 lg:mt-0">
          {matters.map((matter, index) => (
            <li key={matter.id} className="border-border border-b">
              <button
                type="button"
                aria-pressed={selected === index}
                aria-controls={`matter-card-${matter.id}`}
                onClick={() => selectMatter(index)}
                className="text-primary relative w-full border-l-2 border-transparent px-4 py-5 text-left transition-colors hover:bg-sky-50 aria-pressed:border-sky-700 aria-pressed:bg-sky-100 motion-reduce:transition-none lg:px-6 lg:py-9"
              >
                <span className="block text-[10px]/4 font-semibold tracking-widest uppercase">
                  {String(index + 1).padStart(2, "0")} / {matter.category}
                </span>
                <span className="mt-2 block font-serif text-2xl/7">
                  {matter.organisation}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </fieldset>
    </div>
  );
}
