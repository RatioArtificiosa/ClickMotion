/**
 * Upsert MS-HERO-SKYS01 from MDX. Dual process PSAVE + No Scroller.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-SKYS01.mdx"),
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
  "A sunrise pin narrative where scroll aims a 25-second SkySpires film and the picture never jumps. Frost HUD stays alive. Fully customizable copy, tokens, and film for your studio.";
const desc = get("description");
if (desc !== GOLD_DESC) throw new Error("SkySpires description drifted from gold");
if (desc.length > 230) throw new Error("description too long");
if (desc.includes("—") || desc.includes("–")) throw new Error("description has dash");
if (!/pin-until-complete/i.test(body) || !/VIRTUAL_VIEWPORTS = 12/.test(body)) {
  throw new Error("MDX missing pin / 12 vh");
}
if (!/\bPSAVE\b/.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX missing dual process");
}
if ((get("status") || "") !== "published") throw new Error("status");
if ((get("priceTier") || "") !== "pro") throw new Error("tier");
if ((get("previewVideo") || "").indexOf("skyspires-preview") < 0) {
  throw new Error("preview must stay storefront capture");
}
if ((get("version") || "") !== "2.1.0") {
  throw new Error("SkySpires Platinum backend pack must stay on version 2.1.0");
}

const packDir = path.join(root, "public/packages/MS-HERO-SKYS01");
for (const rel of [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/SkySpiresHero.tsx",
  "files/assets/skyspires-sunrise-v1.mp4",
  "SkySpires-files-s4y8p1r3sk7n-sk5n2q.zip",
  "SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf",
]) {
  if (!fs.existsSync(path.join(packDir, rel))) throw new Error("missing " + rel);
}

const src = fs.readFileSync(path.join(packDir, "files/source/SkySpiresHero.tsx"), "utf8");
if (!/pageOwns/.test(src) || !/PSAVE_FRAME = 1 \/ 24/.test(src)) {
  throw new Error("source missing PSAVE 24fps / pin freeing");
}
const promptMd = fs.readFileSync(path.join(packDir, "files/PROMPT.md"), "utf8");
if (!/page owns/i.test(promptMd) || !/docks/i.test(promptMd)) {
  throw new Error("pack PROMPT missing pin freeing");
}
if (promptMd.split(/\r?\n/).length < 240) {
  throw new Error("pack PROMPT too thin for Platinum");
}
if (!/Rebuild algorithm/.test(promptMd) || !/Two clocks/.test(promptMd)) {
  throw new Error("pack PROMPT missing Still-class motion law");
}
if (!/2\.1\.0/.test(promptMd)) {
  throw new Error("pack PROMPT must stay on version 2.1.0");
}
if (/\\source\\/.test(promptMd) || /\\source\//.test(promptMd)) {
  throw new Error("pack PROMPT has escaped source paths");
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
  previewVideo: "/assets/videos/skyspires-preview-v1.mp4",
  previewVideoFullscreen: "/assets/videos/skyspires-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/skyspires-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/skyspires-sunrise-v1.mp4",
      format: "mp4",
      duration: "25s",
      loop: false,
      sizeMb: 18,
      poster: "/assets/posters/skyspires-sunrise-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 17000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: { cursor: 5, lovable: 4, bolt: 4, claude: 5, "grok-build": 5 },
  dependencies: [
    { name: "lucide-react", version: "^0.468.0", required: false },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 30,
};

const storePath = path.join(root, "data/cms/store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
const idx = store.products.findIndex((p) => p.id === product.id);
if (idx >= 0) {
  const prev = store.products[idx];
  store.products[idx] = { ...prev, ...product, sortOrder: prev.sortOrder ?? 30, likes: prev.likes };
} else store.products.push(product);
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log("CMS", product.id, product.priceTier, "desc", product.description.length, "body", product.body.length);
