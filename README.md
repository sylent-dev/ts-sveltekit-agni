# Agni

Agni lets French heating engineers, plumbers and refrigeration technicians produce the regulatory maintenance certificate at the end of a visit, have their client sign it on the phone, and email it as a PDF: « du rendez-vous à l’attestation signée, sans rien retaper ».

Version 1 is being built: see [specs.md](specs.md) for what it does and [roadmap.md](roadmap.md) for where it stands.

## Stack

SvelteKit 3 (Svelte 5) in TypeScript, Drizzle ORM over SQLite (libsql), Vitest and Playwright. The choices and their reasons are in [docs/technical-choices.md](docs/technical-choices.md).

## Run it

Requires Node.js 24 (`.nvmrc`).

```sh
npm ci
cp .env.example .env
npx playwright install --only-shell chromium   # once, for the tests in a browser
npm run dev                                    # http://localhost:5173
npm run check                                  # everything the CI checks
```

The other commands are listed in [docs/technical-choices.md](docs/technical-choices.md#commands).

## How it is made

The project follows [process.md](process.md) and the conventions of [CLAUDE.md](CLAUDE.md), with Claude Code.

## License

All rights reserved: the code is public to be read, not to be reused. See [LICENSE](LICENSE).
