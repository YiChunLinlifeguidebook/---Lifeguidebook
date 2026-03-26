#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RELAY_DIR="${ROOT_DIR}/.relay"
ENV_FILE="${1:-${ROOT_DIR}/.env.relay}"
M365_LINK="${RELAY_DIR}/m365-current"
OBSIDIAN_LINK="${RELAY_DIR}/obsidian-current"

mkdir -p "${RELAY_DIR}"

if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
fi

M365_TARGET="${M365_DIGEST_SOURCE:-${ROOT_DIR}/ops/relay/m365-digest-pool}"
OBSIDIAN_TARGET="${OBSIDIAN_LOGIC_SOURCE:-${ROOT_DIR}/ops/relay/obsidian-logic-vault}"

mkdir -p "${M365_TARGET}" "${OBSIDIAN_TARGET}"

ln -sfn "${M365_TARGET}" "${M365_LINK}"
ln -sfn "${OBSIDIAN_TARGET}" "${OBSIDIAN_LINK}"

printf '20260326-T04 M365 relay -> %s\n' "${M365_TARGET}"
printf '20260326-T05 Obsidian relay -> %s\n' "${OBSIDIAN_TARGET}"
