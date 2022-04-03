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
