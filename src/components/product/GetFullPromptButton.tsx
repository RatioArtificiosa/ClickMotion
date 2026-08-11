"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Copy, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

/**
 * Primary product CTA — Get Full Prompt (package PDF after Google sign-in).
 * Copy icon retained. Quotas enforced server-side only (never shown here).
 */
export function GetFullPromptButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const autoTried = useRef(false);

  const packageCallbackUrl = useCallback(() => {
    const base = pathname || window.location.pathname;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("getPackage", "1");
    const q = params.toString();
    return q ? `${base}?${q}` : `${base}?getPackage=1`;
  }, [pathname, searchParams]);

  const clearGetPackageParam = useCallback(() => {
    if (!searchParams?.has("getPackage")) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("getPackage");
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname || "/", { scroll: false });
  }, [pathname, router, searchParams]);

  const download = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch(
        `/api/packages/${encodeURIComponent(productId)}/download`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        await signIn("google", {
          callbackUrl: packageCallbackUrl(),
        });
        return;
      }

      if (!res.ok) {
        try {
          const j = (await res.json()) as { code?: string; error?: string };
          const code = j.code || "";
          if (code === "PAID_REQUIRED") {
            toast.error("This product needs a paid membership.");
            window.location.href = "/pricing";
            return;
          }
          if (code === "QUOTA") {
            toast.error(j.error || "Download limit reached.");
            return;
          }
          toast.error(j.error || "Could not get package.");
        } catch {
          toast.error("Could not get package.");
        }
        return;
      }

      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") || "";
      const match = /filename="([^"]+)"/.exec(cd);
      const name = match?.[1] || `${productId}-package.pdf`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
      toast.success("Package downloaded");
      window.setTimeout(() => setDone(false), 2500);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }, [packageCallbackUrl, productId]);

  // After Google OAuth return (?getPackage=1), auto-start download once.
  useEffect(() => {
    if (autoTried.current) return;
    if (searchParams?.get("getPackage") !== "1") return;
    if (status === "loading") return;
    autoTried.current = true;
    clearGetPackageParam();
    if (status === "authenticated" && session?.user?.email) {
      void download();
    }
  }, [clearGetPackageParam, download, searchParams, session?.user?.email, status]);

  const onClick = useCallback(async () => {
    if (busy) return;
    if (status === "loading") return;

    if (!session?.user?.email) {
      setBusy(true);
      try {
        await signIn("google", {
          callbackUrl: packageCallbackUrl(),
        });
      } finally {
        setBusy(false);
      }
      return;
    }

    await download();
  }, [busy, download, packageCallbackUrl, session?.user?.email, status]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || status === "loading"}
      className={cn(
        "btn-primary w-full !min-h-12 gap-2 text-[14px]",
        className
      )}
    >
      {busy || status === "loading" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Please wait…
        </>
      ) : done ? (
        <>
          <Check className="h-4 w-4" aria-hidden />
          Downloaded
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden />
          Get Full Prompt
        </>
      )}
    </button>
  );
}
