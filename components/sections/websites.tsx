"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ExternalLink, Globe, Code, Database, ArrowRight, MessageSquare } from "lucide-react"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { websites } from "@/data/websites"

export function Websites() {
  const t = useTranslations("websites")

  return (
    <Section className="bg-slate-50/50">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {websites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col" glow>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-4">
                {site.preview ? (
                  <Image
                    src={site.preview}
                    alt={site.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Globe className="size-12 text-slate-300" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {site.tags.map((tag) => (
                  <Badge key={tag} variant="slate">{tag}</Badge>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {site.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
                {site.description}
              </p>

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-xl border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <ExternalLink className="size-4" />
                {t("visitSite")}
              </a>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-center"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex justify-center gap-3 mb-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
              <Code className="size-6 text-white" />
            </div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
              <Database className="size-6 text-white" />
            </div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
              <Globe className="size-6 text-white" />
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("ctaTitle")}
          </h3>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-8">
            {t("ctaSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageSquare className="size-4" />
              {t("ctaContact")}
            </Link>
            <a
              href="https://wa.me/93792195121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl bg-blue-700 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t("ctaWhatsapp")}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
