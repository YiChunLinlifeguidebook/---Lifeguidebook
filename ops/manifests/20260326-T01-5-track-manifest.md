# 20260326-T01 5-Track Manifest

## Track layout

1. **T01 Editor + AI**
   - `.vscode/settings.json`
   - `.vscode/extensions.json`
   - `.vscode/mcp.json`
   - `.github/copilot-instructions.md`
   - `.github/instructions/`
   - `.github/agents/`

2. **T02 Runtime + Bootstrap**
   - `.idx/dev.nix`
   - `scripts/bootstrap_python_env.sh`
   - `scripts/install_vscode_extensions.sh`
   - `.vscode/launch.json`

3. **T03 Data Relay**
   - `scripts/setup_relay_paths.sh`
   - `.env.relay.example`
   - `ops/manifests/20260326-T02-path-map.manifest.json`
   - `ops/relay/`

4. **T04 Research + Platform Notes**
   - `ops/research/20260326-T04-platform-research.md`
   - `ops/manifests/20260326-T03-extensions.manifest.json`

5. **T05 Governance + Lock**
   - `.mcp/20260326-T05-lock.json`
   - `.vscode/tasks.json`
   - `scripts/git_relay_push.sh`

## Naming rule

- Use `YYYYMMDD-Tnn` for automation artifacts and operational manifests.
- Use descriptive suffixes after the track id when additional detail is needed.

## Execution rule

- Prefer repo-local automation over global machine mutations.
- Keep external folder integrations configurable via `.env.relay`.
- Record platform limitations explicitly instead of pretending auto-install succeeded.
