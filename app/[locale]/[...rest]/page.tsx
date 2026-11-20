import { notFound } from "next/navigation"

// Any unknown URL under a locale renders the localized 404 page
// (app/[locale]/not-found.tsx, with header/footer) and returns HTTP 404.
export default function CatchAllNotFound() {
  notFound()
}
