import { Author, BookMeta, Cover, Serie } from './books'

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
