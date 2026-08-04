import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { Geist, Vazirmatn } from "next/font/google"
import { routing } from "@/i18n/routing"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocaleProvider } from "@/components/layout/locale-provider"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

// Persian/Arabic-script font for Dari & Pashto (variable font, weights 100–900).
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
})

const isRtl = (locale: string) => locale === "fa" || locale === "ps"

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Readonly<LocaleLayoutProps>): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    fa: "عمران سافت | راه حلهای نرم‌افزاری حرفه ای برای افغانستان",
    en: "Emransoft | Professional Software Solutions for Afghanistan",
    ps: "عمران سافت | د افغانستان لپاره مسلکي سافټویر حل لارې",
  }

  const descriptions: Record<string, string> = {
    fa: "ساخت نرم‌افزارهای قابل اعتماد که به مراکز بهداشتی و کسب و کارها در سراسر افغانستان قدرت می‌بخشد.",
    en: "Building reliable software that empowers healthcare centers and businesses across Afghanistan.",
    ps: "د باور وړ سافټویر جوړول چې د روغتیا پاملرنې مرکزونو او سوداګرۍ ته په ټول افغانستان کې ځواک ورکوي.",
  }

  const ogLocales: Record<string, string> = { fa: "fa_AF", ps: "ps_AF", en: "en_US" }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale: ogLocales[locale] || ogLocales.en,
      type: "website",
      siteName: "Emransoft",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "fa" | "en" | "ps")) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = isRtl(locale) ? "rtl" : "ltr"

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleProvider locale={locale} dir={dir} className={`${geistSans.variable} ${vazirmatn.variable}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LocaleProvider>
    </NextIntlClientProvider>
  )
}
