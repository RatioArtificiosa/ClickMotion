# DOPAMINE — Master Plan

**Clone name:** DOPAMINE  
**Source:** [https://serotoninn.com/](https://serotoninn.com/) (SEROTONINN)  
**Port:** **3040**  
**Folder:** `E:\Products\MS\Lab\dopamine\`  
**Quality bar:** Platinum ultra-premium (protocol v1.1)  
**Brand swap:** `SEROTONINN` / `Serotoninn` → **`DOPAMINE` / `Dopamine`** (keep layout, motion, structure)

---

## Scope (strict)

| In scope | Out of scope |
|----------|----------------|
| **01 Film / Motion** — the full-bleed video section *immediately before* the footer (`section.motion-section`, “07. serotoninn film”) | Hero, arrivals, categories, bold/story, menu, cart, preloader |
| **02 Footer** — complete `<footer class="footer">` (bg, lottie badge, dual nav, logo, subscribe, bottom bar, credits UI) | Full homepage assembly of other sections |
| Lab routes only for those two (or one combined lab if preferred) | Other product pages |

**Combined lab option:** `/lab/film-footer` with runway before film → film → footer → short runway after.  
**Isolated labs (preferred protocol):**  
- `/lab/film` — motion section only (footer as endTrigger can be a minimal spacer matching footer height)  
- `/lab/footer` — footer only (runway before)  
- `/lab/film-footer` — both chained (sign-off lab)

Recommendation: implement as **two section modules** + one **combined lab** for scroll coupling (pin `endTrigger` is the footer).

---

## Why these two belong together

Live pin math (`main.js` → `Ge()`):

- Pin **`.motion-section__pin`** while scrolling through **entire footer**  
- `pinSpacing: false`  
- `start: "top top"`, `endTrigger: .footer`, `end: "bottom bottom"`  
- Mask width `--maskW` interpolates with pin progress  
- Video scale 1.2 → 1 over first **30%** of that progress  

So film + footer are **one scroll system**. Building them as a pair is required for parity.

---

## Source stack (locked)

| Layer | Source evidence | Clone choice |
|-------|-----------------|--------------|
| Motion | GSAP + ScrollTrigger in `loader.js` / `main.js` / `footer-anim.js` | **GSAP 3 + ScrollTrigger** |
| Smooth scroll | `window.lenis` in `main.js` | **Lenis** wired to `ScrollTrigger.update` |
| Lottie | `data-lottie` footer badge + hover markers | **lottie-web** (canvas) |
| Text | `text-split` / `.char` scramble in `footer-anim.js` | Port scramble helper (open GSAP) |
| Fonts | Google **Inter** + **PP Fraktion Mono** (footer nav) | Inter (Google) + Fraktion Mono if license/local; else close mono fallback logged |
| App shell | WordPress theme `ref` (Blacklead / artycoders) | **Vite + React 19 + TypeScript + Tailwind 4** (structure port, not WP) |
| 3D | none in these sections | none |

---

## Phases

| Phase | Work | Status |
|-------|------|--------|
| **0** | Catalog + port 3040 + project scaffold docs | **Done** |
| **1** | Recon extract (HTML/CSS/JS/assets) local under `research/` | **Done** |
| **2** | Specs: RESEARCH, notes, MASTER-PLAN, CHECKLIST | **Done** |
| **3** | App shell 3040 (Lenis, ST, tokens, fonts) | **Done** |
| **4** | Film section + lab | **Done** |
| **5** | Footer section + lab | **Done** |
| **6** | Combined film→footer lab + pin coupling QA | **Done** |
| **7** | Visual gates + polish (cursor, mask, lottie, scramble) | **Done** |
| **8** | SETUP.md + agent packages + freeze | **Done** — **OFFICIALLY FROZEN** 2026-08-11 (human) |

---

## Section IDs

| # | Id | Lab route | Module |
|---|-----|-----------|--------|
| 01 | `film` | `/lab/film` | `sections/FilmMotion.tsx` |
| 02 | `footer` | `/lab/footer` | `sections/SiteFooter.tsx` |
| 01+02 | `film-footer` | `/lab/film-footer` | both, shared ST pin |

---

## Rename map (clone)

| Source | Dopamine |
|--------|----------|
| SEROTONINN / Serotoninn | DOPAMINE / Dopamine |
| serotoninn film | dopamine film |
| ©2026_SEROTONINN | ©2026_DOPAMINE |
| Logo SVG wordmark | recreate or recolor as DOPAMINE |
| Live product/legal URLs | keep structure; `#` or local stubs OK for demo |
| Credits | DOPAMINE-only panel (no third-party names/links) |

---

## Definition of done

- [x] Side-by-side: film enter → mask expand → full-bleed video → footer enter animations match reference feel  
- [x] Local assets; no dependency on live serotoninn CDN at runtime  
- [x] Source HTML/JS/CSS retained under `research/` for compare  
- [x] Labs green; freeze in `DECISIONS.md`  
- [x] `SETUP.md` + `agent-packages/` complete (like NOTHIN' / ACTUALLY handoff)  
- [x] StrangeSurreal film · Woman1 @ 65rem desktop · no external links · clean film-footer lab  
- [x] Tight first viewport (no top runway) · DOPAMINE-only credits · agent packages updated for freeze
