import type { ApiBaseRoute, ApiBaseRouteParams } from '../api'
import type { Author } from './author'
import type { Book } from './book'
import type { Language } from './language'
import type { Serie } from './serie'
import type { Cover } from './shared'

export * from './author'
export * from './book'
export * from './download'
export * from './language'
export * from './page'
export * from './post'
export * from './publisher'
export * from './serie'
export * from './tag'
export * from './user-data'
export * from './user'

export interface EntityMeta {
  entity: EntityType
  author?: string
  slug: string
  show?: string
  reviews?: string
}

export interface Media {
  name?: string
  url?: string
  color?: string
  available?: boolean
}

export interface Entity {
  meta: EntityMeta
  title?: string
  type?: string
  name?: string
  authors?: Author[]
  serie?: string
  count?: number
  language?: Language
  volume?: number
  media?: Media
  cover?: Cover
  first_char?: string
  is_favorite?: boolean
}

interface UseEntitySerie {
  title: string
  volume?: string
}

export interface UseEntity {
  entity: string
  title: string
  route?: AppRoute
  authors?: string
  serie?: UseEntitySerie
  language?: string
  media?: Media
  count?: string
  type?: string
  entityName?: string
}

export interface EntityCard {
  entity?: EntityType
  route?: AppRoute

  title?: string
  subtitle?: string
  text?: string
  details?: string
  media?: Media
  // authors?: string
  // serie?: UseEntitySerie
  // language?: string
  // media?: Media
  // count?: string
  // type?: string
  // entityName?: string
}

export type EntityInstance = Book | Serie | Author | Entity

export type EntityType = 'book' | 'serie' | 'author'

export interface SelectedEntities {
  key: string
  name: ApiBaseRoute
  params?: ApiBaseRouteParams[ApiBaseRoute]
  right?: boolean
  eyebrow?: string
  title: string
  text: string
}
