"use server";

import { enquirySchema, type EnquiryResult } from "@/lib/enquiry";

/**
 * Receives a Contact enquiry. Email delivery is not connected yet: this
 * validates the enquiry with the form's own schema and sends nothing. Email,
 * spam checks and rate limiting replace the marked step later; the form does
 * not change. Plan: docs/integrations/email.md.
 */
export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { status: "invalid" };

  // Email delivery goes here.
  return { status: "received", preview: true };
}
