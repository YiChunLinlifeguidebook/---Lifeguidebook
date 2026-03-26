# 20260326-T04 Platform Research Notes

## Scope

This note captures the environment research requested by Chun-Standard V1.0
for the following targets:

1. Termux API / Termux:X11
2. Shizuku / Dhizuku
3. Firebase Studio
4. VS Code / GitHub Copilot / MCP

## Track Mapping

- T1 = Editor automation and extensions
- T2 = Runtime/bootstrap
- T3 = Relay storage and path mapping
- T4 = Mobile bridge research
- T5 = MCP and AI governance

## Findings

### 1. Termux API / Termux:X11

- Termux:X11 requires both the Android-side application and a Termux package.
- Public installation guidance references:
  - `pkg i x11-repo && pkg i termux-x11-nightly`
  - optional `TERMUX_X11_XSTARTUP` environment variable
- Termux:API remains a separate package/app pair and should be considered a
  mobile runtime dependency rather than a repo-local dependency.
- Because this repository runs on Linux cloud infrastructure, we record the
  configuration and provide path manifests, but do not attempt direct APK or
  Android package installation from this repo.

### 2. Shizuku / Dhizuku

- Shizuku supports three startup modes: root, wireless debugging, or computer
  connected ADB.
- Wireless debugging requires Android 11+ and must be re-enabled after reboot.
- Dhizuku has compatibility risk on recent versions according to public issue
  reports, so the repo notes should treat Dhizuku as an optional bridge layer,
  not a guaranteed baseline.
- This repo therefore stores research notes and relay manifests only.

### 3. Firebase Studio

- Firebase Studio uses `.idx/dev.nix` as the authoritative workspace
  environment file.
- The environment can declaratively install packages, OpenVSX extensions,
  preview commands, and startup hooks.
- OpenVSX availability differs from the VS Code Marketplace. Some extensions
  like GitLens, Prettier, ESLint, Python, debugpy, and Docker have viable
  OpenVSX entries; official Remote-SSH does not.
- For Remote-SSH on OpenVSX-compatible environments, `jeanp413.open-remote-ssh`
  is a practical substitute.

### 4. VS Code / GitHub Copilot / MCP

- Auto Save is supported through `files.autoSave` and `files.autoSaveDelay`.
- GitHub Copilot workspace context and repository indexing are largely
  automatic; there is no single "max indexing" switch. The repo instead enables
  related settings that maximize available workspace context, instructions, and
  agent features under a trusted workspace.
- VS Code supports workspace MCP configuration in `.vscode/mcp.json`.
- MCP server configurations should avoid hard-coded secrets and should use
  workspace-local or prompt-based values.

## Decisions Applied In This Repo

1. Use `.vscode/extensions.json` for Marketplace recommendations.
2. Use `.idx/dev.nix` for Firebase Studio/OpenVSX-compatible auto-install.
3. Use `.vscode/mcp.json` plus `.mcp/20260326-T05-lock.json` for logic lock and
   reproducible MCP policy.
4. Use scripts and manifests for Microsoft 365 / Obsidian relay mapping instead
   of hard-coded machine-specific absolute paths.
5. Use date-tagged manifest files to satisfy Chun-Standard's YYYYMMDD labeling
   rule.
