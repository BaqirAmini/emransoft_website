import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { Statistics } from "@/components/sections/statistics"
import { ProductsGrid } from "@/components/sections/products-grid"
import { AfghanistanMap } from "@/components/sections/afghanistan-map"
import { Features } from "@/components/sections/features"
import { Screenshots } from "@/components/sections/screenshots"
import { Testimonials } from "@/components/sections/testimonials"
import { LatestNews } from "@/components/sections/latest-news"
import { Websites } from "@/components/sections/websites"
import { CTA } from "@/components/sections/cta"
import { JsonLd } from "@/components/seo/json-ld"
import { buildPageMetadata, organizationJsonLd, siteDescription, siteTitle } from "@/lib/seo"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    locale,
    path: "/",
    title: siteTitle(locale),
    description: siteDescription(locale),
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <JsonLd data={organizationJsonLd(locale)} />
      <Hero />
      <Statistics />
      <ProductsGrid />
      <AfghanistanMap />
      <Features />
      <Screenshots />
      <Testimonials />
      <LatestNews locale={locale} />
      <Websites />
      <CTA />
    </>
  )
}
