import { stringify } from 'qs'
import { objectIsEmpty } from '~/utils/methods'
import type { FetchResponse } from 'ohmyfetch'

export const useFetchable = () => {
  const { apiURL, apiEndpoint } = useRuntimeConfig()
  const api = `${apiURL}${apiEndpoint}`

  const getRoute = computed(() => {
    return useRoute()
  })

  const fullUrl = (endpoint: Endpoint, params: Params = [], query?: Query) => {
    query = {
      ...query,
      ...getRoute.value.query,
    }

    let url = `${api}${endpoint}`
    let queryParams = ''
    if (params) {
      const routeParams = params instanceof Array ? params.join('/') : params
      url = `${url}/${routeParams}`
    }
    if (query && !objectIsEmpty(query))
      queryParams = `?${stringify({ ...query })}`

    return `${url}${queryParams}`
  }

  // const fetch = async <T>(
  //   endpoint: Endpoint,
  //   params: Params = [],
  //   query?: Query
  // ): Promise<ApiResponse<T>> => {
  //   const { data, error } = await vueUseFetch<ApiResponse<T>>(
  //     fullUrl(endpoint, params, query)
  //   ).json()

  //   return data.value
  // }

  // const nuxtAsyncList = async <T>(
  //   endpoint: Endpoint,
  //   params: Params = [],
  //   query?: Query
  // ): Promise<ApiPaginateResponse<T[]>> => {
  //   query = {
  //     ...query,
  //     ...getRoute.value.query,
  //   }

  //   const { data } = await vueUseFetch<ApiPaginateResponse<T[]>>(
  //     fullUrl(endpoint, params, query)
  //   ).json()

  //   return data.value
  // }

  // const nuxtAsync = async <T>(
  //   key: string,
  //   endpoint: Endpoint,
  //   params: Params = [],
  //   query?: Query
  // ): Promise<T> => {
  //   query = {
  //     ...query,
  //     ...getRoute.value.query,
  //   }

  //   const { data } = await useAsyncData<T>(key, () =>
  //     $fetch(fullUrl(endpoint, params, query))
  //   )

  //   return data.value as unknown as T
  // }

  const token = () => {
    return Math.random().toString(36).substr(2)
  }

  const sanctum = async (): Promise<Response> => {
    const endpoint: Endpoint = '/sanctum/csrf-cookie'
    return await $fetch(`${apiURL}${endpoint}`)
  }

  // https://github.com/unjs/ohmyfetch
  const request = async (
    fetchParams: FetchParams
  ): Promise<FetchResponse<any>> => {
    let data: FetchResponse<any>
    await $fetch(
      fullUrl(fetchParams.endpoint, fetchParams.params, fetchParams.query),
      {
        method: fetchParams.method,
        body: fetchParams.body,
        async onResponse({ request, response, options }) {
          // Log response
          console.log(
            '[fetch response]',
            request,
            response.status,
            response.body
          )
          data = response
        },
        async onResponseError({ request, response, options }) {
          // Log error
          console.log(
            '[fetch response error]',
            request,
            response.status,
            response.body
          )
          data = response
        },
      }
    )
    // @ts-ignore
    return data
  }

  const nuxtFetchBase = async <T>(endpoint: string): Promise<T> => {
    const { data } = await useFetch<T>(endpoint)

    // @ts-ignore
    return data.value
  }

  const nuxtFetch = async <T>(
    endpoint: Endpoint,
    params: Params = [],
    query?: Query
  ): Promise<T> => {
    const { data } = await useFetch<T>(fullUrl(endpoint, params, query))

    // @ts-ignore
    return data.value
  }

  const nuxtAsync = async <T>(
    endpoint: Endpoint,
    params: Params = [],
    query?: Query
  ): Promise<ApiResponse<T>> => {
    const url = fullUrl(endpoint, params, query)
    const { data } = await useAsyncData<ApiResponse<T>>(url, () => $fetch(url))

    return data.value
  }

  const nuxtAsyncData = async <T>(
    endpoint: Endpoint,
    params: Params = [],
    query?: Query
  ): Promise<T> => {
    const response = await nuxtAsync<T>(endpoint, params, query)

    return response?.data
  }

  const nuxtAsyncList = async <T>(
    endpoint: Endpoint,
    params: Params = [],
    query?: Query
  ): Promise<ApiPaginateResponse<T[]>> => {
    const url = fullUrl(endpoint, params, query)
    const { data } = await useAsyncData<ApiPaginateResponse<T[]>>(url, () =>
      $fetch(url)
    )

    return data.value
  }

  return {
    fullUrl,
    sanctum,
    request,
    nuxtFetchBase,
    nuxtFetch,
    nuxtAsync,
    nuxtAsyncData,
    nuxtAsyncList,
  }
}
