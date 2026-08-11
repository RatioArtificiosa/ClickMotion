import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getCmsStore, listGenres } from "@/lib/cms/service";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const store = await getCmsStore();
  const product = store.products.find((p) => p.id === id);
  if (!product) notFound();
  const genres = await listGenres(true);

  return (
    <AdminShell title="Edit product" subtitle={product.slug}>
      <ProductForm product={product} genres={genres} />
    </AdminShell>
  );
}
