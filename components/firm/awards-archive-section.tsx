import { AwardExplorer } from "@/components/firm/award-explorer";
import { PageTrail } from "@/components/shared/page-trail";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ReviewNote } from "@/components/shared/review-note";
import { Eyebrow } from "@/components/ui/eyebrow";
import { awardsArchive as copy, firmAwards } from "@/content/awards";
import type { AwardEntry } from "@/lib/awards";
import { routes } from "@/lib/routes";

export function AwardsArchiveSection({
  awards,
}: {
  awards: readonly AwardEntry[];
}) {
  return (
    <div className="mx-auto w-full max-w-360 px-4 pt-6 pb-12 sm:px-8 sm:pt-10 lg:pt-36 lg:pb-24 xl:px-20">
      <PageTrail
        items={[
          { label: copy.home, href: routes.home },
          { label: copy.firm, href: routes.firm },
          { label: copy.title },
        ]}
      />
      <section
        aria-labelledby="awards-heading"
        className="pt-4 sm:pt-10 lg:pt-14"
      >
        <RevealGroup>
          <div data-reveal className="mb-10 max-w-3xl lg:mb-14">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1
              id="awards-heading"
              className="type-title-detail mt-5 font-serif text-balance"
            >
              {copy.heading}
            </h1>
            <p className="text-muted-foreground mt-5 text-base/7 sm:mt-7 lg:text-lg/8">
              {copy.introduction}
            </p>
            {awards.some((award) => award.pending) && (
              <ReviewNote className="mt-5">{firmAwards.pendingNote}</ReviewNote>
            )}
          </div>
          <AwardExplorer awards={awards} />
        </RevealGroup>
      </section>
    </div>
  );
}
