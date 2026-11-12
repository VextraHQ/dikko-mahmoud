import { ProfileHero } from "@/components/people/profile-hero";
import { ProfileIntro } from "@/components/people/profile-intro";
import { PageContents } from "@/components/shared/page-contents";
import { ReviewNote } from "@/components/shared/review-note";
import { ProfileSections } from "@/components/people/profile-sections";
import { profileCopy as copy } from "@/content/profiles";
import {
  profileSectionLinks,
  type ResolvedProfile,
} from "@/lib/people/profiles";

/**
 * The one profile body shared by the popup and the standalone page, so both
 * always carry the same biography, focus, qualifications and contact. The page
 * opens with the shared split hero and the shared sticky contents card; the
 * popup keeps its own intro and puts the short lists in a side column.
 */
export function ProfileBody({
  resolved,
  variant,
}: {
  resolved: ResolvedProfile;
  variant: "dialog" | "page";
}) {
  if (variant === "dialog") {
    return (
      <article>
        <div className="bg-sky-50 px-5 pt-6 pb-10 sm:px-10 lg:px-12 lg:py-12">
          <ProfileIntro resolved={resolved} />
        </div>
        <div className="px-5 pt-10 pb-12 sm:px-10 lg:px-12 lg:pt-14">
          <ProfileSections resolved={resolved} variant="dialog" />
        </div>
      </article>
    );
  }

  return (
    <article>
      <div className="mx-auto w-full max-w-360 px-4 pt-6 sm:px-8 sm:pt-10 lg:pt-36 xl:px-20">
        <ProfileHero resolved={resolved} />
        {resolved.preview && (
          <ReviewNote className="max-w-xl">{copy.reviewNote}</ReviewNote>
        )}
      </div>
      <div className="mx-auto grid w-full max-w-360 items-start gap-10 px-4 pt-12 sm:px-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 lg:pt-20 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16 xl:px-20">
        {/* Same contents card as practice pages and articles. */}
        <aside className="border-border hidden rounded-xl border bg-slate-50 p-6 lg:sticky lg:top-28 lg:block">
          <PageContents
            label={copy.contentsLabel}
            items={profileSectionLinks(resolved).map((section) => ({
              id: section.id,
              text: section.label,
            }))}
          />
        </aside>
        <ProfileSections resolved={resolved} variant="page" />
      </div>
    </article>
  );
}
