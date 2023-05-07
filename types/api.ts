export type UrlParam = string | number | string[] | undefined
export type ApiBaseRoute =
  | '/authors'
  | '/authors/{author}'
  | '/authors/{author}/books'
  | '/authors/{author}/series'
  | '/series'
  | '/series/{author}/{serie}'
  | '/series/{author}/{serie}/books'
  | '/books'
  | '/books/{author}/{book}'
  | '/entities/related/{author}/{book}'
  | '/series/{author}/{serie}/{volume}/next'
  | '/application'
  | '/search'

export interface ApiBaseRouteParams {
  '/authors': never
  '/authors/{author}': {
    author: UrlParam
  }
  '/authors/{author}/books': {
    author: UrlParam
  }
  '/authors/{author}/series': {
    author: UrlParam
  }
  '/series': never
  '/series/{author}/{serie}': {
    author: UrlParam
    serie: UrlParam
  }
  '/series/{author}/{serie}/books': {
    author: UrlParam
    serie: UrlParam
  }
  '/books': never
  '/books/{author}/{book}': {
    author: UrlParam
    book: UrlParam
  }
  '/entities/related/{author}/{book}': {
    author: UrlParam
    book: UrlParam
  }
  '/series/{author}/{serie}/{volume}/next': {
    author: UrlParam
    serie: UrlParam
    volume: UrlParam
  }
  '/application': never
  '/search': never
}

export interface Query {
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

export interface ApiRoute {
  name: ApiBaseRoute
  params?: ApiBaseRouteParams[ApiBaseRoute]
  query?: Query
}

export interface Api<T = any> {
  data: T
}

export interface ApiMeta {
  current_page: number
  from: number
  last_page: number
  links: {
    url?: string
    label?: string
    active?: boolean
  }[]
  path: string
  per_page: string
  to: number
  total: number
}

export interface ApiData<T = any> {
  data: T
  links?: {
    first?: string
    last?: string
    prev?: null
    next?: string
  }
  meta?: ApiMeta
}
