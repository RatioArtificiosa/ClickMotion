# MS-SEC-FOLI01 — Storefront preview capture runbook (Folio)

**SKU:** `MS-SEC-FOLI01`  
**Product name:** Folio — scroll-pivot liquid glass decision section  
**Slug:** `folio-scroll-pivot-liquid-glass-decision-section`  
**Scope of this doc:** How to regenerate the **product-page preview** and **gallery thumbnail** videos only — not the live cleanroom demo, not client HD film, not the component motion itself.  
**Canonical script:** `scripts/capture-folio-preview.mjs`  
**Status:** Authoritative for recapture · Validated 2026-08-09  

If you only remember one thing: **cards are captured as transparent foreground plates; the background is a separate continuous ffmpeg composite.** Never seek-scrub the background video inside Playwright for storefront burns.

---

## 0. Read this first (non-negotiables)

| Rule | Why |
|------|-----|
| **Only touch storefront outputs** listed in §3 | Asset pipeline law: never overwrite client HD / master with burnt UI |
| **Do not “fix” live demo speed to fix previews** | Live demo at `/demo/cleanroom-folio` is already correct; storefront videos are a separate burn |
| **Keep the FG + BG split pipeline** | Browser seek-scrub of BG causes twitchy keyframe jumps; continuous ffmpeg bg is perfect |
| **Keep the continuous card scroll curve** | Discontinuous sheet maps caused mid→gone jumps; smoothstep caused mid-open stalls |
| **Never hide `.folio-header` / `.folio-sheet-head`** | Early bug used `header { display:none }` and stripped product titles from the burn |
| **Hard-refresh after recapture** | Browsers cache `folio-scroll-preview-*.mp4` aggressively |

### What this process is for

- Product page demo player (`previewVideo`)
- Product fullscreen overlay (`preview-fs`)
- Gallery card thumbnail (`MS-SEC-FOLI01.webp`)
- Storefront posters

### What this process is **not** for

- Changing `FolioPivotSection.tsx` motion (unless the **live** product is wrong)
- Replacing `folio-blurry-v1.mp4` (client HD) or the master
- `/backgrounds` small encode (`folio-blurry-bg-v1.mp4`)
- Live cleanroom QA of scroll feel (use the real page for that)

### Backgrounds library poster (related — do not confuse with storefront poster)

| Role | Path | Content |
|------|------|---------|
| **Backgrounds poster** | `public/assets/posters/folio-blurry-v1.webp` | Pure film still — Admin + public `/backgrounds` tiles |
| **Storefront poster** | `public/assets/posters/folio-scroll-preview-v1.webp` | UI-burned composite — product page only |

**Law:** `src/config/backgrounds.ts` → `poster` must be **pure film** (`folio-blurry-v1.webp`).  
**Never** wire `folio-scroll-preview-*.webp` (or gallery thumbs with cards/type) into the backgrounds catalog.  
Incident 2026-08-09: backgrounds tiles showed Folio cards + “Five decisions…” because poster pointed at storefront burn. Fixed by pure-film still + catalog path.

Regenerate pure-film backgrounds poster (if needed):

```powershell
$ff = ".\node_modules\ffmpeg-static\ffmpeg.exe"
& $ff -y -ss 1 -i ".\public\assets\videos\folio-blurry-v1.mp4" -frames:v 1 `
  -vf "scale=1280:-1" -q:v 70 ".\public\assets\posters\folio-blurry-v1.webp"
```

Checklist: `docs/PRODUCTION_READY_CHECKLIST.md` §2H.9.

---

## 1. Product map

| Item | Value |
|------|--------|
| Cleanroom component | `cleanroom/folio-from-prompt/FolioPivotSection.tsx` |
| Cleanroom demo URL | `http://127.0.0.1:3004/demo/cleanroom-folio` |
| Buyer prompt | `cleanroom/folio-from-prompt/BUYER_PROMPT.md` |
| Media map (roles) | `cleanroom/folio-from-prompt/VIDEO_GEN_PROMPT.md` |
| CMS product | `data/cms/store.json` → id `MS-SEC-FOLI01` |
| Section type | mid-page decision section (not hero, not Prism) |
| Interaction (live) | scroll-driven `rotateX` paper pivot over looping bg film |
| Sheets | 5 dense enterprise panels (Mandate → Insight → System → Execution → Outcomes) |

