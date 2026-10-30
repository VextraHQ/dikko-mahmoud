import { describe, expect, it } from "vitest";

import { formatCount, formatIndex, initialsFrom } from "@/lib/format";

describe("formatCount", () => {
  it("pads single digits to two", () => {
    expect(formatCount(3)).toBe("03");
  });

  it("leaves two or more digits alone", () => {
    expect(formatCount(12)).toBe("12");
    expect(formatCount(100)).toBe("100");
  });
});

describe("formatIndex", () => {
  it("turns a zero-based index into a one-based label", () => {
    expect(formatIndex(0)).toBe("01");
    expect(formatIndex(9)).toBe("10");
  });
});

describe("initialsFrom", () => {
  it("takes the first letter of the first two words", () => {
    expect(initialsFrom("Ada Lovelace")).toBe("AL");
    expect(initialsFrom("Mary Ann Evans")).toBe("MA");
  });

  it("ignores extra whitespace", () => {
    expect(initialsFrom("  Ada   Lovelace ")).toBe("AL");
  });

  it("handles a single name", () => {
    expect(initialsFrom("Plato")).toBe("P");
  });
});
