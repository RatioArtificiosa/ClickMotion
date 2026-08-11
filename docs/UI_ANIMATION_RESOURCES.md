# UI Animation & Interaction Resources — Research Map for MS

**Status:** Competitive / inspiration research · 2026-08-08  
**Purpose:** Catalog free (and freemium) animation, hover, and motion-component sources so MS can **encode craft into prompts** without shipping AI-kit sameness.  
**Related:** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) · [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md)

---

## 1. Executive judgment

The ecosystem has exploded into **copy-paste animated React + Tailwind + Motion** registries (Magic UI, Aceternity, Lightswind, Animata, React Bits, Hover.dev, etc.). They are excellent as:

| Use for MS | Do **not** use for |
|------------|--------------------|
| **Signature move vocabulary** (magnetic button, scroll word reveal, tilt, cursor trail, 3D card) | Dropping whole kits into every hero (looks AI-made) |
| **Motion numbers / interaction patterns** to encode in sold prompts | Hard dependency on a registry as the product |
| **Mode ideas** (mouse, scroll, 3D, text-split) for content plan | Pill nav + aurora mesh + shiny text as house style |
| **Engine truth** (Motion / GSAP / CSS scroll timelines) | Replacing famous human UI references |

**MS rule:** Steal **one** interaction mechanic + quantify it. Compose into original layout + famous UI reference direction. Never “install Magic UI hero and recolor.”

---

## 2. Sources you named (deep read)

### 2.1 Lightswind UI

| | |
|--|--|
| **Site** | https://lightswind.com/components |
| **GitHub** | https://github.com/codewithMUHILAN/Lightswind-UI-Library |
| **Model** | shadcn-style **CLI + source ownership** (`npx lightswind add …`); MIT free tier + **Pro** blocks |
| **Stack** | React 18/19, Tailwind v3/v4, Framer Motion + GSAP, optional 3D/WebGL |
| **Scale** | Site claims **260+** components; GitHub markets **160+** free; Pro WebGL/GSAP extras |
| **Categories** | 3D elements, backgrounds (shaders, particles, aurora), buttons (magnetic, liquid glass, glitch), text, cursors, scroll, forms, AI blobs |
| **AI angle** | MCP server for Cursor/Claude — agents can search/install components |

**MS relevance:** Highest density of **3D + cursor + magnetic + scroll** primitives in one registry. Perfect for **mode expansion** (specials), dangerous as default chrome (sparkle navbar, liquid glass button, aurora shader on every SKU).

**Encode-worthy mechanics:** magnetic button, image trail, 3D perspective card / scroll trigger, smooth cursor, scroll timeline/paragraph, plasma/shader backgrounds (specials only).

---

### 2.2 Magic UI

| | |
|--|--|
| **Site** | https://magicui.design/docs/components |
| **Model** | Copy-paste React components; free docs + **Magic UI Pro** blocks/templates |
| **Stack** | React, Tailwind, Motion (Framer lineage) |
| **Catalog (representative)** | Marquee, dock, globe, particles, meteors, border beam, magic card, text animate / morphing / shiny / aurora text, bento grid, number ticker, scroll progress / velocity, interactive hover button, glare hover, pointer, smooth cursor, confetti, orbiting circles, hero video dialog, warp background, … |

**MS relevance:** The **canonical “animated SaaS landing” kit**. Many Motionsites-adjacent looks come from this DNA (shiny text, aurora, marquee, bento). Use for **isolated** effects (scroll-based velocity, text reveal, dock as special) — not full page skins.

**Risk:** Highest correlation with “humans know an AI made this.” Authority test fails if Magic UI is the whole design system.

---

### 2.3 Tailwind Animations (midudev / tailwind-animations.com)

| | |
|--|--|
| **Site** | https://tailwind-animations.com/ |
| **Model** | **MIT open-source** Tailwind plugin; utility classes, not full components |
| **Scale** | **79+** utilities (fade, slide, zoom, bounce, flip, jelly, wobble, …) |
| **Advanced** | **Scroll-driven CSS** (`timeline-view`, `timeline-scroll`, `animate-range-*`), dialog entry/exit (`animate-dialog`), duration/delay/steps modifiers |
| **Install** | Tailwind v4: `@import 'tailwind-animations'`; legacy v3 package exists |

