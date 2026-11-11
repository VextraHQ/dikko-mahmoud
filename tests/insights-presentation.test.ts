import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FilterSelect } from "@/components/shared/filter-select";
import { CompactArticleCard } from "@/components/insights/article-card";
import { resolveInsight } from "@/lib/insights/repository";

describe("filter form progressive enhancement", () => {
  it("server-renders one named, labelled native field with the selected option", () => {
    const html = renderToStaticMarkup(
      createElement(FilterSelect, {
        id: "practice",
        name: "practice",
        label: "Practice area",
        value: "energy",
        options: [
          { value: "", label: "All practice areas" },
          { value: "energy", label: "Energy, Oil & Gas" },
        ],
        sheet: true,
      }),
    );
    expect(html).toMatch(/<select[^>]*name="practice"/);
    expect(html).toContain('aria-label="Practice area"');
    expect(html).toMatch(/<option[^>]*value="energy"[^>]*selected=""/);
    expect(html.match(/name="practice"/g)).toHaveLength(1);
    expect(html).not.toContain('type="hidden"');
    expect(html).not.toContain('role="combobox"');
  });
});

describe("compact article attribution", () => {
  it.each([false, true])("retains authors with brief=%s", (brief) => {
    const article = resolveInsight("patent-registration-nigeria", {
      allowPreview: true,
    })!;
    const html = renderToStaticMarkup(
      createElement(CompactArticleCard, { article, brief }),
    );
    expect(html).toContain("data-insight-byline");
    for (const author of article.authors) expect(html).toContain(author.name);
  });
});
