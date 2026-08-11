"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/auth/me")
      .then((r) => r.json())
      .then((d: { authenticated?: boolean }) => {
        if (d.authenticated) router.replace("/admin");
      })
      .catch(() => {});
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#060608] px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 480px at 50% -20%, rgba(140,140,180,0.16), transparent 60%), radial-gradient(600px 400px at 80% 80%, rgba(60,80,120,0.1), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] border border-white/[0.09] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] text-[13px] font-bold tracking-tighter text-white"
            style={{
              background: "linear-gradient(155deg, #3a3a44 0%, #1a1a22 52%, #0c0c10 100%)",
              border: "0.5px solid rgba(255,255,255,0.14)",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
            }}
          >
            MS
          </div>
          <h1
            className={cn(
              syne.className,
              "text-[1.45rem] font-extrabold tracking-tight text-white"
            )}
          >
            Control room
          </h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">
            Products, genres, and collections - live on the storefront.
          </p>
        </div>

        <label className="block text-[11.5px] font-medium tracking-wide text-white/45">
          Password
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/25" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              className="w-full rounded-[13px] border border-white/10 bg-black/50 py-3 pl-10 pr-3 text-[14px] text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
              placeholder="Enter admin password"
            />
          </div>
        </label>

        {error && (
          <p
            className="mt-3 rounded-[10px] border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-[12.5px] text-rose-300"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-[13px] bg-white py-3 text-[14px] font-semibold text-black shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_12px_32px_rgba(0,0,0,0.4)] transition hover:bg-white/92 active:scale-[0.99] disabled:opacity-40"
        >
          {loading ? "Signing in…" : "Enter admin"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="mt-5 text-center text-[11px] text-white/22">
          Local default:{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-white/40">
            ms-admin-dev
          </code>
        </p>
      </form>
    </div>
  );
}
