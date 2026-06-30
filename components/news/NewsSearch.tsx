"use client"

import { Search, X } from "lucide-react"
import { useTranslations } from "next-intl"

interface NewsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function NewsSearch({ value, onChange }: NewsSearchProps) {
  const t = useTranslations("news")

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search")}
        className="w-full h-12 pl-11 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
