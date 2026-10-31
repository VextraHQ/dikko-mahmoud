import Link from "next/link";
import { SiteLink } from "@/components/layout/site-link";
import { StatusPage } from "@/components/shared/status-page";
import { ArrowButton } from "@/components/ui/arrow-button";
import { systemPages } from "@/content/system-pages";
import { routes } from "@/lib/routes";

const content = systemPages.notFound;

// Boundary adapters decide whether the site shell is already present.
export function NotFoundView() {
  return (
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
  );
}
