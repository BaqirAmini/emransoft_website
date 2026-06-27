"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon: Icon, iconPosition = "right", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-600/30",
      secondary:
        "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200",
      outline:
        "border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], "hover:-translate-y-0.5", className)

    const content = (
      <>
        {Icon && iconPosition === "left" && <Icon className="size-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="size-4" />}
      </>
    )

    if (href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
