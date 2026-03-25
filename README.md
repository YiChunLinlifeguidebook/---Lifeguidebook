# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📁 檔案結構

```
├── index.html   # 主頁面（Hero、功能介紹、下載區塊）
├── styles.css   # 全站樣式
├── Dockerfile   # 以 nginx 提供靜態檔（可選：VPS / 自架主機）
├── docker-compose.yml
├── .env.example # LINE 憑證變數名稱範本（勿填入真值後提交）
└── README.md    # 本文件
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

之後當 LINE Bot 服務整合進 Docker 時，會以 `env_file: .env` 等方式讀取上述變數（實作時請勿把密鑰寫進程式碼或映像檔）。

---

## 🖥️ VPS（Docker）部署

若要在自有伺服器上以容器執行：

```bash
docker compose up -d --build
```

預設會將網站對外於 **http://伺服器IP:8080**（可在 `docker-compose.yml` 修改對應埠）。

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