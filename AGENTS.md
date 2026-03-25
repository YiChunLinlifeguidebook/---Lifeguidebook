# AGENTS.md

## Cursor Cloud specific instructions

This is a **pure static HTML/CSS website** (no JavaScript, no build tools, no package manager, no dependencies).

### Running the site locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. There is no build step, no linting, and no automated tests.

### Key notes

- The repository contains only `index.html`, `styles.css`, and `README.md`.
- Deployment is via **Cloudflare Pages** with no build command — files are served directly from the repo root.
- App Store / Google Play links are placeholder (`href="#"`) until the mobile app launches.
- The site is in Traditional Chinese (zh-TW).
- There are no dependencies to install and no update script is needed beyond a no-op.
