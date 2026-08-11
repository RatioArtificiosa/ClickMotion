"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import type { CmsGenre } from "@/lib/cms/types";
import { SortableList } from "./SortableList";
import { adminFetch } from "./admin-api";
import { AdminEmpty, AdminBadge, AdminBtn, adminInputClass } from "./admin-ui";
import toast from "react-hot-toast";

export function GenresAdminClient({ genres }: { genres: CmsGenre[] }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDesc, setEditDesc] = useState("");

  async function onReorder(orderedIds: string[]) {
    try {
      await adminFetch("/api/admin/genres/reorder", {
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
    if (!label.trim()) return;
    try {
      await adminFetch("/api/admin/genres", {
        method: "POST",
        body: JSON.stringify({ label, description }),
      });
      toast.success("Genre created");
      setLabel("");
      setDescription("");
      setAdding(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Create failed");
    }
  }

  async function onSaveEdit(id: string) {
    try {
      await adminFetch(`/api/admin/genres/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ label: editLabel, description: editDesc }),
      });
      toast.success("Saved");
      setEditId(null);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function onDelete(g: CmsGenre) {
    if (
      !confirm(
        `Delete genre "${g.label}"? Products in this genre will be reassigned.`
      )
    )
      return;
    try {
      await adminFetch(`/api/admin/genres/${g.id}`, { method: "DELETE" });
      toast.success("Deleted");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function toggleVisible(g: CmsGenre) {
    try {
      await adminFetch(`/api/admin/genres/${g.id}`, {
        method: "PATCH",
        body: JSON.stringify({ visible: !g.visible }),
      });
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }

  if (genres.length === 0 && !adding) {
    return (
      <AdminEmpty
        title="No genres"
        description="Genres power filters and the product meta line. Create SaaS, Health, Agency, or your own."
        action={
          <AdminBtn onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" /> New genre
          </AdminBtn>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AdminBtn onClick={() => setAdding((v) => !v)}>
          <Plus className="h-4 w-4" />
          New genre
        </AdminBtn>
      </div>

      {adding && (
        <form
          onSubmit={onCreate}
          className="rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label (e.g. Fintech)"
              className={adminInputClass + " !mt-0"}
              autoFocus
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className={adminInputClass + " !mt-0"}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="rounded-[10px] bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
            >
              Create
            </button>
            <AdminBtn variant="ghost" onClick={() => setAdding(false)}>
              Cancel
            </AdminBtn>
          </div>
        </form>
      )}

      <SortableList
        items={genres}
        onReorder={onReorder}
        renderItem={(g) =>
          editId === g.id ? (
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="min-w-[140px] flex-1 rounded-[10px] border border-white/15 bg-black/50 px-2 py-1.5 text-[13px]"
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="min-w-[180px] flex-[2] rounded-[10px] border border-white/15 bg-black/50 px-2 py-1.5 text-[13px]"
              />
              <button
                type="button"
                onClick={() => void onSaveEdit(g.id)}
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
          ) : (
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold">{g.label}</span>
                  <span className="text-[11px] text-white/30">{g.id}</span>
                  {!g.visible && <AdminBadge tone="muted">hidden</AdminBadge>}
                  {g.visible && <AdminBadge tone="live">visible</AdminBadge>}
                </div>
                <p className="truncate text-[12px] text-white/35">{g.description}</p>
              </div>
              <button
                type="button"
                onClick={() => void toggleVisible(g)}
                className="rounded-[10px] px-2 py-1 text-[11px] text-white/40 hover:bg-white/5"
              >
                {g.visible ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditId(g.id);
                  setEditLabel(g.label);
                  setEditDesc(g.description);
                }}
                className="rounded-[10px] p-2 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => void onDelete(g)}
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
