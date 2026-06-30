import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getArticles, getArticleTags } from "@/lib/news"
import { NewsListingClient } from "./NewsListingClient"

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "news" })
  const baseUrl = "https://emransoft.com"

  const titles: Record<string, string> = {
    fa: "اخبار | عمران سافت",
    en: "News | Emransoft",
    ps: "خبرونه | امَرانسافت",
  }

  const descriptions: Record<string, string> = {
    fa: "با آخرین اخبار و اعلامیه‌های عمران سافت به‌روز بمانید.",
    en: "Stay updated with the latest news and announcements from Emransoft.",
    ps: "د امَرانسافت څخه د وروستيو خبرونو او اعلانونو سره تازه اوسئ.",
  }

  const title = titles[locale] || titles.en
  const description = descriptions[locale] || descriptions.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "fa" ? "fa_AF" : locale === "ps" ? "ps_AF" : "en_US",
      type: "website",
      siteName: "Emransoft",
      url: `${baseUrl}/${locale === "en" ? "en" : ""}/news`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "fa" ? "" : locale}/news`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const articles = getArticles(locale)
  const allTags = getArticleTags(locale)

  return <NewsListingClient articles={articles} allTags={allTags} locale={locale} />
}
