"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import type { CmsCollection, CmsProduct } from "@/lib/cms/types";
import { SortableList } from "./SortableList";
import { adminFetch } from "./admin-api";
import toast from "react-hot-toast";

export function CollectionsAdminClient({
  collections,
  products,
}: {
  collections: CmsCollection[];
  products: CmsProduct[];
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editIds, setEditIds] = useState<string[]>([]);

  async function onReorder(orderedIds: string[]) {
    try {
      await adminFetch("/api/admin/collections/reorder", {
        method: "POST",
        body: JSON.stringify({ orderedIds }),
      });
      toast.success("Order saved");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reorder failed");
      throw e; // SortableList rolls back optimistic order
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await adminFetch("/api/admin/collections", {
        method: "POST",
        body: JSON.stringify({ title, description, productIds: [] }),
      });
      toast.success("Collection created");
      setTitle("");
      setDescription("");
      setAdding(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Create failed");
    }
  }

  async function onSaveEdit(id: string) {
    try {
      await adminFetch(`/api/admin/collections/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editTitle,
          description: editDesc,
          productIds: editIds,
        }),
      });
      toast.success("Saved");
      setEditId(null);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function onDelete(c: CmsCollection) {
    if (!confirm(`Delete collection "${c.title}"?`)) return;
    try {
      await adminFetch(`/api/admin/collections/${c.id}`, { method: "DELETE" });
      toast.success("Deleted");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  function toggleProduct(id: string) {
    setEditIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-[12px] bg-white px-3.5 py-2 text-[13px] font-semibold text-black"
        >
          <Plus className="h-4 w-4" />
          New collection
        </button>
      </div>

      {adding && (
        <form
          onSubmit={onCreate}
          className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="rounded-[12px] border border-white/10 bg-black/40 px-3 py-2 text-[13px] text-white outline-none"
              autoFocus
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="rounded-[12px] border border-white/10 bg-black/40 px-3 py-2 text-[13px] text-white outline-none"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="rounded-[10px] bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="rounded-[10px] px-3 py-1.5 text-[12px] text-white/50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <SortableList
        items={collections}
        onReorder={onReorder}
        renderItem={(c) =>
          editId === c.id ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="min-w-[160px] flex-1 rounded-[10px] border border-white/15 bg-black/50 px-2 py-1.5 text-[13px]"
                />
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="min-w-[200px] flex-[2] rounded-[10px] border border-white/15 bg-black/50 px-2 py-1.5 text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => void onSaveEdit(c.id)}
                  className="rounded-[8px] p-1.5 text-emerald-300"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="rounded-[8px] p-1.5 text-white/40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
                {products.map((p) => {
                  const on = editIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleProduct(p.id)}
                      className={
                        on
                          ? "rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black"
                          : "rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/45"
                      }
                    >
                      {p.title.slice(0, 28)}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold">{c.title}</div>
                <p className="truncate text-[12px] text-white/35">
                  {c.productIds.length} products · /{c.slug}
                  {c.isFeatured ? " · featured" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditId(c.id);
                  setEditTitle(c.title);
                  setEditDesc(c.description);
                  setEditIds([...c.productIds]);
                }}
                className="rounded-[10px] p-2 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => void onDelete(c)}
                className="rounded-[10px] p-2 text-white/40 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )
        }
      />
    </div>
  );
}
