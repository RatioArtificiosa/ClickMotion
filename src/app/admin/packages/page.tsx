import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FileText,
  CheckCircle2,
  Circle,
  Crown,
  ExternalLink,
  AlertCircle,
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
  PRODUCT_PACKAGES,
  type PackageStatus,
  type ProductPackageEntry,
} from "@/lib/product-packages";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<PackageStatus, "live" | "warn" | "muted" | "neutral"> =
  {
    "golden-rule": "live",
    approved: "live",
    review: "warn",
    draft: "muted",
    missing: "warn",
  };

export default async function AdminProductPackagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const ready = PRODUCT_PACKAGES.filter((p) => p.checklist.packagePdf);
  const missing = PRODUCT_PACKAGES.filter((p) => !p.checklist.packagePdf);
  const golden = PRODUCT_PACKAGES.find((p) => p.status === "golden-rule");

  return (
    <AdminShell
      title="Product packages"
      subtitle="Client delivery PDFs — golden-rule manuals for free and paid SKUs. Storefront CTAs unchanged."
    >
      {/* Intro */}
      <div className="mb-8 overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent">
        <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-2xl">
              <p
                className={cn(
                  syne.className,
                  "text-[15px] font-bold tracking-tight text-white"
                )}
              >
                Client package vault
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                Each published product needs a Product Package PDF: client HD
                path, full prompt usage per AI tool, customization slots, and
                video-gen recreation. Layout law:{" "}
                <span className="text-white/70">docs/PRODUCT_PACKAGE.md</span>.
                Media roles:{" "}
                <span className="text-white/70">docs/ASSET_PIPELINE.md</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/45">
                Ready {ready.length}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/45">
                Missing PDF {missing.length}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/45">
                Opaque PDF names
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-0 sm:grid-cols-3">
          <VaultStat
            label="Publish media"
            value="Preview · Thumb · Poster"
            hint="Admin → Products → Preview media"
          />
          <VaultStat
            label="Buyer pack"
            value="Client HD · Poster · PDF"
            hint="Never use storefront capture as B-roll"
          />
          <VaultStat
            label="Golden rule"
            value={golden ? golden.brand : "—"}
            hint={
              golden?.pdfHref
                ? "Clone layout for next SKUs"
                : "Generate Meridian first"
            }
          />
        </div>
      </div>

      {golden && (
        <>
          <AdminSectionTitle
            title="Golden rule"
            subtitle="Approved layout template — Meridian first package"
          />
          <div className="mb-10">
            <PackageCard p={golden} featured />
          </div>
        </>
      )}

      <AdminSectionTitle
        title="All packages"
        subtitle="Review status, open PDF, check publish completeness"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {PRODUCT_PACKAGES.map((p) => (
          <PackageCard key={p.productId} p={p} />
        ))}
      </div>

      <div className="mt-10 rounded-[16px] border border-white/[0.06] bg-black/25 p-5">
        <p className={cn(syne.className, "text-[13px] font-bold text-white/80")}>
          Operator notes
        </p>
        <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-white/40">
          <li>
            · Regenerate all flagship PDFs:{" "}
            <code className="text-white/55">
              python scripts/generate-product-package-pdf.py
            </code>
          </li>
          <li>
            · Filenames:{" "}
            <code className="text-white/55">
              {"{Product}-package-{OpaqueId}[-PaidSalt].pdf"}
            </code>{" "}
            (not guessable from slug). Brand: ClickMotion. Protocol:{" "}
            <code className="text-white/55">PRODUCTION_READY_CHECKLIST.md</code>
          </li>
          <li>
            · Client HD ≠ storefront preview. Never point package video links at
            *-preview* captures.
          </li>
          <li>
            · If the SKU appears on /backgrounds: encode small file (
            <code className="text-white/55">npm run encode:backgrounds</code>
            ), set <code className="text-white/55">backgroundsPreview</code>,
            register tile in backgrounds.ts, confirm Admin → Backgrounds.
          </li>
          <li>
            · Product page CTAs stay Get Full Prompt — PDF is the pack manual.
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin/backgrounds"
            className="text-[12px] font-medium text-white/50 transition hover:text-white/80"
          >
            Backgrounds feed →
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
      <p className="mt-1.5 text-[13px] font-medium text-white/85">{value}</p>
      <p className="mt-1 text-[11px] text-white/35">{hint}</p>
    </div>
  );
}

