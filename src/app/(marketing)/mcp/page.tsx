import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";
import { McpSetupClient } from "@/components/mcp/McpSetupClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "MCP Server",
  description:
    "Connect Claude, Cursor, Codex, and Grok Build to ClickMotion. One command. Premium design prompts for your AI agents.",
  openGraph: {
    title: `MCP Server | ${siteConfig.name}`,
    description:
      "The design superpowers your AI agents are missing. Connect ClickMotion via MCP in under a minute.",
  },
};

export default function McpPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="border-b border-[var(--hairline)]">
        <div className="container py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-1.5">
              <Bot className="h-3 w-3" /> MCP
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
              The design superpowers
              <br />
              <span className="text-[var(--text-secondary)]">
                your AI agents are missing.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              Keep the web free of AI slop. Connect your agents to ClickMotion premium
              website design prompts, backgrounds, and packages.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--text-quaternary)]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3 py-1">
                <Zap className="h-3 w-3" /> Included in all paid plans
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3 py-1">
                <Sparkles className="h-3 w-3" /> Free accounts: free prompts only
              </span>
            </div>
            <div className="mt-8">
              <Button asChild className="gap-2">
                <Link href="/pricing">
                  Go Unlimited <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Set up in under a minute.
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)] md:text-base">
            One command. No API key to paste by hand. Works with Claude, Cursor, Codex,
            and Grok Build.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <McpSetupClient />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--hairline)] bg-[var(--well)]/40">
        <div className="container flex flex-col items-center gap-4 py-14 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready when your agents are
          </h2>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Browse the library first, or unlock unlimited access for full MCP inventory.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2">
              <Link href="/pricing">
                Go Unlimited <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" className="gap-2">
              <Link href="/browse">Browse library</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
