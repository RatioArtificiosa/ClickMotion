# 00 — NOTHIN' overview

**Complete setup (install, deps, assets, freeze):** [../SETUP.md](../SETUP.md)  
**Status:** Studio Sequence + Phobic Objects **FROZEN** (2026-08-10).  
**Source:** [https://www.noth.in/](https://www.noth.in/)  
**Port:** **3032** (Lab; source clone 3030)

---

## Labs (v1)

| # | Id | Lab URL | Status |
|---|-----|---------|--------|
| 01 | studio-sequence | http://localhost:3032/lab/studio-sequence | **FROZEN** |
| 02 | phobic-objects | http://localhost:3032/lab/phobic-objects | **FROZEN** |

Hub: http://localhost:3032/

---

## Quick start

```bash
cd E:\website-tests\nothin-clone\app
npm install
npm run dev
```

---

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | React 19, react-router-dom 7, GSAP 3, Lenis |
| Tooling | Vite 7, TypeScript 5.9, Tailwind 4 |
| 3D | none in v1 |
| Club GSAP | not required |

Full tables: [../SETUP.md](../SETUP.md).

---

## Section notes

| File | Section |
|------|---------|
| [01-STUDIO-SEQUENCE.md](./01-STUDIO-SEQUENCE.md) | World-scale pull-out; `ny.png` + `surreal.mp4` |
| [02-PHOBIC-OBJECTS.md](./02-PHOBIC-OBJECTS.md) | Live `Kv()` evade; white-glow cursor; MOTION! |

## Agent packages

| Doc | Role |
|-----|------|
| [../agent-packages/00-LAB-SHELL.md](../agent-packages/00-LAB-SHELL.md) | Port / routes / stack |
| [../agent-packages/01-STUDIO-SEQUENCE-LAB-AGENT-PACKAGE.md](../agent-packages/01-STUDIO-SEQUENCE-LAB-AGENT-PACKAGE.md) | Studio lab |
| [../agent-packages/02-PHOBIC-OBJECTS-LAB-AGENT-PACKAGE.md](../agent-packages/02-PHOBIC-OBJECTS-LAB-AGENT-PACKAGE.md) | Phobic lab |

## Decisions & freeze

[../DECISIONS.md](../DECISIONS.md) · [../MASTER-PLAN.md](../MASTER-PLAN.md)

**Do not edit frozen modules** without setting the lab to OPEN in DECISIONS.md.

## Out of scope (v1)

Works grid, founders, full menu, case studies, homepage assembly of both labs.
