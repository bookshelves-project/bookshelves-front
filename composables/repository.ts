// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtError } from '@nuxt/types'
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { stringify } from 'qs'
import { ApiPaginateResponse, Query } from '~/types'

export enum ApiEndpoint {
  Book = '/books',
  Serie = '/series',
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

  executeRequest() {
    console.log('request')
  }

  /**
   * Get all entities
   */
  index(params?: Query): Promise<ApiPaginateResponse> {
    const query = `?${stringify({ ...params })}`
    const path = `${this.endpoint}`
    return this.axios.$get(`${path}${query}`)
      .then((response: ApiPaginateResponse) => response)
      .catch((e) => {
        console.error(e)
        this.error({ statusCode: 500, message: `Request failed on ${path}.` })
        return {}
      })
  }

  show(slug: string) {
    // return this.axios.$get(`${resource}/${id}`)
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
