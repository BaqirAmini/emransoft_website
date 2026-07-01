import type { ReactNode } from "react"

/**
 * Creative, on-brand SVG "software" scenes for the hero slideshow.
 * Self-contained (no external assets), scalable, and animated with
 * Tailwind utility keyframes so they render identically in every browser.
 * viewBox is a 16:10 canvas to match the hero window frame.
 */

const VIEWBOX = "0 0 400 250"

function SceneWrap({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  )
}

/* 1 — Code editor: software development */
function CodeScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="code-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect x="34" y="30" width="332" height="190" rx="14" fill="url(#code-bg)" />
      {/* editor top bar */}
      <circle cx="52" cy="48" r="3.5" fill="#f87171" />
      <circle cx="64" cy="48" r="3.5" fill="#fbbf24" />
      <circle cx="76" cy="48" r="3.5" fill="#34d399" />
      <rect x="150" y="43" width="100" height="10" rx="5" fill="#334155" />
      {/* gutter */}
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <text key={n} x="54" y={82 + n * 22} fill="#475569" fontSize="9" fontFamily="monospace">
          {n + 1}
        </text>
      ))}
      {/* code tokens */}
      <rect x="72" y="74" width="34" height="8" rx="4" fill="#818cf8" />
      <rect x="112" y="74" width="52" height="8" rx="4" fill="#60a5fa" />
      <rect x="170" y="74" width="26" height="8" rx="4" fill="#e2e8f0" />
      <rect x="88" y="96" width="30" height="8" rx="4" fill="#c084fc" />
      <rect x="124" y="96" width="70" height="8" rx="4" fill="#34d399" />
      <rect x="88" y="118" width="46" height="8" rx="4" fill="#60a5fa" />
      <rect x="140" y="118" width="40" height="8" rx="4" fill="#e2e8f0" />
      <rect x="186" y="118" width="60" height="8" rx="4" fill="#34d399" />
      <rect x="88" y="140" width="34" height="8" rx="4" fill="#f472b6" />
      <rect x="128" y="140" width="54" height="8" rx="4" fill="#60a5fa" />
      <rect x="72" y="162" width="30" height="8" rx="4" fill="#818cf8" />
      <rect x="108" y="162" width="44" height="8" rx="4" fill="#e2e8f0" />
      {/* blinking caret */}
      <rect x="158" y="161" width="2.5" height="10" fill="#38bdf8" className="animate-pulse" />
      {/* build passed chip */}
      <g className="animate-pulse">
        <rect x="256" y="182" width="96" height="24" rx="12" fill="#064e3b" />
        <circle cx="272" cy="194" r="6" fill="#34d399" />
        <path d="M269 194 l2.5 2.5 l4.5 -5" stroke="#064e3b" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="284" y="190" width="58" height="8" rx="4" fill="#34d399" />
      </g>
    </SceneWrap>
  )
}

/* 2 — Analytics dashboard: data & reporting */
function DashboardScene() {
  const bars = [46, 70, 58, 96, 78, 120]
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="dash-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={30 + i * 116} y="28" width="104" height="46" rx="10" fill="#ffffff" stroke="#e2e8f0" />
          <rect x={42 + i * 116} y="40" width="40" height="7" rx="3.5" fill="#cbd5e1" />
          <rect x={42 + i * 116} y="54" width="60" height="11" rx="5.5" fill={["#2563eb", "#059669", "#7c3aed"][i]} />
        </g>
      ))}
      {/* bar chart card */}
      <rect x="30" y="88" width="220" height="134" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 33}
          y={200 - h}
          width="18"
          height={h}
          rx="4"
          fill="url(#dash-bar)"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: "3s" }}
        />
      ))}
      <line x1="42" y1="202" x2="238" y2="202" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* donut card */}
      <rect x="262" y="88" width="108" height="134" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="316" cy="150" r="34" fill="none" stroke="#e2e8f0" strokeWidth="12" />
      <circle
        cx="316"
        cy="150"
        r="34"
        fill="none"
        stroke="#2563eb"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="150 214"
        transform="rotate(-90 316 150)"
      />
      <circle cx="316" cy="150" r="34" fill="none" stroke="#34d399" strokeWidth="12" strokeLinecap="round" strokeDasharray="55 214" strokeDashoffset="-152" transform="rotate(-90 316 150)" />
      <rect x="288" y="196" width="56" height="8" rx="4" fill="#e2e8f0" />
    </SceneWrap>
  )
}

