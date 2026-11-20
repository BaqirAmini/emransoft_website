"use client"

import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  const t = useTranslations("terms")

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">
          {t("title")}
        </h1>
        <Card>
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>{t("lastUpdated")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section1Title")}</h2>
            <p>{t("section1Desc")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section2Title")}</h2>
            <p>{t("section2Desc")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section3Title")}</h2>
            <p>{t("section3Desc")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section4Title")}</h2>
            <p>{t("section4Desc")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section5Title")}</h2>
            <p>{t("section5Desc")}</p>
            <h2 className="text-xl font-semibold text-slate-900">{t("section6Title")}</h2>
            <p>{t("section6Desc", { email: "info@emransoft.com" })}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
