import { renderShareCard } from "@/components/system/share-card";
import { firmBrand } from "@/content/firm";
import { getPractice } from "@/content/practice-catalogue";
import { practiceCopy } from "@/content/practice-index";

// The practice area's branded share image.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const practice = getPractice((await params).slug);
  if (!practice) return new Response("Not found", { status: 404 });

  return renderShareCard({
    section: `${practiceCopy.hubLabel} · ${practice.category}`,
    title: practice.title,
    detail: firmBrand.descriptor,
  });
}
