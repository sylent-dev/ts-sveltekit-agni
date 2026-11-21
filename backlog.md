# Backlog

Everything noted and not being done: read when the next work is chosen, not at every session (process.md, The backlog). One entry per item: what it is, what it depends on, and the date it was noted.

## Polish

## Edge cases

## Features

- **Maintenance certificate of heat pumps.** Its own regulatory text to read first (`docs/regulation.md`). Depends on version 1. Noted 2026-11-22.
- **Refrigerant intervention form CERFA 15497\*04**, then *05 once published. Depends on version 1; a CERFA, unlike the boiler certificate: check whether the official form must be reproduced as is. Noted 2026-11-22.
- **Refrigerant tracking slip (BSFF) through the Trackdéchets API.** Depends on the CERFA 15497. Noted 2026-11-22.
- **Yearly reminder of maintenance to the client, with the Calendly link of the craftsman.** Depends on step 14 (Calendly) and on the email provider. Noted 2026-11-22.
- **Offline mode** (a cellar without network): fill and sign offline, send once the network is back. Depends on version 1. Noted 2026-11-22.
- **« Nouveautés » page**, the changes shown to the craftsmen, needed once some of them pay for « 2 to 3 years of updates » (form of 2026-11-21, item 19). Depends on the paying customers. Noted 2026-11-22.

## Large works

- **Mutation tests (Stryker) on the validation of the certificate** (form of 2026-11-21, item 12). Depends on step 7. Noted 2026-11-22.
- **Check of the licenses of the dependencies in the CI** before selling (form of 2026-11-21, item 15). Until then, `dependency-reviewer` reads the license of each new package. Noted 2026-11-22.
- **ESLint rules on the layout of the imports**, a minimal version (the domain imports neither the routes nor Drizzle directly) once the folders are settled (form of 2026-11-21, item 7). Depends on step 12. Noted 2026-11-22.

## Waiting on others

- **The price** (trial, monthly or one-off payment): to validate with craftsmen, the first tester first. Noted 2026-11-22.
- **The domain** (agni.pro, agni.company or agni.business on Cloudflare Registrar): to reserve before step 13. Noted 2026-11-22.
- **The « Specs Reviewer » skill of a friend of the owner**: its generic rules were taken into `CLAUDE.md` (Recording the owner's decisions in the specifications) on 2026-11-22; a real review of the specifications (gaps and contradictions), as an agent, stays an idea to look at later. Noted 2026-11-22.

## Explorations kept
