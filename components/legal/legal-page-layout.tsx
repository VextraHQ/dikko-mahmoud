import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  legalDocuments,
  legalCopy as copy,
  legalPresentation,
  type LegalDocument,
} from "@/content/legal";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { PageTrail } from "@/components/shared/page-trail";

function DocumentLinks({
  current,
  mobile = false,
}: {
  current: string;
  mobile?: boolean;
}) {
  return (
    <nav
      aria-label={mobile ? "Legal documents on mobile" : "Legal documents"}
      className={mobile ? "flex flex-wrap gap-2" : "mt-3 grid gap-2"}
    >
      {legalDocuments.map((document) => (
        <SiteLink
          key={document.key}
          href={document.path}
          aria-current={current === document.key ? "page" : undefined}
          className={cn(
            "ease-editorial flex min-h-11 items-center rounded-lg px-4 py-3 text-sm/6 transition-colors duration-300",
            current === document.key
              ? "bg-primary text-white"
              : "text-primary hover:bg-sky-50",
          )}
        >
          {document.title}
        </SiteLink>
      ))}
    </nav>
  );
}

export function LegalPageLayout({ document }: { document: LegalDocument }) {
  const { sections, updatedAt } = legalPresentation(document);
  return (
    <div className="legal-page mx-auto w-full max-w-360 px-4 pt-8 pb-16 sm:px-8 lg:pt-36 lg:pb-24 xl:px-20 print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 lg:hidden print:hidden">
        <DocumentLinks current={document.key} mobile />
      </div>
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 print:block">
        <article className="max-w-3xl min-w-0 print:max-w-none">
          <PageTrail
            items={[
              { label: copy.homeLabel, href: routes.home },
              { label: document.title },
            ]}
            className="mb-8 print:hidden"
          />
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-serif text-4xl/11 sm:text-6xl/[1.08] print:text-3xl">
            {document.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-base/7">
            {document.description}
          </p>
          <p className="text-muted-foreground mt-5 text-sm/6">
            {updatedAt ? (
              <>
                {copy.updatedLabel}:{" "}
                <time dateTime={updatedAt}>{updatedAt}</time>
              </>
            ) : (
              copy.datePending
            )}
          </p>
          {sections.length ? (
            <div className="mt-10 space-y-9 sm:mt-14">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`legal-${section.id}`}
                  className="break-inside-avoid-page"
                >
                  <h2
                    id={`legal-${section.id}`}
                    className="font-serif text-2xl/8 sm:text-3xl/9"
                  >
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground mt-4 space-y-4 text-base/8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6 text-base/8">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          ) : (
            <section
              className="mt-10 border-l-2 border-sky-200 py-2 pl-6"
              aria-labelledby="legal-pending"
            >
              <h2 id="legal-pending" className="font-serif text-2xl/8">
                {copy.pendingHeading}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm/7">
                {copy.pendingDescription}
              </p>
            </section>
          )}
        </article>
        <aside className="border-border hidden rounded-xl border p-5 lg:sticky lg:top-28 lg:block print:hidden">
          <p className="text-muted-foreground text-xs/5 font-semibold tracking-wider uppercase">
            {copy.navHeading}
          </p>
          <DocumentLinks current={document.key} />
        </aside>
      </div>
    </div>
  );
}
