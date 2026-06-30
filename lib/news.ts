import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  coverImage: string
  tags: string[]
  featured: boolean
  locale: string
}

export interface Article extends ArticleMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "news")

function readArticleFile(filePath: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const source = fs.readFileSync(filePath, "utf8")
    return matter(source)
  } catch {
    return null
  }
}

export function getArticles(locale: string): ArticleMeta[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

  const articles: ArticleMeta[] = []

  for (const file of files) {
    const result = readArticleFile(path.join(dir, file))
    if (!result) continue
    const { data } = result
    articles.push({
      slug: (data.slug as string) || file.replace(".mdx", ""),
      title: (data.title as string) || "",
      description: (data.description as string) || "",
      date: (data.date as string) || "",
      author: (data.author as string) || "",
      coverImage: (data.coverImage as string) || "",
      tags: (data.tags as string[]) || [],
      featured: (data.featured as boolean) || false,
      locale,
    })
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticle(locale: string, slug: string): Article | null {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return null

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

  for (const file of files) {
    const result = readArticleFile(path.join(dir, file))
    if (!result) continue
    const { data, content } = result
    const articleSlug = (data.slug as string) || file.replace(".mdx", "")
    if (articleSlug === slug) {
      return {
        slug: articleSlug,
        title: (data.title as string) || "",
        description: (data.description as string) || "",
        date: (data.date as string) || "",
        author: (data.author as string) || "",
        coverImage: (data.coverImage as string) || "",
        tags: (data.tags as string[]) || [],
        featured: (data.featured as boolean) || false,
        locale,
        content,
      }
    }
  }

  return null
}

export function getAllSlugs(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
}

export function getAvailableLocales(slug: string): string[] {
  const locales: string[] = []
  const dirs = fs.readdirSync(CONTENT_DIR)
  for (const locale of dirs) {
    const localeDir = path.join(CONTENT_DIR, locale)
    if (!fs.statSync(localeDir).isDirectory()) continue
    const files = fs.readdirSync(localeDir)
    for (const file of files) {
      const result = readArticleFile(path.join(localeDir, file))
      if (result && (result.data.slug as string) === slug) {
        locales.push(locale)
        break
      }
    }
  }
  return locales
}

export function getAllArticleSlugs(): { locale: string; slug: string }[] {
  const result: { locale: string; slug: string }[] = []
  const dirs = fs.readdirSync(CONTENT_DIR)
  for (const locale of dirs) {
    const localeDir = path.join(CONTENT_DIR, locale)
    if (!fs.statSync(localeDir).isDirectory()) continue
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".mdx"))
    for (const file of files) {
      const parsed = readArticleFile(path.join(localeDir, file))
      if (parsed) {
        result.push({
          locale,
          slug: (parsed.data.slug as string) || file.replace(".mdx", ""),
        })
      }
    }
  }
  return result
}

export function getArticleTags(locale: string): string[] {
  const articles = getArticles(locale)
  const tagSet = new Set<string>()
  for (const article of articles) {
    for (const tag of article.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

export function getRelatedArticles(article: ArticleMeta, allArticles: ArticleMeta[], max: number = 3): ArticleMeta[] {
  return allArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      ...a,
      relevance: a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .filter((a) => a.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, max)
}
