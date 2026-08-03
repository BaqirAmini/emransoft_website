import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fa", "en", "ps"],
  defaultLocale: "fa",
  localePrefix: "as-needed",
  // Always default to Dari (fa) at "/" instead of auto-detecting the
  // visitor's browser language. Users can still switch languages manually.
  localeDetection: false,
})
