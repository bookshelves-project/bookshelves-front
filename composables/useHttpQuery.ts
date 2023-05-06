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
    const res = await useHttp<ApiData<T>>(request)

    if (res.value?.ok)
      response.value = res.value._data
  }
  await execute()

  watch(
    () => route.query,
    () => {
      execute()
    },
  )

  return response
}
