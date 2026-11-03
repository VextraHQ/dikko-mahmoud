import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { profileCopy as copy } from "@/content/profiles";
import {
  profileSectionIds as ids,
  type ResolvedProfile,
} from "@/lib/people/profiles";
import { cn } from "@/lib/utils";

/**
 * Overview, areas of focus, qualifications and the closing enquiry panel, in
 * the same order for popup and page. Section headings sit one level below the
 * profile heading in either presentation.
 *
 * The page stacks them beside its sticky contents list. The popup has no such
 * list, so from `lg` the short focus and qualifications lists move into a side
 * column aligned with the intro's portrait, and the enquiry spans both. Phones
 * keep the stacked order in both.
 */
export function ProfileSections({
  resolved,
  variant,
}: {
  resolved: ResolvedProfile;
  variant: "dialog" | "page";
}) {
  const { profile, shortName, personalEmail } = resolved;
  const Heading = variant === "dialog" ? "h3" : "h2";
  const dialog = variant === "dialog";
  const section =
    "scroll-mt-28 border-border border-t pt-10 mt-10 lg:pt-12 lg:mt-12";

  return (
    <div
      className={cn(
        "min-w-0",
        // Same columns and gap as the dialog intro, so the side column lines
        // up under the portrait.
        dialog &&
          "lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-x-12",
      )}
    >
      <section
        id={ids.overview}
        aria-labelledby={`${ids.overview}-heading`}
        className="scroll-mt-28"
      >
        <Eyebrow>{copy.overviewLabel}</Eyebrow>
        <Heading
          id={`${ids.overview}-heading`}
          className="mt-5 font-serif text-[2rem]/10 text-balance sm:text-5xl/[1.1]"
        >
          {copy.overviewHeading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </Heading>
        <div className="text-muted-foreground mt-8 max-w-3xl space-y-5 text-base/7">
          {profile.biography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div
        className={cn(
          dialog &&
            "lg:[&>section:first-child]:mt-0 lg:[&>section:first-child]:border-t-0 lg:[&>section:first-child]:pt-0",
        )}
      >
        {profile.focus?.length ? (
          <section
            id={ids.focus}
            aria-labelledby={`${ids.focus}-heading`}
            className={section}
          >
            <Eyebrow as={Heading} id={`${ids.focus}-heading`}>
              {copy.focusLabel}
            </Eyebrow>
            <ul className="mt-4">
              {profile.focus.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "border-border text-primary border-b py-4 font-serif text-xl/7 last:border-b-0 sm:py-5",
                    !dialog && "sm:text-2xl/8",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {profile.qualifications?.length ? (
          <section
            id={ids.qualifications}
            aria-labelledby={`${ids.qualifications}-heading`}
            className={section}
          >
            <Eyebrow as={Heading} id={`${ids.qualifications}-heading`}>
              {copy.qualificationsLabel}
            </Eyebrow>
            <ul className="mt-6 space-y-4 text-sm/6 text-slate-700 sm:text-[15px]/6">
              {profile.qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <section
        id={ids.contact}
        aria-labelledby={`${ids.contact}-heading`}
        className={cn(
          "mt-12 scroll-mt-28 rounded-xl bg-sky-50 p-6 sm:p-8 lg:mt-16 lg:p-10",
          dialog && "lg:col-span-2",
        )}
      >
        <Eyebrow>{copy.workingEyebrow}</Eyebrow>
        <Heading
          id={`${ids.contact}-heading`}
          className="mt-4 font-serif text-2xl/8 sm:text-3xl/10"
        >
          {copy.contactHeading}
        </Heading>
        <p className="text-muted-foreground mt-4 max-w-2xl text-sm/6 sm:text-base/7">
          {copy.contactDescription}
        </p>
        <EnquiryButton size="sm" className="mt-6" />
        {personalEmail && (
          <p className="text-muted-foreground mt-5 text-sm/6">
            {copy.directEmail(shortName)}{" "}
            <a
              href={`mailto:${personalEmail}`}
              className="text-primary decoration-primary/40 break-all underline underline-offset-4 hover:decoration-current"
            >
              {personalEmail}
            </a>
          </p>
        )}
      </section>
    </div>
  );
}
