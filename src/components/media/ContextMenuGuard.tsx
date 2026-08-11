"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * PRODUCT_LAW: block browser context menu on the public site so
 * “Save video as…” / casual media download is slightly harder.
 * Not DRM — Network tab still works. Admin is excluded for ops UX.
 */
export function ContextMenuGuard() {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;

    const onContextMenu = (e: Event) => {
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target;
      if (
        t instanceof HTMLImageElement ||
        t instanceof HTMLVideoElement ||
        (t instanceof Element && t.closest("video, img, picture, canvas"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu, { capture: true });
    document.addEventListener("dragstart", onDragStart, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("dragstart", onDragStart, {
        capture: true,
      } as EventListenerOptions);
    };
  }, [isAdmin]);

  return null;
}
