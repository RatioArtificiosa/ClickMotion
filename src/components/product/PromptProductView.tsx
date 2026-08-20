"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Expand, Heart, Crown, X } from "lucide-react";
import type { ProductPrompt, RelatedProductCard } from "@/lib/product-prompt";
import { shortTitle } from "@/lib/gallery-utils";
import { stillPosterForVideo } from "@/lib/media-url";
import { MediaFill } from "@/components/media/MediaFill";
import {
  CardHoverChrome,
  useContainLetterbox,
} from "@/components/gallery/CardHoverChrome";
import { GetFullPromptButton } from "@/components/product/GetFullPromptButton";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

/**
 * Value line under primary CTA (all products).
 * PRODUCT_LAW: do not invent alternate storefront marketing lines.
 */
const PRODUCT_VALUE_LINE = "· Auto Customization Guide · HD Video Background ·";

/**
 * Max public product description length for the meta panel.
 * Meta panel has room for richer copy. Soft ≤200; hard ≤230 (PRODUCT_LAW).
 */
export const PRODUCT_DESCRIPTION_MAX_CHARS = 230;
export const PRODUCT_DESCRIPTION_SOFT_CHARS = 200;

/**
 * Product page layout tokens — must match docs/PRODUCT_LAW.md
 * (“Product page layout (template law — locked)”).
 * Tailwind class strings below hard-code the same numbers for JIT.
 */
export const PRODUCT_PAGE_LAYOUT = {
  /** Main preview max width (px); ~50% of 1920 → 960×540 @ 16:9 */
  mainMaxWidthPx: 960,
  mainTargetHeightAt16x9Px: 540,
  /** Related rail: how many cards when pool allows (2 @ 16:9) */
  railCount: 2,
  /**
   * Rail column: grows with leftover row width (1fr). Cards capped so 16:9
   * pair fits meta height when vertically centered.
   */
  railColMinRem: 16,
  /** Max width of each rail card (16:9); column may be wider — cards center in it */
  railCardMaxRem: 22,
  /** Meta width px range (xl); never steal from main’s 960 budget */
  metaMinXlPx: 280,
  metaMaxXlPx: 360,
  metaMinLgPx: 260,
  metaMaxLgPx: 320,
} as const;

const CURSOR_ARROW_SRC = "/assets/ui/cursor-arrow.png";
const LIKE_KEY = (id: string) => `ms:product-like:${id}`;

/**
 * Product page TEMPLATE — one layout for every prompt.
 * PRODUCT_LAW: docs/PRODUCT_LAW.md → “Product page layout (template law — locked)”.
 *
 * Shell (xl): main preview (~960×540) + meta (height-matched) + 2-card rail
 * (space-between, titles flush left, 16:9) + genre gallery below (independent styling).
 * Dual previews: page + fullscreen glass overlay. Scroll cue is HTML-only.
 */
