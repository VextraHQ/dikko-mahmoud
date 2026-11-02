import { siteConfig } from "@/content/site";
import type { PreviewOptions } from "@/lib/publication";

/**
 * The single server-side preview switch. While the site is no-index, complete
 * source-backed drafts may render with a review note; once `indexable` is on,
 * only approved records publish. Lives here (not in content/people.ts) to
 * avoid the siteConfig → firm → people import cycle.
 */
export const previewOptions: PreviewOptions = {
  allowPreview: !siteConfig.indexable,
};
