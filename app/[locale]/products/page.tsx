"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { ProductsGrid } from "@/components/sections/products-grid"
import { CTA } from "@/components/sections/cta"

export default function ProductsPage() {
  const t = useTranslations("products")

  return (
    <>
      <ProductsGrid />
      <CTA />
    </>
  )
}
