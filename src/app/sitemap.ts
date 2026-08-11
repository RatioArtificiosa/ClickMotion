import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Public indexable routes for search + AI crawlers. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.publicUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/browse",
    "/collections",
    "/backgrounds",
    "/pricing",
    "/mcp",
    "/login",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "/browse" || path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/browse" ? 0.95 : 0.8,
  }));

  // Known free + flagship product slugs (keep in sync with CMS / MDX as catalog grows)
  const productSlugs = [
    "actually-interactive-product-can-hero",
    "lineup-product-line-scroll-reveal-section",
    "helix-helical-design-gallery-carousel-section",
    "nexus-ai-enterprise-intelligence-layer-hero",
    "aether-serene-wellness-meditation-hero",
    "vertex-security-brutalist-cybersecurity-hero",
    "meridian-scroll-narrative-private-residences-hero",
    "prism-liquid-glass-multi-panel-identity-hero",
    "folio-scroll-pivot-liquid-glass-decision-section",
    "axiom-fintech-inverted-markets-hero",
    "elyse-luxury-wellness-retreat-scroll-hero",
    "neon-forge-cyberpunk-gaming-studio-hero",
    "apex-quantum-deep-tech-quantum-hero",
    "sable-holiday-luxury-fashion-walk-hero",
    "mirage-agency-desert-scroll-glass-hero",
    "revel-scroll-narrative-fashion-commerce-hero",
    "lumina-studios-cinematic-film-production-hero",
    "terra-nova-clean-energy-platform-hero",
  ];

  const products: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${base}/browse/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...products];
}
