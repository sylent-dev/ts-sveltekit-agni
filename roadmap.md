# Roadmap

The steps chosen for the application described in [specs.md](specs.md), following [process.md](process.md). Each step is delivered in its own pull request (or one per sub-step), which checks its box. What is noted and not chosen yet lives in [backlog.md](backlog.md).

## Size of the project

An application with accounts and personal data: every tool, with the structure and the data model first, and a database (process.md, Size the project). Chosen with the owner on 2026-11-22.

## Reference

Read only by the steps that need them:

- [Technical choices](docs/technical-choices.md): the stack, the commands and the main designs, with their grids and reasons.
- [Regulation](docs/regulation.md): the certificate and its mandatory mentions, with their sources.
- [Code quality](docs/code-quality.md): the rules of the code, read at the start of each step that changes code.
- [External services](docs/external-services.md): Calendly, the email provider, the host: limits, terms, and the risks accepted by the owner.
- [Branding](docs/branding.md): the principles, then the tokens and every design decision of the mock-up.
- [Tests by hand](docs/tests/README.md): the guides, in French, run again before each launch.
- [Lessons](docs/lessons.md): what working on the project taught, sorted at each retrospective.
- [Roadmap archive](docs/roadmap-archive.md): the detail of the steps done.
- [Backlog](backlog.md): what is noted and not chosen yet.

## Models

Each step names the Claude model recommended for its session (owner, 2026-11-21): Fable 5.2 where a quiet mistake costs most (the regulation, the data model, the accounts, the certificate and its PDF, the personal data, the webhook, the quality audit); Opus 5.5 for the others. At the start of a step whose model is not the one of the session, Claude Code asks the owner to switch with `/model`.

## Critical code

Reviewed again after its fixes, with a test per fix, until no high or medium finding is left (`CLAUDE.md`, Code review): the accounts and the sessions; the conformity of the certificate (its mandatory mentions); the signature and the integrity of the PDF; the check of the signature of the Calendly webhook; the deletion of personal data.

## Steps

### Cycle 1: version 1 tried by the first tester

- [ ] **0. Setup** _(Opus 5.5)_: the skeleton (SvelteKit, TypeScript stricter than `strict`, Drizzle over SQLite with libsql), the checks, the CI, Dependabot, the conventions, the agents and the skills, the first `specs.md` and this roadmap; the settings of the repository and the ruleset of `main`.
- [ ] **1. Specifications** _(Fable 5.2)_: annex 5 read on Légifrance, every mandatory mention with its source in `docs/regulation.md`; the paths of the craftsman and of the client; the personal data and their retention; the edge cases walked state by state; Calendly and the email provider checked in `docs/external-services.md`; no `[OPEN]` left that step 3 needs.
- [ ] **2. Probes** _(Opus 5.5)_: the signature drawn with a finger on the owner's phone (Android and iPhone if possible); the PDF of a real certificate with Typst, then with Playwright, compared on the phone of a client; the decision of the PDF (grid G2 of the plan of 2026-11-22) in `docs/technical-choices.md`.
- [ ] **3. Structure** _(Fable 5.2)_: the screens and the data model in Excalidraw (the company, a technician, a measuring instrument, a client, an appliance, a visit, a certificate), two leads, then the chosen one written in `specs.md`.
- [ ] **4. Wireframes** _(Opus 5.5)_: every screen at phone width first, then the states (empty, a signature refused, a mail that bounces).
- [ ] **5. Mock-up and design system** _(Opus 5.5)_: 3 or 4 styles, the PDF included; the tokens in `docs/branding.md`.
- [ ] **6. Accounts and company** _(Fable 5.2, critical)_: Better Auth (email and password), the company entered once, its technicians and measuring instruments.
- [ ] **7. Certificate entry** _(Fable 5.2, critical)_: the client, the appliance, the measures, the advice; the module of the mandatory mentions, each with its test.
- [ ] **8. Signature and PDF** _(Fable 5.2, critical)_.
- [ ] **9. Sending by email** _(Opus 5.5)_: Brevo behind a `Mailer`, the mails written to a folder in development; the first test of the whole path in a browser.
- [ ] **10. History per client** _(Opus 5.5)_.
- [ ] **11. Personal data** _(Fable 5.2, critical)_: the information of the clients, the retention periods, the deletion.
- [ ] **12. Quality audit** _(Fable 5.2)_: the whole code area by area, `docs/quality-audit.md`, its refactorings.
- [ ] **13. Launch for the first tester** _(Opus 5.5)_: the host, the domain and the subdomain (each with its grid); the security audit; the guides of the tests by hand, run by the owner then the tester.
- [ ] **14. Calendly** _(Fable 5.2, critical)_: the subscription to the webhooks on behalf of the craftsman (OAuth or a personal token: a grid), the `invitee.created` event checked and read, the bookings waiting for their certificate, the pre-filling.
- [ ] **15. Retrospective** _(Opus 5.5)_.
