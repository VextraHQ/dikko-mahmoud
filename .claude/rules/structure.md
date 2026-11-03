# Where code lives

| Folder        | Holds                                                        | Never holds                        |
| ------------- | ------------------------------------------------------------ | ---------------------------------- |
| `app/`        | Routes, layouts, metadata, global styles                     | Copy, data, reusable markup        |
| `components/` | Markup: props in, JSX out                                    | Effects, timers, filtering records |
| `content/`    | Copy, records and simple ready-to-render lists               | Rules that combine several domains |
| `hooks/`      | Browser behaviour: effects, observers, media queries, state  | Markup                             |
| `lib/`        | Pure rules and helpers; `lib/<domain>/` once a domain has 3+ | Copy or records                    |
| `tests/`      | Vitest tests for `lib/` and `content/`                       | Real-looking sample people/clients |
| `docs/`       | Approved intent, status and history                          | Planned work described as done     |

## Import direction

`app` → `components` → `hooks` → `lib` → `content`.

- `content/` may import types and tiny helpers from `lib/` (`hasText`,
  `PublicationStatus`), never a `lib/` rule that reads another content file.
- A rule that combines content files belongs in `lib/` (example:
  `lib/people/directory-data.ts` combines people, practices and profiles).
- Keep server-only data out of client bundles. A module that reads draft
  bodies (`content/profiles.ts`, `lib/people/profiles.ts`) is imported only by
  server components, route files and tests. Client components import the
  client-safe modules (`lib/people/directory.ts`, `lib/people/roster.ts`).

## Domains

People is grouped in `lib/people/`: `roster.ts` (who may be listed),
`profiles.ts` (server-only `resolveProfile`), `directory.ts` (search, groups,
URL), `directory-data.ts` (server page data), `profile-links.ts`,
`profile-metadata.ts`. Matters has one combining rule, `lib/experience.ts`
(server-only `resolveExperience`). Give a domain a folder only when it has
three or more rule files.

What stays in `content/`: lookups and filters that read only their own file
(`getPerson`, `getPractice`, `matterStatus`, `availableMatterIds`,
`visibleMatters`). Content modules export ready-to-render lists
(`visibleMatters`, `homePeople`); sections never filter records themselves.

## Adding something

- New page: route in `app/(site)/`, path in `routes.*` (`lib/routes.ts`),
  metadata via `createPageMetadata`, and add it to `launchedRoutes` to go live.
- New section: `components/<route>/<name>-section.tsx`, copy in `content/`.
- New browser behaviour: one `hooks/use-*.ts` file. Reuse
  `useMediaQuery(mediaQueries.desktop)` and friends first.
- New pure rule: `lib/`, plus a test in `tests/`.
