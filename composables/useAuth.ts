import type { CookieOptions } from '#app'
import { useUserStore } from '~~/store/user'

/**
 * To manage authentication with API.
 *
 * From:
 * - https://laravel.com/docs/9.x/sanctum#spa-authentication
 * - https://github.com/laravel/sanctum/issues/11
 * - https://stackoverflow.com/questions/72551784/laravel-9-sanctum-login-with-fetch-api-not-working
 */
export const useAuth = () => {
  const http = useHttp()

  const configAuth = (request?: RequestData) => {
    if (!request)
      request = {}

    const cookieName = 'XSRF-TOKEN'
    const cookieOptions: CookieOptions = {
      sameSite: 'lax',
    }
    const tokenCookie = useCookie(cookieName, cookieOptions).value

    const contentType = 'application/json'
    const headers: HeadersInit = {
      'X-XSRF-TOKEN': tokenCookie,
      'Accept': contentType,
      'Content-Type': contentType,
      'X-Requested-With': 'XMLHttpRequest',
      // Authorization: `Bearer ${token.value}`
    }
    const credentials: RequestCredentials = 'include'

    request.headers = headers
    request.credentials = credentials

    return request
  }

  const sanctum = async () => {
    const rc = useRuntimeConfig()
    const sanctumEndpoint = `${rc.public.apiURL}/sanctum/csrf-cookie`
    const request = configAuth()

    const res = await http.requestRaw({
      endpoint: sanctumEndpoint,
      headers: request.headers,
      credentials: request.credentials,
    })

    return res
  }

  const request = async <T>(requestData: RequestData) => {
    await sanctum()

    const config = configAuth()

    requestData.headers = config.headers
    requestData.credentials = config.credentials

    const res = await http.request<ApiResponse<T>>(requestData)

    return res
  }

  const login = async (credentials: { email: string; password: string }) => {
    await request({
      endpoint: '/auth/login',
      body: credentials,
      method: 'POST',
    })
    await me()
  }

  const me = async () => {
    const { setUser } = useUserStore()
    const res = await request<User>({
      endpoint: '/auth/me',
    })
    setUser(res.body?.data)

    return res
  }

  const favorites = async () => {
    const res = await request<Favoritable>({
      endpoint: '/profile/favorites',
    })

    return res
  }

  const logout = async () => {
    const res = await http.request({
      endpoint: '/auth/logout',
      headers: configAuth().headers,
      credentials: configAuth().credentials,
      method: 'POST',
    })
    console.log(res)
  }

  return {
    request,
    sanctum,
    login,
    me,
    favorites,
    logout,
  }
}
