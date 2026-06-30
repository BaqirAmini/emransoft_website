"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Section, SectionHeader } from "@/components/ui/section"
import { FeaturedNews } from "@/components/news/FeaturedNews"
import { NewsCard } from "@/components/news/NewsCard"
import { NewsSearch } from "@/components/news/NewsSearch"
import { TagFilter } from "@/components/news/TagFilter"
import type { ArticleMeta } from "@/lib/news"

interface NewsListingClientProps {
  articles: ArticleMeta[]
  allTags: string[]
  locale: string
}

export function NewsListingClient({ articles, allTags, locale }: NewsListingClientProps) {
  const t = useTranslations("news")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const featured = useMemo(() => articles.find((a) => a.featured), [articles])
  const nonFeatured = useMemo(() => articles.filter((a) => !a.featured), [articles])

  const filtered = useMemo(() => {
    const target = featured ? nonFeatured : articles

    return target.filter((article) => {
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTag = !selectedTag || article.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [featured, nonFeatured, articles, searchQuery, selectedTag])

  if (articles.length === 0) {
    return (
      <Section>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-slate-500 text-lg">{t("notAvailable")}</p>
        </div>
      </Section>
    )
  }

  return (
    <Section>
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mb-10 space-y-6">
        <div className="max-w-md">
          <NewsSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
        <TagFilter tags={allTags} selectedTag={selectedTag} onSelect={setSelectedTag} />
      </div>

      {featured && !searchQuery && !selectedTag && (
        <div className="mb-10">
          <FeaturedNews article={featured} />
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => (
            <NewsCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-slate-500 text-lg">{t("noResults")}</p>
        </motion.div>
      )}
    </Section>
  )
}
