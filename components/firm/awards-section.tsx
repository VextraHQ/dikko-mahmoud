import { SiteLink } from "@/components/layout/site-link";
import { AwardExplorer } from "@/components/firm/award-explorer";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ReviewNote } from "@/components/shared/review-note";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmAwards as copy } from "@/content/awards";
import { awardList } from "@/lib/awards";
import { previewOptions } from "@/lib/preview";
import { routes } from "@/lib/routes";

export function AwardsSection() {
  const awards = awardList(previewOptions, {
    limit: copy.limit,
    slots: copy.limit,
  });
  if (!awards.length) return null;

  return (
    <section aria-labelledby="awards-heading" className="py-12 lg:py-24">
      <RevealGroup className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div data-reveal className="mb-10 lg:mb-14">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="awards-heading" className="type-section mt-6 font-serif">
            {copy.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <AwardExplorer
          awards={awards}
          intro={
            <>
              <Eyebrow>{copy.listEyebrow}</Eyebrow>
              <h3 className="type-subsection mt-4 font-serif">
                {copy.listHeading}
              </h3>
              <p className="text-muted-foreground mt-5 text-sm/6 sm:text-base/7">
                {copy.introduction}
              </p>
            </>
          }
          footer={
            <div className="border-border mt-8 border-t pt-8">
              <ArrowButton asChild size="sm">
                <SiteLink href={routes.awards}>{copy.moreAction}</SiteLink>
              </ArrowButton>
              <Eyebrow className="text-muted-foreground mt-8">
                {copy.note.heading}
              </Eyebrow>
              <p className="type-card mt-3 font-serif">{copy.note.text}</p>
              {awards.some((award) => award.pending) && (
                <ReviewNote className="mt-6">{copy.pendingNote}</ReviewNote>
              )}
            </div>
          }
        />
      </RevealGroup>
    </section>
  );
}
