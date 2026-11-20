// Fallback 404 for requests that never reach a valid [locale] segment.
// Because the root layout doesn't render <html>/<body>, this page must.
// Localized 404s are handled by app/[locale]/not-found.tsx.

import Link from "next/link"
import "./globals.css"

export default function RootNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <span style={{ fontSize: "3rem", fontWeight: 700, color: "#2563eb" }}>404</span>
          <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Emransoft
          </Link>
        </div>
      </body>
    </html>
  )
}
