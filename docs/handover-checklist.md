# Full site delivery and handover checklist

**Status checked: 12 November 2026.** The site is a no-index presentation
preview. Most page layouts exist; final content, integrations, production launch
and handover are not complete.

Checked items mean the implementation or document exists. They do not mean the
client has signed it off or that it has been verified in production. Unchecked
items are outstanding, awaiting an input, or need final verification. This is a
status record, not permission to start deferred work or activate paid services.

Sources: the agreed project scope, [client alignment](client-alignment.md),
current route specs and the working checkout. Commercial terms (fees, payments,
support and maintenance arrangements) are kept outside this repository. Provider
ownership and final client acceptance are not verified by this checklist.

## 1. Page layouts and shared features already built

- [x] **Home `/`:** hero photo carousel, firm introduction/story, figures,
      nine-practice selector, people, Insights, FAQ, enquiry band and footer.
      Client/logo and matter sections hide unapproved records without empty space.
- [x] **The Firm `/the-firm`:** editorial sections, story, interactive Journey,
      approach, leadership, offices and FAQ presentation.
- [x] **Practice hub `/practice-areas`:** canonical nine-practice catalogue,
      category filtering, service previews and shared desktop/mobile navigation.
- [x] **Nine practice detail routes:** shared hero, breadcrumb, sticky contents,
      services/people/Insights/FAQ sections where data exists. Corporate &
      Commercial has the supplied fuller detail; the other pages still need copy.
- [x] **People `/people`:** managing-partner feature, directory, URL-backed
      search, role/practice filtering logic, counts, clear/reset and empty states.
      Only four real partner records remain; no synthetic roster is used live.
- [x] **Four profile routes `/people/[slug]`:** popup on internal card navigation,
      shareable standalone page on direct visits, shared biography body,
      qualifications/focus/contact sections and copy-link feedback.
- [x] **Selected matters `/experience` and four details `/experience/[id]`:**
      sourced instruction summaries and related links. Pending records appear
      only under the deliberate no-index preview exception. Navigation stays hidden.
- [x] **Insights `/insights`:** featured article, server search/type/practice
      filters, sorting, nine-item numbered pagination and empty states.
- [x] **Article routes `/insights/[id]`:** 27 demo articles exercise rich text,
      author references, references, contents navigation, related content,
      sharing/copy toasts, reading progress, back-to-top and printing. Home reads
      the same article records. These are layout fixtures, not migrated firm articles.
- [x] **Contact `/contact`:** photo hero, contact panel, reason-first form,
      conditional practice/topic fields, validation, office cards, tap-to-load
      maps and FAQ. Practice-page links preselect the matching practice.
- [x] **Contact preview action:** validates on the server, uses a honeypot and
      explicitly confirms that nothing was sent. It has no delivery integration.
- [x] **SME `/sme-retainer`:** separate Advisory/Secretarial presentation linked
      from the practice hub/footer. It is not a tenth practice.
- [x] **Privacy `/privacy-policy` and Terms `/terms-of-use`:** shared reading
      layout, document links and print styles. Approved text and dates are absent.
- [x] **Shared system:** responsive header/mobile menu/footer, reusable controls,
      breadcrumbs, image fallbacks, 404/error views and no-index preview behaviour.
- [x] **SEO/share foundation:** metadata helpers, canonical URL handling,
      sitemap/robots, social artwork, generated article/practice share cards and
      structured-data helpers. Final-domain and published-content checks remain.

## 2. Client corrections and repository work already completed

- [x] Nine practice names/order are shared across the site; gas practice reads
      **Energy, Oil & Gas**.
- [x] A.B. Mahmoud, SAN uses **Co-founder & Managing Partner** consistently.
- [x] Repeated 1993 / 30+ / presence figures were removed from the story card;
      they remain in The firm at a glance.
- [x] Testimonials and placeholder FAQ avatars were removed, including the
      unused Avatar component/package.
- [x] Selected matters and Careers links are hidden from header, mobile menu
      and footer. The practice experience carousel is also currently hidden.
