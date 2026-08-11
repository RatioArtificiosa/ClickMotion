import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewHoverCard } from "@/components/gallery/PreviewHoverCard";
import { loadProductBySlug } from "@/lib/product-prompt";
import {
  getPublicCollection,
  loadPublicCollections,
} from "@/lib/cms/collections-public";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const cols = await loadPublicCollections();
    return cols.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = await getPublicCollection(slug);
  if (!col) return {};
  return { title: `${col.title} - MS Collections`, description: col.description };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = await getPublicCollection(slug);
  if (!col) notFound();

  const items = col.promptIds
    .map((id) => loadProductBySlug(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/collections">
          <ArrowLeft className="mr-2 h-4 w-4" /> All collections
        </Link>
      </Button>

      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{col.priceTier}</Badge>
          <Badge variant="secondary">{col.promptIds.length} prompts</Badge>
          {col.isFeatured && <Badge>Featured</Badge>}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{col.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{col.description}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button variant="gradient" asChild>
          <Link href="/pricing">Unlock collection - {col.priceTier}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/browse">Browse library</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PreviewHoverCard
            key={p.id}
            slug={p.slug}
            title={p.title}
            category={p.category}
            styleTags={p.styleTags}
            motionIntensity={p.motionIntensity}
            thumbnail={p.thumbnail || p.poster}
            previewVideo={p.previewVideo}
            priceTier={p.priceTier}
            href={`/browse/${p.slug}`}
          />
        ))}
      </div>

      <Card className="mt-8 border-dashed bg-muted/30">
        <CardContent className="py-6">
          <p className="text-sm font-medium">How collections work</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Each collection is a tested set - same color tokens, same 8px grid, same motion language.
            Copy each prompt in order (hero → features → pricing → CTA) into Lovable/Cursor/Bolt.
            Compatible pairs are declared via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">compatibleWith</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
