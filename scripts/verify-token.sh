#!/usr/bin/env bash
# Enforces deploy token parity: token.txt, index.html marker, optional live URL (VERIFY_URL).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXPECTED="${DEPLOY_TOKEN_EXPECTED:-bc08}"

ACTUAL="$(tr -d ' \t\r\n' < "$ROOT/token.txt")"

if [[ "$ACTUAL" != "$EXPECTED" ]]; then
  echo "verify-token: token.txt mismatch (expected ${EXPECTED}, got ${ACTUAL:-<empty>})" >&2
  exit 1
fi

if ! grep -qF "data-deploy-token=\"${EXPECTED}\"" "$ROOT/index.html"; then
  echo "verify-token: index.html missing data-deploy-token=\"${EXPECTED}\"" >&2
  exit 1
fi

if [[ -n "${VERIFY_URL:-}" ]]; then
  base="${VERIFY_URL%/}"
  remote_txt="$(curl -fsS "${base}/token.txt")"
  remote_trim="$(echo -n "$remote_txt" | tr -d ' \t\r\n')"
  if [[ "$remote_trim" != "$EXPECTED" ]]; then
    echo "verify-token: remote token.txt mismatch at ${base}/token.txt" >&2
    exit 1
  fi
  if ! curl -fsS "${base}/" | grep -qF "data-deploy-token=\"${EXPECTED}\""; then
    echo "verify-token: remote index missing data-deploy-token at ${base}/" >&2
    exit 1
  fi
fi

echo "verify-token: OK (${EXPECTED})"
