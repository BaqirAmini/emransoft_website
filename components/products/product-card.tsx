"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card glow className="h-full flex flex-col p-8">
        <div className="flex items-start justify-between mb-6">
          <div
            className="flex size-14 items-center justify-center rounded-2xl bg-white p-2"
            style={{ border: `2px solid ${product.color}` }}
          >
            <Image
              src={logoMap[product.icon] || "/images/logo/emransoft_logo.png"}
              alt={product.name}
              width={40}
              height={40}
              className="object-contain size-full"
            />
          </div>
          <Badge variant={index === 0 ? "blue" : index === 1 ? "emerald" : "violet"}>
            {t("tagline")}
          </Badge>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-sm text-slate-500 italic mb-4">{t("slogan")}</p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {t("description")}
        </p>

        <div className="flex-1">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            {productsT("features")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="size-4 shrink-0" style={{ color: product.color }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <Button
            variant="outline"
            icon={ArrowRight}
            className="w-full justify-between"
            href={`/products#${product.id}`}
          >
            {productsT("learnMore", { name: product.name })}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
