/**
 * Upsert MS-HERO-PRSM01 from content/prompts/heroes/MS-HERO-PRSM01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. Dual-process PSAVE + No Scroller body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-PRSM01.mdx"),
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
if (/520vh/.test(body) && !/Hard ban/.test(body) && !/banned/.test(body)) {
  throw new Error("MDX still teaches 520vh as the method");
}
if (/\bgsap\b/i.test(fm)) {
  throw new Error("frontmatter still lists gsap as a dependency");
}
if (!get("previewVideoFullscreen") || !/prism-scroll-preview-fs-v1\.mp4/.test(get("previewVideoFullscreen"))) {
  throw new Error("MDX missing previewVideoFullscreen FS mp4");
}
if (!get("liveDemo") || !/cleanroom-prism/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-prism");
}
if (!/sizeMb:\s*126/.test(fm)) {
  throw new Error("MDX missing client HD sizeMb: 126");
}
if ((get("version") || "").split(".")[0] !== "2") {
  throw new Error("Prism PSAVE pack must stay on version 2.x");
}
if (!/#atelier/.test(body)) {
  throw new Error("MDX missing #atelier next sibling");
}
if (!/Atelier/.test(body) || !/Proof/.test(body) || !/Invite/.test(body)) {
  throw new Error("MDX missing live act names Atelier / Proof / Invite");
}
if (
  /(Spectrum|Margins|Clarity)/.test(body) &&
  !/Hard ban|banned|old |not /i.test(body)
) {
  throw new Error("MDX still teaches Spectrum / Margins / Clarity as live acts");
}
if (!/leftover dest/i.test(body)) {
  throw new Error("MDX missing leftover dest");
}
if (!/prefers-reduced-motion|reduced-motion/i.test(body)) {
  throw new Error("MDX missing reduced-motion path");
}
if ((get("status") || "") !== "published") {
  throw new Error("status must be published");
}
if ((get("priceTier") || "") !== "pro") {
  throw new Error("priceTier must be pro");
}
if (!getArr("compatibleWith").includes("MS-HERO-STIL01")) {
  throw new Error("compatibleWith must include Still (PSAVE family)");
}
if (!/prism-scroll-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay prism-scroll-preview-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-HERO-PRSM01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/VIDEO_GEN_PROMPT.md",
  "files/source/PrismLiquidGlass.tsx",
  "files/assets/prism-faces-v1.mp4",
  "files/assets/prism-faces-v1.webp",
  "Prism-files-p8r3sm7k2n4q-pr5m2x.zip",
  "Prism-package-p8r3sm7k2n4q-pr5m2x.pdf",
];
for (const rel of requiredPack) {
  const p = path.join(packDir, rel);
  if (!fs.existsSync(p)) throw new Error("missing pack file " + rel);
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
    get("previewVideoFullscreen") || "/assets/videos/prism-scroll-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/prism-faces-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/prism-faces-v1.mp4",
      format: "mp4",
      duration: "48s",
      loop: false,
      sizeMb: 126,
      poster: "/assets/posters/prism-faces-v1.webp",
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
    bolt: 3,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 18,
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
