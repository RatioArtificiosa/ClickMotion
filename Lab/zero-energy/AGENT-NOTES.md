# Zero Energy — Future agent notes

**Read order:** `SETUP.md` → `FREEZE.md` → this file → `agent-packages/*` → `DECISIONS.md`  
**Status:** **FROZEN** as of 2026-08-13. Do not “improve” frozen files without human reopen.

---

## 1. Mission (what we shipped)

Platinum clone of the **ciaoenergy.com** homepage machine, rebranded **Zero Energy**:

1. Scroll-scrubbed **Three r161** can carousel (source `webgl-scene.js`)
2. Source **Webflow HUD** (navbar, corners, pager, discover, menu)
3. Profile close-up + 4 benefits + ZERO BULLSHIT + packshot swirl + FAQ + closer
4. Visible Ciao → **Zero Energy**; 3D can art stays user-supplied WebP
5. **Sealed local:** no emails, no social, no CDN, no original-server I/O

This is a **section clone that became the whole product**. Lab-first was followed. Home assembly was **waived** at freeze — `/home` redirects to `/lab/can-gallery`.

---

## 2. Hard rules for future agents

| Rule | Detail |
|------|--------|
| **Frozen = frozen** | Paths in `DECISIONS.md` / `SETUP.md` — no drive-by refactors |
| **One module** | `CanGallery` is the only scene. Lab imports it. Do not fork. |
| **Port 3070** | Never steal ports (`ports.md`) |
| **Three 0.161 exact** | Do not bump to r183 “to match k95”. Postprocessing imports are r161 paths |
| **Lenis owns the 3D clock** | `timeline.seek(scroll.position / scrollHeight)` — **not** ScrollTrigger.scrub |
| **HUD after loader** | `--loader-reveal: 0` → `loader.play()` → `initHud()` → `is-hud-ready` |
| **Pointer-events constitution** | Full-screen overlays `none` or drag dies |
| **Local-only** | Law 9. Never reintroduce `mailto`, CDN urls, fetch, forms to Brevo, social hrefs |
| **Logo Z** | Designed cut. Do not “fix” the lockup |
| **Do not assemble Home** | Unless human reopens and asks. Lab is the experience |
| **Do not touch other clones** | k95 3060 FROZEN, dopamine, orion DIM, nothin, etc. |

---

## 3. File ownership map

| Concern | File(s) |
|---------|---------|
| Boot order | `CanGallery.tsx` `useEffect` |
| WebGL / Lenis / paging / cans | `lib/webgl-scene.js` |
| HUD motion / ST / FAQ / menu | `lib/hud-init.ts` |
| Source HUD markup | `CanGallery.tsx` |
| Flavor tokens + titles | `data/flavors.ts` |
| Benefits / FAQ / closer | `data/copy.ts` |
| Benefit icons | `BenefitsNav.tsx` (`#benefits-1`…`4` only) |
| ZERO BULLSHIT mark | `ArgumentMark.tsx` + `/img/zero-bullshit-mask.svg` |
| FAQ + closer | `FaqSection.tsx` |
| Pointer-events + FOUC + fonts | `src/index.css` + `public/css/inline-1.css` |
| Shared Webflow look | `public/css/ciao-energy.webflow.shared.*.min.css` |
| Routes | `main.tsx` |
| Lab badge | `CanGalleryLab.tsx` + `.ze-lab-badge` |

---

## 4. Systems explained (so you don’t re-break them)

### 4.1 Boot sequence (sacred)

```
1. React mounts CanGallery (fixed chapters exist in DOM but CSS-hidden)
2. dynamic import webgl-scene.js  → creates canvas, Lenis, timeline, window.loader / carousel / lenis
3. --loader-reveal = 0vh          → kill intro gradient wash
4. await loader.play()            → camZ 25→29, spacing, lights (~2.5s)
5. await initHud()                → SplitText, ST, fades, accordion, nav
6. scrollTo(0) + body.is-hud-ready
```

If HUD init runs **before** `loader.play()`, the conic gradient rotates and ST fires on a dirty scroll. If `is-hud-ready` is added too early, stacked overlays flash.

### 4.2 First-paint FOUC

Benefits / argument / title-bis / slides / descs are `position: fixed; inset: 0`. Until ST sets `autoAlpha`, they all paint.

Gate (duplicated in **linked** `inline-1.css` so it exists **before React**):

```css
body:not(.is-hud-ready) .profile_container,
body:not(.is-hud-ready) .benefits_container,
body:not(.is-hud-ready) .argument_container,
body:not(.is-hud-ready) .carousel_title-bis-wrapper,
body:not(.is-hud-ready) .benefits_nav,
body:not(.is-hud-ready) .carousel_slide,
body:not(.is-hud-ready) .carousel_desc,
body:not(.is-hud-ready) .carousel_title-b {
  visibility: hidden !important;
  opacity: 0 !important;
}
```

`!important` beats GSAP inline autoAlpha for the one frame before the class. `html { background: #000 }` kills white first paint. `#root` / `body` stay **transparent** so `body::before` stage gradient shows.

### 4.3 Pointer-events constitution

| Layer | pointer-events |
|-------|----------------|
| `.hud`, `.section`, `.gradient_overlay`, title wrappers | **none** |
| `main canvas` | **auto** (drag) |
| `.navbar`, arrows, pager, sound, menu, `.button`, benefit icons, FAQ | **auto** |

`.hud { pointer-events: auto }` was the drag-death bug. Never restore it.

### 4.4 Z constitution

```
body::before / ::after   -1   stage gradient + profile radial
canvas                   auto (never raise)
.hud                     1
.section                 2    (spacers + fixed children)
.navbar                  10
.loader                  10000 (source; unused video)
.ze-lab-badge            40
```

