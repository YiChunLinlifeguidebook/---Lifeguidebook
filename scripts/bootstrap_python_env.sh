#!/usr/bin/env bash
set -euo pipefail

# 20260326-T02 Bootstrap a local virtual environment for tooling and debugging.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${ROOT_DIR}/.venv"
BOOTSTRAP_TOOL_DIR="${ROOT_DIR}/.chun-tools"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required but was not found on PATH." >&2
  exit 1
fi

has_ensurepip() {
  python3 - <<'PY' >/dev/null 2>&1
import ensurepip
PY
}

create_venv() {
  if [[ -x "${VENV_DIR}/bin/python" ]]; then
    return 0
  fi

  if has_ensurepip; then
    python3 -m venv "${VENV_DIR}"
    return 0
  fi

  echo "python3 -m venv is unavailable; falling back to repo-local virtualenv bootstrap."
  rm -rf "${VENV_DIR}"
  mkdir -p "${BOOTSTRAP_TOOL_DIR}"
  python3 -m pip install --upgrade --target "${BOOTSTRAP_TOOL_DIR}" virtualenv
  PYTHONPATH="${BOOTSTRAP_TOOL_DIR}" python3 -m virtualenv "${VENV_DIR}"
}

create_venv
"${VENV_DIR}/bin/python" -m pip install --upgrade pip
"${VENV_DIR}/bin/python" -m pip install debugpy

echo "Python virtual environment ready at ${VENV_DIR}"
