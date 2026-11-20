import { jsonLdScript } from "@/lib/seo"

/** Renders schema.org structured data. Server component — the JSON is in the initial HTML. */
export function JsonLd({ data }: Readonly<{ data: unknown }>) {
  return (
    <script
      type="application/ld+json"
      // Safe: serialized with "<" escaped in jsonLdScript()
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  )
}
