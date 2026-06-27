"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  const t = useTranslations("testimonials")

  return (
    <Section className="bg-slate-50/50">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <Quote className="size-8 text-blue-200 mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed flex-1" dir="auto">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex gap-1 mt-4 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
