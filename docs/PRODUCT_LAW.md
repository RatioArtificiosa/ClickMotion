# MS Product Law (current)

**Status:** Living source of truth · Updated 2026-08-14  
**Supersedes** outdated assumptions in early scaffolding where they conflict.  
**Origin brief** (still mostly correct): Motionsites competitor · prompt library · first 100 · Next.js storefront · master template · taxonomy · quality gates.

The long original Grok scaffolding prompt (Opus handoff → full 11 deliverables) is still the **system design backbone**. What follows is **what we actually do now**, including changes made after scaffolding.

### Taking a product to production / sale (mandatory)

**Do not ship from memory.** Every time a SKU is productized or marked ready for sale:

1. Open **[`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md)** (entry gate + gold standards).  
2. Work **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)** phase by phase.  
3. Deliver **product folder + zip** (rebuild files) and **package PDF** per [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) §10.  
4. Obey vault roles in [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md).  
5. **Platinum Second Revision (critical — every new product post):**  
   - Finish the **first production pass**.  
   - **Tell the operator** you are finished with that pass.  
   - **Ask permission:** *“May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?”*  
   - Only after yes → run **[`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)** / checklist **Phase 13** (gap audit + fix + re-smoke).  
   - Do **not** claim ultra-premium complete on first pass alone.

Gold: **Meridian** PDF · **Studio Sequence** product folder/zip · **Helix** storefront description bar.

---

## 1. Product (unchanged core)

