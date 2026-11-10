import type { ReactNode } from "react";
import { keepTogether } from "@/lib/typography";
import { ReviewNote } from "@/components/shared/review-note";
import { ProfileDialogTitle } from "@/components/people/profile-dialog";
import { ProfileLinks } from "@/components/people/profile-links";
import { ProfilePortrait } from "@/components/people/profile-portrait";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { profileCopy as copy } from "@/content/profiles";
import type { ResolvedProfile } from "@/lib/people/profiles";
import { cn } from "@/lib/utils";

/**
 * Who the person is, then how to reach them: role, name, postnominals, the
 * one-line summary, the enquiry action and any supplied links. The portrait
 * sits beside it from `lg` and above it on phones; DOM order keeps the heading
 * first. The dialog titles itself with an h2, the page uses h1.
 */
export function ProfileIntro({
  resolved,
  variant,
  backLink,
}: {
  resolved: ResolvedProfile;
  variant: "dialog" | "page";
  backLink?: ReactNode;
}) {
  const { person, profile, preview, title, links, shortName } = resolved;
  const headingProps = {
    "data-profile-heading": true,
    tabIndex: -1,
    className: cn(
      "mt-4 font-serif text-balance outline-none",
      variant === "page"
        ? "text-[2.5rem]/[1.1] sm:text-5xl/[1.08] xl:text-[4rem]/[1.04]"
        : "text-[2.25rem]/[1.1] sm:text-5xl/[1.08]",
    ),
    children: keepTogether(profile.fullName),
  };
  const heading =
    variant === "dialog" ? (
      <ProfileDialogTitle>
        <h2 {...headingProps} />
      </ProfileDialogTitle>
    ) : (
      <h1 {...headingProps} />
    );

  return (
    <div>
      {backLink}
      <div
        className={cn(
          "flex flex-col gap-8 lg:grid lg:items-center",
          variant === "page"
            ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24"
            : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12",
        )}
      >
        <div>
          <Eyebrow>{title}</Eyebrow>
          {heading}
          {profile.postnominals?.length ? (
            <p className="text-primary mt-4 text-base/6 font-medium tracking-wide [font-variant-caps:all-small-caps]">
              {profile.postnominals.join(" · ")}
            </p>
          ) : null}
          {person.milestones?.length ? (
            <ul
              aria-label={copy.milestonesLabel}
              className="mt-4 flex flex-wrap gap-2"
            >
              {person.milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs/5 text-slate-700"
                >
                  <span className="text-primary font-semibold">
                    {milestone.year}
                  </span>{" "}
                  · {milestone.description}
                </li>
              ))}
            </ul>
          ) : null}
          {profile.summary && (
            <p className="mt-5 max-w-xl text-base/7 text-slate-700 lg:text-lg/8">
              {keepTogether(profile.summary)}
            </p>
          )}
          <EnquiryButton className="mt-7">
            {copy.enquireAbout(shortName)}
          </EnquiryButton>
          <ProfileLinks
            links={links}
            name={profile.fullName}
            label={copy.contactLinksLabel(profile.fullName)}
            className="mt-4"
          />
          {preview && (
            <ReviewNote className="mt-8 max-w-xl">{copy.reviewNote}</ReviewNote>
          )}
        </div>
        <ProfilePortrait
          person={person}
          sizes={
            variant === "page"
              ? "(min-width: 1440px) 520px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw"
              : "(min-width: 1024px) 420px, (min-width: 640px) 448px, 100vw"
          }
          className={cn(
            "order-first aspect-4/3 sm:max-w-md lg:order-none lg:max-w-none",
            variant === "page" ? "lg:aspect-21/20" : "lg:aspect-5/4",
          )}
        />
      </div>
    </div>
  );
}
