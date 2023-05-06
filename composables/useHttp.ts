import type { FetchResponse } from 'ofetch'
import { ofetch } from 'ofetch'
import type { ApiBaseRoute, UseHttpRequest } from '~/types'

/**
 * useHTTP composable based on `ofetch` library.
 *
 * Docs: https://github.com/unjs/ofetch
 */
export async function useHttp<T = any>(request: UseHttpRequest | string): Promise<Ref<FetchResponse<T> | undefined>> {
  const response = ref<FetchResponse<T>>()
  if (!isUseHttpRequest(request)) {
    request = {
      name: request as ApiBaseRoute,
    }
  }

  if (request.auto === undefined)
    request.auto = true

  let endpoint: string = request.name ?? '' as string
  if (request.auto)
    endpoint = handleRoute(request)
  else
    endpoint = handleEndpoint(request)

  response.value = await ofetch.raw(endpoint, {
    method: 'GET',
  })
    .catch((error) => {
      console.error(error)

      return error
    })

  return response
}

function handleEndpoint(request: UseHttpRequest): string {
  const config = useRuntimeConfig()

  const baseURL = config.public.apiUrl // 'http://localhost:8000'
  const apiEndpoint = config.public.apiEndpoint // '/api'
  const apiURL = `${baseURL}${apiEndpoint}` // 'http://localhost:8000/api'

  const endpoint = `${apiURL}${request.name}`

  return endpoint
}

function handleRoute(request: UseHttpRequest): string {
  const route = useRoute()

  const setParams = (endpoint: string, params?: any) => {
    if (params) {
      const interpolateUrl = (string: string, values: Keyable) => string.replace(/{(.*?)}/g, (match, offset) => values[offset])
      const route = interpolateUrl(endpoint, params)

      endpoint = route
    }

    return endpoint
  }

  const setQuery = (endpoint: string, query?: any) => {
    const queryParams = {
      ...query,
      ...route.query,
    } as Record<string, string>

    const urlSearchParams = new URLSearchParams(queryParams)
    const queryStringify = urlSearchParams.toString()

    if (queryStringify)
      endpoint += `?${queryStringify}`

    return endpoint
  }

  const setRequest = () => {
    let endpoint = handleEndpoint(request)
    endpoint = setParams(endpoint, request.params)

    if (request.query || route.query)
      endpoint = setQuery(endpoint, request.query)

    return endpoint
  }

  return setRequest()
}

function isUseHttpRequest(object: unknown): object is UseHttpRequest {
  return Object.prototype.hasOwnProperty.call(object, 'name')
}

function isRequestData(object: unknown): object is UseHttpRequest {
  return Object.prototype.hasOwnProperty.call(object, 'endpoint')
}

function isFetchResponse<T>(object: any): object is FetchResponse<T> {
  if (object && typeof object === 'object')
    return object.status !== undefined

  return false
}

// interface Request {
//   url: string
//   request: RequestData
// }

// export function useHttp() {
//   const route = useRoute()

//   const config = useRuntimeConfig()
//   const apiURL = config.public.apiURL
//   const apiEndpoint = config.public.apiEndpoint

//   const url = `${apiURL}${apiEndpoint}`
//   console.log(config.public)

//   console.log(url)

//   const getRoute = computed(() => useRoute())

//   const isRequestData = (object: unknown): object is RequestData => {
//     return Object.prototype.hasOwnProperty.call(object, 'endpoint')
//   }

//   const isFetchResponse = <T>(object: any): object is FetchResponse<T> => {
//     if (object && typeof object === 'object')
//       return object.status !== undefined

//     return false
//   }

//   const setParams = (endpoint: string, params?: ApiTypedRouteParams[ApiTypedRouteList]) => {
//     if (params) {
//       const interpolateUrl = (string: string, values: Keyable) =>

//         string.replace(/{(.*?)}/g, (match, offset) => values[offset])
//       const route = interpolateUrl(endpoint, params)

//       endpoint = route
//     }

//     return endpoint
//   }

//   const setQuery = (endpoint: string, query?: Query) => {
//     const queryParams = {
//       ...query,
//       ...getRoute.value.query,
//     } as Record<string, string>

//     const urlSearchParams = new URLSearchParams(queryParams)
//     const queryStringify = urlSearchParams.toString()
//     endpoint += `?${queryStringify}`

//     return endpoint
//   }

//   const getRequest = (request: RequestData | ApiTypedRouteList): Request => {
//     if (!isRequestData(request)) {
//       request = {
//         endpoint: request,
//       }
//     }

//     let localUrl = `${url}${request.endpoint}`
//     localUrl = setParams(localUrl, request.params)

//     if (request.query || route.query)
//       localUrl = setQuery(localUrl, request.query)

//     if (request.debug)
//       console.warn(localUrl)

//     return {
//       url: localUrl,
//       request,
//     }
//   }

//   const executeRequest = async <T>(req: Request): Promise<HttpResponse<T>> => {
//     const res: HttpResponse<T> = {
//       response: {} as FetchResponse<T>,
//       body: {} as T,
//       success: false,
//       hasErrors: false,
//       error: {} as FetchError,
//     }

//     const response = await $fetch.raw<T>(req.url, {
//       method: req.request.method || 'GET',
//       body: req.request.body,
//       headers: req.request.headers,
//       credentials: req.request.credentials,
//     }).catch((e: FetchError) => {
//       console.warn(e)
//       res.hasErrors = true
//       res.error = e
//       if (req.request.crashOnError)
//         throw e
//     })

//     if (!res.hasErrors && isFetchResponse(response)) {
//       const body = response._data as any
//       res.success = true

//       if (req.request.debug)
//         console.warn(body)

//       res.response = response
//       if (req.request.extractData)
//         res.body = body.data as T
//       else
//         res.body = body as T
//     }

//     return res
//   }

//   /**
//    * Create an HTTP request based on $fetch, and return a promise.
//    * Allow request errors.
//    *
//    * @param request RequestData | ApiEndpoint
//   */
//   const request = async <T>(request: RequestData | ApiTypedRouteList): Promise<HttpResponse<T>> => {
//     let req: Request = {
//       url: '',
//       request: {} as RequestData,
//     }

//     if (isRequestData(request) && request.raw) {
//       req = {
//         url: request.endpoint as string,
//         request,
//       }
//     }
//     else {
//       req = getRequest(request)
//     }

//     const res = await executeRequest<T>(req)

//     return res
//   }

//   const requestRaw = async <T>(request: BaseRequest): Promise<HttpResponse<T>> => {
//     const req: Request = {
//       url: request.endpoint as string,
//       request: {} as RequestData,
//     }

//     const res = await executeRequest<T>(req)

//     return res
//   }

//   return {
//     getRequest,
//     setQuery,
//     request,
//     requestRaw,
//   }
// }
