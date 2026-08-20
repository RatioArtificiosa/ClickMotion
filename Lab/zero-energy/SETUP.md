# Zero Energy Clone — SETUP (agent + human)

**Project:** `E:\website-tests\zero-energy-clone\`  
**Source (archive only — do not fetch from the shipped app):** ciaoenergy.com  
**Clone brand:** **Zero Energy**  
**Dev port:** **3070**  
**Status:** **OFFICIALLY FROZEN** — wrap-up 2026-08-13  
**Scope:** Homepage experience as **one lab** (`/lab/can-gallery`): 3D can carousel + profile + benefits + argument + packshot + FAQ + closer.

This file is the **install + freeze + handoff** source of truth.

---

## 0. Local-only law (non-negotiable)

The shipped app (`app/src/**`, `app/public/**`, `app/index.html`) is a **sealed local product**.

| Forbidden in shipped code **and** public view | Allowed |
|-----------------------------------------------|---------|
| `mailto:` | In-page `#hash` / `data-scroll-to` |
| `https://` / `http://` to any remote host | SVG `xmlns` namespaces |
| Hotlinking fonts, images, video, audio, GLB, CSS, JS | Paths under `/fonts` `/img` `/textures` `/webgl` `/audio` `/css` |
| Fetch / XHR / Beacon / WebSocket / EventSource to original Ciao, Webflow CDN, mprez, website-files, Brevo/sibforms, recaptcha, Umami, Instagram, TikTok, SKAALD, Google Fonts | React Router `Link` to `/` and `/lab/can-gallery` |
| Social, newsletter, legal outbound hrefs | Local Vite / npm install (dev machine only) |

**Nothing goes to or comes from the original external servers at runtime.** If an asset is missing, omit it or use a local substitute — never re-point at the source CDN.

Workspace law: `E:\website-tests\README.md` Law 9 · protocol §0.4.

Scan: `python research/_extract/scan_public_urls.py` (must stay clean except SVG xmlns + lockfile).

---

## 1. Prerequisites

| Tool | Version | Check |
|------|---------|--------|
| **Node.js** | 20 LTS or 22+ | `node -v` |
| **npm** | 10+ | `npm -v` |
| **Browser** | Chrome / Edge | desktop pointer for can drag + HUD |
| **Disk** | ~400 MB under `app/` | `node_modules` + textures + GLB/HDR |

### Not required

| Item | Notes |
|------|--------|
| Webflow / jQuery / IX2 | Source CMS; clone is React |
| Brevo / recaptcha / Umami | Stripped by law |
| Club GSAP license | SplitText ships in `gsap` ≥ 3.13 (free) |
| R3F | Raw Three.js module, not React Three Fiber |
| Python | Research extractors / URL scan only |
| Home.tsx | Intentionally absent — lab is the product |

---

## 2. Install & run

```bash
cd E:\website-tests\zero-energy-clone\app
npm install
npm run dev
```

- Dev server: **http://localhost:3070/**
- Product QA: **http://localhost:3070/lab/can-gallery**
- Hub: **http://localhost:3070/**
- `/home` redirects to the lab

```bash
npx tsc --noEmit
npm run build
```

Do **not** run `npm run dev` from `E:\website-tests\` or `E:\` — there is no root script. Cwd must be `app/`.

Do **not** delete `package-lock.json`.

---

## 3. Dependencies (`app/package.json`)

**Runtime**

| Package | Pin | Role |
|---------|-----|------|
| `react` | ^19.1 | UI |
| `react-dom` | ^19.1 | DOM |
| `react-router-dom` | ^7.6 | Hub / lab / `/home` redirect |
| `three` | **0.161.0** (exact) | WebGL scene — match source r161 |
| `lenis` | ^1.3.23 | Infinite smoother; `autoRaf: false` |
| `gsap` | ^3.13 | ScrollTrigger + **SplitText** (real plugin) |

**Dev:** `vite` ^6, `@vitejs/plugin-react`, `typescript` ~5.8, `@types/react`, `@types/react-dom`, `@types/three` 0.161.0

Vite: `--host --port 3070` (`vite.config.ts` + `package.json` scripts).

---

## 4. Assets (critical — all local)

| Path | Role |
|------|------|
| `app/public/webgl/can.glb` | Can mesh (nodes **Shell / Bottom / Top**) |
| `app/public/webgl/base.glb` | Floor / base |
| `app/public/webgl/hdri2.hdr` | PMREM env map |
| `app/public/textures/zero-energy_texture_*.webp` | **6 flavor labels** (canonical names, no ` copy`) |
| `app/public/img/spot-mask.avif` | Spot3 gobo |
| `app/public/img/can-metallic-2.avif` | Metallic map |
| `app/public/img/zero-energy_logo.webp` | Navbar lockup (ZERO ENERGY; **Z cut is design**) |
| `app/public/img/zero-energy_meta-img.webp` | `og:image` (local) |
| `app/public/img/zero-energy-fav-dark.png` | Favicon |
| `app/public/img/zero-bullshit-mask.svg` | Argument wordmark mask |
| `app/public/fonts/*.woff2` | Franklin Gothic ATF + Geist + Geist Mono |
| `app/public/audio/zero-energy-*.mp3` | 4 UI sounds |
| `app/public/css/zero-energy.webflow.shared.*.min.css` | Source shared CSS (font urls rewritten local) |
| `app/public/css/inline-0.css` … `inline-4.css` | Page CSS + first-paint hide + local mask |

### Label filenames (must match `webgl-scene.js` `canLabels`)

```
/textures/zero-energy_texture_double-litchi.webp
/textures/zero-energy_texture_coco-citron-vert.webp
/textures/zero-energy_texture_Kiwi-Concombre.webp
/textures/zero-energy_texture_peche-blanche.webp
/textures/zero-energy_texture_pomme-rhubarbe.webp
/textures/zero-energy_texture_abricot_framboise.webp
```

User also dropped `* copy.webp` duplicates. Runtime uses the **canonical** names. Do not rename without updating `canLabels`.

### Intentionally not present

| Asset | Why |
|-------|-----|
| Loader / flavor loop videos | Lived only on remote CDN; **omitted** (local-only law) |
| Legal pages | Out of scope; no outbound legal hrefs |
| Newsletter / Brevo / recaptcha | Stripped |

---

## 5. Architecture map

```
app/
  index.html                      # Zero Energy meta; local CSS + og:image
  vite.config.ts                  # port 3070, host true
  src/
    main.tsx                      # routes
    index.css                     # local @font-face, pointer-events, FOUC gate
    data/
      flavors.ts                  # 6 flavors + taste hex
      copy.ts                     # BENEFITS, FAQ (9), CLOSER — no emails/URLs
    pages/
      Hub.tsx                     # index
      CanGalleryLab.tsx           # lab chrome badge + shared module
    sections/can-gallery/
      CanGallery.tsx              # source HUD markup + boot
      BenefitsNav.tsx             # 4 in-page icon anchors
      BenefitsCopy.tsx
      ArgumentMark.tsx            # ZERO BULLSHIT SVG
      FaqSection.tsx              # accordion + closer (no form)
    lib/
      webgl-scene.js              # Three + Lenis + timeline (verbatim port)
      hud-init.ts                 # GSAP HUD / ST / FAQ / nav
```

**Shared module rule:** Lab imports `CanGallery`. There is no forked lab scene. Future Home, if ever reopened, **must** import the same file.

---

## 6. Freeze rules

| Section id | Routes | Status |
|------------|--------|--------|
| `can-gallery` | `/lab/can-gallery`, `/home` → lab | **FROZEN** |
| Hub | `/` | **FROZEN** |

**Do not edit frozen paths** unless a human adds a **Reopen** block in `DECISIONS.md`.

### Locked product decisions

| Topic | Locked value |
|-------|----------------|
| Brand (visible) | **Zero Energy** |
| 3D labels | User WebP art (filenames still `ciao-energy_*`) |
| Logo Z | Designed italic cut — **not a bug** |
| Port | **3070** |
| Three | **0.161.0 exact** |
| Clock | Lenis `infinite` + `autoRaf: false`; timeline **seeked** from scroll (not ST.scrub) |
| SplitText | Real `gsap/SplitText`, `yPercent` 110 → 0 / −110 |
| Pointer events | Overlays `none`; canvas + nav/arrows/pager/icons/FAQ/buttons `auto` |
| First paint | `html` `#000`; hide fixed chapters until `body.is-hud-ready` |
| Contact | `button` `data-scroll-to="#FAQ"` — never mailto |
| Menu | Gamme / Bénéfices / FAQ — **no Newsletter** |
| Closer | Brand lockup, **no capture form** |
| Home assembly | **Waived** — lab is the experience |
| Outbound I/O | **Forbidden** (Law 9) |

Full list: `DECISIONS.md` + `AGENT-NOTES.md`.

---

## 7. QA checklist (post-install / post-reopen)

- [ ] `/lab/can-gallery` first paint is **black chrome only** (no stacked benefits/argument/titles)
- [ ] After ready: 3D cans + DOUBLE LITCHI + navbar + pager + discover
- [ ] Horizontal **grab/drag** rotates the ring (cursor on canvas, not HUD)
- [ ] Wheel / scroll pages through profile → 4 benefits → ZERO BULLSHIT → packshot → FAQ
- [ ] Benefits copy one chapter at a time (not all four stacked)
- [ ] Right-side benefit icons present; left C/E/_ letters **not** visible
- [ ] FAQ: 9 items, accordion open/close
- [ ] Contact scrolls to FAQ; no mail client
- [ ] Menu links stay on-page (`#gamme` / `#benefits-1` / `#FAQ`)
- [ ] Sound toggle does not 404 the 4 mp3s
- [ ] Cold reload: no white flash (`html` background `#000`)
- [ ] Network tab: **no** requests to ciaoenergy / webflow / mprez / sibforms / google
- [ ] Console: no missing-texture / missing-font 404s for wired assets

---

## 8. Agent handoff order

1. This **SETUP.md**
2. **FREEZE.md**
3. **AGENT-NOTES.md**
4. `agent-packages/00-LAB-SHELL.md`
5. `agent-packages/01-CAN-GALLERY-AGENT-PACKAGE.md`
6. `DECISIONS.md` (freeze + reopen)
7. `RESIDUAL_BACKLOG.md` (accepted debts only — do not “finish” them under freeze)

---

## 9. Source research (archive — not shipped)

| Artifact | Path |
|----------|------|
| Homepage HTML | `research/homepage.html` |
| WebGL + Lenis + timeline | `research/raw/webgl-scene.js` |
| HUD / FAQ GSAP | `research/raw/gsap-page.js` |
| Sounds | `research/raw/sounds.js` |
| Inline CSS | `research/raw/inline-style-*.css` |
| Flash verify | `research/_extract/verify_flash.mjs` + `flash-verify/*.png` |
| URL scan | `research/_extract/scan_public_urls.py` |

These files may contain original CDN URLs. **Never copy those URLs into `app/`.**
