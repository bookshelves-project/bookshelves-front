export const useEntityGroup = (selection: SelectedEntities) => {
  const { request } = useHttp()

  const isAvailable = ref(true)
  const isLoading = ref(true)

  const slides = ref<Entity[]>()

  const getData = async () => {
    isLoading.value = true

    slides.value = await request<Entity[]>({
      endpoint: selection.endpoint,
      params: selection.paramsList ? selection.paramsList : [],
      extractData: true
    }).then((e) => {
      if (e) {
        isLoading.value = false
        if (e.length === 0) {
          isAvailable.value = false
        }
        return e
      } else {
        isAvailable.value = false
      }
    })
  }

  return {
    isAvailable,
    isLoading,
    getData,
    slides
  }
}
