"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { practiceTitle } from "@/content/practice-index";
import { practiceFromQuery, type EnquiryResult } from "@/lib/enquiry";

/**
 * The enquiry form for a visitor arriving from a practice page: it reads
 * `?practice=<slug>` from the address and preselects that area of law.
 *
 * Reading the address here, in the browser, lets the Contact page be built
 * once instead of on every visit. The page shows a plain `EnquiryForm` until
 * this has loaded (its Suspense fallback).
 */
export function EnquiryArrival({
  submitAction,
}: {
  submitAction: (values: unknown) => Promise<EnquiryResult>;
}) {
  const practice = practiceFromQuery(
    useSearchParams().get("practice") ?? undefined,
  );
  return (
    <EnquiryForm
      key={practice}
      practice={practice}
      arrivalLabel={practiceTitle(practice)}
      submitAction={submitAction}
    />
  );
}
