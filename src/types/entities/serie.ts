import { Cover, Sizes, Tag } from '.'
import { Author } from './author'
import { CommentData } from './comment'

export interface SerieMeta {
  entity: string
  slug: string
  author: string
  show: string
  books?: string
}

export interface Serie {
  title?: string
  meta: SerieMeta
  cover?: Cover
  language: string
  authors?: Author[]
  count?: number
  description?: string
  link: string
  tags?: Tag[]
  genres?: Tag[]
  download?: string
  sizes?: Sizes
  isFavorite?: boolean
  comments?: CommentData[]
}
