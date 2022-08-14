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

  const request = async <T>(request: RequestData | ApiEndpoint) => {
    const req = getRequest(request)
    const response = await $fetch.raw(req.url).catch(e => e)

    if (response.status === 200) {
      const body = response._data as any

      if (req.request.debug) {
        console.warn(body)
      }
      if (req.request.extractData) {
        return body.data as T
      }

      return body as T
    }
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
