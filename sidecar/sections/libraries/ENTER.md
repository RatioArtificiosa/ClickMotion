# Enter recipes (factory)

Support motion only. One enter per section, once on view, then the signature (pin, accordion, takeover, hover) owns the board.

**Catalog:** `enter-recipes.json` (56 recipes: 6 in use + 50 ready).  
**Runtime:** `cleanroom/_ms-section-enter/`  
**Temperaments:** elegant · aggressive · rebellion · fun

Drop, slap, and stomp are three landings. They are not the set. Pick by language and kind. Do not stack three enters. Do not print how-to on the board. Reduced motion: rest immediately.

---

## Already on the gold boards

| id | Temperament | Board |
|----|-------------|--------|
| `stamp-settle` | elegant | Ledger |
| `click-in` | aggressive | Docket |
| `drop-drape` | elegant | Witness |
| `stomp-in` | aggressive | (ready) |
| `slap-in` | rebellion | (ready) |
| `pop-in` | fun | (ready) |

---

## 50 more (investigated, numbered, ready to cite)

Craft sources (inspiration, not clones): IBM motion choreography (sequence, not diagonal paths), editorial masked line rise, clip-path wipes, iris/curtain covers, letterpress and bindery, fashion hang and drape, desk tick and settle. Original recipes. Not Magic UI names.

### Print / paper (elegant or aggressive)

| id | Feel | Method |
|----|------|--------|
| `letterpress-crush` | Plate kisses the page, then rests | scale 1.06 → 1 |
| `paper-slide` | Sheet arrives from the side | x |
| `sheet-feed` | Fed from above, clipped | yPercent + clip |
| `corner-fold` | Page corner drops into plane | rotateX |
| `ink-bleed` | Wet ink comes into focus | blur → 0 |
| `rule-draw` | Hairline writes left to right | scaleX origin left |
| `crop-reveal` | Crop marks open to full frame | inset clip |
| `bindery-clamp` | Pressed in from the head | scaleY origin top |
| `typeset-rise` | Line rises from a mask (editorial gold) | yPercent + overflow hidden |
| `kerning-settle` | Tracking tightens to rest | letter-spacing |
| `baseline-lock` | Tiny rise, almost a cut | y 8, 180ms |
| `rubber-stamp` | Pad hits, slight rotate | scale + rotate |

### Theatre / film (elegant or cinematic)

| id | Feel | Method |
|----|------|--------|
| `iris-open` | Aperture opens on the stage | circle clip |
| `wipe-left` | Frame wipes in from the left | inset clip |
| `wipe-up` | Frame wipes up from the floor | inset clip |
| `blinds-cascade` | Horizontal slats, staggered children | scaleY bands |
| `hard-cut` | Instant appear, no fade | 1ms opacity |
| `fade-hold` | Slow opacity, no travel | 1200ms |
| `match-cut` | Already there, camera eases in | scale 1.08 → 1 |
| `blackout-lift` | Lights up, no move | opacity 480ms |
| `aperture-stop` | Stops down onto the type | scale 0.92 → 1 |
| `curtain-part` | Center parts to the wings | inset 50% → 0 |

### Fashion / cloth (elegant)

| id | Feel | Method |
|----|------|--------|
| `pin-drop` | Hung, then dropped onto the mark | y 48 + tiny rotate |
| `unfold-panel` | Panel unfolds toward you | rotateX origin top |
| `hem-lift` | Cloth lifts from the hem | clip from bottom |
| `hang-rail` | Drops off a rail and settles | y -22 → 0 |
| `silk-slip` | Long lateral ease | x 20, 1100ms |
| `garment-zip` | Opens from the top | clip from top |

### Industrial / rebellion

| id | Feel | Method |
|----|------|--------|
| `bolt-down` | Fast hit from above | y -16, 180ms |
| `crane-lower` | Slow lower, then lock | y -48, 900ms |
| `shear-slice` | Diagonal shear that squares | skewX + x |
| `dock-slam` | Comes in from the dock | x 72, 220ms |
| `clamp-shut` | Squeezed to width | scaleX 1.25 → 1 |
| `skew-slam` | Skewed slap, hard stop | skewX |
| `offset-print` | Misregister, then locks | x/y offset → 0 |

### Desk / fintech (aggressive-calm)

| id | Feel | Method |
|----|------|--------|
| `tick-print` | Clerk ticks the line | y 5, 160ms, stagger 32 |
| `settle-trade` | Figure settles on the book | spring, high damping |
| `tape-advance` | Ticker tape from the right | xPercent + clip |
| `ledger-line` | Line writes from the gutter | x -12, 240ms |

### Type / editorial

| id | Feel | Method |
|----|------|--------|
| `word-cascade` | Words rise in reading order | split words, stagger 70 |
| `char-tick` | Letters tick in | split chars, stagger 18 |
| `underline-grow` | Rule grows under the line | scaleX |
| `quote-mark-first` | Mark lands, then the line | scale on the mark |
| `column-rise` | Columns rise as a set | y 28, stagger 90 |
| `caption-late` | Caption after the plate | delay 420ms |
| `split-mask` | Masked line rise (words/lines) | overflow + yPercent |

### Fun (playful brands only)

| id | Feel | Method |
|----|------|--------|
| `wobble-land` | Lands with a small rotation | rotate 4 → 0 |
| `tumble-in` | Tumbles onto the mark | rotate 12 + y |
| `snap-elastic` | Scale snap | spring |
| `hop-in` | Hops down from above | y -36 spring |

---

## How to pick (do not randomize)

| Language | Default pool | Never |
|----------|--------------|--------|
| calm-fintech | stamp-settle, click-in, tick-print, ledger-line, settle-trade, letterpress-crush, baseline-lock | pop, slap, tumble, wobble, hop |
| luxury-editorial | drop-drape, typeset-rise, split-mask, pin-drop, silk-slip, quote-mark-first, word-cascade | stomp, dock-slam, snap-elastic |
| swiss-minimal | hard-cut, blackout-lift, rule-draw, paper-slide, baseline-lock | bounce, iris as identity |
| brutalist | stomp-in, bolt-down, dock-slam, skew-slam, hard-cut, offset-print | silk-slip, pop-in |
| dark-cinematic | iris-open, curtain-part, wipe-up, ink-bleed, match-cut, fade-hold | hop, wobble |
| organic | hang-rail, silk-slip, fade-hold, pin-drop | slap, dock-slam, skew |
| liquid-glass | ink-bleed, aperture-stop, curtain-part | rubber-stamp, bolt-down |
| material-you | pop-in, snap-elastic, hop-in, wobble-land | letterpress as identity |
| kinetic-poster | offset-print, shear-slice, skew-slam, hard-cut | silk-slip, pop-in, aurora fade |
| velvet-nocturne | iris-open, silk-slip, drop-drape | dock-slam, hop |
| jewel-chrome | letterpress-crush, iris-open, fade-hold | wobble, slap |
| candy-couture | pop-in, snap-elastic, hop-in | letterpress as identity |

Cite `enterRecipe` in prompt frontmatter. Signature stays `motionPrimitive`. One enter. Interaction after `landMs`.

**Banned as enter identity:** shiny gradient wipe, aurora fade, blur-plus-bounce kit, infinite bounce, character scramble on a luxury board, marquee as the landing.
