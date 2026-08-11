"use client";

import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

/** Shared premium surfaces for the admin OS. */

export function AdminCard({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-white/[0.07]",
        "bg-gradient-to-b from-white/[0.045] to-white/[0.015]",
        "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_20px_50px_rgba(0,0,0,0.35)]",
        glow &&
          "before:pointer-events-none before:absolute before:inset-x-8 before:-top-px before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-[11.5px] font-medium tracking-wide text-white/45", className)}>
      {children}
    </label>
  );
}

export const adminInputClass =
  "mt-1.5 w-full rounded-[12px] border border-white/[0.09] bg-black/45 px-3 py-2.5 text-[13.5px] text-white outline-none transition placeholder:text-white/25 focus:border-white/22 focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]";

export function AdminBtn({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "secondary";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-[12px] px-3.5 py-2 text-[13px] font-semibold transition disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" &&
          "bg-white text-black shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_24px_rgba(0,0,0,0.35)] hover:bg-white/92 active:scale-[0.98]",
        variant === "secondary" &&
          "border border-white/12 bg-white/[0.06] text-white/90 hover:bg-white/[0.1]",
        variant === "ghost" && "text-white/50 hover:bg-white/[0.05] hover:text-white/85",
        variant === "danger" &&
          "border border-rose-500/25 bg-rose-500/10 text-rose-200 hover:bg-rose-500/18",
        className
      )}
      {...props}
      // Default type=button so Cancel/etc. never accidentally submit forms;
      // explicit type=submit in props still wins when passed first… reassert after spread.
      type={props.type ?? "button"}
    >
      {children}
    </button>
  );
}

export function AdminSectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className={cn(syne.className, "text-[15px] font-bold tracking-tight text-white")}>
        {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-[12.5px] text-white/38">{subtitle}</p>}
    </div>
  );
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <AdminCard className="px-6 py-16 text-center" glow>
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-white/35">
        <span className="text-lg">◇</span>
      </div>
      <p className={cn(syne.className, "text-[16px] font-bold text-white/85")}>{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/38">
        {description}
      </p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </AdminCard>
  );
}

export function AdminBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "live" | "warn" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide",
        tone === "live" && "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20",
        tone === "warn" && "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/20",
        tone === "muted" && "bg-white/8 text-white/40 ring-1 ring-white/10",
        tone === "neutral" && "bg-white/10 text-white/55 ring-1 ring-white/10"
      )}
    >
      {children}
    </span>
  );
}

export function AdminStatBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px]">
        <span className="text-white/40">{label}</span>
        <span className="tabular-nums text-white/55">
          {value}/{max} · {pct}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-white/50 to-white/80 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
