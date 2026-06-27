"use client"

import { motion } from "framer-motion"
import type { Province } from "@/data/provinces"

interface ConnectionLineProps {
  from: Province
  to: Province
  index: number
}

export function ConnectionLine({ from, to, index }: ConnectionLineProps) {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cx = midX - dy * 0.15
  const cy = midY + dx * 0.15

  return (
    <g>
      <motion.path
        d={`M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`}
        fill="none"
        stroke="#93C5FD"
        strokeWidth={1.2}
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{
          delay: 1.2 + index * 0.06,
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d={`M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`}
        fill="none"
        stroke="#BFDBFE"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.15 }}
        transition={{
          delay: 1.0 + index * 0.06,
          duration: 1,
          ease: "easeInOut",
        }}
      />
    </g>
  )
}
