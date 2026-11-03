import { Suspense } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DirectoryBrowser } from "@/components/people/directory-browser";
import { DirectoryView } from "@/components/people/directory-view";
import { DirectoryLeadershipSection } from "@/components/people/directory-leadership-section";
import { peopleDirectory as copy } from "@/content/people";
import {
  peopleDirectoryLeadership,
  type PeopleDirectoryData,
} from "@/content/people-directory";
import { emptyFilters } from "@/lib/people-directory";

/**
 * Compact navy introduction followed by an editorial feature and directory.
 * Cards are the shared PersonCard, so they open the
 * profile popup with the page kept in place beneath it.
 *
 * The page stays static. The browser reads filters from the URL, so the live
 * directory sits in Suspense; its fallback is the same view with no filters,
 * which is what the static HTML (and a reader without JavaScript) gets.
 */
export function DirectorySection({ data }: { data: PeopleDirectoryData }) {
  const featured = peopleDirectoryLeadership(
    { allowPreview: data.preview },
    data.people,
  );
  const leadership = featured ? (
    <DirectoryLeadershipSection {...featured} />
  ) : null;
  const featuredPersonId = featured?.person.id;
  return (
    <>
      <section
        aria-labelledby="people-directory-heading"
        className="bg-navy-deep text-white"
      >
        <div className="mx-auto grid w-full max-w-360 gap-6 px-4 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-20 lg:pt-36 lg:pb-14 xl:px-20">
          <div>
            <Eyebrow className="text-white/80">{copy.eyebrow}</Eyebrow>
            <h1
              id="people-directory-heading"
              className="mt-4 font-serif text-4xl/[1.1] text-balance sm:text-6xl/[1.04] lg:text-[clamp(2.5rem,4.15vw,4rem)]/[1.04]"
            >
              {copy.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="max-w-md text-base/7 text-white/75 lg:justify-self-end lg:pb-1 lg:text-lg/8">
            {copy.description}
          </p>
        </div>
      </section>

      {/* Without JavaScript the toolbar can't filter, so don't show it. */}
      <noscript>
        <style>
          {
            "[data-directory-toolbar]{display:none}[data-directory-results]{padding-top:2.5rem}"
          }
        </style>
      </noscript>
      <Suspense
        fallback={
          <DirectoryView
            data={data}
            filters={emptyFilters}
            leadership={leadership}
            featuredPersonId={featuredPersonId}
          />
        }
      >
        <DirectoryBrowser
          data={data}
          leadership={leadership}
          featuredPersonId={featuredPersonId}
        />
      </Suspense>
    </>
  );
}
