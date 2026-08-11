import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listCollections, listProducts } from "@/lib/cms/service";
import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionsAdminClient } from "@/components/admin/CollectionsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [collections, products] = await Promise.all([
    listCollections(true),
    listProducts({ includeUnpublished: true }),
  ]);
  return (
    <AdminShell
      title="Collections"
      subtitle="Bundles on the storefront - drag to reorder"
    >
      <CollectionsAdminClient collections={collections} products={products} />
    </AdminShell>
  );
}
