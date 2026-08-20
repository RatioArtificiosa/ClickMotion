# MS Production Process — Beat Motionsites at Scale

**Status:** Operating law for catalog velocity · 2026-08-11  
**Goal:** Close the five Motionsites gaps and ship a library that is **denser, more varied, and more honest** than their free set, faster than copy-paste volume.

**Before any “sale ready” claim:** open **[`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md)** then work **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)**.  
**After every new product post:** tell the operator first pass is finished, ask permission, run **[`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)** (Phase 13).

**Related:** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) · [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) · [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md) · [`CONTENT_PLAN_100.md`](./CONTENT_PLAN_100.md) · [`QUALITY_CHECKLIST.md`](./QUALITY_CHECKLIST.md) · **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)** (complete sale-ready gate) · [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) (product folder + zip + PDF) · **[`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)** · [`MOTIONSITES_COMPETITIVE_DISSECT.md`](./MOTIONSITES_COMPETITIVE_DISSECT.md)

---

## 1. The five gaps → permanent product rules

| # | Motionsites gap | MS permanent rule | Gate (do not publish without) |
|---|-----------------|-------------------|--------------------------------|
| 1 | Assets declared but not packaged | Every SKU ships **prompt + owned media pack** (B-roll, poster; images if needed). Delivery via **MS CDN** after encode. | Pack checklist + `validate:assets` / CMS media fields set |
| 2 | Inconsistent prompt density | **Density floor** + Motionsites-grade concreteness (tokens, classes, copy, motion numbers). Thin = reject. | Architect 10 H2s + scorecard below |
| 3 | No clean-room / visual QA | **Build from prompt only** → screenshot → fix **prompt** → rebuild → only then record | Clean-room pass + visual QA form |
| 4 | Catalog samey / AI-kit look | **Differentiation matrix** + **anti AI-slop visual law** (famous human UI references; no capsule/gradient defaults; Apple not mandatory) | Diff row + named reference direction; authority test |
| 5 | Interaction modes not productized | Every SKU has honest `technicalTags` + recording that **shows** the mode | Mode tag + capture script |

**CDN reminder:** We **use** MS CDN for previews and buyer downloads. We **do not** hotlink competitor buckets.  
**Media vault reminder:** **Client HD** (buyer pack) is immutable after prep. **Storefront** captures are separate files. Copy-out only — see [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md).

---

## 2. North star metrics

| Metric | Target | Why |
|--------|--------|-----|
| Published SKUs that pass full gate | **≥ Motionsites free count (65) with higher floor**, then **100** per content plan | Volume without thin junk |
| Time per video-hero SKU (steady state) | **2–4 hours** wall-clock once pipeline is warm | Velocity |
| Time per section SKU | **1–2 hours** | Sections reuse patterns |
| Time per special / 3D / mouse mode | **4–8 hours** | Halo quality |
| Clean-room first-pass build success | **≥80%** of SKUs need only minor prompt edits | Density quality |
| Interaction mode mix (first 40 heroes) | ≤70% pure video-bg; **≥15% scroll**; **≥10% pointer or 3D/special** | Not one-trick |
| Type/palette uniqueness in batch of 10 | **No 2 heroes share full font pair + near-black + liquid-glass + pill nav** | Anti-samey / anti AI-kit |

Beat Motionsites by **shipped quality density × honest modes × owned packs**, not by racing to 65 empty cards.

---

## 3. Factory line (one SKU)

```text
0. SLOT          Content plan row + differentiation matrix + mode tag
1. PHASE A       Deepseek: concept + dense buyer prompt + video gen (if needed)
2. PHASE B       Deepseek: MS Architect MDX (taxonomy, 10 H2s, paths)
3. MACHINE GATE  validate:prompts (+ assets paths / CMS schema)
4. MEDIA         Generate / source B-roll → encode → lock client; storefront separate
5. CLEAN-ROOM    Build FROM PROMPT ONLY (agent or human, no secret design)
6. VISUAL QA     Screenshot → score → edit PROMPT (not only code) → rebuild if fail
7. PROOF         Muted screen record of signature interaction (page + FS)
8. PRODUCT PACK  Product folder (files/) + zip of folder + package PDF + registries
9. CMS           body, tags, priceTier, previewVideo, thumbnail, poster
10. PUBLISH      First production pass (SHIP_FOR_SALE + checklist Phase 12)
11. PLATINUM     Tell operator first pass done → ask permission →
                 Platinum Second Revision (Phase 13) → fix → PASS
```

**Never skip 5–6 for “looks fine in my head.”** That is how Motionsites ships thin prompts.  
**Never skip 8 for rebuild flagships:** buyers need the **product folder** (all rebuild files) **and** the **zip**.  
**Never skip 11:** after every new product post, **ask** for Platinum Second Revision ([`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)).

