import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fa", "en", "ps"],
  defaultLocale: "fa",
  localePrefix: "as-needed",
  // Always default to Dari (fa) at "/" instead of auto-detecting the
  // visitor's browser language. Users can still switch languages manually.
  localeDetection: false,
  // hreflang alternates are emitted per page in the HTML <head> (see lib/seo.ts),
  // which — unlike the middleware's automatic Link header — knows when an
  // article doesn't exist in every language.
  alternateLinks: false,
})