**MS** is a premium alternative to [motionsites.ai](https://motionsites.ai): a curated library of highly engineered **AI coding prompts** + **motion assets** so buyers generate production-ready high-motion websites, heroes, and sections in Cursor, Claude, Codex, Grok Build, Lovable, Bolt, etc.

| We sell | We do **not** sell |
|---------|-------------------|
| The **prompt body** + metadata (type, genre, tools, tier…) | A live interactive sandbox of every design |
| Commercial-friendly catalog + previews | “Iframe of the real site with working buttons” as the product |

### Proof loop (critical change / clarification)

```txt
Deepseek (guided) writes product prompt + paired video-gen prompt
  → human builds the site/section FROM THE PRODUCT PROMPT ONLY
  → human screen-records that build
  → CMS publishes prompt + recording + meta
  → public site shows the recording (always-looping gallery + product page)
```

- **Background B-roll / client HD** = media **inside** the design and in the **buyer pack** (clean film, no MS UI chrome).  
- **Preview on MS** (`previewVideo` / fullscreen / thumbnail / poster) = **screen capture of the real UI** for the storefront only, not “only waves looping.”  
- **Operator screenshot WebM law (scoped):** when the operator delivers a screenshot/Premiere **WebM** for a SKU, that file is **`previewVideo`** for **home, browse/gallery, and the product page main player** — keep **`.webm`**, never re-encode the page role to mp4 (freeze risk). **Fullscreen** may stay **mp4**. Full detail: [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) §1A. Does not force WebM on agent-only captures until an operator WebM is supplied.  
- If you cannot build cleanly from the prompt alone, the prompt is incomplete — revise it.

Deepseek protocol: [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md).  
**Visual QA (see build → fix prompt, not only code):** [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md).  
**Media delivery + vault:** [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md).

### Media vault & immutability (critical — never corrupt client HD)

**Full path map, future naming protocol, grandfather table, registries:** [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) (authoritative for storage detail).

Videos are **role-separated**. One file = one role. After a design is signed off, **client-delivery HD must not be moved, renamed, or edited in place**. Need a denser crop, re-encode, pad, or storefront capture? **Copy out** to `tmp/` or a **new** role path. Leave masters and client locks untouched.

| Role | Purpose | New files live in | After lock |
|------|---------|-------------------|------------|
| **Master** | Highest-quality source | `public/assets/videos/masters/` | **Never overwrite** |
| **Client delivery HD** | Buyer pack + prompt `videoBackgrounds` + cleanroom B-roll | `public/assets/videos/client/` | **Never touch after prep** except intentional new release (new filename) |
| **Storefront page / fs** | Gallery + product player (burnt UI) | `public/assets/videos/storefront/` | Recapture → new storefront file only |
| **Poster / thumb** | Stills | `public/assets/posters/`, `public/thumbnails/` | New file if published change |
| **Work** | Experiments | `tmp/` only | Disposable |

**Future naming (new assets only — do not rename existing files):**

```text
{Product}-{Purpose}-{OpaqueId}[-{PaidSalt}].ext
```

- Example free client: `Aether-client-ab12cd34ef56.mp4`  
- Example **paid** client: `Meridian-client-sd33e234kld9-ds654d.mp4` (final **6-char PaidSalt** only on paid client HD)  
- Storefront page: `…-preview-v1.webm` when operator supplies screenshot WebM; else agent capture may be `…-preview-v1.mp4` until WebM arrives. FS: `…-preview-fs-….mp4` OK — **no** PaidSalt  
- OpaqueId = random letters+digits (not sequential, not guessable from slug)  

**Registries (must always list paths — no hunting):** MDX + CMS + `src/lib/owner-designs.ts` + cleanroom `VIDEO_SRC` + ASSET_PIPELINE §8 table for flagships.

**Hard bans**

1. Do **not** re-encode or overwrite **client** or **master** when building product-page previews.  
2. Do **not** burn MS chrome into **client HD**. Live demos may overlay Scroll in **HTML** only.  
3. Capture scripts write only to **storefront** outputs.  
4. Do **not** rename grandfathered files (`sequence-01.mp4`, `*-web-v1.mp4`, current `*-preview*.mp4`, etc.).  
5. Sold prompt + CMS: **client** path in `videoBackgrounds`; **previewVideo** / fullscreen = storefront only.

**Live demo vs asset pack**

- `/demo/...` cleanroom = interactive design for operators / proof.  
- Buyer pack = **client rebuild media** (film / GLB / stills) + optional **files zip** (source + prompt docs).  
- Product page = **storefront** capture of the full UI (separate file).

### CDN policy (critical clarification)

MS **uses CDN on purpose**. Bandwidth for gallery loops, product previews, and **buyer video downloads** should not hit the Next origin. That is cheaper, faster, and correct ops.

| Allowed / required | Banned |
|--------------------|--------|
| **MS-owned CDN** for all media we serve and sell (Cloudflare R2 + CDN, Supabase Storage + CDN, CloudFront **under our account**, etc.) | Permanent hotlinks to **someone else’s** bucket (e.g. Motionsites `d8j0ntlcm91z4.cloudfront.net/user_…`, random Mux/Unsplash as the product source of truth) |
| Versioned immutable files + long cache headers | Overwriting published filenames |
| Entitled buyers download **our** CDN URLs (signed if needed) for the asset pack | Prompt that only works while a third-party free CDN stays up |
| Canonical paths in repo/CMS: `/assets/…`, `/previews/…` that **resolve or rewrite to CDN** in production | Shipping competitor export URLs inside sold prompts |

**Rule of thumb:** we own the object and the distribution. CDN is the delivery layer, not a dependency on Motionsites’ infrastructure.

Authoring uses relative paths under `/assets/videos/…` (role folders + naming protocol for **new** files; legacy paths stay as registered). Production maps those to the MS CDN base URL so buyers and the storefront both pull from CDN.

---

## 2. What the public site is

### Shell (MS brand only)

- MarkData-style **home intro**: scroll grow → hold → absorb, gallery pull-up, idle auto, header pull-down at end.  
- Header / footer = **MS chrome only** — never part of product designs.  
- Hidden on `/admin` and `?embed=1`.

### Gallery & product pages

- **Gallery cards (home / browse / genre grid):** always-on looping media (prefer `previewVideo`, else thumbnail gif/mp4/still). **Not hover-to-play.** Frame is **16:9 (`aspect-video`)** with **`object-contain`** (black letterbox) so burnt UI is never edge-cropped. Title/meta may use a **slight horizontal inset** on these grids — that is intentional and separate from the product-page side rail.  
- **Product page:** one template (`PromptProductView` in `src/components/product/PromptProductView.tsx`) for every product.  
- Preview is **non-interactive** (`pointer-events-none`). Buttons in the video do not work.  
- **All preview video is muted** (always). Matches Motionsites-class storefronts. No sound on MS.  
- **When operator supplies screenshot WebM:** `previewVideo` for gallery **and** product page **must** be that WebM (same path). Fullscreen = separate file; **mp4 OK**. See ASSET_PIPELINE §1A.  
- Thumbnail = gallery face; poster = product fallback / still for video load; both may be image, gif, or looping video.  
- **Right-click / context menu is blocked** on the public site (product page, fullscreen overlay, gallery, demos, marketing pages) so casual “Save video as…” is harder. Also block drag-start on media and prefer `controlsList="nodownload"` on videos. **Not DRM** — Network/DevTools can still fetch URLs. **`/admin` is excluded** so operators keep normal browser menus.

### Product page layout (template law — locked)

Source component: `PromptProductView`. **Do not freestyle this shell.** If layout must change, update **this section first**, then the component, then any checklist lines.

#### Row structure (`xl+`)

Three columns, left → right:

| Column | Role | Width law |
|--------|------|-----------|
| **1. Main product preview** | In-page storefront capture | Cap **`960px`** wide (`minmax(0, 960px)`). At true 16:9 that is **~960×540**. Treat as **~50% of a 1920-wide window**. |
| **2. Meta / description box** | Title, genre, sales description, likes, CTA, value line, Full screen, tools | **`minmax(280px, 360px)`** on `xl`. On `lg` (no rail): **`minmax(260px, 320px)`**. |
| **3. Related rail** | Same-genre quick recs | **`minmax(16rem, 1fr)`** absorbs leftover width; 2 cards @ 16:9 max **22rem**, **vertically centered**; equal outer page L/R padding. |

On `lg` (no rail): main + meta only. On smaller breakpoints: stack main then meta.

**Hard bans for this row**

1. **Do not shrink the main preview** to make meta or rail wider. Main’s **960px budget is sacred** when the viewport allows it.  
2. **Do not** “fix” leftover viewport by growing main past 960 or by stealing main width for meta/rail. Leftover width on ultra-wide stays free (or after the rail), not taken from column 1.  
3. **Gap main ↔ meta** stays **`lg:gap-3` / `xl:gap-x-3`**. Never collapse that gap to cram meta/rail.  
4. Meta may only use width **to the right of the fixed main budget** (into former blank). Never reverse the intent (main small, meta huge).

#### Main preview frame

- **Display size target:** **~960×540** at 16:9 (not the capture file’s pixel size — see dual previews below).  
- **Aspect:** frame follows video intrinsic ratio (default **16:9** until `videoWidth/videoHeight` loads).  
- **Fit:** **`object-contain`** on a **black** stage so burnt UI is never edge-cropped.  
- Non-interactive, muted, loop, `playsInline`.

#### Meta panel (description box)

- **Height:** on `lg+`, meta height **equals main preview frame height** (ResizeObserver on the main frame → `metaHeight`).  
- Content: short title (+ paid crown), genre line, storefront description, likes, primary CTA, value line, Full screen, tools line.  
- Description length: soft **≤200**, hard **≤230** (`PRODUCT_DESCRIPTION_MAX_CHARS`). Meta panel has room for richer copy.  
- Vertical overflow inside meta scrolls if needed; outer box still matches main height.

#### Related rail (`xl` only — not the row below)

| Rule | Law |
|------|-----|
| **Pool** | `loadRelatedProducts` scores by type (+40), category (+30), shared style tags (+8 each), motion intensity (+5). **Current product excluded.** Not random. |
| **Count** | **Two** related cards when available (`related.slice(0, 2)`). Fewer only if the pool is smaller. |
| **Card size** | **16:9** (`aspect-video`), max **22rem** wide, centered in the rail column. Do not stretch aspect. |
| **Column height** | **Same as meta / main** (`metaHeight`). Rail is not a free-flowing stack shorter than the description box. |
| **Vertical distribution** | **`justify-content: space-between`**: first card **flush top**, second card **flush bottom** of the rail column (absolute top + bottom). |
| **Title / subtitle (rail only)** | Sit **directly under** each thumb, **hard-flush to the left edge of that video** (`p-0`, no gallery-style inset). Subtitle = genre line / type · category. |
| **No repeats** | Rail cards **must not** appear again in the row below. Below = `related.slice(railCount)`. |

#### Related row under the product

- Same scored list as the rail; **starts after the rail** (no duplicates with rail or current product).  
- Multi-column responsive grid; **gallery** `RelatedCard` variant.  
- Styling is **independent** of the side rail. Leave rail flush rules alone when tuning the grid.

#### Browse / home library order

- **Default (Discover):** deterministic daily shuffle — seed `browse:{UTC-date}:{visitorId}` (`src/lib/gallery-order.ts`). Same visitor sees a **stable** deck all day; **new deck every UTC day**; different visitors get different decks (cookie `cm_gallery_vid` via middleware).  
- **Catalog order** sort option: reverse CMS `sortOrder` (no shuffle).  
- Filters apply first; then shuffle/order. Scales when the catalog has thousands of SKUs.

#### Layout constants (keep code ↔ law in sync)

| Token | Value |
|-------|--------|
| Main max width | **960px** |
| Main target height @ 16:9 | **540px** |
| Rail card count | **3** |
| Rail column | **minmax(16rem, 1fr)**; cards max **22rem** @ 16:9, vertically centered |
| Meta xl | **280–360px** |
| Meta lg | **260–320px** |
| Main↔meta gap | **`gap-3` (0.75rem)** |
| Height sync | Meta + rail = main frame height on `lg+` / `xl` |

### Dual product previews + “fullscreen” overlay (all products)

| Asset | Path convention | Role | Mutable after lock? |
|-------|-----------------|------|---------------------|
| **Master** | `/assets/videos/originals/…` (or masters) | Source of truth | **No** |
| **Client HD / B-roll (no UI)** | e.g. `sequence-01.mp4`, `*-web-v1.mp4` | Sold prompt + cleanroom `src`; buyer pack | **No** (copy-out only) |
| **Page preview** | `/assets/videos/{slug}-preview-v1.mp4` | Storefront capture file (~**1600×900** class preferred). **Displayed** on product page at **~960×540** (16:9 contain). | Recapture OK (storefront only) |
| **Fullscreen preview** | `/assets/videos/{slug}-preview-fs-v1.mp4` | 90% glass overlay target **1920×1080** | Recapture OK (storefront only) |
| **Cursor arrow** | `/assets/ui/cursor-arrow.png` | Fullscreen HTML overlay only | Asset file versioned if replaced |

**Display vs capture (do not confuse)**

- **Capture resolution** (file): page ~1600×900 class; FS 1920×1080. Quality/anti-theft.  
- **On-page display size** (layout): main player **~960×540** max. Changing capture resolution must **not** change the layout law above.

**Fullscreen UX (template law — all products):**

1. **Not** browser Fullscreen API. **90% viewport** stage (`~90vw × 90vh`).  
2. **Polymorphic glass** edges: dimmed blurred scrim outside the stage; glass border / inset highlight on the panel.  
3. Video inside the stage is **~90% of the glass panel** (`object-contain`).  
4. Close via **X (upper right of stage)**, **click outside** (glass scrim), or **Escape**.  
5. Target authoring size for FS captures: **1920×1080**. Smaller/larger sources still use the same chrome rules.

**Scroll-as-narrative products** (`MS-HERO-MERI01`, `MS-HERO-VERT01`, Folio, and any future scroll-scrub / scroll-pivot / hybrid-with-scroll SKU):

- Show a **Scroll** experience badge on **product page** preview and fullscreen so buyers know it is a **scroll experience**, not a flat loop.  
- Badge + cursor arrow are **HTML overlays only** on the product template (and may appear on live demos as UI).  
- **Never burn** the Scroll cue into **client HD** or into storefront capture MP4s (avoids double-badge flash). Capture scripts hide `[data-ms-scroll-cue]`.  
- Live demos may still show the cue over **unmodified** B-roll — do not confuse demo HTML with “SCROLL painted into the client video.”  
- **Must obey the Scroll narrative pin law below (100% of the time).**

### Scroll narrative pin law (mandatory — 100%)

**Canonical short name:** **Pin-until-complete** (operator: **No Scroller**)  
**Dual process:** **PSAVE + No Scroller** = Perfect Scroll Video Engine on a pin-until-complete stage. Scroll aims the film. The page does not physically scroll during the journey. See [`PSAVE.md`](./PSAVE.md) §4.  
**Applies to every hero, section, landing page, and special** whose signature includes **scroll-as-narrative**, **scroll-scrub / scroll-advance / scroll-pivot multi-scene**, or a **hybrid that includes a scroll-narrative leg**.  
**Does not apply** to pure free-play video heroes with only soft film parallax, pure mouse-follow, pure marquee, or pure 3D orbit with **no** scroll-chapter journey.

| Rule | Requirement |
|------|-------------|
| **1. Pin the stage** | While the narrative runs, the product stage is **pinned to the viewport** (one fixed frame). Not a long multi-hundred-vh document the user “goes down.” |
| **2. No traditional scrollbar UX** | No page scrollbar thumb traveling a tall track as the *method* of the product. Cleanroom demos that are only this product: **one page**, no long-page scroll. |
| **3. Gesture → virtual progress** | Wheel / trackpad / touch (and optional keys) advance **virtual progress** (0→1) or scene-to-scene progress. **Animation art stays the same** (same rotateX arcs, plateaus, handoffs, scrubs of UI/film **as the product defines**). Only the **drive method** changes. |
| **4. Client site embed** | On a buyer’s website the section **pins when it enters**, consumes scroll input for the journey, then **releases the pin when the animation is complete** so normal page scroll continues below. |
| **4a. Pin freeing (page owns until dock)** | After release at **g = 1 + down**, the **page** owns wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Scrolling up in the next section must move the **page**, not rewind the journey. Pointer on the next sibling never drives the product. Do not keep the pin armed after release. Gold: Elyse / Still / Vertex / Prism `pageOwns` + `pinDocked()`. Mirage, Folio, Helix, Studio Sequence, Lineup, Actually!, and Roadster (No Scroller) use the same rule (2026-08-16). |
| **5. Cleanroom / MS demo** | Demo page is the pinned experience for the whole journey (nowhere else to go until complete, or single-page product demo). |
| **6. Sold prompt + package** | Buyer prompt, cleanroom source, and product-folder source must specify **pin-until-complete / virtual progress**, not “tall sticky track over multi-vh spacer” as the default method. |
| **7. Reduced motion** | `prefers-reduced-motion` still gets a static or reduced path. Pin law does not force motion. |
| **8. Storefront capture** | Still record the full signature journey for `previewVideo` / FS. Capture scripts may drive **virtual progress** (not only `window.scrollTo` on a fake tall page). Hide scroll cue badges when burning. |

**Hard ban:** Shipping any new scroll-narrative or hybrid-with-scroll SKU that relies on **traditional long-page document scroll** (tall track + sticky stage as the only method) after this law.  
**Hard ban:** Claiming “scroll experience” while the page physically scrolls away from a fixed narrative stage before the journey ends.  
**Legacy debt:** Older SKUs still on tall sticky tracks (peers not yet migrated) must be **migrated to pin-until-complete** when next touched for production polish, platinum, or demo cleanup — do not copy the old method into new products. **Folio (MS-SEC-FOLI01), Meridian (MS-HERO-MERI01, gold scroll native), Vertex (MS-HERO-VERT01), Revel (MS-HERO-REVL01), Elyse (MS-HERO-ELYS01), Still (MS-HERO-STIL01), Prism (MS-HERO-PRSM01), Helix (MS-SEC-HELI01), Mirage (MS-HERO-MIRA01), Studio Sequence (MS-SEC-STUDIO01), Lineup (MS-SEC-LINE01), Actually! (MS-HERO-ACTU01), Roadster (MS-HERO-ROAD01), Grok Bot (MS-HERO-GROK01), and SkySpires (MS-HERO-SKYS01) are migrated** (2026-08-16). **Mirage is No Scroller only** (free-play desert film + card pivot; earn `5 × 1.55` vh; **pin freeing** = page owns until dock). Do not add PSAVE to Mirage. **Studio Sequence is No Scroller only** (free-play billboard film + camera pull-out; earn **4 vh desktop / 3 mobile**; **pin freeing** = page owns until dock). Do not add PSAVE to Studio. Film never seeks. **Lineup is No Scroller only** (3D SKU snap; earn **N viewports**; **pin freeing** = page owns until dock). Do not add PSAVE to Lineup. gsap tweens only; no ScrollTrigger pin. **Actually! is No Scroller only** (pointer window + 3D grab + formula reveal; earn **1.2 vh**; **pin freeing** = page owns until dock). Do not add PSAVE to Actually. **Roadster is No Scroller only** (loop film + enter-hold-exit cards + pull-up sheet + Y-spin GLB; earn **13.3 vh**; **pin freeing** = page owns until dock). Do not add PSAVE to Roadster. Film never seeks. No gsap. Meridian gold pace remains seek-scrub: virtual effort **3.2 viewports**, scrub lag **0.45**, wheel gain **0.22**. **Elyse, live Revel, live Vertex, live Still, live Prism, live Grok Bot, and live SkySpires are PSAVE** (Perfect Scroll Video Engine). Canonical: [`PSAVE.md`](./PSAVE.md). Elyse aim **3.6** vh leftover dest. Vertex aim **3.6** vh + 0.55s dest floor + rate ease (even asteroid approach; no footer band). Revel aim **12** vh + 0.55s dest floor + rate ease (film is slow then a kick; halfway takes ~5–6 scrolls). Still aim **12** vh + 0.55s dest floor + rate ease (30s even cosmos; two flicks must not dump dest). Prism aim **12** vh + 0.55s dest floor + rate ease (47.63s even faces; two flicks must not dump dest). Grok Bot aim **12** vh + 0.55s dest floor + rate ease (62.52s even Sphere; two flicks must not dump dest; 25fps). Dual process on Still, Prism, and Grok Bot = **PSAVE + No Scroller**. Play at **1.2x** forward (native `play()`) **and reverse** (live video, **exactly one 3-frame step per seek**, never `currentTime = dest`). Lift is leftover dest (friction, then a graceful stop). Copy / bar / release follow the **picture**. After the last frame the **page** owns the next sibling until the stage docks. Client film is **GOP 3 / no B-frames**. Do not copy old Vertex / old Revel / old Still seek-scrub, hybrid Option A, or old Prism 520vh GSAP onto a PSAVE SKU. Do not roll PSAVE onto other SKUs unless the operator names PSAVE. Method only; do not restyle motion volume.

### PSAVE — Perfect Scroll Video Engine (Elyse gold; Revel second; Vertex third; Still fourth; Prism fifth; named method)

**Canonical:** [`PSAVE.md`](./PSAVE.md) (do not summarize from memory when implementing).

| Law | Requirement |
|-----|-------------|
| Two clocks | Gestures write a **destination**. The **playhead** is whatever the decoded picture is showing. |
| Aim | Product earn track, raw 1:1. Elyse **3.6**. Vertex **3.6** (even film + coast). Revel **12** (kick). Still **12** (30s even). Prism **12** (47.63s even). No wheel gain, no swipe cap, no GSAP lag. Size to the story beat, not film-seconds. |
| Forward | Muted `play()` at `playbackRate 1.2`. Ease over last leftover dest if dest dies (Vertex / Revel / Still / Prism 0.55s). |
| Lift | Leftover dest keeps going a little. Ignore tiny opposite ticks. Vertex + Revel + Still + Prism: dest floor 0.55s. Never pause on the last wheel tick. |
| Reverse | Live `<video>` only. Subtract `3/24s` per seek. Start during the gesture. Never seek to the stop point. |
| Release | Picture at `0+up` or `1+down` only. Then page-owns until the pin docks. Pointer on the next sibling never drives the film. |
| Film | H.264 **GOP 3**, **no B-frames**. A one-I-frame file will stall mid-reverse. |
| Opening | Do not use a mid-film still as the HTML poster unless it **is** frame 0. |

**Hard ban:** calling old Vertex / old Revel / Meridian seek-scrub / old Still hybrid / old Prism 520vh “PSAVE.” Live Elyse, live Revel, live Vertex, live Still, and live Prism are PSAVE.  
**Hard ban:** shipping PSAVE reverse on a long-GOP / B-frame encode.

**Meta panel copy (all products):**

- Value line under primary CTA (exact): **`· Auto Customization Guide · HD Video Background ·`**  
- **Paid** crown: **superscript** at the **upper-right of the last letter** of the product short title (not a free-floating pill to the side). Gallery cards may still use corner crown on the thumb.  
- Free: “Copy full prompt”; paid: “Unlock full prompt” → pricing (entitlement vault still separate work).  
- **Storefront description** (sales, not technical) — **quality bar locked 2026-08-10:**  
  - Soft target **≤200 characters** · hard cap **230** (`PRODUCT_DESCRIPTION_MAX_CHARS`) — more room in the meta panel  
  - **Ultra-premium buyer voice** (Helix / MS-SEC-HELI01 is the gold standard — match this bar for every product from now on):  
    - Lead with **what the visitor experiences** and **what the buyer gains**, not implementation inventory  
    - Beautiful, calm, specific craft language (spatial, intentional, private viewing, authority)  
    - Prefer **customization / brand ownership** (“your work”, “shaped to your brand”) over absences (“no background film”, “no X”)  
    - Benefits implied through desire and outcome, not hype clichés (“wow”, “stunning”, “next-level”)  
  - **Banned in public description:** GSAP / ScrollTrigger / Three.js laundry lists; scaffold notes; em dash (`—` / `–`); negative-only framing when a positive reframe exists  
  - Lives in MDX `description` + CMS `description`; shown under genre line in the meta panel  
  - **Reference line:** *“A spatial mid-page gallery where your work rides a 3D helix as titles cross the stage. Fully customizable cards, copy, and color so it feels made for your brand.”*

**Likes / social proof:**

- Baseline likes are **250–999** (stable hash or CMS seed) — never start at 0.  
- Heart is interactive: optimistic UI + `localStorage` per product + `POST /api/products/[id]/like` to persist CMS count. Floor remains 250 on unlike.

### Owner design vault (internal — not client-facing)

- **Admin → Original designs** (`/admin/designs`) — ultra-organized vault: live demo, **client B-roll**, page/FS **storefront** previews, repo paths (cleanroom component + MDX).  
- Registry: `src/lib/owner-designs.ts` (add every flagship here when shipped; label each media path by role; `packagePdf` when ready).  
- Clean-room code: `cleanroom/{name}/`. Sold prompt: `content/prompts/heroes/*.mdx` + `data/cms/store.json`.  
- Vault is for **operators** to reopen the original design without risking client HD.

### Product Package (client delivery — PDF + files zip)

**Full protocol (PDF structure + files zip law):** [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) — especially **§10 Files zip protocol**.  
**Naming / vault roles:** [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md).  
**Publish gate boxes:** [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) Phase 8.

Two complementary buyer deliverables (do not collapse them):

| Deliverable | Role | Naming (new files) |
|-------------|------|--------------------|
| **Files zip** | Primary rebuild pack when the product is cleanroom/source-based | `{Product}-files-{OpaqueId}[-{PaidSalt}].zip` |
| **Product Package PDF** | Buyer manual (per-tool prompts, customize, video map) | `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf` |

**Rules operators must not forget:**

1. **Get Full Prompt** (product CTA label stays locked) hits `GET /api/packages/{productId}/download`.  
2. **Zip preferred:** if `filesZipHref` + `checklist.filesZip` → serve zip; else PDF if registered.  
3. **PaidSalt** (6 alnum) on paid PDF **and** paid files zip; **never** on storefront previews. Same OpaqueId family for one SKU’s PDF + zip when possible.  
4. **Product folder** at `public/packages/{productId}/files/` with root-level `START-HERE.md`, `PROMPT.md`, `CUSTOMIZATION.md`, `source/`, `assets/` — every file needed to build the end product with AI. **Plus** a zip of that same folder. Zip **contents of `files/`**, not a nested `files/` wrapper.  
5. Allowlist: client rebuild media + production source + buyer docs. **Ban:** storefront `*-preview*`, thumbs, CMS/MDX/admin, lab leaks.  
6. Gold structure: **Studio Sequence** product folder + zip (`MS-SEC-STUDIO01`). Gold PDF layout: **Meridian**.  
7. Register both in `src/lib/product-packages.ts`. Admin: **`/admin/packages`**.  
8. Publish still requires Admin **Preview media** (storefront preview + thumbnail + poster), separate from client HD and from the zip.

PDF still includes: asset map, per-AI-tool build instructions, customization slots, optional AI video-recreation prompt. Brand: **ClickMotion** · www.ClickMotion.dev · no em dashes.

### Interaction modes (what the *product* can be — not what MS plays live)

Motionsites-class catalogs are **not** “video hero only.” Products vary. MS must sell prompts for all of these; the **storefront still shows a muted capture** of the built result.

| Mode (sold prompt builds this) | Typical tech tags | What buyer gets when they paste prompt | What MS site shows |
|--------------------------------|-------------------|----------------------------------------|--------------------|
| **Video hero** | `video-background` | Full-bleed muted loop + UI chrome | Muted loop capture / bg |
| **Scroll-scrub / scroll-advance / scroll-pivot** | `scroll-trigger`, `parallax` | Timeline advances via **pin-until-complete** (virtual progress while section is pinned; releases after journey) — **not** tall multi-vh page scroll as the product UX | Muted **recording** of the full pin journey (or loop of best beats) |
| **3D / WebGL** | `3d-threejs`, `3d-spline`, `webgl` | Interactive 3D in their build | Muted capture of the 3D scene moving |
| **Pointer / magnetic follow** | `magnetic-cursor` (e.g. robot head tracks mouse) | Real pointer-driven motion in their build | Muted capture showing follow behavior (wiggle mouse while recording) |
| **Hybrid** | combine tags | e.g. video + scroll + 3D; **if any leg is scroll narrative → pin-until-complete 100%** | One recording that proves the hero’s signature move |
| **Shader / particle / gen-baked bg** | `webgl`, `particle-canvas`, or bake to `video-background` | Live WebGL or owned CDN loop in buyer build | Muted capture of the living field (cursor wiggle if interactive) |

**Background craft map:** video-class, interactive, and hybrid systems (Paper Shaders, R3F, Unicorn/21st bake, CDN video specs) → [`UI_ANIMATION_RESOURCES.md` §10](./UI_ANIMATION_RESOURCES.md).

**Safe margins (no clipped type):** All hero/chrome copy must sit inside a **safe inset** - never flush to the viewport edge. Minimum horizontal padding **`px-8` / `2rem`** (prefer `md:px-14`+). Large display type uses `min-w-0`, `break-words`, and slightly smaller clamps. Storefront gallery + product use **`object-contain`** (no edge crop of burnt UI), but **capture framing** still needs safe insets so type is not tight to the frame edge. Critical lockups live in the center ~84% of the frame.

**Rules:**

1. **Mute everywhere** on MS previews (gallery + product page).  
2. **Do not** ship a live interactive sandbox per SKU on MS for V1 (cost, security, consistency).  
3. **Do** encode the interaction in the **prompt** (exact pointer/scroll/3D specs) so the buyer’s Cursor build *is* interactive.  
4. **Do** screen-record in a way that *shows* the signature behavior (advance the pin journey, move the mouse for head-follow, orbit the 3D).  
5. Taxonomy already supports this via `technicalTags` + `motionIntensity` — use them honestly on every product.  
6. V1 catalog can overweight **video heroes**; specials / aggressive / extreme should deliberately include scroll, 3D, and pointer-follow so we are not a one-trick library.  
7. **Scroll narrative / hybrid-with-scroll:** always **pin-until-complete** (see law above) — 100% of new and polished SKUs.

### Freedom of form (what standards do *not* freeze)

Standards lock **quality, honesty, and packaging** — not a single product shape. The system is built to ship **anything** we can express as:

- a dense buyer prompt (with quantified behavior),
- owned assets when needed (MS CDN),
- honest tags,
- a muted proof capture of the signature behavior.

| Already first-class | How |
|---------------------|-----|
| **Heroes** | `type: hero` · `MS-HERO-*` |
| **Individual sections** | `type: section` · `MS-SEC-*` |
| **Multi-section websites / LPs** | `type: landing-page` · `MS-LP-*` |
| **Experimental showpieces** | `type: special` · `MS-SPC-*` |
| **Video heroes** | `video-background` |
| **Scroll / parallax / text-split** | `scroll-trigger`, `parallax`, `text-split`, … |
| **3D / WebGL / Spline** | `3d-threejs`, `3d-spline`, `webgl` · intensity often `extreme` |
| **Mouse / magnetic / pointer** | `magnetic-cursor` (and related motion specs in the body) |
| **Particles, Lottie, SVG, marquee, loaders, break-apart, etc.** | Existing technical tags + specials in content plan |
| **Hybrids** | Combine tags; one capture that proves the main signature |

**Described later or not yet invented:** allowed. When a new interaction or medium appears (new Web API, new motion library, new capture style):

1. Encode it fully in the **prompt** (numbers, events, performance budget).  
2. Add a **technical tag** (and style tag if needed) in `src/config/taxonomy.ts` + `docs/TAXONOMY.md` if none fits — do not fake an old tag.  
3. Capture a muted recording that **shows** the behavior.  
4. Run the same gates: density, anti AI-slop authority, clean-room, visual QA, MS CDN assets.

What stays **non-negotiable** for every form (old or new): no uncontrolled third-party media as permanent deps; no AI-kit chrome as house style; prompt completeness (build-from-prompt); honest tags; muted storefront proof. What is **free**: subject, layout, reference UI direction, mode, stack extras (Three, GSAP ScrollTrigger, canvas, Spline, etc.) as the product requires.

### CMS-first catalog

- **Admin CMS** (`/admin`) is the operational source for products, genres, collections.  
- File store: `data/cms/store.json` (local-first). MDX under `content/prompts/` remains seed/source material.  
- Once CMS is seeded, public loaders treat CMS as **authoritative** (empty published set ≠ resurrect MDX).  
- Public routes that read CMS: `force-dynamic`.

---

## 3. Prompt library system (scaffolding — still true)

| Piece | Location | Notes |
|-------|----------|--------|
| Master template | `content/prompts/_template.md` | Full body sections |
| Short template | `content/prompts/_template-short.md` | Simpler sections |
| Hero MDX batch | `content/prompts/heroes/MS-HERO-*.mdx` | First 10 heroes |
| Taxonomy | `src/config/taxonomy.ts` + `docs/TAXONOMY.md` | Do not invent tags |
| Content plan 100 | `docs/CONTENT_PLAN_100.md` | Heroes / sections / LPs / specials mix |
| Quality gate | `docs/QUALITY_CHECKLIST.md` | 40-point prompt scorecard |
| **Ship entry gate** | `docs/SHIP_FOR_SALE.md` | Open first when taking any SKU to production/sale |
| **Full publish gate** | `docs/PRODUCTION_READY_CHECKLIST.md` | Ultra-thorough production + package + vault checklist (use this for sale readiness) |
| Asset pipeline | `docs/ASSET_PIPELINE.md` | Owned paths, size budgets |
| Full scaffolding doc | `docs/SCAFFOLDING.md` | Original 11-part system design |

### Body sections (shipped prompt structure)

Design System · Layout Structure · Content Slots · Motion Specification · Video / Media Integration · Responsive Behavior · Accessibility · Performance Notes · AI Tool Instructions · Expected Output  

### Stack for *sold* prompts (buyer-facing)

Next / React / Tailwind / Framer Motion / GSAP as needed · single component preference · quantified motion · **MS CDN for media delivery / buyer downloads** · no **uncontrolled third-party** video hotlinks as permanent prompt deps · no “apply MS shell to this design.”

### Tooling list (change)

Prioritize: **Cursor · Claude · Codex · Grok Build · Lovable · Bolt**.  
**v0 is not a required public tool** in MS marketing copy (scaffolding mentioned v0; product copy dropped it).

### Copy rules (change)

- **Never use em dash (—)** in public-facing copy (user-defined AI-slop ban). Use ` - ` or rephrase.  
- Titles/short titles split on unicode dashes or hyphen for display.

### Visual quality law (anti AI-slop UI)

Humans can tell when a site was generated from the default AI kit. That look **kills authority**. MS shell and sold product prompts must read as **real product UI** designed by a tasteful human team — not as “prompt → generic SaaS.”

**Apple is not hardwired.** The storefront used Apple-inspired restraint as *one* path out of capsules/gradients. Catalog SKUs should **imitate famously great UI** appropriate to the brand — different references for different products — never one corporate skin for everything.

| Prefer (authority) | Avoid as default (reads as AI-made) |
|--------------------|-------------------------------------|
| Lessons from **famous real products** (see reference pool below) | Motionsites-style **pill nav + glass + mesh** kit on every card |
| Structured nav, clear hierarchy, intentional radii | Floating **capsule / pill** link rails as the hero identity |
| Type and layout with a point of view | Stacked pills, chips, badges with no structure |
| Restraint or boldness that feels **authored** | **Mesh / aurora / rainbow gradients** as the whole brand |
| Video/photo as craft with careful overlays | Gradient blobs + glass pills as the design system |
| Distinct geometry per brand | Same chrome, only the background video swapped |

**Reference pool (imitate craft, never copy trademarks/IP):**

Pick **one primary** reference direction per SKU and name it in the Deepseek brief / Design System one-liner. Rotate across the catalog.

| Direction | What to steal (craft only) | Example brands / products (inspiration, not clones) |
|-----------|----------------------------|-----------------------------------------------------|
| Consumer hardware restraint | Hierarchy, type scale, negative space, materials | Apple.com marketing pages |
| Product / ops software | Dense clarity, tables, quiet chrome, precise spacing | Linear, Notion, Height |
| Payments / trust | Calm confidence, typography, proof, no gimmicks | Stripe |
| Creative tools | Dark precision, tool-like UI, sharp focus | Figma, Framer marketing |
| Editorial / fashion | Asymmetry, large type, photography, print sensibility | High-end magazine / brand sites (SSENSE-class editorial, not templates) |
| Swiss / modernist | Grid, restraint, type-led | Classic modernist product pages |
| Industrial / brutal | Hard edges, mono, sparse | Security / infra brands done well |
| Playful consumer | Color with discipline (not mesh chaos) | Carefully chosen consumer apps — still human, not blob gradients |

**Rules:**

1. **MS site chrome** — keep current high-craft direction (no capsule-first UI; see `badge.tsx`). Do not regress into Motionsites pill kits. Apple-inspired tokens are fine for *this* shell; they are **not** a mandate for every sold prompt.  
2. **Sold prompts** — each SKU names a **reference direction** (from the pool or an equally famous human-designed site). Deepseek must not default every SKU to “liquid glass pill nav + gradient mesh.”  
3. **Taxonomy** `liquid-glass`, `gradient-mesh`, `aurora` remain **optional** for rare intentional specials — not the catalog default. Prefer volume in `minimal`, `editorial`, `corporate`, `luxury`, `organic`, `brutalist`.  
4. **Authority test** — if a sharp human says “this looks AI-generated,” it **fails** even if Zod passes. Fix layout, type, chrome, and materials — not only the video.  
5. **Originality** — different reference + type + palette + layout + mode. Never the same AI kit with a new B-roll.

---

## 4. Architecture that exists now (beyond original scaffold)

| System | Status |
|--------|--------|
| Next 15 marketing site | Live |
| Home MarkData intro | Live |
| Browse + product template | Live |
| Collections pages | Live (CMS-backed) |
| Stripe checkout routes | Scaffolded |
| Supabase client + migrations | Scaffolded; gallery can fall back without it |
| **Admin CMS** (auth, CRUD, reorder, upload, seed) | Live — **not in original Grok scaffold** |
| File CMS + seed from MDX | Live |
| Manifest / validate scripts | Present |
| Multi-instance shared DB for CMS | Residual (see `RESIDUAL_BACKLOG.md`) |

Original scaffold assumed more “MDX + Supabase as only catalog.”  
**Current law:** CMS store first for public catalog; MDX for authoring/seed; Supabase optional until production multi-node.

---

## 5. First 100 plan (unchanged intent)

| Type | Count |
|------|------|
| Heroes | 40 |
| Sections | 40 |
| Mini landing pages | 12 |
| Specials | 8 |

Production order still: **ship heroes that sell the fantasy first**, then modular sections that attach ROI, then LPs/specials.  
**Batch 0 done:** 10 heroes (NEON → NEXUS lineage). Expand via Deepseek pipeline + build/record/CMS.

---

## 6. Pricing / licensing (scaffolding intent — not fully productized)

Scaffold still recommends Free → Starter → Pro → Lifetime → Agency.  
Checkout/webhooks exist; full membership unlock UX and gated download delivery are **not** finished product law until launched.  
Legal drafts in `legal/`. Attorney review before public commercial claims.

---

## 7. What “done” means for one catalog item

1. Prompt passes template + quality checklist (or CMS body equivalent).  
2. Built **from prompt only** into a real page/section.  
3. Screen recording + thumbnail/poster in CMS.  
4. Genre, tools, status published.  
5. Visible on home/browse/product with always-on loop preview.  
6. Buyer can receive the full package via **Get Full Prompt** (files zip preferred when registered, else PDF) per free/paid entitlements.  
7. Rebuild flagships: files zip + package PDF both registered; staging tree kept under `public/packages/{id}/files/`.  
8. **Platinum Second Revision PASS** after first production post ([`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)) — agent asked permission; gaps fixed; ultra-premium bar cleared.

---

## 8. Document map

| Doc | Role |
|-----|------|
| **This file** | Current product law / deltas |
| **`SHIP_FOR_SALE.md`** | **Mandatory entry when shipping for sale** + gold map |
| **`PLATINUM_SECOND_REVISION.md`** | **Mandatory post-ship second revision** (ask permission → audit → fix) |
| `SCAFFOLDING.md` | Original full system design (11 sections) |
| `DEEPSEEK_PROMPT_PIPELINE.md` | How prompts are authored |
| `PRODUCTION_PROCESS.md` | Factory line: close Motionsites gaps + scale past 65 |
| Visual quality law (this file §3) | Anti AI-slop: famous human UI references; no pill/gradient kits; Apple not hardwired |
| `PRODUCT_PACKAGE.md` | Client package **PDF + product folder + files zip** (**§10**) |
| `ASSET_PIPELINE.md` | Media roles, naming, PaidSalt, package path layout |
| `PRODUCTION_READY_CHECKLIST.md` | Sale-ready gate (includes product folder + zip + **Phase 13**) |
| `UI_ANIMATION_RESOURCES.md` | Free motion/hover kits map (Magic UI, Lightswind, Motion.dev, etc.) — steal mechanics, not skins |
| `CMS_ADMIN.md` | Admin ops |
| `RESIDUAL_BACKLOG.md` | Open engineering debt |
| `HANDOFF.md` | Implementation handoff (partially historical) |

When scaffolding and this file disagree, **this file wins** until scaffolding is rewritten.

---

## 9. Original brief — still correct

- Competitor to Motionsites  
- Premium engineered prompts + motion assets  
- Taxonomy, master template, quality checklist  
- First 100 content plan  
- Next.js gallery storefront  
- Asset pipeline, licensing, handoff discipline  
- Ultra-premium craft + conversion focus  

## 10. Original brief — updated by practice

| Original assumption | Current practice |
|---------------------|------------------|
| MDX/manifest primary public catalog | **CMS-first** after seed |
| Preview could be live demo / iframe | **Screen recording only**, non-interactive |
| Hover to play gallery video | **Always loop** |
| v0 in tool set | Dropped from public tool line |
| Em dashes in titles OK | **Banned** in public copy |
| Admin not specified | Full **CMS admin** |
| Home = simple gallery | **MarkData scroll intro** + gallery |
| Liquid glass as MS brand default | Liquid glass only **inside** product prompts that need it; MS shell is separate |
| Build optional | **Must build from prompt** to prove + film |
| Product page “flexible” media column | **Locked shell:** main **~960×540**, meta height-matched, **2-card** rail with space-between + flush titles; genre gallery below independent |
| Related rail = loose cards / empty void | **Exactly 2** 16:9 cards (when pool allows), column fills leftover (**1fr**), cards max 22rem centered V+H in column |
| Page preview “is” 1600×900 on screen | Capture may be **1600×900 class**; **display** is **~960×540** contain |
| Free browser context menu on previews | **Block right-click** on public site + media drag; friction only, not DRM; admin exempt |
| Flat interchangeable MP4s / predictable names | **Role folders** + **Product-Purpose-OpaqueId[-PaidSalt]** for new files; client immutable after prep; registries mandatory; legacy names grandfathered |

---

*Update this file whenever product law changes. Do not leave new rules only in chat.*
