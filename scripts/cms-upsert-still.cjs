/**
 * Upsert MS-HERO-STIL01 from content/prompts/heroes/MS-HERO-STIL01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. Dual-process PSAVE + No Scroller body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-STIL01.mdx"),
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
if (!/pin-until-complete/i.test(body) || !/VIRTUAL_VIEWPORTS = 12/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / 12 vh PSAVE gold");
}
if (!/\bPSAVE\b/.test(body) || !/Perfect Scroll Video Engine/.test(body)) {
  throw new Error("MDX missing PSAVE (Perfect Scroll Video Engine)");
}
if (!/No Scroller/.test(body) || !/Dual process/.test(body)) {
  throw new Error("MDX missing dual process / No Scroller");
}
if (!/PSAVE_COAST_SEC/.test(body) || !/PSAVE_EASE_SEC/.test(body)) {
  throw new Error("MDX missing leftover dest floor / rate ease");
}
if (!/PSAVE_FLIP_DEADZONE_PX/.test(body) || !/PSAVE_LIVE_MS = 280/.test(body)) {
  throw new Error("MDX missing bounce deadzone / 280ms live window");
}
if (!/GOP 3/.test(body) || !/-bf 0/.test(body)) {
  throw new Error("MDX missing PSAVE film encode (GOP 3 / no B-frames)");
}
if (/STILL_IDLE_MS/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches STILL_IDLE_MS as the method");
}
if (/TRACK_VH/.test(body) && !/Hard ban/.test(body) && !/banned/.test(body)) {
  throw new Error("MDX still teaches TRACK_VH as the method");
}
if (/WHEEL_GAIN/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches WHEEL_GAIN as the method");
}
if (/\bgsap\b/i.test(fm) && !/do not install/i.test(body)) {
  throw new Error("frontmatter still lists gsap as a dependency");
}
if (!get("previewVideoFullscreen") || !/still-preview-fs-v1\.mp4/.test(get("previewVideoFullscreen"))) {
  throw new Error("MDX missing previewVideoFullscreen FS mp4");
}
if (!get("liveDemo") || !/cleanroom-still/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-still");
}
if (!/\.webm$/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay WebM (operator screenshot law)");
}
if (!/sizeMb:\s*82/.test(fm)) {
  throw new Error("MDX missing client HD sizeMb: 82");
}
if ((get("version") || "").split(".")[0] !== "2") {
  throw new Error("Still PSAVE pack must stay on version 2.x");
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
  previewVideoFullscreen:
    get("previewVideoFullscreen") || "/assets/videos/still-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/still-cosmos-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/still-cosmos-v1.mp4",
      format: "mp4",
      duration: "30s",
      loop: false,
      sizeMb: 82,
      poster: "/assets/posters/still-cosmos-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 14000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 4,
    bolt: 4,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 25,
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
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log(
  "CMS",
  product.id,
  product.priceTier,
  "desc",
  product.description.length,
  "body",
  product.body.length,
  idx >= 0 ? "updated" : "added"
);
