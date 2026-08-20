"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FitWordmark } from "@/components/brand/FitWordmark";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  if (searchParams.get("embed") === "1") return null;
  if (pathname?.startsWith("/admin")) return null;
  if (
    pathname === "/demo/scroll-narrative" ||
    pathname?.startsWith("/demo/scroll-narrative/") ||
    pathname === "/demo/tesla-roadster" ||
    pathname?.startsWith("/demo/tesla-roadster/") ||
    pathname === "/demo/cleanroom-aether" ||
    pathname === "/demo/cleanroom-vertex" ||
    pathname?.startsWith("/demo/cleanroom-")
  )
    return null;

  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--canvas)]">
      <div className="container py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            {/* Wordmark only — Birthstone + glow (docs/BRAND.md). No CM mark, no sans label. */}
            <Link
              href="/"
              className="group block min-w-0 max-w-[min(52vw,12rem)] sm:max-w-[14rem]"
              aria-label={siteConfig.name}
            >
              <FitWordmark text={siteConfig.name} maxRem={1.75} minRem={1.15} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-tertiary)]">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2">
              {footerNav.product.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerNav.resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--hairline)] pt-6 text-sm text-[var(--text-quaternary)] md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for founders, agencies & makers shipping with AI.</p>
        </div>
      </div>
    </footer>
  );
}
