"use client";

import type { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * Site-wide member session.
 *
 * Always pass a server-read `session` (including `null`). Auth.js then skips
 * the first-paint `/api/auth/session` fetch. That fetch is what throws
 * ClientFetchError and paints the Next.js pink overlay over demos when the
 * route is still compiling or AUTH_URL points at another port.
 */
export function SessionProvider({
  children,
  session = null,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <NextAuthSessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchInterval={0}
    >
      {children}
    </NextAuthSessionProvider>
  );
}
