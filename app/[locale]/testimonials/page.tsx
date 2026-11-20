import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildPageMetadata, pageTitle, truncate } from "@/lib/seo"
import TestimonialsPageClient from "./TestimonialsPageClient"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "testimonials" })

  return buildPageMetadata({
    locale,
    path: "/testimonials",
    title: pageTitle(locale, t("title")),
    description: truncate(t("subtitle")),
  })
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TestimonialsPageClient />
}
