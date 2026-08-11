"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";

function LoginInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/browse";
  const error = params.get("error");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace(callbackUrl);
    }
  }, [status, session, router, callbackUrl]);

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-[var(--hairline)] bg-[var(--well)]/40 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-quaternary)]">
          {siteConfig.name}
        </p>
        <h1
          className={cn(
            syne.className,
            "mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]"
          )}
        >
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          Use Google to access your product packages and membership.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200/90">
            Sign-in failed. Check Google OAuth is configured, then try again.
          </p>
        )}

        <button
          type="button"
          disabled={busy || status === "loading"}
          onClick={async () => {
            setBusy(true);
            try {
              await signIn("google", { callbackUrl });
            } finally {
              setBusy(false);
            }
          }}
          className="btn-primary mt-6 flex w-full !min-h-12 items-center justify-center gap-2 text-[14px]"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleGlyph />
          )}
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-[var(--text-quaternary)]">
          <Link href="/" className="hover:text-[var(--text-secondary)]">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-[var(--text-quaternary)]">
          Loading…
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
