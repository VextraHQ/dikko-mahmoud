import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contactHero as content } from "@/content/contact-page";

/**
 * Short dark hero over the office photo; the form starts right below. On
 * phones it slides up under the 86px header (as the header already overlays
 * it on desktop), so the photo fills the top of the screen.
 */
export function ContactHeroSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      data-header-dark
      className="bg-navy-deep relative isolate overflow-hidden pb-14 text-white max-lg:-mt-21.5 max-lg:pt-21.5 lg:pt-40 lg:pb-24"
    >
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="from-navy-deep/90 via-navy-deep/75 to-navy-deep/90 absolute inset-0 -z-10 bg-linear-to-b"
      />
      <div className="mx-auto max-w-360 px-4 pt-12 sm:px-8 lg:pt-0 xl:px-20">
        <Eyebrow className="text-white">{content.eyebrow}</Eyebrow>
        <h1 id="contact-heading" className="type-title mt-6 font-serif">
          {content.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl text-base/7 text-white/85 lg:text-lg/7">
          {content.description}
        </p>
      </div>
    </section>
  );
}
