#!/usr/bin/env bash
# 本機開發「最小限制」：僅放寬我們自己的 Guard stub，不繞過法律、平台 ToS 或雲端 IAM。
# 使用方式：source ./scripts/dev-unlock.sh
# 或：     . ./scripts/dev-unlock.sh

export NODE_ENV="${NODE_ENV:-development}"
export DEV_RELAXED_MODE=1

echo "[dev-unlock] DEV_RELAXED_MODE=1 NODE_ENV=$NODE_ENV"
echo "[dev-unlock] 提醒：仍須遵守 Llama/Google 授權與各 API 條款；勿用於規避稽核或對外隱匿行為。"
