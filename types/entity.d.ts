declare interface EntityMeta {
  entity: EntityType
  author?: string
  slug?: string
  show?: string
  comments?: string
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

declare type EntityType = 'book' | 'serie' | 'author'

declare type Entity = 'books' | 'series' | 'authors'

declare type EntityList = Book | Serie | Author | Entity