### Time budget (video hero, steady state)

| Step | Minutes (target) |
|------|------------------|
| 0 Slot + brief | 10 |
| 1–2 Deepseek A+B | 20–40 |
| 3 Machine gate | 5 |
| 4 Media encode + upload | 20–40 |
| 5 Clean-room build | 30–60 |
| 6 Visual QA + prompt fix loop | 15–45 |
| 7 Record + trim | 15–25 |
| 8 CMS pack | 10 |
| **Total** | **~2–4 h** |

Sections drop media time when CSS/scroll-only. Specials add 3D/mouse capture time.

---

## 4. Gap-by-gap: how the factory enforces it

### Gap 1 — Assets packaged (not only declared)

**Definition of “packaged” for one SKU:**

| File | Required? | Path pattern | Serves | After lock |
|------|-----------|--------------|--------|------------|
| Master | If generated/sourced | `originals/…` | Archive | **Never overwrite** |
| Client HD / B-roll | If `video-background` or design needs it | e.g. `sequence-01.mp4`, `*-web-v1.mp4` | Buyer pack + cleanroom + prompt `videoBackgrounds` | **Immutable** — copy-out only |
| Poster | If video | `/assets/posters/{kebab}-v1.webp` | Instant paint (from client film) | Versioned |
| Storefront proof (page) | Always | CMS `previewVideo` / `*-preview-v1.mp4` | Gallery + product (muted UI capture) | Recapture OK under **preview** names only |
| Storefront proof (fs) | Flagship / when dual preview required | `*-preview-fs-v1.mp4` | Product fullscreen overlay | Same |
| Thumbnail | Always | CMS thumbnail / `/thumbnails/{ID}.webp` | Gallery face | Versioned |
| Extra images | If prompt lists them | `/assets/images/{kebab}-*.webp` | Logos, dashboard, avatars | Versioned |
| Download pack | At commerce launch | **Client HD** (+ posters) on **MS CDN** (signed if gated) | Buyer download — **not** storefront captures | Immutable pack objects |

**Process:**

1. Phase B lists exact filenames in Video / Media + asset inventory (**role per file**: master / client / storefront).  
2. Encode **client HD** per [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) (1080p, no audio). **Lock** that path.  
3. Build cleanroom from prompt using **client HD** (no burnt MS chrome in the film).  
4. Capture **storefront** previews via scripts that write **only** `*-preview*.mp4` (hide `[data-ms-scroll-cue]`). Never ffmpeg `-y` onto client HD.  
5. Upload masters/client/storefront to MS object store with versioned names; CDN immutable cache.  
6. CMS: `videoBackgrounds` / body → **client**; `previewVideo` (+ fs map) → **storefront**.  
7. Publish blocked if `video-background` tagged but no **client** B-roll file, or no **storefront** `previewVideo`.

**Batch trick:** generate **5 video gen prompts in one Deepseek call**, render overnight, encode in one shell script, then attach during clean-room day.

---

### Gap 2 — Prompt density floor

**Minimum (heroes / LPs):**

- All **10** Architect H2s with real content (not “TBD”).  
- Hex/HSL tokens + font pair + weights + tracking.  
- Exact copy strings (eyebrow, H1, sub, CTAs).  
- Motion numbers (duration, ease, delay, scrub if scroll).  
- Video attrs + overlays + path (or explicit “no video”).  
- 5-breakpoint responsive table.  
- Expected Output ≥ 7 testable bullets.  
- Prompt body density: target **≥ ~3.5–4K chars** of real spec for heroes; flagship LPs higher. Thin SkyElite-length only if **every** line is exact (no fluff, no gaps).

**Scorecard (quick reject):**

| Check | Fail |
|-------|------|
| “Premium dark modern” with no hex | Fail |
| “Animate nicely” | Fail |
| No Content Slots table | Fail |
| No reduced-motion | Fail |
| Competitor CDN URL | Fail |
| Liquid glass + Inter + Instrument Serif with no differentiator note | Fail (samey) |

**Velocity:** Deepseek always runs **Phase B** with the Architect system prompt from [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) §6. Raw Phase A never hits CMS.

---

### Gap 3 — Clean-room + visual QA

**Clean-room rule:** Builder (human or agent) may use **only**:

