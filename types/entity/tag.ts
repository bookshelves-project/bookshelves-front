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
  first_char?: string
  meta: TagMeta
}
