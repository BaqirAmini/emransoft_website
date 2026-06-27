"use client"

import { useTranslations } from "next-intl"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"

export default function LocaleNotFound() {
  const t = useTranslations("notFound")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-blue-50 mb-8">
        <span className="text-5xl font-bold text-blue-600">404</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
        {t("title")}
      </h1>
      <p className="text-lg text-slate-600 max-w-md mb-8">
        {t("subtitle")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="size-4" />
        {t("backHome")}
      </Link>
    </div>
  )
}
