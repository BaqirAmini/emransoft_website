"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useTransition, useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { routing } from "@/i18n/routing"

const localeNames: Record<string, { label: string; flag: string; src: string }> = {
  fa: { label: "دری", flag: "🇦🇫", src: "/images/flags/af.svg" },
  en: { label: "English", flag: "🇺🇸", src: "/images/flags/us.svg" },
  ps: { label: "پښتو", flag: "🇦🇫", src: "/images/flags/af.svg" },
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = localeNames[locale] || localeNames.en

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function switchLocale(nextLocale: string) {
    setOpen(false)
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium",
          "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
          "transition-all duration-200",
          isPending && "opacity-50 pointer-events-none"
        )}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Image src={current.src} alt="" width={20} height={15} className="size-5 object-cover rounded-sm" />
        <span>{current.label}</span>
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute top-full mt-1 min-w-[160px] bg-white rounded-xl border border-slate-200 shadow-lg z-50",
          "transition-all duration-200",
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1",
          "end-0"
        )}
      >
        <div className="py-1">
          {routing.locales.map((loc) => {
            const info = localeNames[loc]
            const isActive = loc === locale
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Image src={info.src} alt="" width={20} height={15} className="size-5 object-cover rounded-sm" />
                <span>{info.label}</span>
                {isActive && <span className="ms-auto size-1.5 rounded-full bg-blue-600" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
