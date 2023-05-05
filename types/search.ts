export interface Entity {
  [key: string]: any
}

export interface Relevant {
  relevant?: Entity[]
  other: Entity[]
}

export interface Search {
  count?: number
  query?: string
  type?: 'collection' | 'meilisearch'
  results?: {
    authors?: Entity[]
    series?: Entity[]
    books?: Entity[]
  }
  results_relevant?: {
    authors?: Relevant
    series?: Relevant
    books?: Relevant
  }
}
