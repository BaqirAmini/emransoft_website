"use client"

import { type HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string
  className?: string
  children: React.ReactNode
  containerWidth?: "sm" | "md" | "lg" | "xl" | "full"
}

const containerMaxWidths = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  full: "max-w-full",
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className, children, containerWidth = "lg", ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn("relative py-20 md:py-28", className)}
        {...props}
      >
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", containerMaxWidths[containerWidth])}>
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = "Section"

function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-16 max-w-2xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export { Section, SectionHeader }
