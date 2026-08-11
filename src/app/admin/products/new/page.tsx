import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listGenres } from "@/lib/cms/service";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const genres = await listGenres(true);
  return (
    <AdminShell title="New product" subtitle="Shows on the public site when status is published">
      <ProductForm genres={genres} />
    </AdminShell>
  );
}
