import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Section, SectionHeader } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { getArticles } from "@/lib/news"
import { NewsCard } from "@/components/news/NewsCard"

interface LatestNewsProps {
  locale: string
}

export async function LatestNews({ locale }: LatestNewsProps) {
  const t = await getTranslations({ locale, namespace: "news" })
  const allArticles = getArticles(locale)
  const latest = allArticles.slice(0, 3)

  if (latest.length === 0) return null

  return (
    <Section className="bg-slate-50/50">
      <SectionHeader title={t("homepageTitle")} subtitle={t("homepageSubtitle")} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latest.map((article, index) => (
          <NewsCard key={article.slug} article={article} index={index} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/news">
          {t("viewAll")}
        </Button>
      </div>
    </Section>
  )
}
