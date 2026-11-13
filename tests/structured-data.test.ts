import { describe, expect, it } from "vitest";
import { contact } from "@/content/contact";
import { firmStructuredData } from "@/lib/structured-data";

describe("firm structured data", () => {
  it("is withheld while the site is not indexable", () => {
    expect(firmStructuredData("https://example.test", false)).toBeNull();
  });

  it("describes the firm only with facts from content", () => {
    const data = firmStructuredData("https://example.test", true)!;
    expect(data["@type"]).toBe("LegalService");
    expect(data.email).toBe(contact.email);
    expect(data.address.map((address) => address.addressLocality)).toEqual(
      contact.offices.map((office) => office.city),
    );
    expect(data.logo).toBe("https://example.test/brand/navy-logo.png");
  });
});
