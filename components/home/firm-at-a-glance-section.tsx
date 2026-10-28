import { RevealGroup } from "@/components/shared/reveal-group";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmFacts, firmHomePreview } from "@/content/firm";
import { cn } from "@/lib/utils";

export function FirmAtAGlanceSection() {
  return (
    <section
      aria-labelledby="firm-facts-heading"
      className="bg-background py-12"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <Eyebrow
          as="h2"
          id="firm-facts-heading"
          className="text-navy-deep text-xs/4"
        >
          {firmHomePreview.factsHeading}
        </Eyebrow>
        <RevealGroup className="mt-8">
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:gap-x-0">
            {firmFacts.map((fact, index) => (
              <div
                key={fact.label}
                data-reveal
                data-reveal-order={index}
                className="border-border flex min-w-0 flex-col border-l pl-4 xl:pl-6"
              >
                <dt className="mt-4 text-base/6 font-semibold">{fact.label}</dt>
                <dd
                  className={cn(
                    "text-primary order-first font-serif text-4xl/10 xl:text-[44px]/12",
                    fact.value.length > 10 &&
                      "xl:text-[clamp(2rem,2.5vw,2.25rem)]/12",
                  )}
                >
                  {fact.value}
                </dd>
                <dd className="text-muted-foreground mt-3 text-sm/6">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </RevealGroup>
      </div>
    </section>
  );
}
