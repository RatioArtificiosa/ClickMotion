/**
 * Burn NEXUS AI enterprise hero into storefront preview videos (page + fullscreen).
 *
 * Dual-track (same law as Axiom / Sable):
 *  1) Capture FG (nav, path, copy, tape, constellation) as RGBA — transparent, no live video paint
 *  2) Composite continuous client HD underneath in ffmpeg (no browser seek)
 *
 * Usage:
 *   node scripts/capture-nexus-preview.mjs
 *   node scripts/capture-nexus-preview.mjs http://127.0.0.1:3004/demo/cleanroom-nexus
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const require = createRequire(import.meta.url);

const URL =
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-nexus";
const OUT_DIR = path.join(root, "tmp", "nexus-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "nexus-enterprise-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "nexus-enterprise-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "nexus-enterprise-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-NEXU01.webp");

const BG_SRC = path.join(
  root,
  "public",
  "assets",
  "videos",
  "nexus-neural-v1.mp4"
);

const FPS = 24;
/**
 * Storefront sample length. Slightly longer so five letter-melt word
 * changes stay calm and readable (full client HD remains ~59s).
 */
const DURATION_S = 16;
const TOTAL_FRAMES = FPS * DURATION_S;
const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      return path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
    }
  })();

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function cleanDir(d) {
  if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true });
  ensureDir(d);
}

function runFfmpeg(args) {
  const r = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
  return r;
}

/** Stay near top so path + copy remain; film is continuous underlay */
function progressForFrame(i, totalFrames) {
  const t = i / (totalFrames - 1);
  return Math.min(0.08, Math.max(0, t * 0.08));
}

/**
 * Storefront-only burn polish (does NOT touch live demo component):
 * Wall-clock GSAP/CSS runs hot vs frame capture → spasmodic loops.
 * We frame-scrub path + letter-melt so the 12s gallery clip gets:
 *   - one calm path journey
 *   - two elegant sequential letter-blur word changes (no hard blinks)
 */
const CAPTURE_CSS = `
  html, body, #__next, [data-overlay-container],
  body > div, main, .min-h-screen {
    background: transparent !important;
    background-color: transparent !important;
  }
  body > div > header,
  [data-site-header],
  nav[class*="Header"],
  header:not(.nexus-nav),
  footer:not(.nexus-tape),
  [data-site-footer] {
    display: none !important;
  }
  .nexus-nav,
  .nexus-tape,
  .nexus-copy,
  .nexus-path,
  .nexus-layout,
  .nexus-constellation {
    visibility: visible !important;
    opacity: 1 !important;
  }
  .nexus-root,
  .nexus-video-wrap,
  .nexus-layout {
    background: transparent !important;
    background-color: transparent !important;
  }
  .nexus-video,
  .nexus-video--still {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .nexus-veil {
    background:
      linear-gradient(
        90deg,
        rgba(7, 8, 15, 0.94) 0%,
        rgba(7, 8, 15, 0.78) 26%,
        rgba(7, 8, 15, 0.35) 48%,
        rgba(7, 8, 15, 0.22) 72%,
        rgba(7, 8, 15, 0.4) 100%
      ),
      linear-gradient(
        180deg,
        rgba(7, 8, 15, 0.62) 0%,
        transparent 28%,
        transparent 58%,
        rgba(7, 8, 15, 0.82) 100%
      ) !important;
  }
  .nexus-vignette {
    box-shadow: inset 0 0 130px 48px rgba(7, 8, 15, 0.5) !important;
  }
  .nexus-path-travel,
  .nexus-path-bullet,
  .nexus-tape-pulse,
  .nexus-constellation-dot {
    animation-play-state: paused !important;
  }
  /* Capture host is OUTSIDE React so re-renders cannot wipe letter layers */
  #nexus-capture-cycle {
    position: relative !important;
    display: inline-block !important;
    vertical-align: baseline !important;
  }
  #nexus-capture-cycle .nexus-cycle-word {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    display: inline-flex !important;
    white-space: nowrap !important;
    pointer-events: none !important;
  }
  #nexus-capture-cycle .nexus-cycle-char {
    display: inline-block !important;
    /* filter must paint for screenshots */
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  /* Hide React-managed cycle — GSAP still runs there but is invisible */
  .nexus-cycle:not(#nexus-capture-cycle) {
    visibility: hidden !important;
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    pointer-events: none !important;
  }
  .nexus-copy,
  .nexus-path,
  .nexus-tape,
  .nexus-constellation,
  .nexus-nav {
    opacity: 1 !important;
    transform: none !important;
  }
`;

