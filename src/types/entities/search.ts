import { Entity } from '.'

export interface Search {
  count?: number
  type?: 'collection' | 'meilisearch'
  relevant?: EntityCollection
  other?: EntityCollection
}

export interface EntityCollection {
  authors?: Entity[]
  series?: Entity[]
  books?: Entity[]
}