### Media roles (do not mix)

| Role | Path | Mutable by this script? |
|------|------|-------------------------|
| **Master** | `public/assets/videos/originals/folio-blurry-master-v1.mp4` | **No** |
| **Client HD** | `public/assets/videos/folio-blurry-v1.mp4` | **Read only** (bg underlay source) |
| **Backgrounds small** | `public/assets/videos/backgrounds/folio-blurry-bg-v1.mp4` | No (separate encode) |
| **preview-page** | `public/assets/videos/folio-scroll-preview-v1.mp4` | **Yes — overwrite OK** |
| **preview-fs** | `public/assets/videos/folio-scroll-preview-fs-v1.mp4` | **Yes** |
| **poster** | `public/assets/posters/folio-scroll-preview-v1.webp` | **Yes** |
| **poster-fs** | `public/assets/posters/folio-scroll-preview-fs-v1.webp` | **Yes** |
| **thumb** | `public/thumbnails/MS-SEC-FOLI01.webp` | **Yes** |

Client HD note: ~10s, 3840×2160, 24fps, abstract “blurry vision” loop. Used **only** as the continuous underlay during composite (and as buyer film). Never burn UI into this file.

---

## 2. Architecture (the pipeline that finally worked)

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE A — Foreground capture (Playwright)                      │
│                                                                 │
│  • Load cleanroom Folio demo                                    │
│  • Hide host marketing chrome                                   │
│  • HIDE live bg video (display:none + strip src)                │
│  • Make stage/page transparent                                  │
│  • Programmatic scroll with continuous progressForFrame()       │
│  • Screenshot each frame as RGBA PNG (omitBackground: true)     │
│                                                                 │
│  Output: tmp/folio-preview-frames/frame-00000.png …             │
│          tmp/folio-preview-frames-fs/… (1920×1080 pass)         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE B — Smooth background composite (ffmpeg)                 │
│                                                                 │
│  Input 0: folio-blurry-v1.mp4  (-stream_loop -1, continuous)    │
│  Input 1: frame-%05d.png       (RGBA FG sequence @ 24fps)       │
│                                                                 │
│  filter: scale/crop bg → overlay FG → yuv420p H.264             │
│                                                                 │
│  Output: folio-scroll-preview-v1.mp4                            │
│          folio-scroll-preview-fs-v1.mp4                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE C — Poster + gallery thumb from finished composite       │
│  (~10% into timeline = early face-on of sheet 1)                │
└─────────────────────────────────────────────────────────────────┘
```

### Why two stages (history)

| Attempt | Result | Lesson |
|---------|--------|--------|
| A. Capture full page with bg video **playing in wall-clock** while scrolling | BG looked **2–3× too fast** in the short output video (wall clock ≫ output duration) | Wall-clock bg ≠ output timeline |
| B. **Seek** `video.currentTime = i/FPS` every frame | BG speed “normal” but **twitchy** — H.264 seek lands on keyframes (~every 30 frames), scene jumps | Never seek-scrub bg for storefront |
| C. **FG transparent plates + continuous ffmpeg underlay** | BG **smooth like live demo**; cards independent | **This is the locked method** |

### Why the card curve looks like it does (history)

| Attempt | Result | Lesson |
|---------|--------|--------|
| Compress open/close, expand face-on | Titles readable but **mid ↔ closed jumps**; pivots undersampled | Users want to **see** the rotate |
| Dense open/close with smoothstep + local map `0.06…0.95` | Better pivots, but **mid-open pause** + **handoff jumps** | smoothstep stacks with Framer ease; **local must be 0→1 continuous** |
| Continuous `warpLocal` with f(0)=0, f(1)=1; linear pieces; short face; dense close | Smooth flow, no blank gap, no stall | **Locked card curve** |

Critical math: if each sheet’s mapped local goes `0.06 → 0.95` instead of `0 → 1`, at every sheet boundary global scroll **skips ~2% of the track in one frame** → card vanishes and next pops. Always keep `sheet + localMapped` continuous across boundaries (`N+1.0` then `(N+1)+0.0`).

---

## 3. Outputs written by the script

| File | Viewport | Role |
|------|----------|------|
| `public/assets/videos/folio-scroll-preview-v1.mp4` | 1440×900 | Product page demo |
| `public/assets/videos/folio-scroll-preview-fs-v1.mp4` | 1920×1080 | Fullscreen demo |
| `public/assets/posters/folio-scroll-preview-v1.webp` | from page video | Poster |
| `public/assets/posters/folio-scroll-preview-fs-v1.webp` | from FS video | FS poster |
| `public/thumbnails/MS-SEC-FOLI01.webp` | 800×- | Gallery |

Work intermediates (disposable):

| Path | Contents |
|------|----------|
| `tmp/folio-preview-frames/frame-%05d.png` | Page FG plates (RGBA) |
| `tmp/folio-preview-frames-fs/frame-%05d.png` | FS FG plates |

### Encode constants (current lock)

| Constant | Value | Notes |
|----------|-------|--------|
| `FPS` | 24 | Match source film |
| `DURATION_S` | 18 | Enough frames for open/face/close flow |
| `TOTAL_FRAMES` | 432 | `24 × 18` |
| `VIEWPORT` | 1440×900 | Page preview |
| `VIEWPORT_FS` | 1920×1080 | Fullscreen |
| `SHEET_COUNT` | 5 | Matches product sheets |
| H.264 | `libx264`, CRF 20, `yuv420p`, `+faststart`, no audio | |

CMS already points at these paths (`previewVideo`, `poster`, `thumbnail`). Recapture **overwrites** in place — no CMS edit needed unless paths change.

---

## 4. Prerequisites

1. **Dev server** serving the cleanroom Folio demo:
   ```powershell
   npx next dev --port 3004
   ```
   Confirm: `http://127.0.0.1:3004/demo/cleanroom-folio` returns 200 and shows five sheets with glass over the blurry film.

