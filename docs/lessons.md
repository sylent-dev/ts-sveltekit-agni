# Lessons

What working on the project taught: a correction of the owner, or a practice that proved useful. One line per lesson, written when it happens: its date, the lesson, and where it may go (this project, the templates, a skill, an agent). Read only by the retrospective of each cycle (process.md, Retrospective), which sorts each one and writes its decision on its line.

<!-- - YYYY-MM-DD: the lesson. Where it may go. -->

- 2026-11-22: `sv add drizzle` with `node-sqlite` wrote a driver (`drizzle-orm/node-sqlite`) that the stable Drizzle doesn't have: an add-on's choice is checked against the installed version before it is trusted, and a score of a grid built on it is given again to the owner. Where: the templates (Start a project), `CLAUDE.md` (Communication) already holds the rule.
- 2026-11-22: the `serve.py` of the `html-mockups` skill served the whole root of the repository, `.env` and the SQLite file included, and the skill asks to serve it on the local network for the check on a phone: it now serves only `docs/` and `static/`, never a hidden file (an allow list). Where: the templates (ts-astro-static-website-template, ts-svelte-idealan, rust-exile-market) have the same `serve.py`.
