import {
  Stethoscope,
  FlaskConical,
  Pill,
  MessageCircle,
  Globe,
  Megaphone,
  MapPin,
  Sparkles,
  Package,
  Building2,
  Newspaper,
  type LucideIcon,
} from "lucide-react"

export interface NewsTheme {
  /** Tailwind gradient stops for the cover background */
  gradient: string
  /** Icon representing the article category */
  Icon: LucideIcon
  /** The tag used as the category label */
  label: string
}

interface ThemeDef {
  gradient: string
  Icon: LucideIcon
}

// Canonical themes keyed by a language-independent key.
const THEMES: Record<string, ThemeDef> = {
  Crown: { gradient: "from-blue-600 via-blue-500 to-sky-400", Icon: Stethoscope },
  Labra: { gradient: "from-emerald-600 via-emerald-500 to-teal-400", Icon: FlaskConical },
  Tajviz: { gradient: "from-violet-600 via-purple-500 to-fuchsia-400", Icon: Pill },
  WhatsApp: { gradient: "from-green-600 via-emerald-500 to-teal-400", Icon: MessageCircle },
  Website: { gradient: "from-sky-600 via-cyan-500 to-blue-400", Icon: Globe },
  Announcement: { gradient: "from-indigo-600 via-blue-500 to-sky-400", Icon: Megaphone },
  Expansion: { gradient: "from-amber-500 via-orange-500 to-rose-400", Icon: MapPin },
  Update: { gradient: "from-blue-600 via-indigo-500 to-violet-400", Icon: Sparkles },
  Product: { gradient: "from-slate-700 via-slate-600 to-slate-500", Icon: Package },
  Company: { gradient: "from-slate-700 via-slate-600 to-slate-500", Icon: Building2 },
}

// Product/topic tags take precedence over generic ones like "Update"/"Product".
const PRIORITY = [
  "Crown",
  "Labra",
  "Tajviz",
  "WhatsApp",
  "Website",
  "Announcement",
  "Expansion",
  "Company",
  "Update",
  "Product",
]

// Maps every tag (English + Dari + Pashto) to its canonical theme key, so a
// translated article gets the SAME colour/icon as its English counterpart.
const ALIASES: Record<string, string> = {
  // English
  Crown: "Crown", Labra: "Labra", Tajviz: "Tajviz", WhatsApp: "WhatsApp",
  Website: "Website", Announcement: "Announcement", Expansion: "Expansion",
  Company: "Company", Update: "Update", Product: "Product",
  // Dari / Pashto (shared where identical)
  "کرون": "Crown",
  "لابرا": "Labra",
  "تجویز": "Tajviz",
  "واتساپ": "WhatsApp", // Dari
  "واټساپ": "WhatsApp", // Pashto
  "وبسایت": "Website", // Dari
  "ویب پاڼه": "Website", // Pashto
  "اعلامیه": "Announcement", // Dari
  "اعلان": "Announcement", // Pashto
  "توسعه": "Expansion",
  "شرکت": "Company",
  "به‌روزرسانی": "Update", // Dari
  "تازه معلومات": "Update", // Pashto
  "محصول": "Product",
}

const FALLBACK: ThemeDef = { gradient: "from-slate-700 via-slate-600 to-slate-500", Icon: Newspaper }

export function getNewsTheme(tags: string[]): NewsTheme {
  // Resolve each tag to a canonical key, keeping the original (localized) label.
  const resolved = tags
    .map((tag) => ({ tag, key: ALIASES[tag] }))
    .filter((r): r is { tag: string; key: string } => Boolean(r.key))

  for (const key of PRIORITY) {
    const hit = resolved.find((r) => r.key === key)
    if (hit) return { ...THEMES[key], label: hit.tag }
  }
  return { ...FALLBACK, label: tags[0] || "News" }
}
