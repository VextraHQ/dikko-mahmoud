import {
  bulletList,
  figure,
  heading,
  numberedList,
  paragraph,
  quote,
  table,
  takeaways,
} from "@/lib/insights/blocks";
import { demoInsightIndex, insightImages } from "@/content/insight-articles";
import type {
  InsightBlock,
  InsightReference,
  InsightSource,
} from "@/types/insights";

// SERVER DATA: layout samples written in Portable Text, the shape Sanity will
// store. They describe ways of working, never legal conclusions, fees or
// deadlines. Replace with approved firm writing before launch.

type ArticleContent = { body: InsightBlock[]; references: InsightReference[] };

const wipo: InsightReference = {
  id: "wipo",
  title: "Patents",
  publisher: "World Intellectual Property Organization",
  href: "https://www.wipo.int/en/web/patents",
};

/** Hand-written samples for the featured and homepage articles. */
const written: Record<string, ArticleContent> = {
  "patent-registration-nigeria": {
    references: [wipo],
    body: [
      paragraph(
        "intro",
        "A patent conversation usually starts long before an application is drafted. The useful first step is a clear, dated description of what the invention does and how it differs from what already exists.",
      ),
      paragraph(
        "intro-source",
        "For a plain-language overview of what a patent is and what it protects, ",
        { cite: "WIPO's patents guide", reference: "wipo" },
        " is a good neutral starting point before a specialist review.",
      ),
      heading("before", "Before the first meeting"),
      paragraph(
        "before-text",
        "Bring material that shows the ",
        { strong: "development history" },
        ", not only the finished product. Early sketches, lab notes and version records help explain when an idea took shape and who contributed to it.",
      ),
      ...numberedList("before-steps", [
        "Write a one-page description in everyday language.",
        "List everyone who contributed, with their role and dates.",
        "Note any public demonstration, publication or sale so far.",
        "Collect agreements that mention ownership of the work.",
      ]),
      figure(
        "desk",
        insightImages.signingDocument,
        "Ownership questions are often answered by documents signed long before the invention was finished.",
      ),
      heading("reading-file", "Building a reading file"),
      paragraph(
        "reading-file-text",
        "A short, consistent file lets an adviser review the right material quickly. The structure below is a sample, not a filing checklist.",
      ),
      table(
        "reading-table",
        "A sample structure for a reading file",
        ["Section", "What it holds", "Why it helps"],
        [
          [
            "Description",
            "Plain-language summary and drawings",
            "Sets the scope of the discussion",
          ],
          [
            "History",
            "Dated versions and lab notes",
            "Shows how the idea developed",
          ],
          [
            "People",
            "Contributors and their agreements",
            "Clarifies ownership questions early",
          ],
          [
            "Disclosures",
            "Talks, papers, demos and sales",
            "Flags anything already made public",
          ],
        ],
      ),
      quote(
        "quote",
        "A clear record of what was made, by whom and when is worth more than a polished summary written after the fact.",
      ),
      heading("next", "After the review"),
      paragraph(
        "next-text",
        "The review should end with a short list of open questions and the documents still needed. Keep that list with the reading file so the next conversation starts where the last one ended.",
      ),
      takeaways("summary", "Key takeaways", [
        "Start with a dated, plain-language description.",
        "Record contributors and their agreements early.",
        "Note every public disclosure, however informal.",
      ]),
    ],
  },
  "corporate-decisions": {
    references: [],
    body: [
      paragraph(
        "intro",
        "Board decisions are easier to rely on later when the paper trail explains the question, the information considered and the outcome in the same place.",
      ),
      heading("question", "Start with the question"),
      paragraph(
        "question-text",
        "Frame each item as a decision the board is being asked to make. A heading such as ",
        { em: "“Approve the revised supplier policy”" },
        " is clearer than a topic label.",
      ),
      heading("papers", "What the papers should show"),
      ...bulletList("papers-list", [
        "The decision requested, in one sentence.",
        "The options considered and why one is preferred.",
        "Any conflicts declared and how they were handled.",
        "Who is responsible for follow-up, and by when.",
      ]),
      figure("room", insightImages.boardroom),
      heading("minutes", "Minutes that stand on their own"),
      paragraph(
        "minutes-text",
        "Someone reading the minutes a year later should understand what was decided without the original meeting pack. Short summaries of the discussion help more than a verbatim record.",
      ),
      takeaways("summary", "In short", [
        "Frame items as decisions, not topics.",
        "Keep papers, declarations and minutes together.",
      ]),
    ],
  },
  "dispute-strategy": {
    references: [],
    body: [
      paragraph(
        "intro",
        "Early choices in a dispute shape the options available later. A short planning note written at the start helps keep those choices deliberate.",
      ),
      heading("facts", "Separate facts from positions"),
      paragraph(
        "facts-text",
        "List what is documented, what is disputed and what is still unknown. Mixing the three is the most common reason an early assessment changes.",
      ),
      table(
        "facts-table",
        "A simple way to sort early information",
        ["Category", "Example", "Next step"],
        [
          ["Documented", "Signed agreement, invoices", "Index and preserve"],
          ["Disputed", "What was agreed on a call", "Gather notes and emails"],
          ["Unknown", "The other side’s records", "Note as an open question"],
        ],
      ),
      heading("preserve", "Preserve the record"),
      paragraph(
        "preserve-text",
        "Keep original files in their original form. Working copies and summaries belong in a separate folder so the source material stays clean.",
      ),
      quote(
        "quote",
        "The strongest position is usually the one that can be shown, not only described.",
      ),
      takeaways("summary", "Key takeaways", [
        "Write a planning note at the start.",
        "Keep documented, disputed and unknown facts apart.",
        "Preserve originals separately from working copies.",
      ]),
    ],
  },
  "energy-projects": {
    references: [],
    body: [
      paragraph(
        "intro",
        "Energy projects bring many parties and documents together over a long timeline. A shared map of who holds what makes each stage easier to review.",
      ),
      figure(
        "field",
        insightImages.solarField,
        "Long project timelines make a consistent document map especially valuable.",
      ),
      heading("parties", "Map the parties first"),
      paragraph(
        "parties-text",
        "Record each party’s role, the agreements that connect them and the person responsible for each relationship.",
      ),
      heading("stages", "Follow the project by stage"),
      ...numberedList("stages-list", [
        "Early discussions and preliminary agreements.",
        "Approvals, consents and supporting studies.",
        "Main agreements and their later amendments.",
        "Operation, reporting and renewal dates.",
      ]),
      takeaways("summary", "In short", [
        "Map parties and agreements before reviewing detail.",
        "Organise documents by project stage.",
      ]),
    ],
  },
  "technology-ip": {
    references: [],
    body: [
      paragraph(
        "intro",
        "Technology teams create valuable material every day: code, designs, data and documentation. Knowing who owns each piece matters most when a product is sold, licensed or invested in.",
      ),
      heading("inventory", "Keep a simple inventory"),
      ...bulletList("inventory-list", [
        "Core software and where it is stored.",
        "Third-party and open-source components in use.",
        "Brand names, logos and domain names.",
        "Agreements with staff, contractors and partners.",
      ]),
      figure("servers", insightImages.serverRack),
      heading("contractors", "Contractors and collaborators"),
      paragraph(
        "contractors-text",
        "Work produced by people outside the company deserves particular attention. Check that each agreement says clearly ",
        { strong: "who owns the result" },
        ".",
      ),
      takeaways("summary", "Key takeaways", [
        "List what the team creates and where it lives.",
        "Check ownership wording in contractor agreements.",
      ]),
    ],
  },
  "introducing-legal-insights-series": {
    references: [],
    body: [
      paragraph(
        "intro",
        "This page will introduce the firm’s Insights series once the firm approves its own announcement. Until then it shows how a news item without a practice area sits in the archive.",
      ),
      paragraph(
        "detail",
        "News items can stand alone. They do not need related expertise, a contents panel or reading tools to be useful.",
      ),
    ],
  },
};

