import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmStory as content } from "@/content/firm";

export function FirmStorySection() {
  return (
    <section aria-labelledby="firm-story-heading" className="py-12 lg:py-24">
      <div className="mx-auto grid w-full max-w-360 gap-8 px-4 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20 xl:px-20">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2
            id="firm-story-heading"
            className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
          >
            {content.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="space-y-6 text-sm/6 sm:text-base/7">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                "before:bg-primary/40 before:ease-editorial relative before:absolute before:inset-y-1 before:-left-3 before:w-0.5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 motion-reduce:before:transition-none",
                "hover:text-primary ease-editorial transition-colors duration-500 motion-reduce:transition-none",
                index === 0
                  ? "text-base/7 lg:text-lg/7"
                  : "text-muted-foreground",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
