<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/brand/logo-white.png" />
    <img src="./public/brand/navy-logo.png" alt="Dikko & Mahmoud" width="260" />
  </picture>

  <h1>Dikko & Mahmoud</h1>
  <p>The firm's practice areas, people and legal insights.</p>
  <p>Designed and developed by Vextra.</p>
</div>

## About the website

The Dikko & Mahmoud website introduces the firm, the people behind its work and
the legal services it provides. It gives visitors a place to explore the firm's
experience, read its publications and find information about getting in touch.

The design uses the firm's navy palette, serif headings and generous spacing,
with layouts suited to phones, tablets and larger screens.

## What you'll find

- **The Firm:** its story, leadership, values and approach to working with clients.
- **Practice areas:** nine areas of practice, with individual pages explaining
  the services within each.
- **Our People:** a searchable directory and detailed lawyer profiles, available
  both as popups and individual pages.
- **Selected matters:** summaries of representative experience, subject to
  publication approval.
- **Legal Insights:** articles and updates with search, topic filters, author
  information, references and related reading.
- **Contact:** office details, maps, frequently asked questions and an enquiry form.
- **Supporting information:** SME retainer services, Privacy Policy and Terms of Use.

Reading tools, sharing options and consistent navigation support the experience
across the site.

## Project information

The current website is a presentation preview for review. Final content,
photography and service connections are still being completed; enquiry submissions
are simulated and do not send email. The [roadmap](docs/roadmap.md) and
[handover checklist](docs/handover-checklist.md) record the current delivery status.

## Technology

Built with Next.js, React, TypeScript and Tailwind CSS, with reusable components
for a consistent interface. Forms use React Hook Form and Zod; articles use
Portable Text.

<p>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

## Running locally

For developers working on the project, use Node.js 20.9 or newer and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The current preview needs no service
credentials. Use `pnpm build` to create a production build and `pnpm test` to run
the tests. Further setup and development guidance is in the
[documentation](docs/README.md).

## Where things live

```text
app/          Website pages and layouts
components/   Page sections and reusable components
content/      Website copy and content records
hooks/        Interactive behaviour
lib/          Shared logic and helpers
types/        Content types
tests/        Automated tests
public/       Images, logos and other assets
sanity/       Reserved for content management integration
docs/         Project guides, specifications and delivery notes
```

## Documentation and ownership

The [project documentation](docs/README.md) contains the design references,
page specifications and guidance for maintaining the website. Contributors
should read [AGENTS.md](AGENTS.md) before making changes.

Developed by Vextra for Dikko & Mahmoud. Ownership and usage follow the project
agreement and [LICENSE](LICENSE). Third-party acknowledgements are in
[NOTICE.md](NOTICE.md).