2. **Dependencies**
   - Node + project `node_modules`
   - Playwright Chromium (`playwright` package)
   - `ffmpeg-static` (or `FFMPEG_PATH` env)

3. **Background source present**
   ```
   public/assets/videos/folio-blurry-v1.mp4
   ```

4. **Working directory:** repo root `E:\Products\MS` (or equivalent).

---

## 5. Runbook (do this every recapture)

### Step 1 — Start or verify demo server

```powershell
# From repo root
try { (Invoke-WebRequest -Uri "http://127.0.0.1:3004/demo/cleanroom-folio" -UseBasicParsing -TimeoutSec 8).StatusCode } catch { $_.Exception.Message }
```

If not 200, start `npx next dev --port 3004` and wait until ready.

### Step 2 — Run the capture script

```powershell
node scripts/capture-folio-preview.mjs http://127.0.0.1:3004/demo/cleanroom-folio
```

Default URL is the same if you omit the arg:

```powershell
node scripts/capture-folio-preview.mjs
```

**Expected runtime:** ~7–12 minutes total (two viewports × 432 screenshots + two 4K→viewport composites).  
**Expected console markers:**

```
FOLIO storefront burn — FG capture + smooth BG composite
  BG source: …\folio-blurry-v1.mp4
  Card curve: continuous handoff, short face, dense close (no mid-stall)
Launching FG capture… … { width: 1440, height: 900 }
Capturing 432 FG frames …
  FG frame 0/432 p=0.022
  …
  compositing smooth BG (folio-blurry-v1.mp4) under 432 FG frames → folio-scroll-preview-v1.mp4
Wrote …\folio-scroll-preview-v1.mp4
Wrote …\folio-scroll-preview-v1.webp
Wrote …\MS-SEC-FOLI01.webp
Launching FG capture… … { width: 1920, height: 1080 }
…
Wrote …\folio-scroll-preview-fs-v1.mp4
FOLIO capture complete
```

Exit code must be **0**.

