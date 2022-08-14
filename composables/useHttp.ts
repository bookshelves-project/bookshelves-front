import { FetchRequest, FetchOptions, FetchResponse, FetchError } from 'ohmyfetch'

/**
 * API composable
 */
export const useHttp = () => {
  const route = useRoute()

  const { apiURL, apiEndpoint } = useRuntimeConfig()
  const url = `${apiURL}${apiEndpoint}`

  const getRoute = computed(() => useRoute())

  const getRequest = (request: RequestData | ApiEndpoint) => {
    if (!isRequestData(request)) {
      request = {
        endpoint: request
      }
    }

    let localUrl = `${url}${request.endpoint}`

    if (request.params) {
      const params = Object.values(request.params).join('/')
      localUrl += `/${params}`
    }

    if (request.query || route.query) {
      localUrl = setQuery(localUrl, request.query)
    }

    if (request.debug) {
      console.warn(localUrl)
    }

    return {
      url: localUrl,
      request
    }
  }

  const setQuery = (endpoint: string, query?: Query) => {
    const queryParams = {
      ...query,
      ...getRoute.value.query
    } as Record<string, string>

    const urlSearchParams = new URLSearchParams(queryParams)
    const queryStringify = urlSearchParams.toString()
    endpoint += `?${queryStringify}`

    return endpoint
  }

  const isRequestData = (object: unknown): object is RequestData => {
    return Object.prototype.hasOwnProperty.call(object, 'endpoint')
  }

  const isFetchResponse = <T>(object: any): object is FetchResponse<T> => {
    if (object && typeof object === 'object') {
      return object.status !== undefined
    }

    return false
  }

  const request = async <T>(request: RequestData | ApiEndpoint) => {
    let req: {
      url: string
      request: RequestData
    }

    if (isRequestData(request) && request.raw) {
      req = {
        url: request.endpoint,
        request
      }
    } else {
      req = getRequest(request)
    }

    const res = {
      response: {} as FetchResponse<T>,
      body: {} as T,
      success: false,
      hasErrors: false,
      error: {} as FetchError
    }

    const response = await $fetch.raw<T>(req.url, {
      method: req.request.method || 'GET',
      body: req.request.body,
      headers: req.request.headers
    }).catch((e: FetchError) => {
      console.warn(e)
      res.hasErrors = true
      res.error = e
      if (req.request.crashOnError) {
        throw e
      }
    })

    if (!res.hasErrors && isFetchResponse(response)) {
      const body = response._data as any
      res.success = true

      if (req.request.debug) {
        console.warn(body)
      }

      res.response = response
      if (req.request.extractData) {
        res.body = body.data as T
      } else {
        res.body = body as T
      }
    }

    return res
  }

  const requestRaw = async <T>(request: BaseRequest) => {
    const response = await $fetch.raw(request.endpoint).catch(e => e)

    if (response.status === 200) {
      const body = response._data as any

      if (request.debug) {
        console.warn(body)
      }

      return body as T
    }
  }

  return {
    getRequest,
    setQuery,
    request,
    requestRaw
  }
}
