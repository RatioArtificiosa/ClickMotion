"use client";

import { useRouter } from "next/navigation";
import { Download, RefreshCw, ExternalLink } from "lucide-react";
import { AdminBtn } from "./admin-ui";
import { adminFetch } from "./admin-api";
import toast from "react-hot-toast";
import { useState } from "react";

export function DashboardActions({ productCount }: { productCount: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function reseed(force: boolean) {
    if (
      force &&
      !confirm(
        "Force re-seed from MDX overwrites your current CMS catalog. Export first if you care about edits. Continue?"
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await adminFetch<{
        counts: { products: number; genres: number; collections: number };
      }>("/api/admin/seed", {
        method: "POST",
        body: JSON.stringify({ force }),
      });
      toast.success(
        `Seeded ${res.counts.products} products · ${res.counts.genres} genres`
      );
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Seed failed");
    } finally {
      setBusy(false);
    }
  }

  async function exportJson() {
    try {
      const [products, genres, collections] = await Promise.all([
        adminFetch<{ products: unknown[] }>("/api/admin/products"),
        adminFetch<{ genres: unknown[] }>("/api/admin/genres"),
        adminFetch<{ collections: unknown[] }>("/api/admin/collections"),
      ]);
      const blob = new Blob(
        [
          JSON.stringify(
            {
              exportedAt: new Date().toISOString(),
              products: products.products,
              genres: genres.genres,
              collections: collections.collections,
            },
            null,
            2
          ),
        ],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ms-cms-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Export downloaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    }
  }

  return (
    <div className="space-y-2.5">
      <AdminBtn
        variant="secondary"
        className="w-full justify-start"
        disabled={busy}
        onClick={() => void exportJson()}
      >
        <Download className="h-4 w-4" />
        Export catalog JSON
      </AdminBtn>
      <AdminBtn
        variant="secondary"
        className="w-full justify-start"
        disabled={busy}
        onClick={() => void reseed(productCount === 0)}
      >
        <RefreshCw className={busy ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
        {productCount === 0 ? "Seed from MDX" : "Force re-seed from MDX"}
      </AdminBtn>
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-start gap-1.5 rounded-[12px] border border-white/12 bg-white/[0.06] px-3.5 py-2 text-[13px] font-semibold text-white/90 transition hover:bg-white/[0.1]"
      >
        <ExternalLink className="h-4 w-4" />
        Open public site
      </a>
      <p className="pt-1 text-[11px] leading-relaxed text-white/28">
        Force re-seed replaces the store. Export first when you have custom products.
      </p>
    </div>
  );
}
