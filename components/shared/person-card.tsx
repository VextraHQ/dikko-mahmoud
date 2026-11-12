import { keepTogether } from "@/lib/typography";
import { PortraitFallback } from "@/components/shared/portrait-fallback";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { cn } from "@/lib/utils";
import type { Person } from "@/content/people";
import { SiteLink } from "@/components/layout/site-link";
import { routes } from "@/lib/routes";

/** The card's fields only, so slim directory records fit as well as people. */
type PersonCardData = Pick<
  Person,
  "slug" | "name" | "role" | "initials" | "portrait"
>;

export function PersonCard({
  person,
  role = person.role,
  detail,
  className,
  portraitClassName,
  imageHoverOnly = false,
  fullPageLoad = false,
  sizes = "(min-width: 1440px) 302px, (min-width: 1024px) 23vw, 46vw",
}: {
  person: PersonCardData;
  role?: string;
  /** A quiet line under the role, such as the person's main practice. */
  detail?: string;
  className?: string;
  portraitClassName?: string;
  imageHoverOnly?: boolean;
  /** Open the standalone profile page instead of the popup. */
  fullPageLoad?: boolean;
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
            <PortraitFallback
              initials={person.initials}
              className={cn(
                imageHoverOnly &&
                  "motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-550 motion-safe:group-hover/portrait:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]",
              )}
            />
          }
        />
      </span>
      <span className="decoration-primary/40 type-row mt-4 font-serif underline-offset-4 group-hover:underline">
        {keepTogether(person.name)}
      </span>
      {role.trim() && (
        <span className="text-muted-foreground mt-auto pt-2 text-xs/5 sm:pt-3 sm:text-sm/6">
          {role}
        </span>
      )}
      {detail && (
        <span className="mt-1 text-xs/5 text-slate-500 sm:text-sm/6">
          {detail}
        </span>
      )}
    </>
  );
  // Availability comes from launchedRoutes (profile manifest + preview rule),
  // the same rule the profile routes use. `scroll={false}` keeps the origin
  // page in place beneath the profile overlay.
  return (
    <SiteLink
      href={routes.person(person.slug)}
      scroll={false}
      fullPageLoad={fullPageLoad}
      className={cardClassName}
    >
      {content}
    </SiteLink>
  );
}
