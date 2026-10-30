import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { ArrowButton } from "@/components/ui/arrow-button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  clientPerspectives as content,
  suppliedTestimonials,
  visibleTestimonials as testimonials,
} from "@/content/testimonials";
import { formatIndex, initialsFrom } from "@/lib/format";

export function ClientPerspectivesSection() {
  if (!testimonials.length) return null;
  return (
    <section
      id="client-perspectives"
      aria-labelledby="client-perspectives-heading"
      className="bg-background py-12 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2
          id="client-perspectives-heading"
          className="mt-4 font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
        >
          {content.heading}
        </h2>
        {!suppliedTestimonials.length && (
          <p className="text-muted-foreground mt-4 text-xs/5">
            {content.reviewNote}
          </p>
        )}
        <TestimonialCarousel count={testimonials.length}>
          <CarouselContent className="items-stretch">
            {testimonials.map((item, index) => {
              const quote = item.quote?.trim();
              // Sample copy must never inherit a real client's identity; stock
              // placeholder portraits are fine because they name no one.
              const name = quote ? item.name?.trim() || null : null;
              return (
                <CarouselItem
                  key={item.id}
                  index={index}
                  label={`Testimonial ${index + 1} of ${testimonials.length}`}
                  className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-16"
                >
                  <div className="border-border flex flex-col items-center border-b pb-6 text-center lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
                    <Avatar
                      aria-hidden="true"
                      className="size-40 bg-slate-100 sm:size-48"
                    >
                      <AvatarImage
                        src={item.image?.src ?? undefined}
                        alt={item.image?.alt ?? ""}
                        width={192}
                        height={192}
                        loading="lazy"
                      />
                      <AvatarFallback>
                        {name ? (
                          <span
                            aria-hidden="true"
                            className="text-primary font-serif text-5xl"
                          >
                            {initialsFrom(name)}
                          </span>
                        ) : (
                          <UserRound
                            aria-hidden="true"
                            strokeWidth={1}
                            className="text-primary/35 size-16"
                          />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mt-4 text-sm/6 font-semibold">
                      {name ??
                        (quote ? content.anonymousName : content.previewName)}
                    </p>
                    {quote && item.role?.trim() && (
                      <p className="text-muted-foreground mt-1 text-xs/5">
                        {item.role}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    {quote ? (
                      <blockquote className="text-navy-deep text-2xl/9 sm:text-3xl/10 xl:text-4xl/12">
                        <p>“{quote}”</p>
                      </blockquote>
                    ) : (
                      <p className="text-navy-deep text-2xl/9 sm:text-3xl/10 xl:text-4xl/12">
                        {content.quotePending}
                      </p>
                    )}
                    {quote && item.organisation?.trim() && (
                      <p className="mt-4 text-sm/6 font-semibold">
                        {item.organisation}
                      </p>
                    )}
                    {!quote && (
                      <p className="text-muted-foreground mt-4 text-xs/5">
                        Preview placeholder {formatIndex(index)}
                      </p>
                    )}
                    <div className="mt-auto pt-8">
                      <PreviewDestination>
                        <ArrowButton size="sm">{content.action}</ArrowButton>
                      </PreviewDestination>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </TestimonialCarousel>
      </div>
    </section>
  );
}