Never paint `#root` or `body` opaque black — that hid `body::before` and caused the profile “white wash.”

### 4.5 3D / textures

- Can nodes: **Shell / Bottom / Top**. Labels map on **Shell**. Top/Bottom are metal (no label).
- Shell UVs: mostly a `v≈1` strip + 33 verts at `v≈0`. Do not “fix UVs” without a human reopen and a new bake.
- `TextureLoader` + `SRGBColorSpace` on labels.
- `spot-mask.avif` + `can-metallic-2.avif` have no WebP drop-in — leave them.
- Low power: iOS or `innerWidth < 1024` → 12 cans, else 24 (6 unique × clones).
- Camera rest: `(0,0,29)` fov **20**. Profile: camZ **6**, fov **40**, canRot −37.5 / 15 / 22.5°.

### 4.6 Lenis ↔ timeline

```
lenis = new Lenis({ autoRaf: false, infinite: true, syncTouch: true })
lenis.raf(timeMs) in rAF
timeline.seek(scroll.position / lenis.dimensions.scrollHeight)
scroll.position = wrap(lenis.animatedScroll, 0, scrollHeight - height)
```

Desktop wheel **pages** sections (`ENABLE_DESKTOP_PAGING`). Horizontal pointer drag moves `carousel.target`. Click side can → next/prev; click center → profile.

### 4.7 HUD / copy motion

Ported from `research/raw/gsap-page.js` into `hud-init.ts`:

- SplitText lines/chars, `yPercent: 110 → 0` in / `-110` out
- Carousel change: fade 0.5 power2; in delay 0.3
- Taste CSS vars `--color-scheme-1--taste-primary/secondary` debounce 150ms
- Benefits reveal via ST + autoAlpha
- Argument SVG reveal
- FAQ accordion height auto 0.45 power3
- Internal nav: only `#…` hashes; anything else `preventDefault`
- `initHud` **adds** `is-hud-ready`; dispose **removes** it and kills ST

### 4.8 Brand / copy

- Visible strings: **Zero Energy**. Recipe facts kept (sugar, stevia, plant caffeine, France, vitamins).
- 6 flavors in source order (see `flavors.ts`).
- 4 benefits + 9 FAQ + closer in `copy.ts`.
- Benefits-4 strike spelling locked: **acésulfame** (not the source typo).
- Contact is a **button**. Menu has no Newsletter.

### 4.9 Local-only implementation notes

- Font `@font-face` in `index.css` + rewritten urls in shared CSS → `/fonts/*.woff2`
- Shared CSS chevron/CDN urls → `none`
- Argument mask → `/img/zero-bullshit-mask.svg` (not Webflow CDN)
- No `<a href="https:…">`, no `mailto:`, no form `action`, no recaptcha script
- `initInternalNav` hard-blocks non-hash hrefs even if markup regresses

---

## 5. Common failure modes

| Symptom | Likely cause | Fix direction |
|---------|--------------|---------------|
| Stacked overlays for 1–2s on reload | `is-hud-ready` missing or CSS gate gone | Restore inline-1 + index.css gate; add class only at end of `initHud` |
| White / grey profile wash | `#root { background:#000 }` or missing inline-0/1 | Transparent root; let `body::before/after` paint |
| Gradient rotated / ST jump | HUD init before `loader.play()` | Restore boot order |
| Cannot drag cans | Overlay `pointer-events: auto` | Constitution in `index.css` |
| Drag works but titles missing | FOUC gate still on (HUD never finished) | Check `initHud` throw; fonts.ready hang |
| Labels missing / pink | Wrong webp name (` copy.webp`) or path | Canonical `canLabels` stems |
| “Z is clipped” | Looking at designed lockup | Do not crop/extend — file is correct |
| Mailto / social / CDN in Network | Law 9 broken | Strip immediately; do not ship |
| `npm run dev` “Missing script” | Cwd not `app/` | `cd zero-energy-clone\app` |
| Three import fail after bump | r161 example paths vs newer three | Keep **0.161.0** |
| Dirty session starts mid-scroll | SplitText/ST + leftover scrollY | `lenis.scrollTo(0)` + `window.scrollTo(0,0)` already at end of initHud |
| FAQ accordion dead | `initFaqAccordion` not run / buttons not `.faq_question` | Keep FaqSection markup |

---

## 6. What is intentionally unfinished (accepted debt)

See `RESIDUAL_BACKLOG.md`. Highlights:

- No local flavor/loader videos (CDN omitted by law)
- Legal / privacy pages omitted
- Home.tsx not assembled (lab is product)
- Background flavor AVIFs not local
- Full mobile screenshot gate not archived
- Sound engine is HUD toggle, not a full `ciaoSound` port

**Do not implement backlog items “for completeness” under freeze.**

---

## 7. Reopen template (human only)

```markdown
## YYYY-MM-DD - Reopen
- Section: can-gallery
- Reason: <what to change>
- Status: OPEN
- Allowed paths: <optional narrow list>
```

After reopen work: re-run SETUP §7 QA + URL scan, then re-freeze with a new date block in `DECISIONS.md` and `FREEZE.md`.

---

## 8. Related projects

| Project | Relation |
|---------|----------|
| Source ciaoenergy.com | Original WebGL + HUD — **archive only** |
| `k95-clone` (3060) | Packaging pattern; **FROZEN** — do not edit |
| Other website-tests clones | Different ports; do not steal 3070 |

---

## 9. One-line pitch for new agents

> Vite + React 19 + Three **0.161** + Lenis + GSAP on port **3070**: Zero Energy 3D can gallery **is** the site, frozen, 100% local — read SETUP + FREEZE + DECISIONS before touching anything.
