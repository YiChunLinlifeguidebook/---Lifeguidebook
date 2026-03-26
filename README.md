# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📁 檔案結構

```
├── index.html      # 產品官網
├── styles.css
├── src/index.ts    # LINE Bot（Express + /callback）
├── src/modules/logger/   # UniversalLogger 介面與 console 實作
├── src/modules/unified/  # UnifiedRecord 跨域資料形狀
├── src/modules/collectors/  # Wikipedia / 百度百科採集器
├── src/cli/collect-sample.ts  # 採集 CLI 範例
├── scripts/deploy-xiaoc.sh    # 一鍵 Docker 建置與啟動
├── docs/google-meta-integration.md  # Google & Meta 跨域整合與合規說明
├── legal/                     # Llama 授權放置說明、Built with Meta 標章片段
├── src/modules/ai/            # 多腦模型角色常數（預留）
├── src/modules/security/      # Llama Guard 類資安占位（stub）
├── package.json
├── tsconfig.json
├── Dockerfile
├── Dockerfile.bot
├── docker-compose.yml
├── .env.example
└── README.md
```

### 小 C 模組：跨域採集與一鍵部署

- **日誌**：`UniversalLogger`（`src/modules/logger`），LINE 服務已改用 `createConsoleLogger('line-bot')`。
- **採集範例**（需網路）：`npm run collect -- --wiki Taiwan` 或 `npm run collect -- --baidu 人工智能`
- **一鍵部署**（需 Docker 與 `.env`）：`./scripts/deploy-xiaoc.sh`
- **本機開發放寬 Guard stub**（非繞過雲端安全）：`source ./scripts/dev-unlock.sh`，或 `.env` 設 `DEV_RELAXED_MODE=1`
- **批次養分**（每行一關鍵字 → JSON Lines）：`npm run ingest-batch -- --wiki --file queries.txt --out out/wiki.jsonl`（可加 `--sanitize`）
- 政策說明：`docs/internal-external-policy.md`

百科 API 可能隨供應商變更；若百度百科回傳失敗，請檢查網路或稍後再試。

---

## 🔑 還原 LINE 憑證（本機 / VPS）

此 repo **不** 存放真實密鑰。若你曾在別台機器或備份裡保存過憑證，請在本機專案根目錄還原如下：

1. 複製範本並命名為 `.env`（此檔已列入 `.gitignore`，不會被提交）：
   ```bash
   cp .env.example .env
   ```
2. 用編輯器開啟 `.env`，填入：
   - **Channel secret** → `LINE_CHANNEL_SECRET`
   - **Channel access token**（長期）→ `LINE_CHANNEL_ACCESS_TOKEN`
3. 若憑證遺失，請到 [LINE Developers Console](https://developers.line.biz/) → 你的 **Messaging API** Channel → **Messaging API** 分頁重新發行 **Channel access token**，並確認 **Channel secret** 與 Webhook 設定。

Compose 服務 **bot** 會讀取專案根目錄的 `.env`（請勿把密鑰寫進程式碼或映像檔）。

### LINE Webhook

在 LINE Developers → **Messaging API** → **Webhook URL** 設為：

`https://你的網域或伺服器/callback`

（需 HTTPS 且可從網際網路連到埠 **3000** 對應的路由；本機測試可用 [ngrok](https://ngrok.com/) 等工具轉發。）

---

## 🖥️ VPS（Docker）部署

先準備 `.env`（見上），再在專案根目錄執行：

```bash
docker compose up -d --build
```

- 靜態網站：**http://伺服器IP:8080**
- LINE Bot：**http://伺服器IP:3000**（對外 Webhook 請用 HTTPS 反代到此埠的 `/callback`）

只跑 Bot、不要官網時：

```bash
docker compose up -d --build bot
```

本機開發（需先 `cp .env.example .env` 並填入憑證）：

```bash
npm install
npm run build
npm start
```

---

## 🚀 Cloudflare Pages 部署步驟

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 **Workers & Pages → Create application → Pages → Connect to Git**
3. 選擇這個 GitHub repository（`YiChunLinlifeguidebook/---Lifeguidebook`）
4. **Build settings**（靜態網站不需要 build command）：
   - Framework preset：`None`
   - Build command：（留空）
   - Build output directory：`/`（根目錄）
5. 按下 **Save and Deploy**

部署完成後 Cloudflare 會提供一個 `*.pages.dev` 的網址，  
之後可以在 **Custom domains** 裡綁定自己的網域。

---

## 🔗 日後連結 App

- **iOS App**：將 App Store 連結填入 `index.html` 中 `href="#"` 的 App Store 按鈕。
- **Android App**：將 Google Play 連結填入 `index.html` 中 `href="#"` 的 Google Play 按鈕。

---

## 📝 授權

© 2026 Lifeguidebook. All rights reserved.