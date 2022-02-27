import { CommentData } from './comment'
import { Cover, Tag } from '.'
import { Author } from './author'

export interface BookMeta {
  entity: string
  slug: string
  author: string
  show: string
}

export interface BookSerie {
  title: string
  meta: BookMeta
}

export interface BookFiles {
  cbz?: BookFile
  epub?: BookFile
  pdf?: BookFile
}

export interface BookFile {
  name: string
  size: string
  path: string
  download: string
}

export interface GoogleBook {
  previewLink?: null
  buyLink?: null
  createdAt?: Date
}

export interface Identifier {
  isbn?: string
  isbn10?: string
  isbn13?: string
}

export interface PublisherMeta {
  slug: string
  books: string
  show: string
}

export interface Publisher {
  name: string
  count: number
  first_char: string
  meta: PublisherMeta
}

export interface Book {
  title: string
  meta: BookMeta
  authors: Author[]
  summary?: string
  language: string
  releasedOn?: Date
  cover?: Cover
  volume?: number
  serie?: BookSerie
  description?: string
  identifier?: Identifier
  pageCount?: string
  maturityRating?: string
  publisher?: Publisher
  tags?: Tag[]
  genres?: Tag[]
  files?: BookFiles
  webreader?: string
  googleBook?: GoogleBook
  isFavorite?: boolean
  comments?: CommentData[]
}
