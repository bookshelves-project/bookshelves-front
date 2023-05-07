import type { ApiData, UseHttpRequest } from '~/types'

/**
 * useHttpQuery for async API call on pages.
 *
 * Usage: fetch data with `useHttp`
 * - only `GET` requests.
 * - auto `route.query` if query change.
 * - handle crash on request.
 * - wrap `T` into `ApiResponse` to allow usage of pagination (works without paginate data).
 * - give `HttpResponse` with `body` for data and some `meta` for request status.
 *
 * Example:
 * `const response = await useHttpQuery<Book>('/books')`
 */
export async function useHttpQuery<T>(request: UseHttpRequest): Promise<Ref<ApiData<T> | undefined>> {
  const response = ref<ApiData<T>>()
  const route = useRoute()

  const execute = async () => {
    request.auto = false
    response.value = await useHttp<ApiData<T>>(request)
  }
  await execute()

  watch(
    () => route.query,
    () => {
      execute()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  )

  return response as Ref<ApiData<T>>
}
