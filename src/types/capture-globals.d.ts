/**
 * Optional browser globals used only by local preview/capture tooling.
 *
 * These are intentionally typed here instead of being suppressed at each
 * usage site. They are not part of the buyer-facing runtime contract; capture
 * scripts may inject them while recording storefront previews.
 */
export {};

declare global {
  interface Window {
    /** Presentation clock injected by local capture scripts. */
    __MS_CAPTURE_CLOCK?: number | null;
    /** Optional QA event flag for forcing the Acne demo to its docked state. */
    __MS_ACNE_FORCE_DOCK?: boolean;
  }
}
