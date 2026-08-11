import path from "node:path";
import fs from "node:fs";
import { withAdmin } from "@/lib/cms/http";
import { ensureDataDir } from "@/lib/cms/store";
import { slugify } from "@/lib/cms/slug";

const MAX_BYTES = 80 * 1024 * 1024; // 80MB
const ALLOWED = new Set([
  "video/mp4",
  "video/webm",
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
]);

export async function POST(req: Request) {
  return withAdmin(async () => {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      throw Object.assign(new Error("file is required"), { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      throw Object.assign(new Error("File too large (max 80MB)"), { status: 400 });
    }
    const type = file.type || "application/octet-stream";
    if (!ALLOWED.has(type) && !file.name.match(/\.(mp4|webm|webp|png|jpe?g|gif)$/i)) {
      throw Object.assign(new Error("Unsupported file type"), { status: 400 });
    }

    ensureDataDir();
    const uploadsRoot = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });

    const rawExt = path.extname(file.name).toLowerCase();
    const allowedExt = new Set([".mp4", ".webm", ".webp", ".png", ".jpg", ".jpeg", ".gif"]);
    const ext =
      (allowedExt.has(rawExt) ? rawExt : "") ||
      (type.includes("mp4")
        ? ".mp4"
        : type.includes("webm")
          ? ".webm"
          : type.includes("png")
            ? ".png"
            : type.includes("webp")
              ? ".webp"
              : type.includes("jpeg") || type.includes("jpg")
                ? ".jpg"
                : type.includes("gif")
                  ? ".gif"
                  : "");
    if (!ext) {
      throw Object.assign(new Error("Unsupported file type"), { status: 400 });
    }
    const base = slugify(path.basename(file.name, path.extname(file.name))) || "upload";
    const name = `${base}-${Date.now()}${ext}`;
    // Resolve and enforce destination stays under uploads root (no path escape).
    const dest = path.resolve(uploadsRoot, name);
    if (!dest.startsWith(path.resolve(uploadsRoot) + path.sep)) {
      throw Object.assign(new Error("Invalid upload path"), { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(dest, buf);

    const url = `/uploads/${name}`;
    const kind = type.startsWith("video/") || /\.(mp4|webm)$/i.test(name) ? "video" : "image";
    return { url, kind, size: file.size, name };
  });
}
