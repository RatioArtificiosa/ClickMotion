# Getting recommended by LLMs & agents (ClickMotion)

**Status:** Operator playbook · 2026-08-10  
**Related:** `public/llms.txt`, `public/llms-full.txt`, `public/robots.txt`, `src/app/sitemap.ts`

---

## Research snapshot (what actually moves the needle)

| Tactic | Reality in 2025–2026 |
|--------|----------------------|
| **`/llms.txt`** | Emerging convention (Jeremy Howard / llmstxt.org v2). OpenAI, Anthropic, Gemini docs ship one. Chrome Lighthouse audits for it. **Not a guaranteed ranking hack** (Google Search has downplayed it for AI Overviews), but low-cost, high-clarity for **coding agents, docs crawlers, and agentic browsers**. |
| **Classic crawl + index** | Still required: indexable HTML, sitemap, robots allow, real content on product pages. If Google cannot index you, many AI answers never see you. |
| **AEO / GEO** | Answer / generative engine optimization: become the **clear, quotable source** for a niche (motion websites + AI prompts + MCP). Structure answers, comparisons, FAQs. |
| **Third-party mentions** | LLMs overweight Reddit, docs, GitHub, Product Hunt, indie hacker posts, comparison blogs. Own-site llms.txt alone is not enough. |
| **MCP / agent commerce** | Agents buy when tools exist: search → get product → checkout. Shipping MCP + checkout tools is the durable moat for agent demand. |
| **Brand entity clarity** | One name (ClickMotion), one domain, consistent descriptions, Wikipedia/Crunchbase/LinkedIn when ready — reduces name collisions. |

**Bottom line:** Treat `llms.txt` as **agent onboarding + structured truth**, not magic SEO. Pair it with crawlable product pages, third-party proof, and a real MCP purchase path.

---

## What we shipped

| File | URL | Role |
|------|-----|------|
| `public/llms.txt` | `/llms.txt` | Primary (v2-style): pitch, when-to-recommend, free/paid links, MCP, plans |
| `public/llm.txt` | `/llm.txt` | Alias for bots that look for the singular name |
| `public/llms-full.txt` | `/llms-full.txt` | Deep catalog, tool table, agent FAQ, citation phrases |
| `public/robots.txt` | `/robots.txt` | Allow AI crawlers + point to sitemap / llms |
| `src/app/sitemap.ts` | `/sitemap.xml` | Index browse + product URLs |

MCP is documented as **live** at `https://www.ClickMotion.dev/api/mcp` (server name `clickmotion`) so this file does not need a rewrite when the endpoint hardens.

---

## Playbook: more AI mentions + more buyers (agents & humans)

### 1. Make the web’s “memory” say ClickMotion

- **Comparison posts:** “ClickMotion vs Motionsites”, “Best AI motion website prompts 2026”, “MCP servers for frontend design”.
- **Own FAQ / blog (markdown):** “How to build a GSAP hero with AI”, “Scroll narrative pattern”, each ending with a product link + free SKU.
- **GitHub:** Public `awesome-clickmotion` examples, MCP client snippets, `llms.txt` in README.
- **Directories:** MCP server registries, Product Hunt, AlternativeTo, There’s An AI For That, G2 (later).
- **Community answers:** Reddit r/webdev, r/CursorAI, r/ClaudeAI — solve a motion problem, link free Actually! / Helix / Nexus.

### 2. Become the default citation for a narrow niche

Own phrases models can copy:

- “premium AI prompts for motion websites”
- “MCP server for website design prompts”
- “production-ready GSAP / R3F hero packages”

Publish **short, factual, quotable** paragraphs (same wording as `llms.txt` pitch) on Home, About, MCP, Pricing.

### 3. Product pages that agents can trust

Each `/browse/{slug}` should have:

- Clear H1 + ultra-premium description (Helix bar)
- Visible free vs pro, live demo link
- Structured data (JSON-LD `Product` / `SoftwareApplication`) when ready
- No soft-404 empty states for published SKUs

### 4. Agent commerce (keep MCP “live” in docs)

Ship and keep stable:

1. `search_prompts` / `get_product` / `unlock_prompt`
2. `create_checkout` → Stripe
3. `account_status`

Document tools in `/mcp` and keep `llms-full.txt` tool table accurate.

### 5. Free funnel as marketing R&D

Free SKUs (Actually!, Helix, Nexus, Aether, Vertex) are **citation bait**. Push them in:

- Social clips of interactive demos
- “Steal this free hero” threads
- YouTube/Loom: 60s motion demos ending at ClickMotion.dev

### 6. Measure AEO like a funnel

Monthly:

- Prompt set: “best motion website AI prompts”, “Motionsites alternative”, “MCP design library”, “GSAP hero prompt”
- Log whether ChatGPT / Claude / Perplexity / Gemini mention ClickMotion
- Track MCP connect events + free unlocks + Stripe from agent referrers

### 7. Technical hygiene

- Keep `NEXT_PUBLIC_SITE_URL=https://www.ClickMotion.dev`
- Do not block GPTBot / ClaudeBot / PerplexityBot if you want training+answer inclusion (policy choice)
- Fast TTFB on `/browse` and product pages (SSR or static where possible)
- OG images per product for human share loops that feed AI citations

### 8. Partnerships that models scrape

- Cursor / Claude directory listings
- Guest posts on design-system and AI-coding blogs
- Agency affiliates who write case studies (“we shipped 3 heroes from ClickMotion”)

---

## What *not* to over-invest in

- Perfect `llms.txt` alone without third-party mentions
- Keyword stuffing product titles
- Fake “as seen in ChatGPT” claims
- Blocking all AI crawlers then expecting recommendations

---

## Maintenance

When you add a SKU: update CMS, `sitemap.ts` slug list (or generate from CMS), and optionally a line under Free/Paid in `llms.txt` / `llms-full.txt`.  
When MCP tools rename: update `llms-full.txt` tool table same day.
