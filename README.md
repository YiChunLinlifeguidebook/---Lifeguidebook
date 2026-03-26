# Lifeguidebook — 產品官方網站

> 你的人生嚮導，記錄、規劃、成長，一個 App 全搞定。

這個 repository 包含 Lifeguidebook 的產品介紹網站，使用純 HTML + CSS 建置，
並透過 **Cloudflare Pages** 部署。

---

## 📁 檔案結構

```
├── index.html   # 主頁面（Hero、功能介紹、下載區塊）
├── styles.css   # 全站樣式
├── .vscode/     # VS Code / Copilot / MCP 工作區配置
├── .idx/        # Firebase Studio 可重現環境
├── scripts/     # Chun-Standard 自動化腳本
├── ops/         # 5-Track manifest、relay mapping 與研究紀錄
└── README.md    # 本文件
```

---

## ⚙️ Chun-Standard V1.0 環境自動化

本次已將你要求的工作區自動化基線寫入 repository，重點如下：

- **VS Code 工作區配置**：`.vscode/settings.json`
  - 啟用 `Auto Save`
  - 啟用 Copilot agent / MCP / 指令檔整合
  - 提供 relay 路徑的額外唯讀上下文
- **一鍵任務流**：`.vscode/tasks.json`
  - Python venv + `debugpy`
  - 外掛安裝腳本
  - relay path mapping
  - Git 轉接站（Relay Repo）一鍵 push
- **Firebase Studio 配置**：`.idx/dev.nix`
  - 套件、OpenVSX 外掛、workspace hook、web preview
- **MCP 邏輯鎖定**：
  - `.vscode/mcp.json`
  - `.mcp/20260326-T05-lock.json`
- **5-Track 規範與研究紀錄**：
  - `ops/manifests/20260326-T01-5-track-manifest.md`
  - `ops/research/20260326-T04-platform-research.md`

### 外掛基線

**VS Code 推薦安裝：**

- Python
- Python Debugger (`debugpy`)
- Docker Explorer
- GitLens
- Prettier
- ESLint
- Remote-SSH

**Firebase Studio / OpenVSX 自動安裝：**

- `ms-python.python`
- `ms-python.debugpy`
- `eamodio.gitlens`
- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`
- `ms-azuretools.vscode-docker`
- `jeanp413.open-remote-ssh`

> 注意：官方 `ms-vscode-remote.remote-ssh` 在 OpenVSX / Firebase Studio 生態下不可保證直接提供，因此 repo 內對 Firebase Studio 宣告了 OpenVSX 相容替代品。

### 快速使用

1. 複製 relay 環境檔：

   ```bash
   cp .env.relay.example .env.relay
   ```

2. 如需覆寫 Microsoft 365 或 Obsidian 的中繼來源，編輯 `.env.relay`

3. 在 VS Code 執行任務：

   - `20260326-T05 Chun-Standard: Full workspace sync`
   - `20260326-T04 Git 轉接站 (Relay Repo): One-click Push`

4. 若在 Firebase Studio 開啟 workspace，`.idx/dev.nix` 會提供對應套件與 OpenVSX 外掛基線。

### 重要限制

- **Termux API / Termux:X11**、**Shizuku / Dhizuku** 屬於 Android 側整合；本 repo 已固化研究與操作基線，但不會在 Linux cloud repo 內直接安裝 APK 或啟動 Android system bridge。
- **GitHub Copilot 索引**本身以 GitHub / VS Code 的背景語意索引為主，並不存在單一「拉到最高」開關；本 repo 改以啟用 agent、instruction、code search、temporal context、MCP 等相關設定，達成可用範圍內的最高工作區上下文能力。

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