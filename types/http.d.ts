declare interface ApiResponse<T> {
  data: T
  links?: ApiMetaLinksList
  meta?: ApiMeta
}

declare interface HttpResponse<T = any> {
  response?: import('ohmyfetch').FetchResponse<T>,
  body?: T,
  success?: boolean
  hasErrors?: boolean
  error?: import('ohmyfetch').FetchError
}

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

type ApiEndpointEntity =
  | '/books'
  | '/authors'
  | '/authors/books'
  | '/authors/series'
  | '/series'
  | '/series/books'
  | '/tags'
  | '/tags/books'
  | '/entities/selection'
  | '/entities/latest'
  | '/entities/related'

type ApiEndpointRelation =
  | '/languages'
  | '/publishers'
  | '/publishers/books'

type ApiEndpointOther =
  | '/application'
  | '/cms/home-page'
  | '/posts'
  | '/pages'
  | '/submissions'
  | '/search'

type ApiEndpointAuth =
  | '/auth/login'
  | '/auth/logout'
  | '/auth/register'
  | '/auth/me'

type ApiEndpointProfile =
  | '/user'
  | '/profile/favorites'
  | '/users'
  | '/users/favorites'
  | '/users/reviews'

declare type ApiEndpoint =
  | ApiEndpointOther
  | ApiEndpointEntity
  | ApiEndpointRelation
  | ApiEndpointEntity
  | ApiEndpointAuth
  | ApiEndpointProfile

type RequestMethod = 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE'
declare interface BaseRequest {
  endpoint?: string
  headers?: HeadersInit
  method?: RequestMethod = 'GET'
  credentials?: RequestCredentials
  debug?: boolean
}
declare interface RequestData {
  endpoint?: ApiEndpoint
  raw?: boolean
  headers?: HeadersInit
  crashOnError?: boolean
  method?: RequestMethod = 'GET'
  credentials?: RequestCredentials
  params?: Params
  query?: Query
  body?: any
  lazy?: boolean
  extractData?: boolean
  debug?: boolean
}
