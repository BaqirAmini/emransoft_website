import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { ROUTES } from "@/constants"
import { getAllArticleSlugs, getArticle } from "@/lib/news"
import { absoluteUrl } from "@/lib/seo"

const STATIC_PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: ROUTES.home, changeFrequency: "weekly", priority: 1 },
  { path: ROUTES.products, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.news, changeFrequency: "weekly", priority: 0.8 },
  { path: ROUTES.about, changeFrequency: "monthly", priority: 0.7 },
  { path: ROUTES.testimonials, changeFrequency: "monthly", priority: 0.6 },
  { path: ROUTES.contact, changeFrequency: "yearly", priority: 0.6 },
  { path: ROUTES.privacy, changeFrequency: "yearly", priority: 0.2 },
  { path: ROUTES.terms, changeFrequency: "yearly", priority: 0.2 },
]

function languagesFor(path: string, locales: readonly string[]) {
  return Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of STATIC_PAGES) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(locale, page.path),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: languagesFor(page.path, routing.locales) },
      })
    }
  }

  // News articles: only list the languages each article actually exists in.
  const articles = getAllArticleSlugs()
  const localesBySlug = new Map<string, string[]>()
  for (const { locale, slug } of articles) {
    localesBySlug.set(slug, [...(localesBySlug.get(slug) ?? []), locale])
  }

  for (const { locale, slug } of articles) {
    if (!(routing.locales as readonly string[]).includes(locale)) continue
    const path = `/news/${slug}`
    const article = getArticle(locale, slug)
    const date = article?.date ? new Date(article.date) : undefined
    entries.push({
      url: absoluteUrl(locale, path),
      lastModified: date && !Number.isNaN(date.getTime()) ? date : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: languagesFor(path, localesBySlug.get(slug) ?? [locale]) },
    })
  }

  return entries
}
