import { Keyable } from '..'

export interface Link {
  url?: string;
  label?: string;
  active?: boolean;
}

export interface Links {
  first?: string;
  last?: string;
  prev?: null;
  next?: string;
}

export interface ApiMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: string;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiPaginateResponse<T> {
  data: T[];
  links: Links;
  meta: ApiMeta;
}

export interface Pagination {
  pages?: number;
  currentPage?: number;
  perPage?: string;
  total?: number
}

export interface ApiFormated<T> {
  data: T[];
  pagination?: Pagination;
}

export interface Query {
  lang?: string,
  perPage?: string
  page?: string,
  limit?: string,
  'filter[allow_serie]'?: string,
  'filter[languages]'?: string,
  sort?: string
}

export interface ApiMessage {
  errors: Keyable,
  message: string
}
