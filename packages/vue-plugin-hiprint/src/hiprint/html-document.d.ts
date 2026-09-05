export interface HtmlDocumentOptions {
  title?: string
  lang?: string
}

export function buildFullHtmlDocument(content: string, css: string, options?: HtmlDocumentOptions): string
