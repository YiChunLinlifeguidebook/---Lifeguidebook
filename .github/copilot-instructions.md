---
applyTo: "**"
---

# 20260326-T01 Chun-Standard V1.0

## Core operating rules

- Follow the 5-Track execution model documented in `ops/manifests/20260326-T01-5-track-manifest.md`.
- Tag automation artifacts with a `YYYYMMDD-Tnn` label whenever a dated identifier is required.
- Prefer Traditional Chinese for operator-facing notes when the repository already contains Chinese text.
- Keep generated paths and relays configurable through `.env.relay`.
- Treat `.vscode/mcp.json` and `.mcp/20260326-T05-lock.json` as the source of truth for workspace MCP alignment.

## Review and implementation preferences

- Separate VS Code Marketplace recommendations from Firebase Studio/OpenVSX auto-install declarations.
- When a requested integration depends on external folders, implement a relay or mapping mechanism instead of hard-coding nonexistent absolute paths.
- Document platform limitations explicitly in `ops/research/`.
