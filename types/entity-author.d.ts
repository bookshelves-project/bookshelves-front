declare interface AuthorMeta {
  entity: EntityType
  slug?: string
  show?: string
  books?: string
  series?: string
  reviews?: string
}

declare interface AuthorCount {
  books?: number
  series?: number
}

declare interface Author {
  name?: string
  meta: AuthorMeta
  lastname?: string
  firstname?: string
  media?: Media
  media_social?: string
  count?: AuthorCount
  description?: string
  link?: string
  download?: DownloadFile
  files?: DownloadList
  is_favorite?: boolean
  reviews?: Review[]
}