**MS relevance:** Best **zero-JS / low-JS** motion layer for sold prompts that ban heavy deps. Aligns with `css-only` technical tag, entrance micro-motion, and future **scroll-driven CSS** without GSAP. Prefer over “install a whole Magic UI section” for simple heroes.

**Encode-worthy:** `animate-fade-in-up` + duration/delay; view-timeline scroll reveals; dialog motion for section specials.

---

### 2.4 Motion (motion.dev) examples

| | |
|--|--|
| **Site** | https://motion.dev/examples |
| **Model** | Official examples for **Motion** (formerly Framer Motion family); free examples + **Motion+** paid (410+ examples, MCP, lifetime) |
| **Coverage** | React / JS / Vue; categories: cursor, scroll, text, carousel, layout, page transitions, loading, Radix/Base UI, interactions, … |
| **Gold patterns** | Magnetic cursor, cursor trail, tilt card, scroll word reveal, shared layout, App Store-style expand, parallax, scramble text, hold-to-confirm, ticker, iOS-style stacks |

**MS relevance:** **Ground truth for stack MS already sells** (Motion / Framer Motion). Prefer Motion.dev patterns over random registries when encoding `whileHover`, layout animations, `useScroll` / `useTransform`. Famous-product-adjacent examples (App Store, iOS notifications, Material ripple) support “imitate great UI craft” without Magic UI skin.

**Encode-worthy:** magnetic target, scroll-linked text, layout shared element, tilt card, spring follow pointer — all mappable to `technicalTags`.

---

### 2.5 awesome-ui-resources (al-husayn)

| | |
|--|--|
| **Repo** | https://github.com/al-husayn/awesome-ui-resources |
| **Role** | Meta-index of modern UI libraries, animation kits, design systems |

**High-value animation-adjacent entries (non-exhaustive):**

| Name | Link | Note for MS |
|------|------|-------------|
| Aceternity UI | https://ui.aceternity.com/ | 200+ free animated components/blocks; Motion + Tailwind |
| Magic UI | https://magicui.design/ | See above |
| Animate UI | https://animate-ui.com/ | Pre-built animated components |
| Motion Primitives | https://motion-primitives.com/ | Motion-first primitives |
| Hover.dev | https://www.hover.dev/ | Animated React + Tailwind + Motion templates |
| Animata | https://animata.design/ | Free OSS animated React (100+), MIT |
| React Bits | https://reactbits.dev/ | Patterns / animated bits |
| Solace UI | https://www.solaceui.com/ | Free animated Tailwind + Framer |
| Componentry | https://www.componentry.fun/ | Magnetic dock, particles, matrix, etc. |
| REUI | https://reui.io/ | Animated shadcn-oriented |
| ScrollX UI | https://scrollx-ui.vercel.app/ | Scroll-heavy animated components |
| SATIS UI | https://satisui.xyz/ | GSAP + Motion + shadcn |
| Spell | https://spell.sh/ | Copy-paste animated React (marquees, shimmer, tilt) |
| Transitions.dev | https://transitions.dev/ | Portable CSS micro-interaction snippets |
| UIverse | https://uiverse.io/ | Community CSS/React hover & button effects |
| 21st.dev | https://21st.dev/ | Component marketplace / discovery |
| Origin UI / Cult UI / Kokonut / etc. | various | Blocks; less motion-first |

Also lists engines: **Anime.js**, **Motion**, Tailwind animation plugins, SVG Studio, Remocn (Remotion).

---

## 3. Additional free / freemium sources (research expansion)

### 3.1 Engines (prefer these in sold prompts)

| Engine | URL | MS role |
|--------|-----|---------|
| **Motion** (Framer Motion lineage) | https://motion.dev | Primary React motion (already in stack law) |
| **GSAP** | https://gsap.com | ScrollTrigger timelines; license note for some plugins |
| **Anime.js** | https://animejs.com | Lightweight timelines; optional |
| **React Spring** | https://www.react-spring.dev | Physics springs |
| **Lottie** | https://airbnb.io/lottie | Pre-authored vector motion; tag `lottie` |
| **CSS** (native + View Timeline) | MDN / tailwind-animations | Prefer when enough |

