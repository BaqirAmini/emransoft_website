import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getArticles, getArticleTags } from "@/lib/news"
import { buildPageMetadata } from "@/lib/seo"
import { NewsListingClient } from "./NewsListingClient"

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const titles: Record<string, string> = {
  fa: "اخبار | عمران سافت",
  en: "News | Emransoft",
  ps: "خبرونه | عمران سافت",
}

const descriptions: Record<string, string> = {
  fa: "با آخرین اخبار و اعلامیه‌های عمران سافت به‌روز بمانید.",
  en: "Stay updated with the latest news and announcements from Emransoft.",
  ps: "د عمران سافت څخه د وروستيو خبرونو او اعلانونو سره تازه اوسئ.",
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    locale,
    path: "/news",
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  })
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const articles = getArticles(locale)
  const allTags = getArticleTags(locale)

  return <NewsListingClient articles={articles} allTags={allTags} locale={locale} />
}
