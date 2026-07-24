import { useTranslations } from "next-intl"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { SocialIcon } from "@/components/ui/social-icon"
import { Link } from "@/i18n/navigation"
import { COMPANY, SOCIAL, NAV_LINKS } from "@/constants"
import { products } from "@/data/products"

const productLogoMap: Record<string, string> = {
  crown: "/images/logo/crown_logo_blue.png",
  labra: "/images/logo/labra_logo.ico",
  tajviz: "/images/logo/tajviz_logo.png",
}

export function Footer() {
  const t = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo/emransoft_logo.png"
                alt="Emransoft"
                width={80}
                height={80}
                className="size-20 object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("navigation")}</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("products")}</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products#${product.id}`}
                    className="group flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="flex size-7 items-center justify-center rounded-lg bg-white/95 p-1 shadow-sm transition-transform duration-200 group-hover:scale-110">
                      <Image
                        src={productLogoMap[product.icon] || "/images/logo/emransoft_logo.png"}
                        alt={product.name}
                        width={24}
                        height={24}
                        className="size-5 object-contain"
                      />
                    </span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="size-4 mt-0.5 shrink-0" />
                {COMPANY.address}
              </li>
              <li>
                <a
                  href={SOCIAL.email}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="size-4 shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="size-4 shrink-0" />
                  <span dir="ltr">{COMPANY.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("social")}</h3>
            <ul className="space-y-3">
              <li>
                <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <SocialIcon name="whatsapp" className="size-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={SOCIAL.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <SocialIcon name="telegram" className="size-4 shrink-0" />
                  Telegram
                </a>
              </li>
              <li>
                <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <SocialIcon name="youtube" className="size-4 shrink-0" />
                  YouTube
                </a>
              </li>
              <li>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <SocialIcon name="facebook" className="size-4 shrink-0" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
