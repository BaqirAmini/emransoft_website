"use client"

import { useTranslations } from "next-intl"
import { Section, SectionHeader } from "@/components/ui/section"
import { ProductCard } from "@/components/products/product-card"
import { products } from "@/data/products"

export function ProductsGrid() {
  const t = useTranslations("products")

  return (
    <Section id="products" className="bg-white">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </Section>
  )
}
