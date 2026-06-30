import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import {
  getArticle,
  getAllArticleSlugs,
  getArticles,
  getRelatedArticles,
} from "@/lib/news"
import { ArticlePageClient } from "./ArticlePageClient"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map(({ locale, slug }) => ({ locale, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const article = getArticle(locale, slug)
  const t = await getTranslations({ locale, namespace: "news" })
  const baseUrl = "https://emransoft.com"

  if (!article) {
    return {
      title: t("notAvailable"),
    }
  }

  const title = `${article.title} | Emransoft`
  const description = article.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: locale === "fa" ? "fa_AF" : locale === "ps" ? "ps_AF" : "en_US",
      siteName: "Emransoft",
      url: `${baseUrl}/${locale === "fa" ? "" : locale}/news/${slug}`,
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "fa" ? "" : locale}/news/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "article:published_time": article.date,
      "article:author": article.author,
      ...article.tags.reduce(
        (acc, tag) => ({ ...acc, "article:tag": tag }),
        {} as Record<string, string>
      ),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const article = getArticle(locale, slug)
  if (!article) {
    const t = await getTranslations({ locale, namespace: "news" })
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <p className="text-slate-500 text-lg">{t("notAvailable")}</p>
      </div>
    )
  }

  const allArticles = getArticles(locale)
  const currentIndex = allArticles.findIndex((a) => a.slug === slug)
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  const related = getRelatedArticles(article, allArticles)

  return (
    <ArticlePageClient
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      relatedArticles={related}
      locale={locale}
    />
  )
}
