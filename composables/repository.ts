// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtError } from '@nuxt/types'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import { ApiEndpoint, ApiPaginateResponse, ApiResponse, Query } from '~/types'

export class Repository {
  axios: NuxtAxiosInstance
  error: (param: NuxtError) => void
  handleError: boolean
  endpoint?: ApiEndpoint
  response?: AxiosResponse

  constructor(axios: NuxtAxiosInstance, error: (param: NuxtError) => void, handleError: boolean, endpoint: ApiEndpoint = ApiEndpoint.Book, response?: AxiosResponse) {
    this.axios = axios
    this.error = error
    this.handleError = handleError
    this.endpoint = endpoint
    this.response = response
  }

  url(params: string | string[] | undefined, query?: Query) {
    let url = `${this.endpoint}`
    let queryParams = ''
    if (params) {
      const routeParams = params instanceof Array ? params.join('/') : params
      url = `${url}/${routeParams}`
    }
    if (query) {
      queryParams = `?${stringify({ ...query })}`
    }

    return `${url}${queryParams}`
  }

  find(query?: Query, params?: string | string[]): Promise<ApiResponse<any>> {
    return this.axios.$get(this.url(params, query))
      .then((response: ApiResponse<any>) => response)
      .catch((e) => {
        console.error(e)
        if (this.handleError) {
          this.error({ statusCode: 500, message: `Request failed on ${this.endpoint}.` })
        }
        return {} as ApiResponse<any>
      })
  }

  /**
   * Get all entities
   */
  index(query?: Query, params?: string | string[]): Promise<ApiPaginateResponse<any>> {
    return this.axios.$get(this.url(params, query))
      .then((response: ApiPaginateResponse<any>) => response)
      .catch((e) => {
        console.error(e)
        if (this.handleError) {
          this.error({ statusCode: 500, message: `Request failed on ${this.endpoint}.` })
        }
        return {} as ApiPaginateResponse<any>
      })
  }

  show(params: string | string[]): Promise<ApiResponse<any>> {
    return this.axios.$get(this.url(params))
      .then((response: ApiResponse<any>) => response)
      .catch((e) => {
        console.error(e)
        if (this.handleError) {
          this.error({ statusCode: 500, message: `Request failed on ${this.endpoint}.` })
        }
        return {} as ApiPaginateResponse<any>
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
