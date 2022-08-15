import { FetchResponse, FetchError } from 'ohmyfetch'

interface HttpResponse<T> {
  response: FetchResponse<T>,
  body: T,
  success: boolean
  hasErrors: boolean
  error: FetchError
}

interface Request {
  url: string
  request: RequestData
}

/**
 * API composable
 */
export const useHttp = () => {
  const route = useRoute()

  const { apiURL, apiEndpoint } = useRuntimeConfig()
  const url = `${apiURL}${apiEndpoint}`

  const getRoute = computed(() => useRoute())

  const getRequest = (request: RequestData | ApiEndpoint): Request => {
    if (!isRequestData(request)) {
      request = {
        endpoint: request
      }
    }

    let localUrl = `${url}${request.endpoint}`
    localUrl = setParams(localUrl, request.params)

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

  const setParams = (endpoint: string, params?: Params) => {
    if (params) {
      const paramsStr = Object.values(params).join('/')
      endpoint += `/${paramsStr}`
    }

    return endpoint
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

  /**
   * Create an HTTP request based on $fetch, and return a promise.
   * Allow request errors.
   *
   * @param request RequestData | ApiEndpoint
  */
  const request = async <T>(request: RequestData | ApiEndpoint): Promise<HttpResponse<T>> => {
    let req: Request = {
      url: '',
      request: {} as RequestData
    }

    if (isRequestData(request) && request.raw) {
      req = {
        url: request.endpoint,
        request
      }
    } else {
      req = getRequest(request)
    }

    const res: HttpResponse<T> = {
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
