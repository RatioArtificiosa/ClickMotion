import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Film,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Crown,
  Sparkles,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminCard,
  AdminSectionTitle,
  AdminBadge,
} from "@/components/admin/admin-ui";
import {
  backgroundsCatalog,
  backgroundsVideoTiles,
  isBackgroundsRolePath,
  type BackgroundAsset,
} from "@/config/backgrounds";
import { packageByProductId } from "@/lib/product-packages";
import { ownerDesignById } from "@/lib/owner-designs";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

export const dynamic = "force-dynamic";

/**
 * Admin mirror of public /backgrounds.
 * Single source of truth: src/config/backgrounds.ts
 * Law: small encodes only — never client HD on the public page.
 */
export default async function AdminBackgroundsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const videos = backgroundsVideoTiles();
  const gradients = backgroundsCatalog.filter((b) => b.kind === "gradient");
  const leaks = videos.filter((b) => b.src && !isBackgroundsRolePath(b.src));
  const missingSource = videos.filter((b) => b.productId && !b.sourceFilm);

  return (
    <AdminShell
      title="Backgrounds library"
      subtitle="What /backgrounds serves — small encodes only. Source: src/config/backgrounds.ts"
      actions={
        <Link
          href="/backgrounds"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-[12px] border border-white/12 bg-white/[0.06] px-3.5 py-2 text-[12.5px] font-medium text-white/80 transition hover:bg-white/[0.1]"
        >
          Open public page
          <ExternalLink className="h-3.5 w-3.5 text-white/40" />
        </Link>
      }
    >
      <div className="mb-8 overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent">
        <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6">
          <p className={cn(syne.className, "text-[15px] font-bold tracking-tight text-white")}>
            Backgrounds vault
          </p>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/50">
            This board is the operator view of every tile on{" "}
            <span className="text-white/70">/backgrounds</span>. Video{" "}
            <span className="text-white/70">src</span> must be under{" "}
            <code className="text-white/55">/assets/videos/backgrounds/</code>{" "}
            (640×360-class). Free Copy URL uses that same small path. Client HD
            stays in packages / designs only.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/40">
            <span className="rounded-full border border-white/10 px-2.5 py-1">
              Video tiles {videos.length}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-1">
              Gradients {gradients.length}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-1">
              Catalog total {backgroundsCatalog.length}
            </span>
          </div>
        </div>
        <div className="grid gap-0 sm:grid-cols-3">
          <VaultStat
            label="Encode"
            value="npm run encode:backgrounds"
            hint="Add job in scripts/encode-backgrounds-preview.mjs"
          />
          <VaultStat
            label="Register"
            value="backgrounds.ts + packages + designs"
            hint="Every sale-ready SKU on the library"
          />
          <VaultStat
            label="Public path"
            value="/backgrounds"
            hint="Never pipeline client HD here"
          />
        </div>
      </div>

      {leaks.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-[14px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-[13px] text-rose-100/90">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Role leak — fix immediately</p>
            <p className="mt-1 text-[12px] text-rose-100/70">
              {leaks.length} video tile(s) use a path outside{" "}
              <code>/assets/videos/backgrounds/</code>. Public page would stream
              full-res assets.
            </p>
            <ul className="mt-2 space-y-1 font-mono text-[11px] text-rose-100/60">
              {leaks.map((b) => (
                <li key={b.id}>
                  {b.id}: {b.src}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {missingSource.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-[14px] border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-[13px] text-amber-100/90">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-[12px] leading-relaxed">
            {missingSource.length} product-linked tile(s) missing{" "}
            <code className="text-amber-100/70">sourceFilm</code> (operator
            trace to client HD). Add it in backgrounds.ts.
          </p>
        </div>
      )}

      <AdminSectionTitle
        title="Video tiles (public feed)"
        subtitle="What Network tab must show on /backgrounds — small files only"
      />
      <div className="mb-10 grid gap-4 lg:grid-cols-2">
        {videos.map((item) => (
          <BackgroundAdminCard key={item.id} item={item} />
        ))}
      </div>

      <AdminSectionTitle
        title="Gradient tiles"
        subtitle="CSS only — no video bandwidth"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gradients.map((item) => (
          <AdminCard key={item.id} className="overflow-hidden p-0">
            <div
              className="aspect-video w-full"
              style={{ background: item.gradient }}
            />
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-white/85">
                  {item.title}
                </p>
                <p className="font-mono text-[10px] text-white/30">{item.id}</p>
              </div>
              <AdminBadge tone={item.tier === "premium" ? "warn" : "muted"}>
                {item.tier}
              </AdminBadge>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="mt-10 rounded-[16px] border border-white/[0.06] bg-black/25 p-5">
        <p className={cn(syne.className, "text-[13px] font-bold text-white/80")}>
          Shipping a product to sale (do not skip admin)
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-4 text-[12px] leading-relaxed text-white/40">
          <li>
            Encode small bg:{" "}
            <code className="text-white/55">npm run encode:backgrounds</code>{" "}
            (add job for new film).
          </li>
          <li>
            Register tile in{" "}
            <code className="text-white/55">src/config/backgrounds.ts</code> with{" "}
            <code className="text-white/55">productId</code> +{" "}
            <code className="text-white/55">sourceFilm</code>.
          </li>
          <li>
            Set{" "}
            <code className="text-white/55">backgroundsPreview</code> on{" "}
            <code className="text-white/55">product-packages.ts</code> and{" "}
            <code className="text-white/55">owner-designs.ts</code>.
          </li>
          <li>
            Confirm this Admin page + public /backgrounds (Network: no client HD).
          </li>
          <li>
            Checklist:{" "}
            <code className="text-white/55">
              PRODUCTION_READY_CHECKLIST.md §2H + admin registries
            </code>
            .
          </li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/packages"
            className="text-[12px] font-medium text-white/50 transition hover:text-white/80"
          >
            Product packages →
          </Link>
          <Link
            href="/admin/designs"
            className="text-[12px] font-medium text-white/50 transition hover:text-white/80"
          >
            Original designs →
          </Link>
          <Link
            href="/admin/products"
            className="text-[12px] font-medium text-white/50 transition hover:text-white/80"
          >
            Products →
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}

function VaultStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border-t border-white/[0.06] px-5 py-4 sm:border-t-0 sm:border-l sm:border-white/[0.06] sm:first:border-l-0 sm:px-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-[12px] font-medium text-white/85 break-all">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-white/35">{hint}</p>
    </div>
  );
}

function BackgroundAdminCard({ item }: { item: BackgroundAsset }) {
  const okPath = item.src ? isBackgroundsRolePath(item.src) : false;
  const pack = item.productId ? packageByProductId(item.productId) : undefined;
  const owner = item.productId ? ownerDesignById(item.productId) : undefined;
  const premium = item.tier === "premium";

  return (
    <AdminCard className="flex flex-col gap-3 overflow-hidden p-0">
      <div className="relative aspect-video w-full bg-black">
        {item.kind === "video" && item.src ? (
          <video
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: item.gradient }}
          />
        )}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {premium ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
              <Crown className="h-3 w-3" /> Premium
            </span>
          ) : (
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
              Free
            </span>
          )}
          {okPath ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-200/90 backdrop-blur">
              <CheckCircle2 className="h-3 w-3" /> backgrounds role
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/25 px-2 py-0.5 text-[10px] font-medium text-rose-100 backdrop-blur">
              <AlertTriangle className="h-3 w-3" /> bad path
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className={cn(
                syne.className,
                "text-[15px] font-bold tracking-tight text-white"
              )}
            >
              {item.title}
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-white/30">
              {item.id}
              {item.productId ? ` · ${item.productId}` : ""}
            </p>
          </div>
          <AdminBadge tone={premium ? "warn" : "muted"}>{item.tier}</AdminBadge>
        </div>

        {item.adminNote && (
          <p className="text-[12px] leading-relaxed text-white/40">
            {item.adminNote}
          </p>
        )}

        <div className="space-y-1.5 rounded-[12px] border border-white/[0.06] bg-black/30 px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-white/40">
          <div className="flex gap-2">
            <span className="shrink-0 text-white/25">public src</span>
            <span className="min-w-0 break-all text-emerald-200/70">
              {item.src || "—"}
            </span>
          </div>
          {item.sourceFilm && (
            <div className="flex gap-2">
              <span className="shrink-0 text-white/25">sourceFilm</span>
              <span className="min-w-0 break-all text-amber-200/50">
                {item.sourceFilm}{" "}
                <span className="text-white/25">(not served here)</span>
              </span>
            </div>
          )}
          {item.poster && (
            <div className="flex gap-2">
              <span className="shrink-0 text-white/25">poster</span>
              <span className="min-w-0 break-all">{item.poster}</span>
            </div>
          )}
          {pack?.backgroundsPreview && (
            <div className="flex gap-2">
              <span className="shrink-0 text-white/25">packages</span>
              <span
                className={cn(
                  "min-w-0 break-all",
                  pack.backgroundsPreview === item.src
                    ? "text-white/45"
                    : "text-amber-200/70"
                )}
              >
                {pack.backgroundsPreview}
                {pack.backgroundsPreview !== item.src
                  ? " · mismatch vs tile"
                  : ""}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {item.src && (
            <a
              href={item.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[11px] border border-white/[0.08] px-3 py-2 text-[11px] text-white/55 transition hover:border-white/14 hover:text-white/80"
            >
              <Film className="h-3.5 w-3.5" />
              Open small file
            </a>
          )}
          {item.productId && (
            <Link
              href={`/admin/products/${item.productId}`}
              className="inline-flex items-center gap-1.5 rounded-[11px] border border-white/[0.08] px-3 py-2 text-[11px] text-white/55 transition hover:border-white/14 hover:text-white/80"
            >
              CMS product
            </Link>
          )}
          {pack && (
            <Link
              href="/admin/packages"
              className="inline-flex items-center gap-1.5 rounded-[11px] border border-white/[0.08] px-3 py-2 text-[11px] text-white/55 transition hover:border-white/14 hover:text-white/80"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Packages
            </Link>
          )}
          {owner && (
            <Link
              href="/admin/designs"
              className="inline-flex items-center gap-1.5 rounded-[11px] border border-white/[0.08] px-3 py-2 text-[11px] text-white/55 transition hover:border-white/14 hover:text-white/80"
            >
              Designs
            </Link>
          )}
        </div>
      </div>
    </AdminCard>
  );
}
