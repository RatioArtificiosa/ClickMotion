# DOPAMINE — Checklist (Film + Footer only)

Source protocol: [`../MOTION-CLONE-CHECKLIST.md`](../MOTION-CLONE-CHECKLIST.md)  
Project plan: [`MASTER-PLAN.md`](./MASTER-PLAN.md)  
**Status:** v1 **OFFICIALLY FROZEN** 2026-08-11 (human sign-off) — agent packages complete

---

## A. Intake & scope

- [x] Source site identified: serotoninn.com
- [x] Clone name: **DOPAMINE**
- [x] Port: **3040**
- [x] Scope locked: **pre-footer film (motion-section) + complete footer only**
- [x] Brand rename: Serotoninn → Dopamine
- [x] Human confirms plan (this checklist + MASTER-PLAN)

---

## B. Research & extraction (local compare archive)

- [x] Save homepage HTML → `research/raw/homepage.html`
- [x] Slice `motion-section` → `research/raw/motion-section.html`
- [x] Slice `footer` → `research/raw/footer.html`
- [x] Download theme CSS → `research/chunks/main.css` + sliced `css-motion-footer.css`
- [x] Download JS: `main.js`, `footer-anim.js`, `video-load.js`, `loader.js`, `custom-cursor.js`
- [x] Extract film pin function notes → `research/raw/motion-section-from-main.js`
- [x] Media: film video, `motion_poster.webp` (active: **StrangeSurreal.mp4**)
- [x] Footer: bg (mob/tablet/desk), figure, FOOTER lottie
- [x] Icons: bold_icon_1/2, dot_icon
- [x] RESEARCH.md written (stack, sections, URLs)
- [x] GSAP-SPEC.md (pin, maskW, scale, footer timeline, scramble)
- [x] Font: IBM Plex Mono fallback for PP Fraktion Mono

---

## C. Specs before code

- [x] `notes/00-OVERVIEW.md`
- [x] `notes/01-FILM.md` (mask, pin, video, discover cursor)
- [x] `notes/02-FOOTER.md` (structure, lottie, form, scramble)
- [x] `agent-packages/00-LAB-SHELL.md`
- [x] `agent-packages/01-FILM-LAB-AGENT-PACKAGE.md`
- [x] `agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md`

---

## D. App shell (port 3040)

- [x] Vite + React 19 + TS + Tailwind 4 scaffold under `app/`
- [x] Lenis + ScrollTrigger.update coupling
- [x] Global tokens: `#fff9f7` film bg, white, `#ed3833` accent, Inter
- [x] Routes: `/`, `/lab/film`, `/lab/footer`, `/lab/film-footer`
- [x] Copy research assets → `app/public/assets/...`
- [x] No edits to frozen ACTUALLY / ORION / NOTHIN' projects

---

## E. Film section (01)

- [x] DOM parity with motion-section (Dopamine copy)
- [x] CSS: section height, pin, blob **mask** (`--maskW`), video cover
- [x] ST pin: endTrigger footer, pinSpacing false
- [x] `--maskW`: mobile 90→1000 · tablet 60→500 · desktop 30→440
- [x] Video scale 1.2→1 over progress 0→0.3
- [x] Autoplay muted loop; play on enter ~top 90%
- [x] Custom **[ DISCOVER ]** cursor inside mask
- [x] “tip: scroll to dive”
- [x] Intro text scaleY reveals (power3.out)
- [x] Editorial header grid (no type overlap)
- [x] Active video: **StrangeSurreal.mp4**
- [x] Lab gates pass

---

## F. Footer section (02)

- [x] DOM parity (Dopamine wordmark/copyright)
- [x] Responsive mask images (mob / tablet / desk)
- [x] Woman1 figure + logo + dual nav + subscribe + bottom row
- [x] Lottie discount badge scroll + hover half-play
- [x] Nav/bottom **char scramble**
- [x] Enter ST: logo / img / form / title
- [x] Email form validate UI — no backend
- [x] No external hyperlinks (IG + credits as text)
- [x] Desktop figure height **65rem**
- [x] Lab gates pass

---

## G. Combined film-footer lab

- [x] `/lab/film-footer` stacks Film → Footer with real pin endTrigger
- [x] Mask expands through footer scroll
- [x] pinSpacing false layout OK
- [x] Lenis + ST smooth on desktop
- [x] Mobile breakpoints for mask
- [x] **No** LabChrome / runways on sign-off lab

---

## H. Premium polish

- [x] Difference-blend discover cursor
- [x] Footer logo mix-blend exclusion (DopamineLogo)
- [x] dop-container (not Tailwind container)
- [x] Local video + lottie progressiveLoad
- [x] Credits panel DOPAMINE-only (no third-party names/links)
- [x] Film first viewport tight (no 18rem top runway; pin under headline)

---

## I. Close-out

- [x] SETUP.md (deps, assets, freeze) like NOTHIN'
- [x] agent-packages 00 + 01 + 02
- [x] DECISIONS freezes
- [x] CATALOG + ports updated
- [x] FREEZE human sign-off + agent docs updated (2026-08-11)

---

## Extraction inventory (local)

| Path | Role |
|------|------|
| `research/raw/homepage.html` | Full page shell |
| `research/raw/motion-section.html` | Film markup |
| `research/raw/footer.html` | Footer markup |
| `research/raw/css-motion-footer.css` | Relevant CSS rules |
| `research/raw/motion-section-from-main.js` | `Ge()` + `Ue()` pin/reveal |
| `research/chunks/main.js` | Full theme main |
| `research/chunks/footer-anim.js` | Footer ST + scramble + lottie |
| `research/chunks/video-load.js` | Lazy video loader |
| `research/chunks/main.css` | Full theme CSS |
| `research/assets/*` | Original downloads |
| `app/public/assets/film/StrangeSurreal.mp4` | **Active** film |
| `app/public/assets/footer/Woman1.png` | **Active** figure |
| `app/public/assets/lottie/FOOTER_LOTTIE_v1.json` | **Active** badge |
