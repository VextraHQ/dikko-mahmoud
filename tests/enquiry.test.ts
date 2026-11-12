import { describe, expect, it } from "vitest";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import { emptyEnquiry, enquirySchema, practiceFromQuery } from "@/lib/enquiry";

const valid = {
  ...emptyEnquiry(),
  reason: "legal" as const,
  name: "Test Sender",
  email: "sender@example.com",
  message: "A short overview of the matter with enough detail.",
};

function errors(input: unknown) {
  const result = enquirySchema.safeParse(input);
  return result.success
    ? []
    : result.error.issues.map((issue) => issue.path.join("."));
}

describe("enquiry form rules", () => {
  it("accepts the required fields alone", () => {
    expect(errors(valid)).toEqual([]);
  });

  it("requires a reason, name, valid email and a real message", () => {
    expect(
      errors({ ...emptyEnquiry(), email: "sender@", message: "Help" }),
    ).toEqual(["reason", "name", "email", "message"]);
  });

  it("checks optional phone numbers only when given", () => {
    expect(errors({ ...valid, phone: "+234 701 129 9994" })).toEqual([]);
    expect(errors({ ...valid, phone: "call me" })).toEqual(["phone"]);
    expect(errors({ ...valid, phone: "+234" })).toEqual(["phone"]);
  });

  it("only accepts areas of law from the catalogue", () => {
    expect(
      errors({ ...valid, practice: "litigation-dispute-resolution" }),
    ).toEqual([]);
    expect(errors({ ...valid, practice: "tax" })).toEqual(["practice"]);
  });

  it("drops the area of law for reasons other than legal matters", () => {
    const result = enquirySchema.parse({
      ...valid,
      reason: "partnership",
      practice: "litigation-dispute-resolution",
    });
    expect(result.practice).toBe("");
  });

  it("asks for a topic only when the reason is something else", () => {
    expect(errors({ ...valid, reason: "other" })).toEqual(["topic"]);
    expect(errors({ ...valid, reason: "other", topic: "Invoice" })).toEqual([]);
    expect(enquirySchema.parse({ ...valid, topic: "Invoice" }).topic).toBe("");
  });

  it("shows the topic error alongside other errors", () => {
    expect(errors({ ...emptyEnquiry(), reason: "other" })).toContain("topic");
  });

  it("rejects malformed submissions without throwing", () => {
    for (const input of [
      null,
      undefined,
      "text",
      { ...valid, reason: "other", topic: undefined },
      { ...valid, reason: "other", topic: null },
    ]) {
      expect(enquirySchema.safeParse(input).success).toBe(false);
    }
  });

  it("rejects submissions that fill the hidden honeypot", () => {
    expect(errors({ ...valid, website: "spam.example" })).toEqual(["website"]);
  });
});

describe("practice arrivals", () => {
  it("keeps catalogue slugs and ignores anything else", () => {
    expect(practiceFromQuery("litigation-dispute-resolution")).toBe(
      "litigation-dispute-resolution",
    );
    expect(practiceFromQuery(["litigation-dispute-resolution", "x"])).toBe(
      "litigation-dispute-resolution",
    );
    expect(practiceFromQuery("<script>")).toBe("");
    expect(practiceFromQuery(undefined)).toBe("");
  });

  it("starts a practice arrival as a legal matter", () => {
    expect(emptyEnquiry("litigation-dispute-resolution")).toMatchObject({
      reason: "legal",
      practice: "litigation-dispute-resolution",
    });
  });
});

describe("preview enquiry action", () => {
  it("answers invalid for malformed input instead of failing", async () => {
    await expect(submitEnquiry(null)).resolves.toEqual({ status: "invalid" });
    await expect(
      submitEnquiry({ ...valid, reason: "other", topic: null }),
    ).resolves.toEqual({ status: "invalid" });
  });

  it("receives a valid enquiry as a preview", async () => {
    await expect(submitEnquiry(valid)).resolves.toEqual({
      status: "received",
      preview: true,
    });
  });
});
