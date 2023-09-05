// declare interface AuthorMeta {
//   entity: EntityType
//   slug: string
//   show?: string
//   books?: string
//   series?: string
//   reviews?: string
// }

// declare interface AuthorCount {
//   books?: number
//   series?: number
// }

export interface Author {
  name?: string
  // meta: AuthorMeta
  meta: any
  lastname?: string
  firstname?: string
  // media?: Media
  media?: any
  media_social?: string
  // count?: AuthorCount
  count?: any
  description?: string
  link?: string
  // download?: DownloadFile
  download?: any
  // files?: DownloadList
  files?: any
  is_favorite?: boolean
  // reviews?: Review[]
  reviews?: any[]
}
