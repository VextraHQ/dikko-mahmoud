"use server";

import { enquirySchema, type EnquiryResult } from "@/lib/enquiry";

/**
 * Receives a Contact enquiry. Preview checkpoint: it validates the enquiry
 * with the form's own schema and sends nothing. Email delivery (Resend, React
 * Email), spam checks and rate limiting replace the marked step later; the
 * form does not change. See docs/routes/contact.md.
 */
export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { status: "invalid" };

  // Delivery goes here at the integration checkpoint.
  return { status: "received", preview: true };
}
