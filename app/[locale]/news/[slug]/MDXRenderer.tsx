import { compileMDX } from "next-mdx-remote/rsc"

interface MDXRendererProps {
  content: string
}

export async function MDXRenderer({ content }: MDXRendererProps) {
  const { content: rendered } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  })

  return (
    <div className="prose prose-slate max-w-none
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-slate-900
      prose-ul:text-slate-600 prose-ul:leading-relaxed
      prose-ol:text-slate-600 prose-ol:leading-relaxed
      prose-li:mb-1
      prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
      prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-800
      prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-600 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
      [&_hr]:border-slate-200 [&_hr]:my-10
      [&_img]:rounded-xl [&_img]:shadow-md
      [&_li::marker]:text-blue-500">
      {rendered}
    </div>
  )
}
