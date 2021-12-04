import { ApiPaginateResponse } from '.'

export interface AuthorMeta {
  slug?: string
  show?: string
}

export interface Author {
  name?: string
  meta?: AuthorMeta
}

export interface Cover {
  thumbnail?: string
  simple?: string
  color?: string
}

export interface BookMeta {
  slug: string
  author: string
  show: string
}

export interface Serie {
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
  serie: Serie
}

export interface QueryBooks {
  perPage?: string
  page?: string
}

export interface BooksApiPaginateResponse extends ApiPaginateResponse {
  data?: Book[]
}