### 3.2 CSS / hover libraries (micro-interactions)

| Name | URL | Notes |
|------|-----|-------|
| Hover.css | https://ianlunn.github.io/Hover/ | 100+ CSS hover classes; buttons/links/images |
| imagehover.css | https://imagehover.io/ | Image caption hover |
| iHover | https://gudh.github.io/ihover/ | SCSS hover pack |
| Mocassin.css | https://eliezerpujols.github.io/mocassin.css/ | Caption hovers |
| Animate.css | https://animate.style/ | Classic enter/attention keyframes |
| Animista | https://animista.net/ | Generate CSS keyframes interactively |
| CSShake | https://elrumordelaluz.github.io/csshake/ | Shake utilities |
| Hamburgers | https://jonsuh.com/hamburgers/ | Menu icon morphs |
| UIverse | https://uiverse.io/ | Huge community button/card hover gallery |

### 3.3 React / Tailwind motion component kits (peer set)

| Name | URL | Free angle |
|------|-----|------------|
| Aceternity UI | https://ui.aceternity.com/components | Large free set + paid |
| Animata | https://animata.design/ | Free OSS |
| React Bits | https://reactbits.dev/ | Free patterns |
| Hover.dev | https://www.hover.dev/ | Free samples + paid |
| Animate UI | https://animate-ui.com/ | Animated components |
| Motion Primitives | https://motion-primitives.com/ | Primitives |
| Cult UI / Origin UI / Kokonut | cult-ui.com, originui.com, kokonutui.com | Blocks (mixed motion) |
| shadcn/ui | https://ui.shadcn.com/ | Not motion-first; accessibility primitives |

### 3.4 Inspiration / showcases (craft, not copy-paste)

| Name | URL | Why |
|------|-----|-----|
| Codrops | https://tympanus.net/codrops/ | Legendary demos (WebGL, scroll, hover) — high craft |
| Awwwards | https://www.awwwards.com/ | Famous-site reference pool |
| Godly | https://godly.website/ | Curated high-end sites |
| Landingfolio | https://www.landingfolio.com/ | Landing patterns |
| Locomotive Scroll demos / Lenis | various | Smooth scroll craft (use carefully for a11y) |

### 3.5 3D / WebGL / backgrounds (for specials)

| Name | URL | Notes |
|------|-----|-------|
| Three.js docs + examples | https://threejs.org/examples/ | Engine ground truth |
| React Three Fiber | https://r3f.docs.pmnd.rs/ | React 3D |
| Spline | https://spline.design/ | Design-export 3D (Motionsites uses this) |
| Paper Shaders | https://shaders.paper.design/ | Zero-dep React/GLSL backgrounds (mesh, grain, warp…) |
| Unicorn Studio | https://www.unicorn.studio/ | No-code WebGL → video/embed/JSON (own the export) |
| 21st Shader Builder | https://21st.dev/community/shaders/editor | Knob shaders → React/GLSL/video + cursor modes |
| Vanta.js | https://www.vantajs.com/ | Plug-and-play Three backgrounds (dated if overused) |
| Shadertoy | https://www.shadertoy.com/ | Craft library; port carefully to Three/R3F |
| tsParticles | https://particles.js.org/ | Interactive 2D particle fields |
| wawa-vfx | https://github.com/wass08/wawa-vfx | R3F GPU particles / trails / bursts |
| Lightswind 3D set | lightswind components | Packaged 3D carousels/cards |

**Full background ladder (video → shader → R3F → hybrid → gen bake):** see **§10**.
---

## 4. Taxonomy map (MS tags ↔ ecosystem effects)