/**
 * Full 5-word sequence (same as live product). Period on each word.
 * Timeline is frame-driven; exit completes before enter.
 */
const STOREFRONT_WORDS = [
  "compounds",
  "decides",
  "scales",
  "routes",
  "multiplies",
];

async function prepareStorefrontUi(page) {
  await page.evaluate((words) => {
    try {
      const g = window.gsap || null;
      if (g) {
        g.globalTimeline.clear();
        g.killTweensOf("*");
      }
    } catch {
      /* ignore */
    }

    const reactCycle = document.querySelector(
      ".nexus-cycle:not(#nexus-capture-cycle)"
    );
    const titleSub = document.querySelector(".nexus-title-sub");
    if (!titleSub) return;

    // Remove prior capture host if re-running
    document.getElementById("nexus-capture-cycle")?.remove();

    const host = document.createElement("span");
    host.id = "nexus-capture-cycle";
    host.className = "nexus-cycle";
    host.setAttribute("aria-hidden", "true");

    // Width lock = longest word + period
    const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
    const sizer = document.createElement("span");
    sizer.className = "nexus-cycle-sizer";
    sizer.textContent = `${longest}.`;
    sizer.style.visibility = "hidden";
    sizer.style.display = "inline-block";
    sizer.style.whiteSpace = "nowrap";
    host.appendChild(sizer);

    const mkLayer = (id) => {
      const layer = document.createElement("span");
      layer.className = "nexus-cycle-word";
      layer.dataset.layer = id;
      host.appendChild(layer);
      return layer;
    };
    mkLayer("a");
    mkLayer("b");

    // Insert right after React cycle (or at end of title sub)
    if (reactCycle && reactCycle.parentNode) {
      reactCycle.parentNode.insertBefore(host, reactCycle.nextSibling);
    } else {
      titleSub.appendChild(host);
    }

    document.getAnimations({ subtree: true }).forEach((anim) => {
      try {
        anim.pause();
      } catch {
        /* ignore */
      }
    });
  }, STOREFRONT_WORDS);
}

/**
 * progress 0…1 over the storefront clip.
 * Rebuilds letter spans every frame so React cannot stomp the melt.
 */