### Step 3 — Hard-refresh storefront

- Product page for Folio: Ctrl+F5  
- Gallery: Ctrl+F5  
- If CDN/service worker is involved, bust cache or append `?v=` temporarily while verifying.

### Step 4 — Visual QA (mandatory)

Play `folio-scroll-preview-v1.mp4` (or product page player) and verify:

| Check | Pass criteria |
|-------|----------------|
| **BG motion** | Continuous, smooth, similar pace to live demo — **no** scene pops every ~0.5–1s |
| **BG speed** | Not rushed; not frozen |
| **Open arc** | Card eases in edge → upright without a **pause mid-open** |
| **Face beat** | Brief readable upright (~titles fully legible); not a long still hold |
| **Close arc** | Face → tilt → exit is **sampled**, not a jump mid → gone |
| **Handoff** | Next card starts appearing while previous is still leaving (component overlap) — no blank deck between cards |
| **Sheet 5** | Completes close; **no ~1s empty** before loop restarts on sheet 1 |
| **Loop seam** | End is near-closed sheet 5 / start is early sheet 1 open — no long blank |
| **Titles** | Section heading + each sheet’s header visible (not stripped by CSS) |
| **Glass** | Dark translucent panels; abstract color of bg visible around and faintly through glass |
| **No host chrome** | No MS site header/footer/nav in the burn |
| **Thumb/poster** | Face-ish sheet 1 composition, titles readable |

Optional frame pulls:

```powershell
$ff = ".\node_modules\ffmpeg-static\ffmpeg.exe"
$v  = ".\public\assets\videos\folio-scroll-preview-v1.mp4"
foreach ($t in @("0.8","1.4","2.6","3.6","3.8","9.0","14.0","17.0")) {
  & $ff -y -ss $t -i $v -frames:v 1 ".\tmp\folio-qa-$($t.Replace('.','_')).png" 2>$null
}
```

### Step 5 — Progress continuity smoke (if you edit the curve)

If you change `progressForFrame` / `warpLocal`, assert max frame-to-frame jump is small (~`span / TOTAL_FRAMES`, order of `0.002–0.004`):

```javascript
// Mental check: for i and i+1, |p(i+1)-p(i)| must stay smooth.
// Discontinuities of ~0.02 at sheet boundaries are the old handoff bug.
```

---

## 6. Script internals (edit with care)

File: `scripts/capture-folio-preview.mjs`

### 6.1 Card scroll curve — `warpLocal` + `progressForFrame`

**Time share within each sheet (timeline budget):**

| Phase | Time weight | Component-local range | Purpose |
|-------|-------------|----------------------|---------|
| Open | 36% | 0.00 → 0.36 | Edge → face, **linear**, no stall |
| Face | 12% | 0.36 → 0.58 | Short readable upright |
| Close | 52% | 0.58 → 1.00 | Face → exit, densest samples |

**Global window:**

- `P_START = 0.022` — start slightly into sheet 1 open (avoid pure blank first frames)  
- `P_END = 0.96` — end with sheet 5 nearly closed (avoid empty dwell before loop)

**Continuity invariant (do not break):**

```
warpLocal(0) === 0
warpLocal(1) === 1
// strictly increasing on (0,1)
// NO smoothstep / ease that flattens mid-open
// NO last-sheet special case that remaps face→close differently unless re-validated
```

Global progress:

```
sheetF = t * 5                    // continuous 0..5
sheet  = floor(sheetF)            // 0..4
local  = sheetF - sheet           // 0..1 within sheet
p = P_START + ((sheet + warpLocal(local)) / 5) * (P_END - P_START)
y = round(p * maxScroll)          // maxScroll = folio-root height − viewport height
```

Scroll target: `.folio-root` height comes from Framer track (`vhPerSheet ≈ 1.55` × 5 sheets). Capture uses:

```js
root.offsetHeight - window.innerHeight
```

### 6.2 Live component motion (reference only — do not change for storefront-only fixes)

In `FolioPivotSection.tsx`:

