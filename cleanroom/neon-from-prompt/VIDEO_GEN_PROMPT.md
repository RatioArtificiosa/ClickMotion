# NEON FORGE — Client HD video generation brief

**Product:** MS-HERO-NEON01 · Neon Forge  
**Role:** **Client HD only** (buyer pack B-roll). No UI, no burnt text, no storefront chrome.  
**Status:** **DELIVERED** · source `test videos/Neon-City.mp4` · client HD + poster + backgrounds locked 2026-08-08 

When you have the master/export, place or hand off as:

| Role | Target path (after encode) |
|------|----------------------------|
| Master (optional keep) | `public/assets/videos/masters/` or `originals/` |
| Client HD (buyer) | `public/assets/videos/neon-forge-city-v1.mp4` (replace) or new protocol name |
| Poster still | `public/assets/posters/neon-forge-city-v1.webp` |
| Backgrounds small | encode via `npm run encode:backgrounds` → `backgrounds/neon-forge-bg-v1.mp4` |

---

## 1. Creative north star (one sentence)

A **seamless 10–14s 4K night-city film loop** that feels like a AAA studio trailer establishing shot: rain-slicked neon canyons, wet-glass reflections, cyan + magenta practical light, slow cinematic push — **pure atmosphere**, zero product UI.

This film is the **world** Neon Forge builds in. It must read expensive on a 960×540 storefront card and full-bleed on a 1920 hero.

---

## 2. Paste-ready master prompt (use this first)

Copy everything inside the fence into your video model (Runway / Kling / Luma / Veo / etc.). Prefer **image-to-video** only if you lock a still that already matches; otherwise text-to-video.

```
Cinematic ultra-premium 4K seamless loop, 12 seconds, 24fps feel, no audio.

SUBJECT: Nighttime cyberpunk megacity from a low aerial / elevated glide through a canyon of glass towers. Rain-soaked streets and rooftops. Neon signage and vertical LED strips in electric cyan #00F0FF and hot magenta-pink #FF006E as practical light sources only - glowing, reflecting, never readable brand logos. Dense volumetric fog and light shafts between buildings. Wet asphalt and glass facades mirror the neon into long streaked reflections. Subtle holographic billboard glow as soft colored light in the distance - abstract shapes only, no letters, no logos, no UI panels.

CAMERA: Slow continuous forward glide (dolly / drone push) down the center of the neon canyon, slight lateral drift for scale, locked vertical horizon, high-end anamorphic cinema language, shallow depth of field mid-distance, bokeh on near neon. One smooth move only - no cuts, no whip pans, no handheld shake, no snap zooms.

MOTION ENERGY: Contemplative-luxury pace with high wow density - city feels alive via light pulse and rain, camera is calm and expensive. Rain streaks diagonal, neon flicker micro-variation, fog rolls slowly. Perfect seamless loop: end frame compositionally matches start (same corridor depth, similar light layout) so the glide can repeat forever.

LOOK / GRADE: Crushed pure black voids, specular cyan and magenta highlights, high contrast without muddy midtones, filmic grain subtle, bloom controlled (premium, not rave), anamorphic lens flare rare and elegant if any. No teal-orange Hollywood cliché. Color story is black + cyan + magenta only.

MOOD: AAA game studio launch film - CDPR / Hideo Kojima event energy meets private gaming atelier. Dark, hungry, elite. Not cartoon, not anime cel, not cheap stock "futuristic city" template.

ABSOLUTELY FORBIDDEN:
- People, faces, silhouettes of pedestrians or traffic with drivers
- Cars / bikes as hero subjects (distant unreadable taillights OK only if tiny and not focal)
- Readable text, logos, watermarks, UI, HUD, menus, captions, subtitles
- Aircraft, drones as props, spaceships, mechs, monsters
- Daytime, sunset, golden hour, nature, ocean, forest
- Purple mesh / aurora gradient sky as the whole image
- Over-saturated rainbow neon chaos (stick to cyan + magenta system)
- Camera shake, jump cuts, 3D text titles, brand marks
- Low-res, plastic CGI toy look, over-sharpened video game screenshot look

TECH: 16:9, 3840x2160 preferred (or 1920x1080 minimum), seamless loop, silent, photoreal cinematic CGI or live-action hybrid, production VFX quality.
```

---

## 3. Ultra-detailed director’s breakdown (if the model accepts multi-beat prompts)

Use this when the tool supports **structured / multi-shot** or when you iterate shot-by-shot on one continuous take.

### 3.1 World bible

| Layer | Spec |
|-------|------|
| Time | Deep night, after rain |
| Locale | Vertical megacity corridor (think Night City / Neo-Tokyo canyon, original IP - no branded landmarks) |
| Weather | Active rain + wet surfaces + low fog |
| Light system | Practical neon only: cyan verticals, magenta horizontal bands, sparse white architectural LEDs |
| Architecture | Glass curtain walls, deep balconies, antenna spires, no real-world logos |
| Ground | Reflective asphalt / tram lines as graphic wet lines |
| Sky | Near-black with fog; no stars circus, no purple nebula wallpaper |

### 3.2 Camera map (single continuous take, 12s)

