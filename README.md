# عمران سافت (Emransoft) — Corporate Website

A production-ready, fully internationalized corporate website for **Emransoft**, a dental clinic management software company based in Afghanistan. Built with Next.js 16, next-intl v4, and a real geographic SVG map of Afghanistan.

## 🌐 Live Demo

[emransoft.com](https://emransoft.com) <!-- update when deployed -->

## ✨ Features

- **🌍 Trilingual i18n** — Dari (default, Afghan dialect), English, and Pashto via next-intl v4
- **🔁 RTL / LTR** — Automatic direction switching; Dari & Pashto render right-to-left, English left-to-right
- **🗺️ Interactive Afghanistan Map** — Real USGS-derived SVG map with 328 province/district boundaries, animated markers, connection lines, and hover tooltips
- **📱 Fully Responsive** — Mobile-first design with a functional hamburger drawer menu
- **⚡ Static Generation** — 24 SSG pages (8 routes × 3 locales) for fast loading and excellent Lighthouse scores
- **🎨 Modern UI** — Tailwind CSS v4, Framer Motion animations, Lucide icons
- **♿ Accessible** — ARIA labels, keyboard navigation, semantic HTML

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with Turbopack |
| **next-intl v4** | Internationalization, routing, message loading |
| **TypeScript** | Strict type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Page & component animations |
| **next/image** | Optimized image delivery |
| **SVG** | USGS-derived Afghanistan district map (public domain) |

## 📁 Project Structure

```
├── app/[locale]/         # Route segments (home, about, contact, products, …)
├── components/
│   ├── layout/           # Header, Footer, LanguageSwitcher, LocaleProvider
│   ├── map/              # ProvinceMarker, ConnectionLine, Tooltip
│   ├── sections/         # Hero, Features, Statistics, Screenshots, …
│   └── ui/               # Button, Card, Badge, Section wrappers
├── data/                 # Static data (provinces, products, features, …)
├── i18n/                 # Routing, navigation, request config
├── messages/             # Translation JSON files (fa, en, ps)
├── public/
│   ├── images/           # Logos, screenshots
│   └── maps/             # Afghanistan district SVG (1.76 MB)
└── proxy.ts              # next-intl middleware (Next.js 16 convention)
```

## 🚀 Getting Started

```bash
npm install
npm run dev        # development server on http://localhost:3000
npm run build      # production build (24 static pages)
```

## 📦 Deployment

Deploy on **Vercel** with zero configuration:

```bash
npm i -g vercel
vercel
```

Set the **Root Directory** to `./` and the framework to **Next.js**. All 24 routes will be statically generated.

## 🗣️ Internationalization

- Default locale: **Dari (fa)** — URLs omit `/fa` prefix (`localePrefix: "as-needed"`)
- English (`en`) and Pashto (`ps`) use locale prefixes: `/en/about`, `/ps/products`
- Afghan Dari vocabulary used throughout (ولایت, معاینه خانه, سافتویر, مریض, داکتر, تیلیفون)

## 📄 License

All rights reserved. © 2026 Emransoft.
