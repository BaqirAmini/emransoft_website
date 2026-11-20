import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo"

// The <html>/<body> tags live in app/[locale]/layout.tsx so the server-rendered
// HTML carries the correct lang/dir for each locale (important for SEO).
// This root layout only passes children through, as recommended by next-intl.
//
// The favicon is provided by the App Router file convention: app/icon.png.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
