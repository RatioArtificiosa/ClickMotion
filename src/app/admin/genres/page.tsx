import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listGenres } from "@/lib/cms/service";
import { AdminShell } from "@/components/admin/AdminShell";
import { GenresAdminClient } from "@/components/admin/GenresAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminGenresPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const genres = await listGenres(true);
  return (
    <AdminShell
      title="Genres"
      subtitle="Public filters and product grouping - drag to reorder"
    >
      <GenresAdminClient genres={genres} />
    </AdminShell>
  );
}
