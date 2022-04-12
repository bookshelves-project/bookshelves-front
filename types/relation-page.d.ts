declare interface Page {
  title: string
  meta: PageMeta
  cover?: string
  summary?: string
  publishedAt?: Date
  updatedAt?: Date
  body?: string
}

declare interface PageMeta {
  slug: string
  title?: string
  description?: string
  show: string
}
