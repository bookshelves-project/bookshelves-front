import { FetchResponse, FetchError } from 'ohmyfetch'

interface Request {
  url: string
  request: RequestData
}

/**
 * useHTTP composable based on `ohmyfetch` library.
 *
 * Docs: https://github.com/unjs/ohmyfetch
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

  const executeRequest = async <T>(req: Request): Promise<HttpResponse<T>> => {
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
      headers: req.request.headers,
      credentials: req.request.credentials
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
        url: request.endpoint as string,
        request
      }
    } else {
      req = getRequest(request)
    }

    const res = await executeRequest<T>(req)

    return res
  }

  const requestRaw = async <T>(request: BaseRequest): Promise<HttpResponse<T>> => {
    const req: Request = {
      url: request.endpoint as string,
      request: {} as RequestData
    }

    const res = await executeRequest<T>(req)

    return res
  }

  return {
    getRequest,
    setQuery,
    request,
    requestRaw
  }
}
