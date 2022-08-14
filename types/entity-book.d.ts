declare interface BookMeta {
  entity: EntityType
  slug: string
  author: string
  show: string
  reviews?: string
}

declare interface BookSerie {
  title: string
  meta: BookMeta
}

declare interface GoogleBook {
  previewLink?: null
  buyLink?: null
  createdAt?: Date
}

declare interface Identifier {
  isbn?: string
  isbn10?: string
  isbn13?: string
}

declare interface PublisherMeta {
  slug: string
  books: string
  show: string
}

declare interface Publisher {
  name: string
  count: number
  first_char: string
  meta: PublisherMeta
}

declare interface Book {
  title: string
  type: string
  meta: BookMeta
  authors: Author[]
  summary?: string
  language: Language
  releasedOn?: Date
  media?: Media
  media_social?: string
  volume?: number
  serie?: BookSerie
  description?: string
  identifier?: Identifier
  pageCount?: string
  maturityRating?: string
  publisher?: Publisher
  tags?: Tag[]
  genres?: Tag[]
  download?: DownloadFile
  files?: DownloadList
  googleBook?: GoogleBook
  isFavorite?: boolean
  reviewsCount?: number
}
