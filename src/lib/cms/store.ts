import fs from "node:fs";
import path from "node:path";
import type { CmsStore, CmsGenre, CmsProduct, CmsCollection } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "cms");
const STORE_FILE = path.join(DATA_DIR, "store.json");
const LOCK_FILE = path.join(DATA_DIR, ".store.lock");

/** Serialize mutations in this process (Next can multi-request). */
let chain: Promise<unknown> = Promise.resolve();

function emptyStore(): CmsStore {
  return {
    version: 1,
    seededAt: null,
    genres: [],
    products: [],
    collections: [],
  };
}

export function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const uploads = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploads)) {
    fs.mkdirSync(uploads, { recursive: true });
  }
}

function acquireLock(): void {
  ensureDataDir();
  const start = Date.now();
  while (true) {
    try {
      const fd = fs.openSync(LOCK_FILE, "wx");
      fs.writeFileSync(fd, String(process.pid));
      fs.closeSync(fd);
      return;
    } catch {
      if (Date.now() - start > 5000) {
        // Stale lock recovery
        try {
          fs.unlinkSync(LOCK_FILE);
        } catch {
          /* ignore */
        }
        if (Date.now() - start > 8000) {
          throw new Error("CMS store lock timeout");
        }
      }
      // busy wait small
      const until = Date.now() + 15;
      while (Date.now() < until) {
        /* spin */
      }
    }
  }
}

function releaseLock(): void {
  try {
    fs.unlinkSync(LOCK_FILE);
  } catch {
    /* ignore */
  }
}

export function readStore(): CmsStore {
  ensureDataDir();
  if (!fs.existsSync(STORE_FILE)) {
    return emptyStore();
  }
  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const data = JSON.parse(raw) as CmsStore;
    if (!data || data.version !== 1) return emptyStore();
    return {
      version: 1,
      seededAt: data.seededAt ?? null,
      genres: Array.isArray(data.genres) ? data.genres : [],
      products: Array.isArray(data.products) ? data.products : [],
      collections: Array.isArray(data.collections) ? data.collections : [],
    };
  } catch {
    return emptyStore();
  }
}

function writeStoreSync(store: CmsStore): void {
  ensureDataDir();
  const payload = JSON.stringify(store, null, 2);
  const tmp = `${STORE_FILE}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, payload, "utf-8");
  fs.renameSync(tmp, STORE_FILE);
}

/**
 * Atomic read-modify-write under process lock + promise chain.
 * Always returns the new store snapshot.
 */
export async function updateStore(
  mutator: (draft: CmsStore) => void | CmsStore
): Promise<CmsStore> {
  const run = async () => {
    acquireLock();
    try {
      const current = readStore();
      const draft: CmsStore = {
        version: 1,
        seededAt: current.seededAt,
        genres: current.genres.map((g) => ({ ...g })),
        products: current.products.map((p) => ({ ...p })),
        collections: current.collections.map((c) => ({
          ...c,
          productIds: [...c.productIds],
        })),
      };
      const result = mutator(draft);
      const next = (result as CmsStore | void) ?? draft;
      next.version = 1;
      writeStoreSync(next);
      return next;
    } finally {
      releaseLock();
    }
  };

  const next = chain.then(run, run);
  chain = next.then(
    () => undefined,
    () => undefined
  );
  return next as Promise<CmsStore>;
}

export function storePath(): string {
  return STORE_FILE;
}

/**
 * Hold the file lock for a synchronous read-modify-write (seed path).
 * Prefer updateStore() for async admin mutations.
 */
export function withStoreLockSync<T>(fn: () => T): T {
  acquireLock();
  try {
    return fn();
  } finally {
    releaseLock();
  }
}

/** Atomic write of a full store snapshot (caller must already hold lock or accept race). */
export function writeStoreSnapshot(store: CmsStore): void {
  writeStoreSync(store);
}

export function isCmsBootstrapped(): boolean {
  const s = readStore();
  return Boolean(s.seededAt) || s.products.length > 0 || s.genres.length > 0;
}

export type { CmsStore, CmsGenre, CmsProduct, CmsCollection };
