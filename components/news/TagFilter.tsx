"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selectedTag, onSelect }: TagFilterProps) {
  const t = useTranslations("news")

  if (tags.length === 0) return null

  return (
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
        {t("filter")}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
            selectedTag === null
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
          )}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag === selectedTag ? null : tag)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
              selectedTag === tag
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
