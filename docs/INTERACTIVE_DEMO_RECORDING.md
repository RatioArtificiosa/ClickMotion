# Interactive demo recording (project / product agnostic)

**Status:** Living operator note · 2026-08-10  
**Purpose:** Automate **movies of interactive motion** (pointer, drag, scroll, pin journeys) for any lab or product — not limited to ClickMotion / MS SKUs.

Related: [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) (media roles) · capture scripts under `scripts/capture-*-preview.mjs` (frame-scrub storefront) · lab example `Lab/actually/scripts/record-hero-demo.mjs` · generalized `scripts/record-interactive-demo.mjs`.

---

## When to use which tool

| Job | Tool | Output role |
|-----|------|-------------|
| **Storefront presentation** of a scroll-scrub UI (pin journey, titles, 3D scrub) | Frame loop: Playwright screenshot each frame → ffmpeg H.264 | **Storefront** `preview` / `preview-fs` only |
| **Interactive demo movie** (mouse path, grab/drag, multi-act pointer + scroll) | Playwright `recordVideo` (WebM) → ffmpeg H.264 | Lab proof, internal QA, optional marketing demo — **not** client HD |
| **Client delivery HD** | Locked film / model pack (no MS chrome) | Buyer pack only — never burn cursor or storefront chrome |

**Law:** interactive recordings are **not** client HD. Do not overwrite masters or sold pack media. Write to `tmp/` first, then promote only intentional storefront paths when that is the product deliverable.

---

## Stack (portable)

Any Node project can use this pattern:

1. **Playwright** Chromium with `recordVideo: { dir, size }`
2. **GPU-friendly flags:** `--use-gl=angle`, `--ignore-gpu-blocklist` (helps WebGL / R3F)
3. **Scripted acts:** `page.mouse.move` / `down` / `up`, eased paths, `window.scrollTo` (+ Lenis if the app uses it)
4. **ffmpeg** encode: `libx264`, slow/medium preset, CRF ~16–18, `yuv420p`, `+faststart`, usually `-an`

Dependencies typical: `playwright`, optional `ffmpeg-static`.

---

## Generalized script (MS monorepo)

```bash
# Default: Actually! cleanroom (when server is up)
node scripts/record-interactive-demo.mjs

# Any URL + optional output basename
node scripts/record-interactive-demo.mjs http://127.0.0.1:3011/lab/hero my-lab-demo
node scripts/record-interactive-demo.mjs http://127.0.0.1:3004/demo/cleanroom-actually actually-hero-interactive
```

| Env / arg | Meaning |
|-----------|---------|
| `argv[2]` | Target URL (page must be interactive and loaded) |
| `argv[3]` | Output basename under `tmp/` (default `interactive-demo`) |
| `FFMPEG_PATH` | Override ffmpeg binary |
| `RECORD_W` / `RECORD_H` | Viewport (default 1440×900) |

Lab-specific richer acts (pointer window + can grab + pin scrub) live in:

`Lab/actually/scripts/record-hero-demo.mjs`

Keep product-specific choreography next to the lab; keep the **pattern** (record → encode → tmp) shared.

---

## Recipe (copy to any project)

### 1. Wait for readiness

```js
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForSelector("canvas", { timeout: 60000 }); // or your hero root
await sleep(2000); // entrance / loader soft timeout
```

### 2. Act: pointer tour (eased polyline)

Move the mouse along control points with ease-in-out so the recording looks human, not robotic. Use for clip-path follow, magnetic UI, hover states.

### 3. Act: drag / grab

```js
await page.mouse.move(cx, cy);
await page.mouse.down();
await movePath(page, points, steps, pauseMs);
await page.mouse.up();
```

Works for R3F `onPointerDown` drag, carousels, knobs — anything that listens to pointer capture.

### 4. Act: scroll pin journey

```js
const scrollMax = await page.evaluate(() =>
  Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    Math.round(window.innerHeight * 1.35),
  ),
);
for (let i = 0; i <= steps; i++) {
  const y = Math.round(scrollMax * (i / steps));
  await page.evaluate((yy) => {
    window.scrollTo(0, yy);
    window.__msLenis?.scrollTo?.(yy, { immediate: true }); // or your app’s Lenis
  }, y);
  await page.mouse.move(/* optional companion pointer */);
  await sleep(60–80);
}
```

Expose Lenis (or equivalent) on `window` during demo builds if you need immediate scrub without lerp lag.

### 5. Encode

```text
ffmpeg -y -i raw.webm -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart -an out.mp4
```

If ffmpeg fails, keep the WebM as fallback; do not delete the only take.

---

## Quality tips (any product)

1. **Headless + WebGL:** angle flags matter; if canvas is black, try headed once to debug GPU.
2. **Settle time:** 3D / HDRI / textures need 1.5–3s after `canvas` exists.
3. **Acts tell a story:** idle → discover → interact → scroll payoff → re-engage. ~15–30s is enough for storefront-style demos.
4. **Do not thrift frames** for presentation quality on flagship products; for interactive WebM, length is driven by act timing, not FPS sampling.
5. **Isolation:** run against **lab** or **cleanroom demo** URLs, never against production with real auth chrome unless intentional.
6. **Roles:** promote to storefront paths only when the movie is the gallery/product player asset. Client packs stay chrome-free.

---

## MS-specific roles (when used inside this monorepo)

| Artifact | Path pattern | Notes |
|----------|--------------|--------|
| Interactive work take | `tmp/*-demo.mp4` | Disposable / QA |
| Storefront page | `public/assets/videos/{product}-*-preview-v1.mp4` | Gallery loop |
| Storefront FS | `…-preview-fs-v1.mp4` | Fullscreen anti-theft player |
| Client HD | film under `public/assets/videos/` **or** model pack (`/models`, textures) | Never interactive chrome |
| Backgrounds library | only if product has a film contribution | **Actually! / Helix-style 3D-as-product: omit** |

Frame-scrub storefront scripts (`scripts/capture-*-preview.mjs`) remain the default for **scroll-scrub** products. Interactive record is complementary when the product signature is **pointer + drag**, not only scroll progress.

---

## First production reference

- **Lab choreography:** Actually! hero — pointer clip window, 3D can grab, pin `+=120%`, support copy.
- **Product id (when sold):** `MS-HERO-ACTU01` · brand **Actually!** · no `/backgrounds` listing.

Use the same automation pattern for any future lab (agency, fintech, wellness) without renaming the pattern after a single SKU.