- Buyer product prompt (sold body)  
- Files in the asset pack paths listed in the prompt  

No “remember AETHER was ocean” outside the prompt. If the build needs extra chat, **the prompt is incomplete**.

**Visual QA loop** (see [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md)):

```text
screenshot → score (subject, hierarchy, CTA, palette, motion intent)
  → FAIL: edit buyer prompt (+ video if subject wrong)
  → rebuild clean-room
  → PASS: screen-record for CMS
```

**Do not** fix only local React and leave the sold prompt wrong. Customers buy the prompt.

**Automation to add (priority order):**

1. `scripts/cleanroom-screenshot.mjs` (exists) in the loop for every SKU.  
2. Checklist form in CMS or markdown ticket template (pass/fail + notes).  
3. Optional later: Playwright smoke on clean-room route.

---

### Gap 4 — Catalog not samey

Before Phase A for each SKU, fill a **differentiation matrix** row:

| Field | Example (AETHER) | Example (NEON) |
|-------|------------------|----------------|
| Layout pattern | Centered calm video hero (structured, not pill nav) | Cyber agency / hard geometry |
| Type system | Soft display serif + quiet body | Display mono / neon sans |
| Palette temp | Warm ocean + sea-glass | Cold cyan/magenta on black |
| Material | Minimal mist, modest radii, real UI chrome | Hard edges / selective glow (not capsule stack) |
| Signature move | Still breath + soft CTA | Aggressive stagger / glitch |
| Must not clone | Motionsites liquid-glass **pill** SaaS | Soft wellness |

**Batch rule (10 heroes):**

- Max **2** pure black + liquid-glass  
- Max **2** Instrument Serif italic accent  
- Max **1** pill / capsule navigation as primary nav (prefer **0**; Motionsites overuses this and it reads as AI-kit)  
- Max **1** gradient-mesh / aurora-as-main-background special  
- At least **3** non-black or light heroes  
- At least **3** distinct layout patterns from the **real UI** set: centered editorial, bottom-anchored, split media, compact structured bar (not pill), dashboard-over-video, scroll chapters, etc.  
- At least **4** different **UI reference directions** in a batch of 10 (see PRODUCT_LAW visual quality — Stripe / Linear / editorial / Swiss / industrial / etc.; Apple optional, never hardwired for all)  
- **Do not** use floating pill nav or mesh gradients as house chrome — authority and craft win

Deepseek brief always includes:  
`Differentiator vs existing: {list published heroes to avoid}`

---

### Gap 5 — Interaction modes productized

**Mode catalog (use taxonomy `technicalTags` honestly):**

| Mode code | Tags | Prompt must specify | Capture must show |
|-----------|------|---------------------|-------------------|
| `V` Video | `video-background` | Loop attrs, overlays, path | UI + B-roll playing |
| `S` Scroll | `scroll-trigger`, `parallax`, `text-split` | scrub/ranges **+ pin-until-complete** (virtual progress; no tall multi-vh scrollbar UX) — PRODUCT_LAW | Full pin journey (virtual progress OK) |
| `M` Mouse | `magnetic-cursor` | follow radius, lerp, targets | Cursor wiggle / head follow |
| `3` 3D | `3d-threejs`, `3d-spline`, `webgl` | scene, camera, perf budget | Orbit / idle spin |
| `Q` Marquee | `infinite-marquee` | duration, duplicate array | Continuous scroll band |
| `L` Loader | (section/special) | timing sequence | Full loader → hero |
| `H` Hybrid | combine | which modes stack; **if any leg is scroll narrative → pin-until-complete 100%** | One take proving main mode |

**Scroll narrative pin law (factory — non-negotiable):** Every `S` primary and every hybrid with a scroll-narrative leg ships **pin-until-complete** only. Animation art can stay product-specific; the **method** is always pinned stage + virtual progress + release when done. See [`PRODUCT_LAW.md`](./PRODUCT_LAW.md).

**PSAVE (named film-drive, Elyse gold, live Revel, live Vertex, live Still, live Prism):** when the operator says **PSAVE**, do **not** seek-scrub. Scroll aims on a product earn track; the film plays forward at 1.2x and reverse every 3rd frame; leftover dest keeps going a little on lift; release follows the picture; replacement films need GOP 3 / no B-frames. Canonical: [`PSAVE.md`](./PSAVE.md). Do not roll PSAVE onto Meridian / Folio unless named. Elyse, Revel, Vertex, Still, and Prism are named. Still and Prism dual process = PSAVE + No Scroller.

**Mix quotas (rolling first 40 heroes):**

