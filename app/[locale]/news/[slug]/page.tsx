import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  getArticle,
  getAllArticleSlugs,
  getArticles,
  getAvailableLocales,
  getRelatedArticles,
} from "@/lib/news"
import {
  SITE_NAME,
  SITE_URL,
  LOGO_URL,
  absoluteAsset,
  absoluteUrl,
  buildPageMetadata,
  pageTitle,
  truncate,
} from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { ArticlePageClient } from "./ArticlePageClient"
import { MDXRenderer } from "./MDXRenderer"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map(({ locale, slug }) => ({ locale, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const article = getArticle(locale, slug)

  // The page itself calls notFound(); keep the 404 out of the index.
  if (!article) return { robots: { index: false, follow: true } }

  return buildPageMetadata({
    locale,
    path: `/news/${slug}`,
    title: pageTitle(locale, article.title),
    description: truncate(article.description),
    type: "article",
    images: article.coverImage ? [{ url: article.coverImage, alt: article.title }] : undefined,
    // Only advertise translations that actually exist for this article.
    availableLocales: getAvailableLocales(slug),
    publishedTime: article.date,
    authors: article.author ? [article.author] : undefined,
    tags: article.tags,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const article = getArticle(locale, slug)
  // Returns a real HTTP 404 (rendered by ./not-found.tsx) instead of a "soft 404".
  if (!article) notFound()

  const allArticles = getArticles(locale)
  const currentIndex = allArticles.findIndex((a) => a.slug === slug)
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  const related = getRelatedArticles(article, allArticles)
  const url = absoluteUrl(locale, `/news/${slug}`)
  const tNav = await getTranslations({ locale, namespace: "nav" })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.coverImage ? [absoluteAsset(article.coverImage)] : undefined,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    keywords: article.tags.join(", "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: article.author ? { "@type": "Person", name: article.author } : undefined,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tNav("home"), item: absoluteUrl(locale, "/") },
      { "@type": "ListItem", position: 2, name: tNav("news"), item: absoluteUrl(locale, "/news") },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumbs]} />
      <ArticlePageClient
        article={article}
        renderedContent={<MDXRenderer content={article.content} />}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        relatedArticles={related}
        locale={locale}
      />
    </>
  )
}
