"use client"

import { useTranslations } from "next-intl"
import { Target, Eye, Heart } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardIcon } from "@/components/ui/card"
import { COMPANY } from "@/constants"

const sections = [
  { key: "mission", icon: Target, color: "blue" as const },
  { key: "vision", icon: Eye, color: "emerald" as const },
  { key: "values", icon: Heart, color: "violet" as const },
]

export default function AboutPage() {
  const t = useTranslations("about")
  const companyName = COMPANY.name

  return (
    <Section className="pt-32">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {sections.map(({ key, icon: Icon, color }) => (
          <Card key={key} className="text-center">
            <CardIcon color={color}>
              <Icon className="size-7" />
            </CardIcon>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {t(`${key}.title`)}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(`${key}.desc`)}
            </p>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {t("storyTitle")}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {t("story")}
          </p>
        </Card>
      </div>
    </Section>
  )
}
