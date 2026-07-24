"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { NewsCover } from "@/components/news/NewsCover"
import type { ArticleMeta } from "@/lib/news"

interface NewsCardProps {
  article: ArticleMeta
  index?: number
}

export function NewsCard({ article, index = 0 }: Readonly<NewsCardProps>) {
  const t = useTranslations("news")

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      <Link href={`/news/${article.slug}`} className="block">
        <NewsCover tags={article.tags} slug={article.slug} className="aspect-video" />
      </Link>

      <div className="flex-1 flex flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="blue" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Link href={`/news/${article.slug}`} className="block group/title">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover/title:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {article.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="size-3.5" />
            <span>{article.date}</span>
          </div>

          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t("readMore")}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
