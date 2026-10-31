import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmBrand } from "@/content/firm";

/**
 * Shared layout for the 404 and error pages: a calm, centred editorial
 * message on the primary navy band with a faint serif watermark behind it.
 */
export function StatusPage({
  mark = firmBrand.initials,
  eyebrow,
  title,
  description,
  actions,
}: {
  mark?: string;
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <section
      aria-labelledby="status-heading"
      className="bg-primary relative isolate overflow-hidden pt-16 pb-24 text-white sm:pt-24 sm:pb-32 lg:pt-52 lg:pb-40"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-1 flex items-center justify-center font-serif text-[11rem]/none text-white/5 select-none sm:text-[18rem]/none lg:text-[24rem]/none"
      >
        {mark}
      </span>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-8">
        <Eyebrow className="text-sky-200">{eyebrow}</Eyebrow>
        <h1
          id="status-heading"
          className="mt-6 font-serif text-4xl/[1.08] text-balance sm:text-6xl/[1.06] xl:text-7xl/[1.04]"
        >
          {title}
        </h1>
        <p className="mt-6 max-w-lg text-base/7 text-pretty text-white/75 sm:text-lg/8">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      </div>
    </section>
  );
}
