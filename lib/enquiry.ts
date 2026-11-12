import { z } from "zod";
import { enquiryReasons, type EnquiryReasonId } from "@/content/contact-page";
import { practiceIndex } from "@/content/practice-index";

// The Contact form's rules, shared by the form (in the browser) and the
// Server Action (on the server), so both check exactly the same things.

const reasonIds = enquiryReasons.map((reason) => reason.id) as [
  EnquiryReasonId,
  ...EnquiryReasonId[],
];
const practiceSlugs = practiceIndex.map((practice) => practice.slug);

export const messageLimits = { min: 20, max: 2000 };

const phonePattern = /^\+?[\d\s()-]+$/;

function reasonOf(input: unknown) {
  return typeof input === "object" && input !== null && "reason" in input
    ? input.reason
    : undefined;
}

function hasTopic(input: unknown) {
  const topic =
    typeof input === "object" && input !== null && "topic" in input
      ? input.topic
      : undefined;
  return typeof topic === "string" && topic.trim().length >= 2;
}

export const enquirySchema = z
  .object({
    reason: z.enum(reasonIds, { error: "Choose what your enquiry is about." }),
    practice: z
      .string()
      .refine((slug) => slug === "" || practiceSlugs.includes(slug), {
        error: "Choose an area of law from the list.",
      }),
    // Required only for "Something else" (see the refine below).
    topic: z.string().trim().max(120, "Keep this under 120 characters."),
    name: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Keep your name under 120 characters."),
    email: z
      .string()
      .trim()
      .email("Enter an email address like name@example.com."),
    phone: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" ||
          (phonePattern.test(value) && value.replace(/\D/g, "").length >= 7),
        { error: "Enter a phone number using digits, spaces or +." },
      ),
    organisation: z
      .string()
      .trim()
      .max(160, "Keep the organisation under 160 characters."),
    message: z
      .string()
      .trim()
      .min(
        messageLimits.min,
        `Tell us a little more (at least ${messageLimits.min} characters).`,
      )
      .max(
        messageLimits.max,
        `Keep your message under ${messageLimits.max} characters.`,
      ),
    // Hidden from people; bots that fill every field reveal themselves here.
    website: z.string().max(0),
  })
  // "Something else" needs a one-line topic. `when` runs this check even
  // while other fields still have errors, so every error shows at once. That
  // also means it can see malformed input (null, a missing topic), so it
  // reads carefully instead of assuming the shape.
  .refine((values) => hasTopic(values), {
    path: ["topic"],
    error: "Tell us briefly what it is about.",
    when: (payload) => reasonOf(payload.value) === "other",
  })
  // An area of law only applies to legal matters; a topic only to "other".
  .transform((values) => ({
    ...values,
    practice: values.reason === "legal" ? values.practice : "",
    topic: values.reason === "other" ? values.topic : "",
  }));

export type EnquiryValues = z.input<typeof enquirySchema>;

export function emptyEnquiry(practice = ""): EnquiryValues {
  return {
    reason: (practice ? "legal" : "") as EnquiryReasonId,
    practice,
    topic: "",
    name: "",
    email: "",
    phone: "",
    organisation: "",
    message: "",
    website: "",
  };
}

/** A practice slug from the URL, kept only when it is in the catalogue. */
export function practiceFromQuery(value: string | string[] | undefined) {
  const slug = Array.isArray(value) ? value[0] : value;
  return slug && practiceSlugs.includes(slug) ? slug : "";
}

export type EnquiryResult =
  | { status: "received"; preview: true }
  | { status: "invalid" }
  | { status: "failed" };
