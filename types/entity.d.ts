declare type EntityType = 'book' | 'serie' | 'author'

declare interface EntityMeta {
  entity: EntityType
  author?: string
  slug: string
  show?: string
  reviews?: string
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
  image: string
  color: string
  route?: Route
  authors?: string
  serie?: UseEntitySerie
  language?: string
  count?: string
  type?: string
  entityName?: string
}

declare type EntityList = Book | Serie | Author | Entity
