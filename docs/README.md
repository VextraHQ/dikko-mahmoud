# Documentation index

This folder is the durable source of truth for the project. It is intentionally
small so a developer or agent can resume work without relying on chat history.

## Reading order

1. `../AGENTS.md`
2. `roadmap.md`
3. `architecture.md`
4. `workflow.md`
5. the latest `implementation-log.md` entry

## Ownership

| Document                | Owns                                       |
| ----------------------- | ------------------------------------------ |
| `roadmap.md`            | Current milestone and future work gates    |
| `architecture.md`       | Folder ownership and technical boundaries  |
| `workflow.md`           | Change and verification process            |
| `implementation-log.md` | Append-only factual implementation history |

Code is the source of truth for implemented behavior. Documentation owns
approved intent and current status. Do not document planned work as complete,
and do not describe local verification as production proof.
