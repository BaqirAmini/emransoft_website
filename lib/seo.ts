import type { Metadata } from "next"
import { routing } from "@/i18n/routing"
import { COMPANY, SOCIAL } from "@/constants"

/** Public origin of the site, without a trailing slash. Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://emransoft.com").replace(/\/+$/, "")

export const SITE_NAME = COMPANY.name

/** Default share image used when a page has no image of its own (1917×1007). */
export const DEFAULT_OG_IMAGE = {
  url: "/images/screenshots/crown-dashboard.png",
  width: 1917,
  height: 1007,
  alt: "Emransoft software",
}

export const LOGO_URL = `${SITE_URL}/images/logo/emransoft_logo_square.png`

export type Locale = (typeof routing.locales)[number]

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value)
}

/**
 * Path for a page in a given locale, matching `localePrefix: "as-needed"`:
 * the default locale (fa) has no prefix, others are prefixed.
 *   localizedPath("fa", "/")      -> "/"
 *   localizedPath("fa", "/news")  -> "/news"
 *   localizedPath("en", "/")      -> "/en"
 *   localizedPath("en", "/news")  -> "/en/news"
 */
export function localizedPath(locale: string, path: string = "/"): string {
  const clean = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`
  if (locale === routing.defaultLocale) return clean || "/"
  return `/${locale}${clean}`
}

export function absoluteUrl(locale: string, path: string = "/"): string {
  return `${SITE_URL}${localizedPath(locale, path)}`
}

/** Turns a site-relative asset path ("/images/x.png") into an absolute URL. */
export function absoluteAsset(src: string): string {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`
}

const SITE_TITLES: Record<string, string> = {
  fa: "عمران سافت | راه حلهای نرم‌افزاری حرفه ای برای افغانستان",
  en: "Emransoft | Professional Software Solutions for Afghanistan",
  ps: "عمران سافت | د افغانستان لپاره مسلکي سافټویر حل لارې",
}

const SITE_DESCRIPTIONS: Record<string, string> = {
  fa: "ساخت نرم‌افزارهای قابل اعتماد که به مراکز بهداشتی و کسب و کارها در سراسر افغانستان قدرت می‌بخشد.",
  en: "Building reliable software that empowers healthcare centers and businesses across Afghanistan.",
  ps: "د باور وړ سافټویر جوړول چې د روغتیا پاملرنې مرکزونو او سوداګرۍ ته په ټول افغانستان کې ځواک ورکوي.",
}

/** Home page / site-wide default title per locale. */
export function siteTitle(locale: string): string {
  return SITE_TITLES[locale] || SITE_TITLES.en
}

/** Home page / site-wide default description per locale. */
export function siteDescription(locale: string): string {
  return SITE_DESCRIPTIONS[locale] || SITE_DESCRIPTIONS.en
}

/** Brand name as written in each language (used in page titles). */
export function brandName(locale: string): string {
  return locale === "fa" || locale === "ps" ? "عمران سافت" : SITE_NAME
}

/** "Page | Brand" title in the page's language. */
export function pageTitle(locale: string, title: string): string {
  return `${title} | ${brandName(locale)}`
}

export function ogLocale(locale: string): string {
  if (locale === "fa") return "fa_AF"
  if (locale === "ps") return "ps_AF"
  return "en_US"
}

/**
 * Canonical + hreflang alternates for a page.
 * `availableLocales` lets translated-only content (e.g. news articles) advertise just the languages that exist.
 */
export function buildAlternates(
  locale: string,
  path: string,
  availableLocales: readonly string[] = routing.locales
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {}
  for (const l of availableLocales) languages[l] = absoluteUrl(l, path)

  const xDefault = availableLocales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : availableLocales[0]
  if (xDefault) languages["x-default"] = absoluteUrl(xDefault, path)

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  }
}

type PageMetadataInput = {
  locale: string
  path: string
  title: string
  description: string
  type?: "website" | "article"
  images?: { url: string; width?: number; height?: number; alt?: string }[]
  availableLocales?: readonly string[]
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}

/** Full per-page metadata: title, description, canonical, hreflang, Open Graph and Twitter card. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  images,
  availableLocales = routing.locales,
  publishedTime,
  authors,
  tags,
}: PageMetadataInput): Metadata {
  const shareImages = images && images.length > 0 ? images : [DEFAULT_OG_IMAGE]
  const alternateLocale = availableLocales.filter((l) => l !== locale).map(ogLocale)

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title,
          description,
          url: absoluteUrl(locale, path),
          siteName: SITE_NAME,
          locale: ogLocale(locale),
          alternateLocale,
          images: shareImages,
          publishedTime,
          authors,
          tags,
        }
      : {
          type: "website",
          title,
          description,
          url: absoluteUrl(locale, path),
          siteName: SITE_NAME,
          locale: ogLocale(locale),
          alternateLocale,
          images: shareImages,
        }

  return {
    title,
    description,
    alternates: buildAlternates(locale, path, availableLocales),
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImages.map((i) => i.url),
    },
  }
}

/** Shortens text for meta descriptions without cutting words in half. */
export function truncate(text: string, max: number = 160): string {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

/** Organization + WebSite structured data for the home page. */
export function organizationJsonLd(locale: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kabul",
        addressCountry: "AF",
      },
      areaServed: { "@type": "Country", name: "Afghanistan" },
      sameAs: [SOCIAL.facebook, SOCIAL.youtube, SOCIAL.telegram],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: absoluteUrl(locale, "/"),
      inLanguage: locale,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ]
}

/** Safe serializer for <script type="application/ld+json"> (escapes "<" so content can't close the tag). */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
