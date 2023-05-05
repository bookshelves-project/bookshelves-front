export function useEntityGroup(selection: SelectedEntities) {
  const { request } = useHttp()

  const isAvailable = ref(true)
  const isLoading = ref(true)

  const slides = ref<Entity[]>()

  const getData = async () => {
    isLoading.value = true

    const response = await request<Entity[]>({
      endpoint: selection.endpoint,
      params: selection.paramsList ? selection.paramsList : <any>[],
      extractData: true,
    })

    if (response?.success) {
      isLoading.value = false
      if (response.body?.length === 0)
        isAvailable.value = false

      slides.value = response.body
    }
    else {
      isAvailable.value = false
    }
  }

  return {
    isAvailable,
    isLoading,
    getData,
    slides,
  }
}
