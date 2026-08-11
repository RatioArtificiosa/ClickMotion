/**
 * Member + package download ledger (local file store).
 * Quotas are enforced server-side only — never advertise numbers on the public site.
 *
 * Free: free products only; hard cap on total package downloads (lifetime).
 * Paid: any product; rolling calendar-day cap (UTC).
 */

import { promises as fs } from "node:fs";
import path from "node:path";

export type MemberPlan = "free" | "paid";

export type DownloadRecord = {
  productId: string;
  at: string; // ISO
  kind: "package";
};

export type MemberRecord = {
  email: string;
  name?: string;
  image?: string;
  googleId?: string;
  plan: MemberPlan;
  createdAt: string;
  updatedAt: string;
  downloads: DownloadRecord[];
};

type MemberStoreFile = {
  version: 1;
  users: Record<string, MemberRecord>;
};

const STORE_PATH = path.join(process.cwd(), "data", "members", "store.json");

/** Lifetime free package downloads (server-side only). */
export const FREE_TOTAL_PACKAGE_CAP = 3;
/** Paid package downloads per UTC calendar day (server-side only). */
export const PAID_DAILY_PACKAGE_CAP = 10;

function paidEmailSet(): Set<string> {
  const raw = process.env.PAID_MEMBER_EMAILS || "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isPaidEmail(email: string): boolean {
  return paidEmailSet().has(email.toLowerCase().trim());
}

async function ensureDir() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
}

async function readStore(): Promise<MemberStoreFile> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const data = JSON.parse(raw) as MemberStoreFile;
    if (!data.users) return { version: 1, users: {} };
    return data;
  } catch {
    return { version: 1, users: {} };
  }
}

async function writeStore(store: MemberStoreFile) {
  await ensureDir();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2) + "\n", "utf-8");
}

export async function ensureMember(input: {
  email: string;
  name?: string;
  image?: string;
  googleId?: string;
}): Promise<MemberRecord> {
  const email = input.email.toLowerCase().trim();
  const store = await readStore();
  const now = new Date().toISOString();
  const existing = store.users[email];
  const plan: MemberPlan = isPaidEmail(email) ? "paid" : existing?.plan || "free";

  if (existing) {
    existing.name = input.name ?? existing.name;
    existing.image = input.image ?? existing.image;
    existing.googleId = input.googleId ?? existing.googleId;
    existing.plan = plan;
    existing.updatedAt = now;
    store.users[email] = existing;
    await writeStore(store);
    return existing;
  }

  const rec: MemberRecord = {
    email,
    name: input.name,
    image: input.image,
    googleId: input.googleId,
    plan,
    createdAt: now,
    updatedAt: now,
    downloads: [],
  };
  store.users[email] = rec;
  await writeStore(store);
  return rec;
}

export async function getMember(email: string): Promise<MemberRecord | null> {
  const store = await readStore();
  const rec = store.users[email.toLowerCase().trim()];
  if (!rec) return null;
  // Re-apply paid env list
  const plan = isPaidEmail(rec.email) ? "paid" : rec.plan === "paid" ? "paid" : "free";
  if (plan !== rec.plan) {
    rec.plan = plan;
    rec.updatedAt = new Date().toISOString();
    store.users[rec.email] = rec;
    await writeStore(store);
  }
  return rec;
}

function utcDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export type PackageAccessResult =
  | { ok: true; plan: MemberPlan }
  | {
      ok: false;
      code:
        | "SIGN_IN_REQUIRED"
        | "PAID_REQUIRED"
        | "FREE_ONLY"
        | "QUOTA"
        | "NO_PACKAGE";
      message: string;
    };

/**
 * Check whether a signed-in member may download a product package.
 * productIsFree = CMS/MDX free tier listing.
 */
export function evaluatePackageAccess(
  member: MemberRecord,
  productIsFree: boolean
): PackageAccessResult {
  const plan: MemberPlan = isPaidEmail(member.email) ? "paid" : member.plan;

  if (plan === "free" && !productIsFree) {
    return {
      ok: false,
      code: "PAID_REQUIRED",
      message: "This product requires a paid membership.",
    };
  }

  if (plan === "free") {
    const total = member.downloads.filter((d) => d.kind === "package").length;
    if (total >= FREE_TOTAL_PACKAGE_CAP) {
      return {
        ok: false,
        code: "QUOTA",
        message: "You have reached your package limit for this account.",
      };
    }
    return { ok: true, plan: "free" };
  }

  // paid
  const day = utcDayKey();
  const todayCount = member.downloads.filter(
    (d) => d.kind === "package" && d.at.startsWith(day)
  ).length;
  if (todayCount >= PAID_DAILY_PACKAGE_CAP) {
    return {
      ok: false,
      code: "QUOTA",
      message: "You have reached today’s download limit. Try again tomorrow.",
    };
  }
  return { ok: true, plan: "paid" };
}

export async function recordPackageDownload(
  email: string,
  productId: string
): Promise<MemberRecord> {
  const store = await readStore();
  const key = email.toLowerCase().trim();
  let rec = store.users[key];
  if (!rec) {
    rec = await ensureMember({ email: key });
  }
  // re-read after ensure
  const store2 = await readStore();
  rec = store2.users[key];
  rec.downloads.push({
    productId,
    at: new Date().toISOString(),
    kind: "package",
  });
  rec.updatedAt = new Date().toISOString();
  store2.users[key] = rec;
  await writeStore(store2);
  return rec;
}

/** Mark member paid (Stripe webhook / admin later). */
export async function setMemberPlan(
  email: string,
  plan: MemberPlan
): Promise<MemberRecord> {
  const store = await readStore();
  const key = email.toLowerCase().trim();
  let rec = store.users[key];
  if (!rec) {
    rec = {
      email: key,
      plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloads: [],
    };
  } else {
    rec.plan = plan;
    rec.updatedAt = new Date().toISOString();
  }
  store.users[key] = rec;
  await writeStore(store);
  return rec;
}
