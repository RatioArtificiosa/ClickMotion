/**
 * Sync AETHER + VERTEX free listings from MDX into CMS store
 * (full body for member copy unlock).
 */
import fs from "node:fs";
import matter from "gray-matter";

const IDS = [
  "MS-HERO-AETH01",
  "MS-HERO-VERT01",
  "MS-HERO-NEXU01",
  "MS-SEC-HELI01",
  "MS-HERO-ACTU01",
  "MS-SEC-LINE01",
];
const now = new Date().toISOString();

function scrubEm(s) {
  return s.replaceAll("\u2014", " - ").replaceAll("\u2013", "-");
}

const store = JSON.parse(fs.readFileSync("data/cms/store.json", "utf8"));

const meta = {
  "MS-HERO-AETH01": {
    genreId: "health",
    previewVideo: "/assets/videos/aether-preview-v1.mp4",
    poster: "/assets/posters/aether-preview-v1.webp",
    thumbnail: "/thumbnails/MS-HERO-AETH01.webp",
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
  "MS-HERO-VERT01": {
    genreId: "tech",
    previewVideo: "/assets/videos/vertex-preview-v1.mp4",
    poster: "/assets/posters/vertex-preview-v1.webp",
    thumbnail: "/thumbnails/MS-HERO-VERT01.webp",
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
  "MS-HERO-NEXU01": {
    genreId: "saas",
    previewVideo: "/assets/videos/nexus-enterprise-preview-v1.mp4",
    previewVideoFullscreen: "/assets/videos/nexus-enterprise-preview-fs-v1.mp4",
    poster: "/assets/posters/nexus-enterprise-preview-v1.webp",
    thumbnail: "/thumbnails/MS-HERO-NEXU01.webp",
    liveDemo: "/demo/cleanroom-nexus",
    videoBackgrounds: [
      {
        file: "/assets/videos/nexus-neural-v1.mp4",
        format: "mp4",
        duration: "59s",
        loop: true,
        sizeMb: 41,
        poster: "/assets/posters/nexus-neural-v1.webp",
      },
    ],
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
  "MS-SEC-HELI01": {
    genreId: "agency",
    previewVideo: "/assets/videos/helix-gallery-preview-v1.mp4",
    previewVideoFullscreen: "/assets/videos/helix-gallery-preview-fs-v1.mp4",
    poster: "/assets/posters/helix-gallery-preview-v1.webp",
    thumbnail: "/thumbnails/MS-SEC-HELI01.webp",
    liveDemo: "/demo/cleanroom-helix",
    videoBackgrounds: [],
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
  "MS-HERO-ACTU01": {
    genreId: "ecommerce",
    previewVideo: "/assets/videos/actually-hero-preview-v1.mp4",
    previewVideoFullscreen: "/assets/videos/actually-hero-preview-fs-v1.mp4",
    poster: "/assets/posters/actually-hero-preview-v1.webp",
    thumbnail: "/thumbnails/MS-HERO-ACTU01.webp",
    liveDemo: "/demo/cleanroom-actually",
    videoBackgrounds: [],
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
  "MS-SEC-LINE01": {
    genreId: "ecommerce",
    previewVideo: "/assets/videos/lineup-reveal-preview-v1.mp4",
    previewVideoFullscreen: "/assets/videos/lineup-reveal-preview-fs-v1.mp4",
    poster: "/assets/posters/lineup-reveal-preview-v1.webp",
    thumbnail: "/thumbnails/MS-SEC-LINE01.webp",
    liveDemo: "/demo/cleanroom-lineup",
    videoBackgrounds: [],
    aiTools: ["Cursor", "Grok Build", "Claude", "Lovable", "Bolt"],
  },
};

for (const id of IDS) {
  const file = id.startsWith("MS-SEC-")
    ? `content/prompts/sections/${id}.mdx`
    : `content/prompts/heroes/${id}.mdx`;
  const raw = fs.readFileSync(file, "utf8");
  const { data: fm, content: body } = matter(raw);
  const m = meta[id];
  let p = store.products.find((x) => x.id === id);
  const payload = {
    id,
    slug: fm.slug,
    title: scrubEm(String(fm.title)),
    description: scrubEm(String(fm.description)),
    type: fm.type || (id.startsWith("MS-SEC-") ? "section" : "hero"),
    genreId: m.genreId,
    styleTags: fm.styleTags || [],
    motionIntensity: fm.motionIntensity || "medium",
    difficulty: fm.difficulty || "beginner",
    priceTier: "free",
    status: "published",
    body: scrubEm(body.trim()),
    thumbnail: m.thumbnail,
    poster: m.poster,
    previewVideo: m.previewVideo,
    previewVideoFullscreen: m.previewVideoFullscreen,
    liveDemo: m.liveDemo,
    videoBackgrounds: m.videoBackgrounds || [],
    aiTools: m.aiTools,
    sortOrder: p?.sortOrder ?? 1,
    likes: p?.likes ?? 120,
    createdAt: p?.createdAt || "2026-08-07",
    updatedAt: now,
  };
  if (m.previewVideoFullscreen) {
    payload.previewVideoFullscreen = m.previewVideoFullscreen;
  }
  if (m.liveDemo) payload.liveDemo = m.liveDemo;
  if (m.videoBackgrounds) payload.videoBackgrounds = m.videoBackgrounds;
  if (p) Object.assign(p, payload);
  else store.products.push(payload);
  console.log(id, "free", payload.slug, "body", payload.body.length);
}

fs.writeFileSync("data/cms/store.json", JSON.stringify(store, null, 2) + "\n");
console.log("CMS synced");
