import { Author, Cover } from './shared'

export interface BookMeta {
  slug: string
  author: string
  show: string
}

export interface BookSerie {
  title?: string
  meta?: BookMeta
}

export interface Book {
  title: string
  meta: BookMeta
  authors?: Author[]
  summary: string
  language: string
  publishDate?: Date
  cover: Cover
  volume: number
  serie: BookSerie
}
