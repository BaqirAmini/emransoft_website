import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { Geist, Vazirmatn } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { routing } from "@/i18n/routing"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocaleProvider } from "@/components/layout/locale-provider"
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  isLocale,
  ogLocale,
  siteTitle,
  siteDescription,
} from "@/lib/seo"
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

export const viewport: Viewport = {
  themeColor: "#2563EB",
}

export async function generateMetadata({ params }: Readonly<LocaleLayoutProps>): Promise<Metadata> {
  const { locale } = await params
  const title = siteTitle(locale)
  const description = siteDescription(locale)

  // Site-wide defaults. Every page overrides title/description/canonical/hreflang
  // through buildPageMetadata(); the canonical is intentionally NOT set here so
  // no page can accidentally inherit the home page's canonical URL.
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title,
    description,
    openGraph: {
      title,
      description,
      locale: ogLocale(locale),
      type: "website",
      siteName: SITE_NAME,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
  }
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = isRtl(locale) ? "rtl" : "ltr"

  return (
    // lang/dir are rendered on the server so search engines see each page's real language and direction.
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleProvider locale={locale} dir={dir} className={`${geistSans.variable} ${vazirmatn.variable}`}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId="G-3JKLZD5N1Y" />}
    </html>
  )
}
