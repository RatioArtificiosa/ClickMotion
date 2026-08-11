import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { promptFrontmatterSchema, validateBodySections } from "@/lib/validators/prompt-schema";

const CONTENT_ROOT = path.join(process.cwd(), "content/prompts");

export interface LoadedPrompt {
  frontmatter: ReturnType<typeof promptFrontmatterSchema.parse>;
  body: string;
  filePath: string;
}

/** Load and validate a single MDX file */
export function loadPrompt(filePath: string): LoadedPrompt {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(raw);
  const frontmatter = promptFrontmatterSchema.parse(data);
  const missingSections = validateBodySections(body);
  if (missingSections.length > 0) {
    throw new Error(`Missing sections in ${filePath}: ${missingSections.join(", ")}`);
  }
  return { frontmatter, body, filePath };
}

/** Recursively discover all prompt MDX files */
export function discoverPromptFiles(dir = CONTENT_ROOT): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...discoverPromptFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      files.push(full);
    }
  }
  return files;
}

export function loadAllPrompts(): LoadedPrompt[] {
  return discoverPromptFiles().map(loadPrompt);
}
