# Environment, security headers and launch

How the site is configured outside the code. Nothing here is required to run
the site locally: `pnpm install`, then `pnpm dev`.

## Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable                                                    | Needed         | What it does                                                                   |
| ----------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                      | Custom domains | The public address, used for canonical links, share images, sitemap and robots |
| `VERCEL_ENV`, `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL` | Set by Vercel  | Used when `NEXT_PUBLIC_SITE_URL` is empty                                      |

The address is chosen in `getSiteUrl` (`lib/metadata.ts`): the variable first,
then Vercel's address, then the fallback in `content/site.ts`.

Planned, not read by any code yet:

| Variable                                                                               | For                                                           |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`                                                   | Enquiry email (`integrations/email.md`)                       |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`                               | Spam check on the enquiry form                                |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                   | Rate limit on the enquiry form                                |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` | Content (`integrations/sanity.md`)                            |
| `SANITY_REVALIDATE_SECRET`                                                             | Authenticate CMS revalidation requests (planned; server only) |

Anything starting with `NEXT_PUBLIC_` is visible to visitors. Keys and tokens
never get that prefix.

## Security headers

Set for every page in `next.config.ts`.

| Header                                | Effect                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| `Strict-Transport-Security`           | Returning browsers only use HTTPS                              |
| `X-Content-Type-Options`              | Files are never guessed to be a different type                 |
| `X-Frame-Options`                     | Other sites cannot show this site in a frame                   |
| `Referrer-Policy`                     | Other sites learn the domain a visitor came from, not the page |
| `Permissions-Policy`                  | Camera, microphone and location are switched off               |
| `Content-Security-Policy-Report-Only` | Lists what the site may load; reports, does not block yet      |

### Turning the content policy on

The policy is in report-only mode so it cannot break the site while it is
checked.

1. Open the deployed site with the browser console open.
2. Visit every page, open the menu, play a video, open Contact and its maps,
   send a test enquiry.
3. If the console shows no "Content Security Policy" reports, rename the header
   in `next.config.ts` to `Content-Security-Policy`.
4. Any new outside service (a video host, Turnstile, Sanity images) is added to
   the policy in the same change that adds the service.

## Search engines

- `siteConfig.indexable` in `content/site.ts` is the one switch. While it is
  `false`, `robots.txt` blocks crawling, every page says "noindex", and the
  firm's structured data is not emitted.
- `app/sitemap.ts` lists launched pages (`launchedRoutes` in `lib/routes.ts`)
  and publishable Insights articles.
- `lib/structured-data.ts` describes the firm for search engines using only
  facts from `content/`. Articles add their own (`lib/insights/metadata.ts`).

## Analytics

Vercel Analytics is loaded in `app/layout.tsx`. It was approved as the one
outside service during the presentation checkpoint. The Privacy Policy must
mention it before the site is public.

## Backups and recovery

**Planned, not configured or tested.** Settle these responsibilities before launch:

- Keep the source repository and release history under the agreed ownership;
  record how to restore the last working deployment. A deployment rollback does
  not restore CMS content.
- Agree an owner, frequency and retention for Sanity dataset and asset backups.
  Preserve original photographs and the approved content supplied for migration.
- Test restoring a content backup into an isolated dataset, including referenced
  images and files, without overwriting production. Record the steps and result.
- Record who holds domain/DNS access, provider recovery access and billing
  responsibility. Hand over secrets through a secure channel, never in this repo.
- Agree who checks enquiry-delivery failures, service limits and availability,
  and how incidents reach that person. Do not log enquiry bodies unnecessarily.
- Give the firm the recovery instructions and ongoing responsibilities at
  handover. These planning notes do not commission a maintenance service.

## Launch checklist

The full cross-site checklist is [handover-checklist.md](handover-checklist.md).
This shorter list covers the environment and publication switch.

Before `siteConfig.indexable` becomes `true`:

- [ ] The firm has approved the content, people, matters and legal text.
- [ ] Temporary images are replaced (`media-review.md`) and photos converted
      to WebP.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the final domain.
- [ ] Enquiry email is live and tested (`integrations/email.md`).
- [ ] The content policy is enforced, not report-only.
- [ ] The Privacy Policy mentions analytics and the enquiry form.
- [ ] Map pins are confirmed for each office (`content/contact.ts`).
- [ ] Share previews are checked (`social-sharing.md`).
- [ ] Backup/restore and deployment rollback have been tested, with owners named.
- [ ] `pnpm format:check`, `lint`, `typecheck`, `test` and `build` pass.
