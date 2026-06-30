"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialIcon } from "@/components/ui/social-icon"
import { SOCIAL } from "@/constants"

export function CTA() {
  const t = useTranslations("cta")

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t("getStarted")}
              <ArrowRight className="size-4" />
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" href={SOCIAL.whatsapp}>
              <SocialIcon name="whatsapp" className="size-4" />
              {t("whatsapp")}
            </Button>
            <Button size="lg" variant="outline" icon={Send} iconPosition="left" className="border-white/30 text-white hover:bg-white/10" href={SOCIAL.telegram}>
              {t("telegram")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
