"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Province } from "@/data/provinces"

interface TooltipProps {
  province: Province | null
}

export function Tooltip({ province }: TooltipProps) {
  const t = useTranslations("map")
  const provinceNames = useTranslations("map.provinceNames")

  if (!province) return null

  return (
    <AnimatePresence>
      <foreignObject
        x={Math.min(province.x + 28, 470)}
        y={Math.max(province.y - 40, 5)}
        width="140"
        height="68"
      >
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-lg border border-blue-100 shadow-lg px-3 py-2"
          style={{ boxShadow: "0 4px 12px rgba(30,64,175,0.12)" }}
        >
          <p className="text-sm font-bold text-slate-800 leading-tight">
            {provinceNames(province.nameKey)}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600">
              {t("crownActive")}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {t("since")} {province.installedYear}
          </p>
        </motion.div>
      </foreignObject>
    </AnimatePresence>
  )
}
