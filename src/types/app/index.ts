import { Query } from '../api'
import { ApiEndpoint } from '../enums'
import { HeadElement, HeadMeta } from './head'
import type { FetchResponse } from 'ohmyfetch'
import { MetadataBase } from './metadata'
export interface Keyable {
  [key: string]: any
}
type Dictionary<T> = { [key: string]: T }

export interface Route {
  name?: string
  params?: Dictionary<string | undefined>
  query?: Query
  path?: string
}
export interface RouteLink {
  label: string
  icon?: string
  route: Route
}
export interface FooterColumn {
  title: string
  links: RouteLink[]
}
export interface SelectedEntities {
  key: string
  endpoint: ApiEndpoint
  right?: boolean
  eyebrow?: string
  title: string
  text: string
}

export interface Response<T> {
  body?: any | T
  response?: FetchResponse<any> & FetchResponse<ResponseType>
}
export type Params = (string | string[] | undefined)[]
export interface FetchParams {
  endpoint: ApiEndpoint
  params?: Params
  query?: Query
  lazy?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}

export interface FilterOption {
  label?: string
  value?: string
  query?: object
  enabled?: boolean
}

export { HeadMeta, HeadElement, MetadataBase }
