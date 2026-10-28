import { PracticeAreaExplorer } from "@/components/home/practice-area-explorer";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  practiceAreas,
  practiceAreasIntro as intro,
} from "@/content/practice-areas";

export function PracticeAreasSection() {
  const areas = practiceAreas.filter((area) => area.title.trim());
  if (!areas.length) return null;
  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      className="bg-primary py-12 text-white lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <PracticeAreaExplorer areas={areas}>
          <Eyebrow className="text-white/75">{intro.eyebrow}</Eyebrow>
          <h2
            id="practice-areas-heading"
            className="mt-4 max-w-lg font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
          >
            {intro.title}
          </h2>
          <p className="mt-5 max-w-md text-sm/6 text-white/75 sm:text-base/7">
            {intro.description}
          </p>
          <PreviewDestination>
            <ArrowButton variant="inverse" className="mt-6" size="sm">
              {intro.action}
            </ArrowButton>
          </PreviewDestination>
        </PracticeAreaExplorer>
      </div>
    </section>
  );
}
