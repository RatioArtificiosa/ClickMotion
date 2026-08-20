# DOPAMINE — Decisions

## MS Lab import — 2026-08-11

- **Working tree:** `E:\Products\MS\Lab\dopamine\` (full copy of frozen `website-tests/dopamine-clone`)
- **Archive source:** `E:\website-tests\dopamine-clone\` (read-only reference)
- Freeze status **unchanged** — no section reopened during import
- Agents edit only under `Lab/dopamine` after human sets OPEN; do not rewrite archive
- **Toolchain only (not section reopen):** under monorepo `MS/`, Vite walked to root Tailwind **v3** and broke `@import "tailwindcss"`. Fixed like Nothin':
  - `app/postcss.config.js` (empty plugins)
  - `app/vite.config.ts` → `css.postcss: "./postcss.config.js"`
  - Film/footer modules, CSS content, assets **untouched**

## 2026-08-11 — Footer layout polish (reverted)

- Human: collapse was wrong — restore footer **as before** for review
- `Lab/dopamine/app/src/index.css` restored from `website-tests/dopamine-clone` archive (byte-match)
- Archive never edited

## 2026-08-11 — Figure locked to DOPAMINE wordmark (REVERTED)

- Brand-stage experiment broke film/footer (DISCOUNT Lottie overlay, layout)
- **Reverted** `Lab/dopamine` `index.css` + `SiteFooter.tsx` to `website-tests/dopamine-clone` archive (byte-match)
- Archive never edited; fullscreen lock deferred to a safer approach later

## OFFICIAL FREEZE — 2026-08-11 (human sign-off)

**Status: FROZEN.** Do not edit film, footer, coupled lab, CSS, or wired assets unless a human sets the section to **OPEN** below.

| Section id | Lab route | Status |
|------------|-----------|--------|
| `film` | `/lab/film` | **FROZEN** |
| `footer` | `/lab/footer` | **FROZEN** |
| `film-footer` | `/lab/film-footer` | **FROZEN** |

**Agent packages:** complete — `SETUP.md` + `agent-packages/00`–`02`.  
**Sign-off lab:** http://localhost:3040/lab/film-footer

---

## 2026-08-10 — Project open

- **Source:** https://serotoninn.com/ (SEROTONINN fashion brand)
- **Clone name:** **DOPAMINE**
- **Port:** **3040**
- **Scope:** only **(1) film / motion-section** (video before footer) + **(2) complete footer**
- **Rename:** Serotoninn → Dopamine in visible copy/logo/copyright
- **Stack:** match source → **GSAP + ScrollTrigger + Lenis + Lottie** in Vite/React (not WordPress)
- **Do not touch** frozen ACTUALLY / ORION Design-in-Motion / NOTHIN' labs

## Scope boundaries

| In | Out |
|----|-----|
| `section.motion-section` | Hero, shop, arrivals, categories, bold, menu |
| `<footer class="footer">` | Full multi-section homepage |
| Pin coupling film↔footer | Other site pages |

## Technical notes (from extract)

- Film pin uses footer as `endTrigger` → build as paired system
- Mask is SVG cloud path via CSS `mask` + CSS var `--maskW`
- Footer has dedicated module `footer-anim.js` (scramble + lottie + enter TL)
- Fonts: Inter + PP Fraktion Mono (footer) → clone uses Inter + **IBM Plex Mono**

## Open questions (resolved for freeze)

| # | Question | Decision |
|---|----------|----------|
| 1 | Credits UI | Panel open/close; **DOPAMINE-only copy** (no Serotoninn / blacklead / artycoders); no external links; red accent **without** underline |
| 2 | Newsletter | Client validation only — no backend |
| 3 | Mono font | IBM Plex Mono (PP Fraktion Mono substitute) |
| 4 | Labs | All three routes: film, footer, film-footer (sign-off) |

## 2026-08-10 — Implementation shipped

- Vite React app on **3040** with GSAP + Lenis + Lottie
- Film: lips SVG mask pin, video scale, discover cursor, intro reveal
- Footer: scramble, lottie badge, dual nav, subscribe form, credits modal
- Brand: **DOPAMINE** wordmark + copy
- CustomEase Club → `power3.out` logged approximation
- Layout: **`dop-container`** (never Tailwind `.container`)

## 2026-08-11 — Polish locked (final before freeze)

| Item | Decision |
|------|----------|
| Film video | **`StrangeSurreal.mp4`** (not VIDEO_2) |
| Film layout type | Editorial grid auto\|1fr\|auto; body full width — no type overlap |
| Film first viewport | **Tight top** — no dead runway above headline (desktop `padding-top` **4rem**, not source 18rem) |
| Film pin under headline | Negative pin `margin-top` kept on desktop (~**-0.18 × vh**) so lips + tip fit with header in one screen |
| Sign-off lab chrome | **Removed** runways + LabChrome on `/lab/film-footer` |
| External links | **None** — IG as text span; nav `#` + preventDefault |
| Credits panel copy | Brand **DOPAMINE** · Film & footer **motion system** · *A vision in motion · local lab study* |
| Footer figure | **`Woman1.png`**, height-driven: 42 / 52 / **65rem** (desktop) |

## Reopen template (only if human requests)

```
## YYYY-MM-DD — Reopen
- Section: film | footer | film-footer
- Reason: …
- Status: OPEN
```

### Frozen path summary

```
app/src/sections/FilmMotion.tsx
app/src/sections/SiteFooter.tsx
app/src/components/DopamineLogo.tsx
app/src/lib/scramble.ts
app/src/lib/lenis.ts
app/src/components/SmoothScroll.tsx
app/src/pages/labs/FilmFooterLab.tsx
app/src/pages/labs/FilmLab.tsx
app/src/pages/labs/FooterLab.tsx
app/src/index.css
app/public/assets/film/StrangeSurreal.mp4
app/public/assets/film/motion_poster.webp
app/public/assets/film/bold_icon_{1,2}.svg
app/public/assets/film/dot_icon.webp
app/public/assets/footer/Woman1.png
app/public/assets/footer/footer_bg_{mob,tablet,desk,desk-scaled}.webp
app/public/assets/lottie/FOOTER_LOTTIE_v1.json
```

**Agents:** read `SETUP.md` then `agent-packages/`. Do **not** “improve” spacing back to source 18rem top padding or reintroduce third-party credit names.