/* 3 — Connected modules: integrated systems */
function NetworkScene() {
  const nodes = [
    { x: 96, y: 70, c: "#2563eb" },
    { x: 300, y: 66, c: "#059669" },
    { x: 320, y: 168, c: "#7c3aed" },
    { x: 92, y: 182, c: "#0ea5e9" },
    { x: 200, y: 210, c: "#f59e0b" },
  ]
  const hub = { x: 200, y: 120 }
  return (
    <SceneWrap>
      <defs>
        <radialGradient id="net-hub" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>
      {/* links */}
      {nodes.map((n, i) => (
        <line key={i} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="#bfdbfe" strokeWidth="2" strokeDasharray="4 5" />
      ))}
      {/* satellite nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="17" fill="#ffffff" stroke={n.c} strokeWidth="2.5" />
          <circle cx={n.x} cy={n.y} r="6" fill={n.c} className="animate-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
        </g>
      ))}
      {/* central hub */}
      <circle cx={hub.x} cy={hub.y} r="40" fill="#dbeafe" opacity="0.6" className="animate-pulse" />
      <circle cx={hub.x} cy={hub.y} r="30" fill="url(#net-hub)" />
      <path
        d="M188 108 l12 -7 l12 7 v18 l-12 7 l-12 -7 z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="120" r="4.5" fill="#ffffff" />
    </SceneWrap>
  )
}

/* 4 — Cross-platform: desktop + mobile */
function DevicesScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="dev-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eff6ff" />
          <stop offset="1" stopColor="#dbeafe" />
        </linearGradient>
      </defs>
      {/* monitor */}
      <rect x="46" y="40" width="240" height="150" rx="12" fill="#0f172a" />
      <rect x="56" y="50" width="220" height="120" rx="6" fill="url(#dev-screen)" />
      {/* app blocks on monitor */}
      <rect x="66" y="60" width="60" height="100" rx="6" fill="#ffffff" />
      <rect x="74" y="70" width="30" height="6" rx="3" fill="#93c5fd" />
      <rect x="74" y="84" width="44" height="6" rx="3" fill="#e2e8f0" />
      <rect x="74" y="96" width="38" height="6" rx="3" fill="#e2e8f0" />
      <rect x="74" y="108" width="44" height="6" rx="3" fill="#e2e8f0" />
      <rect x="136" y="60" width="130" height="46" rx="6" fill="#ffffff" />
      <rect x="146" y="72" width="70" height="8" rx="4" fill="#2563eb" />
      <rect x="146" y="88" width="100" height="6" rx="3" fill="#e2e8f0" />
      <rect x="136" y="114" width="62" height="46" rx="6" fill="#ffffff" />
      <rect x="204" y="114" width="62" height="46" rx="6" fill="#ffffff" />
      <rect x="146" y="132" width="30" height="10" rx="5" fill="#34d399" />
      <rect x="214" y="132" width="30" height="10" rx="5" fill="#a78bfa" />
      {/* stand */}
      <rect x="150" y="190" width="32" height="14" fill="#1e293b" />
      <rect x="120" y="204" width="92" height="8" rx="4" fill="#0f172a" />
      {/* phone */}
      <rect x="272" y="110" width="74" height="110" rx="14" fill="#0f172a" className="animate-pulse" style={{ animationDuration: "4s" }} />
      <rect x="280" y="120" width="58" height="90" rx="6" fill="#ffffff" />
      <rect x="288" y="128" width="42" height="8" rx="4" fill="#2563eb" />
      <rect x="288" y="144" width="42" height="18" rx="4" fill="#eff6ff" />
      <rect x="288" y="168" width="20" height="20" rx="4" fill="#dbeafe" />
      <rect x="314" y="168" width="16" height="20" rx="4" fill="#dcfce7" />
      <rect x="298" y="200" width="22" height="4" rx="2" fill="#cbd5e1" />
    </SceneWrap>
  )
}

/* 5 — Cloud & security: hosting + protection */
function CloudScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="cloud-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="shield-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* cloud */}
      <g className="animate-pulse" style={{ animationDuration: "5s" }}>
        <path
          d="M150 96 a34 34 0 0 1 66 -10 a26 26 0 0 1 24 34 h-96 a26 26 0 0 1 6 -24 z"
          fill="url(#cloud-fill)"
        />
      </g>
      {/* sync arrows */}
      <path d="M182 120 v26 M182 146 l-7 -8 M182 146 l7 -8" stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M210 150 v-26 M210 124 l-7 8 M210 124 l7 8" stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* data dots streaming */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={120 + i * 55} cy="176" r="4" fill="#60a5fa" className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {/* shield */}
      <path d="M200 158 l30 10 v22 c0 20 -14 30 -30 38 c-16 -8 -30 -18 -30 -38 v-22 z" fill="url(#shield-fill)" />
      <path d="M188 196 l8 8 l16 -18" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </SceneWrap>
  )
}

