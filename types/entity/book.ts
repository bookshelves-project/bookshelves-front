import type { Author } from './author'
import type { Language } from './language'
import type { Publisher } from './publisher'
import type { DownloadFile, DownloadList, EntityType, Serie, Tag } from '.'

// declare interface BookSerie {
//   title: string
//   meta: BookMeta
// }

export interface Identifier {
  isbn?: string
  isbn10?: string
  isbn13?: string
}

// declare interface PublisherMeta {
//   slug: string
//   books: string
//   show: string
// }

// declare interface Publisher {
//   name: string
//   count: number
//   first_char: string
//   meta: PublisherMeta
// }

export interface BookMeta {
  entity: EntityType
  slug: string
  author: string
  show: string
  reviews?: string
}

export interface Book {
  title: string
  type: string
  meta: BookMeta
  authors: Author[]
  summary?: string
  language: Language
  released_on?: Date
  media?: any
  // media?: Media
  media_social?: string
  volume?: number
  serie?: Serie
  description?: string
  identifier?: Identifier
  page_count?: string
  maturity_rating?: string
  publisher?: Publisher
  tags?: Tag[]
  genres?: Tag[]
  download?: DownloadFile
  files?: DownloadList
  is_favorite?: boolean
  reviews_count?: number
}
