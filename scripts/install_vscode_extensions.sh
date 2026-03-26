#!/usr/bin/env bash
set -euo pipefail

# 20260326-T01 Install recommended editor extensions where possible.

RECOMMENDED_EXTENSIONS=(
  "ms-python.python"
  "ms-python.debugpy"
  "ms-azuretools.vscode-docker"
  "eamodio.gitlens"
  "esbenp.prettier-vscode"
  "dbaeumer.vscode-eslint"
  "ms-vscode-remote.remote-ssh"
)

OPENVSX_FALLBACKS=(
  "jeanp413.open-remote-ssh"
)

if command -v code >/dev/null 2>&1; then
  EDITOR_BIN="code"
elif command -v code-insiders >/dev/null 2>&1; then
  EDITOR_BIN="code-insiders"
elif command -v codium >/dev/null 2>&1; then
  EDITOR_BIN="codium"
else
  echo "No VS Code-compatible CLI found. Skipping extension installation."
  exit 0
fi

install_extension() {
  local extension_id="$1"
  if "$EDITOR_BIN" --install-extension "$extension_id" --force; then
    echo "Installed: $extension_id"
    return 0
  fi
  return 1
}

for extension_id in "${RECOMMENDED_EXTENSIONS[@]}"; do
  install_extension "$extension_id" || true
done

for fallback_extension in "${OPENVSX_FALLBACKS[@]}"; do
  install_extension "$fallback_extension" || true
done

echo "Extension installation routine completed."