function PackageCard({
  p,
  featured,
}: {
  p: ProductPackageEntry;
  featured?: boolean;
}) {
  const paid = p.tier !== "free";
  const checks = [
    { ok: p.checklist.previewVideo, label: "Preview video", path: p.previewVideo },
    { ok: p.checklist.thumbnail, label: "Thumbnail", path: p.thumbnail },
    { ok: p.checklist.poster, label: "Poster", path: p.poster },
    { ok: p.checklist.clientHd, label: "Client HD", path: p.clientHd },
    { ok: p.checklist.packagePdf, label: "Package PDF", path: p.pdfHref },
    {
      ok: Boolean(p.checklist.backgroundsPreview && p.backgroundsPreview),
      label: "Backgrounds (small)",
      path: p.backgroundsPreview,
    },
  ];
  // Sale-ready core ignores optional backgrounds; card “complete” includes bg when registered
  const complete =
    p.checklist.previewVideo &&
    p.checklist.thumbnail &&
    p.checklist.poster &&
    p.checklist.clientHd &&
    p.checklist.packagePdf;

  return (
    <AdminCard
      className={cn(
        "flex flex-col gap-4 p-5",
        featured && "border-amber-500/20 shadow-[0_0_0_1px_rgba(201,166,107,0.12)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                syne.className,
                "relative text-[16px] font-bold tracking-tight text-white"
              )}
            >
              {p.brand}
              {paid && (
                <Crown
                  className="absolute -right-4 top-0 h-3.5 w-3.5 -translate-y-0.5 text-amber-300/90"
                  aria-label="Paid"
                />
              )}
            </h3>
            <AdminBadge tone={STATUS_TONE[p.status]}>{p.status}</AdminBadge>
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200/90">
                <Sparkles className="h-3 w-3" />
                Template
              </span>
            )}
          </div>
          <p className="mt-1 text-[12.5px] text-white/45">{p.title}</p>
          <p className="mt-0.5 font-mono text-[10px] text-white/25">
            {p.productId}
            {p.version ? ` · v${p.version}` : ""}
            {p.opaqueId ? ` · opaque ${p.opaqueId}` : ""}
            {p.paidSalt ? `-${p.paidSalt}` : ""}
          </p>
        </div>
        <AdminBadge tone={paid ? "warn" : "muted"}>{p.tier}</AdminBadge>
      </div>

      {p.notes && (
        <p className="text-[12px] leading-relaxed text-white/40">{p.notes}</p>
      )}

      {/* Publish checklist */}
      <div className="rounded-[12px] border border-white/[0.06] bg-black/30 px-3 py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
            Publish completeness
          </p>
          {complete ? (
            <span className="text-[10px] font-medium text-emerald-400/80">
              Sale ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-200/70">
              <AlertCircle className="h-3 w-3" />
              Gaps
            </span>
          )}
        </div>
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {checks.map((c) => (
            <li
              key={c.label}
              className={cn(
                "flex items-center gap-1.5 text-[11px]",
                c.ok ? "text-white/55" : "text-white/28"
              )}
            >
              {c.ok ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400/70" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-white/20" />
              )}
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {p.pdfHref ? (
          <a
            href={p.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-[12px] border border-white/12 bg-white/[0.06] px-3.5 py-2",
              "text-[12.5px] font-medium text-white transition hover:bg-white/[0.1]"
            )}
          >
            <FileText className="h-3.5 w-3.5 text-amber-200/80" />
            Open package PDF
            <ExternalLink className="h-3 w-3 text-white/35" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-[12px] border border-dashed border-white/10 px-3.5 py-2 text-[12.5px] text-white/30">
            <FileText className="h-3.5 w-3.5" />
            PDF not generated
          </span>
        )}
        <Link
          href={`/admin/products/${p.productId}`}
          className="inline-flex items-center gap-2 rounded-[12px] border border-white/[0.08] px-3.5 py-2 text-[12.5px] text-white/45 transition hover:border-white/14 hover:text-white/70"
        >
          CMS product
        </Link>
        {p.backgroundsPreview && (
          <Link
            href="/admin/backgrounds"
            className="inline-flex items-center gap-2 rounded-[12px] border border-white/[0.08] px-3.5 py-2 text-[12.5px] text-white/45 transition hover:border-white/14 hover:text-white/70"
          >
            Backgrounds feed
          </Link>
        )}
      </div>

      {p.backgroundsPreview && (
        <p className="font-mono text-[10px] leading-relaxed text-white/25 break-all">
          backgrounds: {p.backgroundsPreview}
        </p>
      )}
      {p.pdfRepoPath && (
        <p className="font-mono text-[10px] leading-relaxed text-white/25 break-all">
          {p.pdfRepoPath}
        </p>
      )}
      {p.brandPlaceholders && (
        <p className="text-[10.5px] text-amber-200/50">
          Brand placeholders active — replace before public customer delivery
          if shipping under final brand.
        </p>
      )}
    </AdminCard>
  );
}
