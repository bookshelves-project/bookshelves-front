/**
 * useHttpPage for async API call on pages.
 */
export const useHttpPage = <T>(
  request: RequestData | ApiEndpoint
) => {
  const response = ref<ApiResponse<T>>()
  const route = useRoute()
  const http = useHttp()

  const requestPage = async () => {
    const res = await http.request<ApiResponse<T>>(request)

    if (res.success) {
      response.value = res.body
    }
  }

  watch(
    () => route.query,
    () => {
      requestPage()
    }
  )

  return {
    response,
    requestPage
  }
}
