/** Detect media kind from a public URL or path (CMS fields). */

export function isVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  const path = url.split("?")[0]?.split("#")[0] ?? url;
  return /\.(mp4|webm|ogg)$/i.test(path);
}

export function isGifUrl(url?: string | null): boolean {
  if (!url) return false;
  const path = url.split("?")[0]?.split("#")[0] ?? url;
  return /\.gif$/i.test(path);
}

/** True when the asset can animate without hover (mp4/webm/gif). */
export function isAnimatedMediaUrl(url?: string | null): boolean {
  return isVideoUrl(url) || isGifUrl(url);
}

/**
 * HTML `<video poster>` only accepts a still image.
 * Return a still URL for the poster attribute, or undefined.
 */
export function stillPosterForVideo(
  poster?: string | null,
  thumbnail?: string | null
): string | undefined {
  for (const candidate of [poster, thumbnail]) {
    if (candidate && !isVideoUrl(candidate)) return candidate;
  }
  return undefined;
}
