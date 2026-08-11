import { NextResponse } from "next/server";
import { requireAdmin } from "./auth";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function withAdmin<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    await requireAdmin();
    const data = await handler();
    return jsonOk(data);
  } catch (e) {
    const err = e as Error & { status?: number };
    const status =
      typeof err.status === "number" && err.status >= 400 && err.status < 600
        ? err.status
        : 500;
    // Never leak stack internals; keep known Error messages for 4xx only
    const message =
      status < 500 && err.message
        ? err.message
        : status === 401
          ? "Unauthorized"
          : "Server error";
    return jsonError(message, status);
  }
}

export async function parseJsonBody<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw Object.assign(new Error("Invalid JSON body"), { status: 400 });
  }
}
