/**
 * useHttpPage for async API call on pages.
 */
export const useHttpPage = <T>(
  request: RequestData | ApiEndpoint
) => {
  const paginate = ref<ApiResponse<T[]>>()
  const response = ref<ApiResponse<T>>()
  const route = useRoute()
  const http = useHttp()

  const asyncRequest = async () => {
    const data = await http.request(request)
    paginate.value = data as ApiResponse<T[]>
    response.value = data as ApiResponse<T>
  }

  watch(
    () => route.query,
    () => {
      asyncRequest()
    }
  )

  return {
    paginate,
    response,
    asyncRequest
  }
}
