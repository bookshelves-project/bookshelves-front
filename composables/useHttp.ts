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
      const queryParams = {
        ...request.query,
        ...getRoute.value.query
      } as Record<string, string>
      const query = new URLSearchParams(queryParams)
      const queryStringify = query.toString()
      localUrl += `?${queryStringify}`
    }

    if (request.debug) {
      console.warn(localUrl)
    }

    return {
      url: localUrl,
      request
    }
  }

  const isRequestData = (object: unknown): object is RequestData => {
    return Object.prototype.hasOwnProperty.call(object, 'endpoint')
  }

  const request = async <T>(request: RequestData | ApiEndpoint) => {
    const req = getRequest(request)
    const response = await $fetch.raw(req.url)

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
    const response = await $fetch.raw(request.url)

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
    request,
    requestRaw
  }
}
