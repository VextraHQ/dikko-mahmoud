# Careers (`/careers`)

**Status: deferred. The user confirms a design is available. Implementation
waits for the client’s recruitment-process response. Careers remains in scope.**

## What exists today

- The address is reserved as `routes.careers` in `lib/routes.ts`.
- It is not in `launchedRoutes`, so any link to it shows the "being prepared"
  notice instead of navigating.
- Careers is hidden from the header, the mobile menu and the footer
  (`content/navigation.ts`, `content/footer.ts`) until the page is ready.

## Needed before building

1. Review the supplied design against the client’s recruitment-process response.
2. From the firm: whether it lists open roles, takes general applications, or
   both; who receives applications; and the wording about the firm as a place
   to work.
3. Confirm the application email address or external application link. The
   proposal provides an introduction and CMS-managed vacancies that can open
   and close. Applicant tracking, CV uploads and screening are outside that
   agreed scope and require a separate decision.

## When it is built

- Add the route in `app/(site)/careers/`, its copy in `content/`, and its path
  to `launchedRoutes`.
- Re-add the Careers link in `content/navigation.ts` and `content/footer.ts`.
- Replace this file with the page's spec, in the same shape as
  `routes/contact.md`.
