import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromptProductView } from "@/components/product/PromptProductView";
import {
  loadProductBySlug,
  loadRelatedProducts,
} from "@/lib/product-prompt";
import { siteConfig } from "@/config/site";

/** Always read CMS store at request time so admin edits are live. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = loadProductBySlug(slug);
  if (!product) return { title: "Prompt" };
  return {
    title: `${product.shortTitle} - ${siteConfig.name}`,
    description:
      product.description || `Premium ${product.type} prompt - ${product.shortTitle}`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : undefined,
    },
  };
}

/**
 * Product page route — same template for every slug.
 * Layout law: docs/PRODUCT_LAW.md → “Product page layout (template law — locked)”.
 * UI: PromptProductView (main ~960×540 + meta + 3-card rail + genre gallery).
 */
export default async function PromptProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = loadProductBySlug(slug);
  if (!product) notFound();

  // Rail takes top 2 by score; bottom gallery uses the rest (no overlap).
  // Load enough unique cards for both regions (2 rail + up to 12 below).
  const related = loadRelatedProducts(product, 14);

  return <PromptProductView product={product} related={related} />;
}
