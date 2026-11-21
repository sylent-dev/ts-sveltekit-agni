# Process

How Agni goes from an idea to an application its first craftsmen use, then keeps growing, with Claude Code. It follows the process of [ts-svelte-idealan](https://github.com/sylent-dev/ts-svelte-idealan/blob/main/process.md) and [ts-astro-static-website-template](https://github.com/sylent-dev/ts-astro-static-website-template/blob/main/process.md), with the practices of [rust-exile-market](https://github.com/sylent-dev/rust-exile-market) and [rust-ts-stepwise](https://github.com/sylent-dev/rust-ts-stepwise) that fit a SaaS (the form of 2026-11-21): the probe before the mock-up, the quality audit, the security audit, the review of the critical code, the guides of the tests by hand.

The process is not a straight line. Its phases are **tools**, picked for each change according to what it needs: a text goes straight to the build, a new screen goes through its wireframe and mock-up first. What is not being done lives in a **backlog**; what is chosen goes to the **roadmap**, one pull request per step. Each tool ends with something the owner validates, from the cheapest to the most expensive: changing a sentence in the specifications costs less than changing a wireframe, which costs less than changing code.

This file is a living document: update it with what worked and what didn't (see [Retrospective](#retrospective)), and bring back to the templates the lessons that apply to every project.

## How it works

1. **Start the project** from the conventions of the templates, and size it with the owner (see [Size the project](#size-the-project)).
2. **The first cycle** takes version 1 to its first tester, through every tool in order: specifications, probes, structure, wireframes, mock-up, design system, build, quality audit, launch, retrospective.
3. **Then the loop**: with the owner, pick from the [backlog](#the-backlog) what comes next, write it in `roadmap.md` as steps, size each change and split it into sub-steps when it helps ([Size a change](#size-a-change)), and run only the tools it needs. A group of steps with a goal (« the heat pumps ») is a **cycle**: it ends with its retrospective, and with a launch when it changes what the craftsmen use.
4. **Outside the roadmap**, two kinds of work: an [urgent fix](#urgent-fixes) that can't wait, and an [exploration](#explorations) that tries an idea before deciding.

## Size the project

Agni is an application with accounts and personal data: every tool, with the structure and the data model first, and a database. Chosen with the owner on 2026-11-22, and written at the top of `roadmap.md`.

## Size a change

At the start of each step, Claude Code says which tools the change needs, and why; the owner may add or remove one.

| Change                                                                       | Tools                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A text, a fix, a dependency                                                  | Build.                                                                                                                                                                                                                                             |
| A visual touch, a new component                                              | Mock-up (a control to compare), then build; the decision in `docs/branding.md`.                                                                                                                                                                    |
| A new action on an existing screen                                           | Specifications, then build.                                                                                                                                                                                                                        |
| A new screen                                                                 | Specifications, wireframe, mock-up, build.                                                                                                                                                                                                         |
| A new kind of stored data, a new external service, a new regulatory document | Specifications and structure first (the data, its migration, its retention; the service checked in `docs/external-services.md`; the text checked in `docs/regulation.md`), a probe if a risk is unknown, then the tools of the screens it touches. |
| A redesign                                                                   | Every tool, in order.                                                                                                                                                                                                                              |

Only when it helps, a step is split into sub-steps, one pull request each, each one coherent and tested on its own, with its commits listed before any code. A small step stays whole, since each pull request also costs a review, the checks and an archive. When a step turns out larger than sized, stop and size it again with the owner rather than stretching the pull request.

## The backlog

`backlog.md` holds everything noted and not being done: an evolving list, read when the next work is chosen, not at every session.

- **What goes in**: the touches set aside during a step (polish), the edge cases that need thought, the features for later, the large works, what waits on someone else (the first tester's feedback), and the explorations kept.
- **One entry per item**: what it is in one sentence, its section, what it depends on, and the date it was noted. Claude Code adds an entry as soon as an idea comes up outside the current step.
- **From the backlog to the roadmap**: when the roadmap has no step left, or at the end of a cycle, Claude Code proposes the next items with their cost and dependencies; the owner picks.
- At each retrospective, the backlog is sorted: what is done or no longer wanted leaves it.

## Urgent fixes

A fix that can't wait (data shown to the wrong company, a certificate wrong, a security alert) jumps the roadmap:

1. Branch `fix/<short-description>` from `main`, even while a step is in progress (in a worktree if the owner is testing the step in the main folder).
2. The fix, the test that would have caught it, the code review, a pull request opened at once.
3. Once merged, one line in `roadmap.md`, under the step in progress, and the step goes on.

## Explorations

An idea that needs trying before deciding (a library, a way to draw the signature, the layout of the PDF) is an exploration, not a step.

1. A branch `explore/<short-description>`, or a page in the scratchpad: nothing of it is merged as it is.
2. Bounded: the owner and Claude Code agree on the question it must answer.
3. It ends with its result written down: a decision in `docs/` (kept or set aside, and why), an entry of the backlog, or a step of the roadmap that rebuilds it properly.

## The tools

| Tool                              | Use it when                                   | Output                                                        | Done when                                                                                |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Specifications](#specifications) | The application does something new            | `specs.md`, `docs/regulation.md`, the external services       | The owner has answered the open questions; no `[OPEN]` is left that the next step needs. |
| [Probe](#probe)                   | A risk of the design is unknown               | A decision in `docs/technical-choices.md`                     | The question of the probe has its answer.                                                |
| [Structure](#structure)           | The screens or the stored data change         | The screens and the data in Excalidraw, written in `specs.md` | The owner has moved the cards and chosen a lead.                                         |
| [Wireframes](#wireframes)         | A new screen, a new layout                    | `docs/wireframes/*.excalidraw`                                | The owner has edited and approved the layout.                                            |
| [Mock-up](#mock-up)               | Any visual choice                             | `docs/mockups/*.html`                                         | Every screen and state looks right at every width, on the owner's phone too.             |
| [Design system](#design-system)   | At the end of a mock-up, a new token          | Tokens and decisions in `docs/branding.md`                    | Colors, sizes and typography are written as tokens.                                      |
| [Build](#build)                   | Always                                        | One pull request per step                                     | The step's box of `roadmap.md` is checked.                                               |
| [Quality audit](#quality-audit)   | Once the core of a version is built           | `docs/quality-audit.md`, its refactorings                     | The refactorings it names are merged.                                                    |
| [Launch](#launch)                 | The first tester, a new craftsman             | The application on its address, the security audit            | The owner and the tester have run the guides of the tests by hand.                       |
| [Retrospective](#retrospective)   | The end of a cycle, or a tool that went badly | Changes to this file, the templates and the backlog           | The lessons are written down.                                                            |

## Specifications

Goal: agree on **what** the application does before deciding **how**. For a change after the first cycle, only the sections it touches.

1. Claude Code asks its questions, a few at a time, or as a form in `outputs/` for a series. The usual ones here: who uses each screen, on which device, where (a cellar, a boiler room); what the regulation requires, word for word; what happens when the client refuses to sign, has no email, or the mail bounces; which data is kept, for how long, and who may change or delete it; which external services, with which limits, and what happens when one doesn't answer.
2. **Check the regulation at its source**: the official text on Légifrance, its date, its amendments, and the reference models (UMGCCP/FFB, Pro'Réno), only to compare. Write each mandatory mention with its source in `docs/regulation.md`.
3. **Check the external services early** (Calendly, the email provider, later the host): documentation, limits, terms of use, where the personal data goes. Record the limits and every risk the owner accepts, with its date, in `docs/external-services.md`.
4. Write `specs.md`: behavior and content only (what the craftsman and the client see, what each action does, the stored data and its retention, the edge cases, the errors), with the rules of `CLAUDE.md`, Recording the owner's decisions in the specifications.
5. Confirm or adapt the technical choices of `docs/technical-choices.md`, each new one with its grid, then write the steps in `roadmap.md`.

## Probe

Goal: settle the riskiest unknown of the design before drawing it, in half an hour, on real hardware or against the real service.

1. One question per probe (« is a signature drawn with a finger on an Android phone sharp enough in the PDF? »), agreed with the owner.
2. Built in the scratchpad or a worktree, never pushed; tried on the owner's phone when the question is about a phone.
3. The answer goes into `docs/technical-choices.md` (a decision with its grid) or into `specs.md`; the probe is thrown away.

## Structure

Goal: agree on the screens, how one leads to another, and the data they keep, before drawing them.

1. Claude Code draws the structure in Excalidraw (`excalidraw-wireframes` skill): one card per screen or per kind of data (the company, a technician, a measuring instrument, a client, an appliance, a visit, a certificate), with the current state and **two leads** side by side, a parking area and the open questions, one group per item so that the owner moves the cards by hand.
2. The owner moves the cards, compares the leads, and chooses; Claude Code redraws the chosen lead, completed.
3. The data follows from it: write in `specs.md` what each table holds, who writes it, how long it is kept, and what deleting it deletes.

## Wireframes

Goal: agree on the **layout** of each screen, without colors or code, in a format the owner can edit (`excalidraw-wireframes` skill).

1. An Excalidraw file in `docs/wireframes/`: grayscale, real content from the specifications, one frame per screen, **the phone width first**, one group per block.
2. Claude Code checks the result with a preview, kept in its scratchpad, before handing it over.
3. The owner edits it in VS Code with the **Excalidraw** extension (`pomdtr.excalidraw-editor`), or on excalidraw.com. The extension neither saves by itself nor reloads a file changed on disk: **Ctrl+S** before asking Claude Code to read it; before Claude Code rewrites it, save and close its tab.
4. Iterate: the owner draws their version, Claude Code rearranges it and fills the gaps; Claude Code commits the owner's version before changing it.
5. Once the main frames are agreed, Claude Code draws the rest: the empty states, a client without email, a signature refused, a mail that bounces, a certificate already sent.

## Mock-up

Goal: choose the style with real content, every screen and every state, before building them (`html-mockups` skill).

1. HTML pages in `docs/mockups/`, built from the approved wireframes, with real content, split into small files.
2. **Several styles, 3 or 4**, each with its own fonts, colors and density, switched with tabs at the top of the page; each style only sets tokens (CSS variables). They explore new directions for a tool used with a finger, in a boiler room, by a craftsman who wants it fast, and for a client who signs on someone else's phone.
3. The owner picks a style, or mixes two; iterate on it alone, one decision at a time, each with its own control on the page, removed once decided and written in `docs/branding.md`. The PDF of the certificate is part of the mock-up: it is what the client keeps.
4. **Check the mock-up on the owner's phone** before approving it. From then on, the mock-up is the reference of the interface.
5. Fonts whose license allows self-hosting and embedding into a PDF (e.g. SIL Open Font License).

## Design system

Write the visual choices once, in `docs/branding.md`, as named tokens next to the decisions they come from: colors (contrast WCAG AA, in the sun of a courtyard too), sizes (spacing, radius, touch targets of 44 px at least), typography, images, and the tone of the texts (« vous » to the craftsman and to the client, short, never official). The `:root` of the mock-up becomes the tokens of the application. At the end, add an entry to [design-journal.md](design-journal.md), here and in the template.

## Build

For each step of `roadmap.md`, in order:

1. Branch `<type>/<short-description>` from `main`, in the main folder if the owner isn't testing anything there.
2. Code, with the tests; then `npm run check`, with its exit code.
3. Run the `code-reviewer` subagent: its notes, in French, go to `outputs/`. Claude Code summarizes them; the owner chooses which to apply. On critical code, the review runs again until no high or medium finding is left.
4. Commit (Conventional Commits), push, open the pull request; it checks the step's box in `roadmap.md`.
5. The CI passes; the owner reviews and squash merges; `git pull` on `main`.
6. When a step changes the behavior or the stored data, update `specs.md` and `roadmap.md` in the same pull request; when it needs the owner's hands (a phone, a mailbox), write its guide in `docs/tests/`.

## Quality audit

Once the core of a version is built, and before the next steps copy its patterns, Claude Code reviews the whole code area by area (`code-reviewer` in its area mode) and writes `docs/quality-audit.md`: a verdict, the brief of each refactoring (one pull request each), what the steps to come settle first, what is sound and should be copied, and what the audit chose not to change.

## Launch

1. The host, the domain and the subdomain of the test are chosen, each with its grid, and recorded in `docs/external-services.md`.
2. The `security-auditor` subagent audits the whole repository at `main`; the findings the owner approves are fixed first, and a critical or high finding blocks the launch.
3. The owner runs every guide of `docs/tests/` on their phone, then the tester does; their results come back in the conversation.
4. The tester's feedback goes to the backlog.

## Retrospective

At the end of each cycle, or after any tool that went badly:

1. What took longer than expected? What had to be redone? What did the owner like most?
2. Sort `docs/lessons.md` into this file, `CLAUDE.md`, the skills, the agents, or the templates; sort the backlog.
3. Read Claude Code's memory of the project: a rule that holds for the whole project moves to `CLAUDE.md` or this file.

## Lessons learned

The lessons of the previous projects are in the process of each one ([ts-svelte-idealan](https://github.com/sylent-dev/ts-svelte-idealan/blob/main/process.md#lessons-learned), [rust-ts-stepwise](https://github.com/sylent-dev/rust-ts-stepwise/blob/main/process.md#lessons-learned)) and in [rust-exile-market/docs/lessons.md](https://github.com/sylent-dev/rust-exile-market/blob/main/docs/lessons.md). Those of Agni are written in [docs/lessons.md](docs/lessons.md) as they come.
