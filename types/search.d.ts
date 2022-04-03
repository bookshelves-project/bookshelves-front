declare interface Search {
  count?: number
  type?: 'collection' | 'meilisearch'
  relevant?: EntityCollection
  other?: EntityCollection
}

declare interface EntityCollection {
  authors?: Entity[]
  series?: Entity[]
  books?: Entity[]
}
