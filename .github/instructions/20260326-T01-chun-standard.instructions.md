---
applyTo: "**"
---

# 20260326-T01 Chun-Standard V1.0

- Follow the 5-track workflow declared in `ops/manifests/20260326-T01-5-track-manifest.md`.
- Every generated artifact, document, task, branch note, and operational file should carry a `YYYYMMDD-Tnn` style tag when practical.
- Prefer Traditional Chinese for operator-facing notes when the repository already contains Chinese copy.
- When platform limitations exist (for example OpenVSX vs Marketplace differences), document the limitation instead of pretending the automation succeeded.
- Keep relay automation idempotent: scripts may be re-run safely without breaking existing developer state.