/** Generic sample for the remaining archive entries, with edge cases kept. */
function sampleBody(source: InsightSource, index: number): InsightBlock[] {
  if (source.id === "property-records")
    return [
      paragraph(
        "short-intro",
        "A first conversation about property records can begin with a simple index: the document name, its date and the reason it may be relevant. Keep original material separate from later notes so the history stays understandable.",
      ),
      paragraph(
        "short-end",
        "This short sample has no section headings, to show the reading layout without a contents panel.",
      ),
    ];

  const blocks: InsightBlock[] = [
    paragraph("intro", source.excerpt),
    heading("context", "Context"),
    paragraph(
      "context-text",
      "Clear records make later discussions shorter. Note the ",
      { strong: "date" },
      ", the ",
      { strong: "source" },
      " and the reason each document matters.",
    ),
    heading("approach", "A practical approach"),
    ...bulletList("approach-list", [
      "Name each document consistently.",
      "Keep originals apart from working notes.",
      ["Record ", { em: "why" }, " a version changed, not only when."],
    ]),
    heading("questions", "Questions to bring"),
    paragraph(
      "questions-text",
      "A short list of open questions helps the first meeting focus on decisions rather than on finding documents.",
    ),
    takeaways("summary", "In short", [
      "Date and label every source.",
      "Keep open questions in one place.",
    ]),
  ];

  if (source.id === "transaction-document-review")
    blocks.splice(
      6,
      0,
      heading("source-note-one", "A note on sources", "h3"),
      paragraph(
        "source-note-text",
        "Keep the document title and the date of the version being read with each note.",
      ),
      heading("source-note-two", "A note on sources", "h3"),
    );
  if (index % 5 === 0)
    blocks.splice(
      blocks.length - 1,
      0,
      heading("versions", "A note on versions", "h3"),
      paragraph(
        "versions-text",
        "A version label is most useful with a date and a short explanation of what changed.",
      ),
    );
  return blocks;
}

export const demoInsightBodies: Record<string, ArticleContent> =
  Object.fromEntries(
    demoInsightIndex.map((source, index) => [
      source.id,
      written[source.id] ?? {
        body: sampleBody(source, index),
        references: [],
      },
    ]),
  );
