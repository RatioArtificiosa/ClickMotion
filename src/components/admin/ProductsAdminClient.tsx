"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff, Search, Film, ExternalLink } from "lucide-react";
import type { CmsGenre, CmsProduct } from "@/lib/cms/types";
import { SortableList } from "./SortableList";
import { adminFetch } from "./admin-api";
import { AdminBadge, AdminEmpty, adminInputClass } from "./admin-ui";
import toast from "react-hot-toast";

export function ProductsAdminClient({
  products,
  genres,
}: {
  products: CmsProduct[];
  genres: CmsGenre[];
}) {
  const router = useRouter();
  const genreMap = useMemo(() => new Map(genres.map((g) => [g.id, g.label])), [genres]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [genre, setGenre] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      if (status === "published" && p.status !== "published") return false;
      if (status === "draft" && p.status === "published") return false;
      if (genre !== "all" && p.genreId !== genre) return false;
      if (type !== "all" && p.type !== type) return false;
      if (!query) return true;
      return `${p.title} ${p.slug} ${p.description}`.toLowerCase().includes(query);
    });
  }, [products, q, status, genre, type]);

  // Reorder always uses full catalog order of currently listed ids (filtered list)
  async function onReorder(orderedIds: string[]) {
    try {
      // Merge: filtered order for visible items, keep relative order of hidden
      const filteredSet = new Set(orderedIds);
      const rest = products.map((p) => p.id).filter((id) => !filteredSet.has(id));
      const full = [...orderedIds, ...rest];
      await adminFetch("/api/admin/products/reorder", {
        method: "POST",
        body: JSON.stringify({ orderedIds: full }),
      });
      toast.success("Gallery order saved");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reorder failed");
      throw e; // SortableList rolls back optimistic order
    }
  }

  async function onDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await adminFetch(`/api/admin/products/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function toggleStatus(p: CmsProduct) {
    const next = p.status === "published" ? "draft" : "published";
    try {
      await adminFetch(`/api/admin/products/${p.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: next }),
      });
      toast.success(next === "published" ? "Published to site" : "Unpublished");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }

  if (products.length === 0) {
    return (
      <AdminEmpty
        title="No products yet"
        description="Create your first hero, section, or landing page. It appears on the public gallery the moment you publish."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex rounded-[12px] bg-white px-4 py-2 text-[13px] font-semibold text-black"
          >
            Create product
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.02] p-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, slug…"
            className={adminInputClass + " !mt-0 pl-9"}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="rounded-[11px] border border-white/10 bg-black/40 px-2.5 py-2 text-[12px] text-white/80"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Unpublished</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-[11px] border border-white/10 bg-black/40 px-2.5 py-2 text-[12px] text-white/80"
          >
            <option value="all">All types</option>
            <option value="hero">Hero</option>
            <option value="section">Section</option>
            <option value="landing-page">Landing</option>
            <option value="special">Special</option>
          </select>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-[11px] border border-white/10 bg-black/40 px-2.5 py-2 text-[12px] text-white/80"
          >
            <option value="all">All genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[12px] text-white/30">
        Showing {filtered.length} of {products.length} · drag handles set public gallery order
      </p>

      {filtered.length === 0 ? (
        <AdminEmpty
          title="No matches"
          description="Try another search or clear filters."
          action={
            <button
              type="button"
              className="text-[13px] text-white/60 underline"
              onClick={() => {
                setQ("");
                setStatus("all");
                setGenre("all");
                setType("all");
              }}
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <SortableList
          items={filtered}
          onReorder={onReorder}
          renderItem={(p) => (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-[11px] bg-black/50 ring-1 ring-white/10">
                {p.thumbnail || p.poster ? (
                  (() => {
                    const src = p.thumbnail || p.poster;
                    const isVid = /\.(mp4|webm)(\?|#|$)/i.test(src);
                    return isVid ? (
                      <video
                        src={src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    );
                  })()
                ) : (
                  <div className="flex h-full items-center justify-center text-[9px] text-white/25">
                    —
                  </div>
                )}
                {p.previewVideo && (
                  <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded bg-black/70 px-1 py-0.5 text-[9px] text-white/80">
                    <Film className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-[14px] font-semibold text-white">
                    {p.title}
                  </span>
                  <AdminBadge tone={p.status === "published" ? "live" : "muted"}>
                    {p.status}
                  </AdminBadge>
                </div>
                <div className="mt-0.5 truncate text-[12px] text-white/35">
                  {p.type} · {genreMap.get(p.genreId) ?? p.genreId} · /{p.slug}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <a
                  href={`/browse/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[10px] p-2 text-white/35 transition hover:bg-white/5 hover:text-white"
                  title="View public"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => void toggleStatus(p)}
                  className="rounded-[10px] p-2 text-white/35 transition hover:bg-white/5 hover:text-white"
                  title={p.status === "published" ? "Unpublish" : "Publish"}
                >
                  {p.status === "published" ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
                <Link
                  href={`/admin/products/${p.id}`}
                  className="rounded-[10px] p-2 text-white/35 transition hover:bg-white/5 hover:text-white"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => void onDelete(p.id, p.title)}
                  className="rounded-[10px] p-2 text-white/35 transition hover:bg-rose-500/10 hover:text-rose-300"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}
