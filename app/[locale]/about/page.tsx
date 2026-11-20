import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildPageMetadata, pageTitle, truncate } from "@/lib/seo"
import AboutPageClient from "./AboutPageClient"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })

  return buildPageMetadata({
    locale,
    path: "/about",
    title: pageTitle(locale, t("title")),
    description: truncate(t("subtitle")),
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AboutPageClient />
}
