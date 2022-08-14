declare type EntityType = 'book' | 'serie' | 'author'

declare interface EntityMeta {
  entity: EntityType
  author?: string
  slug: string
  show?: string
  reviews?: string
}

declare interface Media {
  name?: string
  url?: string
  color?: string
}

declare interface Entity {
  meta: EntityMeta
  title?: string
  type?: string
  name?: string
  authors?: Author[]
  type?: string
  serie?: string
  count?: number
  language?: Language
  volume?: number
  media?: Media
  cover?: Cover
  firstChar?: string
  isFavorite?: boolean
}

interface UseEntitySerie {
  title: string
  volume?: string
}

declare interface UseEntity {
  title: string
  route?: Route
  authors?: string
  serie?: UseEntitySerie
  language?: string
  media?: Media
  count?: string
  type?: string
  entityName?: string
}

declare type EntityList = Book | Serie | Author | Entity
