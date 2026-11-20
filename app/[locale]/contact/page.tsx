import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { JsonLd } from "@/components/seo/json-ld"
import { SITE_URL, absoluteUrl, buildPageMetadata, pageTitle, truncate } from "@/lib/seo"
import ContactPageClient from "./ContactPageClient"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })

  return buildPageMetadata({
    locale,
    path: "/contact",
    title: pageTitle(locale, t("title")),
    description: truncate(t("subtitle")),
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl(locale, "/contact"),
    inLanguage: locale,
    about: { "@id": `${SITE_URL}/#organization` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactPageClient />
    </>
  )
}
