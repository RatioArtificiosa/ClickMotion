export const siteConfig = {
  /** Customer-facing brand (wordmark). Internal code may still say MS. */
  name: "ClickMotion",
  shortName: "ClickMotion",
  description:
    "Premium AI website prompts and motion assets. Build stunning, production-ready sites with the AI tools you already use.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ClickMotion.dev",
  /** Public marketing site (may lag DNS until pointed at servers). */
  publicUrl: "https://www.ClickMotion.dev",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/ms_prompts",
    github: "https://github.com/ms-prompts",
    discord: "https://discord.gg/ms-prompts",
  },
  creator: "ClickMotion",
  /** Wordmark: Birthstone, white glow on dark - see docs/BRAND.md */
  wordmarkFont: "Birthstone",
  keywords: [
    "AI website prompts",
    "ClickMotion",
    "motion design",
    "website templates",
    "animated backgrounds",
    "MCP server",
    "Cursor prompts",
    "Claude prompts",
    "Grok Build prompts",
    "Lovable prompts",
    "Bolt prompts",
    "landing page prompts",
    "hero section prompts",
    "production-ready websites",
  ],
} as const;
