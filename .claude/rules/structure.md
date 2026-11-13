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

## Component folders

- `components/<route>/`: sections and pieces for one page or feature.
- `components/shared/`: used by two or more feature folders. A piece only one
  feature uses lives in that feature's folder until a second one needs it.
- `components/system/`: used only by route files in `app/` (404 and error
  views, the generated share-card image).
- `components/layout/`: the site shell (header, footer, navigation).
- `components/ui/`: design-system primitives with no site content.

## File types

Don't mix `.ts` and `.tsx` in a folder. `components/` holds only `.tsx`;
`hooks/`, `lib/`, `content/` and `tests/` hold only `.ts`. A class string or
constant shared by components lives in the `.tsx` that owns it and is
exported from there (example: `underlineFieldClass` in
`components/shared/filter-select.tsx`), never in a new `.ts` beside them.
`app/` follows Next's file conventions (`page.tsx`, `actions.ts`,
`sitemap.ts`).

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
