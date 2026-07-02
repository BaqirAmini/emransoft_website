"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { NewsCover } from "@/components/news/NewsCover"
import type { ArticleMeta } from "@/lib/news"

interface FeaturedNewsProps {
  article: ArticleMeta
}

export function FeaturedNews({ article }: Readonly<FeaturedNewsProps>) {
  const t = useTranslations("news")

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/news/${article.slug}`} className="block md:grid md:grid-cols-2 md:gap-0">
        <div className="relative aspect-4/3 md:aspect-auto md:h-full min-h-70">
          <NewsCover tags={article.tags} slug={article.slug} showLabel={false} className="absolute inset-0 size-full" />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 text-amber-700 border border-amber-200 px-3 py-1 text-xs font-medium shadow-sm">
              <Star className="size-3 fill-amber-500 text-amber-500" />
              Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="blue" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-3">
            {article.title}
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-600 line-clamp-3 leading-relaxed">
            {article.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="size-3.5" />
              <span>{article.date}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              {t("readMore")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
