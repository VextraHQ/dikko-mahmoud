import { describe, expect, it } from "vitest";
import { keepTogether } from "@/lib/typography";

const nbsp = " ";

describe("keepTogether", () => {
  it("keeps initials with the surname and post-nominals with the name", () => {
    expect(keepTogether("A.B. Mahmoud, SAN")).toBe(
      `A.B.${nbsp}Mahmoud,${nbsp}SAN`,
    );
  });

  it("keeps street and section numbers with their label", () => {
    expect(keepTogether("No. 10 Seguela Street")).toBe(
      `No.${nbsp}10 Seguela Street`,
    );
    expect(keepTogether("under s. 1(1)")).toBe(`under s.${nbsp}1(1)`);
  });

  it("uses an en dash for year ranges", () => {
    expect(keepTogether("1993 - 2026 and 2001-2016")).toBe(
      "1993–2026 and 2001–2016",
    );
  });

  it("leaves ordinary sentences alone", () => {
    const text = "Abuja, Kano and Lagos offices. Call us on 0701.";
    expect(keepTogether(text)).toBe(text);
  });
});
