declare interface SerieMeta {
  entity: EntityType
  slug: string
  author: string
  show: string
  books?: string
}

declare interface Serie {
  title?: string
  type?: string
  meta: SerieMeta
  cover?: Cover
  language: Language
  authors?: Author[]
  count?: number
  description?: string
  link: string
  tags?: Tag[]
  genres?: Tag[]
  download?: DownloadFile
  files?: DownloadList
  isFavorite?: boolean
  comments?: CommentData[]
}
