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
└── README.md    # 本文件
```

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