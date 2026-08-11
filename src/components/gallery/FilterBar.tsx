"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, styleTags, motionIntensityLevels } from "@/config/taxonomy";
import { cn } from "@/lib/utils";

function useFilterParam(key: string) {
  const router = useRouter();
  const sp = useSearchParams();
  const value = sp.get(key) ?? "";
  const set = useCallback(
    (next: string) => {
      const params = new URLSearchParams(sp.toString());
      if (!next || next === "all") params.delete(key);
      else params.set(key, next);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, sp, key]
  );
  return [value, set] as const;
}

export function FilterBar() {
  const [category, setCategory] = useFilterParam("category");
  const [style, setStyle] = useFilterParam("style");
  const [intensity, setIntensity] = useFilterParam("intensity");
  const [type, setType] = useFilterParam("type");

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-4">
      <Select value={type || "all"} onValueChange={setType}>
        <SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="hero">Hero</SelectItem>
          <SelectItem value="section">Section</SelectItem>
          <SelectItem value="landing-page">Landing Page</SelectItem>
          <SelectItem value="special">Special</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category || "all"} onValueChange={setCategory}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={style || "all"} onValueChange={setStyle}>
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Style" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Styles</SelectItem>
          {styleTags.map((t) => (
            <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={intensity || "all"} onValueChange={setIntensity}>
        <SelectTrigger className="w-[150px]"><SelectValue placeholder="Intensity" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Intensity</SelectItem>
          {motionIntensityLevels.map((m) => (
            <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ActiveFilterChips({ className }: { className?: string }) {
  const sp = useSearchParams();
  const router = useRouter();
  const entries = Array.from(sp.entries()).filter(([k]) => ["category", "style", "intensity", "type", "q"].includes(k));
  if (entries.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {entries.map(([k, v]) => (
        <Badge key={`${k}:${v}`} variant="secondary" className="cursor-pointer gap-1 pr-1" onClick={() => {
          const p = new URLSearchParams(sp.toString());
          p.delete(k);
          router.push(`?${p.toString()}`, { scroll: false });
        }}>
          {k}: {v} <span className="ml-1 rounded-full bg-muted-foreground/20 px-1 text-[10px]">×</span>
        </Badge>
      ))}
      <Badge variant="outline" className="cursor-pointer" onClick={() => router.push("?", { scroll: false })}>Clear all</Badge>
    </div>
  );
}