| MS `technicalTags` | Ecosystem sources that teach the mechanic |
|--------------------|-------------------------------------------|
| `video-background` | MS CDN muted loops; dual video-gen prompts; hybrid under FX (§10.2, 10.6) |
| `scroll-trigger` | GSAP ScrollTrigger; Motion useScroll; tailwind-animations timeline-view; R3F scroll scenes |
| `parallax` | Motion parallax examples; Codrops |
| `text-split` | Motion scroll word reveal / split text; Magic text animate; particle-dispersing type |
| `magnetic-cursor` | Motion magnetic target; Lightswind magnetic button; cursor follow |
| `infinite-marquee` | Magic UI marquee; Lightswind sliding logo marquee |
| `3d-threejs` / `webgl` | R3F, Three, Paper Shaders, Shadertoy ports, Unicorn bake, Codrops (§10.3–10.4) |
| `3d-spline` | Spline + Motionsites Automation Machines pattern |
| `particle-canvas` | tsParticles; R3F Points; wawa-vfx; Magic/Lightswind particles (reimplement) |
| `lottie` | LottieFiles + lottie-react |
| `css-only` | Hover.css, Animista, tailwind-animations, Transitions.dev; CSS cursor spotlight hybrid |
| `svg-animation` | Motion path drawing; SVG Studio |
| `disintegration` / `break-apart` | Codrops / custom video + clip-path (MS specials plan) |

---

## 5. AI-slop risk matrix (critical)

| Pattern overused in free kits | Authority impact | MS policy |
|------------------------------|------------------|-----------|
| Aurora / mesh / warp backgrounds | High “AI SaaS” | Special only; not default |
| Shiny / sparkle / gradient text | High | Rare accent, not every H1 |
| Floating pill / dock nav as hero chrome | High | Avoid as house nav |
| Border beam / rainbow buttons everywhere | Medium–high | One accent max |
| Globe + meteors + particles stack | High noise | One background system per SKU |
| Bento + marquee + number ticker default LP | Medium | Use sparingly; original layout first |
| Magnetic / tilt / cursor trail | Medium if alone; low if craft | **Good** specials when quantified |
| Scroll word reveal / shared layout | Lower (feels product-like) | Prefer for premium heroes |
| CSS hover micro (Hover.css-class) | Low if subtle | Prefer for corporate/minimal |

---

## 6. How MS should consume this ecosystem

### Allowed workflow

```text
1. Pick product shape + famous UI reference (Stripe / Linear / editorial / …)
2. Pick ONE signature mechanic from this map (e.g. magnetic CTA, scroll word reveal, tilt product)
3. Open Motion.dev or CSS source — extract numbers (spring, scrub, radius, lerp)
4. Encode into Deepseek buyer prompt (Motion Specification + tags)
5. Clean-room build — no registry import required for the sold prompt
6. Capture signature behavior muted
```

### Forbidden workflow

```text
npx lightswind add sparkle-navbar + aurora + shiny-text + marquee
  → recolor brand
  → ship as MS hero
```

That is Motionsites-adjacent **kit composition**, not original authority UI.

### Sold prompt stack policy (unchanged)

- Prefer **Motion + Tailwind + optional GSAP**  
- **Do not** require Lightswind/Magic UI packages as permanent deps  
- Mechanics may be **reimplemented** from first principles in the prompt  
- 3D only with honest tags + extreme intensity + perf budget  

---

## 7. Content plan fuel (from this research)

| Mode / special idea | Primary inspiration source |
|---------------------|----------------------------|
| Magnetic CTA hero | Motion magnetic + Lightswind magnetic button |
| Cursor-follow product | Motion cursor-follow / trail |
| Scroll word-reveal editorial | Motion text-scroll-word-reveal |
| Tilt / 3D product card section | Motion tilt; Lightswind 3D perspective |
| CSS-only corporate hover set | Hover.css + tailwind-animations |
| Scroll-driven CSS section (no GSAP) | tailwind-animations timeline-view |
| Loader special | Motion loaders; Lightswind loaders |
| Page transition special | Motion curtains (Motion+ awareness) |
| Spline 3D hero | Spline + existing MS tag |
| Video-quality shader field | Paper Shaders / §10.3 |
| Cursor-reactive fluid bg | 21st Shader Builder patterns / custom GLSL |
| Hybrid video + dust/spotlight | §10.6 |
| One-object R3F product film | §10.4 Oryzo/Hubtown play |
| Owned Unicorn/21st bake | Export → MS CDN video or self-host JSON |

