"use client"

import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-slate-100 bg-white p-6 md:p-8",
          "shadow-sm hover:shadow-lg",
          "transition-all duration-300",
          hover && "hover:-translate-y-1",
          glow && "hover:shadow-blue-500/10 hover:border-blue-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

function CardIcon({
  children,
  color = "blue",
  className,
}: {
  children: React.ReactNode
  color?: "blue" | "emerald" | "violet" | "amber"
  className?: string
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
  }

  return (
    <div
      className={cn(
        "mb-4 flex size-12 items-center justify-center rounded-xl",
        colorClasses[color],
        className
      )}
    >
      {children}
    </div>
  )
}

export { Card, CardIcon }
