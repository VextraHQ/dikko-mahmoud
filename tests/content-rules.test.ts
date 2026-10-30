import { describe, expect, it } from "vitest";

import { hasText, uniqueById } from "@/lib/content";
import { visibleFaqs } from "@/content/faqs";

describe("hasText", () => {
  it("is false for empty, blank or missing values", () => {
    expect(hasText("")).toBe(false);
    expect(hasText("   ")).toBe(false);
    expect(hasText(null)).toBe(false);
    expect(hasText(undefined)).toBe(false);
  });

  it("is true when there are visible characters", () => {
    expect(hasText(" Lagos ")).toBe(true);
  });
});

describe("uniqueById", () => {
  it("keeps the first record for each id, in order", () => {
    const items = [
      { id: "a", n: 1 },
      { id: "b", n: 2 },
      { id: "a", n: 3 },
    ];
    expect(uniqueById(items)).toEqual([
      { id: "a", n: 1 },
      { id: "b", n: 2 },
    ]);
  });
});

describe("visibleFaqs", () => {
  it("drops items missing a question or an answer", () => {
    const items = [
      { id: "ok", question: "Q?", answer: "A." },
      { id: "no-answer", question: "Q?", answer: " " },
      { id: "no-question", question: "", answer: "A." },
    ];
    expect(visibleFaqs(items).map((item) => item.id)).toEqual(["ok"]);
  });
});
