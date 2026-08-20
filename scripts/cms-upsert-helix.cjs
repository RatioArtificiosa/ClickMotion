/**
 * Upsert MS-SEC-HELI01 from content/prompts/sections/MS-SEC-HELI01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. No Scroller body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/sections/MS-SEC-HELI01.mdx"),
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

const GOLD_DESC =
  "A spatial mid-page gallery where your work rides a 3D helix as titles cross the stage. Fully customizable cards, copy, and color so it feels made for your brand.";
const desc = get("description");
if (desc !== GOLD_DESC) {
  throw new Error("Helix description bar drifted from gold");
}
if (!desc || desc.length > 230) {
  throw new Error(`description length ${desc?.length} exceeds 230`);
}
if (desc.includes("—") || desc.includes("–")) {
  throw new Error("description has em/en dash");
}
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX body missing pin freeing (page owns until dock)");
}
if (!/VIRTUAL_VIEWPORTS = 5/.test(body) || !/VIRTUAL_VIEWPORTS = 3/.test(body)) {
  throw new Error("MDX missing 5 / 3 viewport earn");
}
if (/\bPSAVE\b/.test(body) && !/not PSAVE|Not PSAVE|Do not add PSAVE|no film/i.test(body)) {
  throw new Error("MDX teaches PSAVE as the Helix method");
}
if (/\bgsap\b/i.test(fm) || /\blenis\b/i.test(fm)) {
  throw new Error("frontmatter still lists gsap or lenis as a dependency");
}
if (/ScrollTrigger/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches ScrollTrigger as the method");
}
if (!get("previewVideoFullscreen") || !/helix-gallery-preview-fs-v1\.mp4/.test(get("previewVideoFullscreen"))) {
  throw new Error("MDX missing previewVideoFullscreen FS mp4");
}
if (!get("liveDemo") || !/cleanroom-helix/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-helix");
}
if ((get("version") || "") !== "2.2.0") {
  throw new Error("Helix Platinum backend pack must stay on version 2.2.0");
}
if ((get("status") || "") !== "published") {
  throw new Error("status must be published");
}
if ((get("priceTier") || "") !== "pro") {
  throw new Error("priceTier must be pro");
}
if (!/#helix-gallery/.test(body)) {
  throw new Error("MDX missing #helix-gallery");
}
if (!/OrbitHelix/.test(body)) {
  throw new Error("MDX missing OrbitHelix");
}
if (!/prefers-reduced-motion|reduced-motion/i.test(body)) {
  throw new Error("MDX missing reduced-motion path");
}
if (!/helix-gallery-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay helix-gallery-preview-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-SEC-HELI01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/HelixGallerySection.tsx",
  "files/source/OrbitHelix.tsx",
  "files/assets/orbit-01.jpg",
  "files/assets/orbit-02.jpg",
  "files/assets/orbit-03.jpg",
  "files/assets/orbit-04.jpg",
  "files/assets/orbit-05.jpg",
  "files/assets/orbit-06.jpg",
  "files/assets/orbit-07.jpg",
  "files/assets/orbit-08.jpg",
  "files/assets/orbit-09.jpg",
  "Helix-files-h3l1x9k2m7p4-t2v8c6.zip",
  "Helix-package-h3l1x9k2m7p4-t2v8c6.pdf",
];
for (const rel of requiredPack) {
  const p = path.join(packDir, rel);
  if (!fs.existsSync(p)) throw new Error("missing pack file " + rel);
}
const helixSrc = fs.readFileSync(
  path.join(packDir, "files/source/HelixGallerySection.tsx"),
  "utf8"
);
if (!/pageOwns/.test(helixSrc) || !/pinDocked/.test(helixSrc)) {
  throw new Error("Helix source missing pin freeing (pageOwns / pinDocked)");
}
if (/position:\s*sticky/.test(helixSrc)) {
  throw new Error("Helix source still uses position:sticky");
}
const leftoverBanned = [
  path.join(root, "cleanroom/helix-from-prompt/gsap-register.ts"),
  path.join(root, "cleanroom/helix-from-prompt/SmoothScroll.tsx"),
];
for (const p of leftoverBanned) {
  if (fs.existsSync(p)) {
    throw new Error("Helix cleanroom still has banned leftover " + path.basename(p));
  }
}
const packPrompt = fs.readFileSync(
  path.join(packDir, "files/PROMPT.md"),
  "utf8"
);
if (!/page owns/i.test(packPrompt) || !/docks/i.test(packPrompt)) {
  throw new Error("Helix pack PROMPT missing pin freeing");
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
    get("previewVideoFullscreen") || "/assets/videos/helix-gallery-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: get("poster") || "/assets/posters/helix-gallery-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 13000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 3,
    bolt: 3,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "three", version: "^0.170.0", required: true },
    { name: "@react-three/fiber", version: "^9.0.0", required: true },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 21,
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
