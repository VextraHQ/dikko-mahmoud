import { SocialLinks } from "@/components/layout/social-links";
import { CopyEmailButton } from "@/components/contact/copy-email-button";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { contact } from "@/content/contact";
import { contactPanel as copy } from "@/content/contact-page";
import { cn } from "@/lib/utils";

const link =
  "hover:text-primary hover:decoration-primary underline decoration-slate-300 underline-offset-4 transition-colors";

/**
 * Direct ways to reach the firm. Phones show the essentials (email, office
 * phones, hours) above the form; desktop adds presence, social profiles and
 * the note on what not to send, and keeps the panel in view.
 */
export function ContactPanel() {
  const phoneOffices = contact.offices.filter((office) => office.telephone);
  return (
    <aside
      aria-labelledby="contact-panel-heading"
      className="border-border rounded-2xl border bg-slate-50 p-5 sm:p-6 lg:sticky lg:top-28 lg:p-7"
    >
      <h2 id="contact-panel-heading" className="type-subsection font-serif">
        {copy.heading}
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="sm:col-span-2 lg:col-span-1">
          <dt className={cn(eyebrowClass, "text-muted-foreground")}>
            {copy.emailLabel}
          </dt>
          <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href={`mailto:${contact.email}`} className={link}>
              {contact.email}
            </a>
            <CopyEmailButton email={contact.email} />
          </dd>
        </div>
        {phoneOffices.map((office) => (
          <div key={office.city}>
            <dt className={cn(eyebrowClass, "text-muted-foreground")}>
              {copy.officeLabel(office.city)}
            </dt>
            <dd className="mt-1">
              <a
                href={`tel:${office.telephone}`}
                className={cn(link, "tabular-nums")}
              >
                {office.phone}
              </a>
            </dd>
          </div>
        ))}
        <div>
          <dt className={cn(eyebrowClass, "text-muted-foreground")}>
            {copy.hoursLabel}
          </dt>
          <dd className="mt-1">{contact.hours}</dd>
        </div>
        <div>
          <dt className={cn(eyebrowClass, "text-muted-foreground")}>
            {copy.presenceLabel}
          </dt>
          <dd className="mt-1">{contact.officeSummary}</dd>
        </div>
      </dl>
      <div className="mt-6">
        <h3 className="text-sm/6 font-semibold">{copy.socialHeading}</h3>
        <SocialLinks
          className="mt-2 gap-2"
          itemClassName="text-primary border-border border bg-white hover:bg-sky-50"
        />
      </div>
      <div className="border-border mt-6 border-t pt-5">
        <h3 className="text-sm/6 font-semibold">{copy.beforeHeading}</h3>
        <p className="text-muted-foreground mt-1 text-sm/6">
          {copy.beforeText}
        </p>
      </div>
    </aside>
  );
}
