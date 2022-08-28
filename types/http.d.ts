declare interface ApiMetaLink {
  url?: string
  label?: string
  active?: boolean
}

declare interface ApiMetaLinksList {
  first?: string
  last?: string
  prev?: null
  next?: string
}

declare interface ApiMeta {
  current_page: number
  from: number
  last_page: number
  links: ApiMetaLink[]
  path: string
  per_page: string
  to: number
  total: number
}

declare interface Pagination {
  pages?: number
  currentPage?: number
  size?: string
  total?: number
}

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

declare type Params = (string | string[])[]
type ApiTypedParam = string | number | string[]
type ApiTypedRouteList =
  | '/authors'
  | '/authors/{slug}'
  | '/authors/{slug}/books'
  | '/authors/{slug}/series'
  | '/series'
  | '/series/{author}/{slug}'
  | '/series/{author}/{slug}/books'
  | '/books'
  | '/books/{author}/{slug}'
  | '/languages'
  | '/publishers'
  | '/publishers/{slug}'
  | '/publishers/{slug}/books'
  | '/tags'
  | '/tags/{slug}'
  | '/tags/{slug}/books'
  | '/posts'
  | '/posts/{slug}'
  | '/pages'
  | '/pages/{slug}'
  | '/users'
  | '/users/{slug}'

type ApiTypedRouteParams = {
  '/authors': never;
  '/authors/{slug}': {
    slug: ApiTypedParam;
  }
  '/authors/{slug}/books': {
    slug: ApiTypedParam;
  }
  '/authors/{slug}/series': {
    slug: ApiTypedParam;
  }
  '/series': never
  '/series/{author}/{slug}': {
    author: ApiTypedParam;
    slug: ApiTypedParam;
  }
  '/series/{author}/{slug}/books': {
    author: ApiTypedParam;
    slug: ApiTypedParam;
  }
  '/books': never
  '/books/{author}/{slug}': {
    author: ApiTypedParam;
    slug: ApiTypedParam;
  }
  '/languages': never
  '/publishers': never
  '/publishers/{slug}': {
    slug: ApiTypedParam;
  }
  '/publishers/{slug}/books': {
    slug: ApiTypedParam;
  }
  '/tags': never
  '/tags/{slug}': {
    slug: ApiTypedParam;
  }
  '/tags/{slug}/books': {
    slug: ApiTypedParam;
  }
  '/posts': never
  '/posts/{slug}': {
    slug: ApiTypedParam;
  }
  '/pages': never
  '/pages/{slug}': {
    slug: ApiTypedParam;
  }
  '/users': never
  '/users/{slug}': {
    slug: ApiTypedParam;
  }
};

declare interface ApiTypedRoute {
  name: ApiTypedRouteList,
  params?: ApiTypedRouteParams[ApiTypedRouteList],
  query?: Query
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
  // apiType?: ApiTypedRoute
  endpoint?: ApiTypedRouteList
  raw?: boolean
  headers?: HeadersInit
  crashOnError?: boolean
  method?: RequestMethod = 'GET'
  credentials?: RequestCredentials
  params?: ApiTypedRouteParams[ApiTypedRouteList]
  query?: Query
  body?: any
  lazy?: boolean
  extractData?: boolean
  debug?: boolean
}
