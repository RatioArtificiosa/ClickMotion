# Visual pass log — LEDGER (MS-SEC-PRIC01)

Operator demo: `http://localhost:3004/demo/cleanroom-ledger`  
Tool: `browser-harness` (local Chrome CDP). Cursor IDE browser hung. Browse plugin ENOENT.

## PASS 1 — defects

- [x] `cut-price` — Ink rule sliced the giant figure (display box too short)
- [x] `period-in-row` — Period copy collided with CLEARING
- [x] `ghost-rows` — Seat terms at 18% opacity on intro (unreadable + confusing)
- [x] `cta-fade` — CTA at 20–70% opacity looked disabled, not ink
- [x] `stamp-too-faint` — Later rows never reached full ink
- [x] `cue-in-foot` — Cue sat between rail and CTA

## PASS 2 — remaining

- [x] `ghost-plates` — Stacked grid still leaked a faint “0” / “00” behind $480 (Firm)

## PASS 3

Inactive plates `visibility: hidden` when `aria-hidden`. Price no longer cut. Rows full ink. CTA solid. Intro has no ghost ledger.

Open for operator taste (not bugs): left-index bronze tick, paper grain, Seat as recommended dwell.

Not sale-registered. Public remains video.