| Mode | Min share |
|------|-----------|
| V primary | OK majority |
| S as primary or strong secondary | ≥6 of 40 |
| M or 3 as primary | ≥4 of 40 |
| Specials (CONTENT_PLAN) | All 8 specials fill M/3/S/Q halo |

**CMS:** `technicalTags` + one-line `captureNotes` (“scroll 0–100% twice; hover both CTAs”).

---

## 5. Batch production model (how you outrun 65 free SKUs)

Motionsites free set ≈ 65 prompts of uneven quality. MS targets **100** plan items with a higher floor. Velocity comes from **parallel stages**, not skipping gates.

### Weekly factory rhythm (example: 1 operator + Deepseek + agents)

| Day | Focus |
|-----|--------|
| Mon | Slot 8–10 SKUs from content plan; fill differentiation matrix; Deepseek Phase A+B batch |
| Tue | Media day: video gen batch, encode, upload MS CDN, attach paths |
| Wed–Thu | Clean-room builds (agents in parallel for simple V-mode heroes) |
| Fri | Visual QA + prompt fixes + screen records + CMS publish |

**Steady output:** ~6–10 video heroes **or** ~12–15 sections **or** mix per week when process is warm.

### Parallelism rules

| Can parallelize | Must stay serial per SKU |
|-----------------|---------------------------|
| Deepseek A+B for many brands | Clean-room of a SKU after its pack exists |
| Video gen for many B-rolls | Visual QA after that SKU’s build |
| Encode/upload scripts | Publish after QA pass |
| Section variants that share a motion recipe | Specials that need unique capture craft |

### Two product speeds

| Track | What | Gate strictness | Use for |
|-------|------|-----------------|---------|
| **A — Flagship** | Heroes, LPs, specials | Full clean-room + visual QA + multi-pass density | Marketing, pricing, social |
| **B — System** | Sections (features, pricing, FAQ…) | Full Architect MDX + lighter clean-room (compose on fixed hero shell) | Composability, “100 system” |

Sections are how you **pass Motionsites count quickly** without 65 full hero productions. A buyer needs heroes **and** sections; Motionsites free set is mostly hero/LP one-shots.

### Content plan mapping (speed path to “more than them”)

| Milestone | Count | How |
|-----------|-------|-----|
| Batch 0 | 10 heroes | Done lineage (normalize + QA remaining) |
| Sprint to 30 | +10 heroes + 10 sections | SaaS pack (CONTENT_PLAN batch 1) |
| Sprint to 65 | + sections heavy + 4 specials | **Surpass free Motionsites count** with system depth |
| Sprint to 100 | Finish plan | LPs + remaining specials + long-tail categories |

**Strategic note:** Hitting **65 MS SKUs** with packaged assets + QA beats **65 Motionsites free prompts** even before 100. Sections count as real library value.

---

## 6. Roles (who does what)

| Role | Owner | Tools |
|------|-------|--------|
| Slot planner | You / content plan | `CONTENT_PLAN_100.md`, differentiation matrix |
| Prompt architect | Deepseek (+ Muse Architect brief) | `DEEPSEEK_PROMPT_PIPELINE.md` |
| Media producer | You / video AI + ffmpeg | `ASSET_PIPELINE.md`, MS CDN |
| Clean-room builder | Agent or human | Buyer prompt only, local demo route |
| Visual QA | Human eyes + screenshot | `PROMPT_VISUAL_QA_LOOP.md` |
| Publisher | You / admin | CMS `/admin`, muted proof video |

Agents accelerate steps 5 and sometimes 1–2. **Human** owns mode honesty, anti-samey, and final “would I buy this?”

---

## 7. Definition of Done (one catalog item)

Copy of product law, tightened:

