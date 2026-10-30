import { MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { firmPresence as content } from "@/content/firm";
import { contact } from "@/content/contact";

export function PresenceSection() {
  return (
    <section aria-labelledby="presence-heading" className="py-12 lg:py-24">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="presence-heading"
              className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
            >
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-muted-foreground mt-8 text-base/7">
              {content.description}
            </p>
            <p className="text-primary mt-6 text-sm/6">{contact.hours}</p>
          </div>
          <div className="hover:ring-primary/25 ease-editorial relative isolate aspect-2/1 overflow-hidden rounded-xl ring-1 ring-transparent transition-shadow duration-550 motion-reduce:transition-none">
            <ImageWithFallback
              src={content.media.src}
              alt={content.media.alt}
              fill
              sizes="(min-width: 1440px) 600px, (min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              fallback={<EditorialCover label={content.eyebrow} />}
            />
          </div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {contact.offices.map((office) => (
            <li
              key={office.city}
              className="group/office border-border hover:border-primary/30 focus-within:border-primary/30 ease-editorial flex min-w-0 flex-col rounded-xl border bg-slate-50 p-6 transition-[border-color,background-color,box-shadow] duration-500 focus-within:bg-sky-50/70 hover:bg-sky-50/70 hover:shadow-sm motion-reduce:transition-none"
            >
              <MapPin
                aria-hidden="true"
                className="text-primary size-8"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 font-serif text-xl/7">
                {office.city}
                {office.note && ` · ${office.note}`}
              </h3>
              <address className="text-muted-foreground mt-5 text-sm/6 not-italic">
                {office.address}
              </address>
              <a
                className="text-primary mt-auto inline-flex min-h-11 items-center pt-4 text-sm/6 font-semibold underline underline-offset-4"
                href={
                  office.telephone
                    ? `tel:${office.telephone}`
                    : `mailto:${contact.email}`
                }
              >
                <span className="wrap-anywhere">
                  {office.phone ?? contact.email}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
