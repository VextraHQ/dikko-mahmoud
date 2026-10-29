import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialIcon } from "@/components/layout/social-icon";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { contact } from "@/content/contact";
import { firmBrand } from "@/content/firm";
import { footer } from "@/content/footer";
import { navigation } from "@/content/navigation";

const footerLinkClass =
  "inline-flex min-h-11 items-center rounded-sm text-sm/6 text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white sm:min-h-9";

function FooterLink({
  label,
  href,
  available,
}: {
  label: string;
  href: string;
  available?: boolean;
}) {
  const routeAvailable =
    available ??
    navigation.some((item) => item.href === href && item.available);
  return routeAvailable ? (
    <Link href={href} className={footerLinkClass}>
      {label}
    </Link>
  ) : (
    <PreviewDestination>
      <button type="button" className={footerLinkClass}>
        {label}
      </button>
    </PreviewDestination>
  );
}

export function SiteFooter() {
  return (
    <footer id="site-footer" className="bg-navy-deep text-white">
      <div className="mx-auto w-full max-w-360 px-4 pt-24 pb-8 sm:px-8 sm:pt-32 lg:pt-48 lg:pb-10 xl:px-20">
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
                    {office.address}
                  </p>
                  {office.note && (
                    <p className="text-white/65">{office.note}</p>
                  )}
                  {office.telephone && (
                    <a
                      href={`tel:${office.telephone}`}
                      className="inline-flex min-h-9 items-center rounded-sm underline-offset-4 hover:text-white hover:underline"
                    >
                      {office.phone}
                    </a>
                  )}
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
                <div key={group.title}>
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
                <ul className="mt-3 flex flex-wrap gap-3">
                  {footer.socialLinks.map((social) => (
                    <li key={social.label}>
                      {social.href ? (
                        <a
                          href={social.href}
                          aria-label={social.label}
                          className="text-navy-deep flex size-11 items-center justify-center rounded-full bg-white text-sm font-bold transition-colors hover:bg-sky-100"
                        >
                          <SocialIcon platform={social.platform} />
                        </a>
                      ) : (
                        <PreviewDestination>
                          <button
                            type="button"
                            aria-label={`${social.label} — profile being prepared`}
                            className="text-navy-deep flex size-11 items-center justify-center rounded-full bg-white text-sm font-bold transition-colors hover:bg-sky-100"
                          >
                            <SocialIcon platform={social.platform} />
                          </button>
                        </PreviewDestination>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm/6 text-white/65">
                  {footer.contactHeading}
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-sm/6 text-white/85 underline-offset-4 hover:text-white hover:underline"
                >
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 shrink-0"
                  />
                  <span className="min-w-0 wrap-anywhere">{contact.email}</span>
                </a>
              </div>
              <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
                <PreviewDestination>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center gap-3 border-b border-sky-300 pb-1 text-left text-sm/6 text-white/85 transition-colors hover:border-white hover:text-white"
                  >
                    {footer.consultationAction}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 shrink-0"
                    />
                  </button>
                </PreviewDestination>
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
