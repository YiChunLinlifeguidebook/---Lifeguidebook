#!/usr/bin/env bash
set -euo pipefail

DATE_TAG="${1:-$(date +%Y%m%d)-T05}"
MESSAGE="${2:-chore(relay): ${DATE_TAG} relay push checkpoint}"

BRANCH="$(git branch --show-current)"
if [[ -z "${BRANCH}" ]]; then
  echo "Unable to determine current git branch." >&2
  exit 1
fi

echo "[relay] branch: ${BRANCH}"
echo "[relay] tag: ${DATE_TAG}"
git status --short

git add .vscode .idx .github .mcp ops scripts README.md .gitignore .env.relay.example || true

if git diff --cached --quiet; then
  echo "[relay] no staged changes to commit."
else
  git commit -m "${MESSAGE}"
fi

git push -u origin "${BRANCH}"
