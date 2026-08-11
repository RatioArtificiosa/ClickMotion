/**
 * Scrub em/en dashes from Meridian sold prompt surfaces (no collapse of YAML spaces).
 * Usage: node scripts/scrub-meridian-emdash.mjs
 */
import fs from "node:fs";
import matter from "gray-matter";

function scrubText(s) {
  return s.replaceAll("\u2014", " - ").replaceAll("\u2013", "-");
}

// Body-only for MDX: preserve frontmatter bytes
const mdxPath = "content/prompts/heroes/MS-HERO-MERI01.mdx";
const mdxRaw = fs.readFileSync(mdxPath, "utf8");
const { data, content } = matter(mdxRaw);
const scrubbedBody = scrubText(content);
// Re-serialize carefully: keep original frontmatter block
const fmEnd = mdxRaw.indexOf("\n---", 3);
if (fmEnd < 0) throw new Error("frontmatter end not found");
const front = mdxRaw.slice(0, fmEnd + 4); // includes closing ---
const nextMdx = front + "\n" + scrubbedBody.replace(/^\n/, "");
fs.writeFileSync(mdxPath, nextMdx.endsWith("\n") ? nextMdx : nextMdx + "\n");

// BUYER_PROMPT full file (markdown, not yaml-critical)
const buyerPath = "cleanroom/meridian-scroll/BUYER_PROMPT.md";
fs.writeFileSync(buyerPath, scrubText(fs.readFileSync(buyerPath, "utf8")));

// CMS body from MDX body
const store = JSON.parse(fs.readFileSync("data/cms/store.json", "utf8"));
const p = store.products.find((x) => x.id === "MS-HERO-MERI01");
if (!p) throw new Error("MS-HERO-MERI01 missing");
p.body = scrubbedBody.trim();
p.updatedAt = new Date().toISOString();
p.description = scrubText(p.description || "");
p.title = scrubText(p.title || "");
fs.writeFileSync("data/cms/store.json", JSON.stringify(store, null, 2) + "\n");

const guest = "eye - and the guest - toward";
console.log("mdx guest", scrubbedBody.includes(guest));
console.log("cms guest", p.body.includes(guest));
console.log(
  "em left mdx body",
  (scrubbedBody.match(/[\u2014\u2013]/g) || []).length
);
console.log("em left cms", (p.body.match(/[\u2014\u2013]/g) || []).length);
