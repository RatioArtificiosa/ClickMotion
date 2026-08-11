import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Crawl policy for search + AI agents.
 * Keep aligned with docs/AEO_LLM_GROWTH.md and public/llms.txt.
 * Note: /api/* is disallowed for HTML scrapers except agents hit MCP via clients.
 */
export default function robots(): MetadataRoute.Robots {
  const base = (siteConfig.publicUrl || siteConfig.url).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llm.txt", "/llms-full.txt", "/browse", "/mcp", "/pricing"],
        disallow: ["/admin", "/api/", "/account"],
      },
      // Explicit allow for major AI crawlers (answer engines + training policies vary by vendor)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
