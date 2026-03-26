# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📁 檔案結構

```
├── index.html      # 產品官網
├── styles.css
├── index.js        # LINE Bot（Express + /callback）
├── package.json
├── Dockerfile      # 靜態網站（nginx）
├── Dockerfile.bot  # LINE Bot（Node 20）
├── docker-compose.yml
├── .env.example
└── README.md
```

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