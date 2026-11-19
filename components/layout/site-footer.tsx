import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { keepTogether } from "@/lib/typography";
import { BrandLogo } from "@/components/layout/brand-logo";
import { drawnUnderlineClass, SiteLink } from "@/components/layout/site-link";
import { SocialLinks } from "@/components/layout/social-links";
import { directionsUrl } from "@/lib/maps";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { contact } from "@/content/contact";
import { firmBrand } from "@/content/firm";
import { footer } from "@/content/footer";

// Footer links brighten and draw their underline in on hover or focus.
const footerLinkClass =
  "group/underline inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm/6 text-sky-200 transition-colors duration-200 ease-editorial motion-reduce:transition-none hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:min-h-9";

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <SiteLink href={href} className={footerLinkClass}>
      <span className={drawnUnderlineClass}>{label}</span>
    </SiteLink>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      data-header-dark
      className="bg-navy-deep text-white"
    >
      <div className="mx-auto w-full max-w-360 px-4 pt-24 pb-8 group-has-[.legal-page]/site-shell:pt-12 sm:px-8 sm:pt-32 lg:pt-48 lg:pb-10 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 xl:grid-cols-[1.1fr_2.5fr]">
          <div className="min-w-0">
            <BrandLogo />
            <p className="mt-5 max-w-sm text-sm/6 text-white/75">
              {footer.description}
            </p>
            <h2 className="mt-6 text-sm/6 text-white/65">
              {footer.officesHeading}
            </h2>
            <address className="mt-3 space-y-4 text-sm/6 text-white/80 not-italic">
              {contact.offices.map((office) => (
                <div key={office.city}>
                  <p>
                    <span className="font-medium text-white">
                      {office.city}:
                    </span>{" "}
                    {keepTogether(office.address)}
                  </p>
                  {office.note && (
                    <p className="text-white/65">{office.note}</p>
                  )}
                  <div className="flex flex-wrap gap-x-5">
                    {office.telephone && (
                      <a
                        href={`tel:${office.telephone}`}
                        className={footerLinkClass}
                      >
                        <Phone
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="size-3.5"
                        />
                        <span className={drawnUnderlineClass}>
                          {office.phone}
                        </span>
                      </a>
                    )}
                    <a
                      href={directionsUrl(office)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={footerLinkClass}
                    >
                      <MapPin
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                      <span className={drawnUnderlineClass}>
                        {footer.directions}
                      </span>
                      <span className="sr-only">
                        {" "}
                        {footer.directionsTo(office.city)}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </address>
            <p className="mt-5 text-xs/5 text-white/65">{contact.hours}</p>
          </div>
          <div className="min-w-0">
            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3"
            >
              {footer.linkGroups.map((group) => (
                <div
                  key={group.title}
                  className={
                    "wide" in group
                      ? "max-lg:order-last max-lg:col-span-2"
                      : undefined
                  }
                >
                  <h2 className="mb-2 text-sm/6 text-white/65">
                    {group.title}
                  </h2>
                  <ul>
                    {group.links.map((item) => (
                      <li key={item.href}>
                        <FooterLink {...item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              <div>
                <h2 className="text-sm/6 text-white/65">
                  {footer.socialHeading}
                </h2>
                <SocialLinks
                  className="mt-3"
                  itemClassName="text-navy-deep bg-white hover:bg-sky-100"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm/6 text-white/65">
                  {footer.contactHeading}
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className={cn(footerLinkClass, "mt-3 max-w-full gap-2")}
                >
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 shrink-0"
                  />
                  <span
                    className={cn(drawnUnderlineClass, "min-w-0 wrap-anywhere")}
                  >
                    {contact.email}
                  </span>
                </a>
              </div>
              <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
                <SiteLink
                  href={routes.contact}
                  className="inline-flex min-h-11 items-center gap-3 border-b border-sky-300 pb-1 text-left text-sm/6 text-white/85 transition-colors hover:border-white hover:text-white"
                >
                  {footer.consultationAction}
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 shrink-0"
                  />
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/25 pt-6 text-center text-xs/5 text-white/65 sm:flex-row sm:justify-between sm:text-left lg:mt-12">
          <p>
            © {new Date().getFullYear()} {firmBrand.name}
          </p>
          <p>{footer.locations}</p>
        </div>
      </div>
    </footer>
  );
}
