"use client";

import Link from "next/link";
import { StatusPage } from "@/components/shared/status-page";
import { ArrowButton } from "@/components/ui/arrow-button";
import { systemPages } from "@/content/system-pages";
import { useReportError } from "@/hooks/use-report-error";
import { pageTitle } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export type ErrorViewProps = {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the failed segment (Next.js 16.2+). */
  retry: () => void;
};

const content = systemPages.error;

// Shared by app/(site)/error.tsx, app/error.tsx and app/global-error.tsx.
export function ErrorView({ error, retry }: ErrorViewProps) {
  useReportError(error);
  return (
    <>
      {/* Error boundaries can't export metadata; React hoists this tag. */}
      <title>{pageTitle(content.eyebrow)}</title>
      <StatusPage
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        actions={
          <>
            <ArrowButton variant="inverse" onClick={() => retry()}>
              {content.retryAction}
            </ArrowButton>
            <ArrowButton asChild variant="glass">
              <Link href={routes.home}>{content.homeAction}</Link>
            </ArrowButton>
          </>
        }
      />
    </>
  );
}
