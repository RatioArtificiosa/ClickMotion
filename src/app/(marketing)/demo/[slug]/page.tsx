import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDemo } from "@/components/demo/HeroDemo";
import { demoHeroes, getDemoHero } from "@/lib/demo-heroes";
import { listProductSlugs, loadProductBySlug } from "@/lib/product-prompt";

export function generateStaticParams() {
  return demoHeroes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = getDemoHero(slug);
  if (!hero) return {};
  return { title: `${hero.title} - Demo`, description: hero.description };
}

function productHrefForHeroId(id: string, fallback: string): string {
  for (const s of listProductSlugs()) {
    const p = loadProductBySlug(s);
    if (p?.id === id) return `/browse/${p.slug}`;
  }
  return `/browse/${fallback}`;
}

export default async function DemoHeroPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const embed = sp.embed === "1";
  const hero = getDemoHero(slug);
  if (!hero) notFound();

  if (embed) {
    return (
      <div className="min-h-screen bg-black">
        <HeroDemo hero={hero} />
      </div>
    );
  }

  const productHref = productHrefForHeroId(hero.id, hero.slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="container flex items-center justify-between py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Gallery
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href={productHref}>View product</Link>
        </Button>
      </div>

      <HeroDemo hero={hero} />
    </div>
  );
}
