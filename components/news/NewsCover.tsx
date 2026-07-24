import type { ReactNode } from "react"
import { getNewsTheme } from "@/components/news/news-theme"

interface NewsCoverProps {
  tags: string[]
  className?: string
  /** Show the category chip in the corner (hidden on the featured hero) */
  showLabel?: boolean
  /** Article slug — used to pick a bespoke illustration for specific articles */
  slug?: string
}

// Full WhatsApp glyph (matches components/ui/social-icon.tsx), 24×24 viewBox.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

/** Bespoke scene: a refined dashboard + one-click WhatsApp sharing. */
function CrownGoldScene() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* Dashboard panel */}
      <rect x="34" y="54" width="214" height="132" rx="14" fill="#ffffff" />
      <rect x="50" y="70" width="72" height="10" rx="5" fill="#1e3a8a" />
      <circle cx="230" cy="75" r="7" fill="#dbeafe" />
      {/* stat chips */}
      <rect x="50" y="92" width="60" height="30" rx="8" fill="#eff6ff" />
      <rect x="118" y="92" width="60" height="30" rx="8" fill="#eff6ff" />
      <rect x="186" y="92" width="46" height="30" rx="8" fill="#eff6ff" />
      <rect x="58" y="100" width="30" height="6" rx="3" fill="#3b82f6" />
      <rect x="126" y="100" width="30" height="6" rx="3" fill="#10b981" />
      <rect x="194" y="100" width="26" height="6" rx="3" fill="#8b5cf6" />
      {/* bar chart */}
      {[
        { id: "b1", h: 26 },
        { id: "b2", h: 40 },
        { id: "b3", h: 32 },
        { id: "b4", h: 48 },
        { id: "b5", h: 36 },
      ].map((bar, i) => (
        <rect key={bar.id} x={58 + i * 26} y={172 - bar.h} width="15" height={bar.h} rx="3" fill="#3b82f6" />
      ))}
      <line x1="52" y1="174" x2="232" y2="174" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* message flying to WhatsApp */}
      <circle cx="256" cy="96" r="3.5" fill="#ffffff" opacity="0.9" />
      <circle cx="272" cy="84" r="3.5" fill="#ffffff" opacity="0.65" />
      <circle cx="288" cy="72" r="3.5" fill="#ffffff" opacity="0.4" />

      {/* WhatsApp bubble */}
      <circle cx="322" cy="80" r="40" fill="#25D366" />
      <circle cx="322" cy="80" r="40" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
      <g transform="translate(298 56) scale(2)">
        <path d={WHATSAPP_PATH} fill="#ffffff" />
      </g>

      {/* "sent" check badge */}
      <g transform="translate(356 118)">
        <circle r="14" fill="#ffffff" />
        <path d="M-6 0 l4 4 l8 -9" stroke="#25D366" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

// Articles that get a bespoke illustration instead of the generic category glyph.
const CUSTOM_SCENES: Record<string, () => ReactNode> = {
  "crown-gold-update": CrownGoldScene,
  "crown-gold-whatsapp": CrownGoldScene,
}

/**
 * Creative, brand-themed cover illustration for a news article.
 * A gradient (chosen from the article's tags) with a subtle dot pattern,
 * soft decorative orbs and either a bespoke scene (per slug) or a large
 * category glyph. Self-contained: no external assets, no app screenshots.
 */
export function NewsCover({ tags, className = "", showLabel = true, slug }: Readonly<NewsCoverProps>) {
  const theme = getNewsTheme(tags)
  const { Icon } = theme
  const Scene = slug ? CUSTOM_SCENES[slug] : undefined

  return (
    <div className={`group relative overflow-hidden bg-linear-to-br ${theme.gradient} ${className}`}>
      {/* decorative orbs */}
      <div className="absolute -right-12 -top-12 size-44 rounded-full bg-white/10" />
      <div className="absolute right-6 top-10 size-20 rounded-full bg-white/10" />
      <div className="absolute -left-10 -bottom-14 size-44 rounded-full bg-black/10" />

      {/* subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* soft top highlight for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10" />

      {Scene ? (
        <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
          <Scene />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <Icon className="size-10 text-white" strokeWidth={1.5} />
          </div>
        </div>
      )}

      {/* category chip */}
      {showLabel && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm">
          <Icon className="size-3.5" />
          {theme.label}
        </span>
      )}
    </div>
  )
}
