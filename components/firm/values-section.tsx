import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowButton } from "@/components/ui/arrow-button";
import { coreValues as content } from "@/content/firm";
import { contact } from "@/content/contact";

export function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="py-12 lg:py-24">
      <div className="mx-auto grid w-full max-w-360 gap-10 px-4 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20 xl:px-20">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2
            id="values-heading"
            className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
          >
            {content.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-base/7">{content.description}</p>
          <ArrowButton asChild className="mt-6">
            <a href={`mailto:${contact.email}`}>{content.action}</a>
          </ArrowButton>
        </div>
        <dl>
          {content.items.map((item) => (
            <div
              key={item.title}
              className="group/value border-border hover:border-primary/50 ease-editorial border-b py-6 transition-colors duration-500 first:pt-0 hover:bg-sky-50/60 motion-reduce:transition-none"
            >
              <dt className="group-hover/value:text-primary ease-editorial font-serif text-2xl/8 transition-colors duration-500 motion-reduce:transition-none sm:text-3xl/9">
                {item.title}
              </dt>
              <dd className="text-muted-foreground mt-4 text-sm/6 sm:text-base/7">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
