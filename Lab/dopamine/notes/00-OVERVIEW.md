# 00 — DOPAMINE overview

**Source:** serotoninn.com → clone **DOPAMINE**  
**Port:** 3040  
**Status:** film + footer **OFFICIALLY FROZEN** (human sign-off 2026-08-11)  
**Setup:** [`../SETUP.md`](../SETUP.md)  
**Freeze authority:** [`../DECISIONS.md`](../DECISIONS.md)  
**Agent packages:** [`../agent-packages/README.md`](../agent-packages/README.md)  
**Plan:** [`../MASTER-PLAN.md`](../MASTER-PLAN.md) · **Checklist:** [`../CHECKLIST.md`](../CHECKLIST.md)

## Scope

| # | Section | Lab | Status |
|---|---------|-----|--------|
| 01 | Film (motion-section) | `/lab/film` | **FROZEN** |
| 02 | Footer | `/lab/footer` | **FROZEN** |
| 01+02 | Coupled pin | `/lab/film-footer` | **FROZEN** (sign-off) |

## Stack

GSAP 3 + ScrollTrigger + Lenis + Lottie + React/Vite/Tailwind.  
Details: [`../research/RESEARCH.md`](../research/RESEARCH.md).

## Brand

SEROTONINN → **DOPAMINE** in title, body, logo, copyright, credits.

## Final freeze polish (agents: do not reverse)

| Item | Locked |
|------|--------|
| Film first viewport | Tight top; pin under headline — not source 18rem runway |
| Credits | DOPAMINE / motion system only |
| Video | StrangeSurreal.mp4 |
| Figure | Woman1.png @ 65rem desktop |
| Links | No external URLs |

## Source compare

| Original | Local extract |
|----------|----------------|
| Film HTML | `research/raw/motion-section.html` |
| Footer HTML | `research/raw/footer.html` |
| Pin JS | `research/raw/motion-section-from-main.js` |
| Footer JS | `research/chunks/footer-anim.js` |
| CSS | `research/raw/css-motion-footer.css` |

## Agent entry

1. [`../SETUP.md`](../SETUP.md)  
2. [`../agent-packages/00-LAB-SHELL.md`](../agent-packages/00-LAB-SHELL.md)  
3. [`01-FILM`](../agent-packages/01-FILM-LAB-AGENT-PACKAGE.md) / [`02-FOOTER`](../agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md)  
4. This notes tree  
5. [`../DECISIONS.md`](../DECISIONS.md) — confirm still FROZEN  

## Multi-site ports

3010 ACTUALLY · 3020 ORION · 3030 NOTHIN' · **3040 DOPAMINE**
