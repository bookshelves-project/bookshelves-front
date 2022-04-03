declare interface AuthorMeta {
  entity: EntityType
  slug?: string
  show?: string
  books?: string
  series?: string
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
  cover?: Cover
  count?: AuthorCount
  description?: string
  link?: string
  download?: DownloadFile
  files?: DownloadList
  isFavorite?: boolean
  comments?: CommentData[]
}
