import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadPublicCollections } from "@/lib/cms/collections-public";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collections - MS",
  description:
    "Curated bundles - heroes + sections + specials that ship as a complete site. One click, one system.",
};

export default async function CollectionsPage() {
  const collections = await loadPublicCollections();
  const featured = collections.filter((c) => c.isFeatured);
  const rest = collections.filter((c) => !c.isFeatured);

  return (
    <div className="container py-10">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-3 gap-1.5">
          <Layers className="h-3 w-3" /> Collections
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Build a full site, not just a hero
        </h1>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Curated bundles of heroes, sections, and specials that are designed to work together - same
          tokens, same motion, same language. Copy the set, paste into Lovable/Cursor, ship.
        </p>
      </div>

      {featured.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--text-tertiary)]">
            <Sparkles className="h-4 w-4" /> Featured
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((c) => (
              <Card key={c.id} className="group overflow-hidden">
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[var(--well)]">
                  <span className="rounded-[10px] border border-[var(--hairline)] bg-white/[0.04] px-4 py-1.5 text-xs font-medium backdrop-blur">
                    {c.promptIds.length} prompts
                  </span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>{c.priceTier}</Badge>
                    {c.badge && <Badge variant="secondary">{c.badge}</Badge>}
                  </div>
                  <CardTitle className="mt-2 text-xl">{c.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{c.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full gap-2">
                    <Link href={`/collections/${c.slug}`}>
                      View collection <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-[var(--text-tertiary)]">
            All collections
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <Card key={c.id} className="flex flex-col">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {c.priceTier}
                  </Badge>
                  <CardTitle className="mt-2 text-lg">{c.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{c.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-xs text-[var(--text-quaternary)]">
                    {c.promptIds.length} prompts
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/collections/${c.slug}`}>Open</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
