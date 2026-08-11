"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  CmsGenre,
  CmsProduct,
  ProductType,
  PriceTier,
  MotionIntensity,
} from "@/lib/cms/types";
import { adminFetch, uploadFile } from "./admin-api";
import {
  AdminCard,
  AdminLabel,
  AdminBtn,
  adminInputClass,
  AdminBadge,
} from "./admin-ui";
import toast from "react-hot-toast";
import {
  Upload,
  Film,
  CheckCircle2,
  Circle,
  ExternalLink,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { cn, syne } from "./form-utils";
import { isVideoUrl } from "@/lib/media-url";
import { MediaFill } from "@/components/media/MediaFill";
import { packageByProductId, isPackageSaleReady } from "@/lib/product-packages";
import { ownerDesignById } from "@/lib/owner-designs";
import {
  backgroundsForProduct,
  backgroundsPreviewForProduct,
  isBackgroundsRolePath,
} from "@/config/backgrounds";

const TYPES: ProductType[] = ["hero", "section", "landing-page", "special"];
const TIERS: PriceTier[] = ["free", "starter", "pro", "agency"];
const INTENSITY: MotionIntensity[] = ["subtle", "medium", "aggressive", "extreme"];

type FormState = {
  title: string;
  slug: string;
  description: string;
  type: ProductType;
  genreId: string;
  styleTags: string;
  motionIntensity: MotionIntensity;
  difficulty: CmsProduct["difficulty"];
  priceTier: PriceTier;
  status: CmsProduct["status"];
  body: string;
  thumbnail: string;
  poster: string;
  previewVideo: string;
  aiTools: string;
};

function fromProduct(p?: CmsProduct | null, genres: CmsGenre[] = []): FormState {
  return {
    title: p?.title ?? "",
    slug: p?.slug ?? "",
    description: p?.description ?? "",
    type: p?.type ?? "hero",
    genreId: p?.genreId ?? genres[0]?.id ?? "",
    styleTags: (p?.styleTags ?? []).join(", "),
    motionIntensity: p?.motionIntensity ?? "medium",
    difficulty: p?.difficulty ?? "intermediate",
    priceTier: p?.priceTier ?? "pro",
    status: p?.status ?? "published",
    body: p?.body ?? "## Design\n\n",
    thumbnail: p?.thumbnail ?? "",
    poster: p?.poster ?? "",
    previewVideo: p?.previewVideo ?? "",
    aiTools: (
      p?.aiTools ?? [
        "Cursor",
        "Claude",
        "Grok Build",
        "Lovable",
        "Codex",
        "Bolt",
      ]
    ).join(", "),
  };
}

/** Accept stills + looping motion (gif / mp4 / webm) for thumbnail & poster. */
const ACCEPT_MOTION_MEDIA =
  "image/*,video/mp4,video/webm,image/gif,.mp4,.webm,.gif,.webp,.png,.jpg,.jpeg";
const ACCEPT_VIDEO = "video/mp4,video/webm,.mp4,.webm";

function MediaDrop({
  label,
  hint,
  accept,
  value,
  field,
  uploading,
  onUpload,
  onChange,
  kind,
}: {
  label: string;
  hint?: string;
  accept: string;
  value: string;
  field: "previewVideo" | "thumbnail" | "poster";
  uploading: string | null;
  onUpload: (file: File | null, field: "previewVideo" | "thumbnail" | "poster") => void;
  onChange: (v: string) => void;
  /** video = mp4 only; media = image + looping gif/mp4 */
  kind: "video" | "media";
}) {
  const [over, setOver] = useState(false);
  const showVideo = Boolean(value) && (kind === "video" || isVideoUrl(value));

  return (
    <div>
      <div className="mb-1.5 text-[11px] font-medium tracking-wide text-white/45">{label}</div>
      {hint && <p className="mb-1.5 text-[10.5px] leading-snug text-white/28">{hint}</p>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onUpload(f, field);
        }}
        className={cn(
          "relative overflow-hidden rounded-[14px] border border-dashed transition",
          over
            ? "border-white/40 bg-white/[0.07]"
            : "border-white/12 bg-black/30 hover:border-white/20"
        )}
      >
        {value ? (
          <div className="aspect-video w-full">
            {showVideo ? (
              <video
                src={value}
                muted
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-1.5 text-white/30">
            {kind === "video" ? <Film className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
            <span className="px-2 text-center text-[11px]">
              {kind === "video" ? "Drop mp4 / webm" : "Image, gif, or looping mp4"}
            </span>
          </div>
        )}
        <label className="absolute bottom-2 right-2 inline-flex cursor-pointer items-center gap-1 rounded-[9px] border border-white/15 bg-black/65 px-2 py-1 text-[10.5px] font-medium text-white/80 backdrop-blur-md hover:bg-black/80">
          <Upload className="h-3 w-3" />
          {uploading === field ? "…" : "File"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={!!uploading}
            onChange={(e) => onUpload(e.target.files?.[0] ?? null, field)}
          />
        </label>
      </div>
      <input
        className={adminInputClass + " mt-2 !py-2 text-[12px]"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          kind === "video"
            ? "/assets/videos/… or /uploads/…"
            : "/thumbnails/… · .gif · .mp4"
        }
      />
    </div>
  );
}

export function ProductForm({
  product,
  genres,
}: {
  product?: CmsProduct | null;
  genres: CmsGenre[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(() => fromProduct(product, genres));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const genreLabel = genres.find((g) => g.id === form.genreId)?.label ?? form.genreId;
  const pack = product?.id ? packageByProductId(product.id) : undefined;
  const owner = product?.id ? ownerDesignById(product.id) : undefined;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onUpload(
    file: File | null,
    field: "previewVideo" | "thumbnail" | "poster"
  ) {
    if (!file) return;
    setUploading(field);
    try {
      const { url } = await uploadFile(file);
      set(field, url);
      if (field === "thumbnail" && !form.poster) set("poster", url);
      toast.success("Media uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined,
        description: form.description,
        type: form.type,
        genreId: form.genreId,
        styleTags: form.styleTags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        motionIntensity: form.motionIntensity,
        difficulty: form.difficulty,
        priceTier: form.priceTier,
        status: form.status,
        body: form.body,
        thumbnail: form.thumbnail,
        poster: form.poster || form.thumbnail,
        previewVideo: form.previewVideo,
        aiTools: form.aiTools
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (product?.id) {
        await adminFetch(`/api/admin/products/${product.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        toast.success("Saved - live on site if published");
      } else {
        const res = await adminFetch<{ product: CmsProduct }>("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Product created");
        router.push(`/admin/products/${res.product.id}`);
      }
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative pb-24">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <AdminCard className="space-y-4 p-5" glow>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminLabel>
                Title *
                <input
                  className={adminInputClass}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  required
                />
              </AdminLabel>
              <AdminLabel>
                Slug
                <input
                  className={adminInputClass}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="auto-from-title"
                />
              </AdminLabel>
            </div>
            <AdminLabel>
              Description
              <textarea
                className={adminInputClass + " min-h-[76px]"}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </AdminLabel>
            <div className="grid gap-4 sm:grid-cols-3">
              <AdminLabel>
                Type
                <select
                  className={adminInputClass}
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as ProductType)}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </AdminLabel>
              <AdminLabel>
                Genre
                <select
                  className={adminInputClass}
                  value={form.genreId}
                  onChange={(e) => set("genreId", e.target.value)}
                  required
                >
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </AdminLabel>
              <AdminLabel>
                Status
                <select
                  className={adminInputClass}
                  value={form.status}
                  onChange={(e) => set("status", e.target.value as CmsProduct["status"])}
                >
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                  <option value="review">review</option>
                  <option value="archived">archived</option>
                </select>
              </AdminLabel>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <AdminLabel>
                Price tier
                <select
                  className={adminInputClass}
                  value={form.priceTier}
                  onChange={(e) => set("priceTier", e.target.value as PriceTier)}
                >
                  {TIERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </AdminLabel>
              <AdminLabel>
                Motion
                <select
                  className={adminInputClass}
                  value={form.motionIntensity}
                  onChange={(e) =>
                    set("motionIntensity", e.target.value as MotionIntensity)
                  }
                >
                  {INTENSITY.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </AdminLabel>
              <AdminLabel>
                Difficulty
                <select
                  className={adminInputClass}
                  value={form.difficulty}
                  onChange={(e) =>
                    set("difficulty", e.target.value as CmsProduct["difficulty"])
                  }
                >
                  {["beginner", "intermediate", "advanced", "expert"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </AdminLabel>
            </div>
            <AdminLabel>
              Style tags
              <input
                className={adminInputClass}
                value={form.styleTags}
                onChange={(e) => set("styleTags", e.target.value)}
                placeholder="minimal, brutalist"
              />
            </AdminLabel>
            <AdminLabel>
              AI tools line
              <input
                className={adminInputClass}
                value={form.aiTools}
                onChange={(e) => set("aiTools", e.target.value)}
              />
            </AdminLabel>
          </AdminCard>

          {(pack || owner) && (
            <ProductionReadinessCard
              productId={product?.id}
              form={form}
              pack={pack}
              owner={owner}
            />
          )}

          <AdminCard className="p-5" glow>
            <h3 className={cn(syne.className, "text-[14px] font-bold")}>
              Preview media (storefront only)
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-white/35">
              <span className="text-white/55">Preview video</span> is the full{" "}
              <strong className="font-medium text-white/50">design capture</strong> for the
              product page and gallery (muted, looping, non-interactive). Never use client HD
              B-roll here.{" "}
              <span className="text-white/55">Thumbnail</span> is the gallery card face.{" "}
              <span className="text-white/55">Poster</span> is the product-page still while video
              loads. If poster is empty, thumbnail is used. Full gate:{" "}
              <span className="text-white/50">docs/PRODUCTION_READY_CHECKLIST.md</span>.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <MediaDrop
                label="Preview video"
                hint="Full design capture · product page hero"
                accept={ACCEPT_VIDEO}
                value={form.previewVideo}
                field="previewVideo"
                kind="video"
                uploading={uploading}
                onUpload={onUpload}
                onChange={(v) => set("previewVideo", v)}
              />
              <MediaDrop
                label="Thumbnail"
                hint="Gallery card · image / gif / mp4 loop"
                accept={ACCEPT_MOTION_MEDIA}
                value={form.thumbnail}
                field="thumbnail"
                kind="media"
                uploading={uploading}
                onUpload={onUpload}
                onChange={(v) => set("thumbnail", v)}
              />
              <MediaDrop
                label="Poster"
                hint="Product page fallback · image / gif / mp4"
                accept={ACCEPT_MOTION_MEDIA}
                value={form.poster}
                field="poster"
                kind="media"
                uploading={uploading}
                onUpload={onUpload}
                onChange={(v) => set("poster", v)}
              />
            </div>
          </AdminCard>

          {(pack?.clientHd || owner?.broll) && (
            <AdminCard className="p-5" glow>
              <h3 className={cn(syne.className, "text-[14px] font-bold")}>
                Client HD (buyer pack · immutable)
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-white/35">
                Clean film for the sold prompt and package PDF. No burnt UI. Do not overwrite
                in place. Registry (not editable here):
              </p>
              <code className="mt-3 block break-all rounded-[10px] border border-white/[0.08] bg-black/40 px-3 py-2 font-mono text-[11px] text-emerald-200/80">
                {pack?.clientHd || owner?.broll}
              </code>
              {pack?.pdfHref && (
                <p className="mt-3 text-[12px] text-white/40">
                  Package PDF:{" "}
                  <a
                    href={pack.pdfHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 underline-offset-2 hover:underline"
                  >
                    {pack.pdfHref}
                  </a>
                </p>
              )}
            </AdminCard>
          )}

          <AdminCard className="p-5" glow>
            <AdminLabel>
              Prompt body (markdown)
              <textarea
                className={adminInputClass + " min-h-[260px] font-mono text-[12.5px] leading-relaxed"}
                value={form.body}
                onChange={(e) => set("body", e.target.value)}
              />
            </AdminLabel>
          </AdminCard>
        </div>

        {/* Live meta preview */}
        <aside className="xl:sticky xl:top-24 xl:self-start">
          <AdminCard className="overflow-hidden p-0" glow>
            <div className="relative aspect-[16/11] bg-black">
              {form.previewVideo || form.poster || form.thumbnail ? (
                <MediaFill
                  src={form.previewVideo || form.poster || form.thumbnail}
                  className="absolute inset-0"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[12px] text-white/25">
                  Preview
                </div>
              )}
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className={cn(syne.className, "text-[1.05rem] font-extrabold leading-tight")}>
                  {form.title || "Untitled product"}
                </h3>
                <AdminBadge tone={form.status === "published" ? "live" : "muted"}>
                  {form.status}
                </AdminBadge>
              </div>
              <p className="text-[12px] text-white/40">
                {form.type.replace(/-/g, " ")} · {genreLabel}
              </p>
              <p className="line-clamp-3 text-[12px] leading-relaxed text-white/30">
                {form.description || "Description appears here."}
              </p>
              <p className="pt-1 text-[10.5px] text-white/25">
                · {form.aiTools || "Tools"} ·
              </p>
            </div>
          </AdminCard>
        </aside>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.07] bg-[#060608]/92 px-4 py-3 backdrop-blur-xl lg:left-[248px]">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3">
          <button
            type="submit"
            disabled={saving || !form.title.trim()}
            className="inline-flex items-center justify-center gap-1.5 rounded-[12px] bg-white px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_24px_rgba(0,0,0,0.35)] transition hover:bg-white/92 disabled:opacity-40"
          >
            {saving ? "Saving…" : product ? "Save changes" : "Create product"}
          </button>
          <AdminBtn variant="ghost" onClick={() => router.push("/admin/products")}>
            Cancel
          </AdminBtn>
          {product && (
            <a
              href={`/browse/${product.slug}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[12px] font-medium text-white/40 hover:text-white/75"
            >
              View public →
            </a>
          )}
        </div>
      </div>
    </form>
  );
}

function ProductionReadinessCard({
  productId,
  form,
  pack,
  owner,
}: {
  productId?: string;
  form: FormState;
  pack: ReturnType<typeof packageByProductId>;
  owner: ReturnType<typeof ownerDesignById>;
}) {
  const formPreview = Boolean(form.previewVideo?.trim());
  const formThumb = Boolean(form.thumbnail?.trim());
  const formPoster = Boolean(form.poster?.trim() || form.thumbnail?.trim());
  const clientOk = Boolean(pack?.clientHd || owner?.broll);
  const pdfOk = Boolean(pack?.pdfHref && pack.checklist.packagePdf);
  const saleReady = pack ? isPackageSaleReady(pack) : false;
  const bgFromCatalog = productId
    ? backgroundsPreviewForProduct(productId)
    : undefined;
  const bgTiles = productId ? backgroundsForProduct(productId) : [];
  const bgPath =
    pack?.backgroundsPreview ||
    owner?.backgroundsPreview ||
    bgFromCatalog;
  const bgOnLibrary = bgTiles.length > 0 || Boolean(bgPath);
  const bgOk =
    !bgOnLibrary ||
    Boolean(
      bgPath &&
        isBackgroundsRolePath(bgPath) &&
        (pack?.checklist.backgroundsPreview || bgFromCatalog)
    );
  const rows: { ok: boolean; label: string; detail?: string }[] = [
    {
      ok: formPreview,
      label: "Storefront preview video",
      detail: form.previewVideo || pack?.previewVideo || "Missing",
    },
    {
      ok: formThumb,
      label: "Thumbnail",
      detail: form.thumbnail || pack?.thumbnail || "Missing",
    },
    {
      ok: formPoster,
      label: "Poster",
      detail: form.poster || form.thumbnail || pack?.poster || "Missing",
    },
    {
      ok: clientOk,
      label: "Client HD (buyer B-roll)",
      detail: pack?.clientHd || owner?.broll || "Not in vault registry",
    },
    {
      ok: pdfOk,
      label: "Product package PDF",
      detail: pack?.pdfHref || "Missing package",
    },
    {
      ok: bgOk,
      label: bgOnLibrary
        ? "Backgrounds library (small encode)"
        : "Backgrounds library",
      detail: bgOnLibrary
        ? bgPath || "Listed but missing small encode path"
        : "Not listed on /backgrounds (OK)",
    },
  ];
  // Sale gate = core media; backgrounds row must be green if listed
  const allOk =
    formPreview &&
    formThumb &&
    formPoster &&
    clientOk &&
    pdfOk &&
    bgOk;

  return (
    <AdminCard className="p-5" glow>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className={cn(syne.className, "text-[14px] font-bold")}>
            Production readiness
          </h3>
          <p className="mt-1 text-[12px] leading-relaxed text-white/35">
            Gate for sale: storefront media + client HD + opaque package PDF. Roles never mix.
            Protocol:{" "}
            <span className="text-white/55">docs/PRODUCTION_READY_CHECKLIST.md</span>
          </p>
        </div>
        <AdminBadge tone={allOk && saleReady ? "live" : "warn"}>
          {allOk && saleReady ? "Sale ready" : "Incomplete"}
        </AdminBadge>
      </div>

      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-start gap-2 rounded-[10px] border border-white/[0.05] bg-black/25 px-3 py-2"
          >
            {r.ok ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/90" />
            ) : (
              <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-white/80">{r.label}</p>
              <p className="mt-0.5 break-all font-mono text-[10px] text-white/30">
                {r.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {(owner?.demoHref || pack?.pdfHref) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {owner?.demoHref && (
            <a
              href={owner.demoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 hover:text-white/85"
            >
              Live demo <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {pack?.pdfHref && (
            <a
              href={pack.pdfHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 hover:text-white/85"
            >
              <FileText className="h-3 w-3" /> Open package PDF
            </a>
          )}
          <Link
            href="/admin/packages"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 hover:text-white/85"
          >
            Packages vault
          </Link>
          {bgOnLibrary && (
            <Link
              href="/admin/backgrounds"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 hover:text-white/85"
            >
              Backgrounds feed
            </Link>
          )}
        </div>
      )}

      {!allOk && (
        <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-amber-200/70">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Do not treat as sale-ready until every applicable row is green. Client HD,
          package PDF, and backgrounds small encodes are managed in registries
          (owner-designs / product-packages / backgrounds.ts) — update Admin whenever
          a product goes to production.
          {productId ? ` Product ${productId}.` : ""}
        </p>
      )}
    </AdminCard>
  );
}
