import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FolderOpen,
  Film,
  FileCode2,
  Sparkles,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminCard, AdminSectionTitle, AdminBadge } from "@/components/admin/admin-ui";
import { OWNER_DESIGNS } from "@/lib/owner-designs";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export default async function AdminOriginalDesignsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const flagship = OWNER_DESIGNS.filter((d) => d.status === "flagship");
  const scaffold = OWNER_DESIGNS.filter((d) => d.status !== "flagship");

  return (
    <AdminShell
      title="Original designs"
      subtitle="Owner vault — cleanroom builds, demos, B-roll, and sold prompts. Not client-facing."
    >
      <div className="mb-8 rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
        <p className={cn(syne.className, "text-[15px] font-bold tracking-tight text-white")}>
          Design vault
        </p>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/50">
          Every flagship product should have a live demo, a cleanroom component path, a sold
          prompt MDX, source B-roll (no UI), dual previews (page + fullscreen), and a Product
          Package PDF (Admin → Product packages). Use this board when you need the original build.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/40">
          <span className="rounded-full border border-white/10 px-2.5 py-1">Flagship {flagship.length}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1">Scaffold {scaffold.length}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1">Internal only</span>
        </div>
      </div>

      <AdminSectionTitle title="Flagship" subtitle="Ship-ready originals with demos and dual previews" />
      <div className="grid gap-4 lg:grid-cols-2">
        {flagship.map((d) => (
          <DesignCard key={d.id} d={d} />
        ))}
      </div>

      {scaffold.length > 0 && (
        <div className="mt-10">
          <AdminSectionTitle title="Scaffold / lab" subtitle="Earlier builds - promote when recaptured to flagship standard" />
          <div className="grid gap-4 lg:grid-cols-2">
            {scaffold.map((d) => (
              <DesignCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-10 text-[11px] leading-relaxed text-white/30">
        Paths are repo-relative for local work. Demo links open the live cleanroom on this
        environment. CMS product edit: Admin → Products.
      </p>
    </AdminShell>
  );
}

function DesignCard({ d }: { d: (typeof OWNER_DESIGNS)[number] }) {
  const paid = d.tier !== "free";
  return (
    <AdminCard className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                syne.className,
                "relative text-[16px] font-bold tracking-tight text-white"
              )}
            >
              {d.brand}
              {paid && (
                <Crown
                  className="absolute -right-4 top-0 h-3.5 w-3.5 -translate-y-0.5 text-amber-300/90"
                  aria-label="Paid"
                />
              )}
            </h3>
            <AdminBadge tone={d.status === "flagship" ? "live" : "muted"}>
              {d.status}
            </AdminBadge>
          </div>
          <p className="mt-1 text-[12.5px] text-white/45">{d.title}</p>
          <p className="mt-0.5 font-mono text-[10px] text-white/25">{d.id}</p>
        </div>
        <AdminBadge tone={paid ? "warn" : "muted"}>{d.tier}</AdminBadge>
      </div>

      {d.notes && (
        <p className="text-[12px] leading-relaxed text-white/40">{d.notes}</p>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        {d.demoHref && (
          <VaultLink href={d.demoHref} icon={Sparkles} label="Live original" external />
        )}
        <VaultLink
          href={`/admin/products`}
          icon={FileCode2}
          label="CMS products"
        />
        {d.previewPage && (
          <VaultLink href={d.previewPage} icon={Film} label="Page preview" external />
        )}
        {d.previewFs && (
          <VaultLink href={d.previewFs} icon={Film} label="Fullscreen preview" external />
        )}
        {d.broll && (
          <VaultLink href={d.broll} icon={Film} label="B-roll (no UI)" external />
        )}
        {d.backgroundsPreview && (
          <VaultLink
            href={d.backgroundsPreview}
            icon={Film}
            label="Backgrounds (small)"
            external
          />
        )}
        {d.packagePdf && (
          <VaultLink href={d.packagePdf} icon={FileCode2} label="Package PDF" external />
        )}
        {d.backgroundsPreview && (
          <VaultLink href="/admin/backgrounds" icon={Sparkles} label="Backgrounds admin" />
        )}
      </div>

      <div className="rounded-[12px] border border-white/[0.06] bg-black/30 px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-white/35">
        <div className="flex items-start gap-2">
          <FolderOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
          <div className="min-w-0 space-y-1 break-all">
            {d.componentPath && <div>{d.componentPath}</div>}
            <div>{d.promptPath}</div>
            {d.cleanroomPath && <div>{d.cleanroomPath}/</div>}
          </div>
        </div>
      </div>
    </AdminCard>
  );
}

function VaultLink({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group flex items-center gap-2 rounded-[11px] border border-white/[0.07] bg-white/[0.03] px-3 py-2.5",
        "text-[12px] font-medium text-white/70 transition",
        "hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-white/40 group-hover:text-white/70" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <ArrowUpRight className="h-3 w-3 shrink-0 text-white/25 group-hover:text-white/50" />
    </Link>
  );
}
