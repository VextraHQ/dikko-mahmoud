import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contact } from "@/content/contact";
import { contactOffices as copy } from "@/content/contact-page";
import { directionsUrl, mapEmbedUrl } from "@/lib/maps";

/**
 * "Find us": one card per office with a map, address, phone and directions.
 * Maps load only as they near the screen. Until the firm confirms each pin
 * they search by address (docs/routes/contact.md).
 */
export function ContactOfficesSection() {
  return (
    <section
      aria-labelledby="offices-heading"
      className="border-border border-t py-14 lg:py-24"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-8 xl:px-20">
        <h2 id="offices-heading" className="type-section font-serif">
          {copy.heading}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base/7">
          {copy.description}
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          {contact.offices.map((office) => (
            <li
              key={office.city}
              className="border-border flex flex-col overflow-hidden rounded-2xl border bg-white"
            >
              <iframe
                title={copy.mapTitle(office.city)}
                src={mapEmbedUrl(office)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-16/10 w-full border-0 bg-slate-100"
              />
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <Eyebrow className="text-muted-foreground">
                  {office.note ?? copy.officeLabel}
                </Eyebrow>
                <h3 className="type-card mt-2 font-serif">{office.city}</h3>
                <address className="text-muted-foreground mt-2 text-[15px]/6 not-italic">
                  {office.address}, {office.city}
                </address>
                {office.telephone && (
                  <a
                    href={`tel:${office.telephone}`}
                    className="hover:text-primary mt-2 self-start text-[15px]/6 tabular-nums transition-colors"
                  >
                    {office.phone}
                  </a>
                )}
                <a
                  href={directionsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-4 text-sm font-semibold hover:underline hover:underline-offset-4"
                >
                  {copy.directions}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