export function PromptProductView({
  product,
  related,
}: {
  product: ProductPrompt;
  related: RelatedProductCard[];
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);
  const [likeBusy, setLikeBusy] = useState(false);
  const [mediaRatio, setMediaRatio] = useState(16 / 9);
  const [metaHeight, setMetaHeight] = useState<number | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  /** Still only after video error — never as HTML poster (avoids load flash). */
  const [pageVideoFailed, setPageVideoFailed] = useState(false);
  const [fsVideoFailed, setFsVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);

  const pageVideo = product.previewVideo;
  const fsVideo =
    product.previewVideoFullscreen || product.previewVideo || undefined;
  const showScrollBadge = product.isScrollExperience;
  const isPaid = !product.isFree;
  const failureStill = stillPosterForVideo(product.poster, product.thumbnail);

  const description = (product.description || "").trim().slice(
    0,
    PRODUCT_DESCRIPTION_MAX_CHARS
  );

  useEffect(() => {
    setMediaRatio(16 / 9);
    setMetaHeight(null);
    setOverlayOpen(false);
    setLikeBusy(false);
    setPageVideoFailed(false);
    setFsVideoFailed(false);

    // Hydrate: server likes are source of truth; localStorage only tracks this browser's heart.
    let storedLiked = false;
    try {
      storedLiked = window.localStorage.getItem(LIKE_KEY(product.id)) === "1";
    } catch {
      /* private mode */
    }
    setLiked(storedLiked);
    setLikes(product.likes);
  }, [product.id, product.likes]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !pageVideo) return;
    v.muted = true;
    void v.play().catch(() => {});
  }, [pageVideo, product.id]);

  useEffect(() => {
    if (!overlayOpen) return;
    const v = overlayVideoRef.current;
    if (v) {
      v.muted = true;
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  const onVideoMeta = useCallback(() => {
    const v = videoRef.current;
    if (!v?.videoWidth || !v.videoHeight) return;
    setMediaRatio(v.videoWidth / v.videoHeight);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (!mq.matches) {
        setMetaHeight(null);
        return;
      }
      const h = frame.getBoundingClientRect().height;
      if (h > 0) setMetaHeight(Math.round(h));
    };

    const ro = new ResizeObserver(sync);
    ro.observe(frame);
    mq.addEventListener("change", sync);
    sync();

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", sync);
    };
  }, [mediaRatio, product.id]);

  const onLike = useCallback(async () => {
    if (likeBusy) return;
    setLikeBusy(true);
    const next = !liked;
    // Optimistic UI
    setLiked(next);
    setLikes((n) => n + (next ? 1 : -1));
    try {
      window.localStorage.setItem(LIKE_KEY(product.id), next ? "1" : "0");
    } catch {
      /* ignore */
    }
    try {
      const res = await fetch(
        `/api/products/${encodeURIComponent(product.id)}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: next ? "like" : "unlike" }),
        }
      );
      if (res.ok) {
        const data = (await res.json()) as { likes?: number };
        if (typeof data.likes === "number") setLikes(data.likes);
      }
    } catch {
      /* offline / API gap — optimistic local state still stands */
    } finally {
      setLikeBusy(false);
    }
  }, [likeBusy, liked, product.id]);

  const openOverlay = useCallback(() => {
    if (!fsVideo && !product.poster && !product.thumbnail) return;
    setOverlayOpen(true);
  }, [fsVideo, product.poster, product.thumbnail]);

  const closeOverlay = useCallback(() => setOverlayOpen(false), []);

  const toolsLine = product.aiTools.length
    ? `· ${product.aiTools.join(" · ")} ·`
    : null;

  // PRODUCT_LAW: two 16:9 rail cards — absolute top + bottom of third column.
  // Rail and bottom gallery never share products (related is pre-scored; current
  // product already excluded by loadRelatedProducts).
  const railItems = related.slice(0, PRODUCT_PAGE_LAYOUT.railCount);
  const belowItems = related.slice(PRODUCT_PAGE_LAYOUT.railCount);
  // Slightly larger 16:9 width that still fits two cards + titles with space-between
  // (title block ~32px each; small min air between when packed to top/bottom)
  const railCardMaxPx =
    metaHeight != null
      ? Math.max(
          280,
          Math.min(
            440,
            Math.floor((((metaHeight - 12) / 2) - 32) * (16 / 9))
          )
        )
      : 380;

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-[var(--canvas)] pb-16">
      {/* Equal L/R page margin (size match only — main/meta column widths untouched). */}
      <div className="w-full px-3 pt-1.5 sm:px-4 sm:pt-2 lg:px-5 lg:pt-2.5 xl:px-6">
        {/*
          PRODUCT_LAW product page row (locked):
          - Main: max 960px (~960×540 @ 16:9). Never shrink for meta/rail.
          - Meta: 280–360 xl / 260–320 lg; height = main frame on lg+.
          - Rail: min 16rem, grows 1fr; 2 cards @ 16:9 flush top + bottom.
          - Gap main↔meta: gap-3. Equal outer page padding L/R.
        */}
        <div className="grid w-full items-start gap-2 sm:gap-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-3 xl:grid-cols-[minmax(0,960px)_minmax(280px,360px)_minmax(16rem,1fr)] xl:gap-x-3">
          {/* Main storefront capture — display ~960×540 @ 16:9 contain */}
          <div
            ref={frameRef}
            className={cn(
              "relative w-full overflow-hidden rounded-[14px]",
              "border border-[var(--hairline)] bg-black",
              "shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
            )}
            style={{ aspectRatio: String(mediaRatio) }}
          >
            {pageVideo && !pageVideoFailed ? (
              <video
                ref={videoRef}
                key={product.id}
                src={pageVideo}
                muted
                loop
                playsInline
                autoPlay
                controls={false}
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onLoadedMetadata={onVideoMeta}
                onError={() => setPageVideoFailed(true)}
                className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center"
              />
            ) : failureStill || product.poster || product.thumbnail ? (
              <div className="pointer-events-none absolute inset-0">
                <MediaFill
                  src={
                    failureStill ||
                    product.poster ||
                    product.thumbnail
                  }
                  alt={product.title}
                  className="absolute inset-0"
                  fit="contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-1 px-6 text-center text-sm text-white/40">
                <span>Preview video coming soon</span>
                <span className="text-[11px] text-white/25">
                  Add a capture in Admin → Products → Preview video
                </span>
              </div>
            )}

            {/* HTML-only experience chrome (never burn into capture files) */}
            {showScrollBadge && (pageVideo || product.poster) && (
              <ExperienceChrome compact />
            )}
          </div>

          {/* Meta panel */}
          <aside
            className={cn(
              "flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-[var(--hairline)]",
              "bg-[var(--elevated)]",
              "shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
            )}
            style={
              metaHeight != null
                ? { height: metaHeight, maxHeight: metaHeight }
                : undefined
            }
          >
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto p-5 sm:p-6">
              <h1
                className={cn(
                  syne.className,
                  "relative inline-block max-w-full pr-5 text-[1.5rem] font-extrabold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-[1.7rem]"
                )}
              >
                {product.shortTitle}
                {isPaid && (
                  <span
                    className="absolute -right-0.5 top-0 translate-x-1/4 -translate-y-1/3"
                    title="Paid listing"
                    aria-label="Paid listing"
                  >
                    <Crown
                      className="h-3.5 w-3.5 text-amber-300/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                      aria-hidden
                    />
                  </span>
                )}
              </h1>
              <p className="mt-1.5 text-[13px] text-[var(--text-tertiary)]">
                {product.genreLine}
              </p>

              {description ? (
                <p className="mt-4 max-w-prose text-[13px] leading-[1.55] text-[var(--text-secondary)]">
                  {description}
                </p>
              ) : null}

              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onLike}
                  disabled={likeBusy}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[12px] px-1 py-1 text-[13px] transition-colors",
                    liked
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                    likeBusy && "opacity-70"
                  )}
                  aria-pressed={liked}
                  aria-label={liked ? "Unlike" : "Like"}
                >
                  <Heart
                    className={cn("h-4 w-4", liked && "fill-current text-rose-400")}
                    aria-hidden
                  />
                  <span className="tabular-nums font-medium">{likes}</span>
                  <span className="text-[var(--text-quaternary)]">likes</span>
                </button>
              </div>

              <div className="mt-auto space-y-3 pt-6">
                <GetFullPromptButton productId={product.id} />

                <p className="text-center text-[11px] leading-relaxed tracking-wide text-[var(--text-quaternary)]">
                  {PRODUCT_VALUE_LINE}
                </p>

                {(pageVideo || product.poster || product.thumbnail) && (
                  <button
                    type="button"
                    onClick={openOverlay}
                    className="btn-ghost flex w-full !min-h-10 items-center justify-center gap-2 text-[13px]"
                  >
                    <Expand className="h-3.5 w-3.5" aria-hidden />
                    Full Screen
                  </button>
                )}

                {toolsLine && (
                  <p className="text-center text-[11px] leading-relaxed text-[var(--text-quaternary)]">
                    {toolsLine}
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/*
            Related rail (xl only) — PRODUCT_LAW:
            2 cards @ 16:9, slightly larger; first absolute top, second absolute bottom
            (justify-between). Titles flush left of each card.
            Not the genre gallery below.
          */}
          {railItems.length > 0 && (
            <div
              className="relative hidden min-w-0 flex-col items-center justify-between xl:flex"
              style={
                metaHeight != null
                  ? { height: metaHeight, maxHeight: metaHeight }
                  : undefined
              }
            >
              {railItems.map((r) => (
                <RelatedCard
                  key={r.id}
                  item={r}
                  variant="rail"
                  className="w-full shrink-0"
                  style={{ maxWidth: railCardMaxPx }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Related gallery under product — same scoring as rail, no rail duplicates */}
        {belowItems.length > 0 && (
          <section className="mt-8 sm:mt-10" aria-label={product.genreLine}>
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2
                className={cn(
                  syne.className,
                  "text-[1.05rem] font-bold tracking-tight text-[var(--text-primary)] sm:text-[1.15rem]"
                )}
              >
                {product.genreLine}
              </h2>
              <Link
                href={`/browse?category=${encodeURIComponent(product.category)}`}
                className="text-[12.5px] font-medium text-[var(--text-tertiary)] transition hover:text-[var(--text-primary)]"
              >
                See all
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {belowItems.map((r) => (
                <RelatedCard key={r.id} item={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      {overlayOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-[5vw]"
          role="dialog"
          aria-modal="true"
          aria-label="Preview full screen"
        >
          <button
            type="button"
            className="absolute inset-0 border-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 100%)",
              backdropFilter: "blur(20px)",
            }}
            aria-label="Close preview"
            onClick={closeOverlay}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 80px rgba(255,255,255,0.06)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.05) 100%)",
            }}
            aria-hidden
          />

          <div
            className="relative z-10 flex h-[90vh] max-h-[90vh] w-[90vw] max-w-[min(90vw,1600px)] flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeOverlay}
              className={cn(
                "absolute -right-1 -top-1 z-20 flex h-10 w-10 items-center justify-center rounded-full",
                "border border-white/20 bg-white/10 text-white backdrop-blur-md",
                "transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              )}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className={cn(
                "relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[18px]",
                "border border-white/15 bg-black/80 backdrop-blur-2xl"
              )}
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <div className="relative h-[90%] w-[90%]">
                {fsVideo && !fsVideoFailed ? (
                  <video
                    ref={overlayVideoRef}
                    key={`fs-${product.id}`}
                    src={fsVideo}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls={false}
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    onError={() => setFsVideoFailed(true)}
                    className="h-full w-full object-contain object-center"
                  />
                ) : (
                  <MediaFill
                    src={
                      failureStill ||
                      product.poster ||
                      product.thumbnail
                    }
                    alt={product.title}
                    className="h-full w-full"
                    fit="contain"
                    priority
                  />
                )}

                {showScrollBadge && <ExperienceChrome />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Scroll cue + optional cursor arrow (fullscreen).
 * Always HTML overlay — never composite into preview mp4s.
 */
function ExperienceChrome({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-end",
        compact ? "gap-4" : "gap-6 bottom-8"
      )}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-1.5">
        <span
          className={cn(
            "font-medium uppercase tracking-[0.28em] text-white/70",
            compact ? "text-[10px]" : "text-[11px]"
          )}
        >
          Scroll
        </span>
        <span
          className={cn(
            "w-px origin-top animate-pulse bg-gradient-to-b from-white/80 to-transparent",
            compact ? "h-9" : "h-12"
          )}
        />
      </div>

      {/* Fullscreen only: half-size cursor, margin from scroll cue */}
      {!compact && (
        <div className="relative mb-1 h-8 w-8 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] sm:h-10 sm:w-10">
          <Image
            src={CURSOR_ARROW_SRC}
            alt=""
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
      )}
    </div>
  );
}

/**
 * Related product card.
 * - gallery: genre grid under product + home/browse patterns (title may inset).
 * - rail: product-page side column only — compact 16:9, title/subtitle flush
 *   to video left (PRODUCT_LAW). Do not reuse rail flush rules on the gallery.
 */
function RelatedCard({
  item,
  className,
  style,
  variant = "gallery",
}: {
  item: RelatedProductCard;
  className?: string;
  style?: React.CSSProperties;
  /** rail = product-page side column only; gallery = grid below / elsewhere */
  variant?: "gallery" | "rail";
}) {
  const isPro = item.priceTier !== "free";
  const title = item.shortTitle || shortTitle(item.title);
  const meta =
    item.genreLine ||
    [item.typeLabel, item.categoryLabel].filter(Boolean).join(" · ");
  const isRail = variant === "rail";
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const letterbox = useContainLetterbox(frameRef);
  const href = `/browse/${item.slug}`;

  return (
    <div
      style={style}
      className={cn("group flex w-full min-w-0 flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
    >
      <div
        ref={frameRef}
        className={cn(
          "relative aspect-video w-full overflow-hidden bg-black",
          isRail ? "rounded-[10px]" : "rounded-[14px]",
          "border border-[var(--hairline)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.35)]",
          "transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:-translate-y-0.5 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_16px_40px_rgba(0,0,0,0.45)]"
        )}
      >
        {item.previewVideo || item.thumbnail ? (
          <MediaFill
            src={item.previewVideo || item.thumbnail}
            alt={title}
            className="pointer-events-none absolute inset-0"
            fit="contain"
            fallbackStill={
              item.previewVideo
                ? stillPosterForVideo(item.thumbnail, undefined)
                : undefined
            }
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--well)]" />
        )}
        <Link
          href={href}
          className={cn(
            "absolute inset-0 z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]",
            isRail ? "rounded-[10px]" : "rounded-[14px]"
          )}
          aria-label={title}
        />
        <CardHoverChrome
          hovered={hovered}
          isPro={isPro}
          letterbox={letterbox}
          compact={isRail}
        />
      </div>
      {/*
        Gallery: slight inset is fine.
        Rail only: title + subtitle hard-flush to the video’s left edge (no inset).
      */}
      <Link
        href={href}
        className={cn(
          "block min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isRail ? "mt-1.5 w-full p-0 text-left" : "mt-2.5 px-0.5"
        )}
      >
        <div
          className={cn(
            "line-clamp-1 font-semibold tracking-tight text-[var(--text-primary)]",
            isRail ? "text-[12px] leading-tight" : "text-[13px]"
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "line-clamp-1 text-[var(--text-quaternary)]",
            isRail ? "mt-0.5 text-[10.5px] leading-tight" : "mt-0.5 text-[11.5px]"
          )}
        >
          {meta}
        </div>
      </Link>
    </div>
  );
}
