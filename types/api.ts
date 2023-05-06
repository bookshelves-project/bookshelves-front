export type UrlParam = string | number | string[] | undefined
export type ApiBaseRoute =
  | '/authors'
  | '/authors/{slug}'
  | '/authors/{slug}/books'
  | '/authors/{slug}/series'
  | '/series'
  | '/series/{author}/{slug}'
  | '/series/{author}/{slug}/books'
  | '/books'
  | '/books/{author}/{slug}'
  | '/entities/related/{author}/{slug}'
  | '/series/{author}/{serie}/{volume}/next'
  | '/application'
  | '/search'

export interface ApiBaseRouteParams {
  '/authors': never
  '/authors/{slug}': {
    slug: UrlParam
  }
  '/authors/{slug}/books': {
    slug: UrlParam
  }
  '/authors/{slug}/series': {
    slug: UrlParam
  }
  '/series': never
  '/series/{author}/{slug}': {
    author: UrlParam
    slug: UrlParam
  }
  '/series/{author}/{slug}/books': {
    author: UrlParam
    slug: UrlParam
  }
  '/books': never
  '/books/{author}/{slug}': {
    author: UrlParam
    slug: UrlParam
  }
  '/entities/related/{author}/{slug}': {
    author: UrlParam
    slug: UrlParam
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
