"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function LocaleProvider({
  locale,
  dir,
  className,
  children,
}: Readonly<{
  locale: string
  dir: string
  className?: string
  children: React.ReactNode
}>) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  // Use Vazirmatn for RTL (Dari/Pashto) scripts and Geist for LTR (English).
  const fontFamily =
    dir === "rtl"
      ? "var(--font-vazirmatn), system-ui, -apple-system, sans-serif"
      : "var(--font-geist-sans), system-ui, -apple-system, sans-serif"

  return (
    <div
      className={cn("min-h-full flex flex-col bg-white text-slate-900 font-sans antialiased", className)}
      style={{ fontFamily }}
    >
      {children}
    </div>
  )
}
