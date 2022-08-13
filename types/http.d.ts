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
}

declare type Params = {
  slug: string | string[]
}

// declare type Endpoint = 'games' | 'armies' | 'army-categories' | 'miniatures' | 'collectors' | 'search' | 'cms' | 'cms/home'
declare type ApiEndpoint = '/application' | '/cms/home-page' | '/entities/selection' | '/entities/latest' | '/books' | '/authors' | '/series' | '/tags' | '/series/books' | '/authors/books' | '/authors/series' | '/languages' | '/publishers' | '/posts' | '/tags/books' | '/pages' | '/submission/send'

type RequestMethod = 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE'
declare interface BaseRequest {
  url: string
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
