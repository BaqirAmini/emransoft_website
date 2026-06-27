"use client"

import { useRef, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const stepValue = value / steps
          let current = 0
          const interval = setInterval(() => {
            current += stepValue
            if (current >= value) {
              setCount(value)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <span className="text-5xl md:text-6xl font-bold text-slate-900 tabular-nums">
        {count}{suffix}
      </span>
    </div>
  )
}

const stats = [
  { id: "provinces", value: 10, suffix: "+" },
  { id: "customers", value: 100, suffix: "+" },
  { id: "products", value: 3, suffix: "" },
  { id: "growth", value: 100, suffix: "%" },
]

export function Statistics() {
  const t = useTranslations("statistics")

  return (
    <Section className="bg-gradient-to-b from-white to-blue-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-wider">
              {t(stat.id)}
            </p>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}
