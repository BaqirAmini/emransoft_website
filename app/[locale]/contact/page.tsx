"use client"

import { useTranslations } from "next-intl"
import { Mail, MessageCircle, Send, Video, Globe, MapPin } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { COMPANY, SOCIAL } from "@/constants"
import type { LucideIcon } from "lucide-react"

const contactMethods: { icon: LucideIcon; labelKey: string; value: string; href: string; color: string }[] = [
  { icon: MessageCircle, labelKey: "WhatsApp", value: "+93 792 195 121", href: SOCIAL.whatsapp, color: "bg-emerald-50 text-emerald-600" },
  { icon: Send, labelKey: "Telegram", value: "@emransoft", href: SOCIAL.telegram, color: "bg-sky-50 text-sky-600" },
  { icon: Video, labelKey: "YouTube", value: "@emransoft4you", href: SOCIAL.youtube, color: "bg-red-50 text-red-600" },
  { icon: Globe, labelKey: "Facebook", value: "@emransoft4you", href: SOCIAL.facebook, color: "bg-blue-50 text-blue-600" },
  { icon: Mail, labelKey: "Email", value: COMPANY.email, href: SOCIAL.email, color: "bg-blue-50 text-blue-600" },
]

export default function ContactPage() {
  const t = useTranslations("contact")

  return (
    <Section className="pt-32">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="grid gap-4">
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <a key={method.labelKey} href={method.href} target="_blank" rel="noopener noreferrer">
                  <Card className="flex items-center gap-4 hover:border-blue-200">
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${method.color}`}>
                      <IconComponent className="size-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-500">{method.labelKey}</p>
                      <p className="text-base font-semibold text-slate-900">{method.value}</p>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>

          <Card className="mt-6">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-500">{t("office")}</p>
                <p className="text-base font-semibold text-slate-900">{COMPANY.address}</p>
                <p className="text-sm text-slate-500 mt-1">{COMPANY.phone}</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-xl font-semibold text-slate-900 mb-6">{t("sendMessage")}</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t("name")}</label>
                  <input type="text" id="name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder={t("namePlaceholder")} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t("email")}</label>
                  <input type="email" id="email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder={t("emailPlaceholder")} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">{t("subject")}</label>
                <input type="text" id="subject" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder={t("subjectPlaceholder")} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">{t("message")}</label>
                <textarea id="message" rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none" placeholder={t("messagePlaceholder")} />
              </div>
              <Button type="submit" className="w-full justify-center">{t("send")}</Button>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  )
}
