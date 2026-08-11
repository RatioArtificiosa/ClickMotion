"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Layers,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Library,
  FileText,
  Film,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/packages", label: "Product packages", icon: FileText },
  { href: "/admin/backgrounds", label: "Backgrounds", icon: Film },
  { href: "/admin/designs", label: "Original designs", icon: Library },
  { href: "/admin/genres", label: "Genres", icon: Tags },
  { href: "/admin/collections", label: "Collections", icon: Layers },
];

export function AdminShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <>
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[11px] text-[11px] font-bold tracking-tighter text-white"
          style={{
            background: "linear-gradient(155deg, #3a3a44 0%, #1a1a22 52%, #0c0c10 100%)",
            border: "0.5px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.4)",
          }}
        >
          MS
        </span>
        <div className="leading-tight">
          <div className={cn(syne.className, "text-[14px] font-bold tracking-tight")}>
            Control
          </div>
          <div className="text-[10px] font-medium tracking-wide text-white/35">
            Content OS
          </div>
        </div>
        <button
          type="button"
          className="ml-auto rounded-[10px] p-2 text-white/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
          Library
        </p>
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[13px] font-medium transition",
                active
                  ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "text-white/48 hover:bg-white/[0.045] hover:text-white/85"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-white/70" />
              )}
              <Icon
                className={cn("h-4 w-4", active ? "opacity-100" : "opacity-70")}
                aria-hidden
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/[0.06] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[13px] text-white/42 transition hover:bg-white/[0.04] hover:text-white/80"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          View site
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-left text-[13px] text-white/42 transition hover:bg-rose-500/10 hover:text-rose-300"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh bg-[#060608] text-white">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 500px at 10% -10%, rgba(120,120,160,0.12), transparent 55%), radial-gradient(700px 400px at 90% 0%, rgba(80,100,140,0.08), transparent 50%)",
        }}
      />

      <div className="relative flex min-h-dvh">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 z-20 hidden h-dvh w-[248px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0e]/95 backdrop-blur-xl lg:flex">
          {nav}
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-[270px] flex-col border-r border-white/[0.08] bg-[#0c0c12] shadow-2xl">
              {nav}
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#060608]/85 px-4 py-3.5 backdrop-blur-2xl sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-[11px] border border-white/10 bg-white/[0.04] p-2 text-white/60 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                {title && (
                  <h1
                    className={cn(
                      syne.className,
                      "truncate text-[1.2rem] font-extrabold tracking-tight sm:text-[1.3rem]"
                    )}
                  >
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-0.5 truncate text-[12px] text-white/38 sm:text-[12.5px]">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {actions}
              <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/[0.09] px-2.5 py-1 text-[11px] font-medium text-emerald-300/95 sm:inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>
          </header>
          <main className="relative flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
