"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function LocaleProvider({
  locale,
  dir,
  className,
  children,
}: {
  locale: string
  dir: string
  className?: string
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return (
    <div
      className={cn("min-h-full flex flex-col bg-white text-slate-900 font-sans antialiased", className)}
      style={{ fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif" }}
    >
      {children}
    </div>
  )
}