| Time | Beat | Camera | What the eye should feel |
|------|------|--------|---------------------------|
| 0.0–2.5s | Establish | Elevated center of canyon, looking slightly down the corridor, start move | Scale: towers own the frame; neon grids recede |
| 2.5–6.5s | Commit | Steady forward glide; mild 2–3% lateral drift | Immersion: entering the studio’s world |
| 6.5–10s | Texture | Closer to mid-building glass; reflections smear; rain streaks increase | Premium material: wet glass, light bloom |
| 10–12s | Loop close | Composition eases toward start framing / light density | Invisible loop |

### 3.3 Light choreography

1. **Cyan practicals** dominate left and far vertical edges (cold electric).  
2. **Magenta / pink** appears as mid-depth cross-bars and ground reflection pools.  
3. **Black negative space** is sacred - at least ~30–40% of frame should stay dark so UI type (later) can sit white/cyan without fighting noise.  
4. **No full-frame rainbow.** If a third color appears, keep it dim amber window interiors only (tiny, not competing).

### 3.4 Motion micro-details (wow factor)

- Rain: multi-layer (near streaks sharp, far soft).  
- Neon: 1–2 Hz micro flicker on a few signs only (not disco).  
- Fog: slow lateral crawl between towers.  
- Reflection: wet street doubles the cyan lines into graphic streaks.  
- Depth: parallax between near facade and far canyon.  
- Optional: one distant soft holographic plane as **abstract light** (no glyphs).

### 3.5 Composition rules for storefront crop

Product page shows film in **~960×540 contain** and gallery **object-contain**. Design the **action mass in the central 70%** vertically; keep extreme top/bottom free of critical detail so letterboxing never hides the hero light.

Safe action zone:

```
┌──────────────────────────────────────┐
│  fog / tower tops (can crop)         │
│  ┌──────────────────────────────┐    │
│  │  NEON CANYON ACTION MASS     │    │
│  │  (reflections + glide path)  │    │
│  └──────────────────────────────┘    │
│  wet street glow (can crop lightly)  │
└──────────────────────────────────────┘
```

---

## 4. Negative prompt block (paste if tool has a negative field)

```
people, faces, crowd, pedestrian, silhouette figure, readable text, letters, alphabet, logo, watermark, HUD, UI, menu, caption, subtitle, title card, car chase, vehicle hero, spaceship, mecha, monster, daytime, sunset, golden hour, blue sky, ocean, beach, forest, purple aurora mesh, rainbow neon overload, cartoon, anime, low poly, plastic toy CGI, oversharpened game screenshot, camera shake, jump cut, whip pan, zoom spam, stock footage look, Vecteezy, shutterstock watermark
```

---

## 5. Variant prompts (if take 1 is weak)

### 5A — “Wet glass god-ray” (more abstract, safer loop)

```
Extreme premium 4K seamless 12s loop, night. Camera slow push toward a rain-covered glass facade reflecting cyan and magenta neon from across a dark street. Heavy bokeh, volumetric rain, pure black voids, anamorphic cinema grade. No people, no text, no logos, no cars in focus. Abstract cyberpunk luxury. Seamless loop.
```

### 5B — “Vertical neon cathedral” (scale flex)

```
Cinematic 4K 12s seamless loop. Looking up a rain-soaked megacity canyon of black glass towers at night, cyan and magenta neon climbing the verticals, fog in the depths, slow ascending drift + slight forward push. Photoreal VFX, no people, no readable signs, no UI. Seamless loop, silent.
```

### 5C — “Street-level glide” (if aerial feels stock)

```
Cinematic 4K 12s seamless loop. Street-level slow forward glide down an empty rain-soaked night alley in a cyberpunk city, neon cyan and pink reflecting in puddles, wet cobble/asphalt, fog, distant tower lights. No people, no readable text, no logos, no vehicle hero shots. Premium AAA trailer atmosphere. Seamless loop.
```

---

## 6. Technical delivery specs (what we need from you)

| Spec | Requirement |
|------|-------------|
| Duration | **10–14 s** (12s ideal) |
| Aspect | **16:9** |
| Resolution | **3840×2160** preferred; **1920×1080** minimum |
| Codec | H.264 or ProRes/master we re-encode to H.264 |
| Audio | **None** (we strip if present) |
| Loop | Seam-matched start/end preferred |
| Content | Clean B-roll only - **no UI, no text, no logos** |
| Watermark | **None** |

Filename suggestion for handoff: `neon-forge-city-master-v1.mp4` (we will encode client + backgrounds roles).

---

## 7. Acceptance checklist (we reject / re-gen if)

- [ ] Reads **premium AAA**, not generic stock cyber city  
- [ ] Cyan + magenta practical light system present  
- [ ] Large pure-black areas for later UI  
- [ ] No people / readable text / watermarks  
- [ ] Motion is one calm expensive move (not ADHD cuts)  
- [ ] Loop does not hard-pop  
- [ ] Works at 16:9 small (gallery) and large (hero)  
- [ ] Differentiated from Meridian (coast estate) and Vertex (asteroid / monochrome space)

---

## 8. After you deliver the video

We will:

1. Encode **client HD** + **poster still** from a hero frame  
2. Encode **backgrounds** small tile (`encode:backgrounds`)  
3. Rebuild cleanroom + storefront captures  
4. Package PDF + registries (packages, owner-designs, admin)  
5. Flagship publish gate  

**Do not** put the raw client HD on `/backgrounds` - only the small encode.

---

*Internal operator note: prompt density for UI lives in `BUYER_PROMPT.md` + sold MDX. This file is film-only.*