async function scrubUiToFrame(page, frameIndex, totalFrames) {
  const progress =
    totalFrames <= 1 ? 0 : frameIndex / (totalFrames - 1);

  await page.evaluate(
    ({ p, words }) => {
      const pathMs = 4500;
      const breatheMs = 3200;
      const BLUR = 32;

      document.getAnimations({ subtree: true }).forEach((anim) => {
        try {
          const name = String(anim.animationName || "");
          let dur = pathMs;
          try {
            const t =
              anim.effect && anim.effect.getTiming
                ? anim.effect.getTiming()
                : null;
            if (t && typeof t.duration === "number" && t.duration > 0) {
              dur = t.duration;
            }
          } catch {
            /* keep */
          }
          if (name.includes("nexusTravel") || name.includes("nexusNodeHit")) {
            anim.currentTime = p * dur;
            anim.pause();
          } else if (name.includes("nexusBreathe")) {
            anim.currentTime =
              p * 0.45 * (typeof dur === "number" ? dur : breatheMs);
            anim.pause();
          } else {
            anim.currentTime =
              0.85 * (typeof dur === "number" && dur > 0 ? dur : 1000);
            anim.pause();
          }
        } catch {
          /* ignore */
        }
      });

      const host = document.getElementById("nexus-capture-cycle");
      if (!host) return;
      let layerA = host.querySelector('[data-layer="a"]');
      let layerB = host.querySelector('[data-layer="b"]');
      if (!layerA || !layerB) return;

      const seedUnit = (seed, i) => {
        let h = 2166136261;
        const s = `${seed}:${i}`;
        for (let c = 0; c < s.length; c++) {
          h ^= s.charCodeAt(c);
          h = Math.imul(h, 16777619);
        }
        return (h >>> 0) / 4294967296;
      };

      /** Paint every letter from scratch each frame (bulletproof vs React) */
      const paint = (layer, word, mode, localT, seed) => {
        const text = `${word}.`;
        const n = text.length;
        // Unique stagger slots shuffled by seed — guarantees visible per-letter
        // differences mid-phase (not whole-word blink, not empty gap).
        const slots = Array.from({ length: n }, (_, i) =>
          n === 1 ? 0 : (i / (n - 1)) * 0.48
        );
        for (let i = n - 1; i > 0; i--) {
          const j = Math.floor(seedUnit(seed, i + 17) * (i + 1));
          const tmp = slots[i];
          slots[i] = slots[j];
          slots[j] = tmp;
        }
        const letterDur = 0.5; // each letter's melt length within the phase

        layer.replaceChildren();
        for (let i = 0; i < n; i++) {
          const start = slots[i];
          const end = Math.min(1, start + letterDur);
          let op = 1;
          let blur = 0;

          if (mode === "hold") {
            op = 1;
            blur = 0;
          } else if (mode === "hidden") {
            op = 0;
            blur = BLUR;
          } else if (mode === "out") {
            if (localT <= start) {
              op = 1;
              blur = 0;
            } else if (localT >= end) {
              op = 0;
              blur = BLUR;
            } else {
              const u = (localT - start) / (end - start);
              const e = u * u * (3 - 2 * u);
              op = 1 - e;
              blur = e * BLUR;
            }
          } else if (mode === "in") {
            if (localT <= start) {
              op = 0;
              blur = BLUR;
            } else if (localT >= end) {
              op = 1;
              blur = 0;
            } else {
              const u = (localT - start) / (end - start);
              const e = u * u * (3 - 2 * u);
              op = e;
              blur = (1 - e) * BLUR;
            }
          }

          const ch = document.createElement("span");
          ch.className = "nexus-cycle-char";
          ch.textContent = text[i];
          ch.style.cssText = [
            "display:inline-block",
            `opacity:${op}`,
            `filter:blur(${blur.toFixed(2)}px)`,
            `-webkit-filter:blur(${blur.toFixed(2)}px)`,
            "transform:translateZ(0)",
          ].join(";");
          layer.appendChild(ch);
        }
      };

      const seg = (from, to) => {
        if (p <= from) return 0;
        if (p >= to) return 1;
        return (p - from) / (to - from);
      };

      /**
       * 5 words, 4 transitions. Each: hold → out (full) → in (full) → hold…
       * p bands (approx 16s total):
       * 0.00–0.10 hold 0
       * 0.10–0.20 out 0
       * 0.20–0.30 in 1
       * 0.30–0.38 hold 1
       * 0.38–0.48 out 1
       * 0.48–0.58 in 2
       * 0.58–0.66 hold 2
       * 0.66–0.76 out 2
       * 0.76–0.86 in 3
       * 0.86–0.92 hold 3
       * 0.92–0.98 out 3
       * 0.98–1.00 in 4 (short settle)
       */
      const phases = [
        { from: 0.0, to: 0.1, type: "hold", front: "a", word: 0 },
        { from: 0.1, to: 0.2, type: "out", front: "a", word: 0 },
        { from: 0.2, to: 0.3, type: "in", front: "b", word: 1 },
        { from: 0.3, to: 0.38, type: "hold", front: "b", word: 1 },
        { from: 0.38, to: 0.48, type: "out", front: "b", word: 1 },
        { from: 0.48, to: 0.58, type: "in", front: "a", word: 2 },
        { from: 0.58, to: 0.66, type: "hold", front: "a", word: 2 },
        { from: 0.66, to: 0.76, type: "out", front: "a", word: 2 },
        { from: 0.76, to: 0.86, type: "in", front: "b", word: 3 },
        { from: 0.86, to: 0.92, type: "hold", front: "b", word: 3 },
        { from: 0.92, to: 0.98, type: "out", front: "b", word: 3 },
        { from: 0.98, to: 1.01, type: "in", front: "a", word: 4 },
      ];

      let phase = phases[phases.length - 1];
      for (const ph of phases) {
        if (p < ph.to) {
          phase = ph;
          break;
        }
      }

      const localT = seg(phase.from, Math.min(phase.to, 1));
      const frontIsA = phase.front === "a";
      const front = frontIsA ? layerA : layerB;
      const back = frontIsA ? layerB : layerA;
      const w = words[phase.word];
      const seed = `${phase.type}-${phase.word}`;

      // Back layer always fully hidden this frame
      paint(back, words[(phase.word + 1) % words.length], "hidden", 0, "hid");
      paint(front, w, phase.type === "hold" ? "hold" : phase.type, localT, seed);

      front.style.zIndex = "3";
      back.style.zIndex = "1";
    },
    { p: progress, words: STOREFRONT_WORDS }
  );
}

