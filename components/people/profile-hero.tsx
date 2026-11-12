import { keepTogether } from "@/lib/typography";
import { MilestoneList } from "@/components/people/milestone-list";
import { ProfileLinks } from "@/components/people/profile-links";
import { ProfilePortrait } from "@/components/people/profile-portrait";
import { DetailHero } from "@/components/shared/detail-hero";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageTrail } from "@/components/shared/page-trail";
import { profileCopy as copy } from "@/content/profiles";
import { focusInHero, type ResolvedProfile } from "@/lib/people/profiles";
import { routes } from "@/lib/routes";

/**
 * Standalone profile page hero: the same split hero as articles and practice
 * pages. The role is the label. Under the summary: career milestones, or
 * the areas of focus when there are none. The enquiry button and contact
 * links share the bottom rule.
 * The popup keeps `ProfileIntro`.
 */
export function ProfileHero({ resolved }: { resolved: ResolvedProfile }) {
  const { person, profile, title, links, shortName } = resolved;
  return (
    <>
      <PageTrail
        items={[
          { label: copy.homeLabel, href: routes.home },
          { label: copy.peopleLabel, href: routes.people },
          { label: profile.fullName },
        ]}
      />
      <DetailHero
        headingId="profile-heading"
        eyebrow={title}
        title={profile.fullName}
        subtitle={
          profile.postnominals?.length ? (
            <p className="text-primary text-base/6 font-medium tracking-wide [font-variant-caps:all-small-caps]">
              {profile.postnominals.join(" · ")}
            </p>
          ) : null
        }
        lead={profile.summary ? keepTogether(profile.summary) : null}
        details={
          person.milestones?.length ? (
            <MilestoneList
              milestones={person.milestones}
              label={copy.milestonesLabel}
              className="max-w-xl"
            />
          ) : focusInHero(resolved) ? (
            <FocusList label={copy.focusLabel} items={profile.focus ?? []} />
          ) : null
        }
        footer={
          <div className="flex flex-wrap items-center gap-3">
            <EnquiryButton>{copy.enquireAbout(shortName)}</EnquiryButton>
            <ProfileLinks
              links={links}
              name={profile.fullName}
              label={copy.contactLinksLabel(profile.fullName)}
            />
          </div>
        }
        media={
          <ProfilePortrait
            person={person}
            sizes="(min-width: 1440px) 680px, (min-width: 1024px) 48vw, 100vw"
            className="absolute inset-0 rounded-none"
          />
        }
      />
    </>
  );
}

/**
 * Areas of focus for profiles without milestones, in the site's editorial
 * list style: serif lines split by hairlines, like the focus list below.
 */
function FocusList({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div className="max-w-xl">
      <Eyebrow>{label}</Eyebrow>
      <ul aria-label={label} className="mt-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-border text-primary type-row border-b py-3 font-serif last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
