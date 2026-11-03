import { notFound } from "next/navigation";
import { DirectorySection } from "@/components/people/directory-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { peopleDirectory } from "@/content/people";
import { peopleDirectoryData } from "@/content/people-directory";
import { createPageMetadata } from "@/lib/metadata";
import { previewOptions } from "@/lib/preview";
import { routes } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: "Our People",
  description: peopleDirectory.description,
  path: routes.people,
});

// Lists the people whose profiles may be linked. With none (for example at
// launch before any profile is approved) the route is not live, so 404.
export default function PeoplePage() {
  const data = peopleDirectoryData(previewOptions);
  if (!data.people.length) notFound();
  return (
    <>
      <DirectorySection data={data} />
      <EnquiryCta />
    </>
  );
}
