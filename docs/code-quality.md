# Code quality

How the code of Agni is written. `CLAUDE.md` holds the conventions of the project (files, language, commits, checks); this file holds the rules of the code itself, adapted from [rust-exile-market](https://github.com/sylent-dev/rust-exile-market/blob/main/docs/code-quality.md) to TypeScript and SvelteKit.

Read it at the start of each step that changes code; `code-reviewer` reviews against it. A rule is followed, or the pull request says why not. TypeScript, ESLint, Stylelint and Prettier already enforce their own rules: they aren't repeated here.

## Names

- A name says what a thing is or does, in the words of the domain (a certificate, an appliance, a measure, a measuring instrument, a visit), not how it is computed. The words of the domain are translated once into English and kept: one notion, one word, across the whole code; two notions never share a word.
- A module is named by what it gives: no `utils`, `helpers`, `misc` nor `common`.
- Whole words; no abbreviation but those of the domain and of the web (`id`, `url`, `pdf`, `co` for carbon monoxide, `i18n`).
- A function that computes a value is named by what it returns (`mandatoryMentions`); one that acts, by a verb (`sendCertificate`). A predicate, and a boolean, reads as a question (`isSigned`, `hasEmail`).
- A number with a unit says it (`temperatureCelsius`, `delayDays`, `sizeBytes`).
- A test is named by the behavior it pins, as a sentence (`a certificate without the brand of the measuring instrument is refused`).
- A name the code has outgrown is renamed in the change that outgrew it.

## Functions

- One function does one thing, at one level of detail. Past about 50 lines or three levels of nesting, look for the part that deserves a name.
- The case that stops returns early; the main path isn't nested.
- At most four parameters; two of the same type side by side, which a call can swap unseen, become an object with named fields.
- No boolean parameter that switches what a function does: two functions, or a union named by its cases.
- The decision apart from the wiring: the rule in a pure function, without SvelteKit, the database or the network, and tested; the load, the action or the component that calls it stays thin.

## Types

- Invalid states can't be written: a discriminated union (`{ kind: 'gas'; … } | { kind: 'wood'; … }`), not two fields always set together, not flags that cross. A signed certificate and a draft are two types.
- A `switch` on a union of the project names every case, without `default`: adding a case points to every place to update. A table keyed by a closed list `satisfies Record<…>`.
- A branded type when two values of one type can be mixed up (the id of a client and the id of a company), or when a value carries an invariant checked once, where it is built.
- `undefined` for an absent value, never a sentinel (`-1`, `""`, `NaN`); a field left out and a field set to `undefined` mean different things (`exactOptionalPropertyTypes`).
- A rule on the meaning of a value is decided where its type is still known, never on the strings it was flattened into.
- A type that another file imports lives in a `.ts` file, not in a component.

## Modules

- One file, one responsibility, named by it. The data kept by hand (the mandatory mentions, the texts) apart from the code that reads it.
- Past about 800 lines of code (tests aside), a file is looked at for its parts. The length is a sign; the responsibilities decide.
- `src/lib` holds a folder per domain or block of the specifications (`certificate/`, `signature/`, `pdf/`…), with its components, its pure logic and its tests; `src/lib/server/` holds what only the server may run (the database, the services, the secrets). The routes import `src/lib`, never the other way.
- One module per border: the database (`#lib/server/db/`), each external service (the mail, Calendly), the texts (`#lib/i18n/`).
- What depends on the outside is given to the rule (the clock, the mailer, the database), so that a test can replace it.

## Rules of the domain

- One rule in one place: a rule of the regulation (a mention, a threshold, a delay of 15 days) is written once and called by every use.
- Each mandatory mention cites its section of `docs/regulation.md`; a number of the rules gets a named constant, with a comment that says where it comes from.

## Errors

- An expected failure is a `Result` (`#lib/result.ts`) whose error has a `code`; it carries its context (what was being done, on what), never a sentence for the user. The route turns the code into a French text of `#lib/i18n/fr.json`.
- A thrown error is a bug; it shows, through `handleError`, which logs nothing personal.
- An error is caught where its information still is (the status and the body of an answer of a service), not flattened into one code.
- The world is expected to be wrong at times (a form, a webhook, the network): it is handled gently, the craftsman can always go on.

## Comments

- Each module, exported function, type and constant has a doc comment that says what it is for, in one sentence, before how; but the tests, whose name is their sentence. A field has one when its name and its type don't say it all.
- A comment in a body says why, never what the code already says.
- A comment that no longer matches the code is a bug, fixed in the same change.
- The code says the rule of today. The source of a fact stays next to it (the section of the regulation, the date a service was read); the story of the decisions lives in `docs/`.

## Patterns

- Simple first: a function before a class, a union before an interface with one implementation, an object literal before a builder.
- A pattern only once its value is diagnosed, and that value written in the pull request: an interface at a seam a test must replace (the mailer, the clock, Calendly).
- Never a layer that adds without giving: no interface with one implementation and no test double, no generic used with one type.
- When a second fix lands on the same case, look for the rule that makes the case impossible rather than a third condition.

## Tests

- A test reads as an example of its rule: its name says the behavior, its body the case, built by a small helper rather than fifty lines of set-up. What the tests of a folder share lives in its `test-support.ts`.
- The reading of an outside format (a Calendly webhook, an answer of the mail provider) is tested on cases copied from real answers, anonymized, with their source and date in a comment, never on a text written in the shape the author expects.
- The expected value of a test is written from what the function says it does (its doc comment, `specs.md`, `docs/regulation.md`), then the test is run: a difference is a finding, and the owner decides which is wrong.
- An assertion compares the whole value; a part only when the rest doesn't matter. An expected exception is a named list, compared whole.
- Several cases of one behavior may share a test; two behaviors are two tests.
- A rule that orders or chooses (the last certificate of an appliance) gets a case where the rule and its nearest wrong neighbour disagree.
- What stays on the far side of a test seam is kept as small as possible, and tested through a real local server rather than a fake that hands over values already read.
- At the end of a step, read the written rules (`specs.md`, `docs/regulation.md`) one sentence at a time, and ask which test fails if that sentence stops being true.
- A component is tested in a browser (`*.svelte.spec.ts`) only for what its pure function can't show; the whole path, by a few tests of Playwright, which check the wiring and not the logic.

## Refactoring

- At the start of a refactoring step, read the whole code of its area and propose a numbered plan of improvements, one commit each; the owner accepts the plan.
- No change of behavior: the tests stay the same, checked after each commit. A test whose assertion changes is named in the pull request, with the reason.
- Before moving code, check it is tested; the moves first, in commits of their own (`git diff --color-moved=dimmed-zebra`), then one commit per improvement.
- Each small refactoring seen on the way, in the files the commit already touches, is done in the same pull request; a small fix of the behavior seen on the way, with its test, goes in a commit of its own, named in the pull request.
