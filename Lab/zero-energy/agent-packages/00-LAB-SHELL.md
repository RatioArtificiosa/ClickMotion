# 00 — Lab shell (Zero Energy)

**Status:** **FROZEN**  
**App root:** `E:\website-tests\zero-energy-clone\app`  
**Port:** **3070**

## Routes

| Path | Component | Notes |
|------|-----------|--------|
| `/` | `Hub.tsx` | Index only. Internal `Link`s. No outbound. |
| `/lab/can-gallery` | `CanGalleryLab.tsx` | **The product.** Tiny `.ze-lab-badge` + shared `CanGallery` |
| `/home` | `<Navigate to="/lab/can-gallery" replace>` | Home assembly **waived** at freeze |
| `*` | `<Navigate to="/" replace>` | |

Router: `src/main.tsx` (`BrowserRouter`).

## Rules

1. Lab mounts the **same** `CanGallery` module any future Home would use. Never fork scene logic into the lab page.
2. Do **not** add a competing smoother. Lenis lives inside `webgl-scene.js`.
3. Dev: `cd app` → `npm run dev` → Vite `--host --port 3070`.
4. Lab chrome is a **9px** overlay badge (`Lab · Hub`). A large header shifts scroll math and covers the logo — never restore one.
5. `html` background `#000`. `#root` / `body` **transparent**.
6. Linked CSS in `index.html` **before** the React module: shared + inline-0/1/2/4. `inline-1` holds the pre-React FOUC gate.
7. **Local-only:** no remote `<script>`, `<link>`, `src`, `href`, or `fetch` in the shell.

## Chrome split

| Surface | Hub `/` | Lab `/lab/can-gallery` |
|---------|---------|------------------------|
| Site HUD (nav, pager, menu) | No | Yes (inside `CanGallery`) |
| Lab badge | No | Yes |
| 3D canvas | No | Yes |
| Outbound links | **None** | **None** |

## Freeze

Do not add routes, a real `Home.tsx`, or a second gallery mount without a human **Reopen** in `DECISIONS.md`.
