// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtError } from '@nuxt/types'
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { stringify } from 'qs'
import { ApiPaginateResponse, ApiResponse, Query } from '~/types'

export enum ApiEndpoint {
  Book = '/books',
  Serie = '/series',
  SerieBook = '/series/books',
  Author = '/authors',
}
export class Repository {
  axios: NuxtAxiosInstance
  error: (param: NuxtError) => void
  endpoint?: ApiEndpoint
  response?: AxiosResponse

  constructor(axios: NuxtAxiosInstance, error: (param: NuxtError) => void, endpoint: ApiEndpoint = ApiEndpoint.Book, response?: AxiosResponse) {
    this.axios = axios
    this.error = error
    this.endpoint = endpoint
    this.response = response
  }

  url(params: string | string[] | undefined) {
    let url = `${this.endpoint}`
    if (params) {
      const routeParams = params instanceof Array ? params.join('/') : params
      url = `${url}/${routeParams}`
    }

    return url
  }

  /**
   * Get all entities
   */
  index(query?: Query, params?: string | string[]) {
    const url = `${this.url(params)}?${stringify({ ...query })}`

    return this.axios.$get(url)
      .then((response: ApiPaginateResponse<any>) => response)
      .catch((e) => {
        console.error(e)
        this.error({ statusCode: 500, message: `Request failed on ${this.endpoint}.` })
        return {} as ApiPaginateResponse<any>
      })
  }

  show(params: string | string[]): Promise<ApiResponse<any>> {
    return this.axios.$get(this.url(params))
      .then((response: ApiResponse<any>) => response)
      .catch((e) => {
        console.error(e)
        this.error({ statusCode: 500, message: `Request failed on ${this.endpoint}.` })
        return {} as ApiResponse<any>
      })
  }

  create(payload: object) {
    // return this.axios.$post(`${resource}`, payload)
  }

  update(slug: string, payload: object) {
    // return this.axios.$post(`${resource}/${id}`, payload)
  }

  delete(slug: string) {
    // return this.axios.$delete(`${resource}/${id}`)
  }
}
