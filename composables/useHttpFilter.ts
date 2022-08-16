/**
 * useHttpFilter for async API call on pages.
 *
 * Usage: fetch data with `useHttp`
 * - only `GET` requests.
 * - auto `route.query` if query change.
 * - handle crash on request.
 * - wrap `T` into `ApiResponse` to allow usage of pagination (works without paginate data).
 * - give `HttpResponse` with `body` for data and some `meta` for request status.
 *
 * Example:
 * `const response = await useHttpFilter<Book[]>('/books')`
 */
export const useHttpFilter = async <T>(
  request: RequestData | ApiEndpoint
) => {
  const response = ref<ApiResponse<T>>()
  const route = useRoute()
  const http = useHttp()

  const executeRequest = async () => {
    const res = await http.request<ApiResponse<T>>(request)

    if (res.success) {
      response.value = res.body
    }
  }
  await executeRequest()

  watch(
    () => route.query,
    () => {
      executeRequest()
    }
  )

  return response
}
