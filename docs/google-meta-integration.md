# Google & Meta 跨域整合邏輯（2026-03-26）

> 狀態：取得 Meta 模型授權後，可啟動多腦架構；實作以環境變數與模組邊界為準。

## 1. 模型整合策略（Model Selection）

| 角色 | 建議服務 | 用途 |
|------|----------|------|
| 核心 | Google AI Studio / **Gemini 1.5 Pro** | 跨域資料消化、長上下文 |
| 輔助 | **Meta Llama**（如經 Vertex AI 託管） | 在地化中文對話與邏輯 |

- 金鑰與專案 ID 僅放在 **`.env`**（見根目錄 `.env.example`），不寫入程式碼或映像檔。
- 路由邏輯預留於 `src/modules/ai/`（見 `modelRoles.ts`）。

## 2. 自動化資安防衛（Security Shield）

- **Llama Guard**：於正式串接時在 `src/modules/security/` 替換 stub，對使用者輸入做分類／阻擋。
- **API 調用**：統一走 HTTPS、最小權限金鑰；若未來遷移 **Firebase / GCP**，請沿用同一套秘密管理（Secret Manager、環境隔離），與「2027 遷移」規劃對齊（細節以當時官方文件為準）。

## 3. SaaS 商業合規（Legal & Compliance）

- 每個對外發佈的「小 C 分身」產物應附 **Llama Community License** 完整副本：請自 [Meta Llama 授權頁](https://ai.meta.com/llama/license/) 取得最新版，置於 `legal/`（見 `legal/README.md`）。
- 對外 UI 建議顯示：**Built with Meta Llama**（範例見 `legal/badge-snippet.html`）。
- 實際商業條款請由法務確認；本文件不構成法律意見。
