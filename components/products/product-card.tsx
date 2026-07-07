"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  index: number
}

const logoMap: Record<string, string> = {
  crown: "/images/logo/crown_logo_blue.png",
  labra: "/images/logo/labra_logo.ico",
  tajviz: "/images/logo/tajviz_logo.png",
}

const tKeyMap: Record<string, string> = {
  crown: "productCrown",
  labra: "productLabra",
  tajviz: "productTajviz",
}

export function ProductCard({ product, index }: ProductCardProps) {
  const t = useTranslations(tKeyMap[product.id] || "productCrown")
  const productsT = useTranslations("products")

  const c = product.color
  const badgeVariant = index === 0 ? "blue" : index === 1 ? "emerald" : "violet"

  return (
    <motion.div
      id={product.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full scroll-mt-28"
    >
      <Card glow className="group relative h-full flex flex-col overflow-hidden p-8">
        {/* colored top accent */}
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: `linear-gradient(90deg, ${c}, color-mix(in srgb, ${c} 40%, white))` }}
        />

        <div className="flex items-start justify-between mb-6">
          <div
            className="flex size-16 items-center justify-center rounded-2xl p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{
              background: `color-mix(in srgb, ${c} 8%, white)`,
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${c} 22%, white)`,
            }}
          >
            <Image
              src={logoMap[product.icon] || "/images/logo/emransoft_logo.png"}
              alt={product.name}
              width={44}
              height={44}
              className="object-contain size-full"
            />
          </div>
          <Badge variant={badgeVariant}>{t("tagline")}</Badge>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-1.5">{product.name}</h3>
        <p className="text-sm font-medium italic mb-4" style={{ color: c }}>
          {t("slogan")}
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {t("description")}
        </p>

        <div className="flex-1">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {productsT("features")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {product.features.map((feature, i) => (
              <div key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md"
                  style={{ background: `color-mix(in srgb, ${c} 14%, white)` }}
                >
                  <Check className="size-3" style={{ color: c }} strokeWidth={3} />
                </span>
                <span className="leading-snug">{t(`features.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/products#${product.id}`}
          className="group/cta mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 58%, white))`,
            boxShadow: `0 10px 22px -10px ${c}`,
          }}
        >
          {productsT("learnMore", { name: product.name })}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </Card>
    </motion.div>
  )
}
