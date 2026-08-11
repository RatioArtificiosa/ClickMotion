import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listGenres, listProducts } from "@/lib/cms/service";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductsAdminClient } from "@/components/admin/ProductsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [products, genres] = await Promise.all([
    listProducts({ includeUnpublished: true }),
    listGenres(true),
  ]);

  return (
    <AdminShell
      title="Products"
      subtitle="Add, edit, reorder, delete - live on the storefront"
      actions={
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-[12px] bg-white px-3.5 py-2 text-[13px] font-semibold text-black transition hover:bg-white/90"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      }
    >
      <ProductsAdminClient products={products} genres={genres} />
    </AdminShell>
  );
}
