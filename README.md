# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange.svg)](https://pages.cloudflare.com/)

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📖 關於 Lifeguidebook

Lifeguidebook 是一款全方位的人生管理應用程式，幫助使用者：

- 📝 **記錄生命歷程**：用日記記下每個重要時刻
- 🎯 **規劃人生目標**：將夢想拆解成可執行的任務
- 📊 **追蹤成長進度**：視覺化呈現個人成長軌跡
- 🔔 **智慧提醒功能**：在最佳時機推送激勵訊息
- 🔒 **隱私安全保障**：端對端加密保護個人資料
- 📱 **跨平台同步**：iOS、Android 無縫使用

---

## 📁 檔案結構

```
.
├── index.html          # 主頁面（Hero、功能介紹、下載區塊）
├── styles.css          # 全站樣式（使用 CSS 變數與響應式設計）
├── LICENSE             # 授權文件
└── README.md           # 本文件
```

---

## 🚀 部署指南

### Cloudflare Pages 部署

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 **Workers & Pages → Create application → Pages → Connect to Git**
3. 選擇這個 GitHub repository（`YiChunLinlifeguidebook/---Lifeguidebook`）
4. **Build settings**（靜態網站不需要 build command）：
   - **Framework preset**：`None`
   - **Build command**：（留空）
   - **Build output directory**：`/`（根目錄）
5. 按下 **Save and Deploy**

部署完成後 Cloudflare 會提供一個 `*.pages.dev` 的網址，
之後可以在 **Custom domains** 裡綁定自己的網域。

### 本地開發

由於這是純靜態網站，您可以：

1. **直接開啟 HTML 檔案**：
   ```bash
   open index.html
   ```

2. **使用本地伺服器**（推薦，避免 CORS 問題）：
   ```bash
   # 使用 Python 3
   python3 -m http.server 8000

   # 或使用 Node.js 的 http-server
   npx http-server -p 8000
   ```

   然後在瀏覽器開啟 `http://localhost:8000`

---

## 🔗 App 連結設定

當 iOS 和 Android App 上架後，請更新 `index.html` 中的下載連結：

### iOS App Store
找到第 35-41 行和第 99-107 行的 App Store 按鈕：
```html
<a href="#download" class="btn btn-primary">
```
將 `href="#download"` 改為實際的 App Store 連結，例如：
```html
<a href="https://apps.apple.com/app/idXXXXXXXXXX" class="btn btn-primary">
```

### Android Google Play
找到第 42-48 行和第 108-117 行的 Google Play 按鈕：
```html
<a href="#download" class="btn btn-outline">
```
將 `href="#download"` 改為實際的 Google Play 連結，例如：
```html
<a href="https://play.google.com/store/apps/details?id=com.lifeguidebook.app" class="btn btn-outline">
```

---

## 🎨 設計特色

- **響應式設計**：自動適應各種螢幕尺寸（手機、平板、桌面）
- **現代化 UI**：採用毛玻璃效果、漸層色彩與流暢動畫
- **無障礙友善**：遵循 ARIA 標準，提供良好的可訪問性
- **CSS 變數**：易於維護與客製化主題色彩
- **輕量快速**：純 HTML/CSS，無需 JavaScript 框架，載入速度極快

---

## 🛠️ 技術規格

- **HTML5**：語意化標籤
- **CSS3**：
  - CSS Custom Properties (變數)
  - CSS Grid & Flexbox 佈局
  - 媒體查詢響應式設計
  - 動畫與轉場效果
- **無依賴**：不需要任何 JavaScript 框架或 CSS 預處理器

---

## 📄 授權

© 2026 Lifeguidebook. All rights reserved.

本專案為專有軟體，所有權利保留。未經授權，不得複製、修改或散布本軟體的任何部分。

---

## 📞 聯絡我們

如有任何問題或建議，歡迎透過以下方式聯繫：

- **GitHub Issues**：[提交問題](https://github.com/YiChunLinlifeguidebook/---Lifeguidebook/issues)
- **Email**：（待補充）

---

**Made with ❤️ by Lifeguidebook Team**