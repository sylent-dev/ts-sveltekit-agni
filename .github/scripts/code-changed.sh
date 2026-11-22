#!/bin/sh
# Writes `code=true` to the outputs of the step when the changes touch something else than the
# Markdown files and `docs/`, `code=false` otherwise: the checks of a documentation change are
# skipped. Without a base to compare with (a new branch), everything is checked.
#
#   code-changed.sh <base> <head>
set -eu

base=$1
head=$2

if [ -z "$base" ] || [ "$base" = 0000000000000000000000000000000000000000 ]; then
  code=true
else
  # Fails the job when a commit is missing, rather than skipping the checks. Without the
  # renames, a file moved from `src/` to `docs/` lists both paths, and is checked.
  files=$(git diff --no-renames --name-only "$base...$head")
  if printf '%s\n' "$files" | grep -qvE '(\.md$|^docs/|^$)'; then
    code=true
  else
    code=false
  fi
fi

echo "Code changed: $code"
echo "code=$code" >> "${GITHUB_OUTPUT:-/dev/stdout}"
