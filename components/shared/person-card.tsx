import { pictureZoomClass } from "@/components/ui/picture-zoom";
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
  // The picture zooms on hover of the whole card, or of the picture alone
  // when `imageHoverOnly` is set.
  const cardClassName = cn(
    "group flex h-full w-full flex-col rounded-xl text-left",
    !imageHoverOnly && "group/picture",
    className,
  );
  const content = (
    <>
      <span
        className={cn(
          "relative isolate block aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-200",
          imageHoverOnly && "group/picture",
          portraitClassName,
        )}
      >
        <ImageWithFallback
          src={person.portrait?.src}
          alt={person.portrait?.alt ?? ""}
          fill
          sizes={sizes}
          className={cn("object-cover", pictureZoomClass)}
          style={{ objectPosition: person.portrait?.position }}
          fallback={
            <PortraitFallback
              initials={person.initials}
              className={pictureZoomClass}
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
