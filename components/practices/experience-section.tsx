import { ExperienceCarousel } from "@/components/practices/experience-carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  practiceCopy as copy,
  type PracticeDetail,
} from "@/content/practice-catalogue";
import { formatIndex } from "@/lib/format";
type Case = NonNullable<PracticeDetail["experience"]>[number];
function CaseCard({ item, index }: { item: Case; index: number }) {
  return (
    <article className="border-border flex h-full flex-col rounded-xl border bg-slate-50 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-5">
        <p className="font-serif text-4xl/10">{formatIndex(index)}</p>
        <p className="text-muted-foreground text-right text-[10px]/5 font-bold tracking-wider uppercase">
          {item.category}
        </p>
      </div>
      <h3 className="mt-6 font-serif text-2xl/8">{item.organisation}</h3>
      <dl className="mt-6 space-y-6 text-sm/6">
        {[
          { label: "The matter", description: item.matter },
          { label: "Our role", description: item.role },
          {
            label: "Relevant services",
            description: (
              <ul className="list-disc space-y-1 pl-5 marker:text-slate-400">
                {item.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            ),
          },
        ].map((row) => (
          <div key={row.label} className="border-border border-t pt-5">
            <dt className="text-primary text-xs/5 font-bold tracking-wider uppercase">
              {row.label}
            </dt>
            <dd className="text-muted-foreground mt-2">{row.description}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
export function ExperienceSection({
  items,
  preview = false,
}: {
  items: PracticeDetail["experience"];
  preview?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-border border-t py-12 lg:py-16"
    >
      <Eyebrow>{copy.experienceEyebrow}</Eyebrow>
      <h2
        id="experience-heading"
        className="mt-6 font-serif text-[32px]/10 sm:text-5xl/13"
      >
        {copy.experienceHeading}
      </h2>
      <p className="text-muted-foreground mt-6 text-sm/6 sm:text-base/7">
        {copy.experienceDescription}
      </p>
      {preview && (
        <p className="text-muted-foreground mt-3 text-xs/5">
          {copy.experiencePreviewNote}
        </p>
      )}
      <div className="mt-8" data-practice-experience>
        <ExperienceCarousel count={items.length}>
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              index={index}
              label={`${formatIndex(index)}: ${item.organisation}`}
              className={items.length > 1 ? "pl-6 sm:basis-[88%]" : "pl-6"}
            >
              <CaseCard item={item} index={index} />
            </CarouselItem>
          ))}
        </ExperienceCarousel>
      </div>
      <noscript>
        <style>{`[data-practice-experience] { display:none; }`}</style>
        <ol className="mt-8 space-y-6">
          {items.map((item, index) => (
            <li key={item.id}>
              <CaseCard item={item} index={index} />
            </li>
          ))}
        </ol>
      </noscript>
    </section>
  );
}