1. [ ] Differentiation matrix row filled (anti-samey).  
2. [ ] Mode + `technicalTags` honest.  
3. [ ] Phase B MDX / CMS body passes Architect density + machine validation.  
4. [ ] **Client HD** encoded, locked, referenced in prompt `videoBackgrounds` (or explicit no-video). Masters preserved.  
5. [ ] Clean-room build succeeded from prompt only (uses **client HD**, not storefront capture).  
6. [ ] Visual QA pass (prompt updated if needed).  
7. [ ] **Storefront** muted proof (`*-preview-v1` / fs) shows signature interaction; capture did **not** overwrite client HD.  
8. [ ] CMS: title, body, genre, tools, **previewVideo** (storefront), thumb, poster, status **published**.  
9. [ ] Buyer download path = **client HD** on MS CDN when commerce unlocks (not preview captures).  
10. [ ] Owner vault entry in `src/lib/owner-designs.ts` for flagships (roles labeled).  
11. [ ] **First production pass finished** and operator **told** it is finished.  
12. [ ] **Permission asked** for Platinum Second Revision (*“May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?”*).  
13. [ ] **Platinum Second Revision PASS** ([`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) / checklist Phase 13) — gaps fixed, re-smoked.

---

## 8. Templates (use every SKU)

### 8.1 Slot card (fill before Deepseek)

```text
ID: MS-HERO-XXXX
Name:
Category / subcategory:
Mode: V | S | M | 3 | Q | L | H
Style tags: (avoid liquid-glass / gradient-mesh unless intentional special)
Technical tags:
Intensity:
Layout pattern: (no pill-nav default)
Type system:
Palette temp:
Material: (real product UI; modest radii unless brand needs otherwise; not capsule-everything)
UI reference direction: (famous human craft — e.g. Stripe / Linear / editorial / Swiss / industrial / Apple marketing — rotate; not "AI SaaS")
Nav pattern: structured bar | editorial text | split | other — NOT floating pill rail
Signature move:
Must not look like: Motionsites pill glass + mesh gradient kits; existing MS heroes; generic AI landing pages
Video needed: Y/N — subject one-liner:
Compatible sections (later):
```

### 8.2 Deepseek one-shot (after matrix)

Paste Architect system from pipeline §6 + task template with the slot card fields. Require outputs A–E (description, buyer prompt, video gen, MDX, asset paths).

### 8.3 Capture script (by mode)

```text
V: 12s loop, no cursor, full hero in frame
S: advance pin journey 0→100% in 8–12s (virtual progress; stage stays pinned), pause on key beats
M: 10s mouse figure-eight over magnetic target
3: 10s slow orbit or idle spin
H: 12–15s — establish UI then prove main mode
Mute always. 1280×720+ for preview encode.
```

---

## 9. Tooling backlog that multiplies speed (build when ready)

Ordered by leverage:

1. **CDN + `MS_CDN_BASE` rewrite** for `/assets` and downloads (cost + speed).  
2. **Batch encode script** (folder of masters → v1 mp4 + poster).  
3. **CMS “publish gate” checklist** (blocks publish if no preview / no tags / no mode).  
4. **Clean-room demo routes** pattern (`/demos/cleanroom-{slug}`) reusable.  
5. **Section shell** fixed layout so section clean-room is paste-and-go.  
6. **Differentiation matrix spreadsheet** or CMS fields.  
7. Optional: agent workflow “Phase B → clean-room → screenshot” for Track A heroes.

Do not wait for all tooling. Run the factory manually on the next 5 SKUs to lock the muscle memory.

---

## 10. Immediate next production wave (actionable)

**Wave 1 — Make Batch 0 honest (foundation)**  
- Finish pack + clean-room + visual QA + proof for **AETHER** (strong) and **NEON**.  
- Same gate for remaining 8 heroes that are still thin or CDN-leaky.  
- Result: 10 shippable flagships.

**Wave 2 — Mode expansion (gap 5)**  
- 2 scroll-primary heroes/sections.  
- 1 magnetic-cursor special (CONTENT_PLAN special #6).  
- 1 marquee or loader special.  
- Tags + captures prove modes.

**Wave 3 — Section factory (count + system)**  
- 10 SaaS sections (features, pricing, CTA, FAQ…) reusing density templates.  
- `compatibleWith` links to Batch 0 heroes.  
- Fast path past Motionsites “hero-only” free set.

**Wave 4 — Anti-samey + volume**  
- Agency + fintech heroes with forced type/palette matrix.  
- Publish until **≥65 packaged SKUs**, then push to 100.

---

## 11. What “more than them” means

| | Motionsites free | MS target |
|--|------------------|-----------|
| Count | ~65 | 100 plan; **≥65 high-floor** first milestone |
| Assets | Often missing / foreign CDN | Owned + **MS CDN** download |
| Density | Hit or miss | Architect floor every time |
| Proof | Preview video only | Preview + **clean-room honesty** |
| Variety | Samey house style | Matrix-forced diversity |
| Modes | Mostly video | Productized V/S/M/3/Q/L |

**Win condition:** A buyer can build a full site from MS (heroes + sections + LP), download media from **your** CDN, and trust that the prompt alone regenerates what the muted gallery shows.

---

*Update this file when batch cadence or gates change. Product law and Deepseek pipeline remain the lower-level specs; this file is the factory schedule.*
