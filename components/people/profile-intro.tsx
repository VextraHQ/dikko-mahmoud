import { keepTogether } from "@/lib/typography";
import { ReviewNote } from "@/components/shared/review-note";
import { ProfileDialogTitle } from "@/components/people/profile-dialog";
import { MilestoneList } from "@/components/people/milestone-list";
import { ProfileLinks } from "@/components/people/profile-links";
import { ProfilePortrait } from "@/components/people/profile-portrait";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { profileCopy as copy } from "@/content/profiles";
import type { ResolvedProfile } from "@/lib/people/profiles";

/**
 * The profile popup's intro: role, name, postnominals, the one-line summary,
 * the enquiry action, any supplied links, then career milestones. The
 * portrait sits beside it from `lg` and above it on phones; DOM order keeps
 * the heading first. The standalone page uses `ProfileHero` instead.
 */
export function ProfileIntro({ resolved }: { resolved: ResolvedProfile }) {
  const { person, profile, preview, title, links, shortName } = resolved;

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
      <div>
        <Eyebrow>{title}</Eyebrow>
        <ProfileDialogTitle>
          <h2
            data-profile-heading
            tabIndex={-1}
            className="mt-4 font-serif text-[2.25rem]/[1.1] text-balance outline-none sm:text-5xl/[1.08]"
          >
            {keepTogether(profile.fullName)}
          </h2>
        </ProfileDialogTitle>
        {profile.postnominals?.length ? (
          <p className="text-primary mt-4 text-base/6 font-medium tracking-wide [font-variant-caps:all-small-caps]">
            {profile.postnominals.join(" · ")}
          </p>
        ) : null}
        {profile.summary && (
          <p className="mt-5 max-w-xl text-base/7 text-slate-700 lg:text-lg/8">
            {keepTogether(profile.summary)}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <EnquiryButton>{copy.enquireAbout(shortName)}</EnquiryButton>
          <ProfileLinks
            links={links}
            name={profile.fullName}
            label={copy.contactLinksLabel(profile.fullName)}
          />
        </div>
        {person.milestones?.length ? (
          <MilestoneList
            milestones={person.milestones}
            label={copy.milestonesLabel}
            className="mt-8 max-w-xl"
          />
        ) : null}
        {preview && (
          <ReviewNote className="mt-8 max-w-xl">{copy.reviewNote}</ReviewNote>
        )}
      </div>
      <ProfilePortrait
        person={person}
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, 100vw"
        className="order-first aspect-4/3 sm:max-w-md lg:order-none lg:aspect-5/4 lg:max-w-none"
      />
    </div>
  );
}
