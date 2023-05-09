// declare interface SerieMeta {
//   entity: EntityType
//   slug: string
//   author: string
//   show: string
//   books?: string
//   reviews?: string
// }

import type { Author } from './author'

// declare interface Serie {
//   title?: string
//   type?: string
//   meta: SerieMeta
//   media?: Media
//   media_social?: string
//   language: Language
//   authors: Author[]
//   count?: number
//   description?: string
//   link: string
//   tags?: Tag[]
//   genres?: Tag[]
//   download?: DownloadFile
//   files?: DownloadList
//   is_favorite?: boolean
//   reviews?: Review[]
// }

export interface Serie {
  title?: string
  type?: string
  meta: any
  media?: any
  media_social?: string
  language: any
  author: Author
  authors: Author[]
  count?: number
  description?: string
  link: string
  tags?: any[]
  genres?: any[]
  download?: any
  files?: any
  is_favorite?: boolean
  reviews?: any[]
}
