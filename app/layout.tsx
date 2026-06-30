import type { Metadata } from "next"

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
    </html>
  )
}
