import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Package,
  Tags,
  Layers,
  ArrowRight,
  Film,
  ImageIcon,
  Plus,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { ensureCmsSeeded } from "@/lib/cms/seed";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminCard,
  AdminSectionTitle,
  AdminStatBar,
  AdminBadge,
} from "@/components/admin/admin-ui";
import { DashboardActions } from "@/components/admin/DashboardActions";
import { backgroundsVideoTiles } from "@/config/backgrounds";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const store = await ensureCmsSeeded(false);

  const products = [...store.products].sort((a, b) => a.sortOrder - b.sortOrder);
  const published = products.filter((p) => p.status === "published");
  const withVideo = products.filter((p) => Boolean(p.previewVideo)).length;
  const withThumb = products.filter((p) => Boolean(p.thumbnail || p.poster)).length;
  const recent = [...products]
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""))
    .slice(0, 5);

  const cards = [
    {
      href: "/admin/products",
      label: "Products",
      count: products.length,
      meta: `${published.length} live`,
      icon: Package,
      hint: "Heroes, sections, landing pages",
    },
    {
      href: "/admin/backgrounds",
      label: "Backgrounds",
      count: backgroundsVideoTiles().length,
      meta: "Video tiles",
      icon: Film,
      hint: "Small encodes only · /backgrounds",
    },
    {
      href: "/admin/genres",
      label: "Genres",
      count: store.genres.length,
      meta: `${store.genres.filter((g) => g.visible).length} visible`,
      icon: Tags,
      hint: "Filters & product grouping",
    },
    {
      href: "/admin/collections",
      label: "Collections",
      count: store.collections.length,
      meta: `${store.collections.filter((c) => c.isFeatured).length} featured`,
      icon: Layers,
      hint: "Storefront bundles",
    },
  ];

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Every change goes live on the public site instantly"
      actions={
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-[12px] bg-white px-3.5 py-2 text-[13px] font-semibold text-black shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] transition hover:bg-white/92"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.href} href={c.href} className="group">
              <AdminCard
                glow
                className="h-full p-5 transition duration-300 group-hover:border-white/14 group-hover:from-white/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.05] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
                </div>
                <div className={cn(syne.className, "mt-5 text-[1.75rem] font-extrabold tracking-tight")}>
                  {c.count}
                </div>
                <div className="mt-0.5 text-[14px] font-semibold text-white/90">{c.label}</div>
                <p className="mt-1 text-[12px] text-white/35">
                  {c.meta} · {c.hint}
                </p>
              </AdminCard>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <AdminCard className="p-5" glow>
          <AdminSectionTitle
            title="Media coverage"
            subtitle="Videos and stills that power product previews"
          />
          <div className="space-y-4">
            <AdminStatBar label="Preview video" value={withVideo} max={products.length || 1} />
            <AdminStatBar label="Thumbnail / poster" value={withThumb} max={products.length || 1} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/45">
              <Film className="h-3 w-3" /> {withVideo} videos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/45">
              <ImageIcon className="h-3 w-3" /> {withThumb} stills
            </span>
          </div>
        </AdminCard>

        <AdminCard className="p-5" glow>
          <AdminSectionTitle title="Quick actions" subtitle="Ops without leaving the room" />
          <DashboardActions productCount={products.length} />
        </AdminCard>
      </div>

      <AdminCard className="mt-6 p-5" glow>
        <div className="mb-4 flex items-end justify-between gap-3">
          <AdminSectionTitle title="Recently updated" subtitle="Touch these first" />
          <Link
            href="/admin/products"
            className="text-[12px] font-medium text-white/40 transition hover:text-white/75"
          >
            All products →
          </Link>
        </div>
        <ul className="divide-y divide-white/[0.05]">
          {recent.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/products/${p.id}`}
                className="flex items-center gap-3 py-3 transition hover:bg-white/[0.02]"
              >
                <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-[10px] bg-black/50 ring-1 ring-white/10">
                  {p.thumbnail || p.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumbnail || p.poster}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-semibold text-white/90">
                    {p.title}
                  </div>
                  <div className="truncate text-[11.5px] text-white/35">
                    {p.type} · /{p.slug}
                  </div>
                </div>
                <AdminBadge tone={p.status === "published" ? "live" : "muted"}>
                  {p.status}
                </AdminBadge>
              </Link>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="py-8 text-center text-[13px] text-white/35">No products yet</li>
          )}
        </ul>
      </AdminCard>
    </AdminShell>
  );
}
