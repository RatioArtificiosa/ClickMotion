"use client";

import { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortableItem = { id: string };

/**
 * Premium HTML5 drag-reorder list (no extra deps).
 */
export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  className,
}: {
  items: T[];
  onReorder: (orderedIds: string[]) => void | Promise<void>;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}) {
  const [list, setList] = useState(items);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setList(items);
  }, [items]);

  function reorder(fromId: string, toId: string, source: T[]): T[] {
    if (fromId === toId) return source;
    const next = [...source];
    const from = next.findIndex((x) => x.id === fromId);
    const to = next.findIndex((x) => x.id === toId);
    if (from < 0 || to < 0) return source;
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  }

  return (
    <ul className={cn("space-y-2", className)}>
      {list.map((item, index) => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => {
            setDragId(item.id);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", item.id);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (overId !== item.id) setOverId(item.id);
          }}
          onDragLeave={() => {
            if (overId === item.id) setOverId(null);
          }}
          onDrop={async (e) => {
            e.preventDefault();
            const fromId = e.dataTransfer.getData("text/plain") || dragId;
            if (!fromId) return;
            const prev = list;
            const next = reorder(fromId, item.id, list);
            if (next === prev) {
              setDragId(null);
              setOverId(null);
              return;
            }
            setList(next);
            setDragId(null);
            setOverId(null);
            setSaving(true);
            try {
              await onReorder(next.map((x) => x.id));
            } catch {
              // API failed — roll UI back to last known good order
              setList(prev);
            } finally {
              setSaving(false);
            }
          }}
          onDragEnd={() => {
            setDragId(null);
            setOverId(null);
          }}
          className={cn(
            "group flex items-stretch gap-1 rounded-[16px] border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200",
            dragId === item.id && "scale-[0.99] opacity-45",
            overId === item.id &&
              dragId &&
              dragId !== item.id &&
              "border-white/28 bg-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
            saving && "pointer-events-none"
          )}
        >
          <div
            className="flex cursor-grab items-center px-2.5 text-white/22 transition group-hover:text-white/40 active:cursor-grabbing"
            title="Drag to reorder"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1 py-3 pr-3">{renderItem(item, index)}</div>
        </li>
      ))}
    </ul>
  );
}
