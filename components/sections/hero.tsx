"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/sections/animated-background"

const slides = [
  { src: "/images/screenshots/crown-dashboard.png", alt: "Crown Dashboard" },
  { src: "/images/screenshots/patients-management.png", alt: "Patient Management" },
  { src: "/images/screenshots/billing-invoicing.png", alt: "Billing & Invoicing" },
  { src: "/images/screenshots/labra-order-management.png", alt: "Labra Order Management" },
  { src: "/images/screenshots/tajviz-prescription.png", alt: "Tajviz Prescription" },
]

export function Hero() {
  const t = useTranslations("hero")
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
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
            className="relative hidden lg:block"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl p-4">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-slate-100 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={slides[current].src}
                        alt={slides[current].alt}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 1024px) 50vw, 600px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`size-2 rounded-full transition-all duration-300 ${
                        i === current ? "bg-blue-600 w-5" : "bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
