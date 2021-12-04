// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'
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
  endpoint?: ApiEndpoint
  response?: AxiosResponse

  constructor (axios: NuxtAxiosInstance, endpoint: ApiEndpoint = ApiEndpoint.Book, response?: AxiosResponse) {
    this.axios = axios
    this.endpoint = endpoint
    this.response = response
  }

  executeRequest () {
    console.log('request')
  }

  /**
   * Get all entities
   */
  index (params?: Query): Promise<ApiPaginateResponse> {
    const query = `?${stringify({ ...params })}`
    return this.axios.$get(`${this.endpoint}${query}`)
      .then((response: ApiPaginateResponse) => response)
  }

  show (slug: string) {
    // return this.axios.$get(`${resource}/${id}`)
  }

  create (payload: object) {
    // return this.axios.$post(`${resource}`, payload)
  }

  update (slug: string, payload: object) {
    // return this.axios.$post(`${resource}/${id}`, payload)
  }

  delete (slug: string) {
    // return this.axios.$delete(`${resource}/${id}`)
  }
}
