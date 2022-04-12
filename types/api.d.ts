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

declare interface ApiResponse<T> {
  data: T
}

declare interface ApiPaginateResponse<T> {
  data: T
  links: ApiMetaLinksList
  meta: ApiMeta
}

declare interface Pagination {
  pages?: number
  currentPage?: number
  size?: string
  total?: number
}

declare interface ApiFormated<T> {
  data: T[]
  pagination?: Pagination
}

declare interface Query {
  lang?: string
  size?: string
  page?: string
  limit?: string
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

declare type Params = (string | string[] | undefined)[]

declare interface FetchParams {
  endpoint: Endpoint
  params?: Params
  query?: Query
  lazy?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}
