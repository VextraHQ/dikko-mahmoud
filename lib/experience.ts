import { experienceRecords, type ExperienceRecord } from "@/content/experience";
import { matterManifest, matterStatus } from "@/content/matter-manifest";
import { matterRecords } from "@/content/matters";
import { practiceIndex } from "@/content/practice-index";
import { hasText } from "@/lib/content";
import { isPublishable, type PreviewOptions } from "@/lib/publication";

// SERVER ONLY: reads the draft instruction bodies in content/experience.ts.
// Import from route pages, server components and tests.

export function isCompleteExperience(
  record: ExperienceRecord | undefined,
): record is ExperienceRecord {
  return (
    !!record &&
    [record.category, record.summary, record.involvement].every(hasText) &&
    record.instructions.length > 0 &&
    record.instructions.every((item) =>
      [item.title, item.description, item.role].every(hasText),
    )
  );
}

/** One consent boundary for the listing, detail body and detail metadata. */
export function resolveExperience(
  id: string,
  options: PreviewOptions,
  records = experienceRecords,
  manifest = matterManifest,
) {
  const status = matterStatus(id, manifest);
  if (!isPublishable(status, options)) return null;
  const matter = matterRecords.find((entry) => entry.id === id);
  const record = records.find((entry) => entry.matterId === id);
  if (!matter || !hasText(matter.organisation) || !isCompleteExperience(record))
    return null;
  return {
    ...record,
    organisation: matter.organisation,
    preview: status === "pending",
    practices: practiceIndex.filter((practice) =>
      record.practiceSlugs.includes(practice.slug),
    ),
  };
}

export function getExperiences(options: PreviewOptions) {
  return experienceRecords.flatMap((record) => {
    const experience = resolveExperience(record.matterId, options);
    return experience ? [experience] : [];
  });
}

export type Experience = NonNullable<ReturnType<typeof resolveExperience>>;
