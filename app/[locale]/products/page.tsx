import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ProductsGrid } from "@/components/sections/products-grid"
import { CTA } from "@/components/sections/cta"
import { JsonLd } from "@/components/seo/json-ld"
import { products } from "@/data/products"
import { SITE_URL, absoluteUrl, buildPageMetadata, pageTitle, truncate } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

/** "crown" -> "productCrown" (translation namespace for each product). */
const productNamespace = (id: string) => `product${id.charAt(0).toUpperCase()}${id.slice(1)}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "products" })

  return buildPageMetadata({
    locale,
    path: "/products",
    title: pageTitle(locale, t("title")),
    description: truncate(t("subtitle")),
  })
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const pageUrl = absoluteUrl(locale, "/products")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("products.title"),
    url: pageUrl,
    itemListElement: products.map((product, index) => {
      const ns = productNamespace(product.id)
      const description = t.has(`${ns}.description`) ? t(`${ns}.description`) : product.description
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: product.name,
          description,
          applicationCategory: "BusinessApplication",
          url: `${pageUrl}#${product.id}`,
          inLanguage: locale,
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      }
    }),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProductsGrid headingLevel="h1" />
      <CTA />
    </>
  )
}