- [x] Client/matter publication statuses and filtering exist. Appearing in a
      review preview does not change consent to approved.
- [x] Our People, Legal Insights Series/contributors, office wording and neutral
      contact/enquiry copy have been aligned with the recorded feedback.
- [x] Footer exists, including the X icon. Social icons remain visible for
      design review; real destination URLs are still outstanding.
- [x] Repository licence and third-party notices exist. The licence defers
      ownership and use to the services agreement, which stays outside the repo.
- [x] Security headers, report-only content policy, code organisation and initial
      image/build improvements are implemented. This is not final security or speed QA.
- [x] Sanity, enquiry-email and environment/recovery plans are documented.
      Provider implementation has not started.
- [x] Agent instructions require checking relevant delivery items before work
      and updating verified progress afterwards. Evidence and limits are in the
      [13 November log entry](implementation-log.md#2026-11-13--agent-checklist-workflow);
      [workflow rules](workflow.md#delivery-checklist) govern updates.

## 3. Approvals and content to obtain from the firm

- [ ] Obtain written sign-off on the developed desktop/mobile page layouts,
      including the complete homepage/footer and Contact/enquiry form.
- [ ] Confirm the Contact-specific **Back to homepage** header and removal of
      the proposal's preferred-office field with the client. Both are internally
      agreed changes recorded on 12 November, not verified client acceptance.
- [ ] Obtain the firm's written acknowledgement that nine practices, the SME
      page and Terms of Use are in scope.
- [ ] Receive final practice copy, services, FAQ answers and confirmed Capital
      Markets placement within the agreed nine practices.
- [ ] Receive the final roster, biographies, qualifications, positions, offices,
      practice assignments, headshots and personal links. Do not infer assignments.
- [ ] Receive final authored Insights with confirmed contributors, dates,
      references, document files where applicable and approved images.
- [ ] Receive item-by-item client/logo/matter publication decisions. Keep pending
      or withheld material off the public launch site.
- [ ] Receive SME track descriptions/services and approve any related enquiry
      wording. Do not invent prices, retainer terms or response promises.
- [ ] Receive Privacy and Terms text with approved update dates. The Privacy
      Policy must address the actual enquiry processing and Vercel Analytics.
- [ ] Approve Contact notices, confirmations and FAQs; confirm intake ownership,
      recipient inboxes, reply expectations and handling/retention of submissions.
- [ ] Confirm addresses, map pins, phone numbers and social URLs, including
      LinkedIn. Do not invent a Lagos phone number.
- [ ] Obtain the Careers response: current vacancies/general applications,
      recruitment copy and application email or external link.
- [ ] Receive Awards titles, years, awarding bodies and supporting images;
      agree the requested journey-style presentation.
- [ ] Confirm photo dates, scope and edited delivery, including Kano coverage.
      Give both photographers the same lighting/colour and crop brief based on
      the actual website image slots, with room around subjects for responsive crops.
      Agree whether the firm-story slot uses the office photograph or a suitable
      firm introduction video; retain the branded cover until settled.
- [ ] Agree the revised schedule around actual content, photo and approval
      dates. Do not carry forward an assumed launch date.

## 4. Remaining visual and functional work

- [ ] Design and build **Awards** after the records/layout are agreed; omit an
      empty section while there is no approved content.
- [ ] Build **Careers** after the firm's response, with an introduction,
      CMS-managed open/closed vacancies and email/external application links.
      Keep it in scope but hidden until ready. No ATS/CV-upload workflow is agreed.
- [ ] Add **People office filtering** with confirmed office references; the
      proposal promises office and position filters. Keep existing role/practice UX.
- [ ] Add **optional Insight document downloads**, including file metadata and
      an accessible link. This proposal item is not in today's article contract.
- [ ] Replace temporary photos and initials with approved assets; check each
      desktop/mobile crop, focal point, alt text and loading behaviour. Resolve
      The Firm/Selected matters image reuse deliberately.
- [ ] **Replace sources first, then generate WebP derivatives.** Preserve
      originals and source/rights records; follow [media-review.md](media-review.md).
- [ ] Review the six unused stock photos (`public/images/stock/team-01`–`03`
      and `testimonial-01`–`03`) during the authorised media cleanup; do not
      mistake the Avatar package removal for an image cleanup.
- [ ] Complete the separately approved motion/polish pass with reduced-motion
      behaviour, preserving existing header, hero autoplay and Journey interactions.
- [ ] After consent, deliberately reconnect any approved practice experience
      carousel and restore eligible links. Its current commented-out presentation
      will not reappear just because a record becomes approved.
- [ ] Review all layouts again with real short/long content, missing images and
      empty/single/multiple records. No orphan headings, gaps or dead controls.

## 5. Sanity integration and migration

Follow [integrations/sanity.md](integrations/sanity.md); approve the implementation
plan first. iProduce is a workflow reference, not content to copy.

- [ ] Agree designated editors/approvers, Studio location, datasets, account
      ownership, service tier and any recurring cost before activation.
- [ ] Review the Studio editing experience: clear content groups, singleton
      pages, field descriptions, image/crop previews and useful validation.
- [ ] Implement schemas/adapters for Insights, people/profiles, practices,
      matters/clients, FAQs, legal documents, offices/contact and site settings.
- [ ] Include ordered Home featured people/Insights/practices, firm/SME copy,
      approved Awards and Careers introduction/vacancies. Layout stays in code.
- [ ] Add confirmed people office/position references and optional article files
      to the content contract, not just to the visual controls.
- [ ] Keep draft/published state separate from firm publication approval;
      enforce references, stable slugs and permissions on server reads.
- [ ] Configure authenticated draft preview, server-only tokens and authenticated
      revalidation using the planned `SANITY_REVALIDATE_SECRET`. Verify edits
      refresh the affected pages/Home features without exposing drafts.
- [ ] Migrate agreed final content: nine practices (pending acknowledgement),
      up to 30 profiles, up to five final Insights and up to six approved matters,
      plus core firm and office/contact content. These are allowances, not counts
      already received or migrated. The 27 demo articles do not count as firm content.
- [ ] Replace/remove demo content deliberately. Test missing/deleted references,
      no content, one record, larger lists, invalid slugs and provider failures;
      never substitute demo content when Sanity fails.
- [ ] Verify real image hotspot/crop/file delivery and pagination/query limits
      with the CMS data, including when editors archive a record.

## 6. Enquiry delivery and email

Follow [integrations/email.md](integrations/email.md). The form currently sends
nothing; no genuine email-delivery test has passed yet.

- [ ] Agree recipient routing, firm-owned sending domain, DNS operator,
      receipt wording and whether any persistent enquiry storage is needed.
- [ ] Build/review React Email notification and receipt templates using one
      branded shell, separate local previews and HTML/plain-text versions.
- [ ] Check long messages, absent optional fields, every enquiry reason, mobile
      email clients, dark mode and images disabled. Keep receipt content minimal
      unless the firm approves repeating submitted details.
- [ ] Configure Resend and domain authentication, then connect the Server Action
      without changing the agreed fields or promising unapproved reply times.
- [ ] Implement server-verified Turnstile, honeypot enforcement, rate limits and
      stable submission IDs/retry deduplication. Confirm service costs first.
- [ ] Test successful firm delivery, invalid input, spam, limits, provider
      rejection/timeouts and repeat submits. Keep entries on failure.
- [ ] Treat firm-notification success separately from receipt failure so an
      accepted enquiry is not resent. Define how delivery/bounce failures reach
      the responsible operator; provider acceptance alone is not inbox proof.
- [ ] Verify end-to-end inbox receipt, reply-to and visitor acknowledgement.
      Only then replace the preview-only confirmation with approved live copy.

## 7. Production setup, SEO, recovery and final QA

- [ ] Set up firm-owned hosting/CMS/email/supporting accounts with delegated
      access, recovery details and an owner/purpose/billing register. Approve
      costs before committing paid services; use least-privilege access.
- [ ] Configure production/preview environments, secrets and final-domain URLs;
      verify DNS/HTTPS and keep review environments no-index.
- [ ] Agree backup ownership/frequency/retention; preserve original media and
      approved migration inputs. Test a CMS content/asset restore into an isolated
      dataset and a deployment rollback. Record both results and recovery steps.
- [ ] Agree who monitors enquiries, bounces, service limits and availability,
      with a practical escalation route. Do not imply an ongoing monitoring
      service is already running.
- [ ] Prepare the agreed migration sheet and implement redirects for up to
      **25 existing public URLs**. Check redirects and internal links on the
      deployed site; stable new slugs need the same care when changed later.
- [ ] Audit final titles, descriptions, headings, canonical URLs, sitemap,
      robots and structured data against approved content. Verify no demos,
      pending records or draft-only routes leak into the public build or sitemap.
- [ ] Check social previews on the final domain, including article/practice
      cards, brand crops and favicon. Local metadata does not prove external unfurling.
- [ ] Test the deployed content policy with all final services, then enforce it
      and repeat the interactions. Current report-only headers do not block loads.
- [ ] Complete responsive/cross-browser review across 320–1440px, with real
      content, keyboard/focus checks, form errors and representative screen-reader
      checks. Review reduced motion, no-JS reading and article/legal printing.
- [ ] Measure final performance after media and motion, including mobile LCP,
      layout stability and interaction responsiveness. Fix material regressions.
- [ ] Run formatting, lint, typecheck, tests, unused-code review and production
      build on the final integrated release. Recheck links, 404/error paths,
      filtered URLs, browser Back/Forward and invalid/empty/single-item states.
- [ ] Obtain written release approval.
- [ ] Deploy the approved release; remove review notices/demos, enable indexing
      only for the approved public site and smoke-test the live site and email.
      Verify preview/staging remain no-index independently.

## 8. Handover and post-launch

- [ ] Review and commit the intended changes, create a traceable release and
      hand over repository access and project-specific source under the agreement.
      Today's working tree includes uncommitted and staged work.
- [ ] Supply Figma sources, exported assets, style guide and original/final media,
      with relevant third-party font/photo/component licence notices.
- [ ] Transfer/verify the firm's account ownership, editor access and secure
      access details. Remove temporary permissions that are no longer needed.
- [ ] Deliver the written editing guide and **one CMS training session** for
      designated staff. Cover images, references, approvals, vacancies, featured
      Home content and how to recover from a mistaken edit.
- [ ] Provide the basic operating guide: configuration, deployment, redirects,
      backup/restore, rollback, form failures, service billing and support contacts.
- [ ] Record final acceptance, unresolved exclusions and the actual production
      launch date. Post-launch support follows the services agreement.

## Recommended order from here

1. Finish client review and collect the content, photography and Careers answers;
   resolve Awards and remaining visual decisions without reopening approved pages.
2. Agree the detailed Sanity/editor and email-template workflows, then implement
   CMS and delivery as separately checked batches. Do not activate providers in
   the current presentation checkpoint.
3. Migrate final content/media, complete the remaining contract items and visual
   polish, then run the integrated launch checks.
4. Obtain release approval, launch, train the editors and complete handover.

## Verification evidence

- [x] On 12 November: formatting, lint, typecheck, 180 tests, unused-code check
      and production build passed; `/contact` remained static. Markdown links and
      whitespace checks passed for this documentation update.
- [ ] Repeat release checks after CMS, delivery and final media/content changes;
      complete the deployed/browser checks listed above. This documentation pass
      did not perform a fresh browser or production-provider review.

See the implementation log for detail. Local checks do not establish production
readiness or client approval.

Ongoing content entry, archive migration beyond the allowances, an ATS, CV
screening/uploads, a client portal and automated LinkedIn publishing are not
silently added by this checklist. Scope any such request separately.
