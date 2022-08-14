declare interface EntityCollection {
  authors?: Entity[]
  series?: Entity[]
  books?: Entity[]
}

declare interface Search {
  count?: number
  query?: string
  type?: 'collection' | 'meilisearch'
  results?: EntityCollection
  relevant?: EntityCollection
  other?: EntityCollection
}
