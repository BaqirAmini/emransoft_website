"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, User, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RelatedNews } from "@/components/news/RelatedNews"
import { MDXRenderer } from "./MDXRenderer"
import type { Article, ArticleMeta } from "@/lib/news"

interface ArticlePageClientProps {
  article: Article
  prevArticle: ArticleMeta | null
  nextArticle: ArticleMeta | null
  relatedArticles: ArticleMeta[]
  locale: string
}

export function ArticlePageClient({
  article,
  prevArticle,
  nextArticle,
  relatedArticles,
  locale,
}: ArticlePageClientProps) {
  const t = useTranslations("news")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.coverImage,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Emransoft",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://emransoft.com/${locale === "fa" ? "" : locale}/news/${article.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8"
            >
              <ChevronLeft className="size-4" />
              {t("backToNews")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="blue">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {t("publishedOn")} {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {t("by")} {article.author}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-10 relative aspect-[2/1] rounded-2xl overflow-hidden bg-slate-100"
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose-wrapper mt-10 md:mt-12">
              <MDXRenderer content={article.content} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100"
          >
            <div>
              {prevArticle && (
                <Link
                  href={`/news/${prevArticle.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <div className="text-left">
                    <span className="block text-xs text-slate-400 mb-0.5">
                      {t("previousArticle")}
                    </span>
                    <span className="line-clamp-1 max-w-[200px]">{prevArticle.title}</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="text-right">
              {nextArticle && (
                <Link
                  href={`/news/${nextArticle.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <div className="text-right">
                    <span className="block text-xs text-slate-400 mb-0.5">
                      {t("nextArticle")}
                    </span>
                    <span className="line-clamp-1 max-w-[200px]">{nextArticle.title}</span>
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="text-center">
              <Button variant="outline" href="/news" icon={ChevronLeft} iconPosition="left">
                {t("backToNews")}
              </Button>
            </div>
          </motion.div>

          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 pt-16 border-t border-slate-100"
            >
              <RelatedNews articles={relatedArticles} />
            </motion.div>
          )}
        </div>
      </article>
    </>
  )
}
