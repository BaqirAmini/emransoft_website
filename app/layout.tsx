import { GoogleAnalytics } from "@next/third-parties/google"

// The favicon is provided by the App Router file convention: app/icon.png
// (a transparent version of the brand mark). No metadata.icons override
// is needed — Next injects the <link rel="icon"> automatically.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // lang is a sensible SSR default; LocaleProvider updates it per locale at runtime.
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-3JKLZD5N1Y" />
      )}
    </html>
  )
}
