# CLAUDE.md

## Communication

- Always communicate with the user in French through the Claude Code harness (chat responses, explanations, questions).
- Address the user informally, with « tu » (tutoiement), never « vous », in every session.
- Ask a few numbered open questions at a time, in plain text, the main one first: the owner often answers by voice dictation (interpret the misspelled names, and confirm when an answer is ambiguous). An unanswered question takes Claude Code's recommendation. For a series of decisions, prepare a form in `outputs/` (one numbered item per decision, its checkboxes and an empty « Commentaire : » line): the owner likes to answer in the file.
- **Every choice of a technology** (a library, a service, a tool, a host) is presented as a multi-criteria grid: the options, their advantages, their drawbacks and a score out of 10 for each, then Claude Code's recommendation, the option with the best score. The owner decides; the decision, its reason and its date go into `docs/technical-choices.md`. When a fact behind a score turns out wrong, give the corrected score and ask again.
- Keep a critical eye on the owner's ideas: give a clear opinion with its reason, point out the consequence a choice hides (the personal data of the clients, the cost of a service, what a craftsman sees on their phone), offer an alternative, then follow the owner's decision. The same eye on the roadmap and on Claude Code's own plans.
- Coherence first: before bringing a rule, a skill or a file from another project or template, check that it fits this kind of application, and check a premise before proposing to remove something; bringing level is not copying.
- The first time a technical term comes up that the owner may not know (form action, migration, rune, webhook signature…), explain it in plain words with a short example.
- When the owner asks for an opinion (« qu'en penses-tu ? »), answer and wait: no edit, commit or push before they decide. A question about what to do (« qu'est-ce qu'on fait ? ») gets a plan, not an action.
- Give the recommendation first, as one numbered plan the owner can accept with one word (« go »), and ask a question only where a choice is really open.
- Before calling an option costly, size it from the code and give that size; before stating how a third-party tool, a service or a regulation behaves, read its source, its documentation or its official text, or try it.
- A command the owner pastes alone in the chat may be the one they are about to type in their own terminal: ask before running it.
- While the owner has said to wait for their signal, the notification of a background task isn't one: one line of status at most, no command.
- A practice Claude Code would add to the method (a series of checks, a habit that costs time, tokens or the machine) is proposed to the owner first, with what it brings and what it costs, and becomes a rule only once accepted.

## Project

- Agni (« fire » in Bengali and Sanskrit, the god of fire and messenger between the worlds) is a SaaS for French heating engineers, plumbers and refrigeration technicians: at the end of a visit, the craftsman produces the regulatory certificate on their phone, the client signs it on the screen, and the application emails it as a PDF. The promise: « du rendez-vous à l'attestation signée, sans rien retaper ».
- Version 1: the maintenance certificate of a boiler (gas, fuel oil, wood) required by annex 5 of the order of 15 September 2009 as amended (`docs/regulation.md`); the company entered once, then only the client and the measures at each visit; the signature on the screen, the PDF and its email; the history per client; then the Calendly integration (a booking pre-fills the certificate). Mobile first. Out of version 1: see `specs.md` and `backlog.md`.
- Built with SvelteKit (Svelte 5 with runes) in TypeScript, full-stack in one project (the server code in `src/lib/server/`), Drizzle ORM over SQLite (one file, ignored by Git). Developed locally first; the host is chosen later (`roadmap.md`).
- Never look official: no « CERFA » in the name, no blue-white-red, no Marianne. The interface never names a competitor (no EasySAV), not even in a help text.
- The repository is public: never commit secrets, nor any personal data of a craftsman or a client, not even in the tests (their fixtures are anonymized). See Personal data.

## Naming conventions

- Files and directories use kebab-case (e.g. `docs/getting-started.md`, `src/lib/certificate/fuel-kind.ts`), unless SvelteKit or a tool imposes another name (`+page.svelte`, `+page.server.ts`, `hooks.server.ts`): then follow it, and write the exception in `docs/technical-choices.md`.
- Svelte components stay in kebab-case too (`signature-pad.svelte`), imported under a PascalCase name (`import SignaturePad from './signature-pad.svelte'`); a module that uses runes ends with `.svelte.ts`.
- A file of the same folder is imported by a relative path with its extension (`./result.ts`), anything else of `src/lib` by `#lib/` (`#lib/result.ts`).
- Standard names keep their conventional form (`README.md`, `CLAUDE.md`, `package.json`, `vite.config.ts`).
- File and directory names must be in English.
- Repositories are named `<languages>-<frameworks>-<name>` in kebab-case (`ts-sveltekit-agni`).

## Language

- Everything in the project (code, identifiers, comments, documentation, commit messages) must be written in English, with the words of the domain translated once and kept (`docs/code-quality.md`, Names): a certificate (attestation), an appliance (appareil), a measure (mesure), a craftsman (artisan), a client (client).
- Exception: the texts of the interface (labels, messages, errors, metadata) are written in French. They live in `src/lib/i18n/fr.json`, never written in a component or a route; a server function answers with an error code that the interface turns into a French text.
- Exception: the regulatory mentions of the certificate are in French, in their own module with the source of each one (`docs/regulation.md`), apart from the texts of the interface.
- Exception: the code review notes and the audits in `outputs/`, and the guides of the tests by hand in `docs/tests/`, are written in French.
- French content follows French typography: a non-breaking space before `?`, `!`, `:`, `;` and inside « », the typographic apostrophe (’), and correct accents and capitals, even on capitals (« État »).

## Specifications and roadmap

- Before writing code, describe the expected behavior in `specs.md`, then split the work into steps in `roadmap.md`, and write the technical choices and their reasons in `docs/technical-choices.md`.
- At the start of each session, read `roadmap.md` to know the progress; when asked to continue, resume at the first unchecked step.
- At the start of each step, before writing any code: say which tools of `process.md` the change needs and why (Size a change); check that the model of the session is the one the step names (`roadmap.md`, Models), and if not, ask the owner with a short form to switch with `/model`; judge whether splitting it into sub-steps (7a, 7b…) helps. A sub-step is one pull request with one coherent change that can be reviewed in one pass and tested on its own, without leaving the application broken in between; a small step stays whole. Write the commits of each sub-step in its line of `roadmap.md` before any code, as a closed list, and stop a session at a commit, never in the middle of one. When proposing a split, list what it leaves out next to what it covers.
- When work shows up that the line of the step doesn't name and that needs a commit of its own, finish the commit under way, then tell the owner what it is and what it would cost, and let them decide: now, in a sub-step of its own, or in `backlog.md`.
- At the start of each step, say which file it grows: before adding to a file past about 800 lines of code (tests aside), propose its split first (`docs/code-quality.md`, Modules).
- Each step is delivered in its own pull request, which checks the step's box in `roadmap.md`. Keep `roadmap.md` consistent with `specs.md` when the specifications change.
- Keep `roadmap.md` short, since it is read at every session: the steps to come in detail, one line per step done with its pull requests. Once the pull request of a step (or of a sub-step) is merged, move its detail to `docs/roadmap-archive.md` in the first commit of the next step's pull request, never in a pull request of its own. Reference notes live in `docs/`, linked from `roadmap.md`, and are read only by the steps that need them.
- When an idea, a small touch or an edge case comes up that is not part of the current step, add it to `backlog.md` (its section, what it depends on and the date) rather than keeping it only in the memory. Read `backlog.md` only when the next work is chosen.
- An urgent fix (a security alert, a certificate wrong, data shown to the wrong company) jumps the roadmap: a `fix/` branch from `main`, its test, a pull request at once, then one line in `roadmap.md`. An idea that needs trying before deciding is an exploration: a branch `explore/<short-description>` that is never merged as it is, bounded by the question it must answer, and ended by its result written down.
- Read `specs.md` by section: list its headings first (`grep -n '^#' specs.md`), then read only the sections the step needs.
- When the pull request of a step (or of a sub-step) is merged, tell the owner that the step is done and remind them to start a new session for the next step by typing `/clear`: a fresh session costs far fewer tokens, and `roadmap.md` and the memory hold what is needed to resume.
- Claude Code's note of the state of the session, in its memory, holds the current state only (where the work stands, what comes next, what is still owed), replaced at each session, never added to.

## Recording the owner's decisions in the specifications

- Write into `specs.md` only the answers the owner actually gave. Anything not settled stays in the text as an inline `**[OPEN]**` marker, where the gap is (`grep -n '\[OPEN\]' specs.md docs/regulation.md` lists what is left).
- Before editing, restate an answer read two ways and get its confirmation: a short « oui » to Claude Code's own paraphrase is not a confirmation of a detail the paraphrase left open; ask for that detail by name.
- When the owner writes « clarifie » (or asks what an item means), explain it first (the options and a recommendation, with their reasons) and leave that item unedited until they answer.
- When the owner answers with a combination (« un mélange des deux »), restate the exact combined rule and record it as such, never as one of the options offered.
- When a decision changes a topic, search `roadmap.md`, `backlog.md` and `docs/` for the same topic (`grep -n -i '<topic>'`) and fix their references in the same pass.
- Walk the states of each option before proposing it: from this state, can the craftsman still get somewhere? (A signature refused, a client without email, a mail that bounces, a certificate signed with a mistake, a booking cancelled.) A dead end is found by walking the states, not by reading the rule.
- Place a setting with the object that owns it (the measuring instrument with the technician or the company that holds it, a mention with the kind of appliance it concerns), not in a global list, and ask which objects lack it before proposing a global one.
- When a decision needs an interface the mock-up doesn't show, add a step to update the mock-up before the code, rather than patching the interface from the specifications alone; and check the mock-up against `specs.md` before using it as the reference of a rule.

## Interface design

- Before the wireframe, the riskiest unknown of the design is settled by a throwaway probe, in a worktree or the scratchpad, never pushed: half an hour that tells what the design can rely on (the signature with a finger on a real phone, the PDF, a real Calendly webhook).
- Sketch any question of structure (the screens and how one leads to another, the data model) as an editable Excalidraw drawing, with the current state and two leads side by side, before writing it in `specs.md` (`excalidraw-wireframes` skill).
- For each screen, start with editable Excalidraw wireframes in `docs/wireframes/` (grayscale, one group per block, the phone width first), and build the HTML mock-up only once the owner has approved the layout (`html-mockups` skill).
- For the mock-up, compare 3 or 4 styles that explore new directions for this application. `design-journal.md` records the past design experiences: use it as a source of ideas for one style at most, never as default rules. Give each open decision its own control on the mock-up page (tabs, lists per role, sliders; see the `html-mockups` skill), and remove it once decided. Number the proposals once across every series. A new section goes at the top of the page; past ten sections, a table of contents under the header links to each.
- A mock-up is split into small files (the shared styles and scripts, one style sheet and one script per block), so that a change reads only what it needs.
- Each time the mock-up changes, give the owner its link at once, served: `python3 docs/mockups/serve.py 8774` from the repository root (no cache; the port of this project, `docs/technical-choices.md`, Commands), kept running in the background; check that the page answers with the change, and give `http://127.0.0.1:8774/docs/mockups/<name>.html#section-<n>`. Never a `file://` path: a sandboxed browser may not open it. Before the approval, the owner checks it on their phone.
- Once approved, the mock-up is the single source of truth of the interface: a design change goes into the mock-up first, then into `specs.md` and into the code. Every design decision settled with the owner goes into `docs/branding.md`, in the same commit, and the options set aside into its « Set aside » list.
- Check a visual change with a few screenshots, kept in the scratchpad and deleted once looked at. A test that needs extra code runs on a copy of the page, never on the file the owner has open. Stop the helper processes by their PID, never with `pkill -f` and a pattern that also matches Claude Code's own command.
- When a deliverable is handed to the owner to look at (a drawing, the mock-up, a preview), wait for their approval before writing it into `specs.md` or opening the pull request: « let's go » is not an approval of something they haven't seen yet.

## Connectors

- The claude.ai connectors are turned off for the project in `.claude/settings.json` (`disableClaudeAiConnectors`): their instructions and tools would be sent with every message. Remove the setting only if the project needs one of them.
- The skills the project doesn't use are hidden from the model in the same file (`skillOverrides`, `user-invocable-only`); the owner can still run them with `/<name>`.
- The skills of the project live in `.claude/skills/`, copied from the templates, never shared from `~/.claude/skills`. A lesson that improves a skill goes back to the template too.
- Claude Code's attribution is turned off in the same file (`attribution`), so that no commit or pull request carries it.

## Working folders

Two folders are the exchange area between the owner and Claude Code. They are ignored by Git, except their `.gitkeep`, and hold only temporary files.

- `inputs/`: what the owner gives for context: screenshots, examples, references, copied texts. Read them when the owner points to them; never commit, move or delete them unless asked.
- `outputs/`: what Claude Code produces for the owner: forms, plans, reports, code review notes. Name them `<YYYY-MM-DD>-<subject>.<ext>` when they are meant to be kept for a while. Claude Code's own checks stay in its scratchpad. At the end of a numbered step (not of a sub-step), propose to tidy both folders (`tidy-io-folders` skill), and run it on the owner's word.
- Anything meant to last goes elsewhere and is committed: documentation in `docs/`, the texts in `src/lib/i18n/`, test data next to the tests.
- The guides of the tests by hand (step by step, a blank results table, a free test last), in French, go in `docs/tests/`, named by feature and listed in `docs/tests/README.md`, in the pull request of the step they test: they are run again before each deployment that opens the application to new people. Their results come back in the conversation or the pull request.

## Git workflow

- Never commit or push directly to `main`. For each task, create a dedicated branch from `main`, commit and push only on that branch; every change goes through a pull request targeting `main`.
- Each time a pull request is opened or updated, give the owner its full link (`https://github.com/<owner>/<repository>/pull/<number>`), not only its number.
- Merge pull requests with **Squash and merge** only, so that each pull request becomes one commit on `main`, titled in Conventional Commits. The repository allows only squash merging and deletes the branch once merged.
- Before pushing to the branch of a pull request, check that it is still open (`gh pr view <branch> --json state`): a commit pushed after the merge never reaches `main`.
- Keep only one pull request open at a time (Dependabot's aside). When one conflicts anyway, merge `origin/main` into its branch (never a rebase and a force push), run the checks again, and tell the owner when it is ready to merge.
- Name branches `<type>/<short-description>` in kebab-case, using the commit types below (e.g. `feat/signature-pad`, `fix/pdf-accents`), or `explore/` for an exploration.
- Work on the branch in the main project folder, which the owner has open in VS Code, and switch it back to `main` once the pull request is merged. Only when the owner may be testing another branch there (`npm run dev`), ask, and if so work in a separate Git worktree outside the project, give its exact path, and remove it once the work is pushed.

## Commit messages

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Pull request titles use the same format.

```
<type>(<optional scope>): <description>

<optional body: what and why>

<optional footer>
```

| Type       | Use for                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `feat`     | A new screen or feature for the craftsmen or their clients.                                    |
| `fix`      | A bug fix.                                                                                     |
| `docs`     | Documentation only (`README.md`, `specs.md`, `roadmap.md`, `CLAUDE.md`, `docs/`, the mock-up). |
| `content`  | Interface texts only (`src/lib/i18n/fr.json`).                                                 |
| `style`    | Formatting with no behavior change.                                                            |
| `refactor` | A change that neither fixes a bug nor adds a feature.                                          |
| `perf`     | A performance improvement.                                                                     |
| `test`     | Adding or fixing tests or checks only.                                                         |
| `build`    | Build system or dependencies (`package.json`, lock file, Vite, SvelteKit and Drizzle config).  |
| `ci`       | CI configuration (`.github/`).                                                                 |
| `chore`    | Other maintenance (tooling, `.gitignore`, Claude Code agents and skills).                      |
| `revert`   | Reverting a previous commit.                                                                   |

- Scope: optional, the area concerned (e.g. `feat(certificate): ...`, `fix(pdf): ...`).
- Description: imperative mood, lowercase, no final period, 72 characters max.
- Breaking change: add `!` after the type or scope and explain it in a `BREAKING CHANGE:` footer. A change of the database schema that needs a migration of existing data is one.
- No trace of Claude in the history: no `Co-Authored-By: Claude` trailer, no « Generated with Claude Code » line or session link in the pull requests, even when the harness suggests them.

## Code review

- Before opening any pull request that changes code or its build (`src/`, `tests/`, scripts, configuration, dependencies, `.github/`), run the `code-reviewer` subagent (`.claude/agents/code-reviewer.md`) on the branch, once per pull request, on the whole branch; a step too large for one review is split into sub-steps.
- It writes its recommendations, in French, to `outputs/<YYYY-MM-DD>-<branch>-code-review.md`. Summarize them to the owner as one numbered plan, the recommendation first, apply only the ones they approve, then open the pull request: never before the owner has chosen.
- On critical code (listed in `roadmap.md`, Critical code: accounts and sessions, the conformity of the certificate, the signature and the PDF, the Calendly webhook, the deletion of personal data), run the review again after applying its fixes, with a test per fix, until no high or medium finding is left. When a second fix lands on the same case, look for the rule that makes the case impossible rather than a third condition.
- When the owner puts a review off, nothing replaces it: finish the step, say what is left to them, and stop.
- Before each deployment that opens the application to new people (the test subdomain, a new craftsman), and at the end of each cycle, run the `security-auditor` subagent (`.claude/agents/security-auditor.md`) on the whole repository at `main`: it writes, in French, to `outputs/<YYYY-MM-DD>-security-audit.md`. Summarize it to the owner and fix the findings they approve before the deployment; a critical or high finding blocks it.
- When the owner asks to look at the Dependabot pull requests, run the `dependency-reviewer` subagent (`.claude/agents/dependency-reviewer.md`): it writes, in French, to `outputs/<YYYY-MM-DD>-dependency-review.md`. Give the owner its summary table; never merge, close or comment a Dependabot pull request yourself unless the owner asks.

## Lessons

- When the owner corrects how Claude Code works, or a practice proves useful, add one line to `docs/lessons.md` at once (its date, the lesson, where it may go), in the pull request of the step under way: the retrospectives sort them into the templates, this `CLAUDE.md`, the skills or the agents.
- Hold a retrospective often rather than one big one at the end: at the end of each cycle, and after any tool that went badly.

## Development

- The commands are listed in `docs/technical-choices.md` (Commands) and in the README. Before committing, make sure `npm run check` passes: Prettier, `svelte-check`, ESLint, Stylelint, the unit tests (Vitest), the production build, and the tests in a browser (Playwright: the width of every screen on a phone, then the main path). Run the checks with their exit codes written out (`npm run check; echo CHECK=$?`), never piped into `| tail` inside an `&&` chain: the pipe hides a failure.
- The same checks run in CI (`.github/workflows/ci.yml`) on every pull request, skipped when it only changes Markdown files and `docs/`. Never remove a failing CI job before reading its log.
- Every acceptance scenario of `specs.md` that a step touches becomes a test in the same pull request; each mandatory mention of the certificate (`docs/regulation.md`) has its test. When a bug reaches the owner that a test or a check could have caught, add it in the same pull request as the fix.
- Keep the code clean at every change: before each commit, reread the functions the change touches as a whole and refactor them, most of all after the fixes of a code review; say in the summary what was refactored. The rules of the code are in `docs/code-quality.md`: read it at the start of each step that changes code.
- TypeScript is stricter than `strict` and ESLint reads the types, for every file (`tsconfig.json`, `eslint.config.js`; see Strictness of the code in `docs/technical-choices.md`). An exception to a rule is a comment on its line with its reason (`// eslint-disable-next-line <rule> -- <reason>`), never a rule turned off for a file, and one that excuses nothing is an error. A `switch` that must place every value is written without `default`, and a table keyed by a closed list `satisfies Record<…>`.
- What comes from outside (a form, a webhook, a query string, an environment variable, a file) is validated with Zod before it has a type, never given one with `as`, and its size is bounded where it comes in.
- An expected failure (a field missing, a service that doesn't answer) is a `Result` (`#lib/result.ts`) with a code, never an exception; a thrown error is a bug, caught and logged by `handleError` (`src/hooks.server.ts`) without any personal data.
- The server code lives in `src/lib/server/` and in the `+page.server.ts` / `+server.ts` files: SvelteKit refuses to send it to the browser. Every load and every action checks who asks and that the record belongs to their company. The queries go through Drizzle, never a SQL text built from a value; a change of the schema comes with its migration (`npm run db:generate`).
- Svelte 5 only, with the runes (`$state`, `$derived`, `$props`, `$effect`): never the syntax of Svelte 4 (`export let`, `$:`, stores for the local state), which still fills the examples on the web. The forms are form actions with progressive enhancement.
- The styles are plain CSS: a component styles its own block with the design tokens and writes no color, text size, spacing or radius of its own; a value tuned by eye is an exception written with its reason.
- Every screen has a title, a language (`lang="fr"`) and is usable at phone width (360 px) with a finger. Accessibility: semantic HTML, sufficient contrast (WCAG AA), every action reachable with the keyboard with a visible focus, and nothing that moves when the user asked their system to reduce motion.
- The packages may not run an install script unless `allowScripts` in `package.json` allows it (`npm install-scripts ls`, then `approve` or `deny` with the owner).

## Personal data

- Agni handles the personal data of the craftsmen and of their clients (name, email, address, signature), under the GDPR: collect only what `specs.md` names, keep it only for the period it gives, and delete it all (the PDF and the signature too) when it says.
- Nothing personal in a log, an error page, an answer meant for another company, a commit or a test: the logs write the route and the kind of an error, never a value.
- The keys of the services and the secrets live in the environment (`.env`, ignored by Git; `.env.example` lists the variables without their values); never print their values, in the code, the logs or the conversation.
- A real answer of an outside service (a Calendly webhook) becomes a test fixture only once every personal value is replaced by an invented one.

## Deployment

- Local development first. The host, the domain and the test subdomain for the first tester are chosen at step 13 of `roadmap.md`, each with its grid.
- Never enter a payment method nor change the plan of an account of a service: the owner does it.
