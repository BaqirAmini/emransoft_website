import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo/emransoft_logo_square.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-3JKLZD5N1Y" />
      )}
    </html>
  )
}
