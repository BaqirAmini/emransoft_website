"use client"

import { useTranslations } from "next-intl"
import { NewsCard } from "./NewsCard"
import type { ArticleMeta } from "@/lib/news"

interface RelatedNewsProps {
  articles: ArticleMeta[]
}

export function RelatedNews({ articles }: RelatedNewsProps) {
  const t = useTranslations("news")

  if (articles.length === 0) return null

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-8">
        {t("relatedArticles")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </div>
  )
}