- `useScroll` on `.folio-root` with `offset: ["start start", "end end"]`
- Per-sheet local progress with ~18% pad overlap + component smoothstep
- `rotateX` one-way paper arc (~72° → 0 → −72°), last sheet slightly different plateau
- Live bg: `<video class="folio-bg-video" src="/assets/videos/folio-blurry-v1.mp4" autoPlay loop muted />`

Storefront capture **re-samples** this scroll map; it does not reimplement rotateX.

### 6.3 Capture CSS (`CAPTURE_CSS`) — critical selectors

Must **hide**:

- Site header/nav/footer (marketing chrome)
- `.folio-bg-video`, `.folio-bg-fallback`

Must **keep visible**:

- `.folio-header` (section kicker + H2)
- `.folio-sheet-head` (sheet index / eyebrow / title)

Must **force transparent**:

- `html`, `body`, Next root wrappers, `.folio-root`, `.folio-stage`, `.folio-bg`, etc.

Capture-only glass density (backdrop-filter is useless with transparent stage):

- `.folio-lg-fill` gets a denser dark gradient so cards stay readable when composited over the film  
- `.folio-bg-veil` kept as soft alpha darken for type

**Never** use a blanket `header { display: none }` — that also kills product headers.

### 6.4 Screenshot

```js
await page.screenshot({ path, type: "png", omitBackground: true });
```

Without `omitBackground: true`, FG plates are opaque and the continuous bg never shows through.

Also: strip video `src` and `load()` so the live player cannot paint into the plate.

### 6.5 ffmpeg composite (do not reintroduce browser scrubbing)

```
ffmpeg -y
  -stream_loop -1 -i folio-blurry-v1.mp4
  -framerate 24 -i frame-%05d.png
  -filter_complex "
    [0:v]scale=W:H:force_original_aspect_ratio=increase,
         crop=W:H,setsar=1,fps=24,format=yuv420p,setpts=PTS-STARTPTS[bg];
    [1:v]fps=24,format=rgba,setpts=PTS-STARTPTS[fg];
    [bg][fg]overlay=0:0:format=auto,format=yuv420p[v]
  "
  -map [v] -frames:v 432
  -c:v libx264 -pix_fmt yuv420p -preset medium -crf 20 -movflags +faststart -an
  out.mp4
```

- `-stream_loop -1` makes the ~10s client film cover the full 18s preview  
- Scale/crop centers the 16:9 4K film into 1440×900 or 1920×1080  
- Overlay uses FG alpha

### 6.6 Poster / thumb

Taken from the **finished composite** at `t ≈ 0.1 * DURATION_S` (early face-on of sheet 1), not from a raw FG plate (so poster includes the pretty bg).

---

## 7. Tuning knobs (if product asks for adjustments)

Change **only** these in `capture-folio-preview.mjs` unless the live component is wrong.

| Symptom | Knob | Direction |
|---------|------|-----------|
| Open still pauses mid-way | `OPEN_W` / open map; ensure **no** ease | Prefer pure linear open |
| Face → gone still jumps | Raise `CLOSE_W` (and lower face); keep `warpLocal(1)=1` | More close samples |
| Cards feel rushed overall | Raise `DURATION_S` (e.g. 18 → 20) | More frames |
| Face too short to read titles | Raise `FACE_W` slightly (e.g. 0.12 → 0.16), steal from open/close evenly | Don’t reintroduce long still |
| Blank gap at loop | Raise `P_START` a bit / lower `P_END` a bit | Keep cards at ends |
| BG too slow/fast | **Do not** scrub in browser. Optionally retime underlay with ffmpeg `setpts` on input 0 only | e.g. `setpts=0.85*PTS` if ever needed |
| BG twitchy again | You reintroduced seek — **remove it** | Restore Stage B composite |
| Titles missing | CSS hid product headers | Fix selectors; never bare `header{display:none}` |
| Glass too flat / too milky | Adjust capture-only `.folio-lg-fill` gradient alpha | Keep translucent enough for film color |

After any curve change: re-run full script + full QA checklist (§5.4).

---