/* 6 — Database: reliable data management */
function DatabaseScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="db-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* stacked cylinders */}
      <g transform="translate(96 46)">
        {[0, 40, 80].map((dy, i) => (
          <g key={i} transform={`translate(0 ${dy})`} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s`, animationDuration: "3s" }}>
            <path d="M0 12 v34 a52 14 0 0 0 104 0 v-34" fill="url(#db-fill)" opacity={0.9 - i * 0.12} />
            <ellipse cx="52" cy="12" rx="52" ry="14" fill="#93c5fd" />
            <ellipse cx="52" cy="12" rx="52" ry="14" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          </g>
        ))}
      </g>
      {/* query rows panel */}
      <rect x="238" y="60" width="120" height="130" rx="10" fill="#ffffff" stroke="#e2e8f0" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="252" cy={80 + i * 22} r="4" fill={["#2563eb", "#34d399", "#7c3aed", "#f59e0b", "#0ea5e9"][i]} />
          <rect x="264" y={76 + i * 22} width={72 - (i % 3) * 14} height="8" rx="4" fill="#e2e8f0" />
        </g>
      ))}
    </SceneWrap>
  )
}

/* 7 — Automation: smart workflows */
function AutomationScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="auto-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* flow connectors */}
      <path d="M104 90 H160 a12 12 0 0 1 12 12 V150 a12 12 0 0 0 12 12 H240" fill="none" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
      <path d="M104 160 H150" fill="none" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
      {/* start block */}
      <rect x="44" y="72" width="60" height="36" rx="10" fill="url(#auto-node)" />
      <path d="M62 82 l16 8 l-16 8 z" fill="#ffffff" />
      {/* middle block */}
      <rect x="44" y="142" width="60" height="36" rx="10" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
      <rect x="56" y="156" width="36" height="8" rx="4" fill="#93c5fd" />
      {/* gear */}
      <g transform="translate(184 108)" className="animate-pulse" style={{ animationDuration: "2.5s" }}>
        <circle r="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <circle r="8" fill="#2563eb" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect key={a} x="-3" y="-24" width="6" height="8" rx="2" fill="#2563eb" transform={`rotate(${a})`} />
        ))}
      </g>
      {/* end block: success */}
      <rect x="240" y="144" width="116" height="36" rx="10" fill="#064e3b" />
      <circle cx="260" cy="162" r="8" fill="#34d399" />
      <path d="M256 162 l3 3 l6 -7" stroke="#064e3b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="276" y="158" width="66" height="8" rx="4" fill="#34d399" />
    </SceneWrap>
  )
}

/* 8 — Design: beautiful, intuitive UI */
function DesignScene() {
  return (
    <SceneWrap>
      <defs>
        <linearGradient id="ux-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* canvas */}
      <rect x="44" y="40" width="220" height="170" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="60" y="56" width="80" height="14" rx="7" fill="url(#ux-accent)" />
      <rect x="60" y="82" width="188" height="52" rx="8" fill="#eff6ff" />
      <circle cx="86" cy="108" r="14" fill="#c4b5fd" />
      <rect x="112" y="98" width="90" height="8" rx="4" fill="#bfdbfe" />
      <rect x="112" y="112" width="60" height="8" rx="4" fill="#e2e8f0" />
      <rect x="60" y="146" width="88" height="48" rx="8" fill="#f5f3ff" />
      <rect x="160" y="146" width="88" height="48" rx="8" fill="#eff6ff" />
      {/* toolbar / swatches */}
      <rect x="284" y="40" width="72" height="170" rx="12" fill="#0f172a" />
      {["#f472b6", "#818cf8", "#34d399", "#f59e0b"].map((c, i) => (
        <circle key={c} cx="320" cy={68 + i * 30} r="11" fill={c} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <rect x="304" y="180" width="32" height="10" rx="5" fill="#334155" />
      {/* cursor */}
      <path d="M214 168 l0 26 l7 -7 l5 10 l5 -3 l-5 -10 l10 0 z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
    </SceneWrap>
  )
}

export type HeroScene = { id: string; label: string; Scene: () => ReactNode }

export const heroScenes: HeroScene[] = [
  { id: "code", label: "Software development", Scene: CodeScene },
  { id: "dashboard", label: "Analytics & reporting", Scene: DashboardScene },
  { id: "network", label: "Integrated systems", Scene: NetworkScene },
  { id: "devices", label: "Cross-platform apps", Scene: DevicesScene },
  { id: "database", label: "Reliable data management", Scene: DatabaseScene },
  { id: "automation", label: "Smart automation", Scene: AutomationScene },
  { id: "design", label: "Intuitive design", Scene: DesignScene },
  { id: "cloud", label: "Secure cloud hosting", Scene: CloudScene },
]
