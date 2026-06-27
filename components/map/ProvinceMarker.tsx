"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Province } from "@/data/provinces"

interface ProvinceMarkerProps {
  province: Province
  index: number
  isHub?: boolean
  onHover: (province: Province | null) => void
  isSelected: boolean
}

export function ProvinceMarker({ province, index, isHub, onHover, isSelected }: ProvinceMarkerProps) {
  const t = useTranslations("map")
  const provinceNames = useTranslations("map.provinceNames")

  const pulseDelay = index * 0.15

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${province.name} - ${t("crownActive")}`}
      onMouseEnter={() => onHover(province)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(province)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onHover(isSelected ? null : province)
        }
      }}
      className="cursor-pointer"
    >
      {isHub && (
        <>
          <motion.circle
            cx={province.x}
            cy={province.y}
            r={6}
            fill="#1D4ED8"
            opacity={0.15}
            animate={{
              r: [6, 22, 6],
              opacity: [0.15, 0.05, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pulseDelay,
            }}
          />
          <motion.circle
            cx={province.x}
            cy={province.y}
            r={10}
            fill="#1D4ED8"
            opacity={0.08}
            animate={{
              r: [10, 30, 10],
              opacity: [0.08, 0.02, 0.08],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pulseDelay + 0.5,
            }}
          />
        </>
      )}
      <motion.circle
        cx={province.x}
        cy={province.y}
        r={isHub ? 12 : 10}
        fill={isHub ? "#1D4ED8" : "#3B82F6"}
        stroke={isSelected ? "#60A5FA" : "white"}
        strokeWidth={isSelected ? 3 : 2.5}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 + index * 0.08, duration: 0.4, type: "spring" }}
        style={{ filter: "url(#markerGlow)" }}
      />
      {isHub && (
        <motion.circle
          cx={province.x}
          cy={province.y}
          r={4}
          fill="#BFDBFE"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + index * 0.08, duration: 0.3 }}
        />
      )}
      <motion.circle
        cx={province.x}
        cy={province.y}
        r={1.5}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.08 }}
      />
      <motion.text
        x={province.x + 16}
        y={province.y + 4}
        fill={isHub ? "#1E3A5F" : "#334155"}
        fontSize={isHub ? "12" : "11"}
        fontWeight={isHub ? "700" : "600"}
        fontFamily="system-ui, -apple-system, sans-serif"
        initial={{ opacity: 0, x: province.x + 8 }}
        animate={{ opacity: 1, x: province.x + 16 }}
        transition={{ delay: 0.6 + index * 0.08, duration: 0.4 }}
        className="select-none"
      >
        {provinceNames(province.nameKey)}
      </motion.text>
    </g>
  )
}
