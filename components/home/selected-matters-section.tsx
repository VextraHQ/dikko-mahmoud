import { MatterExplorer } from "@/components/home/matter-explorer";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  selectedMatters as content,
  visibleMatters as matters,
} from "@/content/matters";

export function SelectedMattersSection() {
  if (!matters.length) return null;
  return (
    <section
      id="selected-matters"
      aria-labelledby="selected-matters-heading"
      className="bg-background py-12 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="selected-matters-heading"
              className="mt-4 font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
            >
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:max-w-sm lg:justify-self-end">
            <p className="text-muted-foreground text-sm/6 sm:text-base/7">
              {content.description}
            </p>
            <PreviewDestination>
              <ArrowButton size="sm" className="mt-6">
                {content.action}
              </ArrowButton>
            </PreviewDestination>
          </div>
        </div>
        <MatterExplorer matters={matters} />
      </div>
    </section>
  );
}
