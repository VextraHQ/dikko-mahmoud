import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileBody } from "@/components/people/profile-body";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { PersonCard } from "@/components/shared/person-card";
import { profileCopy } from "@/content/profiles";
import { profileMetadata } from "@/lib/people/profile-metadata";
import {
  profileSlugs,
  relatedProfiles,
  resolveProfile,
} from "@/lib/people/profiles";
import { previewOptions } from "@/lib/preview";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return profileSlugs(previewOptions).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return profileMetadata(params);
}

// Unknown, withheld or (after launch) unapproved slugs are a real 404 inside
// the single (site) shell. Standalone profile for direct visits, refreshes,
// new tabs and no-JS.
export default async function PersonPage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveProfile(slug, previewOptions);
  if (!resolved) notFound();
  const related = relatedProfiles(slug, previewOptions);
  return (
    <>
      <ProfileBody resolved={resolved} variant="page" />
      {related.length ? (
        <section
          aria-labelledby="more-people-heading"
          className="mx-auto w-full max-w-360 px-4 pt-20 sm:px-8 lg:pt-28 xl:px-20"
        >
          <h2 id="more-people-heading" className="type-section font-serif">
            {profileCopy.morePeopleHeading}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:mt-10">
            {related.map((person) => (
              <li key={person.id}>
                {/* A full page load, so one profile page leads to another
                    rather than opening a popup over it. */}
                <PersonCard
                  person={person}
                  fullPageLoad
                  portraitClassName="aspect-6/5"
                  imageHoverOnly
                  sizes="(min-width: 1440px) 400px, (min-width: 640px) 30vw, 46vw"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <EnquiryCta />
    </>
  );
}
