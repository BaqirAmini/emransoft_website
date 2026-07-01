"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/sections/animated-background"
import { heroScenes } from "@/components/sections/hero-visuals"

export function Hero() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const isRtl = locale === "fa" || locale === "ps"
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroScenes.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + heroScenes.length) % heroScenes.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

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
            className="relative block mt-4 sm:mt-8 lg:-mt-16 xl:-mt-24"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Ambient glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/20 via-sky-400/10 to-blue-400/20 rounded-[2rem] blur-3xl" />

              {/* Browser-style window */}
              <div className="relative rounded-2xl border border-slate-200/70 bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)] overflow-hidden ring-1 ring-white/50">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <span className="size-3 rounded-full bg-red-400/80" />
                  <span className="size-3 rounded-full bg-amber-400/80" />
                  <span className="size-3 rounded-full bg-green-400/80" />
                  <div className="ml-3 flex-1">
                    <div className="mx-auto h-5 max-w-[60%] rounded-md bg-white border border-slate-200/80" />
                  </div>
                </div>

                {/* Slides — stacked crossfade (all mounted; opacity toggled) */}
                <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 via-white to-blue-50/50 relative overflow-hidden">
                  {heroScenes.map(({ id, label, Scene }, i) => (
                    <div
                      key={id}
                      className={`absolute inset-0 p-4 transition-opacity duration-700 ease-in-out ${
                        i === current ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ pointerEvents: i === current ? "auto" : "none" }}
                      role="img"
                      aria-label={label}
                    >
                      <Scene />
                    </div>
                  ))}

                  {/* Manual navigation arrows (RTL-aware: left arrow advances in RTL) */}
                  <button
                    onClick={isRtl ? next : prev}
                    aria-label={isRtl ? "Next slide" : "Previous slide"}
                    className="group absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200/70 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    onClick={isRtl ? prev : next}
                    aria-label={isRtl ? "Previous slide" : "Next slide"}
                    className="group absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200/70 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Inspiring per-slide caption */}
              <div className="relative mt-6 h-6">
                {heroScenes.map(({ id }, i) => (
                  <div
                    key={id}
                    className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-500 ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-blue-600" />
                    <p className="text-base font-semibold tracking-tight text-slate-800">
                      {t(`scenes.${id}`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {heroScenes.map(({ id, label }, i) => (
                  <button
                    key={id}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-blue-600 w-6" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Show ${label}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
