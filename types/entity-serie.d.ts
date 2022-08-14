declare interface SerieMeta {
  entity: EntityType
  slug: string
  author: string
  show: string
  books?: string
  reviews?: string
}

declare interface Serie {
  title?: string
  type?: string
  meta: SerieMeta
  media?: Media
  media_social?: string
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
  reviews?: Review[]
}
