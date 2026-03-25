# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS + JavaScript 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📁 檔案結構

```
├── index.html          # 主頁面（Hero、功能介紹、下載區塊）
├── styles.css          # 全站樣式
├── token-gate-core.js  # Token 強制校對邏輯（可供瀏覽器與測試共用）
├── token-gate.js       # 前端事件綁定與回傳顯示
├── token-gate.test.js  # Token 回傳測試（node:test）
├── package.json        # 測試指令
└── README.md           # 本文件
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

## 🧪 Token 強制校對與回傳測試

目前下載區塊已加入 Token Gate：

- 使用者點擊下載前，會先執行 Token 格式校對（16-64 碼，僅允許英文/數字/底線/減號）。
- 不合法 Token 會**強制阻擋下載**並顯示明確錯誤回傳。
- 合法 Token 會回傳可下載狀態與平台導向資訊。

執行測試：

```bash
npm test
```

---

## 📝 授權

© 2026 Lifeguidebook. All rights reserved.