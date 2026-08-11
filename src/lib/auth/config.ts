import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import {
  ensureMember,
  isPaidEmail,
  type MemberPlan,
} from "@/lib/members/store";

/**
 * ClickMotion member auth (Google OAuth).
 * Ops: set AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET (see docs/ops/GOOGLE_OAUTH_SETUP.md).
 * Do not surface quota numbers on public UI.
 */

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan?: MemberPlan;
    };
  }
}

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET);

/**
 * Auth.js requires AUTH_SECRET. Without it every /api/auth/* call 500s and
 * Next.js paints the pink "1 error" toast over the whole marketing site
 * (including product demos). Use a local-only fallback in development so
 * session probes return null instead of exploding; production still requires
 * a real secret.
 */
const envSecret =
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || undefined;
const isProd = process.env.NODE_ENV === "production";
const authSecret =
  envSecret ||
  (!isProd ? "clickmotion-dev-only-auth-secret-not-for-production" : undefined);

if (!envSecret && !isProd) {
  // Once per process — helps operators wire OAuth without pink error chrome.
  console.warn(
    "[auth] AUTH_SECRET missing — using insecure dev fallback. Set AUTH_SECRET (and Google OAuth keys) in .env.local. See docs/ops/GOOGLE_OAUTH_SETUP.md"
  );
}

export const authConfig = {
  providers: googleConfigured
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID!,
          clientSecret:
            process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET!,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      const email = user.email?.toLowerCase().trim();
      if (!email) return false;
      await ensureMember({
        email,
        name: user.name ?? undefined,
        image: user.image ?? undefined,
        googleId: account.providerAccountId,
      });
      return true;
    },
    async jwt({ token, user, trigger }) {
      const email = (user?.email || token.email || "").toString().toLowerCase();
      if (email) {
        token.email = email;
        // Refresh plan on sign-in and periodically useful via trigger
        if (user || trigger === "update") {
          token.plan = isPaidEmail(email) ? "paid" : "free";
        } else if (!token.plan) {
          token.plan = isPaidEmail(email) ? "paid" : "free";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = (token.email as string) || session.user.email;
        session.user.plan =
          (token.plan as MemberPlan) ||
          (session.user.email && isPaidEmail(session.user.email)
            ? "paid"
            : "free");
      }
      return session;
    },
  },
  trustHost: true,
  secret: authSecret,
  // Quiet client when Google isn't wired yet — no provider spam in UI.
  debug: false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export function isGoogleAuthConfigured(): boolean {
  return googleConfigured && Boolean(envSecret);
}
