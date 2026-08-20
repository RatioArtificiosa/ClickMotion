/**
 * Upsert MS-HERO-ELYS01 from content/prompts/heroes/MS-HERO-ELYS01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. Pin-until-complete body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-ELYS01.mdx"),
  "utf8"
);
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) throw new Error("no frontmatter");
const fm = fmMatch[1];
const body = fmMatch[2].trim();

function get(key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
  return m ? m[1].replace(/^"|"$/g, "") : null;
}
function getArr(key) {
  const m = fm.match(new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`));
  if (!m) return [];
  return m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
}

const desc = get("description");
if (!desc || desc.length > 230) {
  throw new Error(`description length ${desc?.length} exceeds 230`);
}
if (desc.includes("—") || desc.includes("–")) {
  throw new Error("description has em/en dash");
}
if (!/pin-until-complete/i.test(body) && !/3\.6/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / 3.6 gold markers");
}
if (!/PSAVE_RATE = 1\.2/.test(body) || !/PSAVE_FRAME = 1 \/ 24/.test(body)) {
  throw new Error("MDX missing PSAVE gold (1.2x / one frame)");
}
if (!/\bPSAVE\b/.test(body) || !/Perfect Scroll Video Engine/.test(body)) {
  throw new Error("MDX missing PSAVE (Perfect Scroll Video Engine)");
}
if (!/never jumps a frame/i.test(body) || !/plays it backward/i.test(body)) {
  throw new Error("MDX missing PSAVE reverse law");
}
if (!/PDF-only/i.test(body) || !/## Promise/i.test(body) || !/## Package notes/i.test(body)) {
  throw new Error("MDX missing Promise / PDF-only / Package notes");
}
if (!/Opening frame/i.test(body) || !/heads-up/i.test(body)) {
  throw new Error("MDX missing opening-frame law (no mid-film HTML poster)");
}
if (!/GOP 3/.test(body) || !/-bf 0/.test(body)) {
  throw new Error("MDX missing PSAVE film encode (GOP 3 / no B-frames)");
}
if (!/page owns/i.test(body) && !/page-owns/i.test(body)) {
  throw new Error("MDX missing page-owns runway after release");
}
if (!/PSAVE_REV_STRIDE/.test(body) || !/PSAVE_LIVE_MS/.test(body)) {
  throw new Error("MDX missing PSAVE reverse constants");
}
if (!/leftover dest/i.test(body)) {
  throw new Error("MDX missing leftover dest / graceful lift law");
}
if (!/getTarget/.test(body)) {
  throw new Error("MDX missing getTarget on capture API");
}
if (/ScrollTrigger\.create/.test(body) && /460vh/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches tall sticky ScrollTrigger as the method");
}

const product = {
  id: get("id"),
  slug: get("slug"),
  title: get("title"),
  description: desc,
  type: get("type"),
  genreId: get("category"),
  styleTags: getArr("styleTags"),
  motionIntensity: get("motionIntensity"),
  difficulty: get("difficulty"),
  priceTier: get("priceTier"),
  status: get("status"),
  body,
  previewVideo: get("previewVideo"),
  previewVideoFullscreen: "/assets/videos/elyse-scroll-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/elyse-nature-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/elyse-nature-v1.mp4",
      format: "mp4",
      duration: "10s",
      loop: false,
      sizeMb: 93,
      poster: "/assets/posters/elyse-nature-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 9200),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 4,
    bolt: 3,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "tailwindcss", version: "^3.4.0", required: true },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 4,
};

const storePath = path.join(root, "data/cms/store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
const idx = store.products.findIndex((p) => p.id === product.id);
if (idx >= 0) {
  const prev = store.products[idx];
  store.products[idx] = {
    ...prev,
    ...product,
    sortOrder: prev.sortOrder ?? product.sortOrder,
    likes: prev.likes,
  };
} else {
  store.products.push(product);
}
fs.writeFileSync(storePath, JSON.stringify(store, null, 2) + "\n");
console.log(
  "CMS",
  product.id,
  product.priceTier,
  "v" + product.version,
  "desc",
  product.description.length,
  "body",
  product.body.length,
  idx >= 0 ? "updated" : "added",
  "pin",
  /pin-until-complete/i.test(product.body),
  "noST",
  !(
    /ScrollTrigger\.create/.test(product.body) &&
    /460vh/.test(product.body) &&
    !/Hard ban/.test(product.body)
  )
);
