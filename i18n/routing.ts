import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fa", "en", "ps"],
  defaultLocale: "fa",
  localePrefix: "as-needed",
})
