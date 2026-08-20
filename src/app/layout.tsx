import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContextMenuGuard } from "@/components/media/ContextMenuGuard";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { auth } from "@/lib/auth/config";
import { inter, syne, birthstone } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@ClickMotion" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  try {
    session = await auth();
  } catch (err) {
    console.warn("[auth] root session read failed; continuing logged out", err);
    session = null;
  }

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${syne.variable} ${birthstone.variable}`}
    >
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <SessionProvider session={session}>
          <Suspense fallback={null}>
            <ContextMenuGuard />
          </Suspense>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
