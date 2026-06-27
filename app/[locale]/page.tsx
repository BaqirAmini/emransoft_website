import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { Statistics } from "@/components/sections/statistics"
import { ProductsGrid } from "@/components/sections/products-grid"
import { AfghanistanMap } from "@/components/sections/afghanistan-map"
import { Features } from "@/components/sections/features"
import { Screenshots } from "@/components/sections/screenshots"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Statistics />
      <ProductsGrid />
      <AfghanistanMap />
      <Features />
      <Screenshots />
      <Testimonials />
      <CTA />
    </>
  )
}
