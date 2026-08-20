"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { FitWordmark } from "@/components/brand/FitWordmark";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * MS site shell chrome only — never part of product design previews.
 *
 * Home intro: absent until ms:intro-complete, then pulls down.
 * embed=1 (iframe product previews): render nothing.
 */
export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const isEmbed = searchParams.get("embed") === "1";
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);

  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }

    // Main home always runs the intro — keep chrome hidden until settle.
    // Soft-nav back to `/` remounts HomeExperience; re-hide until ms:intro-complete.
    // (Do not early-show from sessionStorage; intro is published to `/`.)
    setRevealed(false);
    const onDone = () => setRevealed(true);
    window.addEventListener("ms:intro-complete", onDone);
    return () => window.removeEventListener("ms:intro-complete", onDone);
  }, [isHome, pathname]);

  // After hooks: embed product previews, admin, and immersive demos have no marketing chrome
  const isImmersiveDemo =
    pathname === "/demo/scroll-narrative" ||
    pathname?.startsWith("/demo/scroll-narrative/") ||
    pathname === "/demo/tesla-roadster" ||
    pathname?.startsWith("/demo/tesla-roadster/") ||
    pathname === "/demo/cleanroom-aether" ||
    pathname === "/demo/cleanroom-vertex" ||
    pathname === "/demo/cleanroom-neon" ||
    pathname === "/demo/cleanroom-lumina" ||
    pathname === "/demo/cleanroom-terra" ||
    pathname?.startsWith("/demo/cleanroom-");
  if (isEmbed || isAdmin || isImmersiveDemo) return null;

  const hideOnHome = isHome && !revealed;

  return (
    <header
      className={cn(
        "z-50 w-full glass-thin",
        // Fixed on home so off-screen state leaves zero gap above the film
        isHome ? "fixed left-0 right-0 top-0" : "sticky top-0",
        "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hideOnHome
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      )}
      aria-hidden={hideOnHome ? true : undefined}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex min-w-0 max-w-[min(48vw,11rem)] items-center sm:max-w-[14rem]"
            aria-label={siteConfig.name}
          >
            {/*
              ClickMotion wordmark: Birthstone + white glow (docs/BRAND.md).
              FitWordmark measures width and shrinks font size so it always fits.
            */}
            <FitWordmark text={siteConfig.name} maxRem={1.85} minRem={1.1} />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[10px] px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-160 lg:px-3",
                    active
                      ? "text-[var(--text-primary)] bg-white/[0.1]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/[0.08]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/browse"
            aria-label="Search library"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>
          {status === "authenticated" && session?.user ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn-ghost btn-sm hidden sm:inline-flex !min-h-9 max-w-[10rem] truncate px-3 text-[13px]"
              title={session.user.email || "Sign out"}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="btn-ghost btn-sm hidden sm:inline-flex !min-h-9 px-3 text-[13px]"
            >
              Sign in
            </Link>
          )}
          <Link href="/pricing" className="btn-primary btn-sm !min-h-9 gap-1.5 px-4 text-[13px]">
            Unlimited Power
            <span aria-hidden className="text-[15px] leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
