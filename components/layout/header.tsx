"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { products } from "@/data/products"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  key: string
  href: string
  hasDropdown?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "products", href: "/products", hasDropdown: true },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
  { key: "testimonials", href: "/testimonials" },
  { key: "contact", href: "/contact" },
]

export function Header() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo/emransoft_logo.png"
            alt="Emransoft"
            width={88}
            height={88}
            priority
            className="size-[88px] object-contain"
          />
        </Link>

        <nav className="max-md:hidden md:flex items-center gap-1" ref={dropdownRef}>
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="relative">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown className={cn(
                      "size-3.5 transition-transform duration-200",
                      openDropdown === item.key && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-slate-100 p-2"
                      >
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products#${product.id}`}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <span
                              className="size-2 rounded-full shrink-0"
                              style={{ backgroundColor: product.color }}
                            />
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-slate-400">{product.tagline}</div>
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <Link
                            href="/products"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            {t("allProducts")}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {t(item.key)}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {t(item.key)}
                        <ChevronDown className={cn(
                          "size-4 transition-transform duration-200",
                          openDropdown === item.key && "rotate-180"
                        )} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 space-y-1 pl-3 border-l-2 border-slate-100">
                              {products.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/products#${product.id}`}
                                  onClick={() => { setOpenDropdown(null); setIsMobileOpen(false) }}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                                >
                                  <span
                                    className="size-2 rounded-full shrink-0"
                                    style={{ backgroundColor: product.color }}
                                  />
                                  <div>
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-xs text-slate-400">{product.tagline}</div>
                                  </div>
                                </Link>
                              ))}
                              <Link
                                href="/products"
                                onClick={() => { setOpenDropdown(null); setIsMobileOpen(false) }}
                                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                {t("allProducts")}
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
