import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "blue" | "emerald" | "violet" | "amber" | "slate"
  className?: string
}

export function Badge({ children, variant = "blue", className }: BadgeProps) {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
