import type { Metadata } from "next";
import Link from "next/link";
import { SiteLink } from "@/components/layout/site-link";
import { SiteShell } from "@/components/layout/site-shell";
import { StatusPage } from "@/components/shared/status-page";
import { ArrowButton } from "@/components/ui/arrow-button";
import { systemPages } from "@/content/system-pages";
import { routes } from "@/lib/routes";

const content = systemPages.notFound;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.description,
  robots: { index: false, follow: true },
};

// Unmatched URLs render here, outside the (site) layout, so it adds the shell.
export default function NotFound() {
  return (
    <SiteShell>
      <StatusPage
        mark={content.mark}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        actions={
          <>
            <ArrowButton asChild variant="inverse">
              <Link href={routes.home}>{content.homeAction}</Link>
            </ArrowButton>
            <ArrowButton asChild variant="glass">
              <SiteLink href={routes.practiceAreas}>
                {content.practiceAreasAction}
              </SiteLink>
            </ArrowButton>
          </>
        }
      />
    </SiteShell>
  );
}