function encodeComposite(framesDir, outVideo, width, height, frameCount) {
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`Background source missing: ${BG_SRC}`);
  }
  const pattern = path.join(framesDir, "frame-%05d.png");
  const filter = [
    `[0:v]scale=${width}:${height}:force_original_aspect_ratio=increase,` +
      `crop=${width}:${height}:(iw-ow)/2:(ih-oh)/2,setsar=1,fps=${FPS},format=yuv420p,setpts=PTS-STARTPTS[bg]`,
    `[1:v]fps=${FPS},format=rgba,setpts=PTS-STARTPTS[fg]`,
    `[bg][fg]overlay=0:0:format=auto,format=yuv420p[v]`,
  ].join(";");

  console.log(
    `  compositing full BG (${path.basename(BG_SRC)}) under ${frameCount} FG frames → ${path.basename(outVideo)}`
  );

  runFfmpeg([
    "-y",
    "-stream_loop",
    "-1",
    "-i",
    BG_SRC,
    "-framerate",
    String(FPS),
    "-i",
    pattern,
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-frames:v",
    String(frameCount),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-movflags",
    "+faststart",
    "-an",
    outVideo,
  ]);
  console.log("Wrote", outVideo);
}

async function captureForeground(viewport, framesDir) {
  cleanDir(framesDir);

  console.log("Launching FG capture…", URL, viewport);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: 1,
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForSelector(".nexus-root", { timeout: 60_000 });
  await page.waitForTimeout(1200);

  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch {
        /* ignore */
      }
    });
  });
  await page.addStyleTag({ content: CAPTURE_CSS });
  await page.waitForTimeout(400);
  // Storefront-only: calm UI scrub (live demo unchanged)
  await prepareStorefrontUi(page);
  await page.waitForTimeout(200);

  const maxScroll = await page.evaluate(() => {
    const root = document.querySelector(".nexus-root");
    if (!root) return document.body.scrollHeight - window.innerHeight;
    return Math.max(0, root.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} FG frames @ ${FPS}fps (calm frame-scrubbed UI, film underlay normal)`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = progressForFrame(i, TOTAL_FRAMES);
    const y = Math.round(progress * maxScroll);

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await scrubUiToFrame(page, i, TOTAL_FRAMES);
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r))
        )
    );

    const file = path.join(
      framesDir,
      `frame-${String(i).padStart(5, "0")}.png`
    );
    await page.screenshot({
      path: file,
      type: "png",
      omitBackground: true,
    });

    if (i % 48 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(
        `  FG frame ${i}/${TOTAL_FRAMES} pathP=${(i / Math.max(1, TOTAL_FRAMES - 1)).toFixed(3)}`
      );
    }
  }

  await browser.close();
  return TOTAL_FRAMES;
}

function writePosterFromComposite(videoPath, outPoster, outThumb, width) {
  const t = (DURATION_S * 0.35).toFixed(3);
  if (outPoster) {
    runFfmpeg([
      "-y",
      "-ss",
      t,
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-vf",
      `scale=${width}:-1`,
      "-q:v",
      "70",
      outPoster,
    ]);
    console.log("Wrote", outPoster);
  }
  if (outThumb) {
    runFfmpeg([
      "-y",
      "-ss",
      t,
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-vf",
      "scale=800:-1",
      "-q:v",
      "72",
      outThumb,
    ]);
    console.log("Wrote", outThumb);
  }
}

async function captureAt(viewport, framesDir, outVideo, outPoster, outThumb) {
  ensureDir(path.dirname(outVideo));
  if (outPoster) ensureDir(path.dirname(outPoster));
  if (outThumb) ensureDir(path.dirname(outThumb));

  const n = await captureForeground(viewport, framesDir);
  encodeComposite(framesDir, outVideo, viewport.width, viewport.height, n);
  writePosterFromComposite(outVideo, outPoster, outThumb, viewport.width);
}

async function main() {
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`BG source not found: ${BG_SRC}`);
  }

  console.log("NEXUS storefront burn — FG + neural lattice composite");
  console.log("  BG source:", BG_SRC);
  console.log("  Duration:", DURATION_S, "s (storefront sample)");

  await captureAt(VIEWPORT, OUT_DIR, OUT_VIDEO, OUT_POSTER, OUT_THUMB);
  await captureAt(
    VIEWPORT_FS,
    path.join(root, "tmp", "nexus-preview-frames-fs"),
    OUT_VIDEO_FS,
    path.join(
      root,
      "public",
      "assets",
      "posters",
      "nexus-enterprise-preview-fs-v1.webp"
    ),
    null
  );
  console.log("NEXUS capture complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