---

## 8. Deepseek briefing snippet (optional paste)

```text
Signature interaction must come from professional motion craft (Motion.dev examples,
CSS scroll timelines, or a single quantified mechanic), NOT from assembling Magic UI /
Lightswind / Aceternity chrome into a default AI landing page.
Name: (1) famous UI reference direction (2) one signature mechanic with numbers
(3) technicalTags. Ban pill-nav + aurora + shiny-text as the whole design.
```

---

## 9. Maintenance

- Re-scan `awesome-ui-resources` quarterly; kits churn fast.  
- Prefer **engines** (Motion, GSAP, CSS) over **skins** when standards conflict.  
- New tag needed → extend `taxonomy.ts` + this map, then ship special.  
- Re-scan **background tiers** (video / shader / R3F / hybrid) quarterly — tools like Unicorn Studio, Paper Shaders, 21st Shader Builder move fast.

---

## 10. Animated backgrounds — video quality, video itself, interactive

**Purpose:** Background systems that feel *cinematic* or *alive* — not pastel CSS blobs. Encode craft into buyer prompts + video-gen prompts; deliver loops and previews from **MS CDN** only.

### 10.1 Background quality tiers (MS ladder)

| Tier | What it is | Looks like video? | Interactive? | MS tags | When to use |
|------|------------|-------------------|--------------|---------|-------------|
| **A. Real video loop** | Muted `<video>` MP4/WebM on MS CDN + poster | Yes (is video) | No (unless hybrid) | `video-background` | Default Motionsites-class heroes; product proof + B-roll |
| **B. Shader / full-screen GLSL** | Fragment shader on canvas/WebGL paints every pixel | Often **yes** at 60fps | Yes (cursor uniforms) | `webgl`, sometimes `particle-canvas` | Specials, extreme intensity, no heavy asset download |
| **C. R3F / Three scene** | 3D objects, particles, camera, lights | Can match film if lit well | Yes (mouse, scroll, physics) | `3d-threejs`, `webgl`, `particle-canvas` | Extreme specials; one hard idea only |
| **D. 2D particles / canvas** | tsParticles, Points, trails | Soft / ambient, not film | Yes (hover/click) | `particle-canvas` | Accent fields, not whole brand identity |
| **E. Hybrid** | Video under + shader/particles/cursor FX over | Best of both | Partial | `video-background` + `webgl` / `particle-canvas` | Premium “alive video” without full 3D budget |
| **F. No-code WebGL gen** | Unicorn Studio / 21st Shader Builder → export | Video export **or** live embed | Yes if live | `webgl` or bake to `video-background` | Fast specials; **must own export** (CDN / self-host JSON) |

**MS rule (same as kits):** One background *system* per SKU. Stacking video + aurora + particles + globe = AI sludge.

### 10.2 Tier A — Production video backgrounds (ground truth)

Real loops remain the Motionsites-competitive default. Align with [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md):

| Spec | MS standard |
|------|-------------|
| Duration | **8–14s**, first/last frame match for seamless loop |
| Codecs | **MP4 H.264** primary; **WebM VP9** optional |
| Resolution | Hero ~**1280×720** (720p); avoid 4K full-bleed for bg |
| FPS | **24–30**; no audio track |
| Attributes | `autoplay muted loop playsInline` + `poster` |
| Delivery | **MS CDN only** (`{MS_CDN_BASE}/assets/videos/…`); never competitor CloudFront/Mux |
| Poster | Matching WebP; client shows poster first |
| Mobile | Prefer static poster / reduced asset; don’t force multi-MB on cellular |
| Overlay | Semi-transparent scrim for type contrast |
| a11y | Honor `prefers-reduced-motion` → poster only |

**Prompt-encodable tech (buyer prompt):**

```text
Background: full-bleed muted looping <video>, autoplay muted loop playsInline,
poster={name}.webp, sources MP4 (+ optional WebM) from MS CDN paths only.
Scrim: black/60 or brand tint for H1 contrast. No sound. Seamless loop 8–14s.
prefers-reduced-motion: show poster, do not load video.
```

