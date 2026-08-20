# OFFICIAL FREEZE STAMP — Zero Energy (can-gallery)

| Field | Value |
|-------|--------|
| **Status** | **FROZEN** |
| **Date** | 2026-08-13 |
| **Human action** | Package for future agents + freeze the project/clone |
| **Section** | `can-gallery` (the shipped experience) |
| **Routes** | `/lab/can-gallery` (product) · `/` hub · `/home` → lab |
| **Port** | **3070** |
| **Brand** | **Zero Energy** (Ciao Energy rename in visible UI) |
| **Quality bar** | Platinum exact (source stack + source math) |

## Authority

- Freeze rules: `DECISIONS.md`, `SETUP.md`, `AGENT-NOTES.md`
- Agent packages: `agent-packages/00-LAB-SHELL.md`, `01-CAN-GALLERY-AGENT-PACKAGE.md`
- Protocol: `PROTOCOL.md` → `E:\website-tests\MOTION-CLONE-PROTOCOL.md` v1.2
- Workspace registry: `../CATALOG.md`, `../README.md`, `../ports.md`

## What is frozen

The **entire shipped clone**: lab, section module, WebGL, HUD init, copy, public assets, CSS, fonts, audio, GLB/HDR/textures. This is the product. There is **no separate Home assembly** — `/home` redirects to the lab by design.

## Do not edit without reopen

All paths listed under **Frozen paths** in `README.md` / `SETUP.md`.

## Sign-off criteria met

- [x] Lab is the shared section module (no fork)
- [x] Three **0.161** + Lenis **1.3** + GSAP + ScrollTrigger + SplitText
- [x] Source HUD chrome + source WebGL constants
- [x] Horizontal grab/drag on canvas (overlay `pointer-events: none`)
- [x] Benefit icons; left HUD letters / profile copy hidden
- [x] User WebP can labels + logo wired locally
- [x] Logo lockup Z is **designed cut**, not a clip bug
- [x] Benefits 1–4 + ZERO BULLSHIT + 9 FAQ + closer (Zero Energy)
- [x] **Local-only:** no mailto, no outbound hrefs, no CDN/fetch to original servers in shipped code or public view
- [x] First-paint FOUC gate (`body.is-hud-ready`)
- [x] Contact → `#FAQ` (in-page only)
- [x] Agent SETUP + packages + this stamp
- [x] CATALOG / residual backlog / workspace laws updated

## Local-only seal (freeze-time scan)

Scan of `app/src`, `app/public`, `app/index.html` (excluding `node_modules` / lockfile):

| Class | Result |
|-------|--------|
| `https://` / `http://` to remote hosts | **None** in runtime files |
| `mailto:` | **None** |
| ciaoenergy.com / mprez / website-files / sibforms / recaptcha / umami / instagram / tiktok | **None** |
| Remaining `http://` | SVG `xmlns="http://www.w3.org/2000/svg"` only (not a network request) |
| Asset loads | `/textures/*`, `/img/*`, `/webgl/*`, `/fonts/*`, `/audio/*`, `/css/*` |

`package-lock.json` contains npm registry URLs. Those are **install-time only**, never fetched by the browser.

`research/` is an **archive**. It may still contain source URLs. It is **not shipped**.

**Agents: stop. Wait for human reopen.**
