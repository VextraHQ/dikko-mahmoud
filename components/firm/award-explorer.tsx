"use client";

import type { ReactNode } from "react";
import { SiteLink } from "@/components/layout/site-link";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { firmAwards as copy } from "@/content/awards";
import { useSelection } from "@/hooks/use-selection";
import type { AwardEntry } from "@/lib/awards";
import { formatIndex } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

function AwardPicture({
  award,
  className,
}: {
  award: AwardEntry;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <ImageWithFallback
        src={award.image?.src}
        alt={award.image?.alt ?? ""}
        fill
        sizes="(min-width: 1440px) 600px, (min-width: 1024px) 42vw, calc(100vw - 32px)"
        className="object-cover"
        fallback={<EditorialCover />}
      />
    </div>
  );
}

/**
 * The picture follows the selected award: beside the list from desktop up,
 * where the new one fades in over the previous one as on the Journey, and
 * directly under the selected row on phones and tablets. The first award is
 * selected on load and nothing animates until the visitor picks another.
 */
export function AwardExplorer({
  awards,
  intro,
  footer,
}: {
  awards: readonly AwardEntry[];
  intro?: ReactNode;
  footer?: ReactNode;
}) {
  const selection = useSelection(awards[0]?.id ?? "");
  const shown = awards.find((award) => award.id === selection.id) ?? awards[0];
  if (!shown) return null;
  const previous = awards.find(
    (award) => award.id === selection.previousId && award.id !== shown.id,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
      <div
        data-reveal
        className="relative hidden overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:block lg:max-h-155 lg:min-h-90"
      >
        {previous && <AwardPicture key={previous.id} award={previous} />}
        <AwardPicture
          key={shown.id}
          award={shown}
          className={cn(selection.changed && "motion-safe:animate-card-fade")}
        />
      </div>
      <div data-reveal data-reveal-order={1} className="min-w-0">
        {intro}
        <p className={cn("text-muted-foreground text-xs/5", intro && "mt-6")}>
          {copy.selectHint}
        </p>
        <ol className="mt-6">
          {awards.map((award, index) => {
            const selected = award.id === shown.id;
            return (
              <li
                key={award.id}
                className="not-last:before:bg-primary/30 relative grid grid-cols-[3rem_1fr] gap-x-5 pb-8 not-last:before:absolute not-last:before:top-12 not-last:before:bottom-0 not-last:before:left-6 not-last:before:w-px last:pb-0"
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selection.select(award.id)}
                  className="group/award focus-visible:ring-ring col-span-2 grid cursor-pointer grid-cols-subgrid items-start rounded-lg text-left focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "ease-editorial flex size-12 items-center justify-center rounded-full border text-xs tabular-nums transition-colors duration-200 motion-reduce:transition-none",
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-primary/40 text-primary group-hover/award:border-primary bg-white",
                    )}
                  >
                    {formatIndex(index)}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span className={cn(eyebrowClass, "block")}>
                      {award.year}
                    </span>
                    <span className="type-card mt-1.5 block font-serif">
                      {award.title}
                    </span>
                  </span>
                </button>
                <p className="text-muted-foreground col-start-2 mt-2 text-sm/6">
                  {award.recipient && (
                    <>
                      {award.recipientSlug ? (
                        <SiteLink
                          href={routes.person(award.recipientSlug)}
                          className="text-primary underline underline-offset-4"
                        >
                          {award.recipient}
                        </SiteLink>
                      ) : (
                        award.recipient
                      )}
                      {" · "}
                    </>
                  )}
                  {copy.awardedBy} {award.awardingBody}
                </p>
                {selected && (
                  <div className="relative col-start-2 mt-4 aspect-video overflow-hidden rounded-xl lg:hidden">
                    <AwardPicture
                      award={award}
                      className={cn(
                        selection.changed && "motion-safe:animate-card-fade",
                      )}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {footer}
      </div>
    </div>
  );
}
