"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/sections/animated-background"
import { COMPANY } from "@/constants"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95]"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button size="lg" icon={ArrowRight} href="/products">
                {t("exploreProducts")}
              </Button>
              <Button size="lg" variant="outline" icon={Play} iconPosition="left" href="/contact">
                {t("contactUs")}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl p-4">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-slate-100 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-blue-600 text-white mb-6">
                      <span className="text-3xl font-bold">E</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{COMPANY.name}</h3>
                    <p className="text-slate-500 mt-2">Software that powers healthcare</p>
                    <div className="mt-6 flex justify-center gap-3">
                      <div className="size-3 rounded-full bg-blue-600 animate-pulse" />
                      <div className="size-3 rounded-full bg-emerald-500" />
                      <div className="size-3 rounded-full bg-violet-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