**Video-gen prompt tech (paired):**

```text
Seamless loop, first frame equals last, slow camera or ambient motion only,
no hard cuts, no text, no logos, 8–12s, cinematic grade, subtle grain,
subject stays readable under dark UI scrim, 24fps feel, not vertigo-inducing.
```

**References:** industry practice (short loops, poster, dual formats, muted autoplay) — Masuga, Mux background-video guidance. MS still **hosts its own objects**; Mux/HLS is optional infra pattern, not a hotlink target.

### 10.3 Tier B — Video-quality shaders (no video file)

Full-screen fragment shaders can match “living film” quality without multi-MB assets. Best modern sources:

| Source | URL | What you get | Encode into prompts? |
|--------|-----|--------------|----------------------|
| **Paper Shaders** | https://shaders.paper.design/ · `@paper-design/shaders-react` | Zero-dep canvas shaders: mesh gradient, grain gradient, warp, waves, neuro noise, metaballs, god rays, smoke ring, liquid metal, … Apache-2.0 | **Yes** — props (`colors`, `distortion`, `swirl`, `speed`) are quantifiable |
| **21st Shader Builder** | https://21st.dev/community/shaders/editor | No-code knobs → GLSL / React / **video up to 4K** / still; cursor modes: push, repel, swirl, ripple, spotlight | **Yes as gen path** — export React **or bake to video for CDN** |
| **Shadertoy → Three/R3F** | https://www.shadertoy.com/ · threejs.org manual | Infinite craft library; port via `ShaderMaterial` / full-screen quad | **Yes for specials** — reimplement simplified GLSL, don’t paste unreadable walls without uniforms |
| **Vanta.js** | https://www.vantajs.com/ | Plug-and-play Three/p5 effects (waves, etc.), mouse interactive | **Optional encode only** — dated “startup 2019” look if overused; never house style |
| **Magic UI / Lightswind backgrounds** | registries | Warp, aurora, plasma packs | Steal **one** mechanic; reimplement; don’t skin whole SKU |

**Cursor-reactive shader pattern (prompt numbers):**

```text
Full-screen WebGL fragment: uTime, uResolution, uMouse (0–1).
Style: [neuro-noise | grain-mesh | fluid-warp]. Palette: 3–4 brand hex.
Motion speed 0.15–0.4. Cursor: [push | ripple | spotlight] radius 0.15–0.25.
Reduced motion: freeze at t=0 or static gradient. One canvas only; z-index under UI.
```

**Paper example vocabulary for Deepseek:** `MeshGradient` colors + distortion/swirl/speed; `GrainGradient`; `DotOrbit`; `Waves`; `Metaballs`; `GodRays` — use as **recipe names**, implement via package **or** reimplemented GLSL so sold prompt isn’t brittle.

### 10.4 Tier C — R3F / Three (interactive, film-weight when crafted)

