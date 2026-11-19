import { EnquiryButton } from "@/components/shared/enquiry-button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import {
  Accordion,
  AccordionChevron,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { type Faq, type FaqIntro, visibleFaqs } from "@/content/faqs";
import { firmBrand } from "@/content/firm";
import { cn } from "@/lib/utils";

function FaqAnswer({ item, onCard = false }: { item: Faq; onCard?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-6 pb-7",
        onCard && "px-5 pb-6 sm:px-6",
        item.media && "lg:grid-cols-[1fr_15rem] lg:gap-12",
      )}
    >
      <p
        className={cn(
          "max-w-3xl text-sm/6 sm:text-base/7",
          onCard ? "text-white/85" : "text-muted-foreground",
        )}
      >
        {item.answer}
      </p>
      {item.media && (
        <div className="relative isolate aspect-video overflow-hidden rounded-xl">
          <ImageWithFallback
            src={item.media.src}
            alt={item.media.alt}
            fill
            sizes="(min-width: 1024px) 240px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
            className="object-cover"
            fallback={
              <span
                aria-hidden="true"
                className="from-primary to-navy-deep absolute inset-0 flex items-center justify-center bg-linear-to-br font-serif text-5xl text-white/25"
              >
                {firmBrand.initials}
              </span>
            }
          />
        </div>
      )}
    </div>
  );
}

export function FaqSection({
  items,
  intro: content,
  askFirm = true,
}: {
  items: readonly Faq[];
  intro: FaqIntro;
  askFirm?: boolean;
}) {
  const visibleItems = visibleFaqs(items);
  if (!visibleItems.length) return null;
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="bg-slate-50 py-12 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="faqs-heading" className="type-statement mt-4 font-serif">
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm/6 sm:text-base/7 lg:max-w-sm lg:justify-self-end">
            {content.description}
          </p>
        </div>
        <div className="mt-10 lg:mt-14">
          <Accordion
            type="single"
            collapsible
            defaultValue={visibleItems[0].id}
            className="space-y-3"
          >
            {visibleItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                variant="card"
                className="bg-white hover:bg-sky-50"
              >
                <AccordionTrigger
                  className="gap-4 rounded-2xl px-5 py-5 focus-visible:-outline-offset-2 sm:px-6"
                  indicator={<AccordionChevron />}
                >
                  <span className="text-navy-deep type-card flex-1 font-serif transition-colors duration-350 ease-in-out group-data-[state=open]/accordion:text-white">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <FaqAnswer item={item} onCard />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <noscript>
            <style>{`#faqs [data-slot="accordion"] { display: none; }`}</style>
            {visibleItems.map((item, index) => (
              <details
                key={item.id}
                name="faq-fallback"
                open={index === 0}
                className="border-border border-b"
              >
                <summary className="type-card cursor-pointer py-6 font-serif">
                  {item.question}
                </summary>
                <FaqAnswer item={item} />
              </details>
            ))}
          </noscript>
        </div>
        {askFirm && (
          <div className="mt-8 rounded-2xl bg-white px-5 py-8 text-center sm:p-10 lg:mt-12">
            <h3 className="type-card font-serif font-semibold">
              {content.supportHeading}
            </h3>
            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-sm/6 sm:text-base/7">
              {content.supportDescription}
            </p>
            <EnquiryButton size="sm" className="mt-6">
              {content.supportAction}
            </EnquiryButton>
          </div>
        )}
      </div>
    </section>
  );
}
