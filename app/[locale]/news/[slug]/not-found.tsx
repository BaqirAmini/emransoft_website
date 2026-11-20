"use client"

import { useTranslations } from "next-intl"
import { ChevronLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"

// Shown (with HTTP 404) when an article doesn't exist in the current language —
// e.g. switching to Pashto on an article that has no Pashto translation yet.
export default function ArticleNotFound() {
  const t = useTranslations("news")

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[50vh] text-center px-4">
      <p className="text-slate-500 text-lg">{t("notAvailable")}</p>
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ChevronLeft className="size-4" />
        {t("backToNews")}
      </Link>
    </div>
  )
}
