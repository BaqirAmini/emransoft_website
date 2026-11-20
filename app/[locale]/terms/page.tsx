import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildPageMetadata, pageTitle, truncate } from "@/lib/seo"
import TermsPageClient from "./TermsPageClient"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "terms" })

  return buildPageMetadata({
    locale,
    path: "/terms",
    title: pageTitle(locale, t("title")),
    description: truncate(t("section1Desc")),
  })
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TermsPageClient />
}
