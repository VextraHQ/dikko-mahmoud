import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { cn } from "@/lib/utils";
import type { Person } from "@/content/people";

export function PersonCard({
  person,
  role = person.role,
  className,
  portraitClassName,
  imageHoverOnly = false,
  sizes = "(min-width: 1440px) 302px, (min-width: 1024px) 23vw, 46vw",
}: {
  person: Person;
  role?: string;
  className?: string;
  portraitClassName?: string;
  imageHoverOnly?: boolean;
  sizes?: string;
}) {
  const cardClassName = cn(
    "group flex h-full w-full flex-col rounded-xl text-left",
    className,
  );
  const content = (
    <>
      <span
        className={cn(
          "group/portrait relative isolate block aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-200",
          portraitClassName,
        )}
      >
        <ImageWithFallback
          src={person.portrait?.src}
          alt={person.portrait?.alt ?? ""}
          fill
          sizes={sizes}
          className={cn(
            "object-cover motion-safe:transition-transform",
            imageHoverOnly
              ? "motion-safe:ease-editorial motion-safe:duration-550 motion-safe:group-hover/portrait:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
              : "motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]",
          )}
          style={{ objectPosition: person.portrait?.position }}
          fallback={
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-2 text-center",
                imageHoverOnly &&
                  "motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-550 motion-safe:group-hover/portrait:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]",
              )}
            >
              <span
                aria-hidden="true"
                className="text-primary/65 font-serif text-4xl sm:text-5xl"
              >
                {person.initials}
              </span>
            </span>
          }
        />
        <span
          aria-hidden="true"
          className="text-primary absolute top-2 right-2 flex size-8 items-center justify-center rounded-full border border-white/70 bg-white/85 transition-colors group-hover:bg-white sm:top-3 sm:right-3 sm:size-9"
        >
          <ArrowUpRight
            strokeWidth={1.5}
            className={cn(
              "size-4 motion-safe:transition-transform",
              imageHoverOnly
                ? "motion-safe:ease-editorial motion-safe:duration-550 motion-safe:group-hover/portrait:translate-x-0.5 motion-safe:group-hover/portrait:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
                : "motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5",
            )}
          />
        </span>
      </span>
      <span className="decoration-primary/40 mt-4 font-serif text-lg/6 underline-offset-4 group-hover:underline sm:text-xl/7">
        {person.name}
      </span>
      {role.trim() && (
        <span className="text-muted-foreground mt-auto pt-2 text-xs/5 sm:pt-3 sm:text-sm/6">
          {role}
        </span>
      )}
    </>
  );
  return person.profileAvailable ? (
    <Link href={`/people/${person.slug}`} className={cardClassName}>
      {content}
    </Link>
  ) : (
    <PreviewDestination>
      <button type="button" className={cardClassName}>
        {content}
      </button>
    </PreviewDestination>
  );
}
