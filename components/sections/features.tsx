"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import {
  Shield,
  WifiOff,
  Lock,
  Zap,
  Headphones,
  ThumbsUp,
  Cpu,
  TrendingUp,
} from "lucide-react"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card, CardIcon } from "@/components/ui/card"
import { features } from "@/data/features"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  "wifi-off": WifiOff,
  lock: Lock,
  zap: Zap,
  headphones: Headphones,
  "thumbs-up": ThumbsUp,
  cpu: Cpu,
  "trending-up": TrendingUp,
}

const colorMap: Record<string, "blue" | "emerald" | "violet" | "amber"> = {
  shield: "blue",
  "wifi-off": "emerald",
  lock: "violet",
  zap: "amber",
  headphones: "blue",
  "thumbs-up": "emerald",
  cpu: "violet",
  "trending-up": "amber",
}

export function Features() {
  const t = useTranslations("features")

  return (
    <Section className="bg-slate-50/50">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon] || Shield
          const color = colorMap[feature.icon] || "blue"

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardIcon color={color}>
                  <Icon className="size-6" />
                </CardIcon>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
