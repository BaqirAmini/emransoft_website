"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"

export default function TestimonialsPage() {
  const t = useTranslations("testimonials")

  return (
    <>
      <Section className="pt-32">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </Section>
      <Testimonials />
      <CTA />
    </>
  )
}