## 8. Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| `BG source not found` | Missing `folio-blurry-v1.mp4` | Restore client HD from vault/originals |
| `ffmpeg failed` | Bad path / missing frames / filter typo | Check `ffmpeg-static`; ensure `frame-00000.png` exists |
| Playwright timeout on `.folio-root` | Demo route broken / wrong port | Fix demo page; confirm URL |
| Black video / no bg color | `omitBackground` false or FG fully opaque | Confirm CSS transparency + omitBackground |
| Twitchy bg | Someone re-added `currentTime` scrub | Delete scrub; composite only |
| Fast bg | Capturing with live-playing video baked in | Hide video in FG stage; composite |
| Jerky cards at handoff | `warpLocal` not ending at 1 / starting at 0 | Restore continuous map |
| Mid-open pause | Reintroduced smoothstep on open | Linear open only |
| Sheet 5 blank second | `P_END` too high / close finishes too early then holds empty | Cap `P_END` ~0.96; densify close |
| Titles gone | Capture CSS too aggressive on `header` | Exclude `.folio-header` and `.folio-sheet-head` |
| Old video still plays in browser | Cache | Hard refresh / rename version once if needed |
| FS and page look different on cards | One pass failed mid-run | Re-run full script (both viewports sequential in `main`) |

---

## 9. Related files (quick index)

| Path | Role |
|------|------|
| `scripts/capture-folio-preview.mjs` | **The** capture + composite tool |
| `cleanroom/folio-from-prompt/FolioPivotSection.tsx` | Live product UI (do not edit for storefront-only motion bugs) |
| `cleanroom/folio-from-prompt/VIDEO_GEN_PROMPT.md` | Media role table + short encode pointers |
| `cleanroom/folio-from-prompt/BUYER_PROMPT.md` | Buyer-facing build prompt |
| `content/prompts/sections/MS-SEC-FOLI01.mdx` | Canonical sold prompt |
| `data/cms/store.json` | Product registry (preview/poster/thumb paths) |
| `docs/ASSET_PIPELINE.md` | Vault roles / forbidden overwrites |
| `docs/PRODUCT_LAW.md` | Product UX law |
| `scripts/encode-backgrounds-preview.mjs` | Small `/backgrounds` encode only (separate) |
| `scripts/capture-meridian-preview.mjs` | Sibling pattern (scroll burn) — **not** FG/BG split |

---

## 10. Decision log (why we locked this)

1. **Storefront ≠ live demo.** Preview is a fixed-length marketing loop; live is free scroll. Curve and bg handling are optimized for the loop.
2. **BG must be continuous decode.** Seeking is not motion; it’s keyframe teleportation.
3. **FG must be alpha.** Only then can continuous bg sit under liquid-glass-like panels without re-capturing glass refraction of a seeking video.
4. **Card progress must be continuous in sheet space.** Any dead zone between sheets becomes a visual jump users call “jerky.”
5. **Linear phase warps > stacked eases.** Framer already eases; adding smoothstep in capture created the mid-open stall.
6. **Dense close, short face.** Users explicitly prefer **flow** of the rotate over long still midpoints; still need a brief face beat so titles register.
7. **Never sacrifice product titles** for “clean” chrome stripping.

---

## 11. Minimal “do it again” checklist

```text
[ ] Dev server on :3004, /demo/cleanroom-folio loads
[ ] Client HD exists: public/assets/videos/folio-blurry-v1.mp4
[ ] From repo root:
      node scripts/capture-folio-preview.mjs http://127.0.0.1:3004/demo/cleanroom-folio
[ ] Exit 0; both mp4s + posters + MS-SEC-FOLI01.webp written
[ ] QA: smooth bg, continuous open/close, no blank sheet-5 gap, titles visible
[ ] Hard-refresh product page + gallery
```

If the user says **only** the demos are wrong and the live page is fine: **this runbook only** — do not change `FolioPivotSection.tsx`.

If the user says the **live** page motion is wrong: fix the component first, then re-run this runbook so storefront matches.

---

*End of runbook. Prefer editing `scripts/capture-folio-preview.mjs` constants over reinventing the pipeline. Prefer this document over chat memory when recapturing Folio storefront media.*
