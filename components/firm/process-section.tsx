import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowButton } from "@/components/ui/arrow-button";
import { workingWithUs as content } from "@/content/firm";
import { contact } from "@/content/contact";
import { formatIndex } from "@/lib/format";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="py-12 lg:py-24">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="process-heading"
              className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
            >
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div>
            <p className="text-base/7 lg:text-lg/7">{content.introduction}</p>
            <p className="text-muted-foreground mt-6 text-sm/6 sm:text-base/7">
              {content.description}
            </p>
          </div>
        </div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="group/step border-border hover:border-primary/60 ease-editorial border-t pt-6 transition-colors duration-500 hover:bg-sky-50/60 motion-reduce:transition-none"
            >
              <p className="text-primary text-xs/5 font-bold tracking-wider uppercase">
                {formatIndex(index)} / {step.label}
              </p>
              <h3 className="group-hover/step:text-primary ease-editorial mt-4 font-serif text-2xl/8 transition-colors duration-500 motion-reduce:transition-none lg:text-3xl/9">
                {step.title}
              </h3>
              <p className="text-primary mt-5 text-sm/6 sm:text-base/7">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <ArrowButton asChild>
            <a href={`mailto:${contact.email}`}>{content.action}</a>
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
