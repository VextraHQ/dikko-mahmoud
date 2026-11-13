# Privacy Policy and Terms of Use (`/privacy-policy`, `/terms-of-use`)

**Status: both pages are built for no-index review. Neither has approved
text.**

## What the pages are

Two pages with one layout. Each shows a legal document's title, its last
updated date, links to the other legal document, and the document's sections.

## Behaviour

- A document's sections render only when its `publicationStatus` is
  `approved`. Until then the page shows "Text awaiting firm approval".
- The "Last updated" date renders only when the document is approved and
  `approvedUpdatedAt` is a real date written as `YYYY-MM-DD`. Otherwise the page
  says the date is awaiting approval.
- Entering draft text does not publish it. `legalPresentation`
  (`content/legal.ts`) is the one place that decides, and it is tested.
- The pages have print styles so a visitor can print or save a clean copy.

## Content and approval

- Nobody on the project writes legal text. The firm supplies both documents.
- The Privacy Policy must cover the enquiry form (what is collected and why)
  and Vercel Analytics before the site is public.
- The Contact form links to the Privacy Policy and states that sending an
  enquiry does not create a lawyer–client relationship.

## Code map

| Piece            | Location                                                                 |
| ---------------- | ------------------------------------------------------------------------ |
| Routes           | `app/(site)/privacy-policy/page.tsx`, `app/(site)/terms-of-use/page.tsx` |
| Layout           | `components/legal/legal-page-layout.tsx`                                 |
| Documents, rules | `content/legal.ts`                                                       |
| Tests            | `tests/alignment.test.ts`                                                |

## Before launch

- Approved text and an approved date for both documents.
- Set each document's `publicationStatus` to `approved`.
