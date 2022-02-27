import { Book } from './book'
import { Author } from './author'
import { Serie } from './serie'
import { Search } from './search'

export interface Cover {
  thumbnail?: string
  og?: string
  simple?: string
  original?: string
  color?: string
}

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

export interface EntityMeta {
  entity?: string
  author?: string
  slug?: string
  show?: string
}

export interface Entity {
  meta: EntityMeta
  title?: string
  name?: string
  authors?: Author[]
  serie?: string
  language?: string
  volume?: number
  cover?: Cover
  firstChar?: string
  isFavorite?: boolean
}

export interface AuthorEntity extends Entity {
  count?: number
}

export interface Sizes {
  cbz: SizesItem
  epub: SizesItem
  pdf: SizesItem
}
export interface SizesItem {
  size: string
  count: number
}

export { Book, Author, Serie, Search }
