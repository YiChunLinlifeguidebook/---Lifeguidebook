# 內部授權與對外合規（協議說明 · 2026-03-26）

## 我們**不**實作的需求

- **不**針對任何個人「指令」自動繞過**所有**安全性與隱私警告。
- **不**提供「對外隱藏內部特權行為」或規避稽核的機制。
- **不**以「Root / Workspace Admin」名義在程式內授予超越使用者本機權限的能力。

上述行為違反安全與合規原則，且易被濫用。

## 我們**有**提供的替代方案

| 能力 | 實作 |
|------|------|
| 本機開發較少限制 | `DEV_RELAXED_MODE=1`（僅在非 production 時放寬**內建 Guard stub**） |
| 一鍵進入開發模式 | `source ./scripts/dev-unlock.sh` |
| 對外傳輸前去敏 | `sanitizeForExternalPayload()`（`src/modules/export/`） |
| 大量維基／百科養分 | `npm run ingest-batch`（節流 + JSON Lines 輸出） |

## 合規

- 對外模組仍須附 **Llama / Google** 等授權與標示（見 `legal/`、`docs/google-meta-integration.md`）。
