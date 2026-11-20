import { notFound } from "next/navigation";
import { AwardsArchiveSection } from "@/components/firm/awards-archive-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { awardsArchive as copy } from "@/content/awards";
import { awardList } from "@/lib/awards";
import { createPageMetadata } from "@/lib/metadata";
import { previewOptions } from "@/lib/preview";
import { routes } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: copy.title,
  description: copy.introduction,
  path: routes.awards,
});

export default function AwardsPage() {
  const awards = awardList(previewOptions, { slots: copy.slotCount });
  if (!awards.length) notFound();
  return (
    <>
      <AwardsArchiveSection awards={awards} />
      <EnquiryCta />
    </>
  );
}
