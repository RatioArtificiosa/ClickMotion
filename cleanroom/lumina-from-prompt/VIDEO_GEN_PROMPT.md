# LUMINA STUDIOS — Client HD video generation brief

**Product:** MS-HERO-LUMI01 · Lumina Studios  
**Role:** **Client HD only** (buyer pack B-roll). No UI, no burnt text, no storefront chrome.  
**Status:** **DELIVERED** · source `test videos/Studio-Lot.mp4` (60s) · client HD + poster + backgrounds locked 2026-08-09

When you have the master/export, place or hand off as:

| Role | Target path (after encode) |
|------|----------------------------|
| Master (keep) | `public/assets/videos/originals/lumina-dolly-master-v1.mp4` |
| Client HD (buyer) | `public/assets/videos/lumina-dolly-v1.mp4` |
| Poster still | `public/assets/posters/lumina-dolly-v1.webp` |
| Backgrounds small | `public/assets/videos/backgrounds/lumina-dolly-bg-v1.mp4` |

**Preferred length:** seamless **10–14s** loop (up to ~20–60s OK if loop quality is better — we will encode client HD).  
**Format:** MP4, 16:9, 1080p minimum / 4K preferred, **silent**.

---

## 1. Creative north star (one sentence)

A **seamless cinematic dolly** through an **empty film studio backlot or soundstage** at **warm golden hour / tungsten night** — amber practicals, cream highlights, deep espresso shadows — pure **film craft atmosphere**, zero product UI.

This film is the **world** Lumina Studios produces in. It must read expensive on a 960×540 card and full-bleed on a 1920 hero.

---

## 2. Paste-ready master prompt (use this first)

Copy everything inside the fence into your video model (Runway / Kling / Luma / Veo / Grok / etc.). Prefer text-to-video unless you have a locked still that already matches.

```
Cinematic ultra-premium 4K seamless loop, 12 seconds, 24fps film feel, no audio.

SUBJECT: Empty high-end film production environment. Prefer ONE continuous world:
Option A (primary): Slow dolly down a quiet studio backlot street at golden hour / magic hour - soundstages, warehouse facades, soft tungsten practicals, long warm shadows, wet or polished asphalt reflecting amber light. Empty - no crew, no cars as heroes, no trailers with logos.
Option B (alt): Slow dolly through a vast empty soundstage - black curtains / dark cyclorama, sparse C-stands or softboxes as silhouettes only (no readable labels), single strong warm key light shaft, volumetric haze, cream and amber spill on the floor.

CAMERA: Continuous slow dolly or steadicam push, locked horizon, high-end cinema language, shallow depth of field mid-distance, subtle anamorphic character, one smooth move only - no cuts, no whip pans, no handheld chaos, no snap zooms.

MOTION ENERGY: Contemplative prestige pace. Light flickers gently. Haze drifts slowly. Perfect seamless loop: end frame compositionally matches start so the glide can repeat forever.

LOOK / GRADE: Warm cinematic film production grade - deep espresso and near-black voids, amber #F59E0B practical highlights, soft cream #FEF3C7 fill, gentle film grain, controlled bloom (premium, not soap-opera glow). Think A24 title sequence restraint meets private post-house reel. Not teal-orange blockbuster cliché, not neon cyberpunk, not cold blue tech.

MOOD: Quiet confidence of a film craft house that already has awards. Expensive, warm, human light without showing people. Prestige trailer establishing shot.

ABSOLUTELY FORBIDDEN:
- People, faces, hands, crew, actors, silhouettes of humans walking as focus
- Readable text, logos, watermarks, clapperboards with letters, UI, HUD, captions, subtitles
- Neon cyan/pink cyberpunk city, rain megacity canyons
- Ocean, beach estates, wellness spas, meditation rooms
- Abstract wireframe globes, stock "AI particles", purple mesh skies
- Aircraft, mechs, monsters, sci-fi holograms as hero
- Camera shake, jump cuts, 3D text titles, brand marks
- Low-res plastic CGI toy look, over-sharpened game-engine look

TECH: 16:9, 3840x2160 preferred (or 1920x1080 minimum), seamless loop, silent, photoreal cinematic CGI or live-action hybrid, production VFX quality.
```

---

## 3. Director’s breakdown (if the model accepts multi-beat)

### 3.1 World bible

| Layer | Spec |
|-------|------|
| Time | Golden hour into early blue hour, or deep night with tungsten only |
| Locale | Film studio backlot OR empty soundstage (original IP - no real studio logos) |
| Weather | Clear or light haze; optional wet ground for reflections |
| Light system | Warm tungsten / amber practicals + soft cream fill; deep espresso shadows |
| Architecture | Soundstage volumes, industrial studio geometry, no branded signage |
| Ground | Polished or damp asphalt / stage floor catching amber streaks |
| Sky (if exterior) | Soft warm-to-cool gradient; no purple nebula wallpaper |

### 3.2 Camera map (single continuous take, ~12s)

| Time | Beat | Camera | Feel |
|------|------|--------|------|
| 0.0–3.0s | Establish | Wide corridor / stage, start slow push | Scale + emptiness |
| 3.0–8.0s | Commit | Steady dolly deeper into light | Warmth + craft |
| 8.0–12.0s | Settle | Ease toward loop match | Ready to repeat |

### 3.3 Color story

| Role | Hex intent |
|------|------------|
| Voids | `#1E140A` → near black |
| Practicals | Amber `#F59E0B` family |
| Highlights | Cream `#FEF3C7` soft |
| Never | Cyan `#00F0FF`, hot pink `#FF006E`, pure pure-white sterile office |

---

## 4. Acceptance checklist (before you send the file)

- [ ] No people / faces / readable text / logos  
- [ ] Warm amber cinematic grade (not neon, not cold tech)  
- [ ] Continuous dolly feel (or equally calm single move)  
- [ ] Loop-friendly start/end (or long enough we can trim a loop)  
- [ ] Silent or we will strip audio  
- [ ] 16:9, 1080p+  

**Hand off:** drop the file path in chat (e.g. `test videos/Lumina-….mp4`) and we complete encode → cleanroom → storefront capture → package PDF → sale-ready gate.
