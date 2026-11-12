import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  legalDocuments,
  legalCopy as copy,
  legalPresentation,
  type LegalDocument,
} from "@/content/legal";
import { cn } from "@/lib/utils";

/**
 * The legal documents, styled like the "On this page" cards: a rail with the
 * current document marked in navy. The same list serves desktop (sticky
 * sidebar) and phones (a card after the text).
 */
function DocumentLinks({ current }: { current: string }) {
  return (
    <nav aria-label={copy.navHeading} className="mt-4">
      <ul className="border-l border-slate-200">
        {legalDocuments.map((document) => (
          <li key={document.key}>
            <SiteLink
              href={document.path}
              aria-current={current === document.key ? "page" : undefined}
              className={cn(
                "text-muted-foreground hover:text-primary -ml-px flex min-h-11 items-center border-l-2 border-transparent py-2 pr-2 pl-4 text-sm/6 transition-colors duration-200 hover:border-slate-300 motion-reduce:transition-none",
                current === document.key &&
                  "text-primary border-primary hover:border-primary font-medium",
              )}
            >
              {document.title}
            </SiteLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LegalPageLayout({ document }: { document: LegalDocument }) {
  const { sections, updatedAt } = legalPresentation(document);
  return (
    <div className="legal-page mx-auto w-full max-w-360 px-4 pt-8 pb-16 sm:px-8 lg:pt-36 lg:pb-24 xl:px-20 print:max-w-none print:px-0 print:py-0">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 print:block">
        <article className="max-w-3xl min-w-0 print:max-w-none">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="type-title mt-6 font-serif print:text-3xl">
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
                    className="type-subsection font-serif"
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
              <h2 id="legal-pending" className="type-subsection font-serif">
                {copy.pendingHeading}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm/7">
                {copy.pendingDescription}
              </p>
            </section>
          )}
        </article>
        {/* After the text on phones; a sticky sidebar from lg. */}
        <aside className="border-border rounded-xl border bg-slate-50 p-6 lg:sticky lg:top-28 print:hidden">
          <Eyebrow>{copy.navHeading}</Eyebrow>
          <DocumentLinks current={document.key} />
        </aside>
      </div>
    </div>
  );
}
