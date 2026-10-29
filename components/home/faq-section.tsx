import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contact } from "@/content/contact";
import { faqs, faqIntro as content, type Faq } from "@/content/faqs";
import { featuredPeople } from "@/content/people";
import { firmBrand } from "@/content/firm";
import { cn } from "@/lib/utils";

function FaqAnswer({ item }: { item: Faq }) {
  return (
    <div
      className={cn(
        "grid gap-6 pb-7",
        item.media && "lg:grid-cols-[1fr_15rem] lg:gap-12",
      )}
    >
      <p className="text-muted-foreground max-w-3xl text-sm/6 sm:text-base/7">
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

export function FaqSection({ items = faqs }: { items?: readonly Faq[] } = {}) {
  const visibleItems = items.filter(
    (item) => item.question.trim() && item.answer.trim(),
  );
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
            <h2
              id="faqs-heading"
              className="mt-4 font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
            >
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
          >
            {visibleItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <span className="text-muted-foreground group-data-[state=open]/accordion:text-foreground flex-1 font-serif text-xl/7 sm:text-2xl/8">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <FaqAnswer item={item} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <noscript>
            <style>{`#faqs [data-slot="accordion"] { display: none; }`}</style>
            {visibleItems.map((item, index) => (
              <details
                key={item.id}
                name="home-faq-fallback"
                open={index === 0}
                className="border-border border-b"
              >
                <summary className="cursor-pointer py-6 font-serif text-xl/7 sm:text-2xl/8">
                  {item.question}
                </summary>
                <FaqAnswer item={item} />
              </details>
            ))}
          </noscript>
        </div>
        <div className="mt-8 rounded-2xl bg-white px-5 py-8 text-center sm:p-10 lg:mt-12">
          <div aria-hidden="true" className="flex justify-center -space-x-3">
            {featuredPeople.slice(0, 3).map((person) => (
              <Avatar
                key={person.id}
                className="text-primary size-12 border-3 border-white bg-slate-100 font-serif text-sm"
              >
                <AvatarImage
                  src={person.portrait?.src ?? undefined}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <h3 className="mt-5 font-serif text-xl/7 font-semibold">
            {content.supportHeading}
          </h3>
          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-sm/6 sm:text-base/7">
            {content.supportDescription}
          </p>
          <ArrowButton asChild size="sm" className="mt-6">
            <a href={`mailto:${contact.email}`}>{content.supportAction}</a>
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
