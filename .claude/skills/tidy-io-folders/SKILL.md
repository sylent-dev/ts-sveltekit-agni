---
name: tidy-io-folders
description: Tidy the working folders inputs/ and outputs/ at the end of a numbered step (not of a sub-step), after asking the owner, by listing what can go (the notes of a finished step) and what stays (media, kept tools), then deleting only what the owner approves. Use it when a numbered step of roadmap.md is merged, or when the owner asks to clean, tidy or empty inputs/ or outputs/.
---

# Tidy the working folders

Goal: keep `inputs/` and `outputs/` small, so that the owner finds what matters in them and Claude Code doesn't read old notes for current ones. Both are ignored by Git (only their `.gitkeep` is tracked): what is deleted here is gone for good.

## 1. When

- **At the end of a numbered step** (once its last pull request is merged), not of a sub-step: the notes of a sub-step often serve the next one. Also when the owner asks.
- **Always ask first**: propose the tidying in one line, and run it on the owner's word.

## 2. List

List both folders with the size and the date of each entry, the newest first:

```sh
find inputs outputs -mindepth 1 -maxdepth 1 ! -name .gitkeep -printf '%TY-%Tm-%Td  %10s  %p\n' | sort -r
du -sh inputs outputs
```

Sort each entry into one of these, by its name, its date and what the roadmap says:

| Kind                     | Examples                                                                                   | Proposed                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Notes of a finished step | code review notes, audits, reports, previews, briefs of a merged step                      | delete                                                    |
| Notes still in use       | the review of the open pull request, a brief the roadmap or the memory names               | keep                                                      |
| Media                    | screenshots, images, videos, exported style boards                                         | keep unless the owner says (they may reuse them)          |
| Kept tools               | a folder of scripts with a `README.md`, named in the memory (the checks, the move scripts) | keep                                                      |
| `inputs/`                | anything the owner gave                                                                    | keep: never deleted unless the owner asks, entry by entry |

Before proposing to delete a note, check that nothing it holds is still owed: a recommendation left for later belongs in `backlog.md`, a decision in `docs/`; move it there first, in the pull request of the step under way.

## 3. Ask, then delete

- Show the owner one short table: what goes (with its size), what stays and why. Wait for their word; they may keep any entry.
- Delete only the approved entries, by their exact paths (never a pattern such as `outputs/*`), never `.gitkeep`.
- Say what was freed (`du -sh` again) in one line.
