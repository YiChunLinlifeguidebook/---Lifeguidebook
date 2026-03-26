#!/usr/bin/env bash
set -euo pipefail

# 20260326-T05 Bootstrap the full Chun-Standard workspace locally.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ ! -f "${ROOT_DIR}/.env.relay" && -f "${ROOT_DIR}/.env.relay.example" ]]; then
  cp "${ROOT_DIR}/.env.relay.example" "${ROOT_DIR}/.env.relay"
fi

"${ROOT_DIR}/scripts/bootstrap_python_env.sh"
"${ROOT_DIR}/scripts/install_vscode_extensions.sh"
"${ROOT_DIR}/scripts/setup_relay_paths.sh" "${ROOT_DIR}/.env.relay"

echo "Chun-Standard workspace bootstrap complete."
