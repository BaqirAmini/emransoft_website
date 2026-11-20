import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildPageMetadata, pageTitle, truncate } from "@/lib/seo"
import PrivacyPageClient from "./PrivacyPageClient"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "privacy" })

  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: pageTitle(locale, t("title")),
    description: truncate(t("intro")),
  })
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <PrivacyPageClient />
}
