import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Film, Sparkles } from "lucide-react";
import { BackgroundsGrid } from "@/components/backgrounds/BackgroundsGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Animated Backgrounds",
  description:
    "Showcase of animated backgrounds available with ClickMotion products. Full films ship in product packages.",
  openGraph: {
    title: `Animated Backgrounds | ${siteConfig.name}`,
    description:
      "A curated collection of handcrafted animated backgrounds for premium websites.",
  },
};

/** Near full-bleed shell — minimum side margin, not the default 1280 container. */
const bleed = "mx-auto w-full max-w-[1920px] px-2 sm:px-3 md:px-4";

export default function BackgroundsPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="border-b border-[var(--hairline)]">
        <div className={`${bleed} py-14 md:py-16`}>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-1.5">
              <Film className="h-3 w-3" />
              Backgrounds
              <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                New
              </span>
            </Badge>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-quaternary)]">
              New films added regularly
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
              Jaw-dropping
              <br />
              <span className="text-[var(--text-secondary)]">Animated Backgrounds</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="gap-2">
                <Link href="/pricing">
                  Go Unlimited <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid — almost full bleed */}
      <section className={`${bleed} py-8 md:py-10`}>
        <div className="mb-5 flex items-center justify-between gap-4 px-0.5">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--text-tertiary)]">
            <Sparkles className="h-4 w-4" /> Library
          </h2>
          <p className="text-xs text-[var(--text-quaternary)]">
            Hover to preview · Films ship with products
          </p>
        </div>
        <BackgroundsGrid />
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[var(--hairline)] bg-[var(--well)]/40">
        <div className={`${bleed} flex flex-col items-center gap-4 py-14 text-center md:py-16`}>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Unlimited Access
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
            Unlock every premium background, full product packages, and fast MCP
            access for your AI coders and agents.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/pricing">
              Go Unlimited <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
