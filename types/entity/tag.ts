export interface TagMeta {
  slug: string
  author?: string
  show?: string
  books?: string
}

export interface Tag {
  name: string
  type?: string
  count?: number
  firstChar?: string
  meta: TagMeta
}