Ground truth: [Three.js examples](https://threejs.org/examples/), [R3F examples](https://r3f.docs.pmnd.rs/getting-started/examples).

**Reusable plays from 2026 high-end Three sites** (Utsubo / Awwwards-class patterns — steal *one*):

| Play | Technique | MS product shape |
|------|-----------|------------------|
| **One object with weight** | Single hero mesh, real materials, inertia, Z-depth camera | Product hero / special |
| **Scroll as narrative** | Scroll position drives camera / scene sequence (GSAP + Lenis optional) | Long-form LP special |
| **Mouse-reveal monolith** | Cursor uncovers lighting/geometry detail | B2B extreme hero |
| **Particle-dispersing type** | Points morph from text (Shopify Editions-class) | Launch / changelog special |
| **Room per product** | Distinct 3D alcove per item | Catalog special (rare) |
| **WebGPU + TSL fallback** | One material graph → WebGPU or WebGL | Future-proof extreme only |

**Encode stack for sold prompts:**

```text
@react-three/fiber + @react-three/drei
Canvas dpr={[1, 1.5]}, frameloop demand or always with pause offscreen
Lights: 1 key + 1 rim; no default light soup
Optional: wawa-vfx (VFXParticles + VFXEmitter) for GPU particles/trails/bursts
Optional: custom ShaderMaterial on plane as full-screen bg behind objects
prefers-reduced-motion: static render or poster image, no Canvas
Perf budget: one scene, ≤ target FPS on mid laptop; no second WebGL context
```

**wawa-vfx** (https://github.com/wass08/wawa-vfx): R3F-first particles, trails, bursts — good for fireworks/spells/product sparks **as accent**, not entire background identity.

**Spline** stays valid via tag `3d-spline` (Motionsites DNA). Prefer when non-dev buyers need designer-exported scenes; still capture muted + own any exported assets.

### 10.5 Tier D — Particles / 2D fields

| Library | URL | Role |
|---------|-----|------|
| **tsParticles** | https://particles.js.org/ | Configurable interactive particle backgrounds (React/Vue ready) |
| **particles.js** (legacy) | vincentgarreau.com | Ancestor; prefer tsParticles |
| **R3F Points + shaders** | Maxime Heckel / Codrops | Higher craft than tsParticles defaults |
| **Canvas 2D noise** | custom | Lightweight ambient grain/fog |

**Encode:** particle count (800–3000 desktop / 300 mobile), link distance, hover mode (grab/repulse), colors from brand, opacity 0.2–0.5 under content. Tag `particle-canvas`. Avoid default “white dots on navy” SaaS cliché — change density, shape, or drive particles from product silhouette.

### 10.6 Tier E — Hybrid video + FX (highest “wow per kilo”)

Pattern Motionsites rarely nails well:

1. **MS CDN video** as base layer (real footage / gen loop).  
2. **CSS or canvas overlay:** film grain, subtle vignette, brand gradient scrim.  
3. **Optional interactive layer:** cursor spotlight (CSS `radial-gradient` follow), light particle dust, or full-screen shader with `uVideo` texture (advanced).  
4. **UI chrome** on top — never fighting the motion.

```text
Layer stack (bottom → top):
  video (muted loop) → scrim 40–60% → optional cursor spotlight / particles → content
Hybrid: do not stack more than one FX system on the video.
```

### 10.7 Tier F — No-code / gen tools (ownership rules)

| Tool | What | MS allow | MS ban |
|------|------|----------|--------|
| **Unicorn Studio** | Layer-based WebGL: 75+ effects, mouse/scroll interactivity, export image / **video 4K** / React-Webflow embed / **JSON self-host** | Bake to **MS CDN video** for gallery product; or self-host JSON + runtime if sold prompt documents it | Hotlinking Unicorn CDN as permanent product dependency without ownership story |
| **21st Shader Builder** | Knob-tuned shaders → React / GLSL / video | Export React reimplemented in clean-room **or** bake video to CDN | Shipping opaque community component as entire hero brand |
| **Paper (design tool)** | Design shaders visually → `@paper-design/shaders` | Props-driven components or GLSL port | Treating Paper as required SaaS for buyers |
| **Spline** | Designer 3D export | `3d-spline` tagged specials | Every SKU is a Spline scene |

**Ownership law:** Anything that appears in MS gallery preview or buyer download must be **MS-owned** (R2/Supabase + CF) or **source in the sold prompt**. Foreign runtime CDNs for the *product surface* are banned the same way as Motionsites CloudFront hotlinks.

### 10.8 Interactive feature vocabulary (for `technicalTags` + Motion Spec)

| Interaction | How | Typical stack | Tag(s) |
|-------------|-----|---------------|--------|
| Cursor push / repel / swirl / ripple | Mouse → shader uniforms | Paper / custom GLSL / 21st export | `webgl` |
| Spotlight under pointer | CSS radial or shader | CSS or GLSL | `css-only` or `webgl` |
| Magnetic / tilt chrome over bg | Motion spring on UI, bg separate | Motion | `magnetic-cursor` |
| Scroll-driven camera / scene | scroll progress 0–1 → Three camera | R3F + GSAP/Motion | `scroll-trigger`, `3d-threejs` |
| Particle grab / repulse | Pointer events on canvas | tsParticles / R3F | `particle-canvas` |
| Mouse-reveal material | Raycast or UV from pointer | Three/R3F | `webgl` |
| Hybrid pause off-screen | IntersectionObserver pause video/WebGL | native | (perf, always) |

### 10.9 AI-slop risk (background-specific)

| Pattern | Risk | Policy |
|---------|------|--------|
| Default Vanta waves / net / dots | High “template 2019” | Rare; re-skin heavily or skip |
| Purple/pink aurora mesh every hero | High AI SaaS | Special / one SKU family max |
| Unicorn “blob tracking” cliché alone | Medium–high | Pair with strong UI geometry |
| tsParticles defaults | Medium | Custom density + brand colors |
| Busy 3D world behind dense copy | High (illegible) | One object or one field; heavy scrim |
| Video that competes with H1 (fast cuts, bright faces) | High | Slow ambient; scrim; no text in video |
| Live WebGL + autoplay video both full power | High (battery/FPS) | Hybrid: one primary mover |

### 10.10 Deepseek briefing — background block (paste into pipeline)

```text
BACKGROUND SYSTEM (pick ONE primary tier):
A video-background — MS CDN muted loop 8–14s + poster + scrim; OR
B full-screen shader — name recipe (mesh/grain/warp/fluid), 3–4 hex, speed, cursor mode; OR
C R3F one hard idea (single object / scroll scene / mouse-reveal) + perf budget; OR
D particle field with quantified count + interaction; OR
E hybrid video + single FX overlay; OR
F gen-tool bake: Unicorn/21st/Paper → owned video or self-contained code in prompt.

Never stack Magic-UI aurora + particles + video + globe.
Tag honestly: video-background | webgl | 3d-threejs | 3d-spline | particle-canvas.
prefers-reduced-motion → static poster or frozen frame.
All shipped media on MS CDN paths only.
Pair Video Gen Prompt only when tier A or E needs B-roll; for B/C encode uniforms/scene, not Runway.
```

### 10.11 Content-plan fuel (background specials)

| Special idea | Primary tech | Tags |
|--------------|--------------|------|
| Cinematic product B-roll hero | CDN video + scrim | `video-background` |
| Cursor-fluid brand field | Paper / custom GLSL | `webgl` |
| Grain mesh luxury | Paper GrainGradient / mesh | `webgl` |
| One object product film | R3F + drei | `3d-threejs`, `webgl` |
| Scroll museum alcove | R3F + scroll | `3d-threejs`, `scroll-trigger` |
| Particle constellation logo | R3F Points or tsParticles | `particle-canvas` |
| Hybrid live dust over city loop | Video + particles | `video-background`, `particle-canvas` |
| Unicorn-crafted special (owned bake) | Export video or JSON | `webgl` or `video-background` |
| Spline interactive machine | Spline runtime | `3d-spline` |

### 10.12 Technology cheat-sheet for prompts

| Want… | Prefer in prompt |
|-------|------------------|
| Motionsites-beating hero density | Tier A video + original UI chrome (not kit) |
| Alive, no multi-MB download | Tier B Paper / custom shader |
| Buyer can drag / scroll 3D | Tier C R3F (or Spline) |
| Soft ambient only | Tier D sparse particles or CSS noise |
| “Video quality” *and* cursor life | Tier E hybrid |
| Fast internal production of special | Tier F bake → CDN video for gallery; document live stack in sold prompt if interactive |
| Engine truth | Three, R3F, GLSL, Motion, GSAP, native video |
| Avoid as house dependency | Vanta defaults, Magic warp-bg, Unicorn remote embed without ownership |

---

*Research compiled from public docs of Lightswind, Magic UI, tailwind-animations, Motion examples, al-husayn/awesome-ui-resources, Vanta.js, Unicorn Studio, 21st Shader Builder, Paper Shaders, Three.js / R3F, Shadertoy ports, tsParticles, wawa-vfx, Codrops, and 2026 WebGL/Three showcase analyses (e.g. Utsubo). Not an endorsement of shipping third-party kits or remote embeds as MS products.*
