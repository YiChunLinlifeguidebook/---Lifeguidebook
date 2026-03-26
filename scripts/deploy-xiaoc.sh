#!/usr/bin/env bash
# 小 C 分身：一鍵建置並啟動（需 Docker、專案根目錄有 .env）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "缺少 .env，請先: cp .env.example .env 並填入 LINE 憑證" >&2
  exit 1
fi

echo "[deploy-xiaoc] docker compose build..."
docker compose build

echo "[deploy-xiaoc] docker compose up -d..."
docker compose up -d

echo "[deploy-xiaoc] done. web:8080 bot:3000"
