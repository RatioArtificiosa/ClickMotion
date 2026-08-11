"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * Site-wide member session. When Auth.js is not fully configured,
 * /api/auth/session returns null (not 500) so Next.js never shows the
 * pink "1 error" toast over product demos.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      {children}
    </NextAuthSessionProvider>
  );
}
