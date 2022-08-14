declare interface Query {
  lang?: string
  size?: number
  page?: number
  limit?: number
  'filter[allow_serie]'?: boolean
  'filter[languages]'?: string
  'filter[types]'?: string
  'filter[type]'?: string
  'filter[negligible]'?: boolean
  next?: number
  first?: boolean
  alpha?: string
  full?: boolean
  sort?: string
  q?: string
  types?: string
  relevant?: boolean
}

declare type Params = {
  slug: string | string[]
}

declare type ApiEndpoint = '/application' | '/cms/home-page' | '/entities/selection' | '/entities/latest' | '/books' | '/authors' | '/series' | '/tags' | '/series/books' | '/authors/books' | '/authors/series' | '/languages' | '/publishers' | '/posts' | '/tags/books' | '/pages' | '/submission/send' | '/publishers' | '/publishers/books' | '/users' | '/users/favorites' | '/users/reviews' | '/entities/related' | '/search'

type RequestMethod = 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE'
declare interface BaseRequest {
  endpoint: string
  method?: RequestMethod = 'GET'
  debug?: boolean
}
declare interface RequestData {
  endpoint: ApiEndpoint
  method?: RequestMethod = 'GET'
  params?: Params
  query?: Query
  extractData?: boolean
  debug?: boolean
}
