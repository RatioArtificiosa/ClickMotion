"use client";

import { useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { categories, promptTypes } from "@/config/taxonomy";
import { cn } from "@/lib/utils";

/** Motionsites-style horizontal chip filters + sort/pricing. Glass selected state only. */
export function FilterChips({ className }: { className?: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const type = sp.get("type") ?? "";
  const category = sp.get("category") ?? "";
  const sort = sp.get("sort") ?? "recent";

  const setParam = useCallback(
    (key: string, value: string, clearKeys: string[] = []) => {
      const params = new URLSearchParams(sp.toString());
      for (const k of clearKeys) params.delete(k);
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.push(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, sp]
  );

  const isAll = !type && !category;

  const chipBase =
    "shrink-0 inline-flex items-center h-8 px-3.5 text-[13px] font-medium tracking-tight transition-[background,color,border-color,box-shadow] duration-160 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const chipIdle =
    "border-transparent bg-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/[0.05]";
  const chipActive =
    "border-[var(--hairline)] bg-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter prompts"
      >
        <button
          type="button"
          role="tab"
          aria-selected={isAll}
          className={cn(chipBase, isAll ? chipActive : chipIdle)}
          onClick={() => {
            const params = new URLSearchParams(sp.toString());
            params.delete("type");
            params.delete("category");
            const qs = params.toString();
            router.push(qs ? `?${qs}` : "?", { scroll: false });
          }}
        >
          All
        </button>

        {promptTypes.map((t) => {
          const active = type === t.id && !category;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(chipBase, active ? chipActive : chipIdle)}
              onClick={() => setParam("type", t.id, ["category"])}
            >
              {t.label}
            </button>
          );
        })}

        <span className="mx-1 h-4 w-px shrink-0 bg-white/[0.08]" aria-hidden />

        {categories.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(chipBase, active ? chipActive : chipIdle)}
              onClick={() => setParam("category", c.id, ["type"])}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <label className="relative">
          <span className="sr-only">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "recent" ? "" : e.target.value)}
            className={cn(
              chipBase,
              chipIdle,
              "appearance-none cursor-pointer pr-7 bg-[var(--elevated)] border-[var(--hairline)]"
            )}
          >
            <option value="recent">Discover</option>
            <option value="oldest">Catalog order</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-quaternary)]" />
        </label>
      </div>
    </div>
  );
}
