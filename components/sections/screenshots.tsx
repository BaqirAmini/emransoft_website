"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Monitor } from "lucide-react"
import { Section, SectionHeader } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

const screenshots = [
  { id: "crown-dashboard", title: "Crown Dashboard", description: "Complete clinic overview at a glance", color: "from-blue-600 to-blue-400", label: "C", image: "/images/screenshots/crown-dashboard.png" },
  { id: "crown-patients", title: "Patient Management", description: "Efficient patient record management", color: "from-emerald-600 to-emerald-400", label: "P", image: null },
  { id: "crown-billing", title: "Billing & Invoicing", description: "Professional billing with installment tracking", color: "from-violet-600 to-violet-400", label: "B", image: null },
  { id: "labra-orders", title: "Labra Order Management", description: "Streamlined laboratory workflow", color: "from-amber-600 to-amber-400", label: "L", image: null },
  { id: "tajviz-prescription", title: "Tajviz Prescriptions", description: "Modern digital prescription system", color: "from-rose-600 to-rose-400", label: "T", image: null },
]

export function Screenshots() {
  const t = useTranslations("screenshots")
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0 }),
  }

  function goTo(index: number) {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  function next() {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % screenshots.length)
  }

  function prev() {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const screenshot = screenshots[current]

  return (
    <Section className="bg-white overflow-hidden">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-slate-400 font-medium">{screenshot.title}</span>
                </div>
                <div className="flex gap-1.5">
                  <Monitor className="size-3.5 text-slate-400" />
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    {screenshot.image ? (
                      <Image
                        src={screenshot.image}
                        alt={screenshot.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        priority={current === 0}
                      />
                    ) : (
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center size-24 rounded-3xl bg-gradient-to-br ${screenshot.color} text-white mb-6 shadow-lg`}>
                          <span className="text-4xl font-bold">{screenshot.label}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{screenshot.title}</h3>
                        <p className="text-slate-500 mt-2">{screenshot.description}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <Button variant="outline" size="sm" onClick={prev} icon={ChevronLeft}>
                {t("previous")}
              </Button>
              <Button variant="outline" size="sm" onClick={next} icon={ChevronRight} iconPosition="right">
                {t("next")}
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {screenshots.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => goTo(index)}
                  className={`size-2 rounded-full transition-all duration-300 ${index === current ? "bg-blue-600 w-6" : "bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
