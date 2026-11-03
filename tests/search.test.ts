import { describe, expect, it } from "vitest";

import { matchesSearch, normalizeText } from "@/lib/search";

describe("matchesSearch", () => {
  const title = "Patent registration in Nigeria";

  it("matches every word in any order, ignoring case and accents", () => {
    expect(matchesSearch(title, "patent nigeria")).toBe(true);
    expect(matchesSearch(title, "NIGERIA patent")).toBe(true);
    expect(matchesSearch(title, "Nigéria")).toBe(true);
    expect(matchesSearch(title, "patent lagos")).toBe(false);
  });

  it("treats an empty or blank search as matching everything", () => {
    expect(matchesSearch(title, "")).toBe(true);
    expect(matchesSearch(title, "   ")).toBe(true);
  });

  it("reads punctuation the same way as the normalised text", () => {
    expect(normalizeText("Oil & Gas")).toBe("oil gas");
    expect(matchesSearch("Energy & Oil & Gas", "oil-gas")).toBe(true);
  });
});
