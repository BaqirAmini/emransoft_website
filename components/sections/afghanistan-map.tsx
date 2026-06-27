"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/ui/section"
import { provinces } from "@/data/provinces"
import type { Province } from "@/data/provinces"
import { ProvinceMarker } from "@/components/map/ProvinceMarker"
import { ConnectionLine } from "@/components/map/ConnectionLine"
import { Tooltip } from "@/components/map/Tooltip"

const MAP_ASPECT = 600 / 380.193

export function AfghanistanMap() {
  const t = useTranslations("map")
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const hubProvince = provinces[0]
  const otherProvinces = provinces.slice(1)

  return (
    <Section className="bg-gradient-to-b from-blue-50/40 to-white overflow-hidden">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl"
      >
        <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="inline-block size-2.5 rounded-full bg-blue-600 ring-2 ring-blue-200" />
                {t("hubProvince")}
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="inline-block size-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                {t("activeProvinces")}
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <svg className="size-3" viewBox="0 0 20 20" fill="none">
                  <line x1="2" y1="10" x2="18" y2="10" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3,3" />
                </svg>
                {t("legendConnection")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1">
              <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700">
                {provinces.length} {t("provincesLabel")}
              </span>
            </div>
          </div>

          {/* Map area */}
          <div className="relative">
            <div className="relative" style={{ aspectRatio: MAP_ASPECT }}>
              {/* Base map layer */}
              <Image
                src="/maps/afghanistan.svg"
                alt="Afghanistan Map"
                fill
                className="object-contain"
                priority
                unoptimized
                draggable={false}
              />

              {/* Interactive overlay layer */}
              <svg
                viewBox="0 0 600 380.193"
                className="absolute inset-0 w-full h-full"
                role="img"
                aria-label={t("title")}
                style={{ pointerEvents: "auto" }}
              >
                <defs>
                  <filter id="markerGlow">
                    <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#3B82F6" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Connection lines from hub to other provinces */}
                {otherProvinces.map((province, index) => (
                  <ConnectionLine key={`conn-${province.id}`} from={hubProvince} to={province} index={index} />
                ))}

                {/* Additional connections for visual density */}
                {otherProvinces.length > 4 && (
                  <>
                    <ConnectionLine from={otherProvinces[0]} to={otherProvinces[3]} index={10} />
                    <ConnectionLine from={otherProvinces[1]} to={otherProvinces[4]} index={11} />
                    <ConnectionLine from={otherProvinces[5]} to={otherProvinces[6]} index={12} />
                  </>
                )}

                {/* Province markers */}
                <ProvinceMarker
                  province={hubProvince}
                  index={0}
                  isHub
                  onHover={setSelectedProvince}
                  isSelected={selectedProvince?.id === hubProvince.id}
                />
                {otherProvinces.map((province, index) => (
                  <ProvinceMarker
                    key={province.id}
                    province={province}
                    index={index + 1}
                    onHover={setSelectedProvince}
                    isSelected={selectedProvince?.id === province.id}
                  />
                ))}

                {/* Tooltip */}
                <Tooltip province={selectedProvince} />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
