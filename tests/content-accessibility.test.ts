import { describe, expect, it } from "vitest";

import { practiceIndex } from "@/content/practice-index";
import { people } from "@/content/people";
import { firmHero, firmHomePreview, firmPresence } from "@/content/firm";
import { contactHero } from "@/content/contact-page";
import { faqs, visibleFaqs } from "@/content/faqs";

/**
 * Accessibility rules for content images:
 * - Every image with a src must have an alt string (even if empty for
 *   decorative images).
 * - Informative images should have meaningful alt text.
 * - Decorative images should explicitly use alt="".
 */

describe("content images have alt attributes", () => {
  it("practice index images have alt when present", () => {
    for (const practice of practiceIndex) {
      if (practice.image) {
        expect(practice.image.alt).toBeDefined();
        expect(typeof practice.image.alt).toBe("string");
      }
    }
  });

  it("people portraits have alt when present", () => {
    for (const person of people) {
      if (person.portrait) {
        expect(person.portrait.alt).toBeDefined();
        expect(typeof person.portrait.alt).toBe("string");
      }
    }
  });

  it("firm home preview images have alt", () => {
    if (firmHomePreview.media.office.src) {
      expect(firmHomePreview.media.office.alt).toBeDefined();
    }
    if (firmHomePreview.media.portrait.src) {
      expect(firmHomePreview.media.portrait.alt).toBeDefined();
    }
  });

  it("firm hero poster has alt", () => {
    expect(firmHero.poster.alt).toBeDefined();
    expect(typeof firmHero.poster.alt).toBe("string");
  });

  it("contact hero image has alt", () => {
    expect(contactHero.image.alt).toBeDefined();
    expect(typeof contactHero.image.alt).toBe("string");
  });

  it("firm presence media has alt", () => {
    expect(firmPresence.media.alt).toBeDefined();
    expect(typeof firmPresence.media.alt).toBe("string");
  });

  it("FAQ media has alt when present", () => {
    const items = visibleFaqs(faqs);
    for (const item of items) {
      if (item.media && item.media.src) {
        expect(item.media.alt).toBeDefined();
        expect(typeof item.media.alt).toBe("string");
      }
    }
  });

  it("empty alt strings are explicitly decorative (no leading text)", () => {
    // contactHero uses alt="" intentionally for a background hero image
    expect(contactHero.image.alt).toBe("");
  });
});
