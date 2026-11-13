# 404 and error pages

**Status: built.**

## What they are

The pages a visitor sees when an address does not exist or a page fails to
load. Both use one layout: a calm message on the navy band with a faint serif
mark behind it, and clear ways forward.

| Page  | Shows                                | Actions                             |
| ----- | ------------------------------------ | ----------------------------------- |
| 404   | "We couldn't find that page."        | Return home, Explore practice areas |
| Error | "This page didn't load as expected." | Try again, Return home              |

## Where each one appears

| File                                | When it shows                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `app/(site)/not-found.tsx`          | An unknown address, or a record that may not be shown (an unapproved profile, an unpublished article). Keeps the header and footer. |
| `app/not-found.tsx`                 | An address outside the site layout. Adds the header and footer itself.                                                              |
| `app/(site)/[...catchAll]/page.tsx` | Sends every unmatched address to the 404 above. Needed because the profile overlay slot matches every address.                      |
| `app/(site)/error.tsx`              | A page fails. Keeps the header and footer.                                                                                          |
| `app/(site)/insights/error.tsx`     | Insights fails. Same view, scoped to Insights.                                                                                      |
| `app/error.tsx`                     | The site shell fails.                                                                                                               |
| `app/global-error.tsx`              | The root layout fails. Brings its own fonts and styles.                                                                             |

## Rules

- A 404 is a real 404 status, and is never indexed.
- A withheld or unapproved record gives the same 404 as an address that never
  existed, so the page does not reveal that the record exists.
- Errors pass through `useReportError`, which prints them to the console in
  development. No error-tracking service is connected.

## Code map

| Piece | Location                                                                    |
| ----- | --------------------------------------------------------------------------- |
| Views | `components/system/status-page.tsx`, `not-found-view.tsx`, `error-view.tsx` |
| Copy  | `content/system-pages.ts`                                                   |
