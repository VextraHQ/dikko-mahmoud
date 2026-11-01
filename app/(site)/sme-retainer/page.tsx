import { RetainerSection } from "@/components/sme/retainer-section";
import { smeRetainer } from "@/content/sme";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "SME retainer",
  description: smeRetainer.description,
  path: routes.smeRetainer,
});
export default function SmeRetainerPage() {
  return <RetainerSection />;
}
